import {
  SET_LOADING,
  SET_EMAIL,
  SET_PEOPLE_AMOUNT,
  SET_DATE,
  SET_STEP,
  SET_DRINK,
  SET_DRINK_UPDATE,
  CLEAR_DRINKS,
  CLEAR_DISH,
  SET_DISH_UPDATE,
  SET_DISH_BY_ID,
  SET_BOOKING_ID,
  SET_BOOKING_TYPE,
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
  bookingId: null,
  bookingType: null,
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
    case SET_DRINK_UPDATE:
      return {
        ...state,
        drinks: [...state.drinks, parseInt(action.payload.id)],
        drinksName: [
          ...state.drinksName,
          { id: parseInt(action.payload.id), name: action.payload.name },
        ],
      };
    case SET_DISH_UPDATE:
      return {
        ...state,
        dish: action.payload,
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
    case SET_BOOKING_ID:
      return {
        ...state,
        bookingId: action.payload,
      };
    case SET_BOOKING_TYPE:
      return {
        ...state,
        bookingType: action.payload,
      };
    case SET_DISH_BY_ID:
      return {
        ...state,
        dish: action.payload,
      };
    case CLEAR_DRINKS:
      return {
        ...state,
        drinks: [],
        drinksName: [],
      };
    case CLEAR_DISH:
      return {
        ...state,
        dish: null,
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
