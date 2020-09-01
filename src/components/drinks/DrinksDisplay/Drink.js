import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { setDrink, removeDrink } from "../../../actions/actions";
import "./Drink.scss";

function Drink({ drink, setDrink, removeDrink, selected }) {
  const [isSelected, setIsSelected] = useState(false);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const alreadySelected = selected;
    if (alreadySelected.includes(drink.id)) {
      setIsSelected(true);

      alreadySelected.map((alreadySelectedDrink) => {
        if (alreadySelectedDrink === drink.id) {
          setAmount((amount) => amount + 1);
        }
      });
    }
  }, []);

  const handleDrinkSelect = (id, name) => {
    setDrink(id, name);
    if (isSelected) {
      setAmount(parseInt(amount) + 1);
    } else {
      setIsSelected(true);
      setAmount(1);
    }
  };

  const handleDrinksRemove = (id) => {
    if (isSelected) {
      removeDrink(id);
      setIsSelected(false);
      setAmount(0);
    }
  };

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
          className="drink-selected-remove"
          onClick={() => handleDrinksRemove(drink)}
        >
          <i className="fa fa-times red white-text"> </i>
        </div>
        <div className="drink-selected-amount">
          <span>{amount >= 0 ? amount : ""}</span>
        </div>
      </div>
      <div className="drink-image" onClick={() => handleDrinkSelect(drink)}>
        <img src={drink.image_url} alt="Image of beer" />
      </div>
      <div className="drink-desc" onClick={() => handleDrinkSelect(drink)}>
        <h3>{drink.name}</h3>
        <p>{drink.description}</p>
        <p className="logo-text blue-text mt-1">{drink.abv}%</p>
      </div>
    </div>
  );
}

export default connect(null, { setDrink, removeDrink })(Drink);
