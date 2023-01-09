import { POST_ONGKIR } from "../../actions/BiteshipAction";

const initialState = {
  getOngkirLoading: false,
  getOngkirResult: false,
  getOngkirError: false,
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
    default:
      return state;
  }
}
