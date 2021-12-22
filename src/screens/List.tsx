import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator, FlatList, Modal, Text, TextInput, TouchableOpacity, View,
} from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import Global from '../Styles/Global';
import { Eatery } from '../types';
import { ApiService } from '../libs/ApiService';
import EateryList from '../Components/List/EateryList';
import ItemSeparator from '../Components/UI/ItemSeparator';
import RangeSelectModal from '../modals/RangeSelectModal';
import FilterSelectModal from '../modals/FilterSelectModal';

export default function List() {
  const [isLoading, setIsLoading]: [boolean, any] = useState(true);
  const [places, setPlaces]: [Eatery[], any] = useState([] as Eatery[]);
  const [searchTerm, setSearchTerm]: [string, any] = useState('');
  const [lat, setLat]: [number, any] = useState(0);
  const [lng, setLng]: [number, any] = useState(0);
  const [range, setRange]: [1 | 2 | 5 | 10 | 20, any] = useState(5);
  const [currentPage, setCurrentPage]: [number, any] = useState(1);
  const [hasMorePages, setHasMorePages]: [boolean, any] = useState(false);

  const [showRangeModal, setShowRangeModal]: [boolean, any] = useState(false);
  const [showFilterModal, setShowFilterModal]: [boolean, any] = useState(false);

  const loadEateries = async () => {
    const request = await ApiService.getPlaces({
      searchTerm: searchTerm !== '' ? searchTerm : 'london',
      lat,
      lng,
      range,
      page: currentPage,
      limit: 20,
    });

    setPlaces(currentPage === 1 ? request.data.data.data : [...places, ...request.data.data.data]);
    setHasMorePages(!!request.data.data.next_page_url);
    setIsLoading(false);
  };

  const updateList = () => {
    setCurrentPage(currentPage + 1);
  };

  const runSearch = async () => {
    setCurrentPage(1);
    setIsLoading(true);
    setHasMorePages(true);
    setPlaces([]);

    await loadEateries();
  };

  // const openRangeSelectModal = () => {
  //   navigation.navigate('RangeSelectModal', {
  //     currentRange: range,
  //   });
  // };

  useEffect(() => {
    (async () => {
      await loadEateries();
    })();
  }, [currentPage, range]);

  const selectRange = async (selectedRange: 1 | 2 | 5 | 10 | 20) => {
    await setRange(selectedRange);
    setShowRangeModal(false);
  };

  const rangeSelectStyles = {
    ...Global.p4,
    ...Global.px16,
    ...Global.borderBottom,
    ...Global.borderGreyOff,
    ...Global.textLg,
    ...Global.overflowHidden,
  };

  return (
    <View style={{ ...Global.bgWhite, ...Global.flex1 }}>
      <View style={{
        ...Global.flexRow,
        ...Global.itemsCenter,
        ...Global.p2,
        ...Global.borderBottom,
        ...Global.borderGrey,
      }}
      >
        <AntDesign
          name="search1"
          size={18}
          color="black"
          style={Global.mx1}
        />

        <TextInput
          placeholder="Search for a location..."
          clearButtonMode="always"
          returnKeyType="search"
          value={searchTerm}
          style={{ ...Global.p2, ...Global.flex1 }}
          onChangeText={setSearchTerm}
          onSubmitEditing={runSearch}
        />
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" style={Global.mt4} />
      ) : (
        <FlatList
          data={places}
          renderItem={EateryList}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={ItemSeparator}
          onEndReached={updateList}
          ListFooterComponent={hasMorePages ? <ActivityIndicator size="large" style={Global.my4} /> : null}
          style={Global.flex1}
        />
      )}

      <View style={{
        ...Global.flexRow, ...Global.p2, ...Global.borderTop, ...Global.borderGrey,
      }}
      >
        <TouchableOpacity>
          <View style={{
            ...Global.p2,
            ...Global.bgYellow,
            ...Global.rounded,
            ...Global.mr2,
          }}
          >
            <MaterialIcons name="gps-fixed" size={17} color="black" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setShowFilterModal(true)}>
          <View style={{
            ...Global.p2,
            ...Global.px4,
            ...Global.bgYellow,
            ...Global.rounded,
            ...Global.mr2,
          }}
          >
            <Text>Filters</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setShowRangeModal(true)}>
          <View style={{
            ...Global.p2,
            ...Global.px4,
            ...Global.bgYellow,
            ...Global.rounded,
          }}
          >
            <Text>
              Range:
              {' '}
              {range}
              M
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {showRangeModal && (
      <RangeSelectModal props={{
        currentRange: range,
        setRange,
        onClose: () => setShowRangeModal(false),
      }}
      />
      )}

      {showFilterModal && (
      <FilterSelectModal props={{
        onClose: () => setShowFilterModal(false),
      }}
      />
      )}
    </View>
  );
}
