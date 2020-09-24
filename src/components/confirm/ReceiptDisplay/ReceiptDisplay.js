/* eslint-disable no-shadow */
/* eslint-disable no-plusplus */
import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  setStep,
  setErrorMessage,
  setErrorActive,
} from "../../../actions/actions";
import "./ReceiptDisplay.scss";

function ReceiptDisplay({
  data,
  setStep,
  setErrorMessage,
  setErrorActive,
  reducer,
}) {
  const history = useHistory();

  const [dish, setDish] = useState("");
  const [email, setEmail] = useState("");
  const [guests, setGuests] = useState("");
  const [drinksToOutput, setDrinksToOutput] = useState([]);
  const [bookingDate, setBookingDate] = useState("");
  const drinksToShow = [];

  const countInArray = useCallback((arr, id) => {
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
      if (data.drinks[i] === id) {
        count++;
      }
    }
    return count;
  }, []);

  useEffect(() => {
    if (reducer.dish === null) {
      setStep(2);
      setErrorMessage("You need to pick a dish first");
      setErrorActive(true);
      history.push("/order/dish");
    } else if (reducer.drinks.length === 0) {
      setStep(3);
      setErrorMessage("You need to pick minimum one drink");
      setErrorActive(true);
      history.push("/order/drinks");
    } else if (reducer.bookingEmail === null) {
      setStep(4);
      setErrorMessage("Please fill out all information for this booking");
      setErrorActive(true);
      history.push("/order/confirm");
    } else {
      setDish(data.dish.strMeal);
      setEmail(data.bookingEmail);
      setGuests(data.bookingPeople);
      setBookingDate(data.bookingDate);

      data.drinksName.map((drink) => {
        return drinksToShow.push({
          id: drink.id,
          count: countInArray(data.drinksName, drink.id),
          name: drink.name,
        });
      });

      setDrinksToOutput([
        ...new Map(drinksToShow.map((item) => [item.id, item])).values(),
      ]);
    }
  }, [data]);

  const handleHomeBtn = useCallback(() => {
    setStep(2);
    history.push("/");
  }, []);

  return (
    <div className="receipt-container">
      <div className="receipt text-center">
        <h3 className="mt-1 text-left logo-text blue-text">RECEIPT</h3>
        <div className="order-items">
          <p>
            {guests}x <span>{dish}</span>
          </p>
          {drinksToOutput.map((drink) => {
            return (
              <p>
                {drink ? drink.count : ""}x{" "}
                <span>{drink ? drink.name : ""}</span>
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
            Date and time <span>{bookingDate}</span>
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

const mapStateToProps = (state) => ({
  reducer: state.reducer,
});

export default connect(mapStateToProps, {
  setStep,
  setErrorMessage,
  setErrorActive,
})(ReceiptDisplay);
