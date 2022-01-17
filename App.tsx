import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import Styles from './src/Styles/Styles';
import { WHITE, YELLOW } from './src/constants';
import { MainTab } from './src/types';
import Home from './src/screens/Home';
import Map from './src/screens/Map';
import List from './src/screens/List';
import NationwideChains from './src/screens/NationwideChains';
import Website from './src/screens/Website';
import NationwideScreenContainer from './src/Components/Nationwide/NationwideScreenContainer';

export default function App() {
  const Tabs = createBottomTabNavigator();

  const availableTabs: MainTab[] = [
    {
      name: 'home',
      component: Home,
      label: 'Home',
      title: 'Coeliac Sanctuary - On the Go',
    },
    {
      name: 'map',
      component: Map,
      label: 'Map',
      showHeader: false,
    },
    {
      name: 'list',
      component: List,
      label: 'List',
      showHeader: false,
    },
    {
      name: 'nationwide',
      component: NationwideScreenContainer,
      label: 'Nationwide',
      showHeader: false,
      icon: ({ color, size }) => (
        <FontAwesome5 name="hamburger" size={size} color={color} />
      ),
    },
    {
      name: 'website',
      component: Website,
      label: 'Website',
      title: 'coeliacsanctuary.co.uk',
      icon: ({ color, size }) => (
        <Feather name="link" size={size} color={color} />
      ),
    },
  ];

  const options: BottomTabNavigationOptions = {
    headerStyle: {
      ...Styles.bgBlueLight,
    },
    tabBarItemStyle: {
      ...Styles.mb2,
    },
    tabBarIconStyle: {
      // ...Styles.mt2,
    },
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

  return (
    <NavigationContainer>
      <Tabs.Navigator screenOptions={options}>
        {availableTabs.map((tab) => (
          <Tabs.Screen
            key={tab.name}
            name={tab.name}
            component={tab.component}
            options={{
              title: tab.label,
              headerShown: tab?.showHeader ?? true,
              headerTitle: tab?.title ?? tab.label,
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
    </NavigationContainer>
  );
}
