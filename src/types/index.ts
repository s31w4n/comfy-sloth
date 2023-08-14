export interface ContextProps {
  children: React.ReactNode;
}

export interface CartItem {
  id: string;
  name: string;
  color: string;
  amount: number;
  image: string;
  price: number;
  max: number;
}

export interface Filters {
  text: string;
  company: string;
  category: string;
  color: string;
  min_price: number;
  max_price: number;
  price: number;
  shipping: boolean;
}

export interface Action {
  type: string;
  payload?: any;
}

export interface Product {
  id: string;
  stock: number;
  price: number;
  shipping: boolean;
  colors: string[];
  category: string;
  images: [{ url: string; filename: string }];
  reviews: number;
  stars: number;
  name: string;
  description: string;
  company: string;
  featured?: boolean;
}

export interface Products {
  id: string;
  stock: number;
  price: number;
  shipping: boolean;
  colors: string[];
  category: string;
  image: string;
  reviews: number;
  stars: number;
  name: string;
  description: string;
  company: string;
  featured?: boolean;
}

export interface User {
  name?: string;
  given_name?: string;
  family_name?: string;
  middle_name?: string;
  nickname?: string;
  preferred_username?: string;
  profile?: string;
  picture?: string;
  website?: string;
  email?: string;
  email_verified?: boolean;
  gender?: string;
  birthdate?: string;
  zoneinfo?: string;
  locale?: string;
  phone_number?: string;
  phone_number_verified?: boolean;
  address?: string;
  updated_at?: string;
  sub?: string;
  [key: string]: any;
}
