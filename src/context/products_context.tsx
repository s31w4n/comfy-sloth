import React, { useContext, useEffect, useReducer } from 'react';
import reducer from '../reducers/products_reducer';
import { products_url as url } from '../utils/constants';
import axios from 'axios';
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from '../actions';

export type Product = {
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
};

export type Products = {
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
};

export type InitialStateType = {
  isSidebarOpen: boolean;
  products_loading: boolean;
  products_error: boolean;
  products: Products[];
  featured_products: Products[];
  single_product_loading: boolean;
  single_product_error: boolean;
  single_product: Product;
};

interface ContextProps {
  children: React.ReactNode;
}

const initialState: InitialStateType = {
  isSidebarOpen: false,
  products_loading: false,
  products_error: false,
  products: [],
  featured_products: [],
  single_product_loading: false,
  single_product_error: false,
  single_product: {
    id: '',
    stock: 0,
    price: 0,
    shipping: false,
    colors: [],
    category: '',
    images: [{ url: '', filename: '' }],
    reviews: 0,
    stars: 0,
    name: '',
    description: '',
    company: '',
  },
};

type ProductContextType = InitialStateType & {
  openSidebar: () => void;
  closeSidebar: () => void;
  fetchSingleProduct: (url: string) => void;
};

const ProductsContext = React.createContext<ProductContextType>(
  {} as ProductContextType
);

export const ProductsProvider: React.FC<ContextProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const openSidebar = () => {
    dispatch({ type: SIDEBAR_OPEN });
  };

  const closeSidebar = () => {
    dispatch({ type: SIDEBAR_CLOSE });
  };

  const fetchProducts = async (url: string) => {
    dispatch({ type: GET_PRODUCTS_BEGIN });
    try {
      const response = await axios.get(url);
      const products = response.data;
      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: products });
    } catch (error) {
      dispatch({ type: GET_PRODUCTS_ERROR });
    }
  };

  const fetchSingleProduct = async (url: string) => {
    dispatch({ type: GET_SINGLE_PRODUCT_BEGIN });
    try {
      const response = await axios.get(url);
      const singleProduct = response.data;
      dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: singleProduct });
    } catch (error) {
      dispatch({ type: GET_SINGLE_PRODUCT_ERROR });
    }
  };

  useEffect(() => {
    fetchProducts(url);
  }, []);

  return (
    <ProductsContext.Provider
      value={{ ...state, openSidebar, closeSidebar, fetchSingleProduct }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext);
};
