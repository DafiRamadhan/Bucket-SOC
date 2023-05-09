import axios from 'axios';
import {
  getDatabase,
  ref,
  set,
  remove,
  onValue,
  update,
} from 'firebase/database';
import {Alert} from 'react-native';
import {
  dispatchError,
  dispatchLoading,
  dispatchSuccess,
} from '../utils';

export const UPDATE_PESANAN = 'UPDATE_PESANAN';
export const CANCEL_PESANAN = 'CANCEL_PESANAN';
export const PESANAN_SELESAI = 'PESANAN_SELESAI';

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
          pesanan: snapshot.val(),
        };
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

export const cancelPesanan = pesanan => {
  return dispatch => {
    //LOADING
    dispatchLoading(dispatch, CANCEL_PESANAN);

    //Validasi kembali status pesanan terbaru saat ini
    return onValue(
      ref(getDatabase(), '/pesanan/' + pesanan.order_id),
      snapshot => {
        const data = snapshot.val();
        //Jika statusnya masih menunggu bayar / menunggu konfirmasi admin
        if (
          data.status_pesanan === 'Menunggu Pembayaran' ||
          data.status_pesanan === 'Menunggu Konfirmasi Admin'
        ) {
          //Cek apakah ada url midtrans, jika ada cek status pembayaran
          if (pesanan.url_midtrans) {
            const parameter = {
              order_id: pesanan.order_id,
              reason: 'Selesai (Dibatalkan Pembeli)',
            };

            axios
              .post(
                'https://us-central1-bucketsoc.cloudfunctions.net/app/midtrans-status',
                parameter,
              )
              .then(response => {
                //jika status pembayaran masih pending, batalkan pembayaran
                if (response.data.transaction_status === 'pending') {
                  axios
                    .post(
                      'https://us-central1-bucketsoc.cloudfunctions.net/app/midtrans-cancel',
                      parameter,
                    )
                    .then(response => {
                      //Jika pembatalan pesanan berhasil
                      if (response.data.transaction_status === 'cancel') {
                        update(
                          ref(getDatabase(), '/pesanan/' + pesanan.order_id),
                          {
                            status_pesanan: 'Selesai (Dibatalkan Pembeli)',
                          },
                        )
                          .then(response => {
                            //SUKSES
                            dispatchSuccess(
                              dispatch,
                              CANCEL_PESANAN,
                              response ? response : [],
                            );
                          })
                          .catch(error => {
                            //ERROR
                            dispatchError(
                              dispatch,
                              CANCEL_PESANAN,
                              error.message,
                            );
                            Alert.alert('Alert', error.message);
                          });
                      } else {
                        dispatchError(
                          dispatch,
                          CANCEL_PESANAN,
                          'Pembatalan Gagal',
                        );
                        Alert.alert(
                          'Error',
                          'Pembatalan gagal. Silakan hubungi Admin untuk info lebih lanjut!',
                        );
                      }
                    })
                    .catch(error => {
                      // ERROR
                      dispatchError(dispatch, CANCEL_PESANAN, error.message);
                      Alert.alert('Error', error.message);
                    });
                  //Jika pembayaran tidak ditemukan (pembeli belum memilih channel pembayaran)
                } else if (response.data.status_code === '404') {
                  update(ref(getDatabase(), '/pesanan/' + pesanan.order_id), {
                    status_pesanan: 'Selesai (Dibatalkan Pembeli)',
                  })
                    .then(response => {
                      //SUKSES
                      dispatchSuccess(
                        dispatch,
                        CANCEL_PESANAN,
                        response ? response : [],
                      );
                    })
                    .catch(error => {
                      //ERROR
                      dispatchError(dispatch, CANCEL_PESANAN, error.message);
                      Alert.alert('Alert', error.message);
                    });
                  //Jika pembayaran telah berhasil dilakukan tetapi admin belum mengonfirmasi pesanan
                } else if (
                  response.data.transaction_status === 'settlement' ||
                  response.data.transaction_status === 'capture'
                ) {
                  //Mencoba untuk melakukan refund
                  axios
                    .post(
                      'https://us-central1-bucketsoc.cloudfunctions.net/app/midtrans-refund',
                      parameter,
                    )
                    .then(response => {
                      //Jika refund berhasil
                      if (response.data.transaction_status === 'refund') {
                        update(
                          ref(getDatabase(), '/pesanan/' + pesanan.order_id),
                          {
                            status_pesanan: 'Selesai (Dibatalkan Pembeli)',
                          },
                        )
                          .then(response => {
                            //SUKSES
                            dispatchSuccess(
                              dispatch,
                              CANCEL_PESANAN,
                              response ? response : [],
                            );
                          })
                          .catch(error => {
                            //ERROR
                            dispatchError(
                              dispatch,
                              CANCEL_PESANAN,
                              error.message,
                            );
                            Alert.alert(
                              'Tidak Dapat Membatalkan Pesanan',
                              'Silakan hubungi Admin jika ingin melakukan pembatalan pesanan ini!',
                            );
                          });
                      } else {
                        dispatchError(
                          dispatch,
                          CANCEL_PESANAN,
                          'Pembatalan Gagal',
                        );
                        Alert.alert(
                          'Tidak Dapat Membatalkan Pesanan',
                          'Silakan hubungi Admin jika ingin melakukan pembatalan pesanan ini!',
                        );
                      }
                    })
                    .catch(error => {
                      // ERROR
                      dispatchError(dispatch, CANCEL_PESANAN, error.message);
                      Alert.alert('Error', error.message);
                    });
                }
              })
              .catch(error => {
                // ERROR
                dispatchError(dispatch, CANCEL_PESANAN, error.message);
                Alert.alert('Error', error.message);
              });
            //Jika tidak ada URL Midtrans (Bayar di Tempat)
          } else {
            update(ref(getDatabase(), '/pesanan/' + pesanan.order_id), {
              status_pesanan: 'Selesai (Dibatalkan Pembeli)',
            })
              .then(response => {
                //SUKSES
                dispatchSuccess(
                  dispatch,
                  CANCEL_PESANAN,
                  response ? response : [],
                );
              })
              .catch(error => {
                //ERROR
                dispatchError(dispatch, CANCEL_PESANAN, error.message);
                Alert.alert('Alert', error.message);
              });
          }
          //Jika statusnya sudah bukan lagi menunggu pembayaran / menunggu konfirmasi admin
        } else {
          //ERROR
          dispatchError(dispatch, CANCEL_PESANAN, 'Pembatalan Gagal');
          Alert.alert(
            'Error',
            'Pembatalan gagal. Silakan hubungi Admin untuk info lebih lanjut!',
          );
        }
      },
      {
        onlyOnce: true,
      },
      error => {
        //ERROR
        dispatchError(dispatch, CANCEL_PESANAN, error.message);
        Alert.alert('Error', error.message);
      },
    );
  };
};

