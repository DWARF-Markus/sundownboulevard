/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable radix */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-shadow */
import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import "moment/locale/en-gb";
import moment from "moment";
import DatePicker, { registerLocale } from "react-datepicker";
import TimePicker from "rc-time-picker";
import "rc-time-picker/assets/index.css";
import enGb from "date-fns/locale/en-GB";
import InputRange from "react-input-range";
import * as EmailValidator from "email-validator";
import image from "../../../images/blue-beach.png";
import {
  setStep,
  setEmail,
  setDate,
  setPeopleAmount,
} from "../../../actions/actions";
import "./ConfirmDisplay.scss";
import "react-datepicker/dist/react-datepicker.css";

function ConfirmDisplay({
  setStep,
  setEmail,
  setDate,
  setPeopleAmount,

  drinks,
  dish,
  reducer,
  currentBookingType,
  id,
}) {
  const [emailInput, setEmailInput] = useState("");
  const [emailValid, setEmailValid] = useState(null);
  const [dateInput, setDateInput] = useState("");
  const [dateValid, setDateValid] = useState(true);

  const [timeInput, setTimeInput] = useState(new Date());
  const [timeValid, setTimeValid] = useState(false);

  const [peopleAmountInput, setPeopleAmountInput] = useState("");
  const [peopleAmountValid, setPeopleAmountValid] = useState(true);
  const [loading, setLoading] = useState(false);

  const [dateToSend, setDateToSend] = useState("");

  registerLocale("en-gb", enGb);

  const handleDateChange = useCallback(
    (value) => {
      const newDate = new Date(value);

      const formattedDate = `${newDate.getDate()}-${
        newDate.getMonth() + 1
      }-${newDate.getFullYear()}`;

      setDateInput(newDate);
      setDateToSend(formattedDate);
      setDate(`${formattedDate} ${timeInput}`);
    },
    [dateToSend, timeInput],
  );

  const handleTimeChange = useCallback(
    (value) => {
      const selectedHour = new Date(value).getHours();

      if (selectedHour >= 18 && selectedHour < 20) {
        setTimeInput(value.format("HH:mm"));
        setTimeValid(true);
        setDate(`${dateToSend} ${value.format("HH:mm")}`);
      } else {
        setTimeValid(false);
      }
    },
    [dateToSend, timeInput],
  );

  useEffect(() => {
    if (currentBookingType === "updateBooking") {
      handleDateChange(reducer.bookingDate);
      handleTimeChange(moment(reducer.bookingDate));

      setEmailInput(reducer.bookingEmail);
      setEmailValid(true);
      setDateValid(true);
      setTimeValid(false);
      setPeopleAmountInput(reducer.bookingPeople);
    } else {
      const date = new Date();
      setDateInput(date);
      setPeopleAmountInput(2);
    }
  }, []);

  const isWeekday = useCallback((value) => {
    const day = value.getDay();
    return day !== 0 && day !== 6;
  }, []);

  const handleBackClick = useCallback(() => {
    window.scrollTo(0, 0);
    setStep(3);
  }, []);

  const handleBooking = async () => {
    window.scrollTo(0, 0);
    setLoading(true);

    const fullDateTime = `${dateToSend} ${timeInput}`;

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
        .then(() => {
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
          startTime: fullDateTime,
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
          startTime: fullDateTime,
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
        .then(() => {
          setStep(5);
        });
    }
  };

  const validatePeopleAmount = useCallback((amount) => {
    if (amount.value > 0 && amount.value <= 10) {
      setPeopleAmount(amount.value);
      setPeopleAmountValid(true);
      setPeopleAmountInput(amount.value);
    } else {
      setPeopleAmountValid(false);
    }
  }, []);

  const handleEmail = useCallback((email) => {
    const isMailValid = EmailValidator.validate(email);
    if (isMailValid) {
      setEmailInput(email);
      setEmailValid(true);
      setEmail(email);
    } else {
      setEmailInput(email);
      setEmailValid(false);
    }
  }, []);

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
                <li>18:00 - 20:00</li>
                <li>18:00 - 20:00</li>
                <li>18:00 - 20:00</li>
                <li>18:00 - 20:00</li>
                <li>18:00 - 20:00</li>
                <li>CLOSED</li>
                <li>CLOSED</li>
              </ul>
            </div>
          </div>
          <div className="input-pair mt-1">
            <label htmlFor="confirmEmail">DATE</label>
            <DatePicker
              selected={dateInput}
              onChange={(e) => handleDateChange(e)}
              filterDate={isWeekday}
              locale="en-gb"
              dateFormat="dd/MM/yyyy"
              minDate={new Date()}
              className="date-picker"
            />
          </div>
          <div className="input-pair mt-1">
            <label htmlFor="confirmTime">TIME</label>
            {timeValid === true || timeValid === undefined ? (
              <></>
            ) : (
              <label className="blue-text">
                Please confirm time for visiting
              </label>
            )}
            {currentBookingType === "updateBooking" ? (
              <label className="blue-text" htmlFor="confirmTime">
                Currently: {reducer.bookingDate.split(" ")[1]}
              </label>
            ) : (
              <></>
            )}
            <TimePicker
              onChange={(e) => handleTimeChange(e)}
              showSecond={false}
            />
          </div>
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
          timeValid &&
          peopleAmountValid ? (
            <button
              type="submit"
              className="confirm-btn"
              onClick={() => handleBooking()}
            >
              UPDATE{" "}
              <span>
                <i className="fa fa-check" />
              </span>
            </button>
          ) : currentBookingType === "updateBooking" && !timeValid ? (
            <button type="submit" className="confirm-btn disabled">
              UPDATE{" "}
              <span>
                <i className="fa fa-check" />
              </span>
            </button>
          ) : currentBookingType === "newBooking" &&
            emailValid &&
            dateValid &&
            timeValid &&
            peopleAmountValid ? (
            <button
              type="submit"
              className="confirm-btn"
              onClick={() => handleBooking()}
            >
              CONFIRM{" "}
              <span>
                <i className="fa fa-check" />
              </span>
            </button>
          ) : (
            <button type="submit" className="confirm-btn disabled">
              CONFIRM{" "}
              <span>
                <i className="fa fa-check" />
              </span>
            </button>
          )}
        </div>
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
})(ConfirmDisplay);
