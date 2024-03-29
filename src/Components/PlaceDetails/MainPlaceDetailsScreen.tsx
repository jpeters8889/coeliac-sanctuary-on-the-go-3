import React, { useEffect, useState } from 'react';
import {
  View, ActivityIndicator, Alert, ScrollView, Platform, TouchableOpacity, Text,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import Styles from '../../Styles/Styles';
import { ApiDataResponse, Eatery, UserReview } from '../../types';
import { ApiService } from '../../libs/ApiService';
import { BLUE } from '../../constants';
import CreateReviewModal from '../../modals/CreateReviewModal';
import ReportEateryModal from '../../modals/ReportEateryModal';
import { notEmpty } from '../../helpers';
import AnalyticsService from '../../libs/AnalyticsService';
import TitleBar from './UI/TitleBar';
import EateryInfo from './UI/EateryInfo';
import UserReviews from './UI/UserReviews';
import PlaceDetailsFooter from './UI/PlaceDetailsFooter';
import PlaceAdminReview from './UI/PlaceAdminReview';
import UserImages from './UI/UserImages';
import OpeningTimesModal from '../../modals/OpeningTimesModal';

type Props = {
  route: RouteProp<{
    params: {
      id: number,
      branchId?: number
    }
  }>
  navigation: StackNavigationProp<any>
};

export default function MainPlaceDetailsScreen({ route, navigation }: Props) {
  AnalyticsService.logScreen('place_details_modal_screen', {
    eatery_id: route.params.id,
  }).then(() => {});

  const [isLoading, setIsLoading]: [boolean, any] = useState(true);
  const [eatery, setEatery]: [Eatery, any] = useState({} as Eatery);
  const [showSubmitRatingModal, setShowSubmitRatingModal]: [boolean, any] = useState(false);
  const [showReportProblemModal, setShowReportProblemModal]: [boolean, any] = useState(false);
  const [showOpeningTimesModal, setShowOpeningTimesModal]: [boolean, any] = useState(false);

  const loadEatery = () => {
    ApiService.getPlaceDetails(route.params.id, route.params.branchId)
      .then((response: ApiDataResponse<Eatery>) => {
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

  const goToSuggestEditScreen = () => {
    navigation.navigate('suggest-edit', {
      eateryId: eatery.id,
      eateryName: eatery.name,
    });
  };

  useEffect(() => loadEatery(), []);

  return (
    <View>
      <TitleBar props={{
        isLoading,
        placeName: eatery.branch && eatery.branch.name ? `${eatery.branch.name} - ${eatery.name}` : eatery.name,
        navigation,
      }}
      />

      <View style={Styles.mt10} />

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
        <ScrollView>
          <EateryInfo props={{ eatery, setShowOpeningTimesModal }} />

          <TouchableOpacity
            style={{
              ...Styles.bgBlueFaded,
              ...Styles.borderBlue,
              ...Styles.border,
              ...Styles.p2,
              ...Styles.m2,
              ...Styles.rounded,
            }}
            onPress={() => goToSuggestEditScreen()}
          >
            <Text style={{
              ...Styles.textCenter,
              ...(Platform.OS === 'android' ? Styles.fontBold : Styles.fontSemibold),
              ...Styles.textLg,
            }}
            >
              Can you improve the information we hold for
              {' '}
              {eatery.name}
              ?
            </Text>
          </TouchableOpacity>

          { notEmpty(adminReview()) && <PlaceAdminReview props={{ adminReview: adminReview() as UserReview }} />}

          { notEmpty(eatery.user_images) && <UserImages props={{ name: eatery.name, images: eatery.user_images }} />}

          <UserReviews props={{ eatery, setShowSubmitRatingModal }} />

          <PlaceDetailsFooter props={{ eatery, setShowReportProblemModal }} />
        </ScrollView>

        {eatery.opening_times !== null && showOpeningTimesModal && (
        <OpeningTimesModal props={{
          id: eatery.id,
          name: eatery.name,
          onClose: () => setShowOpeningTimesModal(false),
          openingTimes: eatery.opening_times,
        }}
        />
        )}

        {showSubmitRatingModal && (
        <CreateReviewModal props={{
          id: eatery.id,
          title: eatery.name,
          branch: eatery.branch && eatery.branch.name ? eatery.branch.name : (eatery.branch ? eatery.branch.town.town : undefined),
          isNationwide: eatery.county.county === 'Nationwide' && !eatery.branch,
          navigation,
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
