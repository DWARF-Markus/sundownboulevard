/* eslint-disable no-shadow */
/* eslint-disable radix */
/* eslint-disable react/no-array-index-key */
/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { setStep } from "../../../actions/actions";
import store from "../../../store";
import BackBtn from "./BackBtn";
import data from "./timeline-banner.json";
import "./TimelineBanner.scss";

function TimelineBanner({ step, setStep }) {
  const [currentStep, setCurrentStep] = useState(2);
  const [bookingType, setBookingType] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const [bannerTitle, setBannerTitle] = useState("");
  const [bannerDesc, setBannerDesc] = useState("");

  const history = useHistory();

  const handleHomeClick = () => {
    history.push("/");
  };

  const handleTimelineClick = (e) => {
    if (parseInt(e) === 1 || parseInt(e) === 5) {
      // wrong error
    } else {
      setStep(e);
      window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    setLoading(true);
    setCurrentStep(store.getState().reducer.step);
    setBookingType(store.getState().reducer.bookingType);
    setEmail(store.getState().reducer.bookingEmail);
    data.map((info) => {
      if (info.step === step) {
        setTimeout(() => {
          setLoading(false);
          setBannerTitle(info.bannerTitle);
          setBannerDesc(info.bannerDesc);
        }, 500);
      }
    });
  }, [step]);

  return (
    <div className="timeline-banner-container">
      <div className="mobile-timeline-banner blue px-1">
        <div
          className="back-button"
          onClick={() => handleHomeClick()}
          role="button"
        >
          <BackBtn navigateTo="/" color="white-text" title="HOME" />
        </div>
        <h4
          className={
            loading
              ? "current-step-text white-text loading"
              : "current-step-text white-text"
          }
        >
          {bannerTitle}
        </h4>
        <h4 className="current-step-number white-text">
          <span>{currentStep}</span> / <span>5</span>
        </h4>
      </div>
      <div className="desktop-wrapper">
        <div className="absolute">
          <div className="timeline-container">
            <div className="timeline-wrapper">
              {data.map((currStep, i) => {
                return (
                  <div
                    key={i}
                    className={
                      currStep.step === currentStep
                        ? "timeline-entry active"
                        : currStep.step < currentStep
                        ? "timeline-entry done"
                        : "timeline-entry"
                    }
                  >
                    <div
                      role="button"
                      className="icon"
                      onClick={() => handleTimelineClick(currStep.step)}
                    >
                      {currStep.step === currentStep ? (
                        <div className="blue-text circle"> </div>
                      ) : currStep.step > currentStep ? (
                        <div className="black-text circle" />
                      ) : (
                        <i className="fa fa-check white-text checked blue" />
                      )}
                    </div>
                    <span>{currStep.timelineTitle}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="banner-wrapper blue">
          <h4
            className={
              loading
                ? "headline-timeline loading mt-1 white-text"
                : "headline-timeline mt-1 white-text"
            }
          >
            {bannerTitle}
          </h4>
          <p className="mt-1 white-text">{bannerDesc}</p>
        </div>
        <p className="blue-text text-center mt-1 fadein-anim">
          {bookingType === "updateBooking"
            ? `You are currently updating your booking on ${email}`
            : ""}
        </p>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  reducer: state.reducer,
});

export default connect(mapStateToProps, { setStep })(TimelineBanner);