export const pesananSelesai = pesanan => {
  return dispatch => {
    //LOADING
    dispatchLoading(dispatch, PESANAN_SELESAI);

    //Validasi kembali status pesanan terbaru saat ini
    return onValue(
      ref(getDatabase(), '/pesanan/' + pesanan.order_id),
      snapshot => {
        const data = snapshot.val();
        //Jika statusnya sudah 'Terkirim / 'Siap Diambil'
        if (
          data.status_pesanan === 'Terkirim' ||
          data.status_pesanan === 'Siap Diambil'
        ) {
          update(ref(getDatabase(), '/pesanan/' + pesanan.order_id), {
            status_pesanan: 'Selesai (Pesanan Telah Diterima)',
          })
            .then(response => {
              //SUKSES
              dispatchSuccess(
                dispatch,
                PESANAN_SELESAI,
                response ? response : [],
              );
            })
            .catch(error => {
              //ERROR
              dispatchError(dispatch, PESANAN_SELESAI, error.message);
              Alert.alert('Alert', error.message);
            });
        } else {
          //ERROR
          dispatchError(dispatch, PESANAN_SELESAI, 'Selesaikan Pesanan Gagal');
          Alert.alert(
            'Error',
            'Tidak dapat menyelesaikan pesanan. Silakan hubungi Admin untuk info lebih lanjut!',
          );
        }
      },
      {
        onlyOnce: true,
      },
      error => {
        //ERROR
        dispatchError(dispatch, PESANAN_SELESAI, error.message);
        Alert.alert('Error', error.message);
      },
    );
  };
};
