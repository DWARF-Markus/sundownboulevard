import {
  SET_LOADING,
  SET_EMAIL,
  SET_PEOPLE_AMOUNT,
  SET_DATE,
  SET_STEP,
  SET_DRINK,
  REMOVE_DRINK,
  GET_DISH,
  GET_DISH_ERR,
} from "../actions/types";

const intitalBookingDate = new Date();
intitalBookingDate.setHours(17);

const initialState = {
  bookingDate: intitalBookingDate,
  bookingEmail: null,
  bookingPeople: "2",
  dish: null,
  drinks: [],
  drinksName: [],
  error: null,
  loading: false,
  step: 2,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SET_EMAIL:
      return {
        ...state,
        bookingEmail: action.payload,
      };
    case SET_STEP:
      return {
        ...state,
        step: action.payload,
      };
    case SET_DRINK:
      return {
        ...state,
        drinks: [...state.drinks, action.payload.id],
        drinksName: [
          ...state.drinksName,
          { id: action.payload.id, name: action.payload.name },
        ],
      };
    case REMOVE_DRINK:
      return {
        ...state,
        drinks: [
          ...state.drinks.filter((drink) => drink !== action.payload.id),
        ],
        drinksName: [
          ...state.drinksName.filter((drink) => drink.id !== action.payload.id),
        ],
      };
    case SET_DATE:
      return {
        ...state,
        bookingDate: action.payload,
      };
    case SET_PEOPLE_AMOUNT:
      return {
        ...state,
        bookingPeople: action.payload,
      };
    case GET_DISH:
      return {
        ...state,
        dish: action.payload,
        loading: false,
      };
    case GET_DISH_ERR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
