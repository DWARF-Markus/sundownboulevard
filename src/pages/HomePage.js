import React from "react";
import "./HomePage.scss";
import { useHistory } from "react-router-dom";

import PrimaryBtn from "../components/ui/PrimaryBtn/PrimaryBtn";
import Slider from "../components/home/Slider/Slider";
import EmailInput from "../components/home/EmailInput/EmailInput";
import ContentBox from "../components/home/ContentBox/ContentBox";

import { connect } from "react-redux";
import { setStep } from "../actions/actions";

import foodImageOne from "../images/food-image1.jpg";
import foodImageTwo from "../images/food-image2.jpg";
import foodImageThree from "../images/food-image3.jpg";

function HomePage({ setStep }) {
  let history = useHistory();
  const sliderImages = [foodImageThree, foodImageOne, foodImageTwo];

  const handleNewBookClick = () => {
    setStep(2);
    history.push("/order");
  };

  return (
    <div className="page-wrapper">
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
            lorem lorem lorem la la la asd lorem lorem lorem la la la asd lorem
            lorem lorem la la la asd lorem lorem lorem la la la asd
          </p>
          <button className="primary-btn" onClick={() => handleNewBookClick()}>
            BOOK
          </button>
        </div>
      </div>
      <EmailInput />
      <ContentBox />
    </div>
  );
}

export default connect(null, { setStep })(HomePage);
