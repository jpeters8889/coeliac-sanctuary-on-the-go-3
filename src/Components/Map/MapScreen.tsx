import React, {
  MutableRefObject, useEffect, useRef, useState,
} from 'react';
import {
  Dimensions, TextInput, TouchableOpacity, View,
} from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import Styles from '../../Styles/Styles';
import LocationService from '../../libs/LocationService';
import { BLACK, BLUE } from '../../constants';
import { FilterService } from '../../libs/FilterService';
import FilterSelectModal from '../../modals/FilterSelectModal';
import { Eatery } from '../../types';
import { ApiService } from '../../libs/ApiService';

export default function MapScreen({ navigation }: { navigation: StackNavigationProp<any> }) {
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

  const navigateToLocation = (latitude: number, longitude: number) => {
    map.current.animateToRegion({
      latitude,
      longitude,
      latitudeDelta: 0.092,
      longitudeDelta: 0.092 * (Dimensions.get('window').width / Dimensions.get('window').height),
    });
  };

  const loadEateries = () => {
    ApiService.getPlaces({
      searchTerm,
      lat: searchTerm === '' ? latLng.latitude : 0,
      lng: searchTerm === '' ? latLng.longitude : 0,
      range,
      filters: {
        venueType: filterService.selectedFilters(),
      },
      page: 1,
      limit: 50,
    }).then((response) => {
      if (searchTerm !== '' && response.data.data.appends.latlng) {
        navigateToLocation(response.data.data.appends.latlng.lat, response.data.data.appends.latlng.lng);

        setSearchTerm('');
      }

      setPlaces(response.data.data.data);
    }).catch(() => {
      //
    });
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

    setRange((region.latitudeDelta * 111) * 2);
  };

  const openDetails = (eatery: Eatery) => {
    navigation.navigate('details', {
      id: eatery.id,
    });
  };

  const runSearch = () => {
    // setLatLng({ latitude: 0, longitude: 0 });

    loadEateries();
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
        ...Styles.wFull,
        ...Styles.flexRow,
        ...Styles.justifyBetween,
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
