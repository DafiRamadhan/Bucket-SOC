import { sendPasswordResetEmail } from 'firebase/auth';
import {getDatabase, ref, update} from 'firebase/database';
import { Alert } from 'react-native';
import { auth } from '../config/FIREBASE';
import {dispatchError, dispatchLoading, dispatchSuccess, storeData} from '../utils';

export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const FORGOT_PASSWORD = 'FORGOT_PASSWORD';
const db = getDatabase();

export const updateProfile = data => {
  return dispatch => {
    //LOADING
    dispatchLoading(dispatch, UPDATE_PROFILE);

    //Simpan data ke Firebase Realtime Database sesuai uid
    update(ref(db, 'users/' + data.uid), data)
      .then(response => {
        //SUKSES
        dispatchSuccess(dispatch, UPDATE_PROFILE, response ? response : []);

        //Simpan data Ke Local Storage (async storage)
        storeData('user', data);
      })
      .catch(error => {
        //ERROR
        dispatchError(dispatch, UPDATE_PROFILE, error.message)
        Alert.alert('Alert', error.message);
      });
  };
};

export const forgotPassword = email => {
  return dispatch => {
    //LOADING
    dispatchLoading(dispatch, FORGOT_PASSWORD);

    sendPasswordResetEmail(auth, email)
      .then(response => {
        //SUKSES
        dispatchSuccess(dispatch, FORGOT_PASSWORD, response ? response : []);
      })
      .catch(error => {
        //ERROR
        dispatchError(dispatch, FORGOT_PASSWORD, error.message);
        if (error.code === 'auth/user-not-found') {
          Alert.alert("Error", 'Email tidak terdaftar!');
        } else if (error.code === 'auth/network-request-failed') {
          Alert.alert('Error', 'Mohon periksa jaringan Anda!');
        } else {
          Alert.alert("Error", error.code);
        }
      });
  }
}
