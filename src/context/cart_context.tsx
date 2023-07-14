import React, { useEffect, useContext, useReducer } from 'react';
import reducer from '../reducers/cart_reducer';
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from '../actions';
import { Product } from './products_context';

export type Cart = {
  id: string;
  name: string;
  color: string;
  amount: number;
  image: string;
  price: number;
  max: number;
};

export type InitialStateType = {
  cart: Cart[];
  total_items: number;
  total_amount: number;
  shipping_fee: number;
};

export type CartContextType = InitialStateType & {
  addToCart: (
    id: string,
    color: string,
    amount: number,
    product: Product
  ) => void;
  removeItem: (id: string) => void;
  toggleAmount: (id: string, value: string) => void;
  clearCart: () => void;
};

interface ContextProps {
  children: React.ReactNode;
}

// check for existing an item in the local storage
const getLocalStorage = (): [] => {
  let cart = localStorage.getItem('cart');
  if (cart) {
    return JSON.parse(cart);
  } else {
    return [];
  }
};

const initialState: InitialStateType = {
  cart: getLocalStorage(),
  total_items: 0,
  total_amount: 0,
  shipping_fee: 534,
};

export const CartContext = React.createContext<CartContextType>(
  {} as CartContextType
);

export const CartProvider: React.FC<ContextProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // add to cart
  const addToCart = (
    id: string,
    color: string,
    amount: number,
    product: Product
  ) => {
    dispatch({ type: ADD_TO_CART, payload: { id, color, amount, product } });
  };

  // remove item
  const removeItem = (id: string) => {
    dispatch({ type: REMOVE_CART_ITEM, payload: id });
  };

  // toggle amount
  const toggleAmount = (id: string, value: string) => {
    dispatch({ type: TOGGLE_CART_ITEM_AMOUNT, payload: { id, value } });
  };

  // clear cart
  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  // add the cart to the local storage
  useEffect(() => {
    dispatch({ type: COUNT_CART_TOTALS });
    localStorage.setItem('cart', JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <CartContext.Provider
      value={{ ...state, addToCart, removeItem, toggleAmount, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
// make sure use
export const useCartContext = () => {
  return useContext(CartContext);
};
