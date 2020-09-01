import React, { useState, useEffect } from "react";
import DateTimePicker from "react-datetime-picker";
import image from "../../../images/loading-beach.png";
import * as EmailValidator from "email-validator";
import { connect } from "react-redux";
import {
  setStep,
  setEmail,
  setDate,
  setPeopleAmount,
} from "../../../actions/actions";
import "./ConfirmDisplay.scss";

function ConfirmDisplay({
  setStep,
  setEmail,
  setDate,
  setPeopleAmount,
  reducer,
}) {
  const [emailInput, setEmailInput] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [peopleAmountInput, setPeopleAmountInput] = useState("");
  const [emailValid, setEmailValid] = useState(null);
  const [dateValid, setDateValid] = useState(true);
  const [peopleAmountValid, setPeopleAmountValid] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (reducer.bookingEmail) {
      setEmailInput(reducer.bookingEmail);
      setEmailValid(true);
    }
    if (reducer.bookingDate) {
      setDateInput(reducer.bookingDate);
      setDateValid(true);
    } else {
      const date = new Date();
      date.setHours(17);
      setDateInput(date);
    }
    if (reducer.bookingPeople) {
      setPeopleAmountInput(reducer.bookingPeople);
    }
  }, []);

  const handleBooking = () => {
    console.log(
      reducer.bookingDate,
      reducer.bookingEmail,
      reducer.bookingPeople,
    );
    setLoading(true);

    // HANDLE API SUBMIT HERE
    setTimeout(() => {
      setStep(3);
    }, [1200]);
  };

  const validateDate = (input) => {
    const hours = input.getHours();
    if (hours < 16 || hours > 23) {
      setDateValid(false);
    } else {
      setDateInput(input);
      setDateValid(true);
      setDate(input);
    }
  };

  const validatePeopleAmount = (amount) => {
    if (amount > 0 && amount <= 10) {
      setPeopleAmount(amount);
      setPeopleAmountValid(true);
      setPeopleAmountInput(amount);
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
            <p className="logo-text">Initializing new booking ...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="confirm-display-wrapper">
      <div className="confirm-display-container p-1">
        <div className="input-pair">
          <label htmlFor="confirmEmail">Email</label>
          {emailValid === false ? (
            <label className="red-text">please enter a valid email</label>
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
            <label className="red-text">
              Please choose a time where we're open
            </label>
          )}
        </div>
        <DateTimePicker
          value={dateInput}
          minDate={new Date()}
          onChange={(e) => validateDate(e)}
          format="dd-MM-y HH:mm"
          maxDetail="minute"
          required
        />
        <div className="input-pair mt-1">
          <label htmlFor="peopleAmount">AMOUNT OF PEOPLE</label>
          {peopleAmountValid ? (
            <></>
          ) : (
            <label className="red-text">Only between 1-10 people allowed</label>
          )}
          <input
            onChange={(e) => validatePeopleAmount(e.target.value)}
            id="peopleAmount"
            type="number"
            value={peopleAmountInput}
            min="1"
            max="10"
          />
        </div>
        {emailValid && dateValid && peopleAmountValid ? (
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
