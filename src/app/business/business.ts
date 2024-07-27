export interface BusinessProfile {
  id: string;
  logo: string;
  categories: string[];
  name: string;
  slug: string;
  description: string;
  address: string;
  city: string;
  state: string;
  postal_code: string | null;
  country: string;
  is_verified: boolean;
  is_approved: boolean;
  have_branches: boolean;
  owner: string;
  parent: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  hours: any[];
  user_favorite: boolean
  // message: string;
}

export interface Stastics {
  weighted_average: number;
  review_count: number;
}

export interface BusinessData {
  profile: BusinessProfile;
  stastics: Stastics;
}
