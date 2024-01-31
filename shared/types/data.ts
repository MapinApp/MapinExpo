export interface User {
  dob: string;
  email: string;
  first_name: string;
  last_name: string;
  created_at: string;
  gender: string;
  username: string;
  profile_photo_url: string;
  stats: {
    posts: number;
    followers: number;
    following: number;
  };
  bio: string;
}

export interface List {
  list_id: number;
  user_id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  private: boolean;
  cover_image_url: string;
  pinIds: number[];
}

export interface Pin {
  pin_id: number;
  user_id: number;
  pin_photo_id: number;
  pin_name: string;
  address_str: string;
  lat: number;
  lng: number;
  notes: string;
  created_at: string;
}
