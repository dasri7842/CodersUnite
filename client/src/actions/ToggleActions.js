import * as types from "./types";

export const Toggle_Foucs = (payload) => {
  return {
    type: types.TOGGLE_FOCUS,
    payload,
  };
};

export const Toggle_modal = () => {
  return {
    type: types.TOGGLE_MODAL,
  };
};
