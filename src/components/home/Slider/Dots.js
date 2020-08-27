import React from "react";
import Dot from "./Dot";
import "./Dots.scss";

function Dots({ slides, activeIndex }) {
  return (
    <div className="dots-container">
      {slides.map((slide, i) => (
        <Dot key={slide} active={activeIndex === i} />
      ))}
    </div>
  );
}

export default Dots;
