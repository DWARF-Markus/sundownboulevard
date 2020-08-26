/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from "react";
import { connect } from "react-redux";
import PrimaryBtn from "../../ui/PrimaryBtn/PrimaryBtn";
import "./EmailInput.scss";
import { setEmail } from "../../../actions/actions";

function EmailInput({ setEmail }) {
  const [userEmail, setUserEmail] = useState("");

  const submitEmail = (e) => {
    setEmail(userEmail);
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
          <div onClick={submitEmail}>
            <PrimaryBtn title="GO" navigateTo="/" />
          </div>
        </div>
      </div>
    </div>
  );
}

// const mapStateToProps = (state) => ({
//   reducer: state.reducer,
// });

export default connect(null, { setEmail })(EmailInput);
