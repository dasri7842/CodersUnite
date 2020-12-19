import axios from "axios";
import * as types from "./types";
import { returnErrors } from "./ErrorActions";

export const loadUser = () => (dispatch, getState) => {
  dispatch(userLoading()); // set loading user.

  axios
    .get("/api/auth/user", tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: types.USER_LOADED,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data.msg, err.response.status));
      dispatch({
        type: types.AUTH_ERROR,
      });
    });
};

export const registerUser = (data) => (dispatch, getState) => {
  dispatch(userLoading());
  axios
    .post("/api/users", data, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: types.REGISTER_SUCCESS,
        payload: res.data,
      });
      dispatch({
        type: types.TOGGLE_MODAL,
      });
    })
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data.msg,
          err.response.status,
          types.REGISTER_FAIL
        )
      );
      dispatch({
        type: types.REGISTER_FAIL,
      });
    });
};

export const loginUser = (data) => (dispatch, getState) => {
  dispatch(userLoading());
  axios
    .post("/api/auth", data, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: types.LOGIN_SUCCESS,
        payload: res.data,
      });
      dispatch({
        type: types.TOGGLE_MODAL,
      });
    })
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data.msg,
          err.response.status,
          types.LOGIN_FAIL
        )
      );
      dispatch({
        type: types.LOGIN_FAIL,
      });
    });
};

export const logout = () => {
  return {
    type: types.LOGOUT_SUCCESS,
  };
};

export const userLoading = () => {
  return {
    type: types.USER_LOADING,
  };
};

// Helper Function
// Sets token in config Header.
export const tokenConfig = (getState) => {
  return {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": getState().auth.token,
    },
  };
};
