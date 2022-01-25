import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import Constants from 'expo-constants';
import { Platform } from 'react-native';
import { AdMobBanner } from 'expo-ads-admob';
import Styles from './src/Styles/Styles';
import { WHITE, YELLOW } from './src/constants';
import { MainTab } from './src/types';
import Home from './src/screens/Home';
import Map from './src/screens/Map';
import List from './src/screens/List';
import Website from './src/screens/Website';
import NationwideScreenContainer from './src/Components/Nationwide/NationwideScreenContainer';

export default function App() {
  const Tabs = createBottomTabNavigator();

  const adId = (): string => {
    if (Constants.isDevice && !__DEV__) {
      return 'ca-app-pub-3940256099942544/2934735716';
    }

    if (Platform.OS === 'android') {
      return 'ca-app-pub-3940256099942544/6300978111'; // android test ad
    }

    return 'ca-app-pub-3940256099942544/2934735716'; // ios test ad
  };

  const availableTabs: MainTab[] = [
    {
      name: 'home',
      component: Home,
      label: 'Home',
      showHeader: false,
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
    <>
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

      <AdMobBanner
        bannerSize="smartBannerPortrait"
        adUnitID={adId()}
        servePersonalizedAds // true or false
      />
    </>
  );
}
