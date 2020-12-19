import * as types from "./../actions/types";

const initState = {
  user: null,
  isLoading: false,
  isAuthenticated: false,
  token: localStorage.getItem("token"),
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case types.USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case types.USER_LOADED:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case types.LOGIN_SUCCESS:
    case types.REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isLoading: false,
        isAuthenticated: true,
      };
    case types.LOGIN_FAIL:
    case types.LOGOUT_SUCCESS:
    case types.REGISTER_FAIL:
    case types.AUTH_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        isLoading: false,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default authReducer;
