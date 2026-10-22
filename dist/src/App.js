import { jsx as _jsx } from "react/jsx-runtime";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DefaultLayout from "./components/layout/DefaultLayout";
import { ShopProvider } from "./context/ShopContext";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Category from "./pages/Category";
import ProductDetail from "./pages/ProductDetail";
import CartPage from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Support from "./pages/Support";
import About from "./pages/About";
import DeliveryReturns from "./pages/DeliveryReturns";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";
import Transition from "./components/layout/Transition";
/** Route table for the 112 Market storefront. */
export const routes = [
    { path: "/", element: _jsx(Home, {}) },
    { path: "/products", element: _jsx(Products, {}) },
    { path: "/category/:slug", element: _jsx(Category, {}) },
    { path: "/product/:slug", element: _jsx(ProductDetail, {}) },
    { path: "/cart", element: _jsx(CartPage, {}) },
    { path: "/checkout", element: _jsx(Checkout, {}) },
    { path: "/support", element: _jsx(Support, {}) },
    { path: "/about", element: _jsx(About, {}) },
    { path: "/delivery-returns", element: _jsx(DeliveryReturns, {}) },
    { path: "/privacy", element: _jsx(Privacy, {}) },
    { path: "/terms", element: _jsx(Terms, {}) },
    { path: "*", element: _jsx(NotFound, {}) },
];
export default function App() {
    return (_jsx(BrowserRouter, { children: _jsx(ShopProvider, { children: _jsx(Transition, { children: _jsx(Routes, { children: _jsx(Route, { element: _jsx(DefaultLayout, {}), children: routes.map(({ path, element }) => (_jsx(Route, { path: path, element: element }, path))) }) }) }) }) }));
}
