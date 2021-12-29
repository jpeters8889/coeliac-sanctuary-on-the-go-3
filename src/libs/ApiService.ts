import axios from 'axios';
import { BASE_URL } from '../constants';
import { PlacesApiRequest } from '../types';

export class ApiService {
  static getPlaces(request: PlacesApiRequest) {
    const searchParameters = JSON.stringify({
      term: request.searchTerm,
      lat: request.lat,
      lng: request.lng,
      range: request.range,
    });

    const url = new URL(`${BASE_URL}/api/wheretoeat`);

    url.searchParams.append('search', searchParameters);

    if (request.filters) {
      Object.keys(request.filters).forEach((key) => {
        // @ts-ignore
        url.searchParams.append(`filter[${key}]`, request.filters[key]);
      });
    }

    url.searchParams.append('page', request.page.toString());
    url.searchParams.append('limit', request.limit.toString());

    console.log(url.href);

    return axios.get(encodeURI(url.href), { validateStatus: () => true });
  }

  static async getPlaceDetails(id: number) {
    return axios.get(`${BASE_URL}/api/wheretoeat/${id.toString()}`);
  }

  static async getVenueTypes() {
    return axios.get(`${BASE_URL}/api/wheretoeat/venueTypes`);
  }
}
