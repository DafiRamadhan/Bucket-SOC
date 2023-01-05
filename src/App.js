import * as React from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import Router from './router';
import { colors } from './utils';
import { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux';
import store from './reducers/store';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.white,
  },
};

function App() {
  useEffect(() => {
    SplashScreen.hide();
  })
  
  return (
    <Provider store={store}>
      <NavigationContainer theme={MyTheme}>
        <Router />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
