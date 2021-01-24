import React from "react";
import "./AppProfile.css";

// Micro Component

import { TopScoreChart, GeneralBtn } from "../MicroComponent/MicroComponent";

// File Bundle

import { AvatarPic, TrophyIcon, GradeIcon, LogoutIcon } from "../assets/assets";

// App Profile

function AppProfile() {
  // Logout

  const LogoutClickHandler = () => {
    console.log("");
  };

  return (
    <div className="app-profile">
      <div>
        <div className="user">
          <img src={AvatarPic} alt="User" />
          <p>Jake Mayer O'Brien</p>
          <span>jakemayer25@gmail.com</span>
        </div>

        <div className="rank">
          <p>
            You have completed<span> 045 </span>out of<span> 230 </span>mocks.
          </p>

          <img src={TrophyIcon} alt="Trophy" />
        </div>

        <div className="top-score">
          <h3>
            Recent Score
            <img src={GradeIcon} alt="Icon" />
          </h3>

          <TopScoreChart title="CGL" percent="50.5%" />
          <TopScoreChart title="CGL" percent="40.0%" />
          <TopScoreChart title="MTS" percent="70.0%" />
        </div>
      </div>

      <GeneralBtn
        file={LogoutIcon}
        text="Logout"
        clickEvent={LogoutClickHandler}
      />
    </div>
  );
}

export default AppProfile;
