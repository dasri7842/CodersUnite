import axios from "axios";

export const FetchPosts = () => (dispatch) => {
  dispatch(setLoading());
  axios.get("/api/posts").then((res) =>
    dispatch({
      type: "FETCH_POSTS",
      payload: res.data,
    })
  );
};

export const DeletePost = (payload) => (dispatch) => {
  axios.delete(`/api/posts/${payload}`).then(() =>
    dispatch({
      type: "DELETE_POST",
      payload,
    })
  );
};
export const UpdatePost = (payload) => (dispatch) => {
  axios.put("/api/posts", payload).catch((err) => console.error(err));
};

export const AddPost = (payload) => (dispatch) => {
  axios.post("/api/posts", payload).then((res) =>
    dispatch({
      type: "ADD_POST",
      payload: res.data,
    })
  );
};

export const setLoading = () => {
  return {
    type: "LOADING",
  };
};
