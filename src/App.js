import * as React from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import Router from './router';
import { colors } from './utils';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.white,
  },
};

function App() {
  return (
    <NavigationContainer theme={MyTheme}>
      <Router />
    </NavigationContainer>
  );
}

export default App;
