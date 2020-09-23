import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { setStep } from "../../../actions/actions";
import store from "../../../store";
import data from "./timeline-banner.json";
import "./TimelineBannerTwo.scss";

function TimelineBannerTwo({ step, setStep }) {
  const [currentStep, setCurrentStep] = useState(2);
  const [bookingType, setBookingType] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [barWidth, setBarWidth] = useState("");

  const [bannerTitle, setBannerTitle] = useState("");
  const [bannerDesc, setBannerDesc] = useState("");

  const history = useHistory();

  const handleHomeClick = () => {
    history.push("/");
  };

  const handleTimelineClick = (e, url) => {
    if (parseInt(e) === 1 || parseInt(e) === 5) {
      // wrong error
    } else {
      setStep(e);
      history.push(url);
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
          setBarWidth(((step - 1) / (data.length - 1)) * 100);
          setBannerTitle(info.bannerTitle);
          setBannerDesc(info.bannerDesc);
        }, 500);
      }
    });
  }, [step]);

  return (
    <div className="timeline-banner-container">
      <div className="mobile-timeline-banner blue px-1">
        <div className="back-button">
          <i
            onClick={() => handleHomeClick()}
            className="white-text fa fa-chevron-left"
          ></i>
        </div>
        <h4 className="white-text text-center">{bannerTitle}</h4>
        <h4 className="current-step-number white-text">
          <span>{currentStep}</span> /<span>5</span>
        </h4>
      </div>
      <div className="desktop-wrapper">
        <div className="timeline-container">
          <div className="timeline">
            <div
              className={
                step === 5 ? "timeline-wrapper disabled" : "timeline-wrapper"
              }
            >
              <div style={{ width: barWidth + "%" }} class="bar"></div>
              <div className="icons">
                {data.map((currStep, i) => {
                  return (
                    <div
                      onClick={() =>
                        handleTimelineClick(currStep.step, currStep.url)
                      }
                      key={i}
                      className={
                        currStep.step === currentStep
                          ? "timeline-entry timeline-entry--active"
                          : currStep.step < currentStep
                          ? "timeline-entry timeline-entry--done"
                          : "timeline-entry"
                      }
                    >
                      <div className="icon">
                        {currStep.step === currentStep ? (
                          <i className="fa fa-circle blue-text" />
                        ) : currStep.step > currentStep || currentStep === 5 ? (
                          <i className="fa fa-check blue-text done" />
                        ) : (
                          <i className="fa fa-circle blue-text" />
                        )}
                      </div>
                      <div className="title">
                        <span>{currStep.timelineTitle}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="banner-wrapper">
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

export default connect(mapStateToProps, { setStep })(TimelineBannerTwo);
