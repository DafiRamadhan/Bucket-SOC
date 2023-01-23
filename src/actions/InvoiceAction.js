import axios from 'axios';
import {Alert} from 'react-native';
import {API_TIMEOUT, INVOICE_API_URL, INVOICE_API_HEADER} from '../utils';
import {dispatchError, dispatchLoading, dispatchSuccess} from '../utils';

export const CREATE_INVOICE = 'CREATE_INVOICE';

export const createInvoice = (data) => {
  return dispatch => {
    //LOADING
    dispatchLoading(dispatch, CREATE_INVOICE);

    axios({
      method: 'POST',
      url: INVOICE_API_URL,
      timeout: API_TIMEOUT,
      headers: INVOICE_API_HEADER,
      responseType: 'blob',
      data: data,
    })
      .then(response => {
        var reader = new FileReader();
        reader.readAsDataURL(response.data);
        reader.onloadend = function () {
          var base64data = reader.result;
          var newbase64 = base64data.replace(/octet-stream/g, 'pdf');
          //SUKSES
          dispatchSuccess(dispatch, CREATE_INVOICE, newbase64);
        }
      })
      .catch(error => {
        // ERROR
        dispatchError(dispatch, CREATE_INVOICE, error.message);
        Alert.alert('Error', error.message);
      });
  };
};
