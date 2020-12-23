import * as types from "./../actions/types";

const initState = {
  profile: null,
  isLoading: false,
  isEditing: false,
};

const proflieReducer = (state = initState, action) => {
  switch (action.type) {
    case types.GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        isLoading: false,
      };
    case types.EDIT_PROFILE:
      return {
        ...state,
        isEditing: true,
      };
    case types.PROFILE_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case types.UPDATE_PROFILE:
      return {
        ...state,
        profile: action.payload,
        isLoading: false,
        isEditing: false,
      };
    default:
      return state;
  }
};

export default proflieReducer;
