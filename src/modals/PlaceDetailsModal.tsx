import React, { useEffect, useState } from 'react';
import {
  View, Text, TouchableOpacity, ActivityIndicator, Alert, Linking, ScrollView, Platform,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import dayjs from 'dayjs';
import Styles from '../Styles/Styles';
import { Eatery } from '../types';
import { ApiService } from '../libs/ApiService';
import EateryReview from '../Components/UI/EateryReview';
import ItemSeparatorBlank from '../Components/UI/ItemSeparatorBlank';
import { BASE_URL, BLACK } from '../constants';
import SubmitRatingModal from './SubmitRatingModal';
import ReportEateryModal from './ReportEateryModal';
import { formatAddress, notEmpty } from '../helpers';
import AnalyticsService from '../libs/AnalyticsService';
import LinkService from '../libs/LinkService';

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

  const closeSubmitRatingModal = () => {
    loadEatery();
    setShowSubmitRatingModal(false);
  };

  useEffect(() => loadEatery(), []);

  return (
    <View>
      <View style={{
        ...Styles.bgBlueLight,
        ...Styles.p2,
        ...Styles.flexRow,
        ...Styles.justifyBetween,
        ...Styles.itemsCenter,
        ...Styles.absolute,
        ...Styles.top0,
        ...Styles.wFull,
        ...(Platform.OS === 'android' ? {
          ...Styles.borderTop,
          ...Styles.borderGrey,
          ...Styles.mt10,
        } : ''),
      }}
      >
        {isLoading && <Text style={Styles.textLg}>Loading...</Text>}
        {!isLoading && (
        <Text style={{
          ...(Platform.OS === 'android' ? {
            ...Styles.text2Xl,
            ...Styles.fontBold,
          } : { ...Styles.textLg, ...Styles.fontSemibold }),
        }}
        >
          {eatery.name}
        </Text>
        )}

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {isLoading && (
      <View style={{
        ...(Platform.OS === 'ios' ? Styles.mt10 : Styles.mt20),
        ...Styles.py8,
      }}
      >
        <ActivityIndicator size="large" />
      </View>
      )}

      {!isLoading && (
      <>
        <ScrollView style={Platform.OS === 'ios' ? Styles.mt10 : Styles.mt20}>
          <View style={{ ...Styles.p2, ...Styles.borderBottom, ...Styles.borderBlueLight }}>
            {eatery.type.type !== 'att' && (
            <Text style={Styles.mb4}>
              {eatery.info}
            </Text>
            )}

            {eatery.type.type === 'att' && (
            <View>
              {eatery.restaurants.map((restaurant) => (
                <View key={restaurant.id} style={Styles.mb2}>
                  <Text style={{
                    ...(Platform.OS === 'ios' ? Styles.fontSemibold : Styles.fontBold),
                    ...Styles.textLg,
                  }}
                  >
                    {restaurant.restaurant_name}
                  </Text>
                  <Text>{restaurant.info}</Text>
                </View>
              ))}
            </View>
            )}

            <Text style={Styles.mb4}>
              {formatAddress(eatery.address, '\n')}
            </Text>

            {notEmpty(eatery.phone) && <Text style={Styles.mb4}>{eatery.phone}</Text>}

            {notEmpty(eatery.website) && (
            <Text
              style={{
                ...Styles.mb4,
                ...(Platform.OS === 'ios' ? Styles.fontSemibold : Styles.fontBold),
              }}
              onPress={() => LinkService.openLink(eatery.website)}
            >
              {eatery.website}
            </Text>
            )}
          </View>

          {eatery.reviews.length > 0 && (
          <View style={{ ...Styles.p2, ...Styles.borderBottom, ...Styles.borderBlueLight }}>
            <Text style={{
              ...Styles.textLg,
              ...Styles.mb4,
              ...(Platform.OS === 'ios' ? Styles.fontSemibold : Styles.fontBold),
            }}
            >
              Our Reviews
            </Text>

            {eatery.reviews.map((review, index) => (
              <Text
                onPress={() => LinkService.openLink(`${BASE_URL}${review.link}`)}
                key={review.id}
                style={{
                  ...(Platform.OS === 'ios' ? Styles.fontSemibold : Styles.fontBold),
                  ...(index < eatery.reviews.length - 1 ? Styles.mb1 : null),
                }}
              >
                Our review from
                {' '}
                {dayjs(review.created_at).format('MMM Do YYYY')}
              </Text>
            ))}
          </View>
          )}

          <View style={{ ...Styles.p2, ...Styles.borderBottom, ...Styles.borderBlueLight }}>
            <Text style={{
              ...Styles.textLg,
              ...(Platform.OS === 'ios' ? Styles.fontSemibold : Styles.fontBold),
            }}
            >
              Visitor Ratings
            </Text>

            {eatery.ratings.length > 0 && (
            <View style={Styles.mt4}>
              <View style={{ ...Styles.flexRow, ...Styles.itemsCenter, ...Styles.mb4 }}>
                <Text>
                  Rated
                  {' '}
                  {eatery.average_rating}
                  {' '}
                </Text>
                <FontAwesome name="star" size={16} color={BLACK} />
                <Text>
                  {' '}
                  from
                  {' '}
                  {eatery.ratings.length}
                  {' '}
                  rating
                  {eatery.ratings.length > 1 ? 's' : ''}
                </Text>
              </View>

              <View>
                <TouchableOpacity onPress={() => setShowSubmitRatingModal(true)}>
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
                      {eatery.name}
                      ? Why not leave a rating to let others know your experience!
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View>
                {eatery.ratings.map((rating, index) => (
                  <View key={rating.id.toString()}>
                    <EateryReview item={rating} />
                    {index < eatery.ratings.length - 1 && <ItemSeparatorBlank />}
                  </View>
                ))}
              </View>
            </View>
            )}
          </View>

          <View style={Styles.p2}>
            <Text style={Styles.italic}>
              This location was added to our database on
              {' '}
              {dayjs(eatery.created_at).format('DD/MM/YYYY')}
            </Text>
            <Text
              style={{
                ...(Platform.OS === 'ios' ? Styles.fontSemibold : Styles.fontBold),
                ...Styles.pt2,
              }}
              onPress={() => setShowReportProblemModal(true)}
            >
              Report a problem with this location.
            </Text>
          </View>
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
