import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./ErrorPopUp.scss";
import { setErrorActive } from "../../actions/actions";

function ErrorPopUp({ text, danger, stay, reducer, setErrorActive }) {
  useEffect(() => {
    setTimeout(() => {
      setErrorActive(false);
    }, 4000);
  }, [reducer.error]);

  return (
    <div
      className={
        reducer.errorActive
          ? "error-popup-wrapper error-popup-wrapper--active"
          : "error-popup-wrapper"
      }
    >
      <div
        className={
          danger ? "error-popup-container red" : "error-popup-container blue"
        }
      >
        <p className="white-text">
          {text}
          <i className={danger ? "fa fa-exclamation-triangle" : "fa fa-ban"} />
        </p>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  reducer: state.reducer,
});

export default connect(mapStateToProps, { setErrorActive })(ErrorPopUp);
