import React from "react";
import "./MicroComponent.css";

import { Link, NavLink } from "react-router-dom";
import { ArrowIcon, CloseIcon, CrossIcon, TickIcon } from "../assets/assets";

// Navigation Item

export const NavItem = (props) => {
  return (
    <li onClick={window.innerWidth < 768 ? props.click : null}>
      <NavLink to={props.url} activeClassName="active" exact={true}>
        <img src={props.file} alt="Icon" />
        {props.text}
      </NavLink>
    </li>
  );
};

// General Button

export const GeneralBtn = (props) => {
  return (
    <button onClick={props.clickEvent}>
      {props.text}
      <img src={props.file} alt="Icon" />
    </button>
  );
};

// Top Score Chart

export const TopScoreChart = (props) => {
  return (
    <div className="top-score-chart">
      <span>{props.title}</span>
      <div className="tsc-meter">
        <div style={{ width: `${props.percent}` }}></div>
      </div>
      <samp>{props.percent}</samp>
    </div>
  );
};

// App Toast

export const Toast = () => {
  return (
    <div id="app-toast" className="toast">
      <span></span>
    </div>
  );
};

let onceToast = true;

export const changeAppToast = async (ok) => {
  if (onceToast) {
    onceToast = false;

    const toast = document.getElementById("app-toast");

    toast.firstChild.innerHTML = ok;
    toast.style.display = "unset";

    setTimeout(() => {
      toast.style.display = "none";
      toast.firstChild.innerHTML = "";
      onceToast = true;
    }, 3000);
  }
};

// Latest Mocks

export const LatestMock = (props) => {
  return (
    <Link to={props.link}>
      <div className="l-mocks">
        <div>
          <h3>{props.title}</h3>
          <p>{props.details}</p>
        </div>

        <img src={ArrowIcon} alt="Arrow" />
      </div>
    </Link>
  );
};

// Category Mocks

export const CategoryMock = (props) => {
  return (
    <div onClick={props.click} className="c-mocks">
      <div>
        <h3>{props.name}</h3>
        <p>{props.info}</p>
      </div>

      <img src={props.image} alt="Logo" />
    </div>
  );
};

// Overlay

export const AppOverlay = () => (
  <div id="app-overlay" className="app-overlay"></div>
);

// Custom Select

export const CustomSelect = (props) => {
  const CSItems = props.info.map((data, index) => {
    return (
      <option value={data.link} key={index}>
        {data.group}
      </option>
    );
  });

  return (
    <div className="sub-category">
      <h4>
        {props.name.toUpperCase()}
        <img onClick={props.close} src={CloseIcon} alt="Close" />
      </h4>
      <div className="sub-category-select">
        <select
          onChange={props.change}
          name="Sub Category"
          id="home-subcategory"
        >
          <option value="">Choose One</option>
          {CSItems}
        </select>
        <Link onClick={props.close} to={`/${props.name}/${props.current}`}>
          <button>PROCEED</button>
        </Link>
      </div>
    </div>
  );
};

// Test Question

export const TestQuestions = (props) => {
  return (
    <div>
      <h3>{props.heading3}</h3>
      <h4 dangerouslySetInnerHTML={props.heading4} />
    </div>
  );
};

// Extra Text or Image

export const QuestionImgTxt = (props) => {
  return props.image != null || props.text != null ? (
    <div
      style={
        window.width < 768 ? { height: `${props.optionBoxHeight}px` } : null
      }
      className="q-extra"
    >
      {props.image != null ? <img src={props.imgSrc} alt="Question" /> : null}
      {props.text != null ? <p>{props.text}</p> : null}
    </div>
  ) : null;
};

// Test Answers

export const TestAnswers = (props) => {
  return props.answers.map((data, index) => {
    const bold = /◆(.*?)◆/g;
    const newQues = data.replace(bold, "<b>$1</b>");

    const image = /¶(.*?)¶/g;
    const finalQues = newQues.replace(image, props.inlineImgSrc);

    return (
      <div
        className="option-cont"
        key={index}
        onClick={() => props.aKeepRemove(index + 1)}
      >
        <div className="radio-btn"></div>
        <p dangerouslySetInnerHTML={{ __html: finalQues }} />
      </div>
    );
  });
};

// Test Answers For Review

export const TestAnswersReview = (props) => {
  return props.answers.map((data, index) => {
    const bold = /◆(.*?)◆/g;
    const newQues = data.replace(bold, "<b>$1</b>");

    const image = /¶(.*?)¶/g;
    const finalQues = newQues.replace(image, props.inlineImgSrc);

    let orderQ = <span className="review-option-status"></span>;

    if (props.realAnswer === props.userAnswer) {
      if (props.userAnswer === index + 1) {
        orderQ = (
          <img
            className="review-option-status"
            src={TickIcon}
            alt="Option Status"
          />
        );
      }
    } else {
      if (props.userAnswer === index + 1) {
        orderQ = (
          <img
            className="review-option-status"
            src={CrossIcon}
            alt="Option Status"
          />
        );
      }
      if (props.realAnswer === index + 1) {
        orderQ = (
          <img
            className="review-option-status"
            src={TickIcon}
            alt="Option Status"
          />
        );
      }
    }

    return (
      <div className="option-cont" key={index}>
        {orderQ}
        <p
          dangerouslySetInnerHTML={{
            __html: finalQues,
          }}
        />
      </div>
    );
  });
};

// App Drawer Mobile

export const show_hideAppBar = () => {
  document.getElementById("app-drawer-overlay").classList.toggle("active");
  document.getElementById("app-drawer").classList.toggle("active");
};
