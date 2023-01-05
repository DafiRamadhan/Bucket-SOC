import {GET_LIST_PRODUK} from '../../actions/ProdukAction';

const initialState = {
  getListProdukLoading: false,
  getListProdukResult: false,
  getListProdukError: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LIST_PRODUK:
      return {
        ...state,
        getListProdukLoading: action.payload.loading,
        getListProdukResult: action.payload.data,
        getListProdukError: action.payload.errorMessage,
      };

    default:
      return state;
  }
}
