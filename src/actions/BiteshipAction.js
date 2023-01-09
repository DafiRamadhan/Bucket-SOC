import axios from 'axios';
import { Alert } from 'react-native';
import {API_TIMEOUT, BITESHIP_API_HEADER, BITESHIP_API_URL, dispatchError, dispatchLoading, dispatchSuccess} from '../utils';

export const POST_ONGKIR = 'POST_ONGKIR';

export const postOngkir = (data) => {
  return dispatch => {
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
          dispatchError(dispatch, POST_ONGKIR, response);
          Alert.alert('Error', response);
        } else {
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