import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  getDish,
  setStep,
  setDishOnUpdate,
  clearDish,
  clearDrinks,
} from "../actions/actions";
import token from "../token";
import image from "../images/blue-beach.png";
import store from "../store";
import TimelineBanner from "../components/ui/TimelineBanner/TimelineBanner";
import DishDisplay from "../components/dishes/DishDisplay/DishDisplay";
import DrinksDisplay from "../components/drinks/DrinksDisplay/DrinksDisplay";
import ConfirmDisplay from "../components/confirm/ConfirmDisplay/ConfirmDisplay";
import ReceiptDisplay from "../components/confirm/ReceiptDisplay/ReceiptDisplay";
import PrimaryBtn from "../components/ui/PrimaryBtn/PrimaryBtn";
import PrimaryBackBtn from "../components/ui/PrimaryBackBtn/PrimaryBackBtn";
import "./OrderPage.scss";

function OrderPage({
  getDish,
  setStep,
  setDishOnUpdate,
  reducer,
  clearDrinks,
  clearDish,
}) {
  const [currentDish, setCurrentDish] = useState("");
  const [currentStep, setCurrentStep] = useState("");
  const [drinks, setDrinks] = useState("");
  const [drinksAmount, setDrinksAmount] = useState("");
  const [bookingPeople, setBookingPeople] = useState("");
  const [bookingId, setBookingId] = useState("");
  const [currentBookingType, setCurrentBookingType] = useState("");
  const [loading, setLoading] = useState(true);
  const [dishId, setDishId] = useState("");

  let history = useHistory();

  const handleCancelClick = async () => {
    await fetch(
      `
    https://krh-sundown.dev.dwarf.dk/api/user/bookings/${bookingId}/destroy`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      },
    );
    setStep(2);
    history.push("/");
  };

  const setPage = () => {
    if (currentStep === 2)
      return (
        <DishDisplay
          currentBookingType={currentBookingType}
          id={bookingId}
          dish={currentDish}
        />
      );
    if (currentStep === 3)
      return (
        <DrinksDisplay
          id={bookingId}
          drinks={drinks}
          drinksAmount={drinksAmount}
          bookingPeople={bookingPeople}
        />
      );
    if (currentStep === 4)
      return (
        <ConfirmDisplay
          dish={currentDish}
          drinks={drinks}
          id={bookingId}
          currentBookingType={currentBookingType}
        />
      );
    if (currentStep === 5)
      return <ReceiptDisplay data={store.getState().reducer} />;
  };

  const currentPage = setPage(currentStep);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const dish = store.getState().reducer.dish;
      const step = store.getState().reducer.step;
      const drinks = store.getState().reducer.drinks;
      const drinksAmount = store.getState().reducer.drinks.length;
      const bookingPeople = store.getState().reducer.bookingPeople;
      const bookingId = store.getState().reducer.bookingId;
      const bookingType = store.getState().reducer.bookingType;

      setCurrentDish(dish);
      setCurrentStep(step);
      setDrinks(drinks);
      setDrinksAmount(drinksAmount);
      setBookingPeople(bookingPeople);
      setBookingId(bookingId);
      setCurrentBookingType(bookingType);
    });
    return unsubscribe;
  });

  useEffect(() => {
    if (reducer.bookingType === "newBooking" || reducer.bookingType === null) {
      clearDrinks();
      clearDish();
      getDish();
    }

    setTimeout(() => {
      setLoading(false);
    }, 750);
  }, []);

  if (loading) {
    return (
      <div className="confirm-display-wrapper mt-2 loader-page">
        <div className="confirm-loading-screen mt-2">
          <div className="confirm-loader mt-2">
            <img className="loader-animation" src={image} alt="loading icon" />
            <p className="logo-text blue-text">Loading ...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <TimelineBanner
        currentBookingType={currentBookingType}
        dishTitle={currentDish.strMeal}
        step={currentStep}
      />
      <div className="page-wrapper">
        <div className="fadein-animation">{currentPage}</div>
      </div>
      <div className="text-left mt-1 px-1">
        {currentBookingType === "updateBooking" ? (
          <button
            className="delete-btn white-text red"
            onClick={() => handleCancelClick()}
          >
            <i className="fa fa-times"> </i>Cancel booking
          </button>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  reducer: state.reducer,
});

export default connect(mapStateToProps, {
  getDish,
  setStep,
  setDishOnUpdate,
  clearDrinks,
  clearDish,
})(OrderPage);
