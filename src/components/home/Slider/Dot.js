import React, { useCallback, useMemo } from "react";
import "./Dot.scss";

function Dot({ id, active, onPassIndex }) {
  const dotColor = useMemo(
    () => ({
      background: `${active ? "#ba2329" : "white"}`,
    }),
    [active],
  );

  const handleDotClick = (e) => {
    onPassIndex(e);
  };

  return (
    <span onClick={() => handleDotClick(id)} className="dot" style={dotColor}>
      {" "}
    </span>
  );
}

export default Dot;
