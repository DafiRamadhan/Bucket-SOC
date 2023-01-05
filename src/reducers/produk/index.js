import {
  GET_LIST_PRODUK,
  GET_LIST_PRODUK_BY_KATEGORI,
  DELETE_LIST_PRODUK_BY_KATEGORI,
} from '../../actions/ProdukAction';

const initialState = {
  getListProdukLoading: false,
  getListProdukResult: false,
  getListProdukError: false,

  idKategori: false,
  namaKategori: false,
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

    case DELETE_LIST_PRODUK_BY_KATEGORI:
      return {
        ...state,
        idKategori: false,
        namaKategori: false,
      };

    default:
      return state;
  }
}
