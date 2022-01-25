import React, {
  MutableRefObject, useEffect, useRef, useState,
} from 'react';
import {
  Dimensions, Platform, TextInput, TouchableOpacity, View,
} from 'react-native';
import { Marker, Region } from 'react-native-maps';
import MapView from 'react-native-map-clustering';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import Styles from '../../Styles/Styles';
import LocationService from '../../libs/LocationService';
import { BLACK, BLUE, YELLOW } from '../../constants';
import { FilterService } from '../../libs/FilterService';
import FilterSelectModal from '../../modals/FilterSelectModal';
import { Eatery } from '../../types';
import { ApiService } from '../../libs/ApiService';
import AnalyticsService from '../../libs/AnalyticsService';

export default function MapScreen({ navigation }: { navigation: StackNavigationProp<any> }) {
  AnalyticsService.logScreen('map-screen').then(() => {});

  const initialLatLng = {
    latitude: 51.5073509,
    longitude: -0.1277583,
  };

  const [places, setPlaces]: [Eatery[], any] = useState([] as Eatery[]);
  const [searchTerm, setSearchTerm]: [string, any] = useState('');
  const [latLng, setLatLng]: [{ latitude: number; longitude: number }, any] = useState(initialLatLng);
  const [locationService]: [LocationService, any] = useState(() => new LocationService());
  const [filterService, setFilterService]: [FilterService, any] = useState(() => new FilterService());
  const [showFilterModal, setShowFilterModal]: [boolean, any] = useState(false);
  const [range, setRange]: [number, any] = useState(5);
  const [reloadList, setReloadList]: [any, any] = useState();

  const map: MutableRefObject<MapView> = useRef({} as MapView);

  const loadEateries = () => {
    ApiService.getMapPlaces({
      lat: latLng.latitude,
      lng: latLng.longitude,
      range,
      filters: {
        venueType: filterService.selectedFilters(),
      },
    }).then((response) => {
      setPlaces(response.data.data);
    }).catch((e) => {
      console.log(e);
    });
  };

  const navigateToLocation = (latitude: number, longitude: number) => {
    AnalyticsService.logEvent({
      type: 'navigating_to_location',
      metaData: {
        latitude,
        longitude,
      },
    }).then(() => {});

    // @ts-ignore
    map.current.animateToRegion({
      latitude,
      longitude,
      latitudeDelta: 0.092,
      longitudeDelta: 0.092 * (Dimensions.get('window').width / Dimensions.get('window').height),
    }, 0);

    loadEateries();
  };

  const updateFilters = (filters: FilterService) => {
    setFilterService(filters);
    setShowFilterModal(false);

    setReloadList({});
  };

  const moveMap = (region: Region) => {
    setLatLng({
      latitude: region.latitude,
      longitude: region.longitude,
    });

    setRange((region.latitudeDelta * 111) / 1.609);
  };

  const openDetails = (eatery: Eatery) => {
    navigation.navigate('details', {
      id: eatery.id,
    });
  };

  const runSearch = () => {
    AnalyticsService.logEvent({
      type: 'searched_for_location',
      metaData: {
        searchTerm,
      },
    }).then(() => {});

    ApiService.searchForLatLng(searchTerm).then((response) => {
      setSearchTerm('');
      navigateToLocation(response.data.lat, response.data.lng);
    });
  };

  useEffect(() => {
    locationService.getPermission()
      .then((permission) => {
        if (permission.status !== 'granted') {
          return;
        }

        locationService.getLocation()
          .then((location) => {
            navigateToLocation(location.coords.latitude, location.coords.longitude);
          });
      })
      .catch(() => {
        //
      });
  }, []);

  useEffect(() => {
    loadEateries();
  }, [latLng, reloadList]);

  return (
    <View>
      <View style={{
        ...Styles.absolute,
        ...Styles.p4,
        ...Styles.zMax,
        ...Styles.flexRow,
        ...Styles.justifyBetween,
        ...(Platform.OS === 'android' ? { ...Styles.w85, ...Styles.p2 } : { ...Styles.wFull, ...Styles.p4 }),
      }}
      >
        <View style={{
          ...Styles.flexRow,
          ...Styles.itemsCenter,
          ...Styles.p2,
          ...Styles.border,
          ...Styles.rounded,
          ...Styles.borderGrey,
          ...Styles.bgWhite,
          ...Styles.flex1,
          ...Styles.mr2,
        }}
        >
          <AntDesign
            name="search1"
            size={18}
            color="black"
            style={Styles.mx1}
          />

          <TextInput
            placeholder="Search for a location..."
            clearButtonMode="always"
            returnKeyType="search"
            value={searchTerm}
            style={Styles.flex1}
            onChangeText={setSearchTerm}
            onSubmitEditing={() => runSearch()}
          />
        </View>

        <TouchableOpacity
          style={{
            ...Styles.bgWhite,
            ...Styles.p2,
            ...Styles.rounded,
            ...Styles.border,
            ...Styles.borderGrey,
          }}
          onPress={() => setShowFilterModal(true)}
        >
          <Ionicons name="filter" size={24} color={BLACK} />
        </TouchableOpacity>
      </View>

      <MapView
        ref={map}
        zoomEnabled
        zoomControlEnabled
        showsUserLocation
        showsMyLocationButton
        provider="google"
        initialRegion={{
          ...latLng,
          latitudeDelta: 0.092,
          longitudeDelta: 0.92 * (Dimensions.get('window').width / Dimensions.get('window').height),
        }}
        onRegionChangeComplete={moveMap}
        style={{
          ...Styles.wFull,
          ...Styles.hFull,
        }}
        clusterColor={YELLOW}
      >
        {places.map((eatery) => (
          <Marker
            key={eatery.id}
            coordinate={{
              latitude: eatery.lat,
              longitude: eatery.lng,
            }}
            pinColor={BLUE}
            stopPropagation={false}
            onPress={() => openDetails(eatery)}
          />
        ))}
      </MapView>

      {showFilterModal && (
      <View style={{
        ...Styles.zMax,
        ...Styles.absolute,
        ...Styles.wFull,
        ...Styles.hFull,
      }}
      >
        <FilterSelectModal props={{
          onClose: (filters: FilterService) => updateFilters(filters),
          filterService,
        }}
        />
      </View>
      )}

    </View>
  );
}
