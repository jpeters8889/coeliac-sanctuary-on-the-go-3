import React, { useEffect, useState } from 'react';
import {
  View, Text, TouchableOpacity, ActivityIndicator, Alert, Linking, ScrollView,
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

type Props = {
  route: RouteProp<{
    params: {
      id: number
    }
  }>
  navigation: StackNavigationProp<any>
};

export default function PlaceDetailsModal({ route, navigation }: Props) {
  const [isLoading, setIsLoading]: [boolean, any] = useState(true);
  const [eatery, setEatery]: [Eatery, any] = useState({} as Eatery);
  const [showSubmitRatingModal, setShowSubmitRatingModal]: [boolean, any] = useState(false);
  const [reloadPage, setReloadPage]: [any, any] = useState();

  const closeSubmitRatingModal = () => {
    setReloadPage({});

    setShowSubmitRatingModal(false);
  };

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

  useEffect(() => loadEatery(), []);

  useEffect(() => loadEatery(), [reloadPage]);

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
      }}
      >
        {isLoading && <Text style={Styles.textLg}>Loading...</Text>}
        {!isLoading && <Text style={Styles.textLg}>{eatery.name}</Text>}

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {isLoading && (
      <View style={{ ...Styles.mt10, ...Styles.py8 }}>
        <ActivityIndicator size="large" />
      </View>
      )}

      {!isLoading && (
      <>
        <ScrollView style={Styles.mt10}>
          <View style={{ ...Styles.p2, ...Styles.borderBottom, ...Styles.borderBlueLight }}>
            <Text style={Styles.mb4}>
              {eatery.info}
            </Text>

            <Text style={Styles.mb4}>
              {eatery.address.replaceAll('<br />', '\n')}
            </Text>

            {eatery.phone && <Text style={Styles.mb4}>{eatery.phone}</Text>}

            {eatery.website && (
            <Text style={{ ...Styles.mb4, ...Styles.fontSemibold }} onPress={() => Linking.openURL(eatery.website)}>
              {eatery.website}
            </Text>
            )}
          </View>

          {eatery.reviews.length > 0 && (
          <View style={{ ...Styles.p2, ...Styles.borderBottom, ...Styles.borderBlueLight }}>
            <Text style={{ ...Styles.textLg, ...Styles.fontSemibold, ...Styles.mb4 }}>
              Our Reviews
            </Text>

            {eatery.reviews.map((review, index) => (
              <Text
                onPress={() => Linking.openURL(`${BASE_URL}${review.link}`)}
                key={review.id}
                style={{
                  ...Styles.fontSemibold,
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

          <View style={Styles.p2}>
            <Text style={{ ...Styles.textLg, ...Styles.fontSemibold }}>
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
                  ratings
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
                      ...Styles.fontSemibold,
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
        </ScrollView>

        {showSubmitRatingModal && (
        <SubmitRatingModal props={{
          id: eatery.id,
          title: eatery.name,
          onClose: () => closeSubmitRatingModal(),
        }}
        />
        )}
      </>
      )}
    </View>
  );
}
