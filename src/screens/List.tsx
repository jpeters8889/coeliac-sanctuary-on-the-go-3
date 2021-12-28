import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator, Alert, FlatList, Text, TextInput, TouchableOpacity, View,
} from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import Style from '../Styles/Styles';
import { Eatery, SearchRange } from '../types';
import { ApiService } from '../libs/ApiService';
import EateryList from '../Components/List/EateryList';
import ItemSeparator from '../Components/UI/ItemSeparator';
import RangeSelectModal from '../modals/RangeSelectModal';
import FilterSelectModal from '../modals/FilterSelectModal';
import { FilterService } from '../libs/FilterService';
import LocationService from '../libs/LocationService';

export default function List() {
  const [firstLoad, setFirstLoad]: [boolean, any] = useState(true);
  const [isLoading, setIsLoading]: [boolean, any] = useState(true);
  const [places, setPlaces]: [Eatery[], any] = useState([] as Eatery[]);
  const [searchTerm, setSearchTerm]: [string, any] = useState('');
  const [latLng, setLatLng]: [{ lat: number; lng: number }, any] = useState({ lat: 0, lng: 0 });
  const [range, setRange]: [SearchRange, any] = useState(5);
  const [currentPage, setCurrentPage]: [number, any] = useState(1);
  const [hasMorePages, setHasMorePages]: [boolean, any] = useState(false);

  const [filterService, setFilterService]: [FilterService, any] = useState(() => new FilterService());

  const [showRangeModal, setShowRangeModal]: [boolean, any] = useState(false);
  const [showFilterModal, setShowFilterModal]: [boolean, any] = useState(false);

  const [locationService]: [LocationService, any] = useState(() => new LocationService());

  const [reloadList, setReloadList]: [any, any] = useState();

  const loadEateries = () => {
    if (firstLoad) {
      return;
    }

    let search = 'london';

    if (searchTerm !== '') {
      search = searchTerm;
    }

    if (latLng.lat !== 0 && latLng.lng !== 0) {
      search = '';
    }

    ApiService.getPlaces({
      searchTerm: search,
      lat: latLng.lat,
      lng: latLng.lng,
      range,
      filters: {
        venueType: filterService.selectedFilters(),
      },
      page: currentPage,
      limit: 20,
    }).then((response) => {
      setPlaces(
        currentPage === 1
          ? response.data.data.data
          : [...places, ...response.data.data.data],
      );
      setHasMorePages(!!response.data.data.next_page_url);
      setIsLoading(false);
    }).catch(() => {
      setPlaces([]);
      setHasMorePages(false);
      setIsLoading(false);
    });
  };

  const updateList = () => {
    if (!hasMorePages) {
      return;
    }

    setCurrentPage(currentPage + 1);
  };

  const resetList = () => {
    setCurrentPage(1);
    setIsLoading(true);
    setHasMorePages(true);
    setPlaces([]);

    setReloadList({});
  };

  const runSearch = () => {
    setLatLng({ lat: 0, lng: 0 });

    resetList();
    loadEateries();
  };

  const updateFilters = (filters: FilterService) => {
    setFilterService(filters);
    setShowFilterModal(false);

    resetList();
  };

  const goToCurrentLocation = () => {
    resetList();

    locationService.getPermission()
      .then((permission) => {
        if (permission.status !== 'granted') {
          throw new Error();
        }

        locationService.getLocation()
          .then((location) => {
            setLatLng({
              lat: location.coords.latitude,
              lng: location.coords.longitude,
            });
          });
      })
      .catch(() => {
        Alert.alert('There was an error finding your current location');

        setLatLng({ lat: 0, lng: 0 });
      });
  };

  useEffect(() => {
    locationService.getPermission()
      .then((permission) => {
        if (permission.status !== 'granted') {
          setFirstLoad(false);
          setLatLng({ lat: 0, lng: 0 });
          return;
        }

        locationService.getLocation()
          .then((location) => {
            setFirstLoad(false);
            setLatLng({
              lat: location.coords.latitude,
              lng: location.coords.longitude,
            });
          });
      })
      .catch(() => {
        setFirstLoad(false);
        setLatLng({ lat: 0, lng: 0 });
      });
  }, []);

  useEffect(() => {
    loadEateries();
  }, [latLng]);

  useEffect(() => {
    if (currentPage === 1 || !hasMorePages) {
      return;
    }

    loadEateries();
  }, [currentPage]);

  useEffect(() => {
    resetList();
  }, [range]);

  useEffect(() => loadEateries(), [reloadList]);

  return (
    <View style={{ ...Style.bgWhite, ...Style.flex1 }}>
      <View style={{
        ...Style.flexRow,
        ...Style.itemsCenter,
        ...Style.p2,
        ...Style.borderBottom,
        ...Style.borderGrey,
      }}
      >
        <AntDesign
          name="search1"
          size={18}
          color="black"
          style={Style.mx1}
        />

        <TextInput
          placeholder="Search for a location..."
          clearButtonMode="always"
          returnKeyType="search"
          value={searchTerm}
          style={{ ...Style.p2, ...Style.flex1 }}
          onChangeText={setSearchTerm}
          onSubmitEditing={() => runSearch()}
        />
      </View>

      {isLoading && (<ActivityIndicator size="large" style={Style.mt4} />)}

      {!isLoading && (places.length > 0 ? (
        <View style={Style.flex1}>
          <FlatList
            data={places}
            renderItem={EateryList}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={ItemSeparator}
            onEndReached={() => updateList()}
            onEndReachedThreshold={0.9}
            ListFooterComponent={hasMorePages ? <ActivityIndicator size="large" style={Style.my4} /> : null}
            style={Style.flex1}
          />
        </View>
      ) : (
        <Text style={{
          ...Style.textXl,
          ...Style.py8,
          ...Style.itemsCenter,
          ...Style.justifyCenter,
          ...Style.flex1,
          ...Style.textCenter,
        }}
        >
          No eateries found...
        </Text>
      ))}

      <View style={{
        ...Style.flexRow, ...Style.p2, ...Style.borderTop, ...Style.borderGrey,
      }}
      >
        <TouchableOpacity onPress={() => goToCurrentLocation()}>
          <View style={{
            ...Style.p2,
            ...Style.bgYellow,
            ...Style.rounded,
            ...Style.mr2,
          }}
          >
            <MaterialIcons name="gps-fixed" size={17} color="black" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setShowFilterModal(true)}>
          <View style={{
            ...Style.p2,
            ...Style.px4,
            ...Style.bgYellow,
            ...Style.rounded,
            ...Style.mr2,
          }}
          >
            <Text>Filters</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setShowRangeModal(true)}>
          <View style={{
            ...Style.p2,
            ...Style.px4,
            ...Style.bgYellow,
            ...Style.rounded,
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
        onClose: (filters: FilterService) => updateFilters(filters),
        filterService,
      }}
      />
      )}
    </View>
  );
}
