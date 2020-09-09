/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable radix */
/* eslint-disable no-shadow */
import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { setDrink, decreaseDrink } from "../../../actions/actions";
import "./Drink.scss";

function Drink({ drink, setDrink, decreaseDrink, selected }) {
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

  const handleDrinksDecrease = useCallback(
    (id) => {
      decreaseDrink(id);
      setAmount((prev) => prev - 1);

      const isThisLastEntry = amount === 1;

      if (isThisLastEntry) {
        setIsSelected(false);
      }
    },
    [isSelected, amount],
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
        <div className="drink-selected-amount">
          <span
            className="remove-btn"
            onClick={() => handleDrinksDecrease(drink)}
          >
            -
          </span>

          <span className="amount-display">{amount >= 0 ? amount : ""}</span>

          <span className="add-btn" onClick={() => handleDrinkSelect(drink)}>
            +
          </span>
        </div>
      </div>
      <div role="button" className="drink-image">
        <div className={doneLoading ? "loading-image" : "loading-image hidden"}>
          <img onLoad={() => imageLoading()} src={drink.image_url} alt="beer" />
        </div>
      </div>
      <div role="button" className="drink-desc">
        <h3>{drink.name}</h3>
        <p>{drink.description}</p>
        <p className="logo-text blue-text mt-1">{drink.abv}%</p>
      </div>
    </div>
  );
}

export default connect(null, { setDrink, decreaseDrink })(Drink);
