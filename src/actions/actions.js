import {
  SET_LOADING,
  SET_EMAIL,
  SET_PEOPLE_AMOUNT,
  SET_DATE,
  SET_STEP,
  REMOVE_DRINK,
  SET_DRINK,
  GET_DISH,
  GET_DISH_ERR,
} from "./types";

export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};

export const setEmail = (email) => {
  return {
    type: SET_EMAIL,
    payload: email,
  };
};

export const setDate = (date) => {
  return {
    type: SET_DATE,
    payload: date,
  };
};

export const setPeopleAmount = (count) => {
  return {
    type: SET_PEOPLE_AMOUNT,
    payload: count,
  };
};

export const setStep = (e) => {
  return {
    type: SET_STEP,
    payload: e,
  };
};

export const setDrink = (drink) => {
  return {
    type: SET_DRINK,
    payload: drink,
  };
};

export const removeDrink = (drink) => {
  return {
    type: REMOVE_DRINK,
    payload: drink,
  };
};

export const getDish = () => async (dispatch) => {
  try {
    setLoading();

    const res = await fetch(
      "https://www.themealdb.com/api/json/v1/1/random.php",
    );
    const data = await res.json();

    dispatch({
      type: GET_DISH,
      payload: data.meals[0],
    });
  } catch (err) {
    dispatch({
      type: GET_DISH_ERR,
      payload: err.response.data,
    });
  }
};
