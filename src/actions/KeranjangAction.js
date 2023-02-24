import {getDatabase, ref, set, onValue, push, remove} from 'firebase/database';
import {Alert} from 'react-native';
import {dispatchError, dispatchLoading, dispatchSuccess} from '../utils';

export const MASUK_KERANJANG = 'MASUK_KERANJANG';
export const GET_LIST_KERANJANG = 'GET_LIST_KERANJANG';
export const UPDATE_KERANJANG = 'UPDATE_KERANJANG';
export const DELETE_KERANJANG = 'DELETE_KERANJANG';

export const masukKeranjang = data => {
  return dispatch => {
    //LOADING
    dispatchLoading(dispatch, MASUK_KERANJANG);

    //Cek apakah data keranjang user tersebut sudah ada di database
    return onValue(
      ref(getDatabase(), '/keranjang/' + data.uid),
      snapshot => {
        if (snapshot.val()) {
          //Update data keranjang yang sudah ada
          dispatch(simpanItemKeranjang(data));
        } else {
          //Buat data keranjang baru
          const dataKeranjang = {
            user: data.uid,
          };

          //Simpan data 'dataKeranjang' ke Database
          set(ref(getDatabase(), '/keranjang/' + data.uid), dataKeranjang)
            .then(response => {
              //jika berhasil maka akan lanjut menyimpan data barang ke keranjang
              dispatch(simpanItemKeranjang(data));
            })
            .catch(error => {
              //ERROR
              dispatchError(dispatch, MASUK_KERANJANG, error.message);
              Alert.alert('Alert', error.message);
            });
        }
      },
      {
        onlyOnce: true,
      },
      error => {
        //ERROR
        dispatchError(dispatch, MASUK_KERANJANG, error.message);
        Alert.alert('Error', error.message);
      },
    );
  };
};

export const simpanItemKeranjang = data => {
  return dispatch => {
    const item = {
      produk: data.id_produk,
      jumlah: data.value,
      catatan: data.catatan,
    };
    //Simpan data barang ke database
    set(push(ref(getDatabase(), '/keranjang/' + data.uid + '/item/')), item)
      .then(response => {
        //SUKSES
        dispatchSuccess(dispatch, MASUK_KERANJANG, response ? response : []);
      })
      .catch(error => {
        //ERROR
        dispatchError(dispatch, MASUK_KERANJANG, error.message);
        Alert.alert('Alert', error.message);
      });
  };
};

export const getListKeranjang = uid => {
  return dispatch => {
    //LOADING
    dispatchLoading(dispatch, GET_LIST_KERANJANG);

    return onValue(
      ref(getDatabase(), '/keranjang/' + uid),
      snapshot => {
        const data = snapshot.val();
        //SUKSES
        dispatchSuccess(dispatch, GET_LIST_KERANJANG, data);
      },
      {
        onlyOnce: true,
      },
      error => {
        //ERROR
        dispatchError(dispatch, GET_LIST_KERANJANG, error.message);
        Alert.alert('Error', error.message);
      },
    );
  };
};

