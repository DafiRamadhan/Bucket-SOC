import {getDatabase, onValue, ref} from 'firebase/database';
import { Alert } from 'react-native';
import {dispatchError, dispatchLoading, dispatchSuccess} from '../utils';

export const GET_LIST_KATEGORI = 'GET_LIST_KATEGORI';
const db = getDatabase();

export const getListKategori = () => {
  return dispatch => {
    //LOADING
    dispatchLoading(dispatch, GET_LIST_KATEGORI);

    return onValue(
      ref(db, '/kategori/'),
      snapshot => {
        if (snapshot.val()) {
          const data = snapshot.val();
          //SUKSES
          dispatchSuccess(dispatch, GET_LIST_KATEGORI, data);
        } else {
          //ERROR
          dispatchError(dispatch, GET_LIST_KATEGORI, error.message);
          Alert.alert('Error', error.message);
        }
      },
      {
        onlyOnce: true,
      },
    );
  };
};
