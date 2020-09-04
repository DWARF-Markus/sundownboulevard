/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from "react";
import store from "../../../store";
import BackBtn from "./BackBtn";
import { connect } from "react-redux";
import data from "./timeline-banner.json";
import "./TimelineBanner.scss";
import { setBookingType } from "../../../actions/actions";

function TimelineBanner({ step }) {
  const [backLocation, setBackLocation] = useState("/");
  const [currentStep, setCurrentStep] = useState(2);
  const [bookingType, setBookingType] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const [timelineTitle, setTimelineTitle] = useState("");
  const [bannerTitle, setBannerTitle] = useState("");
  const [bannerDesc, setBannerDesc] = useState("");

  useEffect(() => {
    console.log("mount");
    setLoading(true);
    setCurrentStep(store.getState().reducer.step);
    setBookingType(store.getState().reducer.bookingType);
    setEmail(store.getState().reducer.bookingEmail);
    data.map((info) => {
      if (info.step === step) {
        setTimeout(() => {
          setLoading(false);
          setTimelineTitle(info.timelineTitle);
          setBannerTitle(info.bannerTitle);
          setBannerDesc(info.bannerDesc);
          console.log("unmount");
        }, 500);
      }
    });
  }, [step]);

  return (
    <div className="timeline-banner-container">
      <div className="mobile-timeline-banner blue px-1">
        <BackBtn color="white-text" title="HOME" />
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
              {data.map((step, i) => {
                return (
                  <div
                    key={i}
                    className={
                      step.step === currentStep
                        ? "timeline-entry active"
                        : step.step < currentStep
                        ? "timeline-entry done"
                        : "timeline-entry"
                    }
                  >
                    <div className="icon">
                      {step.step === currentStep ? (
                        <div className="blue-text circle"> </div>
                      ) : step.step > currentStep ? (
                        <div className="black-text circle" />
                      ) : (
                        <i className="fa fa-check white-text checked blue" />
                      )}
                    </div>
                    <span>{step.timelineTitle}</span>
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

export default connect(mapStateToProps)(TimelineBanner);
