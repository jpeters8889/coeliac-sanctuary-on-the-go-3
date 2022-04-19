import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AnalyticsService from '../../libs/AnalyticsService';
import PlaceDetailsModal from '../../modals/PlaceDetailsModal';
import HomeScreenContent from './HomeScreenContent';

export default function MainHomeScreen() {
  AnalyticsService.logScreen('home-screen').then(() => {});
  const stack = createStackNavigator();

  return (
    <stack.Navigator screenOptions={{ headerShown: false }}>
      <stack.Group>
        <stack.Screen name="home-screen-content" component={HomeScreenContent} />
      </stack.Group>
      <stack.Group screenOptions={{ presentation: 'modal' }}>
        <stack.Screen name="details" component={PlaceDetailsModal} />
      </stack.Group>
    </stack.Navigator>
  );
}
