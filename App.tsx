import React, { useEffect } from 'react';
import { CommonActions, NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import { Platform } from 'react-native';
import { AdMobBanner } from 'expo-ads-admob';
import * as Device from 'expo-device';
import { requestTrackingPermissionsAsync } from 'expo-tracking-transparency';
// import mobileAds, { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import Styles from './src/Styles/Styles';
import { WHITE, YELLOW } from './src/constants';
import { MainTab } from './src/types';
import Home from './src/screens/Home';
import Map from './src/screens/Map';
import List from './src/screens/List';
import Website from './src/screens/Website';
import AnalyticsService from './src/libs/AnalyticsService';
import Nationwide from './src/screens/Nationwide';

export default function App() {
  const Tabs = createBottomTabNavigator();

  // mobileAds()
  //   .initialize()
  //   .then((adapterStatuses) => {
  //     // Initialization complete!
  //   });
  //
  // const adId = (): string => {
  //   if (Device.isDevice) {
  //     if (Platform.OS === 'android') {
  //       return 'ca-app-pub-1063051842575021/7584775669';
  //     }
  //
  //     return 'ca-app-pub-1063051842575021/8005756608';
  //   }
  //
  //   return TestIds.BANNER;
  // };

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
      component: Nationwide,
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

  useEffect(() => {
    (async () => {
      const { status } = await requestTrackingPermissionsAsync();
      await AnalyticsService.toggleAnalytics(status === 'granted');
    })();
  }, []);

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
              listeners={({ navigation }) => ({
                tabPress: (event) => {
                  event.preventDefault();

                  navigation.dispatch(
                    CommonActions.reset({
                      index: 0,
                      routes: [
                        { name: tab.name },
                      ],
                    }),
                  );
                },
              })}
            />
          ))}
        </Tabs.Navigator>
      </NavigationContainer>

      {/*<BannerAd*/}
      {/*  unitId={adId()}*/}
      {/*  size={BannerAdSize.BANNER}*/}
      {/*  requestOptions={{*/}
      {/*    requestNonPersonalizedAdsOnly: true,*/}
      {/*  }}*/}
      {/*/>*/}
    </>
  );
}
