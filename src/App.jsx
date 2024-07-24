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

export const MyContext = createContext();

export default function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCurt] = useState([]);
  const data = { products, setProducts, cart, setCurt }

  return (
    <MyContext.Provider value={data}>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/home' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/services' element={<Services />} />
          <Route path='/blog' element={<Blog />} />
          <Route path='/shop' element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </Router>


    </MyContext.Provider>
  );
}
