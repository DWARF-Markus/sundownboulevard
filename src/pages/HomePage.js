/* eslint-disable no-shadow */
import React from "react";
import "./HomePage.scss";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import Slider from "../components/home/Slider/Slider";
import EmailInput from "../components/home/EmailInput/EmailInput";
import ContentBox from "../components/home/ContentBox/ContentBox";

import { setStep, setBookingType } from "../actions/actions";

import foodImageOne from "../images/food-image1.jpg";
import foodImageTwo from "../images/food-image2.jpg";
import foodImageThree from "../images/food-image3.jpg";

function HomePage({ setStep, setBookingType }) {
  const history = useHistory();
  const sliderImages = [foodImageThree, foodImageOne, foodImageTwo];

  const handleNewBookClick = () => {
    setBookingType("newBooking");
    setStep(2);
    window.scrollTo(0, 0);
    history.push("/order");
  };

  return (
    <div className="page-wrapper pt-70">
      <div className="home-page-wrapper">
        <div className="slider-box">
          <Slider slides={sliderImages} autoPlay={3} />
        </div>
        <div className="home-box px-3">
          <p className="logo-text">SUNDOWN BOULEVARD</p>
          <h1 className="mt-1">
            Our passion is making food with fresh and local ingredients
          </h1>
          <p className="mt-1">
            Welcome to an innovative dining experience. Here you get to choose a
            random dish from our massive menu, and we will make sure it will be
            unforgettable.
          </p>
          <button
            type="submit"
            className="primary-home-btn primary-cat"
            onClick={() => handleNewBookClick()}
          >
            BOOK
          </button>
        </div>
      </div>
      <EmailInput />
      <ContentBox />
    </div>
  );
}

export default connect(null, { setStep, setBookingType })(HomePage);
