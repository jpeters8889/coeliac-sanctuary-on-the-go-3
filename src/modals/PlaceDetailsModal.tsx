import React, { useEffect, useState } from 'react';
import {
  View, Text, TouchableOpacity, ActivityIndicator, Alert, Linking, FlatList,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import Global from '../Styles/Styles';
import { Eatery } from '../types';
import { ApiService } from '../libs/ApiService';
import EateryReview from '../Components/UI/EateryReview';
import ItemSeparatorBlank from '../Components/UI/ItemSeparatorBlank';
import { BLACK, YELLOW } from '../constants';

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

  useEffect(() => {
    ApiService.getPlaceDetails(route.params.id)
      .then((response: { data: Eatery }) => {
        setEatery(response.data);
        setIsLoading(false);
      })
      .catch(() => {
        Alert.alert('There was an error loading the details for this location');
        navigation.goBack();
      });
  }, []);

  return (
    <View>
      <View style={{
        ...Global.bgBlueLight,
        ...Global.p2,
        ...Global.flexRow,
        ...Global.justifyBetween,
        ...Global.itemsCenter,
        ...Global.absolute,
        ...Global.top0,
        ...Global.wFull,
      }}
      >
        {isLoading && <Text style={Global.textLg}>Loading...</Text>}
        {!isLoading && <Text style={Global.textLg}>{eatery.name}</Text>}

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {isLoading && (
      <View style={{ ...Global.mt10, ...Global.py8 }}>
        <ActivityIndicator size="large" />
      </View>
      )}

      {!isLoading && (
      <View style={Global.mt10}>
        <View style={{ ...Global.p2, ...Global.borderBottom, ...Global.borderBlueLight }}>
          <Text style={Global.mb4}>
            {eatery.info}
          </Text>

          <Text style={Global.mb4}>
            {eatery.address.replaceAll('<br />', '\n')}
          </Text>

          {eatery.phone && <Text style={Global.mb4}>{eatery.phone}</Text>}

          {eatery.website && (
          <Text style={{ ...Global.mb4, ...Global.fontSemibold }} onPress={() => Linking.openURL(eatery.website)}>
            {eatery.website}
          </Text>
          )}
        </View>

        <View style={Global.p2}>
          <Text style={{ ...Global.textLg, ...Global.fontSemibold }}>
            Visitor Ratings
          </Text>

          {eatery.ratings.length > 0 && (
          <View style={Global.mt4}>
            <View style={{ ...Global.flexRow, ...Global.itemsCenter, ...Global.mb4 }}>
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

            <FlatList
              data={eatery.ratings}
              keyExtractor={(item) => item.id.toString()}
              renderItem={EateryReview}
              ItemSeparatorComponent={ItemSeparatorBlank}
            />
          </View>
          )}
        </View>
      </View>
      )}
    </View>
  );
}
