import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { getDish, setStep } from "../../../actions/actions";
import "./DishDisplay.scss";

function DishDisplay({ getDish, setStep, dish, id, currentBookingType }) {
  let history = useHistory();

  const handleDishSubmit = useCallback(async () => {
    window.scrollTo(0, 0);
    setStep(3);
  }, [getDish]);

  const handleBackClick = useCallback(() => {
    window.scrollTo(0, 0);
    history.push("/");
  }, []);

  return (
    <>
      <div className="dish-display-container mt-1">
        <div className="dish-display-desc p-1">
          <h3 className="logo-text blue-text">{dish.strCategory}</h3>
          <h1 className="mt-1">{dish.strMeal}</h1>
          <p className="mt-1">{dish.strInstructions}</p>
          <button
            type="submit"
            className="refresh-btn blue-text"
            onClick={() => getDish()}
          >
            NEW DISH
            <i className="fa fa-refresh"> </i>
          </button>
        </div>
        <div className="dish-display-img p-1">
          <img src={dish.strMealThumb} alt="image of meal" />
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
        <div> </div>
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
  reducer: state.dish,
});

export default connect(mapStateToProps, { getDish, setStep })(DishDisplay);
