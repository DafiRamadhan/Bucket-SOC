import { GET_LIST_KATEGORI } from "../../actions/KategoriAction";

const initialState = {
  getListKategoriLoading: false,
  getListKategoriResult: false,
  getListKategoriError: false,
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

    default:
      return state;
  }
}
