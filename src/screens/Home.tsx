import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainHomeScreen from '../Components/Home/MainHomeScreen';
import Settings from './Settings';
import Styles from '../Styles/Styles';
import { BLACK } from '../constants';

export default function Home() {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator screenOptions={{
      headerStyle: {
        ...Styles.bgBlueLight,
      },
      headerTintColor: BLACK,
    }}
    >
      <Drawer.Screen
        name="home-scree"
        component={MainHomeScreen}
        options={{
          drawerLabel: 'Coeliac Sanctuary - On the Go',
          headerTitle: 'Coeliac Sanctuary - On the Go',
        }}
      />
      <Drawer.Screen
        name="about"
        component={Settings}
        options={{
          drawerLabel: 'About our App',
          headerTitle: 'About our App',
        }}
      />
    </Drawer.Navigator>
  );
}
