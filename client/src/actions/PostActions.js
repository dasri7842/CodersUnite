import axios from "axios";
import * as types from "./types";
import { tokenConfig } from "./AuthActions";
export const FetchPosts = () => (dispatch) => {
  dispatch(setLoading());
  axios.get("/api/posts").then((res) =>
    dispatch({
      type: types.FETCH_POSTS,
      payload: res.data,
    })
  );
};

export const DeletePost = (payload) => (dispatch) => {
  axios.delete(`/api/posts/${payload}`).then(() =>
    dispatch({
      type: types.DELETE_POST,
      payload,
    })
  );
};
export const UpdatePost = (payload) => () => {
  axios.put("/api/posts", payload).catch((err) => console.error(err));
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
