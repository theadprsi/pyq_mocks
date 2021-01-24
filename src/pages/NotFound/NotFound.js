import React from "react";
import { Link } from "react-router-dom";

import "./NotFound.css";

const NotFound = () => (
  <div className="NotFound">
    <h1>404</h1>
    <p>
      Page Not Found, Go <Link to="/">Home</Link>
    </p>
  </div>
);

export default NotFound;
