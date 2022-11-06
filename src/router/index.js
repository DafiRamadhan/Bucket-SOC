import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { Home, Splash, Bouquet, Orders, Profile, BuketDetail, Keranjang, Checkout } from '../pages';
import { BottomNavigator } from '../components';
import EditProfile from '../pages/EditProfile';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = () => {
  return (
    //Opsi untuk Navigasi Menu di Footer
    <Tab.Navigator tabBar={props => <BottomNavigator {...props} />}>
      <Tab.Screen name="Home" component={Home} options={{headerShown: false}} />
      <Tab.Screen
        name="Bouquet"
        component={Bouquet}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Orders"
        component={Orders}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Maps"
        component={EditProfile}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
}

const Router = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BuketDetail"
        component={BuketDetail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Keranjang"
        component={Keranjang}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Checkout"
        component={Checkout}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default Router