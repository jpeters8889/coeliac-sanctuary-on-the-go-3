import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Styles from '../../Styles/Styles';
import { YELLOW } from '../../constants';
import { LatestEateryRatings } from '../../types';
import { ApiService } from '../../libs/ApiService';

export default function LatestRatings() {
  const [loading, setLoading]: [boolean, any] = useState(true);
  const [ratings, setRatings]: [LatestEateryRatings[], any] = useState([]);

  const loadRatings = () => {
    ApiService.latestRatings().then((response) => {
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
        ...Styles.fontSemibold,
        ...Styles.bgBlueLightFaded,
        ...Styles.roundedTopSm,
        ...Styles.borderBottom,
        ...Styles.borderBlue,
      }}
      >
        Latest Eatery Ratings
      </Text>

      <Text style={Styles.p1}>
        Here are the latest eateries that have been rated on our app and website.
      </Text>

      {loading && <ActivityIndicator size="large" style={Styles.mb4} />}

      {!loading && (
      <View>
        {ratings.map((rating) => (
          <View
            key={rating.id.toString()}
            style={{
              ...Styles.wFull,
              ...Styles.justifyBetween,
              ...Styles.p1,
              ...Styles.borderTop,
              ...Styles.borderBlue,
            }}
          >
            <Text style={Styles.fontSemibold}>{rating.location}</Text>

            <View style={{ ...Styles.flexRow, ...Styles.my2 }}>
              {starArray(rating.rating).map((index) => (
                <FontAwesome key={index.toString()} name="star" size={20} color={YELLOW} />
              ))}
            </View>

            <Text style={Styles.textSm}>{rating.created_at}</Text>
          </View>
        ))}
      </View>
      )}
    </View>
  );
}
