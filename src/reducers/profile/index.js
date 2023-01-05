import { FORGOT_PASSWORD, UPDATE_PROFILE } from "../../actions/ProfileAction";

const initialState = {
  updateProfileLoading: false,
  updateProfileResult: false,
  updateProfileError: false,

  forgotPasswordLoading: false,
  forgotPasswordResult: false,
  forgotPasswordError: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_PROFILE:
      return {
        ...state,
        updateProfileLoading: action.payload.loading,
        updateProfileResult: action.payload.data,
        updateProfileError: action.payload.errorMessage,
      };

    case FORGOT_PASSWORD:
      return {
        ...state,
        forgotPasswordLoading: action.payload.loading,
        forgotPasswordResult: action.payload.data,
        forgotPasswordError: action.payload.errorMessage,
      };
    default:
      return state;
  }
}
