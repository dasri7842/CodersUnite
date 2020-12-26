import axios from "axios";
import * as types from "./types";
import { tokenConfig } from "./AuthActions";
import { returnErrors } from "./ErrorActions";

export const FetchPosts = (payload) => (dispatch) => {
  dispatch(setLoading());
  const config = {};
  if (payload) {
    config["headers"] = {
      author: payload,
    };
  }
  axios
    .get("/api/posts", config)
    .then((res) =>
      dispatch({
        type: types.FETCH_POSTS,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data.msg,
          err.response.status,
          types.FETCH_POSTS
        )
      );
    });
};

export const GetPost = (payload) => (dispatch) => {
  dispatch(setLoading());
  axios
    .get(`/api/posts/${payload}`)
    .then((res) =>
      dispatch({
        type: types.GET_POST,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data.msg, err.response.status, types.GET_POST)
      );
    });
};

export const Addcomment = (id, payload) => (dispatch, getState) => {
  axios
    .put(`/api/posts/${id}`, payload, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: types.ADD_COMMENT,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data.msg,
          err.response.status,
          types.ADD_COMMENT
        )
      );
    });
};

export const DeletePost = (payload) => (dispatch, getState) => {
  axios
    .delete(`/api/posts/${payload}`, tokenConfig(getState))
    .then(() =>
      dispatch({
        type: types.DELETE_POST,
        payload,
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data.msg,
          err.response.status,
          types.DELETE_POST
        )
      );
    });
};
export const UpdatePost = (payload) => (dispatch, getState) => {
  axios
    .put("/api/posts", payload, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: types.UPDATE_POST,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data.msg,
          err.response.status,
          types.UPDATE_POST
        )
      );
    });
};

export const AddPost = (payload) => (dispatch, getState) => {
  axios
    .post("/api/posts", payload, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: types.ADD_POST,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data.msg, err.response.status, types.ADD_POST)
      );
    });
};

export const DoVote = (id, payload) => (dispatch, getState) => {
  axios.post(`/api/posts/${id}`, payload, tokenConfig(getState)).then((res) =>
    dispatch({
      type: types.DO_VOTE,
      payload: res.data,
    })
  );
};
export const setLoading = () => {
  return {
    type: types.LOADING,
  };
};
