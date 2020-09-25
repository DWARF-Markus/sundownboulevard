/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
import React, { useState, useEffect, useCallback } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  useHistory,
  useLocation,
} from "react-router-dom";
import { connect } from "react-redux";
import {
  getDish,
  setStep,
  setDishOnUpdate,
  clearDish,
  clearDrinks,
  setBookingType,
  setErrorMessage,
  setErrorActive,
} from "../actions/actions";
import store from "../store";
import ErrorPopUp from "../components/helpers/ErrorPopUp";
import TimelineBannerTwo from "../components/ui/TimelineBanner/TimelineBannerTwo";
import DishDisplay from "../components/dishes/DishDisplay/DishDisplay";
import DrinksDisplay from "../components/drinks/DrinksDisplay/DrinksDisplay";
import ConfirmDisplay from "../components/confirm/ConfirmDisplay/ConfirmDisplay";
import ReceiptDisplay from "../components/confirm/ReceiptDisplay/ReceiptDisplay";
import "./OrderPage.scss";

function OrderPage({
  getDish,
  setStep,
  reducer,
  clearDrinks,
  clearDish,
  setBookingType,
  setErrorMessage,
  setErrorActive,
}) {
  const [currentDish, setCurrentDish] = useState("");
  const [currentStep, setCurrentStep] = useState("");
  const [drinks, setDrinks] = useState("");
  const [drinksAmount, setDrinksAmount] = useState("");
  const [bookingPeople, setBookingPeople] = useState("");
  const [bookingId, setBookingId] = useState("");
  const [currentBookingType, setCurrentBookingType] = useState("");
  const [loading, setLoading] = useState(true);

  const history = useHistory();
  let location = useLocation();

  const handleCancelClick = async () => {
    await fetch(
      `
    https://krh-sundown.dev.dwarf.dk/api/user/bookings/${bookingId}/destroy`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
        },
      },
    );
    setStep(2);
    history.push("/");
  };

  const setPage = useCallback(() => {
    if (location.pathname === "/order/dish")
      return (
        <Route exact path="/order/dish">
          <DishDisplay
            currentBookingType={currentBookingType}
            id={bookingId}
            dish={currentDish}
          />
        </Route>
      );
    if (location.pathname === "/order/drinks")
      return (
        <Route exact path="/order/drinks">
          <DrinksDisplay
            id={bookingId}
            drinks={drinks}
            drinksAmount={drinksAmount}
            bookingPeople={bookingPeople}
          />
        </Route>
      );
    if (location.pathname === "/order/confirm")
      return (
        <Route path="/order/confirm">
          <ConfirmDisplay
            dish={currentDish}
            drinks={drinks}
            id={bookingId}
            currentBookingType={currentBookingType}
          />
        </Route>
      );
    if (location.pathname === "/order/receipt")
      return (
        <Route path="/order/receipt">
          <ReceiptDisplay data={store.getState().reducer} />
        </Route>
      );
  }, [currentStep, loading, drinksAmount, currentDish, location]);

  const currentPage = setPage(currentStep);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const { dish } = store.getState().reducer;
      const { step } = store.getState().reducer;
      const { drinks } = store.getState().reducer;
      const drinksAmount = store.getState().reducer.drinks.length;
      const { bookingPeople } = store.getState().reducer;
      const { bookingId } = store.getState().reducer;
      const { bookingType } = store.getState().reducer;

      if (!reducer.networkConnection) {
        const dishArr = JSON.parse(localStorage.getItem("dishes"));
        const meal = dishArr[Math.floor(Math.random() * dishArr.length)];

        setCurrentDish(meal);
      } else {
        setCurrentDish(dish);
      }
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
      setBookingType("newBooking");
      clearDrinks();
      clearDish();
    }

    setTimeout(() => {
      setLoading(false);
    }, 750);
  }, []);

  if (loading) {
    return (
      <div className="confirm-display-wrapper min-height">
        <div className="confirm-loading-screen">
          <div className="confirm-loader">
            {/* <i className="fa fa-spinner blue-text loader-animation pt-1" />
            <p className="logo-text blue-text">Loading dish ...</p> */}
          </div>
        </div>
      </div>
    );
  }

  return (
    <Switch>
      <>
        <TimelineBannerTwo
          currentBookingType={currentBookingType}
          // dishTitle={currentDish.strMeal}
          step={currentStep}
        />
        <ErrorPopUp text={reducer.error} />

        <div className="page-wrapper">
          <div className="fadein-animation">{currentPage}</div>
        </div>
        <div className="text-left mt-1 px-1">
          {currentBookingType === "updateBooking" ? (
            <button
              type="submit"
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
    </Switch>
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
  setBookingType,
  setErrorMessage,
  setErrorActive,
})(OrderPage);
