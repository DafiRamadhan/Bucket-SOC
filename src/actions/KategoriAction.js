import {getDatabase, onValue, ref} from 'firebase/database';
import { Alert } from 'react-native';
import {dispatchError, dispatchLoading, dispatchSuccess} from '../utils';

export const GET_LIST_KATEGORI = 'GET_LIST_KATEGORI';
export const GET_DETAIL_KATEGORI = 'GET_DETAIL_KATEGORI';
const db = getDatabase();

export const getListKategori = () => {
  return dispatch => {
    //LOADING
    dispatchLoading(dispatch, GET_LIST_KATEGORI);

    return onValue(
      ref(db, '/kategori/'),
      snapshot => {
        const data = snapshot.val();
        //SUKSES
        dispatchSuccess(dispatch, GET_LIST_KATEGORI, data);
      },
      {
        onlyOnce: true,
      },
      error => {
        //ERROR
        dispatchError(dispatch, GET_LIST_KATEGORI, error.message);
        Alert.alert('Error', error.message);
      },
    );
  };
};

export const getDetailKategori = (id) => {
  return dispatch => {
    //LOADING
    dispatchLoading(dispatch, GET_DETAIL_KATEGORI);

    return onValue(
      ref(db, '/kategori/'+ id),
      snapshot => {
        const data = snapshot.val();
        //SUKSES
        dispatchSuccess(dispatch, GET_DETAIL_KATEGORI, data);
      },
      {
        onlyOnce: true,
      },
      error => {
        //ERROR
        dispatchError(dispatch, GET_DETAIL_KATEGORI, error.message);
        Alert.alert('Error', error.message);
      },
    );
  };
};
