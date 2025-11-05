export type OfferCardType = {
  id: string;
  title: string;
  type: string;
  price: number;
  previewImage: string;
  city: CityType;
  location: LocationType;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
};

export type OfferType = Omit<OfferCardType, 'previewImage'> & {
  description: string;
  images: string[];
  goods: string[];
  host: HostType;
  bedrooms: number;
  maxAdults: number;
};

export type LocationType = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type CityType = {
  name: string;
  location: LocationType;
};

export type Point = {
  title: string;
  latitude: number;
  longitude: number;
};

export type HostType = {
  isPro: boolean;
  name: string;
  avatarUrl: string;
};

export type HousingType = 'apartment' | 'room' | 'house' | 'hotel';

