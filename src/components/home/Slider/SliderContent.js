import React from "react";
import Slide from "./Slide";

function SliderContent({ slides, width, translate, transition, opacity }) {
  const SliderContentStyles = {
    transform: `translateX(-${translate}px)`,
    transition: `transform ease-in-out ${transition}s`,
    height: "100%",
    opacity: `${opacity}`,
    width: `${slides.length}00%`,
    display: "flex",
  };

  return (
    <div style={SliderContentStyles}>
      {slides.map((slide) => (
        <div style={{ width }}>
          <Slide content={slide} />
        </div>
      ))}
    </div>
  );
}

export default SliderContent;
