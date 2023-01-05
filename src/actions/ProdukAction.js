import {
  equalTo,
  getDatabase,
  limitToLast,
  onValue,
  orderByChild,
  query,
  ref,
} from 'firebase/database';
import {Alert} from 'react-native';
import {dispatchError, dispatchLoading, dispatchSuccess} from '../utils';

export const GET_LIST_PRODUK = 'GET_LIST_PRODUK';
export const GET_LIST_PRODUK_BY_KATEGORI = 'GET_LIST_PRODUK_BY_KATEGORI';
export const DELETE_LIST_PRODUK_BY_KATEGORI = 'DELETE_LIST_PRODUK_BY_KATEGORI';
//const db = getDatabase();

export const getListProduk = idKategori => {
  return dispatch => {
    //LOADING
    dispatchLoading(dispatch, GET_LIST_PRODUK);

    //jika ada kategori yang dipilih
    if (idKategori) {
      return onValue(
        query(
          ref(getDatabase(), '/produk/'),
          orderByChild('kategori'),
          equalTo(idKategori),
        ),
        snapshot => {
          if (snapshot.val()) {
            const data = snapshot.val();
            //SUKSES
            dispatchSuccess(dispatch, GET_LIST_PRODUK, data);
          } else {
            //ERROR
            dispatchError(dispatch, GET_LIST_PRODUK, error.message);
            Alert.alert('Error', error.message);
          }
        },
        {
          onlyOnce: true,
        },
      );
    } else {
      return onValue(
        ref(getDatabase(), '/produk/'),
        snapshot => {
          if (snapshot.val()) {
            const data = snapshot.val();
            //SUKSES
            dispatchSuccess(dispatch, GET_LIST_PRODUK, data);
          } else {
            //ERROR
            dispatchError(dispatch, GET_LIST_PRODUK, error.message);
            Alert.alert('Error', error.message);
          }
        },
        {
          onlyOnce: true,
        },
      );
    }
  };
};

export const getListLimitProduk = () => {
  return dispatch => {
    //LOADING
    dispatchLoading(dispatch, GET_LIST_PRODUK);

    return onValue(
      query(ref(getDatabase(), 'produk'), limitToLast(10)),
      snapshot => {
        if (snapshot.val()) {
          const data = snapshot.val();
          //SUKSES
          dispatchSuccess(dispatch, GET_LIST_PRODUK, data);
        } else {
          //ERROR
          dispatchError(dispatch, GET_LIST_PRODUK, error.message);
          Alert.alert('Error', error.message);
        }
      },
      {
        onlyOnce: true,
      },
    );
  };
};

export const getProdukByKategori = (id, namaKategori) => ({
  type: GET_LIST_PRODUK_BY_KATEGORI,
  payload: {
    idKategori: id,
    namaKategori: namaKategori,
  },
});

export const deleteProdukByKategori = () => ({
  type: DELETE_LIST_PRODUK_BY_KATEGORI,
});
