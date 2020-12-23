import axios from "axios";
import * as types from "./types";
import { tokenConfig } from "./AuthActions";
export const FetchPosts = (payload) => (dispatch) => {
  dispatch(setLoading());
  const config = {};
  if (payload) {
    config["headers"] = {
      author: payload,
    };
  }
  axios.get("/api/posts", config).then((res) =>
    dispatch({
      type: types.FETCH_POSTS,
      payload: res.data,
    })
  );
};

export const DeletePost = (payload) => (dispatch, getState) => {
  axios.delete(`/api/posts/${payload}`, tokenConfig(getState)).then(() =>
    dispatch({
      type: types.DELETE_POST,
      payload,
    })
  );
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
    .catch((err) => console.error(err));
};

export const AddPost = (payload) => (dispatch, getState) => {
  axios.post("/api/posts", payload, tokenConfig(getState)).then((res) =>
    dispatch({
      type: types.ADD_POST,
      payload: res.data,
    })
  );
};

export const setLoading = () => {
  return {
    type: types.LOADING,
  };
};
