export interface EventListResponse {
  _embedded?: {
    events: Event[];
  };
  page?: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}

export interface Event {
  id: string;
  name: string;
  type?: string;
  url?: string;
  images?: EventImage[];
  dates?: {
    start?: {
      localDate?: string;
      localTime?: string;
      dateTime?: string;
    };
  };
  _embedded?: {
    venues?: Venue[];
  };
  priceRanges?: PriceRange[];
}

export interface EventImage {
  ratio?: string;
  url: string;
  width: number;
  height: number;
}

export interface Venue {
  name: string;
  city?: {
    name: string;
  };
  state?: {
    name: string;
  };
  country?: {
    name: string;
  };
}

export interface PriceRange {
  type?: string;
  currency?: string;
  min: number;
  max: number;
}
