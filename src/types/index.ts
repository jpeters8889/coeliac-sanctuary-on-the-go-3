import { ComponentType, ReactNode } from 'react';

type MainTab = {
  showHeader?: boolean;
  name: string,
  label: string,
  title?: string,
  component: ComponentType<any>,
  icon?: (props: {
    focused: boolean;
    color: string;
    size: number;
  }) => ReactNode;
};

type Eatery = {
  address: string;
  average_rating: string;
  average_expense: null | {
    value: string;
    label: string;
  };
  created_at: string;
  county: {
    county: string;
    id: number;
  };
  country: {
    country: string;
    id: number;
  };
  cuisine: {
    cuisine: string;
    id: number;
  }
  features: [],
  gf_menu_link: string;
  icon: string;
  id: number;
  info: string;
  lat: number;
  lng: number;
  name: string;
  opening_times: null | OpeningTimes;
  phone: string;
  user_reviews: UserReview[];
  restaurants: AttractionRestaurant[];
  town: {
    id: number;
    town: string;
  };
  type: {
    id: number,
    name: string;
    type: EateryType;
  };
  user_images: ReviewImage[],
  venue_type: {
    id: number;
    venue_type: string;
  };
  website: string;
};

type EateryType = 'att' | 'hotel' | 'wte';

type OpeningTimes = {
  [K: string]: string | boolean;
  monday_start: string;
  monday_end: string;
  tuesday_start: string;
  tuesday_end: string;
  wednesday_start: string;
  wednesday_end: string;
  thursday_start: string;
  thursday_end: string;
  friday_start: string;
  friday_end: string;
  saturday_start: string;
  saturday_end: string;
  sunday_start: string;
  sunday_end: string;
  is_open_now: false;
  opens_at: string;
  closes_at: string;
};

type AttractionRestaurant = {
  id: number,
  restaurant_name: string,
  info: string,
};

type UserReview = {
  human_date: string;
  admin_review: boolean;
  average_rating: number;
  body: string;
  id: number;
  name?: string;
  number_of_ratings: number;
  rating: StarReview,
  images: ReviewImage[],
  price: {
    value: string;
    label: string;
  };
  food_rating: FoodServiceRating;
  service_rating: FoodServiceRating;
  wheretoeat_id: number;
  created_at: string;
};

type ReviewImage = {
  id: string;
  thumb: string;
  path: string;
};

type StarReview = 0 | 1 | 2 | 3 | 4 | 5;

type PlacesApiRequest = {
  searchTerm?: string;
  lat?: number;
  lng?: number;
  range?: SearchRange | number;
  filters?: {
    venueType: string,
  }
  page: number,
  limit: number,
};

type PlacesMapApiRequest = {
  lat: number;
  lng: number;
  range: number;
  filters?: {
    venueType: string,
  }
};

type SearchRange = 1 | 2 | 5 | 10 | 20;

type ModalProps = {
  visible?: boolean,
  onClose: () => void,
};

type VenueTypeFilterGroup = {
  label: string;
  id: number;
  filters: VenueTypeFilter[];
};

type VenueTypeFilter = {
  id: number;
  label: string;
  selected: boolean,
};

type VenueTypeResponse = {
  id: number;
  type_id: number;
  label: string;
  count: number;
};

type SubmitRatingSignature = {
  eateryId: number;
  rating: StarReview;
};

type SubmitReviewSignature = {
  eateryId: number;
  rating: StarReview;
  name?: string;
  email?: string;
  foodRating: FoodServiceRating | '';
  serviceRating: FoodServiceRating | '';
  expense: StarReview;
  comment?: string;
  images?: string[];
};

type RecommendAPlaceSignature = {
  name: string;
  email: string;
  placeName: string;
  placeLocation: string;
  placeWebAddress?: string;
  placeDetails: string;
};

type WebsiteModuleData = {
  architect_title: string;
  id: number,
  title: string;
  meta_description: string;
  main_image: string;
  created_at: string;
  link: string;
};

type WebsiteDataset = {
  id: number,
  title: string;
  description: string;
  image: string;
  createdAt: string;
  link: string;
};

type WebsiteDisplaySection = {
  title: string;
  key: 'blogs' | 'recipes';
  loading: boolean;
  items: WebsiteDataset[],
};

type WhereToEatSummary = {
  [K: string]: number,
  eateries: number;
  attractions: number;
  hotels: number;
};

type WhereToEatSummarySection = {
  title: string;
  key: string;
};

type LatestEateryRatings = {
  id: number,
  eatery_id: number,
  location: string,
  rating: string,
  created_at: string,
};

type LatestEateries = {
  id: number,
  name: string,
  location: string,
  created_at: string,
};

type ShopCta = {
  text: string,
  link: string,
  image: string,
};

type AnalyticsEvent = {
  type: string;
  metaData?: { [K: string]: any }
};

type FoodServiceRating = 'excellent' | 'good' | 'poor';

export {
  MainTab, Eatery, PlacesApiRequest, UserReview, EateryType, SearchRange, ModalProps,
  VenueTypeFilterGroup, VenueTypeFilter, VenueTypeResponse, SubmitReviewSignature,
  PlacesMapApiRequest, WebsiteModuleData, WebsiteDataset, WebsiteDisplaySection, RecommendAPlaceSignature,
  WhereToEatSummary, WhereToEatSummarySection, LatestEateryRatings, LatestEateries, ShopCta, AnalyticsEvent,
  ReviewImage, OpeningTimes, StarReview, SubmitRatingSignature, FoodServiceRating,
};
