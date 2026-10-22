import { createContext, useContext } from "react";
const ProductContext = createContext({
    products: [],
    loading: true,
    error: null,
    loadProducts: async () => { },
    refreshProducts: async () => { },
});
const FilterContext = createContext({
    filters: {
        query: "",
        category: "all",
        grades: [],
        locations: [],
        brands: [],
        specs: [],
        coverages: [],
        minPrice: 0,
        maxPrice: 999999,
        tab: "all",
    },
    setFilters: () => { },
    resetFilters: () => { },
});
const ShippingContext = createContext({
    shipments: [],
    loading: true,
    error: null,
    refreshShipments: async () => { },
});
export const ProductProvider = ({ children }) => {
    // ... implementation would load products from API
    return value;
    {
        {
            products: [], loading;
            true, error;
            null, loadProducts;
            async(), refreshProducts;
            async () => { }, ;
        }
        as;
        ProductContextState;
    }
     > { children } < /ProductContext.Provider>;
};
export const FilterProvider = ({ children }) => {
    return value;
    {
        {
            filters: {
                query: "", category;
                "all", grades;
                [], locations;
                [], brands;
                [], specs;
                [], coverages;
                [], minPrice;
                0, maxPrice;
                999999, tab;
                "all";
            }
            setFilters: () => { }, resetFilters;
            () => { };
        }
    }
     > { children } < /FilterContext.Provider>;
};
export const ShippingProvider = ({ children }) => {
    return value;
    {
        {
            shipments: [], loading;
            true, error;
            null, refreshShipments;
            async () => { }, ;
        }
    }
     > { children } < /ShippingContext.Provider>;
};
export const useProductContext = () => useContext(ProductContext);
export const useFilterContext = () => useContext(FilterContext);
export const useShippingContext = () => useContext(ShippingContext);
export { ProductContext, FilterContext, ShippingContext };
