import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';
import MainPlaceDetailsScreen from '../Components/PlaceDetails/MainPlaceDetailsScreen';
import MapScreenContainer from '../Components/Map/MapScreenContainer';
import SubmitReviewScreen from '../Components/PlaceDetails/SubmitReviewScreen';
import { BLUE } from '../constants';
import SuggestEditScreen from '../Components/PlaceDetails/SuggestEditScreen';

export default function Map() {
  const stack = createStackNavigator();

  return (
    <stack.Navigator screenOptions={{
      headerShown: false,
      headerLeft: () => <View />,
      headerBackTitleVisible: false,
      headerStyle: {
        backgroundColor: BLUE,
      },
      headerTitle: 'Coeliac Sanctuary - On the Go',
    }}
    >
      <stack.Group>
        <stack.Screen name="map-screen" component={MapScreenContainer} />
      </stack.Group>
      <stack.Group>
        <stack.Screen
          name="details"
          component={MainPlaceDetailsScreen}
          options={{ headerShown: true }}
        />
      </stack.Group>
      <stack.Group>
        <stack.Screen
          name="add-review"
          component={SubmitReviewScreen}
          options={{ headerShown: true }}
        />
      </stack.Group>
      <stack.Group>
        <stack.Screen
          name="suggest-edit"
          component={SuggestEditScreen}
          options={{ headerShown: true }}
        />
      </stack.Group>
    </stack.Navigator>
  );
}
