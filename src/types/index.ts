import { ComponentType, ReactNode } from 'react';

type MainTab = {
  name: string,
  title: string,
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
  restaurants: [];
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
  range?: SearchRange;
  filters?: {
    venueType: string,
  }
  page: number,
  limit: number,
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

export {
  MainTab, Eatery, PlacesApiRequest, Rating, EateryType, SearchRange, ModalProps,
  VenueTypeFilterGroup, VenueTypeFilter, VenueTypeResponse, Review, SubmitRatingSignature,
};
