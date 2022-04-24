import {
  Alert, KeyboardAvoidingView, ScrollView, Text, TextInput, TouchableOpacity, View,
} from 'react-native';
import React, { useState } from 'react';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import SelectDropdown from 'react-native-select-dropdown';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { FoodServiceRating, StarReview } from '../../types';
import AnalyticsService from '../../libs/AnalyticsService';
import { ApiService } from '../../libs/ApiService';
import Styles from '../../Styles/Styles';
import { ucFirst } from '../../helpers';
import TitleBar from './UI/TitleBar';
import { BLACK, YELLOW } from '../../constants';
import ItemSeparator from '../UI/ItemSeparator';

dayjs.extend(advancedFormat);

type Props = {
  route: RouteProp<{
    params: {
      eateryId: number,
      eateryName: string,
      starRating: StarReview,
    }
  }>
  navigation: StackNavigationProp<any>
};

type ExpenseOption = { value:StarReview, label: string };

export default function SubmitReviewScreen(props: Props) {
  const [starRating, setStarRating]: [StarReview, any] = useState(props.route.params.starRating);
  const [name, setName]: [string, any] = useState('');
  const [email, setEmail]: [string, any] = useState('');
  const [foodRating, setFoodRating]: [FoodServiceRating | undefined, any] = useState();
  const [serviceRating, setServiceRating]: [FoodServiceRating | undefined, any] = useState();
  const [howExpensive, setHowExpensive]: [StarReview, any] = useState(0);
  const [review, setReview]: [string, any] = useState('');

  const selectOptions: FoodServiceRating[] = ['poor', 'good', 'excellent'];
  const expenseOptions: ExpenseOption[] = [
    { value: 1, label: 'Cheap and Quick' },
    { value: 2, label: 'Great Value' },
    { value: 3, label: 'Average' },
    { value: 4, label: 'A Special Treat' },
    { value: 5, label: 'Expensive' },
  ];

  const submitReview = () => {
    AnalyticsService.logEvent({ type: 'submit_review_attempt' }).then(() => {});

    const emptyFields = [name, email, review].filter((field) => field === '');

    if (props.route.params.starRating === 0) {
      AnalyticsService.logEvent({ type: 'submit_review_validation_error' }).then(() => {});

      Alert.alert('Please select your rating first!');
      return;
    }

    if (emptyFields.length > 0 && emptyFields.length < 3) {
      AnalyticsService.logEvent({ type: 'submit_rating_validation_error' }).then(() => {});

      Alert.alert('Please complete all fields to submit a review with your rating');
      return;
    }

    ApiService.submitFullReview({
      eateryId: props.route.params.eateryId,
      rating: props.route.params.starRating,
      name,
      email,
      foodRating: foodRating as FoodServiceRating,
      serviceRating: serviceRating as FoodServiceRating,
      expense: howExpensive,
      comment: review,
    }).then(() => {
      Alert.alert('Thank you for your review, it will be verified by an admin before being approved');
    }).catch(() => {
      Alert.alert('There was an error submitting your review');
    }).finally(() => {
      props.navigation.goBack();
    });
  };

  const stars: number[] = [1, 2, 3, 4, 5];

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={0}>

        <TitleBar props={{
          isLoading: false,
          navigation: props.navigation,
          placeName: 'Leave a review',
        }}
        />

        <View style={{ ...Styles.p2, ...Styles.mt10 }}>
          <Text style={{ ...Styles.mb2, ...Styles.textMd }}>
            Thank you for offering to leave a review for your visit to
            {' '}
            <Text style={Styles.fontSemibold}>{props.route.params.eateryName}</Text>
            , your review and others like it will help others eat out safely!
          </Text>

          <ItemSeparator />

          <Text style={{
            ...Styles.textBlueDark, ...Styles.fontSemibold, ...Styles.mb1, ...Styles.mt4,
          }}
          >
            Your Rating
          </Text>
          <View style={{ ...Styles.flexRow, ...Styles.justifyAround, maxWidth: 220 }}>
            {stars.map((star) => (
              <TouchableOpacity key={star.toString()} onPress={() => setStarRating(star)}>
                {starRating < star && (<FontAwesome name="star-o" size={40} color={BLACK} />)}
                {starRating >= star && (<FontAwesome name="star" size={40} color={YELLOW} />)}
              </TouchableOpacity>
            ))}
          </View>

          <View style={Styles.mt4}>
            <Text style={{ ...Styles.textBlueDark, ...Styles.fontSemibold, ...Styles.mb1 }}>Your Name</Text>
            <TextInput
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
            <Text style={{ ...Styles.textBlueDark, ...Styles.fontSemibold, ...Styles.mb1 }}>Your Email</Text>
            <TextInput
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

          <View style={Styles.mt4}>
            <Text style={{ ...Styles.textBlueDark, ...Styles.fontSemibold, ...Styles.mb1 }}>
              How would you rate your food?
            </Text>

            <SelectDropdown
              data={selectOptions}
              buttonStyle={{
                ...Styles.border,
                ...Styles.borderBlue,
                ...Styles.bgBlueLightFaded,
                ...Styles.roundedSm,
                ...Styles.wFull,
                ...Styles.p0,
                height: undefined,
              }}
              buttonTextStyle={{
                ...Styles.py2,
                ...Styles.textMd,
              }}
              onSelect={(value: FoodServiceRating) => setFoodRating(value)}
              buttonTextAfterSelection={(item) => ucFirst(item)}
              rowTextForSelection={(item) => ucFirst(item)}
            />
          </View>

          <View style={Styles.mt4}>
            <Text style={{ ...Styles.textBlueDark, ...Styles.fontSemibold, ...Styles.mb1 }}>
              How would you rate the service?
            </Text>

            <SelectDropdown
              data={selectOptions}
              buttonStyle={{
                ...Styles.border,
                ...Styles.borderBlue,
                ...Styles.bgBlueLightFaded,
                ...Styles.roundedSm,
                ...Styles.wFull,
                ...Styles.p0,
                height: undefined,
              }}
              buttonTextStyle={{
                ...Styles.py2,
                ...Styles.textMd,
              }}
              onSelect={(value: FoodServiceRating) => setServiceRating(value)}
              buttonTextAfterSelection={(item) => ucFirst(item)}
              rowTextForSelection={(item) => ucFirst(item)}
            />
          </View>

          <View style={Styles.mt4}>
            <Text style={{ ...Styles.textBlueDark, ...Styles.fontSemibold, ...Styles.mb1 }}>
              How expensive is it to eat here?
            </Text>

            <SelectDropdown
              data={expenseOptions}
              buttonStyle={{
                ...Styles.border,
                ...Styles.borderBlue,
                ...Styles.bgBlueLightFaded,
                ...Styles.roundedSm,
                ...Styles.wFull,
                ...Styles.p0,
                height: undefined,
              }}
              buttonTextStyle={{
                ...Styles.py2,
                ...Styles.textMd,
              }}
              onSelect={(option: ExpenseOption) => setHowExpensive(option.value)}
              buttonTextAfterSelection={(option: ExpenseOption) => option.label}
              rowTextForSelection={(option: ExpenseOption) => option.label}
            />
          </View>

          <View style={{ ...Styles.mt4, flexGrow: 0 }}>
            <Text style={{ ...Styles.textBlueDark, ...Styles.fontSemibold, ...Styles.mb1 }}>Your Review</Text>

            <TextInput
              multiline
              value={review}
              style={{
                ...Styles.p2,
                ...Styles.border,
                ...Styles.borderBlue,
                ...Styles.bgBlueLightFaded,
                ...Styles.roundedSm,
                textAlignVertical: 'top',
                height: 120,
              }}
              onChangeText={setReview}
            />
          </View>

          <Text style={{ ...Styles.mt4, ...Styles.textSm, ...Styles.italic }}>
            Please note, your email address is only required for validation purposes and will never be
            shown to anyone on the app or website.
          </Text>

          <View style={{ ...Styles.flexRow, ...Styles.justifyBetween, ...Styles.mt4 }}>
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
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
      </KeyboardAvoidingView>

    </ScrollView>
  );
}
