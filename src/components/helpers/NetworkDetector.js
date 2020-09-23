import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  setNetworkStatus,
  setErrorMessage,
  setErrorActive,
} from "../../actions/actions";

function NetworkDetector({
  setNetworkStatus,
  setErrorMessage,
  setErrorActive,
}) {
  const handleConnectionChange = () => {
    const condition = navigator.onLine;
    setNetworkStatus(condition);

    if (condition) {
      setErrorActive(false);
      setErrorMessage("");
    } else {
      setErrorActive(true);
      setErrorMessage("No internet detected");
    }
  };

  useEffect(() => {
    window.addEventListener("online", handleConnectionChange);
    window.addEventListener("offline", handleConnectionChange);

    return () => {
      window.removeEventListener("online", handleConnectionChange);
      window.removeEventListener("offline", handleConnectionChange);
    };
  }, [navigator.onLine]);

  return null;
}

export default connect(null, {
  setNetworkStatus,
  setErrorMessage,
  setErrorActive,
})(NetworkDetector);
