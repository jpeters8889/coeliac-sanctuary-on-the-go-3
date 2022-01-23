import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainListScreen from './MainListScreen';
import About from '../../screens/About';
import Styles from '../../Styles/Styles';
import { BLACK } from '../../constants';
import RecommendAPlace from '../../screens/RecommendAPlace';

export default function ListScreenContainer() {
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
        name="list"
        component={MainListScreen}
        options={{
          drawerLabel: 'Eating Out List',
          headerTitle: 'Eating Out List',
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
