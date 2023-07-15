import React, { useEffect, useState } from 'react';
import {
  View, Text, ActivityIndicator, Platform, TouchableOpacity,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { AxiosResponse } from 'axios';
import Styles from '../../Styles/Styles';
import { BLUE_LIGHT, YELLOW } from '../../constants';
import { LatestEateryRatings } from '../../types';
import { ApiService } from '../../libs/ApiService';

export default function LatestRatings({ navigation }: { navigation: StackNavigationProp<any> }) {
  const [loading, setLoading]: [boolean, any] = useState(true);
  const [ratings, setRatings]: [LatestEateryRatings[], any] = useState([]);

  const loadRatings = () => {
    ApiService.latestRatings().then((response: AxiosResponse<LatestEateryRatings[]>) => {
      setRatings(response.data);
      setLoading(false);
    });
  };

  const starArray = (rating: string): Array<any> => {
    const rtr = [];

    for (let x = 0; x < parseInt(rating, 10); x++) {
      rtr.push(x);
    }

    return rtr;
  };

  const openLocation = (id: number) => {
    navigation.navigate('details', { id });
  };

  useEffect(() => {
    loadRatings();
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
        Latest Eatery Ratings
      </Text>

      <Text style={Styles.p1}>
        Here are the latest eateries that have been rated on our app and website.
      </Text>

      {loading && <ActivityIndicator size="large" style={Styles.mb4} color={BLUE_LIGHT} />}

      {!loading && (
        <View>
          {ratings.map((rating, index) => (
            <TouchableOpacity
              key={rating.id.toString()}
              onPress={() => openLocation(rating.eatery_id)}
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
                {rating.location}
              </Text>

              <View style={{ ...Styles.flexRow, ...Styles.my2 }}>
                {starArray(rating.rating).map((star) => (
                  <FontAwesome key={star.toString()} name="star" size={20} color={YELLOW} />
                ))}
              </View>

              <Text style={Styles.textSm}>{rating.created_at}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}
