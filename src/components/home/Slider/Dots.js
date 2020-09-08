import React from "react";
import Dot from "./Dot";
import "./Dots.scss";

function Dots({ slides, activeIndex, onPassIndex }) {
  const handlePassIndex = (e) => {
    onPassIndex(e);
  };

  return (
    <div className="dots-container">
      {slides.map((slide, i) => (
        <Dot onPassIndex={handlePassIndex} id={i} active={activeIndex === i} />
      ))}
    </div>
  );
}

export default Dots;
