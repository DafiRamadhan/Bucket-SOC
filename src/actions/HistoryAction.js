import axios from 'axios';
import {
  getDatabase,
  ref,
  onValue,
  query,
  orderByChild,
  equalTo,
  update,
} from 'firebase/database';
import {Alert} from 'react-native';
import {
  API_TIMEOUT,
  BITESHIP_API_HEADER,
  BITESHIP_API_URL,
  dispatchError,
  dispatchLoading,
  dispatchSuccess,
  HEADER_MIDTRANS,
  URL_MIDTRANS_STATUS,
} from '../utils';

export const UPDATE_STATUS = 'UPDATE_STATUS';
export const GET_LIST_HISTORY = 'GET_LIST_HISTORY';
let check_midtrans = 0;
let check_biteship = 0;

export const updateStatus = uid => {
  return dispatch => {
    //LOADING
    dispatchLoading(dispatch, UPDATE_STATUS);
    dispatchLoading(dispatch, GET_LIST_HISTORY);

    return onValue(
      query(
        ref(getDatabase(), '/pesanan/'),
        orderByChild('/user/' + '/uid/'),
        equalTo(uid),
      ),
      snapshot => {
        const data = snapshot.val();
        const status_pesanan = [];
        if (data) {
          Object.keys(data).forEach(key => {
            status_pesanan.push(data[key].status_pesanan);
          });
          let item_midtrans = status_pesanan.filter(
            x => x === 'Menunggu Pembayaran',
          ).length;
          let item_biteship = status_pesanan.filter(
            x => x === 'Sedang Dikirim',
          ).length;
          Object.keys(data).forEach(key => {
            if (data[key].url_midtrans) {
              if (data[key].status_pesanan === 'Menunggu Pembayaran') {
                dispatch(
                  updateStatusMidtrans(data[key].order_id, item_midtrans, item_biteship),
                );
              } else if (
                data[key].status_pesanan === 'Sedang Dikirim' &&
                data[key].biteship_id
              ) {
                dispatch(
                  updateStatusBiteship(
                    data[key].order_id,
                    data[key].biteship_id,
                    item_midtrans,
                    item_biteship,
                  ),
                );
              }
            }
          });
          if (item_midtrans === 0 && item_biteship === 0) {
            //SUKSES
            dispatchSuccess(dispatch, GET_LIST_HISTORY, data);
            dispatchSuccess(dispatch, UPDATE_STATUS, false);
          }
        } else {
          //SUKSES
          dispatchSuccess(dispatch, GET_LIST_HISTORY, data);
          dispatchSuccess(dispatch, UPDATE_STATUS, false);
        }
      },
      {
        onlyOnce: true,
      },
      error => {
        //ERROR
        dispatchError(dispatch, UPDATE_STATUS, error.message);
        Alert.alert('Error', error.message);
      },
    );
  };
};

