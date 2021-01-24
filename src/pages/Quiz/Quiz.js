import React, { Component } from "react";
import "./Quiz.css";

import { Prompt } from "react-router-dom";

// File Bundle

import {
  languageIcon,
  MenuIcon,
  StarOutlineIcon,
  StarSolidIcon,
  LoaderIcon,
  TickIcon,
  CrossIcon,
  MinusIcon,
  WhatsAppIcon,
  AccuracyIcon,
  CloseIcon,
} from "../../assets/assets";

import {
  QuestionImgTxt,
  TestAnswers,
  TestAnswersReview,
  TestQuestions,
} from "../../MicroComponent/MicroComponent";

class TestMock extends Component {
  state = {
    head: "",
    quiz: null,
    answerkey: null,
    structure: null,
    time: null,
    totalTime: null,
    currentQuiz: null,
    langToogle: false,
    qLength: null,
    currentQIndex: 0,

    isLoading: true,
    optionBoxHeight: 0,

    group: null,
    year: null,
    qid: null,

    allUserAnswers: [],
    sectionPosition: [],
    allReviewQuestions: [],

    score: 0,

    showResult: false,

    correct: 0,
    incorrect: 0,

    cutoff: 0,

    intro: null,
    quizIntroRead: false,

    testErrMsg: "Please Wait",
  };

  async componentDidMount() {
    const {
      match: { params },
    } = await this.props;

    await this.setState({
      group: params.group,
      year: params.year,
      qid: params.qid,
    });

    this.splitArrangeID(this.state.group);

    await this.getTestAPI();
    await this.desQuestion();

    await this.getImagePreload();

    this.keyboardNavigation();
  }

  componentDidUpdate() {
    // window.onbeforeunload = () => true;
  }

  componentWillUnmount() {
    clearInterval(this.timeLeft);
  }

  componentDidCatch() {
    alert("Something Went Wrong");
  }

  // Navigation through Keyboard

  async keyboardNavigation() {
    const allQLength = await this.state.qLength;

    document.addEventListener("keyup", (e) => {
      const currentQ = this.state.currentQIndex;

      switch (e.key) {
        case "l":
        case "L":
          this.setCurrentQuiz();
          break;

        case "ArrowRight":
          if (currentQ < allQLength - 1) this.changeQ(currentQ + 1);
          break;

        case "ArrowLeft":
          if (currentQ > 0) this.changeQ(currentQ - 1);
          break;

        case "1":
          this.keep_removeAnswer(1);
          break;

        case "2":
          this.keep_removeAnswer(2);
          break;

        case "3":
          this.keep_removeAnswer(3);
          break;

        case "4":
          this.keep_removeAnswer(4);
          break;

        case "Delete":
          this.keep_removeAnswer(null);
          break;

        case "Enter":
          break;

        default: {
        }
      }
    });
  }

  // fullscreen mode

  openFullscreen() {
    // const body = document.body;
    // if (body.requestFullscreen) {
    //   body.requestFullscreen();
    // } else if (body.webkitRequestFullscreen) {
    //   body.webkitRequestFullscreen();
    // } else if (body.msRequestFullscreen) {
    //   body.msRequestFullscreen();
    // }
  }

  // Get option box height

  qOptionBox = (elem) => {
    try {
      this.setState({
        optionBoxHeight: elem.clientHeight,
      });
    } catch (e) {}
  };

  // Get Quiz

  getTestAPI = async () => {
    const quizUrl =
      process.env.REACT_APP_API +
      `Quizzes/${this.state.group}/${this.state.year}/${this.state.qid}/main.json`;

    try {
      const response = await fetch(quizUrl);
      const data = await response.json();

      const { intro, english, hindi, answerkey, structure } = data;

      await this.setState({
        intro: intro,
        quiz: { english, hindi },
        answerkey: answerkey,
        structure: { section: structure.section, mark: structure.mark },
        time: structure.time,
        totalTime: structure.time,

        qLength: english.length,
      });

      await this.setCurrentQuiz();

      await this.selectPreValue(structure.section);
    } catch (e) {
      this.setState({ testErrMsg: "Can't Find The Test You're Looking For" });
    }

    this.getCutOff();
  };

