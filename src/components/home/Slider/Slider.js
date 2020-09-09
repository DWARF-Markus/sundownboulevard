/* eslint-disable consistent-return */
import React, { useState, useEffect, useRef, useCallback } from "react";
import SliderContent from "./SliderContent";
import Dots from "./Dots";
import "./Slider.scss";

function Slider({ slides, autoPlay }) {
  const autoplayRef = useRef();

  const getWidth = useCallback(
    () => (window.innerWidth > 1220 ? 1220 : window.innerWidth),
    [window.innerWidth],
  );

  const [state, setState] = useState({
    activeIndex: 0,
    translate: 0,
    transition: 0.75,
    width: 0,
  });

  const { translate, transition, activeIndex } = state;

  const nextSlide = useCallback(() => {
    if (activeIndex === slides.length - 1) {
      return setState({
        ...state,
        translate: 0,
        activeIndex: 0,
      });
    }
    setState({
      ...state,
      activeIndex: activeIndex + 1,
      translate: (activeIndex + 1) * getWidth(),
    });
  }, [activeIndex]);

  const handlePassIndex = useCallback(
    (e) => {
      setState({
        ...state,
        activeIndex: e,
        translate: e * getWidth(),
      });
    },
    [activeIndex],
  );

  useEffect(() => {
    autoplayRef.current = nextSlide;
  }, [activeIndex]);

  useEffect(() => {
    const play = () => {
      autoplayRef.current();
    };

    const interval = setInterval(play, autoPlay * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slider-main">
      <SliderContent
        translate={translate}
        transition={transition}
        width={getWidth()}
        slides={slides}
        activeIndex={activeIndex}
        opacity="0.3"
      >
        {" "}
      </SliderContent>

      <Dots
        onPassIndex={handlePassIndex}
        slides={slides}
        activeIndex={activeIndex}
      />
    </div>
  );
}

export default Slider;
