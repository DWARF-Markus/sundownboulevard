/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable radix */
/* eslint-disable no-shadow */
import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { setDrink, removeDrink } from "../../../actions/actions";
import "./Drink.scss";

function Drink({ drink, setDrink, removeDrink, selected }) {
  const [isSelected, setIsSelected] = useState(false);
  const [amount, setAmount] = useState(0);
  const [doneLoading, setDoneLoading] = useState(false);

  useEffect(() => {
    const alreadySelected = selected;

    alreadySelected.map((entry) => {
      if (parseInt(entry) === parseInt(drink.id)) {
        setIsSelected(true);
        setAmount((amount) => amount + 1);
      }
    });
  }, []);

  const imageLoading = useCallback(() => {
    setDoneLoading(true);
  }, [doneLoading]);

  const handleDrinkSelect = useCallback(
    (id, name) => {
      setDrink(id, name);
      if (isSelected) {
        setAmount(parseInt(amount) + 1);
      } else {
        setIsSelected(true);
        setAmount(1);
      }
    },
    [amount],
  );

  const handleDrinksRemove = useCallback(
    (id) => {
      if (isSelected) {
        removeDrink(id);
        setIsSelected(false);
        setAmount(0);
      }
    },
    [isSelected],
  );

  return (
    <div className={isSelected ? "drink-entry selected" : "drink-entry"}>
      <div
        className={
          isSelected
            ? "drink-selected-container"
            : "drink-selected-container hidden"
        }
      >
        <div
          role="button"
          className="drink-selected-remove"
          onClick={() => handleDrinksRemove(drink)}
        >
          <i className="fa fa-times red-text"> </i>
        </div>
        <div className="drink-selected-amount">
          <span>{amount >= 0 ? amount : ""}</span>
        </div>
      </div>
      <div
        role="button"
        className="drink-image"
        onClick={() => handleDrinkSelect(drink)}
      >
        <div className={doneLoading ? "loading-image" : "loading-image hidden"}>
          <img onLoad={() => imageLoading()} src={drink.image_url} alt="beer" />
        </div>
      </div>
      <div
        role="button"
        className="drink-desc"
        onClick={() => handleDrinkSelect(drink)}
      >
        <h3>{drink.name}</h3>
        <p>{drink.description}</p>
        <p className="logo-text blue-text mt-1">{drink.abv}%</p>
      </div>
    </div>
  );
}

export default connect(null, { setDrink, removeDrink })(Drink);
