/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from "react";
import { connect } from "react-redux";
import * as EmailValidator from "email-validator";
import { useHistory } from "react-router-dom";
import "./EmailInput.scss";
import {
  setEmail,
  setBookingType,
  setBookingId,
  setDate,
  setStep,
  setPeopleAmount,
  clearDrinks,
  setDrinkOnUpdate,
  setBookings,
  setOfflineBookings,
  setDishOnUpdate,
  setErrorMessage,
  setErrorActive,
  getDish,
} from "../../../actions/actions";

function EmailInput({
  setEmail,
  setBookingType,
  setBookingId,
  setDate,
  setStep,
  setPeopleAmount,
  setDrinkOnUpdate,
  setDishOnUpdate,
  setBookings,
  setOfflineBookings,
  setErrorMessage,
  setErrorActive,
  clearDrinks,
  getDish,
}) {
  const history = useHistory();
  const [userEmail, setUserEmail] = useState("");

  const handleUpdateBookingClick = async () => {
    const isEmailValid = EmailValidator.validate(userEmail);

    if (isEmailValid) {
      clearDrinks();
      await fetch(
        `
      https://krh-sundown.dev.dwarf.dk/api/bookings?filter[email]=${userEmail}&include=drinks,dishes,drinks.drinkInfo&sort=startTime`,
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
          setOfflineBookings([]);
          const offlineBookings = JSON.parse(
            localStorage.getItem("offlineBookings"),
          ).filter((booking) => booking.email === userEmail);

          if (offlineBookings.length > 0) {
            setBookings(data);
            setOfflineBookings(offlineBookings);
            setEmail(userEmail);
            history.push("/bookings");
          } else if (data.length === 0) {
            setErrorMessage("No booking was found with this email");
            setErrorActive(true);
          } else if (data.length > 1) {
            setBookings(data);
            setEmail(userEmail);
            window.scrollTo(0, 0);
            history.push("/bookings");
          } else {
            if (data[0].dishes.length === 0) {
              getDish();
            } else {
              setDishOnUpdate(data[0].dishes[0].externalDishId);
            }

            data[0].drinks.map((drink) => setDrinkOnUpdate(drink.drink_info));

            setEmail(userEmail);
            setBookingType("updateBooking");
            setBookingId(data[0].id);
            setDate(data[0].startTime);
            setPeopleAmount(data[0].numberOfPeople);
            setStep(2);
            window.scrollTo(0, 0);
            history.push("/order/dish");
          }
        });
    } else {
      setErrorMessage("Please enter a valid email");
      setErrorActive(true);
    }
  };

  return (
    <div className="m-2 email-container">
      <div className="email-desc mt-1">
        <h3 className="mt-1">Already booked?</h3>
        <p>
          In case you already have an active booking you can update the booking
          by entering your email.
        </p>
      </div>
      <div className="email-input-wrapper mt-1">
        <div className="input-pair">
          <label htmlFor="email-input">Email</label>
          <input
            type="email"
            id="email-input"
            name="email-input"
            onChange={(e) => setUserEmail(e.target.value)}
          />
          <div>
            <button
              type="submit"
              onClick={() => handleUpdateBookingClick()}
              className="primary-home-btn"
            >
              GO
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// const mapStateToProps = (state) => ({
//   reducer: state.reducer,
// });

export default connect(null, {
  setEmail,
  setBookingType,
  setBookingId,
  setDate,
  setStep,
  setPeopleAmount,
  setDrinkOnUpdate,
  setDishOnUpdate,
  setBookings,
  setOfflineBookings,
  setErrorMessage,
  setErrorActive,
  clearDrinks,
  getDish,
})(EmailInput);
