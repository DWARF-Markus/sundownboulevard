import React, { useState, useEffect } from "react";
import DateTimePicker from "react-datetime-picker";
import InputRange from "react-input-range";
import image from "../../../images/blue-beach.png";
import * as EmailValidator from "email-validator";
import { connect } from "react-redux";
import {
  setStep,
  setEmail,
  setDate,
  setPeopleAmount,
  setBookingId,
  clearDish,
} from "../../../actions/actions";
import "./ConfirmDisplay.scss";

function ConfirmDisplay({
  setStep,
  setEmail,
  setDate,
  setPeopleAmount,
  setBookingId,
  clearDish,
  drinks,
  dish,
  reducer,
  currentBookingType,
  id,
}) {
  const [emailInput, setEmailInput] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [peopleAmountInput, setPeopleAmountInput] = useState("");
  const [emailValid, setEmailValid] = useState(null);
  const [dateValid, setDateValid] = useState(true);
  const [peopleAmountValid, setPeopleAmountValid] = useState(true);
  const [loading, setLoading] = useState(false);
  const [localBookId, setLocalBookId] = useState("");

  useEffect(() => {
    if (currentBookingType === "updateBooking") {
      setEmailInput(reducer.bookingEmail);
      setEmailValid(true);
      setDateInput(new Date(reducer.bookingDate));
      setDateValid(true);
      setPeopleAmountInput(reducer.bookingPeople);
    } else {
      const date = new Date();
      date.setHours(18);
      setDateInput(date);
      setPeopleAmountInput(2);
    }
  }, []);

  const handleBackClick = () => {
    window.scrollTo(0, 0);
    setStep(3);
  };

  const handleBooking = async () => {
    window.scrollTo(0, 0);
    setLoading(true);

    const d = new Date(reducer.bookingDate);

    const dateToSend =
      [d.getDate() + "-" + [d.getMonth() + 1] + "-" + d.getFullYear()].join(
        "/",
      ) +
      " " +
      d.getHours() +
      ":" +
      d.getMinutes() +
      0;

    const postDetails = async (bookId) => {
      await fetch(
        `https://krh-sundown.dev.dwarf.dk/api/user/bookings/${bookId}/dishes?dishes[0][dishId]=${dish.idMeal}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
          },
        },
      );

      const drinksToPost = drinks
        .map((drink, index) => `drinks[${index}][drinkId]=${drink}`)
        .join("&");

      await fetch(
        `https://krh-sundown.dev.dwarf.dk/api/user/bookings/${bookId}/drinks?${drinksToPost}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
          },
        },
      )
        .then((res) => res.json())
        .then((data) => {
          setStep(5);
        });
    };

    // CREATING A NEW BOOKING
    if (currentBookingType === "newBooking") {
      await fetch("https://krh-sundown.dev.dwarf.dk/api/user/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
        },
        body: JSON.stringify({
          startTime: dateToSend,
          numberOfPeople: reducer.bookingPeople,
          email: reducer.bookingEmail,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          postDetails(data.bookingId);
        });

      // UPDATING A NEW BOOKING
    } else {
      await fetch(`https://krh-sundown.dev.dwarf.dk/api/user/bookings/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
          "Access-Control-Allow-Origin": "*",
          mode: "no-cors",
        },
        body: JSON.stringify({
          startTime: dateToSend,
          numberOfPeople: peopleAmountInput,
          email: emailInput,
        }),
      });

      await fetch(
        `https://krh-sundown.dev.dwarf.dk/api/user/bookings/${id}/dishes?dishes[0][dishId]=${dish.idMeal}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
          },
        },
      );

      const drinksToPost = drinks
        .map((drink, index) => `drinks[${index}][drinkId]=${drink}`)
        .join("&");

      await fetch(
        `https://krh-sundown.dev.dwarf.dk/api/user/bookings/${id}/drinks?${drinksToPost}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
          },
        },
      )
        .then((res) => res.json())
        .then((data) => {
          setStep(5);
        });
    }
  };

  const validateDate = (input) => {
    const hours = input.getHours();
    if (hours < 18 || hours > 23) {
      setDateValid(false);
    } else {
      setDateInput(input);
      setDateValid(true);
      setDate(input);
    }
  };

  const validatePeopleAmount = (amount) => {
    if (amount.value > 0 && amount.value <= 10) {
      setPeopleAmount(amount.value);
      setPeopleAmountValid(true);
      setPeopleAmountInput(amount.value);
    } else {
      setPeopleAmountValid(false);
    }
  };

  const handleEmail = (email) => {
    const isMailValid = EmailValidator.validate(email);
    if (isMailValid) {
      setEmailInput(email);
      setEmailValid(true);
      setEmail(email);
    } else {
      setEmailInput(email);
      setEmailValid(false);
    }
  };

  if (loading) {
    return (
      <div className="confirm-display-wrapper mt-2">
        <div className="confirm-loading-screen mt-2">
          <div className="confirm-loader mt-2">
            <img className="loader-animation" src={image} alt="loading icon" />
            <p className="logo-text blue-text">Initializing new booking ...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="confirm-display-wrapper">
        <div className="confirm-display-container opacity-animation p-1">
          <div
            className={
              currentBookingType === "updateBooking"
                ? "input-pair disabled"
                : "input-pair"
            }
          >
            <label htmlFor="confirmEmail">Email</label>
            {emailValid === false ? (
              <label className="blue-text">please enter a valid email</label>
            ) : (
              <></>
            )}
            <input
              id="confirmEmail"
              name="confirmEmail"
              value={emailInput}
              type="email"
              onChange={(e) => handleEmail(e.target.value)}
            />
          </div>
          <div className="hours-container mt-1">
            <p className="hours-title px-1">OPENING HOURS ARE</p>
            <div className="hours-wrapper p-1">
              <ul className="left">
                <li>MONDAY</li>
                <li>TUESDAY</li>
                <li>WEDNESDAY</li>
                <li>THURSDAY</li>
                <li>FRIDAY</li>
                <li>SATURDAY</li>
                <li>SUNDAY</li>
              </ul>
              <ul className="right">
                <li>16:00 - 23:00</li>
                <li>16:00 - 23:00</li>
                <li>16:00 - 23:00</li>
                <li>16:00 - 23:00</li>
                <li>16:00 - 23:00</li>
                <li>CLOSED</li>
                <li>CLOSED</li>
              </ul>
            </div>
          </div>
          <div className="input-pair">
            <label htmlFor="confirmEmail">DATE</label>
            {dateValid ? (
              <></>
            ) : (
              <label className="blue-text">
                Please choose a time where we're open
              </label>
            )}
          </div>
          <DateTimePicker
            value={dateInput}
            minDate={new Date()}
            onChange={(e) => validateDate(e)}
            format="dd-MM-y HH:mm"
            locale="da-dk"
            maxDetail="minute"
            required
          />
          <div className="input-pair mt-1">
            <label htmlFor="peopleAmount">AMOUNT OF PEOPLE</label>
            {peopleAmountValid ? (
              <></>
            ) : (
              <label className="blue-text">
                Only between 1-10 people allowed
              </label>
            )}
            <div className="mt-1">
              <InputRange
                maxValue={10}
                minValue={1}
                value={parseInt(peopleAmountInput)}
                onChange={(value) => validatePeopleAmount({ value })}
              />
            </div>
          </div>
          {currentBookingType === "updateBooking" &&
          emailValid &&
          dateValid &&
          peopleAmountValid ? (
            <button className="confirm-btn" onClick={() => handleBooking()}>
              UPDATE{" "}
              <span>
                <i className="fa fa-check"></i>
              </span>
            </button>
          ) : (currentBookingType === "updateBooking" && !emailValid) ||
            !dateValid ||
            !peopleAmountValid ? (
            <button className="confirm-btn disabled">
              UPDATE{" "}
              <span>
                <i className="fa fa-check"></i>
              </span>
            </button>
          ) : currentBookingType === "newBooking" &&
            emailValid &&
            dateValid &&
            peopleAmountValid ? (
            <button className="confirm-btn" onClick={() => handleBooking()}>
              CONFIRM{" "}
              <span>
                <i className="fa fa-check"></i>
              </span>
            </button>
          ) : (
            <button className="confirm-btn disabled">
              CONFIRM{" "}
              <span>
                <i className="fa fa-check"></i>
              </span>
            </button>
          )}
        </div>
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
              DRINKS
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  reducer: state.reducer,
});

export default connect(mapStateToProps, {
  setStep,
  setEmail,
  setDate,
  setPeopleAmount,
  setBookingId,
  clearDish,
})(ConfirmDisplay);
