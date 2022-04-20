import React, { useEffect, useState } from 'react';
import {
  View, ActivityIndicator, Alert, ScrollView, Platform,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import Styles from '../Styles/Styles';
import { Eatery, UserReview } from '../types';
import { ApiService } from '../libs/ApiService';
import { BLUE } from '../constants';
import SubmitRatingModal from './SubmitRatingModal';
import ReportEateryModal from './ReportEateryModal';
import { notEmpty } from '../helpers';
import AnalyticsService from '../libs/AnalyticsService';
import TitleBar from '../Components/PlaceDetails/TitleBar';
import EateryInfo from '../Components/PlaceDetails/EateryInfo';
import UserReviews from '../Components/PlaceDetails/UserReviews';
import PlaceDetailsFooter from '../Components/PlaceDetails/PlaceDetailsFooter';
import PlaceAdminReview from '../Components/PlaceDetails/PlaceAdminReview';
import UserImages from '../Components/PlaceDetails/UserImages';

type Props = {
  route: RouteProp<{
    params: {
      id: number
    }
  }>
  navigation: StackNavigationProp<any>
};

export default function PlaceDetailsModal({ route, navigation }: Props) {
  AnalyticsService.logScreen('place_details_modal_screen', {
    eatery_id: route.params.id,
  }).then(() => {});

  const [isLoading, setIsLoading]: [boolean, any] = useState(true);
  const [eatery, setEatery]: [Eatery, any] = useState({} as Eatery);
  const [showSubmitRatingModal, setShowSubmitRatingModal]: [boolean, any] = useState(false);
  const [showReportProblemModal, setShowReportProblemModal]: [boolean, any] = useState(false);

  const loadEatery = () => {
    ApiService.getPlaceDetails(route.params.id)
      .then((response: { data: Eatery }) => {
        setEatery(response.data);
        setIsLoading(false);
      })
      .catch(() => {
        Alert.alert('There was an error loading the details for this location');
        navigation.goBack();
      });
  };

  const adminReview = (): UserReview | false => {
    const ourReview = eatery.user_reviews.filter((review) => review.admin_review);

    return ourReview.length ? ourReview[0] : false;
  };

  const closeSubmitRatingModal = () => {
    loadEatery();
    setShowSubmitRatingModal(false);
  };

  useEffect(() => loadEatery(), []);

  return (
    <View>
      <TitleBar props={{ isLoading, placeName: eatery.name, navigation }} />

      {isLoading && (
      <View style={{
        ...(Platform.OS === 'ios' ? Styles.mt10 : Styles.mt20),
        ...Styles.py8,
      }}
      >
        <ActivityIndicator size="large" color={BLUE} />
      </View>
      )}

      {!isLoading && (
      <>
        <ScrollView style={Platform.OS === 'ios' ? Styles.mt10 : Styles.mt20}>
          <EateryInfo props={{ eatery }} />

          { notEmpty(adminReview()) && <PlaceAdminReview props={{ adminReview: adminReview() as UserReview }} />}

          { notEmpty(eatery.user_images) && <UserImages props={{ name: eatery.name, images: eatery.user_images }} />}

          <UserReviews props={{ eatery, setShowSubmitRatingModal }} />

          <PlaceDetailsFooter props={{ eatery, setShowReportProblemModal }} />
        </ScrollView>

        {showSubmitRatingModal && (
        <SubmitRatingModal props={{
          id: eatery.id,
          title: eatery.name,
          onClose: () => closeSubmitRatingModal(),
        }}
        />
        )}

        {showReportProblemModal && (
        <ReportEateryModal props={{
          id: eatery.id,
          title: eatery.name,
          onClose: () => setShowReportProblemModal(false),
        }}
        />
        )}
      </>
      )}
    </View>
  );
}
