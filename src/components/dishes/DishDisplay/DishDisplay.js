import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getDish } from "../../../actions/actions";
import "./DishDisplay.scss";

function DishDisplay({ dish, getDish }) {
  return (
    <div className="dish-display-container mt-1">
      <div className="dish-display-desc p-1">
        <h3 className="logo-text">{dish.strCategory}</h3>
        <h1 className="mt-1">{dish.strMeal}</h1>
        <p className="mt-1">{dish.strInstructions}</p>
        <button type="submit" className="refresh-btn" onClick={() => getDish()}>
          NEW DISH
          <i className="fa fa-refresh"> </i>
        </button>
      </div>
      <div className="dish-display-img p-1">
        <img src={dish.strMealThumb} alt="Dish Image" />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  reducer: state.dish,
});

export default connect(mapStateToProps, { getDish })(DishDisplay);
