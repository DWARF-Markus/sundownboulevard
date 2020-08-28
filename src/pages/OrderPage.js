import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getDish } from "../actions/actions";
import store from "../store";
import TimelineBanner from "../components/ui/TimelineBanner/TimelineBanner";
import DishDisplay from "../components/dishes/DishDisplay/DishDisplay";
import DrinksDisplay from "../components/drinks/DrinksDisplay/DrinksDisplay";
import ConfirmDisplay from "../components/confirm/ConfirmDisplay/ConfirmDisplay";
import ReceiptDisplay from "../components/confirm/ReceiptDisplay/ReceiptDisplay";
import PrimaryBtn from "../components/ui/PrimaryBtn/PrimaryBtn";
import PrimaryBackBtn from "../components/ui/PrimaryBackBtn/PrimaryBackBtn";
import "./DishPage.scss";

function OrderPage({ getDish }) {
  const [currentDish, setCurrentDish] = useState("");
  const [currentStep, setCurrentStep] = useState("");

  const setPage = () => {
    if (currentStep === 2) return <DishDisplay dish={currentDish} />;
    if (currentStep === 3) return <DrinksDisplay />;
    if (currentStep === 4) return <ConfirmDisplay />;
    if (currentStep === 5) return <ReceiptDisplay />;
  };

  const currentPage = setPage(currentStep);

  useEffect(() => {
    getDish();
  }, []);

  useEffect(() => {
    store.subscribe(() => {
      const dish = store.getState().reducer.dish;
      const step = store.getState().reducer.step;
      setCurrentDish(dish);
      setCurrentStep(step);
    });
  }, [store]);

  return (
    <div className="page-wrapper">
      <TimelineBanner dishTitle={currentDish.strMeal} />
      <div>
        {currentPage}

        <div className="btn-container">
          <div className="text-left">
            <PrimaryBackBtn decrease={1} icon="fa fa-caret-left" title="BACK" />
          </div>
          <div className="text-right m-1">
            <PrimaryBtn increment={1} icon="fa fa-caret-right" title="NEXT" />
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  reducer: state.dish,
});

export default connect(mapStateToProps, { getDish })(OrderPage);
