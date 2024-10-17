import { createContext, useContext } from 'react';

const initialState = {
  category: '',
  subCategory: '',
};

export const SearchContext = createContext<any>(initialState);
