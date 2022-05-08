import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AnalyticsService from '../../libs/AnalyticsService';
import MainPlaceDetailsScreen from '../PlaceDetails/MainPlaceDetailsScreen';
import HomeScreenContent from './HomeScreenContent';
import SubmitReviewScreen from '../PlaceDetails/SubmitReviewScreen';
import SuggestEditScreen from '../PlaceDetails/SuggestEditScreen';

export default function MainHomeScreen() {
  AnalyticsService.logScreen('home-screen').then(() => {});
  const stack = createStackNavigator();

  return (
    <stack.Navigator screenOptions={{ headerShown: false }}>
      <stack.Group>
        <stack.Screen name="home-screen-content" component={HomeScreenContent} />
      </stack.Group>
      <stack.Group screenOptions={{ headerShown: false }}>
        <stack.Screen name="details" component={MainPlaceDetailsScreen} options={{ headerShown: false }} />
      </stack.Group>
      <stack.Group screenOptions={{ headerShown: false }}>
        <stack.Screen name="add-review" component={SubmitReviewScreen} options={{ headerShown: false }} />
      </stack.Group>
      <stack.Group>
        <stack.Screen
          name="suggest-edit"
          component={SuggestEditScreen}
          options={{ headerShown: false }}
        />
      </stack.Group>
    </stack.Navigator>
  );
}
