import React from "react";
import { connect } from "react-redux";
import { setStep } from "../../../actions/actions";
import { Link } from "react-router-dom";
import "./BackBtn.scss";

function BackBtn({ color, title, navigateTo, setStep }) {
  const handleStep = () => {
    setStep(2);
  };

  return (
    <div className="back-btn" onClick={() => handleStep()}>
      <Link to={navigateTo} className={color}>
        <span>
          <i className="fa fa-home"> </i>
        </span>
        {title}
      </Link>
    </div>
  );
}

export default connect(null, { setStep })(BackBtn);
