import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Drink from "./Drink";
import token from "../../../token";
import image from "../../../images/blue-beach.png";
import "./DrinksDisplay.scss";
import { setStep } from "../../../actions/actions";

function DrinksDisplay({
  reducer,
  setStep,
  drinksAmount,
  id,
  drinks,
  bookingPeople,
}) {
  const [uiDrinks, setUiDrinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingBooking, setProcessingBooking] = useState(false);

  useEffect(() => {
    setLoading(true);
    const beers = fetch(
      "https://krh-sundown.dev.dwarf.dk/api/user/drinks?guestCount=25",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
        },
      },
    )
      .then((res) => res.json())
      .then((data) => {
        setUiDrinks(data);
        setTimeout(() => {
          setLoading(false);
        }, 750);
      });
  }, []);

  const handleBackClick = () => {
    setStep(2);
    window.scrollTo(0, 0);
  };

  const handleDrinkSubmit = () => {
    window.scrollTo(0, 0);
    setProcessingBooking(true);

    setTimeout(() => {
      setProcessingBooking(false);
      setStep(4);
    }, 800);
  };

  if (loading || processingBooking) {
    return (
      <div className="confirm-display-wrapper">
        <div className="confirm-loading-screen">
          <div className="confirm-loader">
            <img className="loader-animation" src={image} alt="loading icon" />
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
            <button className="disabled-btn">CHOOSE MIN 1 DRINK</button>
          ) : (
            <button className="primary-btn" onClick={() => handleDrinkSubmit()}>
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

export default connect(mapStateToProps, { setStep })(DrinksDisplay);
