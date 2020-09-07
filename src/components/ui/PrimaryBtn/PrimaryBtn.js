/* eslint-disable no-shadow */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setStep } from "../../../actions/actions";
import store from "../../../store";
import "./PrimaryBtn.scss";

function PrimaryBtn({ increment = false, title, icon, setStep }) {
  const [navToHome, setNavToHome] = useState(false);
  const [btnIcon, setBtnIcon] = useState(icon);
  const [btnTitle, setBtnTitle] = useState(title);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const currentStep = store.getState().reducer.step;
      if (currentStep === 5) {
        setNavToHome(true);
        setBtnIcon("fa fa-check");
        setBtnTitle("HOME");
      } else if (currentStep === 6) {
        setStep(-4);
      } else {
        setNavToHome(false);
        setBtnIcon(icon);
        setBtnTitle(title);
      }
    });
    return unsubscribe;
  }, [store]);

  const handleStep = () => {
    if (increment) {
      setStep(1);
    }
  };

  return (
    <>
      {navToHome ? (
        <Link to="/">
          <button
            type="submit"
            onClick={() => handleStep()}
            className="primary-btn"
          >
            {btnTitle}
            <i className={btnIcon}> </i>
          </button>
        </Link>
      ) : (
        <Link to="/order">
          <button
            type="submit"
            onClick={() => handleStep()}
            className="primary-btn"
          >
            {btnTitle}
            <i className={btnIcon}> </i>
          </button>
        </Link>
      )}
    </>
  );
}

export default connect(null, { setStep })(PrimaryBtn);
