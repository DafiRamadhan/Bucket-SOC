import {dispatchError, dispatchLoading, dispatchSuccess, storeData} from '../utils';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import {getDatabase, ref, set, onValue} from 'firebase/database';
import {auth} from '../config/FIREBASE';
import { Alert } from 'react-native';

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
        };

        //Simpan newData ke Firebase Realtime Database
        set(ref(db, 'users/' + success.user.uid), newData);

        //SUKSES
        dispatchSuccess(dispatch, REGISTER_USER, newData)

        //Simpan newData Ke Local Storage (async storage)
        //storeData('user', newData);
      })
      .catch(error => {
        //ERROR
        dispatchError(dispatch, REGISTER_USER, error.message)
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
        return onValue(
          ref(db, '/users/' + success.user.uid),
          resDB => {
            if (resDB.val()) {
              //SUKSES
              dispatchSuccess(dispatch, LOGIN_USER, resDB.val());

              //Simpan resDB Ke Local Storage (async storage)
              storeData('user', resDB.val());

            } else {
              //ERROR
              dispatchError(dispatch, LOGIN_USER, error.message);
              Alert.alert('Error', error.message);
            }
          },
          {
            onlyOnce: true,
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
        } else if (
          error.code === 'auth/network-request-failed'
        ) {
          Alert.alert('Error', 'Mohon periksa jaringan Anda!');
        } else {
          Alert.alert('Error', error.code);
        }
      });
  };
};
