import { Routes, Route } from 'react-router-dom'
import { UIProvider } from './context/UIContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { WishlistProvider } from './context/WishlistContext.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { RecentlyViewedProvider } from './context/RecentlyViewedContext.jsx'
import ScrollToTop from './components/common/ScrollToTop.jsx'
import Layout from './components/layout/Layout.jsx'

import Home from './pages/Home.jsx'
import Collection from './pages/Collection.jsx'
import ProductDetails from './pages/ProductDetails.jsx'
import Search from './pages/Search.jsx'
import Cart from './pages/Cart.jsx'
import Wishlist from './pages/Wishlist.jsx'
import Checkout from './pages/Checkout.jsx'
import OrderSuccess from './pages/OrderSuccess.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Account from './pages/Account.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import FAQ from './pages/FAQ.jsx'
import Policy from './pages/Policy.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <UIProvider>
      <AuthProvider>
        <WishlistProvider>
          <CartProvider>
            <RecentlyViewedProvider>
              <ScrollToTop />
              <Routes>
                <Route element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="collections/:category" element={<Collection />} />
                  <Route path="products/:slug" element={<ProductDetails />} />
                  <Route path="search" element={<Search />} />
                  <Route path="cart" element={<Cart />} />
                  <Route path="wishlist" element={<Wishlist />} />
                  <Route path="checkout" element={<Checkout />} />
                  <Route path="order-success" element={<OrderSuccess />} />
                  <Route path="login" element={<Login />} />
                  <Route path="register" element={<Register />} />
                  <Route path="account" element={<Account />} />
                  <Route path="about" element={<About />} />
                  <Route path="contact" element={<Contact />} />
                  <Route path="faq" element={<FAQ />} />
                  <Route path="shipping-policy" element={<Policy key="shipping" type="shipping" />} />
                  <Route path="return-policy" element={<Policy key="returns" type="returns" />} />
                  <Route path="privacy-policy" element={<Policy key="privacy" type="privacy" />} />
                  <Route path="terms" element={<Policy key="terms" type="terms" />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </RecentlyViewedProvider>
          </CartProvider>
        </WishlistProvider>
      </AuthProvider>
    </UIProvider>
  )
}
