import React from "react";
import "./Dot.scss";

const Dot = ({ active }) => {
  const dotColor = {
    background: `${active ? "#ba2329" : "white"}`,
  };

  return (
    <span className="dot" style={dotColor}>
      {" "}
    </span>
  );
};

export default Dot;
