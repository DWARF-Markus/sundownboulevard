/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from "react";
import BackBtn from "./BackBtn";
import data from "./timeline-banner.json";
import "./TimelineBanner.scss";

function TimelineBanner() {
  const [backLocation, setBackLocation] = useState("/");
  const [currentStep, setCurrentStep] = useState(2);

  const [timelineTitle, setTimelineTitle] = useState("");
  const [bannerTitle, setBannerTitle] = useState("");
  const [bannerDesc, setBannerDesc] = useState("");

  useEffect(() => {
    data.map((step) => {
      if (step.step === currentStep) {
        setTimelineTitle(step.timelineTitle);
        setBannerTitle(step.bannerTitle);
        setBannerDesc(step.bannerDesc);
      }
    });
  }, [currentStep]);

  return (
    <div className="timeline-banner-container">
      <div className="mobile-timeline-banner red px-1">
        <BackBtn color="white-text" title="GO BACK" navigateTo={backLocation} />
        <h4 className="current-step-text white-text">{bannerTitle}</h4>
        <h4 className="current-step-number white-text">
          <span>{currentStep}</span> / <span>5</span>
        </h4>
      </div>
      <div className="desktop-wrapper">
        <div className="timeline-container">
          <div className="timeline-wrapper mt-1 px-2">
            {data.map((step) => {
              return (
                <div
                  className={
                    step.step === currentStep
                      ? "timeline-entry active"
                      : "timeline-entry"
                  }
                >
                  <div className="icon">
                    {step.step === currentStep ? (
                      <i className="fa fa-circle red-text" />
                    ) : step.step > currentStep ? (
                      <i className="fa fa-circle black-text" />
                    ) : (
                      <i className="fa fa-check white-text checked red" />
                    )}
                  </div>
                  <span>{step.timelineTitle}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="banner-wrapper red p-1">
          <h4 className="mt-1 white-text">{bannerTitle}</h4>
          <p className="mt-1 white-text">{bannerDesc}</p>
        </div>
        <div className="m-1">
          <BackBtn color="red-text" title="GO BACK" navigateTo={backLocation} />
        </div>
      </div>
    </div>
  );
}

export default TimelineBanner;
