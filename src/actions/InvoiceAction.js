import axios from 'axios';
import {Alert} from 'react-native';
import {dispatchError, dispatchLoading, dispatchSuccess} from '../utils';

export const CREATE_INVOICE = 'CREATE_INVOICE';

export const createInvoice = (data) => {
  return dispatch => {
    //LOADING
    dispatchLoading(dispatch, CREATE_INVOICE);

    const parameter = {
      data,
    };

    axios({
      method: 'POST',
      url: 'https://us-central1-bucketsoc.cloudfunctions.net/app/invoice',
      responseType: 'blob',
      data: parameter,
    })
      .then(response => {
        if (response.status !== 200) {
          // ERROR
          dispatchError(dispatch, CREATE_INVOICE, response.status);
          Alert.alert('Error', response.status);
        } else {
          var reader = new FileReader();
          reader.readAsDataURL(response.data);
          reader.onloadend = function () {
            var base64data = reader.result;
            var newbase64 = base64data.replace(/octet-stream/g, 'pdf');
            //SUKSES
            dispatchSuccess(dispatch, CREATE_INVOICE, newbase64);
          };
        }
      })
      .catch(error => {
        // ERROR
        dispatchError(dispatch, CREATE_INVOICE, error.message);
        Alert.alert('Error', error.message);
      });
  };
};
