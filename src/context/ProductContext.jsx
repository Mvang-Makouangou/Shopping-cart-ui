import {createContext, useContext} from "react";

export const ProductContext = createContext();

export function useProducts() {
    return useContext(ProductContext)
};