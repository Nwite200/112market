import { BrowserRouter, Route, Routes } from "react-router-dom"
import DefaultLayout from "./components/layout/DefaultLayout"
import { ShopProvider } from "./context/ShopContext"
import Home from "./pages/Home"
import Products from "./pages/Products"
import Category from "./pages/Category"
import ProductDetail from "./pages/ProductDetail"
import CartPage from "./pages/Cart"
import Checkout from "./pages/Checkout"
import Support from "./pages/Support"
import About from "./pages/About"
import DeliveryReturns from "./pages/DeliveryReturns"
import Privacy from "./pages/Privacy"
import Terms from "./pages/Terms"
import NotFound from "./pages/NotFound"

/** Route table for the 112 Market storefront. */
export const routes = [
  { path: "/", element: <Home /> },
  { path: "/products", element: <Products /> },
  { path: "/category/:slug", element: <Category /> },
  { path: "/product/:slug", element: <ProductDetail /> },
  { path: "/cart", element: <CartPage /> },
  { path: "/checkout", element: <Checkout /> },
  { path: "/support", element: <Support /> },
  { path: "/about", element: <About /> },
  { path: "/delivery-returns", element: <DeliveryReturns /> },
  { path: "/privacy", element: <Privacy /> },
  { path: "/terms", element: <Terms /> },
  { path: "*", element: <NotFound /> },
]

export default function App() {
  return (
    <BrowserRouter>
      <ShopProvider>
        <Routes>
          <Route element={<DefaultLayout />}>
            {routes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Route>
        </Routes>
      </ShopProvider>
    </BrowserRouter>
  )
}
