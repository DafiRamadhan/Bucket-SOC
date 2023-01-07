import { GET_LIST_KATEGORI, GET_DETAIL_KATEGORI } from "../../actions/KategoriAction";

const initialState = {
  getListKategoriLoading: false,
  getListKategoriResult: false,
  getListKategoriError: false,

  getDetailKategoriLoading: false,
  getDetailKategoriResult: false,
  getDetailKategoriError: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LIST_KATEGORI:
      return {
        ...state,
        getListKategoriLoading: action.payload.loading,
        getListKategoriResult: action.payload.data,
        getListKategoriError: action.payload.errorMessage,
      };

    case GET_DETAIL_KATEGORI:
      return {
        ...state,
        getDetailKategoriLoading: action.payload.loading,
        getDetailKategoriResult: action.payload.data,
        getDetailKategoriError: action.payload.errorMessage,
      };

    default:
      return state;
  }
}
