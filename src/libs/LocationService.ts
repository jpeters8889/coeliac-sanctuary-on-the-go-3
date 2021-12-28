import * as Location from 'expo-location';
import { LocationObject } from 'expo-location';
import { LocationPermissionResponse } from 'expo-location/src/Location.types';

export default class LocationService {
  getPermission(): Promise<LocationPermissionResponse> {
    return Location.requestForegroundPermissionsAsync();
  }

  getLocation(): Promise<LocationObject> {
    return Location.getCurrentPositionAsync();
  }
}
