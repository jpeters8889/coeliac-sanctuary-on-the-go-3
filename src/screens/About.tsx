import React, { useEffect, useState } from 'react';
import {
  Text, ScrollView, View, Switch, Platform,
} from 'react-native';
import Styles from '../Styles/Styles';
import { BLUE, BLUE_LIGHT_FADED } from '../constants';
import AnalyticsService from '../libs/AnalyticsService';

export default function About() {
  AnalyticsService.logScreen('about-screen').then(() => {});

  const [allowAnalytics, setAllowAnalytics]: [boolean, any] = useState(true);

  const setAnalytics = (value: boolean) => {
    AnalyticsService.logEvent({
      type: 'consent_toggle',
      metaData: {
        consent: value,
      },
    }).then(() => {});

    AnalyticsService.toggleAnalytics(value).then(() => {
      setAllowAnalytics(value);
    });
  };

  useEffect(() => {
    AnalyticsService.hasConsented().then((hasConsented) => {
      setAllowAnalytics(hasConsented);
    });
  }, []);

  return (
    <ScrollView style={{
      ...Styles.bgWhite,
      ...Styles.p2,
      ...Styles.flex1,
    }}
    >
      <Text style={Styles.my2}>
        Coeliac Sanctuary - On the Go can be used to find gluten free places to eat around the UK and
        Ireland, it connects to the eating out guide on the Coeliac Sanctuary website to display
        places around you using your GPS location.
      </Text>
      <Text style={Styles.my2}>
        All of the places on our Eating Out guide and this app are user contributed, but we do verify
        them before we add them to our database by checking the eateries website, menus and reviews
        to make sure they do offer gluten free options, but if yu do find a place we have listed that
        doesn't exist anymore or doesn't do gluten free, then you can report it to us through the app.
      </Text>
      <Text style={Styles.my2}>
        If you know of somewhere that offers gluten free which we haven't got on your website or app,
        then you can use use our app or website to recommend a place to us.
      </Text>

      <Text style={{
        ...Styles.textLg,
        ...(Platform.OS === 'ios' ? Styles.fontSemibold : Styles.fontBold),
      }}
      >
        Reviewed Places
      </Text>

      <Text style={Styles.my2}>
        You may see some eateries on the app that have been reviewed by the Coeliac Sanctuary team, this
        means that we have visited the establishment ourselves and written about our experiences. Due
        to where we are based in the UK reviewed places are limited and there may be none near your
        location.
      </Text>

      <Text style={{
        ...Styles.textLg,
        ...(Platform.OS === 'ios' ? Styles.fontSemibold : Styles.fontBold),
      }}
      >
        User Ratings
      </Text>

      <Text style={Styles.my2}>
        Through our app and website we give users the ability to give places an anonymous rating of
        between 1 and 5 stars, and we also have the option where users can leave a short text review of
        an establishment.
      </Text>

      <Text style={{
        ...Styles.textLg,
        ...(Platform.OS === 'ios' ? Styles.fontSemibold : Styles.fontBold),
      }}
      >
        Nationwide Eateries
      </Text>

      <Text style={Styles.my2}>
        Due to the number of Nationwide chains that offer gluten free, it is impossible for us to mark
        them all on our map or place list, our eating out database focuses on independent eateries. We
        do however have a generic lst of nationwide eateries on our website and app, but we do not list
        any specific location or branches.
      </Text>
      <Text style={Styles.my2}>
        We define a chain as a nationwide chain when there are 25 or more branches across the UK, there
        are however certain exceptions when the majority of a chains branches are focussed on one part
        of the country, for example the majority of Leon's branches can be found in and around London,
        so therefore we don't class them as a nationwide eatery.
      </Text>

      <Text style={{
        ...Styles.textLg,
        ...(Platform.OS === 'ios' ? Styles.fontSemibold : Styles.fontBold),
      }}
      >
        Privacy Policy
      </Text>

      <Text style={Styles.my2}>
        While we require your GPS location to show eateries around you, we do not log it nor use it in
        any other way except to find gluten free places around you.
      </Text>
      <Text style={Styles.my2}>
        All requests sent to the Coeliac Sanctuary server are sent over HTTPS and protected by an SSL
        Certificate
      </Text>
      <Text style={Styles.my2}>
        We use anonymous analytical data to show us how users use this app, if you'd prefer to not
        share anonymous usage reports you can opt out below.
      </Text>

      <View style={{
        ...Styles.bgBlueLightFaded,
        ...Styles.p2,
        ...Styles.mb4,
        ...Styles.flexRow,
        ...Styles.justifyBetween,
        ...Styles.itemsCenter,
      }}
      >
        <Text>I consent to anonymous usage reports.</Text>

        <Switch
          style={Platform.OS === 'ios' ? Styles.scale80 : Styles.scale120}
          trackColor={{ false: BLUE_LIGHT_FADED, true: BLUE_LIGHT_FADED }}
          thumbColor={BLUE}
          onValueChange={() => setAnalytics(!allowAnalytics)}
          value={allowAnalytics}
        />
      </View>

      <Text style={{
        ...Styles.textSm,
        ...Styles.mb4,
      }}
      >
        App Version 3.0.0 alpha 2, published 30th January 2022
      </Text>

    </ScrollView>
  );
}
