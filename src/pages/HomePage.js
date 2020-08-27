import React from "react";
import "./HomePage.scss";

import PrimaryBtn from "../components/ui/PrimaryBtn/PrimaryBtn";
import Slider from "../components/home/Slider/Slider";
import EmailInput from "../components/home/EmailInput/EmailInput";

import foodImageOne from "../images/food-image1.jpg";
import foodImageTwo from "../images/food-image2.jpg";
import foodImageThree from "../images/food-image3.jpg";

function HomePage() {
  const sliderImages = [foodImageThree, foodImageOne, foodImageTwo];

  return (
    <div className="page-wrapper">
      <div className="home-page-wrapper">
        <div className="slider-box">
          <Slider slides={sliderImages} />
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
          <PrimaryBtn title="BOOK" navigateTo="/dish" />
        </div>
      </div>
      <EmailInput />
    </div>
  );
}

export default HomePage;
