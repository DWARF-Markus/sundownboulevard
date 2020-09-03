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
  const [loading, setLoading] = useState(false);
  const [processingBooking, setProcessingBooking] = useState(false);

  useEffect(() => {
    setLoading(true);
    const beers = fetch("https://api.punkapi.com/v2/beers")
      .then((res) => res.json())
      .then((data) => {
        setUiDrinks(data);
        setLoading(false);
      });
  }, []);

  const handleBackClick = () => {
    setStep(2);
  };

  const handleDrinkSubmit = async () => {
    setProcessingBooking(true);

    setTimeout(() => {
      setProcessingBooking(false);
      setStep(4);
    }, 800);

    // const drinksToPost = drinks
    //   .map((drink, index) => `drinks[${index}][drinkId]=${drink}`)
    //   .join("&");

    // await fetch(
    //   `https://krh-sundown.dev.dwarf.dk/api/user/bookings/${id}/drinks?${drinksToPost}`,
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: token,
    //     },
    //   },
    // )
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //   });
  };

  if (loading || processingBooking) {
    return (
      <div className="confirm-display-wrapper mt-2">
        <div className="confirm-loading-screen mt-2">
          <div className="confirm-loader mt-2">
            <img className="loader-animation" src={image} alt="loading icon" />
            {setProcessingBooking ? (
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
              BACK
            </button>
          </div>
        </div>
        <p className="logo-text text-center blue-text">{drinksAmount} chosen</p>
        <div className="text-right">
          {drinksAmount === 0 ? (
            <button className="disabled-btn">CHOOSE MIN 1 DRINK</button>
          ) : (
            <button className="primary-btn" onClick={() => handleDrinkSubmit()}>
              NEXT
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
