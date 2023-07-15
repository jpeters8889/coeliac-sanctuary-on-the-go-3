import { ComponentType, ReactNode } from 'react';

export type ApiDataResponse<T> = {
  data: T
};

export type PaginatedResponse<T> = {
  data: T[],
  next_page_url?: string
};

export type MainTab = {
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

export type MapEatery = {
  id: number;
  branch_id: number;
  lat: number;
  lng: number;
  name: number;
};

export type Eatery = {
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
  branch?: EateryBranch;
  unique_key: string;
};

export type EateryBranch = {
  id: number;
  name?: string;
  live: boolean;
  slug: string;
  lat: number;
  lng: number;
  address: string;
  formatted_address: string;
  full_location: string;
  county: {
    county: string;
    id: number;
  };
  country: {
    country: string;
    id: number;
  };
  town: {
    id: number;
    town: string;
  };
};

export type EateryType = 'att' | 'hotel' | 'wte';

export type OpeningTimes = {
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

export type AttractionRestaurant = {
  id: number,
  restaurant_name: string,
  info: string,
};

export type UserReview = {
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
  branch_name?: string;
  food_rating: FoodServiceRating;
  service_rating: FoodServiceRating;
  wheretoeat_id: number;
  created_at: string;
};

export type ReviewImage = {
  id: string;
  thumb: string;
  path: string;
};

export type StarReview = 0 | 1 | 2 | 3 | 4 | 5;

export type PlacesApiRequest = {
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

export type PlacesMapApiRequest = {
  lat: number;
  lng: number;
  range: number;
  filters?: {
    venueType: string,
  }
};

export type SearchRange = 1 | 2 | 5 | 10 | 20;

export type ModalProps = {
  visible?: boolean,
  onClose: () => void,
};

export type VenueTypeFilterGroup = {
  label: string;
  id: number;
  filters: VenueTypeFilter[];
};

export type VenueTypeFilter = {
  id: number;
  label: string;
  selected: boolean,
};

export type VenueTypeResponse = {
  id: number;
  type_id: number;
  label: string;
  count: number;
};

export type SubmitRatingSignature = {
  eateryId: number;
  rating: StarReview;
};

export type SubmitReviewSignature = {
  eateryId: number;
  rating: StarReview;
  name?: string;
  email?: string;
  foodRating: FoodServiceRating | '';
  serviceRating: FoodServiceRating | '';
  expense: StarReview;
  comment?: string;
  branchName?: string;
  images?: string[];
};

export type RecommendAPlaceSignature = {
  name: string;
  email: string;
  placeName: string;
  placeLocation: string;
  placeWebAddress?: string;
  placeDetails: string;
};

export type WebsiteModuleData = {
  architect_title: string;
  id: number,
  title: string;
  meta_description: string;
  main_image: string;
  created_at: string;
  link: string;
};

export type WebsiteDataset = {
  id: number,
  title: string;
  description: string;
  image: string;
  createdAt: string;
  link: string;
};

export type WebsiteDisplaySection = {
  title: string;
  key: 'blogs' | 'recipes';
  loading: boolean;
  items: WebsiteDataset[],
};

export type WhereToEatSummary = {
  [K: string]: number,
  eateries: number;
  attractions: number;
  hotels: number;
};

export type WhereToEatSummarySection = {
  title: string;
  key: string;
};

export type LatestEateryRatings = {
  id: number,
  eatery_id: number,
  location: string,
  rating: string,
  created_at: string,
};

export type LatestEateries = {
  id: number,
  name: string,
  location: string,
  created_at: string,
};

export type ShopCta = {
  text: string,
  link: string,
  image: string,
};

export type AnalyticsEvent = {
  type: string;
  metaData?: { [K: string]: any }
};

export type FoodServiceRating = 'excellent' | 'good' | 'poor';

export type SuggestEateryResponse = {
  address: string,
  website: string,
  gf_menu_link: string,
  phone: string,
  type_id: number,
  venue_type: SuggestEditResponseSelectGroup,
  cuisine: SuggestEditResponseSelectGroup
  opening_times: SuggestEditOpeningTime,
  features: {
    selected: {
      id: number,
      label: string
    }[],
    values: SuggestEditResponseSelectGroupFields[],
  },
  is_nationwide: boolean
};

export type SuggestEditResponseSelectGroup = {
  id?: number,
  value?: number | string,
  label: string,
  values: SuggestEditResponseSelectGroupFields[];
};

export type SuggestEditResponseSelectGroupFields = {
  value: number,
  label: string,
  selected: boolean
};

// eslint-disable-next-line max-len
export type SuggestEditResponseOpeningTimeDays = 'today' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

export type SuggestEditField = {
  id: string,
  label: string,
  shouldDisplay: boolean,
  getter: () => string | null,
  component: SuggestEditFormField | SuggestEditSelectField | SuggestEditFeaturesField | SuggestEditOpeningTimesField,
  capitalise?: boolean,
  truncate?: boolean,
  updated: boolean,
};

export type SuggestEditFormField = {
  component: 'input' | 'textarea' | 'select' | 'features' | 'opening-times',
  value?: () => string | number,
  props?: {
    [K: string]: any
  },
  componentProps?: { [K:string]: any }
};

export type SuggestEditSelectField = SuggestEditFormField & {
  component: 'select',
  props?: {
    [K: string]: any,
    options: any[],
  }
};

export type SuggestEditFeaturesField = SuggestEditFormField & {
  component: 'features',
  props: {
    currentFeatures: {
      id: number,
      label: string,
      selected: boolean
    }[],
  },
};

export type SuggestEditOpeningTimesField = SuggestEditFormField & {
  component: 'opening-times',
  props: {
    currentOpeningTimes: SuggestEditOpeningTime,
  },
};

export type SuggestEditOpeningTime = {
  [K in SuggestEditResponseOpeningTimeDays]: [string, string]
};
