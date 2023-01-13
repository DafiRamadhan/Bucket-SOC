import { combineReducers } from "redux";
import AuthReducer from './auth';
import ProfileReducer from './profile';
import KategoriReducer from './kategori';
import BannerReducer from './banner';
import ProdukReducer from './produk';
import KeranjangReducer from './keranjang';
import BiteshipReducer from './biteship';
import PaymentReducer from './payment';
import PesananReducer from './pesanan';
import HistoryReducer from './history';

const rootReducer = combineReducers({
    AuthReducer,
    ProfileReducer,
    KategoriReducer,
    BannerReducer,
    ProdukReducer,
    KeranjangReducer,
    BiteshipReducer,
    PaymentReducer,
    PesananReducer,
    HistoryReducer,
});

export default rootReducer