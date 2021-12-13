import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import globalStyles from '../Styles/Global';
import { WHITE, YELLOW } from '../constants';
import Home from '../screens/Home';
import Map from '../screens/Map';
import List from '../screens/List';
import { MainTab } from '../types';
import NationwideChains from '../screens/NationwideChains';

const Tabs = createBottomTabNavigator();

const availableTabs: MainTab[] = [
  {
    name: 'home',
    component: Home,
    title: 'Home',
  },
  {
    name: 'map',
    component: Map,
    title: 'Map',
  },
  {
    name: 'list',
    component: List,
    title: 'List',
  },
  {
    name: 'nationwide',
    component: NationwideChains,
    title: 'Nationwide',
    icon: ({ color, size }) => (
      <FontAwesome5 name="hamburger" size={size} color={color} />
    ),
  },
];

const options = {
  headerShown: false,
  tabBarStyle: globalStyles.bgBlueLight,
  tabBarActiveTintColor: YELLOW,
  tabBarInactiveTintColor: WHITE,
  tabBarLabelStyle: {
    ...globalStyles.fontSemibold,
    ...globalStyles.textLg,
  },
};

export default function MainTabNavigator() {
  return (
    <Tabs.Navigator screenOptions={options}>
      {availableTabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          component={tab.component}
          options={{
            title: tab.title,
            tabBarIcon: ({ focused, color, size }) => (
              tab.icon
                ? tab.icon({ focused, color, size })
                // @ts-ignore
                : <Ionicons name={tab.name} size={size} color={color} />
            ),
          }}
        />
      ))}
    </Tabs.Navigator>
  );
}
