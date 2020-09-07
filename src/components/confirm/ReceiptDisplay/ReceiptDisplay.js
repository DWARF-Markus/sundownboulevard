/* eslint-disable no-shadow */
/* eslint-disable no-plusplus */
import React, { useState, useEffect } from "react";
import Moment from "react-moment";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { setStep } from "../../../actions/actions";
import "./ReceiptDisplay.scss";

function ReceiptDisplay({ data, setStep }) {
  const history = useHistory();

  const [dish, setDish] = useState("");
  const [drinks, setDrinks] = useState([]);
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState("");
  const [drinksToOutput, setDrinksToOutput] = useState([]);
  const drinksToShow = [];

  useEffect(() => {
    setDish(data.dish.strMeal);
    setEmail(data.bookingEmail);
    setDate(new Date(data.bookingDate));
    setGuests(data.bookingPeople);
    setDrinks(data.drinksName);

    function countInArray(arr, id) {
      let count = 0;
      for (let i = 0; i < arr.length; i++) {
        if (data.drinks[i] === id) {
          count++;
        }
      }
      return count;
    }

    data.drinksName.map((drink) => {
      drinksToShow.push({
        id: drink.id,
        count: countInArray(data.drinksName, drink.id),
        name: drink.name,
      });
    });

    setDrinksToOutput([
      ...new Map(drinksToShow.map((item) => [item.id, item])).values(),
    ]);
  }, [data]);

  const handleHomeBtn = () => {
    setStep(2);
    history.push("/");
  };

  return (
    <div className="receipt-container">
      <div className="receipt text-center">
        <h3 className="mt-1 text-left logo-text blue-text">RECEIPT</h3>
        <div className="order-items">
          <p>
            {guests}x <span>{dish}</span>
          </p>
          {drinksToOutput.map((drink, i) => {
            return (
              <p key={i}>
                {drink.count}x <span>{drink.name}</span>
              </p>
            );
          })}
        </div>
        <div className="divider"> </div>
        <div className="order-details">
          <p>
            Email <span>{email}</span>
          </p>
          <p>
            Date and time{" "}
            <span>
              <Moment format="MM/DD/YYYY HH:mm">{data.bookingDate}</Moment>
            </span>
          </p>
          <p>
            Guests <span>{guests}</span>
          </p>
        </div>
      </div>
      <button
        type="submit"
        className="confirm-btn mt-2"
        onClick={() => handleHomeBtn()}
      >
        HOME
      </button>
    </div>
  );
}

export default connect(null, { setStep })(ReceiptDisplay);
