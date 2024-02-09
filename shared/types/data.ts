export interface PinPlace {
  pin_id: string;
  places_id: string;
  list_id: string;
  user_id: string;
  pin_name: string;
  name: string;
  notes: string;
  places_photo_url: string;
  pin_photo_url: string | null;
  bookmark_count: number;
  lat: number;
  lng: number;
  formatted_address: string;
  maps_url: string;
  created_at: string;
  visited: boolean;
  visited_at: string | null;
  rating: number | null;
  review: string | null;
  review_updated_at: string | null;
  copied_from_pin_id: string | null;
  deviation_count: number;
  isPrivate: boolean;
  updated_at: string | null;
  opening_hours: {} | null;
  phone_number: string | null;
  price_level: number | null;
  types: string[];
  website: string | null;
}

type ListID = string;

export interface List {
  list_id: ListID;
  user_id: string;
  name: string;
  description: string;
  list_photo_url: string;
  followers_count: number;
  isPrivate: boolean;
  created_at: string;
  updated_at: string;
}

export interface ListPins extends List {
  pins: PinPlace[];
}

export interface Lists {
  [key: ListID]: ListPins;
}
