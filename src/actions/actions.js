import {
  SET_LOADING,
  SET_EMAIL,
  SET_PEOPLE_AMOUNT,
  SET_DATE,
  SET_STEP,
  SET_BOOKING_ID,
  REMOVE_DRINK,
  SET_DRINK,
  SET_DRINK_UPDATE,
  CLEAR_DRINKS,
  SET_BOOKING_TYPE,
  CLEAR_DISH,
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

export const setDrinkOnUpdate = (drink) => {
  return {
    type: SET_DRINK_UPDATE,
    payload: drink,
  };
};

export const clearDrinks = () => {
  return {
    type: CLEAR_DRINKS,
  };
};

export const clearDish = () => {
  return {
    type: CLEAR_DISH,
  };
};

export const removeDrink = (drink) => {
  return {
    type: REMOVE_DRINK,
    payload: drink,
  };
};

export const setBookingId = (id) => {
  return {
    type: SET_BOOKING_ID,
    payload: id,
  };
};

export const setBookingType = (type) => {
  return {
    type: SET_BOOKING_TYPE,
    payload: type,
  };
};

export const getDish = () => async (dispatch) => {
  try {
    const res = await fetch(
      "https://krh-sundown.dev.dwarf.dk/api/user/dishes?guestCount=1",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
        },
      },
    );
    const data = await res.json();

    dispatch({
      type: GET_DISH,
      payload: data[0].meals[0],
    });
  } catch (err) {
    dispatch({
      type: GET_DISH_ERR,
      payload: err,
    });
  }
};

export const setDishOnUpdate = (id) => async (dispatch) => {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
  );
  const data = await res.json();

  if (data.meals === null) {
    dispatch({
      type: GET_DISH,
      payload: null,
    });
  } else {
    dispatch({
      type: GET_DISH,
      payload: data.meals[0],
    });
  }
};
