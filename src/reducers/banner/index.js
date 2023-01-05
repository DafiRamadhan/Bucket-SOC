import { GET_LIST_BANNER } from "../../actions/BannerAction";

const initialState = {
  getListBannerLoading: false,
  getListBannerResult: false,
  getListBannerError: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LIST_BANNER:
      return {
        ...state,
        getListBannerLoading: action.payload.loading,
        getListBannerResult: action.payload.data,
        getListBannerError: action.payload.errorMessage,
      };

    default:
      return state;
  }
}
