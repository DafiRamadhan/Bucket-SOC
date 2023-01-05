import { POST_ONGKIR } from "../../actions/BiteshipAction";

const initialState = {
  ongkirLoading: false,
  ongkirResult: false,
  ongkirError: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case POST_ONGKIR:
      return {
        ...state,
        ongkirLoading: action.payload.loading,
        ongkirResult: action.payload.data,
        ongkirError: action.payload.errorMessage,
      };
    default:
      return state;
  }
}
