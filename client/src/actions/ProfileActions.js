import axios from "axios";
import * as types from "./types";
import { returnErrors } from "./ErrorActions";
import { tokenConfig } from "./AuthActions";
// import { tokenConfig } from "./AuthActions";

export const get_profile = (username) => (dispatch) => {
  dispatch(ProfileLoading());
  axios
    .get(`/api/users/${username}`)
    .then((res) =>
      dispatch({
        type: types.GET_PROFILE,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data.msg, err.response.status));
      // dispatch({
      //   type: types.AUTH_ERROR,
      // });
    });
};

export const update_profile = (payload) => (dispatch, getState) => {
  dispatch(ProfileLoading());
  axios
    .post(`/api/users/user`, payload, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: types.UPDATE_PROFILE,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data.msg, err.response.status));
      // dispatch({
      //   type: types.AUTH_ERROR,
      // });
    });
};

export const edit_profile = () => {
  return {
    type: types.EDIT_PROFILE,
  };
};

export const ProfileLoading = () => {
  return {
    type: types.PROFILE_LOADING,
  };
};
