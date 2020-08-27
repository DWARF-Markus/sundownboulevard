import React from "react";

function Slide({ content }) {
  const slideStyles = {
    height: "100%",
    width: "100%",
    backgroundImage: `url(${content})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  };

  return <div style={slideStyles} />;
}

export default Slide;
