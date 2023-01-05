import {initializeApp} from 'firebase/app'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth/react-native';

const firebaseConfig = {
  apiKey: 'AIzaSyBUk4nWm3Yf1fW0J4gDrafARpaTrx3Q7RM',
  authDomain: 'bucketsoc.firebaseapp.com',
  databaseURL: 'https://bucketsoc-default-rtdb.firebaseio.com',
  projectId: 'bucketsoc',
  storageBucket: 'bucketsoc.appspot.com',
  messagingSenderId: '1088484004863',
  appId: '1:1088484004863:web:8ff14afbfb62c68f0a0dca',
  measurementId: 'G-EG47QM9Q0S',
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export {auth};