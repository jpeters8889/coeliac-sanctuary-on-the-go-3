import React from 'react';
import { Text, ScrollView } from 'react-native';
import Styles from '../../Styles/Styles';
import HomeSummary from './HomeSummary';
import LatestRatings from './LatestRatings';
import LatestLocations from './LatestLocations';

export default function MainHomeScreen() {
  return (
    <ScrollView style={{ ...Styles.bgWhite, ...Styles.flex1, ...Styles.p2 }}>
      <Text>Introductory Text?</Text>

      <HomeSummary />

      <Text>Shop CTA</Text>

      <LatestRatings />

      <LatestLocations />
    </ScrollView>
  );
}
