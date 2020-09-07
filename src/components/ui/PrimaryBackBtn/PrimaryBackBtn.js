/* eslint-disable no-shadow */
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setStep } from "../../../actions/actions";
import store from "../../../store";
import "./PrimaryBackBtn.scss";

function PrimaryBackBtn({ decrease, title, icon, setStep }) {
  const [navToHome, setNavToHome] = useState(false);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const currentStep = store.getState().reducer.step;
      if (currentStep === 2) {
        setNavToHome(true);
      } else {
        setNavToHome(false);
      }
    });
    return unsubscribe;
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
        <button
          type="submit"
          className="primary-back-btn"
          onClick={() => handleClick()}
        >
          <i className={icon} />
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
