import { Platform, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { UserReview } from '../../../types';
import Styles from '../../../Styles/Styles';
import { notEmpty } from '../../../helpers';
import ReviewTitle from './ReviewTitle';
import EateryRatings from './EateryRatings';
import EateryImages from '../UI/EateryImages';

export default function EateryReview({ item }: { item: UserReview }) {
  const [displayFullReview, setDisplayFullReview]: [boolean, any] = useState(false);
  const [hasMoreText, setHasMoreText]: [boolean, any] = useState(false);

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

  for (let x = 0; x < item.rating; x++) {
    stars.push(x.toString());
  }

  for (let x = 0; x < parseInt(item.price?.value, 10); x++) {
    price.push(x.toString());
  }

  useEffect(() => {
    if (item.admin_review && item.body.length > 500 && !displayFullReview) {
      setHasMoreText(true);
    }
  });

  const reviewText = (): string => {
    if (item.admin_review) {
      if (item.body.length > 500 && !displayFullReview) {
        return `${item.body.substring(0, item.body.indexOf(' ', 500))}...`;
      }
    }

    if (!item.body) {
      return 'Reviewer left no text with their rating';
    }

    return item.body;
  };

  return (
    <View style={{ ...Styles.border, ...Styles.borderBlue, ...Styles.rounded }}>
      <ReviewTitle item={item} />

      {hasRatings() && <EateryRatings item={item} />}

      <View style={{ ...Styles.p2, ...Styles.bgBlueLightFaded, ...Styles.borderBlue }}>
        <Text>{reviewText()}</Text>

        {notEmpty(item.branch_name) && (
        <Text style={Styles.mt2}>
          Review from
          {' '}
          <Text style={Styles.fontSemibold}>{item.branch_name}</Text>
          {' '}
          branch.
        </Text>
        )}

        {hasMoreText && !displayFullReview && (
        <Text
          onPress={() => setDisplayFullReview(true)}
          style={{
            ...Styles.textLg,
            ...Styles.mt2,
            ...(Platform.OS === 'ios' ? Styles.fontSemibold : Styles.fontBold),
          }}
        >
          View full review
        </Text>
        )}

        {notEmpty(item.images) && <EateryImages props={{ images: item.images }} />}

        {!item.admin_review && (
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
        )}
      </View>
    </View>
  );
}