export const updateKeranjang = (uid, produkList) => {
  return dispatch => {
    //LOADING
    dispatchLoading(dispatch, UPDATE_KERANJANG);
    dispatchLoading(dispatch, GET_LIST_KERANJANG);

    //Baca data keranjang saat ini
    return onValue(
      ref(getDatabase(), '/keranjang/' + uid),
      snapshot => {
        const data = snapshot.val();
        //Jika data keranjang user ada
        if (data) {
          let itemList = [];
          //Lakukan perulangan item pada keranjang
          Object.keys(data.item).forEach(key => {
            const list = {...data.item[key], id: key};
            itemList.push(list);
          });
          //Dapatkan jumlah item pada keranjang
          let jumlahItem = itemList.length;

          //Filter item sesuai kriteria (item dihapus atau tidak ready)
          let filteredItemList = itemList.filter(item => {
            const isProdukExist =
              produkList.find(x => x.key === item.produk) !== undefined;
            const isProdukReady =
              isProdukExist &&
              produkList.find(x => x.key === item.produk).produk.ready;
            return !isProdukExist || !isProdukReady;
          });

          const filteredCount = filteredItemList.length;
          let deletedItemCount = 0;
          if (filteredCount !== 0) {
            filteredItemList.forEach(item => {
              remove(
                ref(getDatabase(), '/keranjang/' + uid + '/item/' + item.id),
              )
                .then(() => {
                  deletedItemCount++;
                  jumlahItem--;
                  // Jika semua item yang memenuhi kriteria sudah dihapus
                  if (deletedItemCount === filteredCount) {
                    // Jika Tidak ada lagi item di dalam keranjang
                    if (jumlahItem === 0) {
                      remove(ref(getDatabase(), '/keranjang/' + uid))
                        .then(() => {
                          //SUKSES
                          dispatchSuccess(
                            dispatch,
                            UPDATE_KERANJANG,
                            'Update Keranjang Sukses',
                          );
                          Alert.alert(
                            'Info',
                            'Beberapa produk telah dihapus karena sudah tidak tersedia!',
                          );
                        })
                        .catch(error => {
                          dispatchError(
                            dispatch,
                            UPDATE_KERANJANG,
                            error.message,
                          );
                          Alert.alert('Error', error.message);
                        });
                    } else {
                      //SUKSES
                      dispatchSuccess(
                        dispatch,
                        UPDATE_KERANJANG,
                        'Update Keranjang Sukses',
                      );
                      Alert.alert(
                        'Info',
                        'Beberapa produk telah dihapus karena sudah tidak tersedia!',
                      );
                    }
                  }
                })
                .catch(error => {
                  dispatchError(dispatch, UPDATE_KERANJANG, error.message);
                  Alert.alert('Error', error.message);
                });
            });
          } else {
            //SUKSES
            dispatchSuccess(dispatch, GET_LIST_KERANJANG, data);
            dispatchSuccess(dispatch, UPDATE_KERANJANG, false);
          }

          //Jika data keranjang user tidak ada
        } else {
          //SUKSES
          dispatchSuccess(dispatch, GET_LIST_KERANJANG, data);
          dispatchSuccess(dispatch, UPDATE_KERANJANG, false);
        }
      },
      {
        onlyOnce: true,
      },
      error => {
        //ERROR
        dispatchError(dispatch, UPDATE_KERANJANG, error.message);
        Alert.alert('Error', error.message);
      },
    );
  };
};

export const deleteKeranjang = (id, keranjang, totalKeranjang) => {
  return dispatch => {
    //LOADING
    dispatchLoading(dispatch, DELETE_KERANJANG);
    //menghitung jumlah item keranjang baru : item awal - 1
    jumlah_item_baru = totalKeranjang - 1;

    //jika sudah tidak ada item di keranjang (item = 0)
    if (jumlah_item_baru === 0) {
      //hapus data keranjang pada uid user tersebut beserta data itemnya
      remove(ref(getDatabase(), '/keranjang/' + keranjang.user))
        .then(response => {
          //SUKSES
          dispatchSuccess(
            dispatch,
            DELETE_KERANJANG,
            'Keranjang berhasil dihapus',
          );
        })
        .catch(error => {
          //ERROR
          dispatchError(dispatch, DELETE_KERANJANG, error.message);
          Alert.alert('Alert', error.message);
        });

      //jika masih ada item di keranjang
    } else {
      dispatch(deleteKeranjangItem(id, keranjang));
    }
  };
};

export const deleteKeranjangItem = (id, keranjang) => {
  return dispatch => {
    remove(ref(getDatabase(), '/keranjang/' + keranjang.user + '/item/' + id))
      .then(response => {
        //SUKSES
        dispatchSuccess(
          dispatch,
          DELETE_KERANJANG,
          'Keranjang Berhasil Dihapus',
        );
      })
      .catch(error => {
        //ERROR
        dispatchError(dispatch, DELETE_KERANJANG, error.message);
        Alert.alert('Alert', error.message);
      });
  };
};