  // get cutoff for the the set by section

  getCutOff = async () => {
    const cutOffUrl =
      process.env.REACT_APP_API +
      `Quizzes/${this.state.group}/overallCutoff.json`;

    try {
      const response = await fetch(cutOffUrl);
      const data = await response.json();

      const { cutoff } = data;

      await this.setState({
        cutoff: cutoff,
      });
    } catch (e) {
      this.setState({ testErrMsg: "Can't Find The Test You're Looking For" });
    }
  };

  // Collect select pre-value

  selectPreValue = async (data) => {
    for (let i = 0; i < data.length; i++) {
      const sectionArrayOne = data[i].split("-");

      await this.setState({
        sectionPosition: [...this.state.sectionPosition, sectionArrayOne[1]],
      });
    }
  };

  // Modify ID for read purpose with year & set

  splitArrangeID = (id) => {
    const group = id.split("-");

    let group_one = "";
    let group_two = "";

    const group_one_split = group[0].split("_");

    group_one = this.getType(group_one_split[0]);

    for (let i = 0; i < group_one_split.length; i++) {
      group_one += group_one_split[i] + " ";
    }

    if (group.length === 2) {
      const group_two_split = group[1].split("_");
      let group_two_old = "";

      for (let i = 0; i < group_two_split.length; i++) {
        group_two_old += group_two_split[i] + " ";
      }

      group_two = group_two_old.replace("1", "I");
      group_two = group_two.replace("2", "II");
    }

    this.setState({
      head: (
        group_one +
        group_two +
        this.state.year +
        " - Set " +
        this.state.qid
      ).toUpperCase(),
    });
  };

  // get Type of Group

  getType = (group) => {
    if (
      group.includes("cgl") ||
      group.includes("chsl") ||
      group.includes("mts")
    )
      return "SSC ";
    else {
      return "RAILWAY ";
    }
  };

  // Set Current Quiz

  setCurrentQuiz = async () => {
    const englishORhindi = await this.state.langToogle;
    const quizOG = await this.state.quiz;

    if (englishORhindi) {
      await this.setState({
        currentQuiz: quizOG.hindi,
        langToogle: false,
      });
    } else {
      await this.setState({
        currentQuiz: quizOG.english,
        langToogle: true,
      });
    }
  };

  // get image and preload

