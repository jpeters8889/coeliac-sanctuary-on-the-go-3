import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import ListScreenContainer from '../Components/List/ListScreenContainer';
import SubmitReviewScreen from '../Components/PlaceDetails/SubmitReviewScreen';
import MainPlaceDetailsScreen from '../Components/PlaceDetails/MainPlaceDetailsScreen';

export default function List({ route }: { route: RouteProp<any> }) {
  const stack = createStackNavigator();

  return (
    <stack.Navigator screenOptions={{ headerShown: false }}>
      <stack.Group>
        <stack.Screen name="list-screen" component={ListScreenContainer} />
      </stack.Group>
      <stack.Group>
        <stack.Screen name="details" component={MainPlaceDetailsScreen} />
      </stack.Group>
      <stack.Group>
        <stack.Screen name="add-review" component={SubmitReviewScreen} />
      </stack.Group>
    </stack.Navigator>
  );
}