export const updateStatusMidtrans = (order_id, item_midtrans, item_biteship) => {
  return dispatch => {
    const tgl_pemesanan = new Date(
      order_id.substring(1, 5) +
        '-' +
        order_id.substring(5, 7) +
        '-' +
        order_id.substring(7, 9) +
        'T' +
        order_id.substring(10, 12) +
        ':' +
        order_id.substring(12, 14) +
        ':' +
        order_id.substring(14, 16),
    ).getTime();
    const now = new Date().getTime();
    const duration = now - tgl_pemesanan;

    axios({
      method: 'GET',
      url: URL_MIDTRANS_STATUS + order_id + '/status',
      timeout: API_TIMEOUT,
      headers: HEADER_MIDTRANS,
    })
      .then(response => {
        if (response.status !== 200) {
          // ERROR
          dispatchError(dispatch, UPDATE_STATUS, response.status);
          Alert.alert('Error', response.status + 'order id : ' + order_id);
        } else {
          if (
            response.data.transaction_status === 'settlement' ||
            response.data.transaction_status === 'capture'
          ) {
            update(ref(getDatabase(), '/pesanan/' + order_id), {
              status_pesanan: 'Menunggu Konfirmasi Admin',
            })
              .then(response => {
                check_midtrans++;
                dispatch(checkItem(item_midtrans, item_biteship));
              })
              .catch(error => {
                //ERROR
                dispatchError(dispatch, UPDATE_STATUS, error.message);
                Alert.alert('Alert', error.message + 'order id : ' + order_id);
              });
          } else if (
            response.data.transaction_status === 'deny' ||
            response.data.transaction_status === 'cancel' ||
            response.data.transaction_status === 'expire' ||
            response.data.transaction_status === 'failure'
          ) {
            update(ref(getDatabase(), '/pesanan/' + order_id), {
              status_pesanan: 'Selesai (Pembayaran Gagal)',
            })
              .then(response => {
                check_midtrans++;
                dispatch(checkItem(item_midtrans, item_biteship));
              })
              .catch(error => {
                //ERROR
                dispatchError(dispatch, UPDATE_STATUS, error.message);
                Alert.alert('Alert', error.message + 'order id : ' + order_id);
              });
          } else if (
            response.data.status_code === '404' &&
            duration > 86400000
          ) {
            update(ref(getDatabase(), '/pesanan/' + order_id), {
              status_pesanan: 'Selesai (Pembayaran Gagal)',
            })
              .then(response => {
                check_midtrans++;
                dispatch(checkItem(item_midtrans, item_biteship));
              })
              .catch(error => {
                //ERROR
                dispatchError(dispatch, UPDATE_STATUS, error.message);
                Alert.alert('Alert', error.message + 'order id : ' + order_id);
              });
          } else {
            check_midtrans++;
            dispatch(checkItem(item_midtrans, item_biteship));
          }
        }
      })
      .catch(error => {
        // ERROR
        dispatchError(dispatch, UPDATE_STATUS, error.message);
        Alert.alert('Alert', error.message + 'order id : ' + order_id);
      });
  };
};

export const updateStatusBiteship = (order_id, biteship_id, item_midtrans, item_biteship) => {
  return dispatch => {
    axios({
      method: 'GET',
      url: BITESHIP_API_URL + 'orders/' + biteship_id,
      timeout: API_TIMEOUT,
      headers: BITESHIP_API_HEADER,
    })
      .then(response => {
        if (response.status !== 200) {
          // ERROR
          dispatchError(dispatch, UPDATE_STATUS, response.status);
          Alert.alert('Error', response.status + 'order id : ' + order_id);
        } else {
          //SUKSES
          if (response.data.status === 'delivered') {
            update(ref(getDatabase(), '/pesanan/' + order_id), {
              status_pesanan: 'Terkirim',
            })
              .then(response => {
                check_biteship++;
                dispatch(checkItem(item_midtrans, item_biteship));
              })
              .catch(error => {
                //ERROR
                dispatchError(dispatch, UPDATE_STATUS, error.message);
                Alert.alert('Alert', error.message + 'order id : ' + order_id);
              });
          } else if (
            response.data.status === 'rejected' ||
            response.data.status === 'cancelled' ||
            response.data.status === 'courier_not_found' ||
            response.data.status === 'returned' ||
            response.data.status === 'disposed'
          ) {
            update(ref(getDatabase(), '/pesanan/' + order_id), {
              status_pesanan: 'Pengiriman Gagal',
            })
              .then(response => {
                check_biteship++;
                dispatch(checkItem(item_midtrans, item_biteship));
              })
              .catch(error => {
                //ERROR
                dispatchError(dispatch, UPDATE_STATUS, error.message);
                Alert.alert('Alert', error.message + 'order id : ' + order_id);
              });
          } else {
            check_biteship++;
            dispatch(checkItem(item_midtrans, item_biteship));
          }
        }
      })
      .catch(error => {
        // ERROR
        dispatchError(dispatch, UPDATE_STATUS, error.message);
        Alert.alert(
          'Alert',
          error.message + 'order id : ' + order_id,
        );
      });
  };
};

export const checkItem = (item_midtrans, item_biteship) => {
  return dispatch => {
    if (check_midtrans === item_midtrans && check_biteship === item_biteship) {
      check_midtrans = 0;
      check_biteship = 0;
      //SUKSES
      dispatchSuccess(dispatch, UPDATE_STATUS, 'Cek Status Selesai');
    }
  };
};

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
