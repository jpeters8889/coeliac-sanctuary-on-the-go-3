import axios, { AxiosResponse } from 'axios';
import { Platform } from 'react-native';
import { ImageInfo } from 'expo-image-picker/src/ImagePicker.types';
import { BASE_URL } from '../constants';
import {
  PlacesApiRequest, PlacesMapApiRequest, RecommendAPlaceSignature, SubmitRatingSignature, SubmitReviewSignature,
} from '../types';

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

    return axios.get(url.href, { validateStatus: () => true });
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

  static async getPlaceDetails(id: number, branchId?: number) {
    let url = `${BASE_URL}/api/wheretoeat/${id.toString()}`;

    if (branchId) {
      url += `?branch=${branchId}`;
    }

    console.log(url);

    return axios.get(url);
  }

  static async getSuggestEditFields(id: number) {
    return axios.get(`${BASE_URL}/api/wheretoeat/${id}/suggest-edit`);
  }

  static getNationwideEateries(page: number = 1) {
    return axios.get(`${BASE_URL}/api/wheretoeat?page=${page}&filter[county]=1`);
  }

  static latestBlogs() {
    return axios.get(`${BASE_URL}/api/blogs`);
  }

  static latestRecipes() {
    return axios.get(`${BASE_URL}/api/recipes`);
  }

  static summary() {
    return axios.get(`${BASE_URL}/api/wheretoeat/summary`);
  }

  static latestRatings() {
    return axios.get(`${BASE_URL}/api/wheretoeat/ratings/latest`);
  }

  static latestLocations() {
    return axios.get(`${BASE_URL}/api/wheretoeat/latest`);
  }

  static shopCta() {
    return axios.get(`${BASE_URL}/api/popup`);
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
      method: 'app',
    }, {
      headers: {
        'X-CSRF-TOKEN': token,
      },
    });
  }

  static async submitFullReview(request: SubmitReviewSignature) {
    const token = await this.getToken();

    const params = {
      rating: request.rating,
      name: request.name,
      email: request.email,
      food: request.foodRating !== '' ? request.foodRating : null,
      service: request.serviceRating !== '' ? request.serviceRating : null,
      expense: request.expense > 0 ? request.expense : null,
      comment: request.comment,
      images: request.images,
      method: 'app',
    };

    if (request.branchName) {
      // @ts-ignore
      params.branch_name = request.branchName;
    }
    return axios.post(`${BASE_URL}/api/wheretoeat/${request.eateryId}/reviews`, params, {
      headers: {
        'X-CSRF-TOKEN': token,
      },
    });
  }

  static async recommendAPlace(details: RecommendAPlaceSignature) {
    const token = await this.getToken();

    return axios.post(`${BASE_URL}/api/wheretoeat/recommend-a-place`, {
      name: details.name,
      email: details.email,
      place_name: details.placeName,
      place_location: details.placeLocation,
      place_web_address: details.placeWebAddress,
      place_details: details.placeDetails,
    }, {
      headers: {
        'X-CSRF-TOKEN': token,
      },
    });
  }

  static async reportPlace(eateryId: number, details: string) {
    const token = await this.getToken();

    return axios.post(`${BASE_URL}/api/wheretoeat/${eateryId.toString()}/report`, {
      details,
    }, {
      headers: {
        'X-CSRF-TOKEN': token,
      },
    });
  }

  static async submitPlaceSuggestion(eateryId: number, field: string, value: string | number | object) {
    const token = await this.getToken();

    return axios.post(`${BASE_URL}/api/wheretoeat/${eateryId.toString()}/suggest-edit`, {
      field, value,
    }, {
      headers: {
        'X-CSRF-TOKEN': token,
      },
    });
  }

  static async uploadPhoto(photo: ImageInfo) {
    const token = await this.getToken();

    const request = new FormData();

    const fileName = photo.uri.split('/').reverse()[0];

    request.append('images[0]', {
      // @ts-ignore
      uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
      name: fileName,
      type: 'image/jpeg',
    });

    return axios.post(`${BASE_URL}/api/wheretoeat/review/image-upload`, request, {
      validateStatus: () => true,
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-CSRF-TOKEN': token,
      },
    });
  }

  protected static async getToken() {
    const request = await axios.get(`${BASE_URL}/api/app-request-token`);

    return request.data.token;
  }
}
