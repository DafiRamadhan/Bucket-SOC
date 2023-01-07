import {
  endAt,
  equalTo,
  getDatabase,
  limitToLast,
  onValue,
  orderByChild,
  query,
  ref,
  startAt,
} from 'firebase/database';
import {Alert} from 'react-native';
import {dispatchError, dispatchLoading, dispatchSuccess} from '../utils';

export const GET_LIST_PRODUK = 'GET_LIST_PRODUK';
export const GET_LIST_PRODUK_BY_KATEGORI = 'GET_LIST_PRODUK_BY_KATEGORI';
export const DELETE_PRODUK_FILTER = 'DELETE_PRODUK_FILTER';
export const SEARCH_PRODUK = 'SEARCH_PRODUK';
export const CHANGE_FOCUS = 'CHANGE_FOCUS';
//const db = getDatabase();

export const getListProduk = (idKategori, keyword) => {
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
          const data = snapshot.val();
          //SUKSES
          dispatchSuccess(dispatch, GET_LIST_PRODUK, data);
        },
        {
          onlyOnce: true,
        },
        error => {
          //ERROR
          dispatchError(dispatch, GET_LIST_PRODUK, error.message);
          Alert.alert('Error', error.message);
        },
      );

      //jika dilakukan pencarian keyword
    } else if (keyword) {
      return onValue(
        query(
          ref(getDatabase(), '/produk/'),
          orderByChild('nama'),
          startAt(keyword.toUpperCase()),
          endAt(keyword.toUpperCase() + '\uf8ff'),
        ),
        snapshot => {
          const data = snapshot.val();
          //SUKSES
          dispatchSuccess(dispatch, GET_LIST_PRODUK, data);
        },
        {
          onlyOnce: true,
        },
        error => {
          //ERROR
          dispatchError(dispatch, GET_LIST_PRODUK, error.message);
          Alert.alert('Error', error.message);
        },
      );
    } else {
      return onValue(
        ref(getDatabase(), '/produk/'),
        snapshot => {
          const data = snapshot.val();
          //SUKSES
          dispatchSuccess(dispatch, GET_LIST_PRODUK, data);
        },
        {
          onlyOnce: true,
        },
        error => {
          //ERROR
          dispatchError(dispatch, GET_LIST_PRODUK, error.message);
          Alert.alert('Error', error.message);
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
        const data = snapshot.val();
        //SUKSES
        dispatchSuccess(dispatch, GET_LIST_PRODUK, data);
      },
      {
        onlyOnce: true,
      },
      error => {
        //ERROR
        dispatchError(dispatch, GET_LIST_PRODUK, error.message);
        Alert.alert('Error', error.message);
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

export const deleteProdukFilter = () => ({
  type: DELETE_PRODUK_FILTER,
});

export const searchProduk = search => ({
  type: SEARCH_PRODUK,
  payload: {
    data: search,
  },
});

export const changeFocus = () => ({
  type: CHANGE_FOCUS,
})
