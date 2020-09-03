/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from "react";
import { connect } from "react-redux";
import * as EmailValidator from "email-validator";
import token from "../../../token";
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
  setDishOnUpdate,
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
  clearDrinks,
  getDish,
}) {
  let history = useHistory();
  const [userEmail, setUserEmail] = useState("");
  const [errMessage, setErrMessage] = useState("");

  const handleUpdateBookingClick = async () => {
    const isEmailValid = EmailValidator.validate(userEmail);

    if (isEmailValid) {
      clearDrinks();
      await fetch(
        `
      https://krh-sundown.dev.dwarf.dk/api/bookings?filter[email]=${userEmail}&include=drinks,dishes&sort=startTime`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        },
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.length === 0) {
            setErrMessage("No booking was found with this email");
          } else {
            if (data[0].dishes.length === 0) {
              getDish();
              console.log("no dishes has been added yet");
            } else {
              setDishOnUpdate(data[0].dishes[0]["externalDishId"]);
            }

            const drinks = data[0].drinks.map((drink) =>
              setDrinkOnUpdate(parseInt(drink["externalDrinkId"])),
            );

            setEmail(userEmail);
            setBookingType("updateBooking");
            setBookingId(data[0].id);
            setDate(data[0].startTime);
            setPeopleAmount(data[0].numberOfPeople);
            setStep(2);
            history.push("/order");
          }
        });
    } else {
      setErrMessage("Please enter a valid email");
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
          <label htmlFor="email-input" className="red-text">
            {errMessage ? errMessage : " "}
          </label>
          <label htmlFor="email-input">Email</label>
          <input
            type="email"
            id="email-input"
            name="email-input"
            onChange={(e) => setUserEmail(e.target.value)}
          />
          <div>
            <button
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
  clearDrinks,
  getDish,
})(EmailInput);
