import * as types from "./../actions/types";

const initState = {
  msg: {},
  status: null,
  id: null,
};

const errorReducer = (state = initState, action) => {
  switch (action.type) {
    case types.GET_ERRORS:
      return {
        msg: action.payload.msg,
        status: action.payload.status,
        id: action.payload.id,
      };
    case types.CLEAR_ERRORS:
      return {
        msg: {},
        status: null,
        id: null,
      };
    default:
      return state;
  }
};

export default errorReducer;
