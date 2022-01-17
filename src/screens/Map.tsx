import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PlaceDetailsModal from '../modals/PlaceDetailsModal';
import MapScreenContainer from '../Components/Map/MapScreenContainer';

export default function Map() {
  const stack = createStackNavigator();

  return (
    <stack.Navigator screenOptions={{ headerShown: false }}>
      <stack.Group>
        <stack.Screen name="map-screen" component={MapScreenContainer} />
      </stack.Group>
      <stack.Group screenOptions={{ presentation: 'modal' }}>
        <stack.Screen name="details" component={PlaceDetailsModal} />
      </stack.Group>
    </stack.Navigator>
  );
}
