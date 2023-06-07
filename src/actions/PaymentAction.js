import axios from 'axios';
import {Alert} from 'react-native';
import {dispatchError, dispatchLoading, dispatchSuccess} from '../utils';

export const SNAP_TRANSACTION = 'SNAP_TRANSACTION';
export const CHECK_STATUS_CODE = 'CHECK_STATUS_CODE';

export const snapTransaction = dataMidtrans => {
  return dispatch => {
    //LOADING
    dispatchLoading(dispatch, SNAP_TRANSACTION);

    const parameter = {
      data: dataMidtrans,
    };

    axios
      .post(
        'https://us-central1-bucketsoc.cloudfunctions.net/app/midtrans-snap',
        parameter,
      )
      .then(response => {
        //SUKSES
        dispatchSuccess(dispatch, SNAP_TRANSACTION, response.data);
      })
      .catch(error => {
        // ERROR
        dispatchError(dispatch, SNAP_TRANSACTION, error.message);
        Alert.alert('Error', error.message);
      });
  };
};

export const checkStatusCode = order_id => {
  return dispatch => {
    //LOADING
    dispatchLoading(dispatch, CHECK_STATUS_CODE);

    const parameter = {
      order_id: order_id,
    };

    axios
      .post(
        'https://us-central1-bucketsoc.cloudfunctions.net/app/midtrans-status',
        parameter,
      )
      .then(response => {
        //SUKSES
        dispatchSuccess(dispatch, CHECK_STATUS_CODE, response.data);
      })
      .catch(error => {
        // ERROR
        dispatchError(dispatch, CHECK_STATUS_CODE, error.message);
        Alert.alert('Error', error.message);
      });
  };
};

export const clearStatusCode = () => {
  return dispatch => {
    //SUKSES
    dispatchSuccess(dispatch, CHECK_STATUS_CODE, false);
  };
};
