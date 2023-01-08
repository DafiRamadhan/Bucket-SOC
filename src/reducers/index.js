import { combineReducers } from "redux";
import AuthReducer from './auth';
import ProfileReducer from './profile';
import KategoriReducer from './kategori';
import BannerReducer from './banner';
import ProdukReducer from './produk';
import KeranjangReducer from './keranjang';
import BiteshipReducer from './biteship';

const rootReducer = combineReducers({
    AuthReducer,
    ProfileReducer,
    KategoriReducer,
    BannerReducer,
    ProdukReducer,
    KeranjangReducer,
    BiteshipReducer,
});

export default rootReducer