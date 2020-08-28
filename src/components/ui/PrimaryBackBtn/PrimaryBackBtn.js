import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { setStep } from "../../../actions/actions";
import { Link } from "react-router-dom";
import store from "../../../store";
import "./PrimaryBackBtn.scss";

function PrimaryBackBtn({ decrease, title, icon, setStep }) {
  const [navToHome, setNavToHome] = useState(false);

  useEffect(() => {
    store.subscribe(() => {
      const currentStep = store.getState().reducer.step;
      if (currentStep === 2) {
        setNavToHome(true);
      } else {
        setNavToHome(false);
      }
    });
  }, [store]);

  const handleClick = () => {
    if (decrease) {
      setStep(-1);
    }
  };

  return (
    <div className="back-container px-1">
      {navToHome ? (
        <Link className="primary-back-btn" to="/">
          HOME
          <i className="fa fa-home red-text"> </i>
        </Link>
      ) : (
        <button className="primary-back-btn" onClick={() => handleClick()}>
          <i className={icon}></i>
          {title}
        </button>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  reducer: state.step,
});

export default connect(mapStateToProps, { setStep })(PrimaryBackBtn);
