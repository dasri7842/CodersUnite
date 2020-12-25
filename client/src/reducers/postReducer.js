import * as types from "./../actions/types";
const initState = {
  posts: [],
  onePost: {},
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
    case types.GET_POST:
      return {
        ...state,
        onePost: action.payload,
        loading: false,
      };
    case types.DO_VOTE:
    case types.ADD_COMMENT:
      return {
        ...state,
        onePost: action.payload,
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
