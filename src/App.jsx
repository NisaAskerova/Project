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


export const MyContext = createContext();

export default function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [visibleCard, setVisibleCard] = useState(false);
  const [localQuantity, setLocalQuantity] = useState(1);

  const data = {
    products, setProducts,
    cart, setCart,
    visibleCard, setVisibleCard,
    localQuantity, setLocalQuantity
  };

  return (
    <MyContext.Provider value={data}>
      {visibleCard ? <Card/> : null}
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/home' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/services' element={<Services />} />
          <Route path='/blog' element={<Blog />} />
          <Route path='/shop' element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} >
            <Route path='description' element={<Description />} />
            <Route path='review' element={<Review />} />
          </Route>
        </Routes>
      </Router>
    </MyContext.Provider>
  );
}
