import axios from "axios";
import { Alert } from "react-native";
import { API_TIMEOUT, URL_MIDTRANS, HEADER_MIDTRANS } from "../utils";
import {dispatchError, dispatchLoading, dispatchSuccess} from '../utils';

export const SNAP_TRANSACTION = 'SNAP_TRANSACTION';

export const snapTransaction = (dataMidtrans) => {
    return dispatch => {
      //LOADING
      dispatchLoading(dispatch, SNAP_TRANSACTION);

      axios({
        method: 'POST',
        url: URL_MIDTRANS + 'transactions',
        timeout: API_TIMEOUT,
        headers: HEADER_MIDTRANS,
        data: dataMidtrans,
      })
        .then(response => {
            //SUKSES
          dispatchSuccess(dispatch, SNAP_TRANSACTION, response.data);
        })
        .catch(error => {
          // ERROR
          dispatchError(dispatch, SNAP_TRANSACTION, error.message);
          Alert.alert('Error', error.message);
        });
    }
}