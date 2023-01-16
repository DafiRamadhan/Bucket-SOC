import { UPDATE_PESANAN, CANCEL_PESANAN } from "../../actions/PesananAction";

const initialState = {
  updatePesananLoading: false,
  updatePesananResult: false,
  updatePesananError: false,

  cancelPesananLoading: false,
  cancelPesananResult: false,
  cancelPesananError: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_PESANAN:
      return {
        ...state,
        updatePesananLoading: action.payload.loading,
        updatePesananResult: action.payload.data,
        updatePesananError: action.payload.errorMessage,
      };

    case CANCEL_PESANAN:
      return {
        ...state,
        cancelPesananLoading: action.payload.loading,
        cancelPesananResult: action.payload.data,
        cancelPesananError: action.payload.errorMessage,
      };
    default:
      return state;
  }
}
