import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Styles from '../../Styles/Styles';
import { YELLOW } from '../../constants';
import { LatestEateries } from '../../types';
import { ApiService } from '../../libs/ApiService';

export default function LatestLocations() {
  const [loading, setLoading]: [boolean, any] = useState(true);
  const [locations, setLocations]: [LatestEateries[], any] = useState([]);

  const loadEateries = () => {
    ApiService.latestLocations().then((response) => {
      setLocations(response.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    loadEateries();
  }, []);

  return (
    <View style={{
      ...Styles.border,
      ...Styles.borderBlue,
      ...Styles.roundedSm,
      ...Styles.my4,
    }}
    >
      <Text style={{
        ...Styles.p1,
        ...Styles.textLg,
        ...Styles.fontSemibold,
        ...Styles.bgBlueLightFaded,
        ...Styles.roundedTopSm,
        ...Styles.borderBottom,
        ...Styles.borderBlue,
      }}
      >
        Latest Additions
      </Text>

      <Text style={Styles.p1}>
        Here are the latest locations that have been added to our app and website.
      </Text>

      {loading && <ActivityIndicator size="large" style={Styles.mb4} />}

      {!loading && (
      <View>
        {locations.map((location) => (
          <View
            key={location.id.toString()}
            style={{
              ...Styles.wFull,
              ...Styles.justifyBetween,
              ...Styles.p1,
              ...Styles.borderTop,
              ...Styles.borderBlue,
            }}
          >
            <Text style={Styles.fontSemibold}>{location.name}</Text>

            <Text style={Styles.mb2}>{location.location}</Text>

            <Text style={Styles.textSm}>{location.created_at}</Text>
          </View>
        ))}
      </View>
      )}
    </View>
  );
}
