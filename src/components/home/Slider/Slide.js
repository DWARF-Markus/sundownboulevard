import React, { useMemo } from "react";

function Slide({ content }) {
  const slideStyles = useMemo(
    () => ({
      height: "100%",
      width: "100%",
      backgroundImage: `url(${content})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    }),
    [content],
  );

  return <div style={slideStyles} />;
}

export default Slide;
