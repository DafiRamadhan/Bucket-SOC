import { POST_ONGKIR, GET_TRACKING } from "../../actions/BiteshipAction";

const initialState = {
  getOngkirLoading: false,
  getOngkirResult: false,
  getOngkirError: false,

  getTrackingInfoLoading: false,
  getTrackingInfoResult: false,
  getTrackingInfoError: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case POST_ONGKIR:
      return {
        ...state,
        getOngkirLoading: action.payload.loading,
        getOngkirResult: action.payload.data,
        getOngkirError: action.payload.errorMessage,
      };

    case GET_TRACKING:
      return {
        ...state,
        getTrackingInfoLoading: action.payload.loading,
        getTrackingInfoResult: action.payload.data,
        getTrackingInfoError: action.payload.errorMessage,
      };
    default:
      return state;
  }
}
