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
import "./OrderPage.scss";

function OrderPage({ getDish }) {
  const [currentDish, setCurrentDish] = useState("");
  const [currentStep, setCurrentStep] = useState("");
  const [drinksAmount, setDrinksAmount] = useState("");

  const setPage = () => {
    if (currentStep === 2) return <ConfirmDisplay />;
    if (currentStep === 3) return <DishDisplay dish={currentDish} />;
    if (currentStep === 4) return <DrinksDisplay drinksAmount={drinksAmount} />;
    if (currentStep === 5)
      return <ReceiptDisplay data={store.getState().reducer} />;
  };

  const currentPage = setPage(currentStep);

  useEffect(() => {
    getDish();
  }, []);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const dish = store.getState().reducer.dish;
      const step = store.getState().reducer.step;
      const drinks = store.getState().reducer.drinks.length;
      setCurrentDish(dish);
      setCurrentStep(step);
      setDrinksAmount(drinks);
    });
    return unsubscribe;
  }, [store]);

  return (
    <div className="page-wrapper">
      <TimelineBanner dishTitle={currentDish.strMeal} />
      <div>{currentPage}</div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  reducer: state.dish,
});

export default connect(mapStateToProps, { getDish })(OrderPage);
