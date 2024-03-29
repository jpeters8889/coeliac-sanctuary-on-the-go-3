import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainHomeScreen from '../Components/Home/MainHomeScreen';
import About from './About';
import Styles from '../Styles/Styles';
import { BLACK } from '../constants';

export default function Home() {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      detachInactiveScreens
      initialRouteName="home-screen"
      screenOptions={{
        headerStyle: {
          ...Styles.bgBlueLight,
        },
        headerTintColor: BLACK,
      }}
    >
      <Drawer.Screen
        name="home-screen"
        component={MainHomeScreen}
        options={{
          drawerLabel: 'Coeliac Sanctuary - On the Go',
          headerTitle: 'Coeliac Sanctuary - On the Go',
        }}
      />
      <Drawer.Screen
        name="about"
        component={About}
        options={{
          drawerLabel: 'About our App',
          headerTitle: 'About our App',
        }}
      />
    </Drawer.Navigator>
  );
}
