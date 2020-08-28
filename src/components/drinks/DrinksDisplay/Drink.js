import React from "react";
import "./Drink.scss";

function Drink({ drink }) {
  return (
    <div className="drink-entry">
      <div className="drink-image">
        <img src={drink.image_url} alt="Image of beer" />
      </div>
      <div className="drink-desc">
        <h3>{drink.name}</h3>
        <p>{drink.description}</p>
        <p>{drink.abv}</p>
      </div>
      <h3>{drink.name}</h3>
    </div>
  );
}

export default Drink;
