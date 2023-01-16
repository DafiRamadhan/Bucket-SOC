import * as React from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import Router from './router';
import { colors, getData } from './utils';
import { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux';
import store from './reducers/store';
import { useState } from 'react';

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
        setStatus('Logged In');
        SplashScreen.hide();
      } else {
        setStatus('Not Login');
        SplashScreen.hide();
      }
    });
    
  })
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
