import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Home from './Home/Home';
import About from './about/About';
import Services from './sevices/Services';
import Blog from './blog/Blog';
import Shop from './shop/Shop';
import ProductDetail from './shop/ProductDetail';
import Description from './shop/Description';
import Review from './shop/Review';
import Card from './shop/Card';
import Payment from './checkout/Payment';
import ShoppingAddressPage from './shoppingAdress/ShoppingAddressPage';
import Address from './shoppingAdress/Address';
import PaymentMethod from './shoppingAdress/PaymentMethod';
import ReviwPage from './shoppingAdress/ReviwPage';
import Contact from './contact/Contact';
import PrivacyPolicy from './privacy_policy/PrivacyPolicy';
import TermsConditions from './terms_conditions/TermsConditions';
import BlogDetail from './blog/BlogDetail';
import Order from './shoppingAdress/Order';
import { Toaster } from 'react-hot-toast'; // Toaster komponentini əlavə edirik
import Admin from './admin/Admin';
import AddServiceForm from './admin/who_we_are/AdServiceForm';
import ShowWhoWeAre from './admin/who_we_are/ShowWhoWeAre';
import UpdateMainWhoWeAre from './admin/who_we_are/UpdateMainWhoWeAre';
import UpdateServiceWhoWeAre from './admin/who_we_are/UpdateServiceWhoWeAre';
import AddHowWeWorks from './admin/how_we_works/AddHowWeWorks';
import ShowHowWeWorks from './admin/how_we_works/ShowHowWeWorks';
import UpdateHowWeWorks from './admin/how_we_works/UpdateMainHowWeWorks';
import UpdateServiceHowWeWorks from './admin/how_we_works/UpdateServiceHowWeWorks';
import AboutSecura from './about/AboutSecura';
import AddAboutSecura from './admin/about_secura/AddAboutSecura';
import ShowAboutSecura from './admin/about_secura/ShowAboutSecura';
import UpdateAboutSecura from './admin/about_secura/UpdateAboutSecura';
import AddHeroSlide from './admin/hero_slide/AddHeroSlide';
import ShowHeroSlide from './admin/hero_slide/ShowHeroSlide';
import UpdateHerSlider from './admin/hero_slide/UpdateHeroSlider';

export const MyContext = createContext();

export default function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [visibleCard, setVisibleCard] = useState(false);
  const [checkoutCart, setCheckoutCart] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [activeStep, setActiveStep] = useState('');
  const [orderCart, setOrderCart] = useState(false);

  const updateQuantity = (productId, newQuantity) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [productId]: newQuantity,
    }));

    setCart(prevCart =>
      prevCart.map(product =>
        product.id === productId ? { ...product, quantity: newQuantity } : product
      )
    );

    setCheckoutCart(prevCheckoutCart =>
      prevCheckoutCart.map(product =>
        product.id === productId ? { ...product, quantity: newQuantity } : product
      )
    );
  };

  const incrementQuantity = (productId) => {
    setQuantities(prevQuantities => {
      const newQuantity = (prevQuantities[productId] || 1) + 1;
      updateQuantity(productId, newQuantity);
      return {
        ...prevQuantities,
        [productId]: newQuantity,
      };
    });
  };

  const decrementQuantity = (productId) => {
    setQuantities(prevQuantities => {
      const currentQuantity = prevQuantities[productId] || 1;
      const newQuantity = Math.max(currentQuantity - 1, 1);
      updateQuantity(productId, newQuantity);
      return {
        ...prevQuantities,
        [productId]: newQuantity,
      };
    });
  };

  const data = {
    products, setProducts,
    cart, setCart,
    localQuantity: quantities,
    setLocalQuantity: updateQuantity,
    incrementQuantity,
    decrementQuantity,
    visibleCard,
    setVisibleCard,
    checkoutCart,
    setCheckoutCart,
    activeStep, setActiveStep,
    orderCart, setOrderCart
  };

  return (
    <MyContext.Provider value={data}>
      <Router>
        {visibleCard && <Card />}
        {orderCart && <Order />}

        {/* Toaster komponentini əlavə edirik */}
        <Toaster position="top-right" reverseOrder={false} />

        <Routes>
          <Route path='/' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/home' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/services' element={<Services />} />
          <Route path='/blog' element={<Blog />} />
          <Route path='/checkout' element={<Payment />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/contact' element={<Contact />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/product/:id" element={<ProductDetail />}>
            <Route path='description' element={<Description />} />
            <Route path='review' element={<Review />} />
          </Route>
          <Route path='/shoppingAddress' element={<ShoppingAddressPage />}>
            <Route path='address' element={<Address />} index={true} />
            <Route path='payment' element={<PaymentMethod />} />
            <Route path='reviews' element={<ReviwPage />} />
          </Route>
          <Route path='/privacy_policy' element={<PrivacyPolicy />} />
          <Route path='/terms_conditions' element={<TermsConditions />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/who_we_are' element={<AddServiceForm />} />
          <Route path='/show_who_we_are' element={<ShowWhoWeAre />} />
          <Route path="/update_who_we_are_main/:id" element={<UpdateMainWhoWeAre />} />
          <Route path="/update_who_we_are_service/:id" element={<UpdateServiceWhoWeAre />} />
          <Route path="/how_we_works" element={<AddHowWeWorks />} />
          <Route path='/show_how_we_works' element={<ShowHowWeWorks/>}/>
          <Route path="/update_how_we_works_main/:id" element={<UpdateHowWeWorks />} />
          <Route path="/update_how_we_works_service/:id" element={<UpdateServiceHowWeWorks />} />
          <Route path='/add_about_secura' element={<AddAboutSecura/>} />
          <Route path='/show_about_secura' element={<ShowAboutSecura/>} />
          <Route path='/update_about_secura/:id' element={<UpdateAboutSecura/>} />
          <Route path='/add_hero_slide' element={<AddHeroSlide/>} />
          <Route path='/show_hero_slide' element={<ShowHeroSlide/>} />
          <Route path='/update_hero_slider/:id' element={<UpdateHerSlider/>} />


        </Routes>
      </Router>
    </MyContext.Provider>
  );
}
