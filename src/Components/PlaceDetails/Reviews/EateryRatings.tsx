import { Text, View } from 'react-native';
import React from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { UserReview } from '../../../types';
import { BLACK } from '../../../constants';
import Styles from '../../../Styles/Styles';
import { ucFirst } from '../../../helpers';

dayjs.extend(advancedFormat);

export default function EateryRatings({ item }: { item: UserReview }) {
  const price = [];

  for (let x = 0; x < parseInt(item.price?.value, 10); x++) {
    price.push(x.toString());
  }

  return (
    <View style={{
      ...Styles.flexRow,
      ...Styles.itemsCenter,
      ...Styles.justifyBetween,
      ...Styles.bgBlueLight,
      ...Styles.p2,
      ...Styles.textSm,
    }}
    >
      {item.price && (
      <View style={{ ...Styles.flexRow, ...Styles.itemsCenter, ...Styles.textYellow }}>
        <Text>Price: </Text>
        <View style={{ ...Styles.flexRow }}>
          {price.map((index) => <FontAwesome5 name="pound-sign" size={12} color={BLACK} key={index} style={Styles.mr1} />)}
        </View>
      </View>
      )}

      {item.food_rating && (
      <View style={{ ...Styles.flexRow, ...Styles.itemsCenter, ...Styles.textYellow }}>
        <Text>Food: </Text>
        <Text>{ ucFirst(item.food_rating) }</Text>
      </View>
      )}

      {item.service_rating && (
      <View style={{ ...Styles.flexRow, ...Styles.itemsCenter, ...Styles.textYellow }}>
        <Text>Service: </Text>
        <Text>{ ucFirst(item.service_rating) }</Text>
      </View>
      )}
    </View>
  );
}
