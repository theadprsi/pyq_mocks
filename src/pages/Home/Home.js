import React, { Component } from "react";
import "./Home.css";

import { set, get } from "idb-keyval";

import QuizContext from "../../GlobalState";

// Micro Component

import {
  CategoryMock,
  CustomSelect,
  LatestMock,
} from "../../MicroComponent/MicroComponent";

// File Bundle

import {
  PeopleIllus,
  LoaderIcon,
  railwayLogo,
  sscLogo,
} from "../../assets/assets";

class Home extends Component {
  state = {
    isLoading: true,
    currentSubCatD: [],
    sscORrailway: "",
    currentSelectValue: "",
  };

  static contextType = QuizContext;

  componentDidMount() {
    this.getLatestTest();
  }

  // Get Latest Test

  getLatestTest = async () => {
    const latestUrl = process.env.REACT_APP_API + "LatestTest.json";

    const { testContext, updateTestContext } = this.context;

    // on app start do load
    if (testContext.refresh) {
      try {
        const response = await fetch(latestUrl);
        const data = await response.json();

        const { _1, _2, _3 } = data;

        await this.setState({
          lTest1: _1,
          lTest2: _2,
          lTest3: _3,

          isLoading: false,
        });

        updateTestContext(_1, _2, _3);

        set("latestTestDB", { _1, _2, _3 });
      } catch (e) {
        const data = await get("latestTestDB");
        const { _1, _2, _3 } = data;

        await this.setState({
          lTest1: _1,
          lTest2: _2,
          lTest3: _3,

          isLoading: false,
        });
      }
    }
    // on page change don't load again
    else {
      await this.setState({
        lTest1: testContext._1,
        lTest2: testContext._2,
        lTest3: testContext._3,

        isLoading: false,
      });
    }
  };

  // Category Mock on Click

  CategoryClickHandler = (current, id) => {
    document.getElementById("app-overlay").style.display = current
      ? "block"
      : "none";
    document.querySelector(".Home .sub-category").style.display = current
      ? "block"
      : "none";

    if (id === 0)
      this.setState({
        sscORrailway: "ssc",
        currentSubCatD: this.categoryData.ssc,
      });
    if (id === 1)
      this.setState({
        sscORrailway: "railway",
        currentSubCatD: this.categoryData.railway,
      });
  };

  // Change select proceed button link

  selectListener = (event) => {
    const value = event.target.value;
    this.setState({ currentSelectValue: value });
  };

  // Category Data

  categoryData = {
    ssc: [
      { group: "CGL Tier I", link: "cgl-tier_1" },
      { group: "CGL Tier II", link: "cgl-tier_2" },
      { group: "CHSL", link: "chsl" },
      { group: "MTS", link: "mts" },
    ],
    railway: [
      { group: "NTPC CBT 1", link: "ntpc-cbt_1" },
      { group: "NTPC CBT 2", link: "ntpc-cbt_1" },
      { group: "ALP & Tech CBT 1", link: "alp_tech-cbt_1" },
      { group: "ALP & Tech CBT 2", link: "alp_tech-cbt_2" },
      { group: "RRB JE CBT 1", link: "rrb_je-cbt_1" },
      { group: "RRB JE CBT 2", link: "rrb_je-cbt_2" },
      { group: "RRB Group D", link: "rrb-group_d" },
      { group: "RRB Paramedical", link: "rrb-paramedical" },
      { group: "RPF Constable", link: "rpf-constable" },
      { group: "RPF Tradesman", link: "rpf-tradesman" },
    ],
  };

  render() {
    return (
      <div className="Home">
        <header>
          {/* Landing */}

          <div className="intro">
            <h1>Your e-Mentor</h1>
            <p>
              Free online mocks for SSC {"&"} Railways based on previous year
              questions
            </p>
          </div>

          <img src={PeopleIllus} alt="People" />
        </header>

        {/* Latest */}

        <div className="latest-mocks">
          <h2>Trending</h2>

          {!this.state.isLoading ? (
            <div className="latest-mocks-wrapper">
              <LatestMock
                title={this.state.lTest1.title}
                details={this.state.lTest1.info}
                link={this.state.lTest1.id}
              />

              <LatestMock
                title={this.state.lTest2.title}
                details={this.state.lTest2.info}
                link={this.state.lTest2.id}
              />

              <LatestMock
                title={this.state.lTest3.title}
                details={this.state.lTest3.info}
                link={this.state.lTest3.id}
              />
            </div>
          ) : (
            <div className="latest-mock-loader">
              <img src={LoaderIcon} alt="Loading" />
            </div>
          )}
        </div>

        {/* Category */}

        <div className="catlog">
          <h2>Category</h2>

          <div className="catlog-wrapper">
            <CategoryMock
              name="SSC"
              info="CGL, CHSL and more"
              image={sscLogo}
              click={() => this.CategoryClickHandler(true, 0)}
            />
            <CategoryMock
              name="RAILWAY"
              info="NTPC, GROUP - D and more"
              image={railwayLogo}
              click={() => this.CategoryClickHandler(true, 1)}
            />
          </div>

          <CustomSelect
            name={this.state.sscORrailway}
            close={() => this.CategoryClickHandler(false, undefined)}
            info={this.state.currentSubCatD}
            change={this.selectListener}
            current={this.state.currentSelectValue}
          />
        </div>

        {/* Tip Random */}

        {/* <div className="tip">
          <p>Still can't decide where to start, here is a random test</p>
          <button>Let's Go</button>
        </div> */}
      </div>
    );
  }
}

export default Home;
