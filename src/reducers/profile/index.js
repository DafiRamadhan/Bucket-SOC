import { FORGOT_PASSWORD, UPDATE_PROFILE, CHANGE_PASSWORD, GET_ADMIN_PROFILE } from "../../actions/ProfileAction";

const initialState = {
  updateProfileLoading: false,
  updateProfileResult: false,
  updateProfileError: false,

  forgotPasswordLoading: false,
  forgotPasswordResult: false,
  forgotPasswordError: false,

  changePasswordLoading: false,
  changePasswordResult: false,
  changePasswordError: false,

  getAdminProfileLoading: false,
  getAdminProfileResult: false,
  getAdminProfileError: false,
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

    case CHANGE_PASSWORD:
      return {
        ...state,
        changePasswordLoading: action.payload.loading,
        changePasswordResult: action.payload.data,
        changePasswordError: action.payload.errorMessage,
      };

    case GET_ADMIN_PROFILE:
      return {
        ...state,
        getAdminProfileLoading: action.payload.loading,
        getAdminProfileResult: action.payload.data,
        getAdminProfileError: action.payload.errorMessage,
      };
    default:
      return state;
  }
}
