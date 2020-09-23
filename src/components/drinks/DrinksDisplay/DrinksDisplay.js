/* eslint-disable react/no-array-index-key */
/* eslint-disable no-shadow */
import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import Drink from "./Drink";
import image from "../../../images/blue-beach.png";
import "./DrinksDisplay.scss";
import { setStep, setErrorMessage } from "../../../actions/actions";

function DrinksDisplay({
  reducer,
  setStep,
  setErrorMessage,
  drinksAmount,
  bookingPeople,
}) {
  let history = useHistory();
  const [uiDrinks, setUiDrinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingBooking, setProcessingBooking] = useState(false);

  useEffect(() => {
    if (reducer.dish === null) {
      setStep(2);
      history.push("/order/dish");
      setErrorMessage("Please choose a dish first");
      window.scrollTo(0, 0);
    } else {
      setStep(3);
      setLoading(true);

      const localDrinks = localStorage.getItem("drinks");

      if (localDrinks !== null && !reducer.networkConnection) {
        setUiDrinks(JSON.parse(localDrinks));
        setTimeout(() => {
          setLoading(false);
        }, 750);
      } else {
        fetch("https://krh-sundown.dev.dwarf.dk/api/user/all_drinks ", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            localStorage.setItem("drinks", JSON.stringify(data));

            setUiDrinks(data);
            setTimeout(() => {
              setLoading(false);
            }, 750);
          });
      }
    }
  }, []);

  const handleBackClick = useCallback(() => {
    setStep(2);
    history.push("/order/dish");
    window.scrollTo(0, 0);
  }, []);

  const handleDrinkSubmit = useCallback(() => {
    window.scrollTo(0, 0);
    setProcessingBooking(true);

    setTimeout(() => {
      setProcessingBooking(false);
      setStep(4);
      history.push("/order/confirm");
    }, 800);
  }, []);

  if (loading || processingBooking) {
    return (
      <div className="confirm-display-wrapper">
        <div className="confirm-loading-screen">
          <div className="confirm-loader">
            <i className="fa fa-spinner blue-text loader-animation pt-1" />
            {processingBooking ? (
              <p className="logo-text blue-text">Processing booking ...</p>
            ) : (
              <p className="logo-text blue-text">Loading drinks ...</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="drinks-container">
        {uiDrinks.map((UIdrink, i) => {
          return (
            <Drink
              drinksAmount={drinksAmount}
              bookingPeople={bookingPeople}
              selected={reducer.drinks}
              key={i}
              drink={UIdrink}
            />
          );
        })}
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
              DISHES
            </button>
          </div>
        </div>
        <p className="logo-text text-center blue-text">{drinksAmount} chosen</p>
        <div className="text-right">
          {drinksAmount === 0 ? (
            <button type="submit" className="disabled-btn">
              CHOOSE MIN 1 DRINK
            </button>
          ) : (
            <button
              type="submit"
              className="primary-btn"
              onClick={() => handleDrinkSubmit()}
            >
              CONFIRM
              <i className="fa fa-caret-right"> </i>
            </button>
          )}
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  reducer: state.reducer,
});

export default connect(mapStateToProps, { setStep, setErrorMessage })(
  DrinksDisplay,
);
