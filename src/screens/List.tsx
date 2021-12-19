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

        <TouchableOpacity>
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
      <Modal
        visible={showRangeModal}
        onRequestClose={() => setShowRangeModal(false)}
        transparent
      >
        <View style={{
          ...Global.flex1,
          ...Global.bgModal,
          ...Global.wFull,
          ...Global.hFull,
          ...Global.itemsCenter,
          ...Global.justifyCenter,
        }}
        >
          <View style={{
            ...Global.bgWhite,
            ...Global.itemsCenter,
            ...Global.justifyCenter,
          }}
          >
            <TouchableOpacity onPress={() => selectRange(1)}>
              <Text style={{
                ...rangeSelectStyles,
                ...Global.roundedTopLg,
                ...(range === 1 ? Global.bgGreyOff : ''),
              }}
              >
                1 Mile
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => selectRange(2)}>
              <Text style={{
                ...rangeSelectStyles,
                ...(range === 2 ? Global.bgGreyOff : ''),
              }}
              >
                2 Miles
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => selectRange(5)}>
              <Text style={{
                ...rangeSelectStyles,
                ...(range === 5 ? Global.bgGreyOff : ''),
              }}
              >
                5 Miles
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => selectRange(10)}>
              <Text style={{
                ...rangeSelectStyles,
                ...(range === 10 ? Global.bgGreyOff : ''),
              }}
              >
                10 Miles
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => selectRange(20)}>
              <Text style={{
                ...rangeSelectStyles,
                ...Global.roundedBottomLg,
                ...(range === 20 ? Global.bgGreyOff : ''),
              }}
              >
                20 Miles
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      )}
    </View>
  );
}
