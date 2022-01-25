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
  icon: string;
  id: number;
  info: string;
  lat: number;
  lng: number;
  name: string;
  phone: string;
  ratings: Rating[];
  restaurants: AttractionRestaurant[];
  reviews: Review[];
  town: {
    id: number;
    town: string;
  };
  type: {
    id: number,
    name: string;
    type: EateryType;
  };
  venue_type: {
    id: number;
    venue_type: string;
  };
  website: string;
};

type EateryType = 'att' | 'hotel' | 'wte';

type AttractionRestaurant = {
  id: number,
  restaurant_name: string,
  info: string,
};

type Rating = {
  average_rating: number;
  body: string;
  id: number;
  name?: string;
  number_of_ratings: number;
  rating: '1' | '2' | '3' | '4' | '5',
  wheretoeat_id: number;
  created_at: string;
};

type Review = {
  id: number,
  created_at: string,
  link: string,
};

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
  rating: 1 | 2 | 3 | 4 | 5;
  name?: string;
  email?: string;
  comment?: string,
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
  key: 'blogs' | 'recipes' | 'reviews';
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

export {
  MainTab, Eatery, PlacesApiRequest, Rating, EateryType, SearchRange, ModalProps,
  VenueTypeFilterGroup, VenueTypeFilter, VenueTypeResponse, Review, SubmitRatingSignature,
  PlacesMapApiRequest, WebsiteModuleData, WebsiteDataset, WebsiteDisplaySection, RecommendAPlaceSignature,
  WhereToEatSummary, WhereToEatSummarySection, LatestEateryRatings, LatestEateries, ShopCta, AnalyticsEvent,
};
