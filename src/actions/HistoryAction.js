import {
  getDatabase,
  ref,
  onValue,
  query,
  orderByChild,
  equalTo,
} from 'firebase/database';
import {Alert} from 'react-native';
import {
  dispatchError,
  dispatchLoading,
  dispatchSuccess,
} from '../utils';

export const GET_LIST_HISTORY = 'GET_LIST_HISTORY';
export const GET_DETAIL_HISTORY = 'GET_DETAIL_HISTORY';

export const getListHistory = uid => {
  return dispatch => {
    //LOADING
    dispatchLoading(dispatch, GET_LIST_HISTORY);

    return onValue(
      query(
        ref(getDatabase(), '/pesanan/'),
        orderByChild('/user/' + '/uid/'),
        equalTo(uid),
      ),
      snapshot => {
        const data = snapshot.val();
        //SUKSES
        dispatchSuccess(dispatch, GET_LIST_HISTORY, data);
      },
      {
        onlyOnce: true,
      },
      error => {
        //ERROR
        dispatchError(dispatch, GET_LIST_HISTORY, error.message);
        Alert.alert('Error', error.message);
      },
    );
  };
};

export const getDetailHistory = id => {
  return dispatch => {
    //LOADING
    dispatchLoading(dispatch, GET_DETAIL_HISTORY);

    return onValue(
      ref(getDatabase(), '/pesanan/' + id),
      snapshot => {
        const data = snapshot.val();
        //SUKSES
        dispatchSuccess(dispatch, GET_DETAIL_HISTORY, data);
      },
      {
        onlyOnce: true,
      },
      error => {
        //ERROR
        dispatchError(dispatch, GET_DETAIL_HISTORY, error.message);
        Alert.alert('Error', error.message);
      },
    );
  };
};
