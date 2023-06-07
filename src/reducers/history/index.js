import { GET_LIST_HISTORY, GET_DETAIL_HISTORY } from "../../actions/HistoryAction";

const initialState = {
  getListHistoryLoading: false,
  getListHistoryResult: false,
  getListHistoryError: false,

  getDetailHistoryLoading: false,
  getDetailHistoryResult: false,
  getDetailHistoryError: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LIST_HISTORY:
      return {
        ...state,
        getListHistoryLoading: action.payload.loading,
        getListHistoryResult: action.payload.data,
        getListHistoryError: action.payload.errorMessage,
      };

    case GET_DETAIL_HISTORY:
      return {
        ...state,
        getDetailHistoryLoading: action.payload.loading,
        getDetailHistoryResult: action.payload.data,
        getDetailHistoryError: action.payload.errorMessage,
      };
    default:
      return state;
  }
}
