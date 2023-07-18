import React, { useEffect, useContext, useReducer } from 'react';
import reducer from '../reducers/filter_reducer';
import { useProductsContext } from './products_context';
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions';
import { Products } from './products_context';

interface Filters {
  text: string;
  company: string;
  category: string;
  color: string;
  min_price: number;
  max_price: number;
  price: number;
  shipping: boolean;
}

export type InitialStateType = {
  filtered_products: Products[];
  all_products: Products[];
  grid_view: boolean;
  sort: string;
  filters: Filters;
};

interface ContextProps {
  children: React.ReactNode;
}

type FilterContextType = InitialStateType & {
  setGridView: () => void;
  setListView: () => void;
  updateSort: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  updateFilters: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  clearFilters: () => void;
};

const initialState: InitialStateType = {
  filtered_products: [],
  all_products: [],
  grid_view: true,
  sort: 'price-lowest',
  filters: {
    text: '',
    company: 'all',
    category: 'all',
    color: 'all',
    min_price: 0,
    max_price: 0,
    price: 0,
    shipping: false,
  },
};

const FilterContext = React.createContext<FilterContextType>(
  {} as FilterContextType
);

export const FilterProvider: React.FC<ContextProps> = ({ children }) => {
  const { products } = useProductsContext() ?? { products: [] };
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: products });
  }, [products]);

  useEffect(() => {
    dispatch({ type: FILTER_PRODUCTS });
    dispatch({ type: SORT_PRODUCTS });
  }, [products, state.sort, state.filters]);

  const setGridView = () => {
    dispatch({ type: SET_GRIDVIEW });
  };

  const setListView = () => {
    dispatch({ type: SET_LISTVIEW });
  };

  const updateSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // this is just for demonstration
    // const name = event.target.name;
    const value = event.target.value;
    dispatch({ type: UPDATE_SORT, payload: value });
  };

  const updateFilters = (event: any) => {
    let name: string = '';
    let value: any = '';

    if (event.target) {
      name = event.target.name;
      value = event.target.value;

      if (name === 'text') {
        value = event.target.value.toLowerCase();
      }

      if (name === 'category') {
        value = event.target.dataset.category;
      }
      if (name === 'color') {
        value = event.target.dataset.color;
      }
      if (name === 'price') {
        value = Number(value);
      }
      if (name === 'shipping') {
        value = Boolean(value);
      }
    }

    dispatch({ type: UPDATE_FILTERS, payload: { name, value } });
  };

  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };

  return (
    <FilterContext.Provider
      value={{
        ...state,
        setGridView,
        setListView,
        updateSort,
        updateFilters,
        clearFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext);
};
