import React from "react";
import { Link } from "react-router-dom";
import "./BackBtn.scss";

function BackBtn({ color, title, navigateTo }) {
  return (
    <div className="back-btn">
      <Link to={navigateTo} className={color}>
        <span>
          <i className="fa fa-caret-left"> </i>
        </span>
        {title}
      </Link>
    </div>
  );
}

export default BackBtn;
