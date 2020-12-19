import * as types from "./../actions/types";

const initState = {
  modal: false,
  focus: false,
};

const ToggleReducer = (state = initState, action) => {
  switch (action.type) {
    case types.TOGGLE_MODAL:
      return {
        ...state,
        modal: !state.modal,
      };
    case types.TOGGLE_FOCUS:
      return {
        ...state,
        focus: action.payload,
      };
    default:
      return state;
  }
};

export default ToggleReducer;
