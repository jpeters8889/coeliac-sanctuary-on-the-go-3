import { Image, Text, View } from 'react-native';
import React from 'react';
import dayjs from 'dayjs';
import { UserReview } from '../../../types';
import Styles from '../../../Styles/Styles';
import { notEmpty } from '../../../helpers';
import ReviewTitle from './ReviewTitle';
import EateryRatings from './EateryRatings';
import ScaledImage from '../../UI/ScaledImage';
import EateryImages from '../EateryImages';

export default function EateryReview({ item }: { item: UserReview }) {
  const stars = [];
  const price = [];

  const hasRatings = (): boolean => {
    if (item.price) {
      return true;
    }

    if (item.food_rating) {
      return true;
    }

    if (item.service_rating) {
      return true;
    }

    return false;
  };

  for (let x = 0; x < parseInt(item.rating, 10); x++) {
    stars.push(x.toString());
  }

  for (let x = 0; x < parseInt(item.price?.value, 10); x++) {
    price.push(x.toString());
  }

  return (
    <View style={{ ...Styles.border, ...Styles.borderBlue, ...Styles.rounded }}>
      <ReviewTitle item={item} />

      {hasRatings() && <EateryRatings item={item} />}

      <View style={{ ...Styles.p2, ...Styles.bgBlueLightFaded, ...Styles.borderBlue }}>
        <Text>{notEmpty(item.body) ? item.body : 'Reviewer left no text with their rating'}</Text>

        {notEmpty(item.images) && <EateryImages props={{ images: item.images }} />}

        <View style={{
          ...Styles.mt2,
          ...Styles.flexRow,
          ...Styles.justifyBetween,
          ...Styles.itemsEnd,
        }}
        >
          {notEmpty(item.name) && <Text style={{ ...Styles.italic }}>{item.name}</Text>}
          <Text style={{ ...Styles.flex1, ...Styles.textRight }}>{dayjs(item.created_at).format('MMM Do YYYY')}</Text>
        </View>
      </View>
    </View>
  );
}
