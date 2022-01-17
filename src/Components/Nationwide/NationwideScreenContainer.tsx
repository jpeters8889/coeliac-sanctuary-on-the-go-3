import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Styles from '../../Styles/Styles';
import { BLACK } from '../../constants';
import RecommendAPlace from '../../screens/RecommendAPlace';
import NationwideChainsScreen from './NationwideChainsScreen';

export default function NationwideScreenContainer() {
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
        name="map"
        component={NationwideChainsScreen}
        options={{
          drawerLabel: 'Nationwide Chains',
          headerTitle: 'Nationwide Chains',
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
