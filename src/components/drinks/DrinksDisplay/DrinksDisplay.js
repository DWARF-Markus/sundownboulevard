import React, { useState, useEffect } from "react";
import Drink from "./Drink";
import "./DrinksDisplay.scss";

function DrinksDisplay() {
  const [drinks, setDrinks] = useState([]);
  const [selectedDrinks, setSelectedDrinks] = useState([]);

  useEffect(() => {
    const beers = fetch("https://api.punkapi.com/v2/beers")
      .then((res) => res.json())
      .then((data) => setDrinks(data));
  }, []);

  return (
    <div className="drinks-container">
      {drinks.map((drink) => {
        return <Drink drink={drink} />;
      })}
    </div>
  );
}

export default DrinksDisplay;
