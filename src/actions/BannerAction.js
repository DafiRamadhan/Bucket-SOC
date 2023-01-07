import {getDatabase, onValue, ref} from 'firebase/database';
import {Alert} from 'react-native';
import {dispatchError, dispatchLoading, dispatchSuccess} from '../utils';

export const GET_LIST_BANNER = 'GET_LIST_BANNER';
const db = getDatabase();

export const getListBanner = () => {
  return dispatch => {
    //LOADING
    dispatchLoading(dispatch, GET_LIST_BANNER);

    return onValue(
      ref(db, '/banner/'),
      snapshot => {
        const data = snapshot.val();
        //SUKSES
        dispatchSuccess(dispatch, GET_LIST_BANNER, data);
      },
      {
        onlyOnce: true,
      },
      error => {
        //ERROR
        dispatchError(dispatch, GET_LIST_BANNER, error.message);
        Alert.alert('Error', error.message);
      },
    );
  };
};