import React from 'react';
import {
  View, Platform, Text, TouchableOpacity,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Styles from '../../../Styles/Styles';
import { Eatery, UserReview } from '../../../types';
import { BLACK } from '../../../constants';
import EateryReview from '../Reviews/EateryReview';
import ItemSeparatorBlank from '../../UI/ItemSeparatorBlank';

type Props = {
  props: {
    eatery: Eatery
    setShowSubmitRatingModal: (show: boolean) => any,
  },
};

export default function UserReviews({ props }: Props) {
  const userReviews = (): UserReview[] => props.eatery.user_reviews.filter((review) => !review.admin_review);

  return (
    <View style={{ ...Styles.p2, ...Styles.borderBottom, ...Styles.borderBlueLight }}>
      <Text style={{
        ...Styles.textLg,
        ...(Platform.OS === 'ios' ? Styles.fontSemibold : Styles.fontBold),
      }}
      >
        Visitor Ratings
      </Text>

      <View style={Styles.mt4}>
        {props.eatery.user_reviews.length > 0 && (
          <View style={{ ...Styles.flexRow, ...Styles.itemsCenter, ...Styles.mb4 }}>
            <Text>
              Rated
              {' '}
              {props.eatery.average_rating}
              {' '}
            </Text>
            <FontAwesome name="star" size={16} color={BLACK} />
            <Text>
              {' '}
              from
              {' '}
              {props.eatery.user_reviews.length}
              {' '}
              rating
              {props.eatery.user_reviews.length > 1 ? 's' : ''}
            </Text>
          </View>
        )}

        <View>
          <TouchableOpacity onPress={() => props.setShowSubmitRatingModal(true)}>
            <View style={{
              ...Styles.bgYellow,
              ...Styles.p2,
              ...Styles.px4,
              ...Styles.rounded,
              ...Styles.mb4,
            }}
            >
              <Text style={{
                ...Styles.textLg,
                ...Styles.textCenter,
                ...(Platform.OS === 'ios' ? Styles.fontSemibold : Styles.fontBold),
              }}
              >
                Have you visited
                {' '}
                {props.eatery.name}
                ? Why not leave a rating to let others know your experience!
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        {userReviews().length > 0 && (
          <View>
            {userReviews().map((rating, index) => (
              <View key={rating.id.toString()}>
                <EateryReview item={rating} />
                {index < userReviews().length - 1 && <ItemSeparatorBlank />}
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  );
}
