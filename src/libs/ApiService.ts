import axios, { AxiosError, AxiosResponse } from 'axios';
import { BASE_URL } from '../constants';
import { PlacesApiRequest, PlacesMapApiRequest, SubmitRatingSignature } from '../types';

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

    return axios.get(encodeURI(url.href), { validateStatus: () => true });
  }

  static getMapPlaces(request: PlacesMapApiRequest) {
    const url = new URL(`${BASE_URL}/api/wheretoeat/browse`);

    url.searchParams.append('lat', request.lat.toString());
    url.searchParams.append('lng', request.lng.toString());
    url.searchParams.append('range', request.range.toString());

    if (request.filters) {
      Object.keys(request.filters).forEach((key) => {
        // @ts-ignore
        url.searchParams.append(`filter[${key}]`, request.filters[key]);
      });
    }

    return axios.get(encodeURI(url.href), { validateStatus: () => true });
  }

  static async getPlaceDetails(id: number) {
    return axios.get(`${BASE_URL}/api/wheretoeat/${id.toString()}`);
  }

  static getNationwideEateries(page: number = 1) {
    return axios.get(`${BASE_URL}/api/wheretoeat?page=${page}&filter[county]=1`);
  }

  static async getVenueTypes() {
    return axios.get(`${BASE_URL}/api/wheretoeat/venueTypes`);
  }

  static async searchForLatLng(term: string): Promise<AxiosResponse> {
    const token = await this.getToken();

    return axios.post(`${BASE_URL}/api/wheretoeat/lat-lng`, {
      term,
    }, {
      headers: {
        'X-CSRF-TOKEN': token,
      },
    });
  }

  static async submitRating(request: SubmitRatingSignature) {
    const token = await this.getToken();

    return axios.post(`${BASE_URL}/api/wheretoeat/${request.eateryId}/reviews`, {
      rating: request.rating,
      name: request.name,
      email: request.email,
      comment: request.comment,
      method: 'app',
    }, {
      headers: {
        'X-CSRF-TOKEN': token,
      },
    });
  }

  static async apiSubmitPlaceRequest(body: string, type: 'add' | 'remove' = 'add') {
    const token = await this.getToken();

    return axios.post(`${BASE_URL}/api/wheretoeat/place-request`, {
      name: 'Through App',
      state: type,
      comment: body,
    }, {
      headers: {
        'X-CSRF-TOKEN': token,
      },
    });
  }

  protected static async getToken() {
    const request = await axios.get(`${BASE_URL}/api/app-request-token`);

    return request.data.token;
  }
}
