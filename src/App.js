import * as React from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import Router from './router';
import { clearData, colors, getData } from './utils';
import { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux';
import store from './reducers/store';
import { useState } from 'react';
import { getDatabase, onValue, ref } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.white,
  },
};

function App() {
  useEffect(() => {
    //mendapatkan data dari parameter 'user'
    getData('user').then(res => {
      //jika datanya ada
      if (res) {
        //Cek data akun di database
        return onValue(
          ref(getDatabase(), '/users/' + res.uid),
          snapshot => {
            const data = snapshot.val();
            //jika akun ditemukan di database
            if (data) {
              //Cek status login di firebase Auth
              getAuth().onAuthStateChanged(function (user) {
                if (user) {
                  // User is signed in.
                  setStatus('Logged In');
                  SplashScreen.hide();
                } else {
                  // No user is signed in.
                  setStatus('Not Login');
                  clearData();
                  SplashScreen.hide();
                }
              });
              //Jika akun tidak ditemukan di database
            } else {
              setStatus('Not Login');
              clearData();
              SplashScreen.hide();
            }
          },
          {
            onlyOnce: true,
          },
          error => {
            //ERROR baca data firebase
            setStatus('Not Login');
            clearData();
            SplashScreen.hide();
          },
        );
        //Jika tidak ada data user di localStorage
      } else {
        setStatus('Not Login');
        SplashScreen.hide();
      }
    });
  });
  
  const [status, setStatus] = useState(false);
  return (
    <Provider store={store}>
      <NavigationContainer theme={MyTheme}>
        {status ? (
          <Router status={status} />
        ) : null}
      </NavigationContainer>
    </Provider>
  );
}

export default App;
