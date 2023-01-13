import {getDatabase, ref, set, remove, onValue} from 'firebase/database';
import {Alert} from 'react-native';
import {dispatchError, dispatchLoading, dispatchSuccess} from '../utils';

export const UPDATE_PESANAN = 'UPDATE_PESANAN';

export const updatePesanan = data => {
  return dispatch => {
    //LOADING
    dispatchLoading(dispatch, UPDATE_PESANAN);

    //Hapus data keranjang berdasarkan UID
    remove(ref(getDatabase(), '/keranjang/' + data.user.uid))
      .then(response => {
        //Menambahkan status_pesanan ke dalam data
        const newData = {...data};
        if (data.url_midtrans) {
          newData.status_pesanan = 'Menunggu Pembayaran';
        } else {
          newData.status_pesanan = 'Menunggu Konfirmasi Admin';
        }

        //Simpan data pesanan ke Database dengan key order_id
        set(ref(getDatabase(), '/pesanan/' + data.order_id), newData)
          .then(response => {
            //SUSKES
            //Ambil data pesanan untuk ditampilkan pada halaman DetailPesanan
              dispatch(getDataPesanan(data.order_id));
          })
          .catch(error => {
            //ERROR
            dispatchError(dispatch, UPDATE_PESANAN, error.message);
            Alert.alert('Alert', error.message);
          });
      })
      .catch(error => {
        //ERROR
        dispatchError(dispatch, UPDATE_PESANAN, error.message);
        Alert.alert('Alert', error.message);
      });
  };
};

export const getDataPesanan = id => {
  return dispatch => {
    return onValue(
      ref(getDatabase(), '/pesanan/' + id),
      snapshot => {
        const data = {
          pesanan: snapshot.val()
        }
        //SUKSES
        dispatchSuccess(dispatch, UPDATE_PESANAN, data);
      },
      {
        onlyOnce: true,
      },
      error => {
        //ERROR
        dispatchError(dispatch, UPDATE_PESANAN, error.message);
        Alert.alert('Error', error.message);
      },
    );
  };
};
