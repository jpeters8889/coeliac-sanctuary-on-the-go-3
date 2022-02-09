import React, { useState } from 'react';
import {
  Alert, Keyboard, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Styles from '../Styles/Styles';
import { ModalProps } from '../types';
import ModalContainer from '../Components/UI/ModalContainer';
import { BLACK, BLUE, YELLOW } from '../constants';
import { ApiService } from '../libs/ApiService';
import AnalyticsService from '../libs/AnalyticsService';

type Props = {
  props: ModalProps & {
    id: number,
    title: string,
  }
};

export default function SubmitRatingModal({ props }: Props) {
  AnalyticsService.logScreen('submit-rating-modal', {
    eatery_id: props.id,
  }).then(() => {});

  const [starRating, setStarRating]: [0 | 1 | 2 | 3 | 4 | 5, any] = useState(0);
  const [name, setName]: [string, any] = useState('');
  const [email, setEmail]: [string, any] = useState('');
  const [review, setReview]: [string, any] = useState('');

  const closeModal = () => {
    props.onClose();
  };

  const stars: number[] = [1, 2, 3, 4, 5];

  const submitReview = () => {
    AnalyticsService.logEvent({ type: 'submit_rating_attempt' }).then(() => {});

    const emptyFields = [name, email, review].filter((field) => field === '');

    if (starRating === 0) {
      AnalyticsService.logEvent({ type: 'submit_rating_validation_error' }).then(() => {});

      Alert.alert('Please select your rating first!');
      return;
    }

    if (emptyFields.length > 0 && emptyFields.length < 3) {
      AnalyticsService.logEvent({ type: 'submit_rating_validation_error' }).then(() => {});

      Alert.alert('Please complete all fields to submit a review with your rating');
      return;
    }

    ApiService.submitRating({
      eateryId: props.id,
      rating: starRating,
      name,
      email,
      comment: review,
    }).then(() => {
      Alert.alert('Thank you for your rating, if you also submitted a review it will be verified by an admin before being approved');
    }).catch(() => {
      Alert.alert('There was an error submitting your rating');
    }).finally(() => {
      closeModal();
    });
  };

  return (
    <ModalContainer props={{
      onClose: closeModal,
      title: 'Submit Rating',
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
            Do you also want to leave an optional short review with your rating? Please enter some details below!
          </Text>

          <View style={Styles.mt4}>
            <TextInput
              placeholder="Your Name..."
              placeholderTextColor={BLUE}
              value={name}
              style={{
                ...Styles.p2,
                ...Styles.border,
                ...Styles.borderBlue,
                ...Styles.bgBlueLightFaded,
                ...Styles.roundedSm,
              }}
              onChangeText={setName}
            />
          </View>

          <View style={Styles.mt4}>
            <TextInput
              placeholder="Your Email..."
              placeholderTextColor={BLUE}
              value={email}
              autoCompleteType="email"
              keyboardType="email-address"
              style={{
                ...Styles.p2,
                ...Styles.border,
                ...Styles.borderBlue,
                ...Styles.bgBlueLightFaded,
                ...Styles.roundedSm,
              }}
              onChangeText={setEmail}
            />
          </View>

          <View style={{ ...Styles.mt4, flexGrow: 0 }}>
            <TextInput
              multiline
              placeholder="Your Review..."
              placeholderTextColor={BLUE}
              value={review}
              style={{
                ...Styles.p2,
                ...Styles.border,
                ...Styles.borderBlue,
                ...Styles.bgBlueLightFaded,
                ...Styles.roundedSm,
                textAlignVertical: 'top',
                height: 100,
              }}
              onChangeText={setReview}
            />
          </View>

          <Text style={{ ...Styles.mt4, ...Styles.textSm, ...Styles.italic }}>
            Please note, your email address is only required for validation purposes and will never be
            shown to anyone on the app or website.
          </Text>

          <View style={{ ...Styles.flexRow, ...Styles.justifyBetween, ...Styles.mt4 }}>
            <TouchableOpacity onPress={() => closeModal()}>
              <View style={{
                ...Styles.p2,
                ...Styles.px4,
                ...Styles.bgBlue,
                ...Styles.rounded,
              }}
              >
                <Text>Cancel</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => submitReview()}>
              <View style={{
                ...Styles.p2,
                ...Styles.px4,
                ...Styles.bgYellow,
                ...Styles.roundedSm,
              }}
              >
                <Text>Submit</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ModalContainer>
  );
}
