import React from "react";
import Dot from "./Dot";

const Dots = ({ slides, activeIndex }) => {
  const dotsStyle = {
    position: "absolute",
    bottom: "25px",
    width: "100%",
    display: "flex",
    alignItmes: "center",
    justifyContent: "center",
  };

  return (
    <div style={dotsStyle}>
      {slides.map((slide, i) => (
        <Dot key={slide} active={activeIndex === i} />
      ))}
    </div>
  );
};

export default Dots;
