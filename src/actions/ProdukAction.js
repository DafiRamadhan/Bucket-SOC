import {getDatabase, limitToLast, onValue, query, ref} from 'firebase/database';
import {Alert} from 'react-native';
import {dispatchError, dispatchLoading, dispatchSuccess} from '../utils';

export const GET_LIST_PRODUK = 'GET_LIST_PRODUK';
const db = getDatabase();

export const getListProduk = () => {
  return dispatch => {
    //LOADING
    dispatchLoading(dispatch, GET_LIST_PRODUK);

    return onValue(
      ref(db, '/produk/'),
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

export const getListLimitProduk = () => {
  return dispatch => {
    //LOADING
    dispatchLoading(dispatch, GET_LIST_PRODUK);

    return onValue(
      query(ref(db, 'produk'), limitToLast(10)),
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
