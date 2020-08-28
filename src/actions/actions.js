import {
  SET_LOADING,
  SET_EMAIL,
  SET_STEP,
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

export const setStep = (e) => {
  return {
    type: SET_STEP,
    payload: e,
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
