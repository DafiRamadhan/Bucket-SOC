import * as React from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import Router from './router';
import { colors } from './utils';
import { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';

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
    <NavigationContainer theme={MyTheme}>
      <Router />
    </NavigationContainer>
  );
}

export default App;
