import { combineReducers } from "redux";
import postReducer from "./postReducer";

const rootreducer = combineReducers({
  post: postReducer,
});

export default rootreducer;
