import * as types from "./../actions/types";
const initState = {
  posts: [],
  loading: false,
};

const postReducer = (state = initState, action) => {
  switch (action.type) {
    case types.FETCH_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    case types.ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    case types.DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    case types.UPDATE_POST:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === action.payload._id) return action.payload;
          else return post;
        }),
      };
    case types.LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default postReducer;
