import axios from 'axios';
import { BASE_URL } from '../constants';
import { PlacesApiRequest, SubmitRatingSignature } from '../types';

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

  static async submitRating(request: SubmitRatingSignature) {
    let promise = null;

    await this.apiGetToken((token) => {
      promise = axios.post(`${BASE_URL}/api/wheretoeat/${request.eateryId}/reviews`, {
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

      return promise;
    });
  }

  static async apiSubmitPlaceRequest(body: string, type: 'add' | 'remove' = 'add') {
    let promise = null;

    await this.apiGetToken((token) => {
      promise = axios.post(`${BASE_URL}/api/wheretoeat/place-request`, {
        name: 'Through App',
        state: type,
        comment: body,
      }, {
        headers: {
          'X-CSRF-TOKEN': token,
        },
      });
    });

    return promise;
  }

  protected static apiGetToken(callback: (token: string) => any) {
    axios.get(`${BASE_URL}/api/app-request-token`)
      .then((response) => {
        callback(response.data.token);
      });
  }
}
