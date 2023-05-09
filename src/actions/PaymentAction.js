import axios from 'axios';
import {Alert} from 'react-native';
import {dispatchError, dispatchLoading, dispatchSuccess} from '../utils';

export const SNAP_TRANSACTION = 'SNAP_TRANSACTION';

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
