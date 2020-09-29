import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { getDish, getDishOffline, setStep } from "../../../actions/actions";
import "./DishDisplay.scss";

function DishDisplay({ getDish, setStep, getDishOffline, reducer }) {
  const history = useHistory();

  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [initLoading, setInitLoading] = useState(true);
  const [prevDish, setPrevDish] = useState(null);
  const [currDish, setCurrDish] = useState(null);
  const [refreshCount, setRefreshCount] = useState(0);

  useEffect(() => {
    setStep(2);
    if (reducer.dish === null) {
      getDish();

      setTimeout(() => {
        setLoading(false);
      }, 400);
    } else {
      setCurrDish(reducer.dish);
      setLoading(false);
    }
    setTimeout(() => {
      setInitLoading(false);
    }, 900);
  }, []);

  useEffect(() => {
    setPrevDish(reducer.dish);
  }, [reducer.dish]);

  const handleDishSubmit = useCallback(async () => {
    window.scrollTo(0, 0);
    setStep(3);
    history.push("/order/drinks");
  }, [getDish]);

  const handleBackClick = useCallback(() => {
    window.scrollTo(0, 0);
    history.push("/");
  }, []);

  const startLoading = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setButtonLoading(false);
      setCurrDish(reducer.dish);
    }, 1000);
  };

  const handleNewDish = () => {
    setButtonLoading(true);
    setRefreshCount(refreshCount + 1);
    if (reducer.networkConnection) {
      getDish();

      setPrevDish(reducer.dish);
    } else {
      getDishOffline();

      setTimeout(() => {
        setPrevDish(reducer.dish);
        setLoading(true);
      }, 500);

      setTimeout(() => {
        setLoading(false);
        setButtonLoading(false);
        setCurrDish(reducer.dish);
      }, 1000);
    }
  };

  if (initLoading) {
    return (
      <div className="confirm-display-wrapper">
        <div className="confirm-loading-screen">
          <div className="confirm-loader">
            <i className="fa fa-spinner blue-text loader-animation pt-1" />
            <p className="logo-text blue-text">Loading dish ...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className={
          loading
            ? "dish-presentation dish-presentation--transition dish-presentation--loading"
            : "dish-presentation dish-presentation--no-transition"
        }
      >
        <div
          className={
            loading
              ? "dish-display-container dish-display-container-prev dish-display-container-prev--loading mt-1"
              : "dish-display-container dish-display-container-prev mt-1"
          }
        >
          <div className="dish-display-desc p-1">
            {prevDish !== null ? (
              <>
                <h3 className="logo-text blue-text">{prevDish.strCategory}</h3>
                <h1 className="mt-1">{prevDish.strMeal}</h1>
                <p className="mt-1">{prevDish.strInstructions}</p>
              </>
            ) : (
              <></>
            )}
          </div>
          <div className="dish-display-img p-1">
            {prevDish !== null && reducer.networkConnection ? (
              <img
                onLoad={() => startLoading()}
                src={prevDish.strMealThumb}
                alt="image of meal"
              />
            ) : prevDish !== null ? (
              <img src={prevDish.strMealThumb} alt="image of meal" />
            ) : (
              <></>
            )}
          </div>
        </div>
        <div
          className={
            loading
              ? "dish-display-container dish-display-container--transition dish-display-container--loading mt-1"
              : "dish-display-container dish-display-container--no-transition mt-1"
          }
        >
          <div className="dish-display-desc p-1">
            {currDish !== null ? (
              <>
                <h3 className="logo-text blue-text">{currDish.strCategory}</h3>
                <h1 className="mt-1">{currDish.strMeal}</h1>
                <p className="mt-1">{currDish.strInstructions}</p>
              </>
            ) : (
              <></>
            )}
          </div>
          <div className="dish-display-img p-1">
            {currDish !== null ? (
              <img src={currDish.strMealThumb} alt="image of meal" />
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <div className="btn-container px-1">
        <div className="text-left">
          <div className="back-container">
            <button
              type="submit"
              className="primary-back-btn blue-text"
              onClick={() => handleBackClick()}
            >
              {" "}
              <i className="fa fa-caret-left"> </i>
              HOME
            </button>
          </div>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className={
              buttonLoading
                ? "refresh-btn blue-text refresh-btn--spin"
                : "refresh-btn blue-text"
            }
            onClick={() => handleNewDish()}
          >
            NEW DISH
            <i className="fa fa-refresh"> </i>
          </button>
        </div>
        <div className="text-right">
          <button
            type="submit"
            className="primary-btn blue"
            onClick={() => handleDishSubmit()}
          >
            DRINKS
            <i className="fa fa-caret-right"> </i>
          </button>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  reducer: state.reducer,
});

export default connect(mapStateToProps, { getDish, getDishOffline, setStep })(
  DishDisplay,
);
