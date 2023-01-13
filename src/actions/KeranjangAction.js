import {getDatabase, ref, set, onValue, update, push, remove} from 'firebase/database';
import {Alert} from 'react-native';
import {dispatchError, dispatchLoading, dispatchSuccess} from '../utils';

export const MASUK_KERANJANG = 'MASUK_KERANJANG';
export const GET_LIST_KERANJANG = 'GET_LIST_KERANJANG';
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
          const dataKeranjang = snapshot.val()
          const harga_baru = parseInt(data.value) * parseInt(data.produk.harga)

          update(ref(getDatabase(), '/keranjang/' + data.uid), {
            total_harga : dataKeranjang.total_harga + harga_baru
          })
            .then(response => {
              //jika berhasil maka akan lanjut menyimpan data barang ke keranjang
              dispatch(simpanItemKeranjang(data));
            })
            .catch(error => {
              //ERROR
              dispatchError(dispatch, MASUK_KERANJANG, error.message);
              Alert.alert('Alert', error.message);
            });
            
        } else {
          //Buat data keranjang baru
          const dataKeranjang = {
            user: data.uid,
            total_harga: parseInt(data.value) * parseInt(data.produk.harga),
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
      produk: data.produk,
      jumlah: data.value,
      total_harga: parseInt(data.value) * parseInt(data.produk.harga),
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

export const getListKeranjang = (uid) => {
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

export const deleteKeranjang = (id, keranjang, item) => {
  return dispatch => {
    //LOADING
    dispatchLoading(dispatch, DELETE_KERANJANG);

    //menghitung total harga baru : total harga di keranjang - total harga tiap item
    total_harga_baru = keranjang.total_harga - item.total_harga

    //jika sudah tidak ada item di keranjang (harga = 0)
    if(total_harga_baru === 0) {
      //hapus data keranjang pada uid user tersebut beserta data itemnya
      remove(ref(getDatabase(), '/keranjang/' + keranjang.user))
      .then(response => {
        //SUKSES
        dispatchSuccess(dispatch, DELETE_KERANJANG, 'Keranjang Berhasil Dihapus')
      })
      .catch(error => {
        //ERROR
        dispatchError(dispatch, DELETE_KERANJANG, error.message);
        Alert.alert('Alert', error.message);
      });

      //jika masih ada barang di keranjang
    } else {
      //update total harga di keranjang
      update(ref(getDatabase(), '/keranjang/' + keranjang.user), {
        total_harga: total_harga_baru,
      })
        .then(response => {
          //jika berhasil update maka akan lanjut hapus data item yang terpilih
          dispatch(deleteKeranjangItem(id, keranjang));
        })
        .catch(error => {
          //ERROR
          dispatchError(dispatch, DELETE_KERANJANG, error.message);
          Alert.alert('Alert', error.message);
        });

    }
  }
}

export const deleteKeranjangItem = (id, keranjang) => {
  return dispatch => {
    remove(ref(getDatabase(), '/keranjang/' + keranjang.user + '/item/' + id))
    .then(response => {
        //SUKSES
        dispatchSuccess(dispatch, DELETE_KERANJANG, 'Keranjang Berhasil Dihapus')
      })
      .catch(error => {
        //ERROR
        dispatchError(dispatch, DELETE_KERANJANG, error.message);
        Alert.alert('Alert', error.message);
      });
  }
}
