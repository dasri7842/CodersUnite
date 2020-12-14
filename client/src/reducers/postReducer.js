const initState = {
  posts: [],
  loading: false,
};

const postReducer = (state = initState, action) => {
  switch (action.type) {
    case "FETCH_POSTS":
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    case "ADD_POST":
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    case "DELETE_POST":
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    case "LOADING":
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default postReducer;
