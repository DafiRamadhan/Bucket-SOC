import axios from 'axios';
import { Alert } from 'react-native';
import {API_TIMEOUT, BITESHIP_API_HEADER, BITESHIP_API_URL, dispatchError, dispatchLoading, dispatchSuccess} from '../utils';

export const POST_ONGKIR = 'POST_ONGKIR';
export const DELETE_ONGKIR = 'DELETE_ONGKIR';
export const GET_TRACKING = 'GET_TRACKING';

export const postOngkir = (data) => {
  return dispatch => {
    //LOADING
    dispatchLoading(dispatch, POST_ONGKIR);

    axios({
      method: 'POST',
      url: BITESHIP_API_URL + 'rates/couriers',
      timeout: API_TIMEOUT,
      headers: BITESHIP_API_HEADER,
      data: data,
    })
      .then(response => {
        if (response.status !== 200) {
          // ERROR
          dispatchError(dispatch, POST_ONGKIR, response.status);
          Alert.alert('Error', response.status);
        } else {
          //SUKSES
          const ongkirResult = response.data.pricing[0].price;
          dispatchSuccess(dispatch, POST_ONGKIR, ongkirResult);
        }
      })
      .catch(error => {
        // ERROR
        dispatchError(dispatch, POST_ONGKIR, error.message);
        Alert.alert('Error', 'Mohon maaf. Jumlah barang melebihi kapasitas kurir.');
      });
  };
};

export const deleteOngkir = () => ({
  type: DELETE_ONGKIR,
});

export const getTrackingInfo = id => {
  return dispatch => {
    //LOADING
    dispatchLoading(dispatch, GET_TRACKING);

    axios({
      method: 'GET',
      url: BITESHIP_API_URL + 'orders/' + id,
      timeout: API_TIMEOUT,
      headers: BITESHIP_API_HEADER,
    })
      .then(response => {
        if (response.status !== 200) {
          // ERROR
          dispatchError(dispatch, GET_TRACKING, response.status);
          Alert.alert('Error', response.status);
        } else {
          //SUKSES
          const data = response.data;
          dispatchSuccess(dispatch, GET_TRACKING, data);
        }
      })
      .catch(error => {
        // ERROR
        dispatchError(dispatch, GET_TRACKING, error.message);
        Alert.alert('Error', error.message);
      });
  };
};