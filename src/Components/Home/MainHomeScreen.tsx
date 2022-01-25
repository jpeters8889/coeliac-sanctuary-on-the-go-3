import React from 'react';
import { Text, ScrollView } from 'react-native';
import Styles from '../../Styles/Styles';
import HomeSummary from './HomeSummary';
import LatestRatings from './LatestRatings';
import LatestLocations from './LatestLocations';
import ShopCtaComponent from '../UI/ShopCtaComponent';
import AnalyticsService from '../../libs/AnalyticsService';

export default function MainHomeScreen() {
  AnalyticsService.logScreen('home-screen').then(() => {});

  return (
    <ScrollView style={{ ...Styles.bgWhite, ...Styles.flex1, ...Styles.p2 }}>
      <Text style={{ ...Styles.mb2, ...Styles.textLg, ...Styles.leadingHigh }}>
        Thanks for using our Coeliac Sanctuary - On the Go app, our app connects to the Eating Out
        guide on the Coeliac Sanctuary website to display the locations of Gluten Free places to
        eat near you. You can also search for locations around the UK and Ireland to plan your
        next trip to the seaside!
      </Text>
      <Text style={{ ...Styles.mb2, ...Styles.textLg, ...Styles.leadingHigh }}>
        All of the places on Coeliac Sanctuary are recommended to us by other people and are checked
        before they are added to our app and website, but if you have a bad experience at a location
        on our app, or if it no longer exists you can easily report it to us through the app.
      </Text>

      <HomeSummary />

      <ShopCtaComponent />

      <LatestRatings />

      <LatestLocations />
    </ScrollView>
  );
}
