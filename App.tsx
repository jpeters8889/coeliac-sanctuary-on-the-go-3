import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Settings from './src/screens/Settings';
import globalStyles from './src/Styles/Styles';
import { BLACK, BLUE_LIGHT, WHITE } from './src/constants';
import MainTabNavigator from './src/Components/MainTabNavigator';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="landing"
        screenOptions={{
          headerStyle: globalStyles.bgBlueLight,
          headerTintColor: BLACK,
          drawerInactiveBackgroundColor: WHITE,
          drawerActiveBackgroundColor: BLUE_LIGHT,
        }}
      >
        <Drawer.Screen
          name="landing"
          component={MainTabNavigator}
          options={{
            title: 'Coeliac Sanctuary - On the Go',
          }}
        />
        <Drawer.Screen
          name="settings"
          component={Settings}
          options={{
            title: 'Settings',
          }}
        />
      </Drawer.Navigator>

    </NavigationContainer>
  );
}
