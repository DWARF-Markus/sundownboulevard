import React, { useState } from "react";
import SliderContent from "./SliderContent";
import Dots from "./Dots";
import "./Slider.scss";

const Slider = ({ slides }) => {
  const getWidth = () => (window.innerWidth > 1220 ? 1220 : window.innerWidth);

  const [state, setState] = useState({
    activeIndex: 0,
    translate: 0,
    transition: 0.75,
    width: 0,
  });

  const { translate, transition, activeIndex } = state;

  const nextSlide = () => {
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
  };

  // const prevSlide = () => {
  //   if (activeIndex === 0) {
  //     return setState({
  //       ...state,
  //       translate: (slides.length - 1) * getWidth(),
  //       activeIndex: slides.length - 1,
  //     });
  //   }

  //   setState({
  //     ...state,
  //     activeIndex: activeIndex - 1,
  //     translate: (activeIndex - 1) * getWidth(),
  //   });
  // };

  return (
    <div className="slider-main" onClick={() => nextSlide()}>
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

      <Dots slides={slides} activeIndex={activeIndex} />
    </div>
  );
};

export default Slider;
