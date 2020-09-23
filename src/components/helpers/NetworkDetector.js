import React, { useEffect } from "react";
import { connect } from "react-redux";
import { setNetworkStatus } from "../../actions/actions";

function NetworkDetector({ setNetworkStatus }) {
  const handleConnectionChange = () => {
    const condition = navigator.onLine;
    setNetworkStatus(condition);
  };

  useEffect(() => {
    console.log("triggered");
    window.addEventListener("online", handleConnectionChange);
    window.addEventListener("offline", handleConnectionChange);

    return () => {
      window.removeEventListener("online", handleConnectionChange);
      window.removeEventListener("offline", handleConnectionChange);
    };
  }, [navigator.onLine]);

  return null;
}

export default connect(null, { setNetworkStatus })(NetworkDetector);
