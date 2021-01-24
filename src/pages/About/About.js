import React from "react";
import "./About.css";

function About() {
  // Tab Handler

  const tabsHandler = (Event, i) => {
    const allTabsHead = document.getElementsByClassName("tabs-head");

    for (let i = 0; i < allTabsHead.length; i++) {
      allTabsHead[i].classList.remove("active");
    }

    const allTabsContent = document.getElementsByClassName("tabs-content");

    for (let i = 0; i < allTabsContent.length; i++) {
      allTabsContent[i].classList.remove("active");
    }

    Event.target.classList.add("active");

    document.getElementsByClassName("tabs-content")[i].classList.add("active");
  };

  return (
    <div className="About">
      <h2>About</h2>

      <p>
        Hello Friends, PYQ Mocks is a non-commercial site, started by ex SSC
        candidate. The main motto behind this site is to create an online self
        preparation guide for competitive aspirants where candidates can get all
        the required mock test series. We believe preparation can be more social
        and fun and far more tech-friendly with an internet-enabled device in
        the hands of most students, we felt there was a need for a mobile test
        prep platform which would give students the freedom to learn and prepare
        anywhere,anytime. I wish all the very best to all my visiting friends.
        This site is open to all and as free as air.
      </p>

      <div className="about-tabs">
        <aside>
          <span
            className="tabs-head active"
            onClick={(el) => tabsHandler(el, 0)}
          >
            Disclaimer
          </span>

          <span className="tabs-head" onClick={(el) => tabsHandler(el, 1)}>
            T&C
          </span>

          <span className="tabs-head" onClick={(el) => tabsHandler(el, 2)}>
            Privacy Policy
          </span>
        </aside>

        <div>
          <p className="tabs-content active">
            PYQ Mocks is not associated with any requirement boards like Staff
            Selection Commission, Railway's Requirement Boards, etc. We are
            using there official questions that was asked in past for candidates
            to get actual experience of exam.
          </p>

          <p className="tabs-content">
            Below are the Terms and Conditions for use of PYQ Mocks Please read
            these carefully. By accessing the content of PYQ Mocks you agree to
            the terms and conditions set out herein.If you do not agree to any
            of the terms and conditions you should not continue to use the
            Website and leave immediately. You agree that you shall not use the
            website for any illegal purposes, and that you will respect all
            applicable laws and regulations. PYQ Mocks reserves the right to
            make any modifications or corrections to the information you find on
            the website at any time without any notice. Change to the Terms and
            Conditions of Use-We reserve the right to make changes and to revise
            the above mentioned Terms and Conditions of use.
          </p>

          <p className="tabs-content">
            We are using your browser data for Google Analytics, to check our
            website performance & user visits.
          </p>
        </div>
      </div>

      <h5>
        Design & Develop :{" "}
        <a
          href="https://adprsi.netlify.app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Aditya Pratap Singh
        </a>
      </h5>
      <h5>
        Idea & Data :{" "}
        <a
          href="https://www.facebook.com/hariomvermareal"
          target="_blank"
          rel="noopener noreferrer"
        >
          Hariom Verma
        </a>
      </h5>
    </div>
  );
}

export default About;
