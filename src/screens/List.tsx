import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PlaceDetailsModal from '../modals/PlaceDetailsModal';
import MainListScreen from '../Components/List/MainListScreen';

export default function List() {
  const stack = createStackNavigator();

  return (
    <stack.Navigator screenOptions={{ headerShown: false }}>
      <stack.Group>
        <stack.Screen name="list-screen" component={MainListScreen} />
      </stack.Group>
      <stack.Group screenOptions={{ presentation: 'modal' }}>
        <stack.Screen name="details" component={PlaceDetailsModal} />
      </stack.Group>
    </stack.Navigator>
  );
}
