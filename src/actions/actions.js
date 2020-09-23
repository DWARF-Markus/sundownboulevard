import {
  SET_LOADING,
  SET_EMAIL,
  SET_PEOPLE_AMOUNT,
  SET_DATE,
  SET_STEP,
  SET_BOOKING_ID,
  DECREASE_DRINK,
  SET_DRINK,
  SET_DRINK_UPDATE,
  SET_BOOKINGS,
  CLEAR_DRINKS,
  SET_BOOKING_TYPE,
  CLEAR_DISH,
  GET_DISH,
  GET_DISH_ERR,
  GET_BOOKINGS,
  SET_NETWORK_STATUS,
  SET_ERROR_MESSAGE,
  SET_ERROR_ACTIVE,
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

export const decreaseDrink = (drink) => {
  return {
    type: DECREASE_DRINK,
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

export const setBookings = (arr) => {
  return {
    type: SET_BOOKINGS,
    payload: arr,
  };
};

export const getBookings = (arr) => {
  return {
    type: GET_BOOKINGS,
  };
};

export const setNetworkStatus = (e) => {
  return {
    type: SET_NETWORK_STATUS,
    payload: e,
  };
};

export const setErrorMessage = (message) => {
  return {
    type: SET_ERROR_MESSAGE,
    payload: message,
  };
};

export const setErrorActive = (e) => {
  return {
    type: SET_ERROR_ACTIVE,
    payload: e,
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

    const currDishArr = JSON.parse(localStorage.getItem("dishes"));

    if (currDishArr === null) {
      const newArr = [];
      newArr.push(data[0].meals[0]);
      localStorage.setItem("dishes", JSON.stringify(newArr));
    } else {
      currDishArr.push(data[0].meals[0]);
      localStorage.setItem("dishes", JSON.stringify(currDishArr));
    }

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

export const getDishOffline = () => (dispatch) => {
  const dishArr = JSON.parse(localStorage.getItem("dishes"));
  const meal = dishArr[Math.floor(Math.random() * dishArr.length)];

  dispatch({
    type: GET_DISH,
    payload: meal,
  });
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
