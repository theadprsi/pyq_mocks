import React from "react";
import "./AppDrawer.css";

// Micro Component

import {
  NavItem,
  GeneralBtn,
  changeAppToast,
  show_hideAppBar,
} from "../MicroComponent/MicroComponent";

// File Bundle

import {
  Logo,
  HomeIcon,
  SyllabusIcon,
  AboutIcon,
  FistBumpIcon,
  ShareIcon,
} from "../assets/assets";

// App Drawer

function AppDrawer() {
  const siteURL =
    "Get free online mock tests based on previous year for SSC, Railways and other exams.\nhttps://";

  // Copy to Clipboard

  const ShareHandler = () => {
    const clipboard = document.getElementById("share-link");
    clipboard.select();
    document.execCommand("copy");

    changeAppToast("Link Copied");
  };

  return (
    <div id="app-drawer" className="app-drawer">
      <nav>
        <div className="app-logo-cont">
          <a href="/">
            <img className="app-logo" src={Logo} alt="PYQ Mocks" />
          </a>
        </div>

        <ul>
          <NavItem
            file={HomeIcon}
            text="Home"
            url="/"
            click={show_hideAppBar}
          />
          <NavItem
            file={SyllabusIcon}
            text="Syllabus"
            url="/syllabus"
            click={show_hideAppBar}
          />
          <NavItem
            file={AboutIcon}
            text="About"
            url="/about"
            click={show_hideAppBar}
          />
        </ul>
      </nav>

      <footer>
        <img src={FistBumpIcon} alt="Fist Bump" />

        <p>We're working hard on this project so now, it's your turn.</p>

        <GeneralBtn file={ShareIcon} text="Share" clickEvent={ShareHandler} />

        <input id="share-link" value={siteURL} aria-hidden="true" readOnly />
      </footer>
    </div>
  );
}

export default AppDrawer;
