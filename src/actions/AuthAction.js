import {
  dispatchError,
  dispatchLoading,
  dispatchSuccess,
  storeData,
} from '../utils';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import {getDatabase, ref, set, onValue, update} from 'firebase/database';
import {auth} from '../config/FIREBASE';
import {Alert} from 'react-native';

export const REGISTER_USER = 'REGISTER_USER';
export const LOGIN_USER = 'LOGIN_USER';

const db = getDatabase();

//menerima parameter data dan password dari halaman Register2
export const registerUser = (data, password) => {
  return dispatch => {
    //LOADING
    dispatchLoading(dispatch, REGISTER_USER);

    //Simpan ke Firebase Authentication (email dan password)
    createUserWithEmailAndPassword(auth, data.email, password)
      .then(success => {
        //create UID dan membuat newData (data+UID)
        const newData = {
          ...data,
          uid: success.user.uid,
          verified: success.user.emailVerified,
        };

        //Kirim Email verifikasi
        sendEmailVerification(auth.currentUser)
          .then(() => {
            // Email verification sent!
            // Simpan newData ke Firebase Realtime Database
            set(ref(db, 'users/' + success.user.uid), newData)
              .then(response => {
                //SUKSES
                dispatchSuccess(
                  dispatch,
                  REGISTER_USER,
                  response ? response : [],
                );
              })
              .catch(error => {
                //ERROR
                dispatchError(dispatch, REGISTER_USER, error.message);
                Alert.alert('Alert', error.message);
              });
          })
          .catch(error => {
            //ERROR
            dispatchError(dispatch, REGISTER_USER, error.message);
            Alert.alert('Alert', error.message);
          });
      })
      .catch(error => {
        //ERROR
        dispatchError(dispatch, REGISTER_USER, error.message);
        if (error.code === 'auth/network-request-failed') {
          Alert.alert('Error', 'Mohon periksa jaringan Anda!');
        } else {
          Alert.alert('Error', error.code);
        }
      });
  };
};

export const loginUser = (email, password) => {
  return dispatch => {
    //LOADING
    dispatchLoading(dispatch, LOGIN_USER);

    //menerima parameter email dan password dari halaman Login
    signInWithEmailAndPassword(auth, email, password)
      .then(success => {
        // Signed in
        //Baca data user di Database
        return onValue(
          ref(db, '/users/' + success.user.uid),
          resDB => {
            const data = resDB.val();
            //Jika data di database akun sudah verified
            if (data.verified === true) {
              //SUKSES
              dispatchSuccess(dispatch, LOGIN_USER, data);

              //Simpan resDB Ke Local Storage (async storage)
              storeData('user', data);

              //Jika data di database akun belum verified
            } else if (data.verified === false) {
              //Cek apakah akun sudah verified di Authentication
              if (success.user.emailVerified === true) {
                //Jika verified, update database
                update(ref(db, 'users/' + data.uid), {
                  verified: true,
                })
                  .then(response => {
                    //SUKSES
                    dispatchSuccess(
                      dispatch,
                      LOGIN_USER,
                      response ? response : [],
                    );

                    //Simpan data Ke Local Storage (async storage)
                    storeData('user', data);
                  })
                  .catch(error => {
                    //ERROR
                    dispatchError(dispatch, UPDATE_PROFILE, error.message);
                    Alert.alert('Alert', error.message);
                  });
              } else {
                //ERROR
                dispatchError(dispatch, LOGIN_USER, 'User belum terverifikasi');
                Alert.alert(
                  'Email Belum Terverifikasi',
                  'Silakan lakukan verifikasi email terlebih dahulu!. Kirim ulang tautan verifikasi email?',
                  [
                    {
                      text: 'Tidak',
                      onPress: () => dispatch(logout()),
                    },
                    {
                      text: 'Ya',
                      onPress: () => dispatch(sendVerificationEmail()),
                    },
                  ],
                );
              }
            }
          },
          {
            onlyOnce: true,
          },
          error => {
            //ERROR
            dispatchError(dispatch, LOGIN_USER, error.message);
            Alert.alert('Error', error.message);
          },
        );
      })
      .catch(error => {
        //ERROR
        dispatchError(dispatch, LOGIN_USER, error.message);
        if (
          error.code === 'auth/invalid-email' ||
          error.code === 'auth/wrong-password'
        ) {
          Alert.alert('Error', 'Email atau Password salah!');
        } else if (error.code === 'auth/network-request-failed') {
          Alert.alert('Error', 'Mohon periksa jaringan Anda!');
        } else {
          Alert.alert('Error', error.code);
        }
      });
  };
};

export const sendVerificationEmail = () => {
  return dispatch => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        Alert.alert(
          'Berhasil',
          'Tautan verifikasi telah dikirimkan ulang ke email Anda!',
        );
        dispatch(logout())
      })
      .catch(error => {
        //ERROR
        Alert.alert('Alert', error.message);
      });
  };
};

export const logout = () => {
  return dispatch => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch(error => {
        // An error happened.
        Alert.alert('Error', error.message);
      });
  };
};
