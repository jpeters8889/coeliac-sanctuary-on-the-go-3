import React, {
  MutableRefObject, useEffect, useRef, useState,
} from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import MapView, { Region } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';
import Styles from '../Styles/Styles';
import LocationService from '../libs/LocationService';

export default function Map() {
  const initialLatLng = {
    latitude: 51.5073509,
    longitude: -0.1277583,
  };

  const [firstLoad, setFirstLoad]: [boolean, any] = useState(true);

  const [latLng, setLatLng]: [{ latitude: number; longitude: number }, any] = useState(initialLatLng);

  const [zoom, setZoom]: [number, any] = useState(10);

  const [locationService]: [LocationService, any] = useState(() => new LocationService());

  const map: MutableRefObject<MapView> = useRef();

  const moveMap = (region: Region) => {
    console.log('moved');
  };

  const getZoomDelta = (): { latitudeDelta: number, longitudeDelta: number } => ({
    latitudeDelta: (zoom * 10) * 0.002,
    longitudeDelta: (zoom * 10) * 0.001,
  });

  useEffect(() => {
    locationService.getPermission()
      .then((permission) => {
        if (permission.status !== 'granted') {
          setFirstLoad(false);
          setLatLng(initialLatLng);
          return;
        }

        locationService.getLocation()
          .then((location) => {
            setFirstLoad(false);
            setLatLng({
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            });
          });
      })
      .catch(() => {
        setFirstLoad(false);
        setLatLng(initialLatLng);
      });
  }, []);

  useEffect(() => {
    map.current.animateToRegion({
      ...latLng,
      ...getZoomDelta(),
    });
  }, [latLng, zoom]);

  return (
    <View>
      <View style={{
        ...Styles.absolute,
        ...Styles.p4,
        ...Styles.zMax,
        ...Styles.right0,
        ...Styles.flexRow,
      }}
      >
        <TouchableOpacity
          onPress={() => setZoom(zoom + 1)}
          style={{
            ...Styles.bgWhite,
            ...Styles.border,
            ...Styles.borderGreyOff,
            ...Styles.p2,
            ...Styles.rounded,
            ...Styles.mr2,
          }}
        >
          <Feather name="zoom-out" size={20} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setZoom(zoom - 1)}
          style={{
            ...Styles.bgWhite,
            ...Styles.border,
            ...Styles.borderGreyOff,
            ...Styles.p2,
            ...Styles.rounded,
          }}
        >
          <Feather name="zoom-in" size={20} color="black" />
        </TouchableOpacity>
      </View>

      <MapView
        ref={map}
        zoomEnabled
        zoomControlEnabled
        showsMyLocationButton
        provider="google"
        initialRegion={{
          ...latLng,
          ...getZoomDelta(),
        }}
        onRegionChangeComplete={moveMap}
        style={{
          ...Styles.wFull,
          ...Styles.hFull,
        }}
      />
    </View>
  );
}
