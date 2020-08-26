import {
  SET_LOADING,
  SET_EMAIL,
  GET_DISH,
  GET_DISH_ERR,
} from "../actions/types";

const initialState = {
  email: null,
  dish: null,
  drinks: null,
  loading: false,
  error: null,
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
        email: action.payload,
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
