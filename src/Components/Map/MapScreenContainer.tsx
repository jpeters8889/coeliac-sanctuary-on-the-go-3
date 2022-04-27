import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Styles from '../../Styles/Styles';
import { BLACK } from '../../constants';
import RecommendAPlace from '../../screens/RecommendAPlace';
import MapScreen from './MapScreen';

export default function MapScreenContainer() {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      detachInactiveScreens
      initialRouteName="map"
      screenOptions={{
        unmountOnBlur: true,
        headerStyle: {
          ...Styles.bgBlueLight,
        },
        headerTintColor: BLACK,
      }}
    >
      <Drawer.Screen
        name="map"
        component={MapScreen}
        options={{
          drawerLabel: 'Eating Out Map',
          headerTitle: 'Eating Out Map',
        }}
      />
      <Drawer.Screen
        name="recommend-place"
        component={RecommendAPlace}
        options={{
          drawerLabel: 'Recommend a Place',
          headerTitle: 'Recommend a Place',
        }}
      />
    </Drawer.Navigator>
  );
}
