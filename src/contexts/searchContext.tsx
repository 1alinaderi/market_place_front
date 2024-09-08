import { createContext, useContext } from "react";

const initialState = {
    category: "",
};

export const SearchContext = createContext<any>(initialState)