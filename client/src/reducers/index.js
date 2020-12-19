import { combineReducers } from "redux";
import postReducer from "./postReducer";
import ToggleReducer from "./ToggleReducer";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";

const rootreducer = combineReducers({
  post: postReducer,
  Toggle: ToggleReducer,
  auth: authReducer,
  error: errorReducer,
});

export default rootreducer;
