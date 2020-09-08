/* eslint-disable react/no-array-index-key */
import React, { useMemo } from "react";
import Slide from "./Slide";

function SliderContent({ slides, width, translate, transition, opacity }) {
  const SliderContentStyles = useMemo(
    () => ({
      transform: `translateX(-${translate}px)`,
      transition: `transform ease-in-out ${transition}s`,
      height: "100%",
      opacity: `${opacity}`,
      width: `${slides.length}00%`,
      display: "flex",
    }),
    [translate, transition, opacity, slides],
  );

  return (
    <div style={SliderContentStyles}>
      {slides.map((slide, i) => (
        <div key={i} style={{ width }}>
          <Slide content={slide} />
        </div>
      ))}
    </div>
  );
}

export default SliderContent;