  getImagePreload = async () => {
    const tempCurrentQuiz = await this.state.currentQuiz;
    let currentImage = [];

    try {
      for (let i = 0; i < tempCurrentQuiz.length; i++) {
        if (tempCurrentQuiz[i].image !== undefined) {
          currentImage = await [
            ...currentImage,
            process.env.REACT_APP_API +
              `Quizzes/${this.state.group}/${this.state.year}/${this.state.qid}/${tempCurrentQuiz[i].image}.jpg`,
          ];
        }
      }
    } catch (e) {
      this.setState({ testErrMsg: "Can't Find The Test You're Looking For" });
    }

    // cache image

    const promises = await currentImage.map((src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();

        img.src = src;
        img.onload = resolve;
        img.onerror = reject;
      });
    });

    await Promise.all(promises);

    this.setState({ isLoading: false });
  };

  // destructuring the question

  desQuestion = () => {
    const ques = this.state.currentQuiz[this.state.currentQIndex].question;

    const bold = /◆(.*?)◆/g;
    const newQues = ques.replace(bold, "<b>$1</b>");

    const image = /¶(.*?)¶/g;
    const finalQues = newQues.replace(
      image,
      `<span><img src="${process.env.REACT_APP_API}Quizzes/${this.state.group}/${this.state.year}/${this.state.qid}/$1.jpg" alt="Question"/></span>`
    );

    return { __html: finalQues };
  };

  // keep Answers

  keep_removeAnswer = async (val) => {
    const index = await this.state.currentQIndex;

    const optionCont = document.getElementsByClassName("option-cont");
    const jump = document.querySelectorAll("section > span")[index];

    for (let i = 0; i < optionCont.length; i++) {
      optionCont[i].classList.remove("active");
    }

    jump.classList.remove("answered");

    const allUserAnswers = [...this.state.allUserAnswers];
    let userAnswer = { ...allUserAnswers[index] };
    userAnswer = val;
    allUserAnswers[index] = userAnswer;

    await this.setState({ allUserAnswers });

    if (val > 0) {
      optionCont[val - 1].classList.add("active");
      jump.classList.add("answered");
    }
  };

  // change Question

  changeQ = async (index) => {
    const optionCont = document.getElementsByClassName("option-cont");

    for (let i = 0; i < optionCont.length; i++) {
      optionCont[i].classList.remove("active");
    }

    // section update on question change

    const secPos = await this.state.sectionPosition;

    for (let i = 0; i < secPos.length; i++) {
      if (index + 1 >= secPos[i]) {
        document.getElementById("type-selector").selectedIndex = i;
      }
    }

    await this.setState({
      currentQIndex: index,
    });

    try {
      const oldSelection = await this.state.allUserAnswers[index];
      optionCont[oldSelection - 1].classList.add("active");
    } catch (e) {}
  };

  // change question on jump

  jumpChangeQ = async (i) => {
    await this.changeQ(i);

    if (window.innerWidth < 768) {
      document.getElementById("jump-cont").classList.toggle("inactive");
    }
  };

  // Timer

  timer = async () => {
    let totalTime = (await this.state.time) * 60;

    await this.setState({
      time: `${~~(totalTime / 60)} : 00`,
    });

    this.timeLeft = setInterval(async () => {
      if (totalTime > 0) {
        totalTime--;
        let sec;

        if (totalTime % 60 < 10) sec = "0" + (totalTime % 60);
        else sec = totalTime % 60;

        await this.setState({
          time: `${~~(totalTime / 60)} : ${sec}`,
        });
      } else {
        clearInterval(this.timeLeft);

        this.submitTest();
      }
    }, 1000);
  };

  // mark for review

  reviewQ = async () => {
    const index = await this.state.currentQIndex;
    const jump = document.querySelectorAll("section > span")[index];
    const allReviewQuestionsOG = await this.state.allReviewQuestions;

    const allReviewQuestions = [...allReviewQuestionsOG];
    let reviewQuestion = { ...allReviewQuestions[index] };
    reviewQuestion = allReviewQuestionsOG[index] ? false : true;
    allReviewQuestions[index] = reviewQuestion;

    if (allReviewQuestionsOG[index]) jump.classList.remove("marked");
    else jump.classList.add("marked");

    await this.setState({ allReviewQuestions });
  };

  // submit Test

  submitTest = async () => {
    clearInterval(this.timeLeft);

    const timeRemaining = (await this.state.time).split(" : ");
    const timeTakenSplit =
      (await this.state.totalTime) * 60 -
      (parseInt(timeRemaining[0]) * 60 + parseInt(timeRemaining[1]));

    const timeTaken = `${~~(timeTakenSplit / 60)} : ${timeTakenSplit % 60}`;

    const finalUserAnswers = await this.state.allUserAnswers;
    const answerKey = await this.state.answerkey;
    const markingSystem = (await this.state.structure).mark;

    const positiveMark = parseFloat(markingSystem[0]);
    const negativeMark = parseFloat(markingSystem[1]);

    let totalScore = 0,
      totalcorrect = 0,
      totalincorrect = 0;

    await finalUserAnswers.forEach((data, index) => {
      if (data === answerKey[index]) {
        totalScore += positiveMark;
        totalcorrect++;
      } else if (data > 0 || data < 5) {
        totalScore -= negativeMark;
        totalincorrect++;
      }
    });

    this.setState({
      score: totalScore,
      totalTime: timeTaken,
      correct: totalcorrect,
      incorrect: totalincorrect,
      showResult: true,
    });
  };

  // submit test on click

  submitTestOnClick = () => {
    document.getElementById("submit-popup-wrapper").classList.toggle("active");
  };

  // Attempted Questions Count

  attempted = () => {
    return [...this.state.allUserAnswers].filter((x) => {
      return x != null;
    }).length;
  };

  // Total Marks

  totalMarks = () => {
    const markingSystem = this.state.structure.mark;
    const questionCount = this.state.qLength;

    return parseFloat(markingSystem[0]) * questionCount;
  };

  // toggle Report

  toggleReport = () => {
    const reportOverlay = document.getElementById("report-overlay");
    reportOverlay.classList.toggle("active");
  };

  // calculate Accuracy

  calAccuracy = () => {
    const accuracy =
      this.attempted() === 0
        ? 0
        : (this.state.correct / this.attempted()) * 100;

    if (accuracy < 0) {
      return 0;
    } else {
      return Math.round(accuracy * 100) / 100;
    }
  };

  // on accept agreement and instruction

  startTest = async () => {
    const startCheckBox = document.getElementById("agree-on-test");

    if (startCheckBox.checked) {
      await this.setState({ quizIntroRead: true });

      this.timer();
      // this.openFullscreen();
    }
  };

  // remove Group

  removeGroup = (fullN) => {
    if (
      fullN.includes("CGL") ||
      fullN.includes("CHSL") ||
      fullN.includes("MTS")
    )
      return fullN.replace("SSC", "");
    else return fullN.replace("RAILWAY", "");
  };

  render() {
    // when test has error

    if (
      this.state.intro === null ||
      this.state.currentQuiz === null ||
      this.state.answerkey === null ||
      this.state.structure === null
      // this.state.quiz === null ||
      // this.state.qLength === null
      // this.state.group === null ||
      // this.state.year === null ||
      // this.state.qid === null
    ) {
      return <div className="error-test">{this.state.testErrMsg}</div>;
    }

    // Section options

    const SectionItems = this.state.structure.section.map((data, index) => {
      const sectionArray = data.split("-");

      return (
        <option value={sectionArray[1]} key={index}>
          {sectionArray[0]}
        </option>
      );
    });

    // jump button

    const JumpBtn = [...Array(this.state.qLength)].map((d, index) => {
      return (
        <span onClick={() => this.jumpChangeQ(index)} key={index}>
          {index + 1}
        </span>
      );
    });

    // review Test All

    const reviewTestAll = [...Array(this.state.qLength)].map((d, index) => {
      // Format Question

      const ques = this.state.currentQuiz[index].question;
      const userAnswer = this.state.allUserAnswers[index];

      const bold = /◆(.*?)◆/g;
      const newQues = ques.replace(bold, "<b>$1</b>");
      const image = /¶(.*?)¶/g;
      const finalQues = newQues.replace(
        image,
        `<span><img src="${process.env.REACT_APP_API}Quizzes/${this.state.group}/${this.state.year}/${this.state.qid}/$1.jpg" alt="Question"/></span>`
      );

      const skipped =
        userAnswer === null || userAnswer === undefined ? (
          <span> - Skipped</span>
        ) : null;

      const questionHTML = { __html: finalQues };
      //

      return (
        <div key={index} className="test-cont tc-border">
          <div className="test-head">
            <h2>
              Question {index + 1}
              {skipped}
            </h2>
          </div>

          <TestQuestions
            heading3={this.state.currentQuiz[index].direction}
            heading4={questionHTML}
          />

          <div className="q-options">
            <QuestionImgTxt
              image={this.state.currentQuiz[index].image}
              text={this.state.currentQuiz[index].text}
              imgSrc={`${process.env.REACT_APP_API}Quizzes/${this.state.group}/${this.state.year}/${this.state.qid}/${this.state.currentQuiz[index].image}.jpg`}
            />

            {/* Question Options & Extra */}

            <div ref={this.qOptionBox} className="q-option-box">
              <TestAnswersReview
                answers={this.state.currentQuiz[index].answer}
                inlineImgSrc={`<span><img src="${process.env.REACT_APP_API}Quizzes/${this.state.group}/${this.state.year}/${this.state.qid}/$1.jpg" alt="Option"/></span>`}
                realAnswer={this.state.answerkey[index]}
                userAnswer={userAnswer}
              />
            </div>
          </div>
        </div>
      );
    });

    // test intro instructions

    const introInstruction = this.state.intro.map((data, index) => {
      const bold = /◆(.*?)◆/g;
      const newIns = data.replace(bold, "<b>$1</b>");

      return <li dangerouslySetInnerHTML={{ __html: newIns }} key={index} />;
    });

    return (
      <div className="Quiz">
        <Prompt message="Are you sure, you want to exit the test ?" />
        {/* Intro --------------------- */}
        {!this.state.quizIntroRead ? (
          <div className="test-into">
            <div className="test-into-head">
              <h1>{this.state.head}</h1>
              <span>Based On Previous Year</span>
            </div>

            <div className="test-intro-cont">
              <div className="test-intro-basic">
                <h4>Read the following instructions carefully</h4>

                <ul>
                  {introInstruction}

                  <li>
                    There is no negative marking for the questions that you have
                    not attempted.
                  </li>
                  <li>
                    Mobile phones and wireless communication device are
                    completely banned in the examination halls/rooms. Candidates
                    are advised not to keep mobile phones/any other wireless
                    communication devices with them even switching it off, in
                    their own interest. Failing to comply with this provision
                    will be considered as using unfair means in the examination
                    and action will be taken against them including cancellation
                    of their candidature.
                  </li>
                </ul>
              </div>

              <div className="test-intro-advance">
                <h5>General Instructions :</h5>
                <ol>
                  <li>
                    The clock has been set at the server and the countdown timer
                    at the top right corner of your screen will display the time
                    remaining for you to complete the exam. When the clock runs
                    out the exam ends by default - you are not required to end
                    or submit your exam.
                  </li>
                  <li>
                    Just after clock at the top navigation shows the positive
                    and negative markings of the set.
                  </li>
                  <li>
                    Sections in this question paper are displayed on the top bar
                    of the screen. Questions in a section can be viewed by
                    clicking on the section name. The section you are currently
                    viewing is shown.
                  </li>
                  <li>Change the language of question by just clicking.</li>
                  <li>
                    On clicking the menu button you can close and open question
                    palette.
                  </li>

                  <li>
                    <b>
                      The question palette at the right of screen shows one of
                      the following statuses of each of the questions numbered
                      :-
                    </b>

                    {/* COLOR sHOW CASE q PALETTE */}
                  </li>
                </ol>

                <h5>Answering Questions :</h5>
                <ol className="number-style-ol">
                  <li>
                    To select your answer, click on one of the option buttons.
                  </li>
                  <li>
                    To change your answer, click the another desired option.
                  </li>

                  <li>
                    To deselect a chosen answer, click on the Clear Response
                    button.
                  </li>
                  <li>
                    To mark a question for review click on star icon in front of
                    question. Note:If an answer is selected for a question that
                    is Marked for Review, the answer will be considered in the
                    final evaluation.
                  </li>

                  <li>
                    For a desired question you can go via question palette just
                    clicking on that number and you can go net and previous
                    question just clicking on it.
                  </li>
                </ol>
              </div>
            </div>

            <div className="test-intro-start">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <div>
                  <input
                    id="agree-on-test"
                    type="checkbox"
                    defaultChecked
                    required
                  />
                  <p>
                    I have read and understood the instructions given above.
                  </p>
                </div>

                <button type="submit" onClick={this.startTest}>
                  Let's Start
                </button>
              </form>
            </div>
          </div>
        ) : !this.state.isLoading ? (
          <>
            <header>
              <h1>{this.removeGroup(this.state.head)}</h1>

              {/* Sub Header / Options */}

              {!this.state.showResult ? (
                <div className="sub-header">
                  <div>
                    <samp className="timer">{this.state.time}</samp>
                    <div className="marking-system">
                      <span>+ {this.state.structure.mark[0]}</span>
                      <span>- {this.state.structure.mark[1]}</span>
                    </div>
                  </div>

                  <div className="sub-option">
                    <select
                      id="type-selector"
                      onChange={(event) => this.changeQ(event.target.value - 1)}
                      name="Section"
                      aria-label="Section"
                    >
                      {SectionItems}
                    </select>

                    <img
                      onClick={this.setCurrentQuiz}
                      src={languageIcon}
                      alt="Language"
                    />

                    <img
                      onClick={() => {
                        document
                          .getElementById("jump-cont")
                          .classList.toggle("inactive");
                      }}
                      src={MenuIcon}
                      alt="Menu"
                    />
                  </div>
                </div>
              ) : null}
            </header>

            {!this.state.showResult ? (
              // Test -------------------------------------------

              <main>
                <div className="test-cont">
                  <div className="test-head">
                    <h2>
                      {this.state.currentQIndex + 1}
                      <span>/{this.state.qLength}</span>
                    </h2>

                    <img
                      onClick={this.reviewQ}
                      src={
                        !this.state.allReviewQuestions[this.state.currentQIndex]
                          ? StarOutlineIcon
                          : StarSolidIcon
                      }
                      alt="Mark For Review"
                    />
                  </div>

                  <TestQuestions
                    heading3={
                      this.state.currentQuiz[this.state.currentQIndex].direction
                    }
                    heading4={this.desQuestion(this.state.currentQIndex)}
                  />

                  {/* Question Illus or Compre */}

                  <div className="q-options">
                    <QuestionImgTxt
                      image={
                        this.state.currentQuiz[this.state.currentQIndex].image
                      }
                      text={
                        this.state.currentQuiz[this.state.currentQIndex].text
                      }
                      optionBoxHeight={this.state.optionBoxHeight}
                      imgSrc={`${process.env.REACT_APP_API}Quizzes/${
                        this.state.group
                      }/${this.state.year}/${this.state.qid}/${
                        this.state.currentQuiz[this.state.currentQIndex].image
                      }.jpg`}
                    />

                    {/* Question Options & Extra */}

                    <div ref={this.qOptionBox} className="q-option-box">
                      <TestAnswers
                        answers={
                          this.state.currentQuiz[this.state.currentQIndex]
                            .answer
                        }
                        inlineImgSrc={`<span><img src="${process.env.REACT_APP_API}Quizzes/${this.state.group}/${this.state.year}/${this.state.qid}/$1.jpg" alt="Option"/></span>`}
                        aKeepRemove={this.keep_removeAnswer}
                      />

                      <div className="q-nav">
                        <button onClick={() => this.keep_removeAnswer(null)}>
                          Clear Selection
                        </button>

                        {this.state.currentQIndex > 0 ? (
                          <button
                            onClick={() =>
                              this.changeQ(this.state.currentQIndex - 1)
                            }
                          >
                            Previous
                          </button>
                        ) : null}

                        {this.state.currentQIndex < this.state.qLength - 1 ? (
                          <button
                            onClick={() =>
                              this.changeQ(this.state.currentQIndex + 1)
                            }
                          >
                            Next
                          </button>
                        ) : (
                          <button onClick={this.submitTestOnClick}>
                            Submit
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Question Pallet */}

                <div
                  id="jump-cont"
                  className={
                    window.innerWidth > 768 ? "jump-cont" : "jump-cont inactive"
                  }
                >
                  <div className="indicator-cont">
                    <div className="indicate">
                      <span>0</span>
                      <samp>Answered</samp>
                    </div>

                    <div className="indicate">
                      <span>0</span>
                      <samp>Marked & Answered</samp>
                    </div>

                    <div className="indicate">
                      <span>0</span>
                      <samp>Unanswered</samp>
                    </div>

                    <div className="indicate">
                      <span>0</span>
                      <samp>Marked & Unanswered</samp>
                    </div>
                  </div>

                  <section>{JumpBtn}</section>

                  <aside>
                    <button onClick={this.submitTestOnClick}>Submit</button>
                  </aside>
                </div>

                {/* Popup on Submit */}

                <div id="submit-popup-wrapper">
                  <div className="submit-popup">
                    <h3>Test Submission</h3>

                    <p>
                      Time Left<span>{this.state.time}</span>
                    </p>

                    <p>
                      Attempted
                      <span>{this.attempted()}</span>
                    </p>

                    <p>
                      Unattempted
                      <span>{this.state.qLength - this.attempted()}</span>
                    </p>

                    <p>
                      Review
                      <span>
                        {
                          [...this.state.allReviewQuestions].filter((x) => {
                            return x === true;
                          }).length
                        }
                      </span>
                    </p>

                    <samp>Are you sure want to submit the test ?</samp>

                    <button onClick={this.submitTest}>OK</button>
                    <button onClick={this.submitTestOnClick}>CANCEL</button>
                  </div>
                </div>
              </main>
            ) : (
              // Result ---------------------------------------

              <div className="result-cont">
                <div className="no-print">
                  <div className="whole-result">
                    {/* Result Overview */}

                    <div className="result-overview">
                      {this.state.score < this.state.cutoff ? (
                        <div className="remarks">
                          <h4>Better Luck Next Time !</h4>
                          <p>
                            You didn't make it
                            <span>Overall Cut Off is {this.state.cutoff}</span>
                          </p>
                        </div>
                      ) : (
                        <div className="remarks">
                          <h4>Keep It Up !</h4>
                          <p>
                            You did make it
                            <span>Cut Off is {this.state.cutoff}</span>
                          </p>
                        </div>
                      )}

                      <div>
                        <div className="small-dtl">
                          TOTAL SCORE
                          <span>
                            {this.state.score} / {this.totalMarks()}
                          </span>
                        </div>

                        <div className="small-dtl">
                          TIME TAKEN
                          <span>{this.state.totalTime}</span>
                        </div>
                      </div>
                    </div>

                    {/* WhatsApp Share */}

                    <div
                      onClick={() =>
                        window.open(
                          "whatsapp://send?text=" +
                            "Let's learn together on PYQ Mocks and also, it's free. Join now\n" +
                            window.location.href,
                          "_blank"
                        )
                      }
                      className="r-whatsapp-share"
                    >
                      <div>
                        <h4>Challange</h4>
                        <p>
                          Get along with your friends through WhatsApp and learn
                          together
                        </p>
                      </div>

                      <img src={WhatsAppIcon} alt="WhatsApp" />
                    </div>
                  </div>

                  {/* Correct Incorrect Skipped Percentage */}

                  <div>
                    <div className="r-correct">
                      <span>{this.state.correct}</span>

                      <div>
                        <p>CORRECT</p>
                        <img src={TickIcon} alt="Correct" />
                      </div>
                    </div>

                    <div className="r-incorrect">
                      <span>{this.state.incorrect}</span>

                      <div>
                        <p>INCORRECT</p>
                        <img src={CrossIcon} alt="Incorrect" />
                      </div>
                    </div>

                    <div className="r-skipped">
                      <span>{this.state.qLength - this.attempted()}</span>

                      <div>
                        <p>SKIPPED</p>
                        <img src={MinusIcon} alt="Skipped" />
                      </div>
                    </div>

                    <div className="r-accuracy">
                      <span>{this.calAccuracy()}</span>

                      <div>
                        <p>ACCURACY</p>
                        <img src={AccuracyIcon} alt="Accuracy" />
                      </div>
                    </div>
                  </div>

                  {/* Reporting */}

                  <button onClick={this.toggleReport} className="report-set">
                    Report Any Error In This Set
                  </button>

                  <div id="report-overlay">
                    <iframe src="" title="Report"></iframe>
                    <img
                      onClick={this.toggleReport}
                      src={CloseIcon}
                      alt="Close"
                    />
                  </div>
                </div>

                {/* Review Test */}

                <div className="review-test">
                  <h5 className="no-print">
                    Review Your Test
                    <div>
                      <img
                        onClick={this.setCurrentQuiz}
                        src={languageIcon}
                        alt="Language"
                      />
                      <span onClick={window.print}>Download Pdf</span>
                    </div>
                  </h5>

                  <div className="review-test-wrapper">{reviewTestAll}</div>
                </div>
              </div>
            )}
          </>
        ) : (
          // Loader ---------------------------

          <div className="loading">
            <img src={LoaderIcon} alt="Loading" />
          </div>
        )}
      </div>
    );
  }
}

export default TestMock;
