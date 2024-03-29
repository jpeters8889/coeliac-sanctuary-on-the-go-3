import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { View } from 'react-native';
import ListScreenContainer from '../Components/List/ListScreenContainer';
import SubmitReviewScreen from '../Components/PlaceDetails/SubmitReviewScreen';
import MainPlaceDetailsScreen from '../Components/PlaceDetails/MainPlaceDetailsScreen';
import { BLUE } from '../constants';
import SuggestEditScreen from '../Components/PlaceDetails/SuggestEditScreen';

export default function List() {
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
        <stack.Screen name="list-screen" component={ListScreenContainer} />
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
