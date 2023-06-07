import { SNAP_TRANSACTION, CHECK_STATUS_CODE } from "../../actions/PaymentAction";

const initialState = {
  snapTransactionLoading: false,
  snapTransactionResult: false,
  snapTransactionError: false,

  checkStatusCodeLoading: false,
  checkStatusCodeResult: false,
  checkStatusCodeError: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SNAP_TRANSACTION:
      return {
        ...state,
        snapTransactionLoading: action.payload.loading,
        snapTransactionResult: action.payload.data,
        snapTransactionError: action.payload.errorMessage,
      };

    case CHECK_STATUS_CODE:
      return {
        ...state,
        checkStatusCodeLoading: action.payload.loading,
        checkStatusCodeResult: action.payload.data,
        checkStatusCodeError: action.payload.errorMessage,
      };
    default:
      return state;
  }
}