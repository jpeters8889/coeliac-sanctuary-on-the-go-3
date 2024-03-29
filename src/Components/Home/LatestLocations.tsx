import React, { useEffect, useState } from 'react';
import {
  View, Text, ActivityIndicator, Platform, TouchableOpacity,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AxiosResponse } from 'axios';
import Styles from '../../Styles/Styles';
import { BLUE_LIGHT } from '../../constants';
import { LatestEateries } from '../../types';
import { ApiService } from '../../libs/ApiService';

export default function LatestLocations({ navigation }: { navigation: StackNavigationProp<any> }) {
  const [loading, setLoading]: [boolean, any] = useState(true);
  const [locations, setLocations]: [LatestEateries[], any] = useState([]);

  const loadEateries = () => {
    ApiService.latestLocations().then((response: AxiosResponse<LatestEateries[]>) => {
      setLocations(response.data);
      setLoading(false);
    });
  };

  const openLocation = (id: number) => {
    navigation.navigate('details', { id });
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
        ...Styles.bgBlueLightFaded,
        ...Styles.roundedTopSm,
        ...Styles.borderBottom,
        ...Styles.borderBlue,
        ...(Platform.OS === 'ios' ? Styles.fontSemibold : Styles.fontBold),
      }}
      >
        Latest Additions
      </Text>

      <Text style={Styles.p1}>
        Here are the latest locations that have been added to our app and website.
      </Text>

      {loading && <ActivityIndicator size="large" style={Styles.mb4} color={BLUE_LIGHT} />}

      {!loading && (
      <View>
        {locations.map((location, index) => (
          <TouchableOpacity
            key={location.id.toString()}
            onPress={() => openLocation(location.id)}
            style={{
              ...Styles.wFull,
              ...Styles.justifyBetween,
              ...Styles.p1,
              ...Styles.borderTop,
              ...Styles.borderBlue,
              ...(index % 2 === 0 ? Styles.bgBlueLightFaded : ''),
            }}
          >
            <Text style={Platform.OS === 'ios' ? Styles.fontSemibold : Styles.fontBold}>
              {location.name}
            </Text>

            <Text style={Styles.mb2}>{location.location}</Text>

            <Text style={Styles.textSm}>{location.created_at}</Text>
          </TouchableOpacity>
        ))}
      </View>
      )}
    </View>
  );
}
