import {
  GET_LIST_PRODUK,
  GET_LIST_PRODUK_BY_KATEGORI,
  DELETE_PRODUK_FILTER,
  DELETE_SEARCH_FILTER,
  DELETE_KATEGORI_FILTER,
  SEARCH_PRODUK,
  CHANGE_FOCUS,
} from '../../actions/ProdukAction';

const initialState = {
  getListProdukLoading: false,
  getListProdukResult: false,
  getListProdukError: false,

  idKategori: false,
  namaKategori: false,
  keyword: false,
  isFocus: false,
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

    case GET_LIST_PRODUK_BY_KATEGORI:
      return {
        ...state,
        idKategori: action.payload.idKategori,
        namaKategori: action.payload.namaKategori,
      };

    case DELETE_PRODUK_FILTER:
      return {
        ...state,
        idKategori: false,
        namaKategori: false,
        keyword: false,
        isFocus: false,
      };

    case SEARCH_PRODUK:
      return {
        ...state,
        keyword: action.payload.data,
      };

    case DELETE_SEARCH_FILTER:
      return {
        ...state,
        keyword: false,
      };

    case DELETE_KATEGORI_FILTER:
      return {
        ...state,
        idKategori: false,
        namaKategori: false,
      };

    case CHANGE_FOCUS:
      return {
        ...state,
        isFocus: true,
      };

    default:
      return state;
  }
}
