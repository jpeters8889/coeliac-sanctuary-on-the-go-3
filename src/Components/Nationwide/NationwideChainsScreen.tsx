import React, { useEffect, useState } from 'react';
import {
  View, Text, ActivityIndicator, FlatList,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import Styles from '../../Styles/Styles';
import Accordion from '../UI/Accordion';
import { Eatery } from '../../types';
import { ApiService } from '../../libs/ApiService';
import ItemSeparator from '../UI/ItemSeparator';
import Location from './Location';
import AnalyticsService from '../../libs/AnalyticsService';
import { YELLOW } from '../../constants';

export default function NationwideChainsScreen({ navigation }: { navigation: StackNavigationProp<any> }) {
  AnalyticsService.logScreen('nationwide-screen').then(() => {});

  const [isLoading, setIsLoading]: [boolean, any] = useState(true);
  const [places, setPlaces]: [Eatery[], any] = useState([]);
  const [currentPage, setCurrentPage]: [number, any] = useState(1);
  const [hasMorePages, setHasMorePages]: [boolean, any] = useState(true);

  const getPlaces = () => {
    ApiService.getNationwideEateries(currentPage).then((response) => {
      setPlaces(
        currentPage === 1
          ? response.data.data.data
          : [...places, ...response.data.data.data],
      );

      setHasMorePages(!!response.data.data.next_page_url);
      setIsLoading(false);
    });
  };

  const updateList = () => {
    if (!hasMorePages) {
      return;
    }

    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    getPlaces();
  }, []);

  useEffect(() => {
    if (currentPage === 1 || !hasMorePages) {
      return;
    }

    getPlaces();
  }, [currentPage]);

  return (
    <View style={{ ...Styles.bgWhite, ...Styles.flex1 }}>
      <Accordion props={{
        title: 'What are Nationwide Eateries?',
        bottomBorder: true,
      }}
      >
        <View style={Styles.p2}>
          <Text style={Styles.mb2}>
            Our list of Nationwide Eateries are restaurants, pubs, cafes etc across the UK
            that offer gluten free options or have a full gluten free menu.
          </Text>
          <Text>
            Unfortunately, due to the number of branches some of these nationwide chains have
            we are unable to list any individual locations. Please refer to the eateries own
            website to find your nearest branch.
          </Text>
        </View>
      </Accordion>

      {isLoading && (<ActivityIndicator size="large" style={Styles.mt4} color={YELLOW} />)}

      {!isLoading && (
      <View style={Styles.flex1}>
        <FlatList
          data={places}
          renderItem={({ item, index }) => Location(item, index, navigation)}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={ItemSeparator}
          onEndReached={() => updateList()}
          onEndReachedThreshold={0.9}
          ListFooterComponent={hasMorePages ? <ActivityIndicator size="large" style={Styles.my4} color={YELLOW} /> : null}
          style={Styles.flex1}
        />
      </View>
      )}
    </View>
  );
}
