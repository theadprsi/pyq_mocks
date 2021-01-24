import React from "react";
import "./AppBar.css";

// File Bundle

import { Logo, MenuIcon } from "../assets/assets";
import { show_hideAppBar } from "../MicroComponent/MicroComponent";

function AppBar() {
  return (
    <div className="AppBar">
      <a href="/">
        <img className="app-logo" src={Logo} alt="PYQ Mocks" />
      </a>

      <img onClick={show_hideAppBar} src={MenuIcon} alt="Menu" />
    </div>
  );
}

export default AppBar;
