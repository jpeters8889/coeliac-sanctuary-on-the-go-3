import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import Styles from '../Styles/Styles';
import { WHITE, YELLOW } from '../constants';
import Home from '../screens/Home';
import Map from '../screens/Map';
import List from '../screens/List';
import { MainTab } from '../types';
import NationwideChains from '../screens/NationwideChains';
import Website from '../screens/Website';

const Tabs = createBottomTabNavigator();

const availableTabs: MainTab[] = [
  {
    name: 'home',
    component: Home,
    label: 'Home',
  },
  {
    name: 'map',
    component: Map,
    label: 'Map',
    title: 'Eating Out Map',
  },
  {
    name: 'list',
    component: List,
    label: 'List',
  },
  {
    name: 'nationwide',
    component: NationwideChains,
    label: 'Nationwide',
    icon: ({ color, size }) => (
      <FontAwesome5 name="hamburger" size={size} color={color} />
    ),
  },
  {
    name: 'website',
    component: Website,
    label: 'Website',
    icon: ({ color, size }) => (
      <Feather name="link" size={size} color={color} />
    ),
  },
];

const options: BottomTabNavigationOptions = {
  headerShown: false,
  tabBarStyle: {
    ...Styles.bgBlueLight,
    ...Styles.justifyBetween,
  },
  tabBarActiveTintColor: YELLOW,
  tabBarInactiveTintColor: WHITE,
  tabBarLabelStyle: {
    // ...Styles.fontSemibold,
    ...Styles.textSm,
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
            title: tab.label,
            headerTitle: 'foo',
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
