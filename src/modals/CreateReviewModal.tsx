import React, { useState } from 'react';
import {
  Alert, Keyboard, Text, TouchableOpacity, TouchableWithoutFeedback, View,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import Styles from '../Styles/Styles';
import { ModalProps, StarReview } from '../types';
import ModalContainer from '../Components/UI/ModalContainer';
import { BLACK, YELLOW } from '../constants';
import { ApiService } from '../libs/ApiService';
import AnalyticsService from '../libs/AnalyticsService';

type Props = {
  props: ModalProps & {
    id: number,
    title: string,
    navigation: StackNavigationProp<any>,
  }
};

export default function CreateReviewModal({ props }: Props) {
  AnalyticsService.logScreen('submit-rating-modal', {
    eatery_id: props.id,
  }).then(() => {});

  const [starRating, setStarRating]: [StarReview, any] = useState(0);

  const closeModal = () => {
    props.onClose();
  };

  const stars: number[] = [1, 2, 3, 4, 5];

  const submitRating = () => {
    AnalyticsService.logEvent({ type: 'submit_rating_attempt' }).then(() => {});

    if (starRating === 0) {
      AnalyticsService.logEvent({ type: 'submit_rating_validation_error' }).then(() => {});

      Alert.alert('Please select your rating first!');
      return;
    }

    ApiService.submitRating({
      eateryId: props.id,
      rating: starRating,
    }).then(() => {
      Alert.alert(`Thank you for submit your rating of ${props.title}`);
    }).catch(() => {
      Alert.alert('There was an error submitting your review');
    }).finally(() => {
      closeModal();
    });
  };

  const goToSubmitReviewScreen = () => {
    if (starRating === 0) {
      return;
    }

    props.navigation.navigate('add-review', {
      eateryId: props.id,
      eateryName: props.title,
      starRating,
    });

    closeModal();
  };

  return (
    <ModalContainer props={{
      onClose: closeModal,
      title: 'Leave a review',
    }}
    >

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={Styles.p2}>
          <Text style={Styles.textCenter}>
            How would you rate
            {' '}
            {props.title}
            ?
          </Text>

          <View style={{ ...Styles.flexRow, ...Styles.justifyAround, ...Styles.mt2 }}>
            {stars.map((star) => (
              <TouchableOpacity key={star.toString()} onPress={() => setStarRating(star)}>
                {starRating < star && (<FontAwesome name="star-o" size={40} color={BLACK} />)}
                {starRating >= star && (<FontAwesome name="star" size={40} color={YELLOW} />)}
              </TouchableOpacity>
            ))}
          </View>

          <Text style={Styles.mt2}>
            Do you also want to leave an optional short review with your rating?
          </Text>

          <View style={{ ...Styles.justifyBetween, ...Styles.mt4 }}>
            <TouchableOpacity
              onPress={() => (starRating > 0 ? submitRating() : null)}
              style={{
                ...Styles.p2,
                ...Styles.px4,
                ...(starRating > 0 ? Styles.bgBlue : Styles.bgBlueFaded),
                ...Styles.rounded,
                ...Styles.mb2,
              }}
            >
              <Text style={Styles.textCenter}>No, just submit my rating</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => (starRating > 0 ? goToSubmitReviewScreen() : null)}
              style={{
                ...Styles.p2,
                ...Styles.px4,
                ...(starRating > 0 ? Styles.bgYellow : Styles.bgYellowFaded),
                ...Styles.roundedSm,
              }}
            >
              <Text style={{ ...Styles.textCenter, ...Styles.fontSemibold, ...Styles.textLg }}>
                Yes, I'd like to write a review
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ModalContainer>
  );
}
