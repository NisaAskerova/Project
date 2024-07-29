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
import CarbonAlarmDetail from './shop/CarbonAlarmDetail';
import LeakageDetectorDetail from './shop/LeakageDetectorDetail';


export const MyContext = createContext();

export default function App() {
  const [products, setProducts] = useState([]);
  const [detector, setDetector] = useState([]);
  const [smoke, setSmoke] = useState([]);
  const [home, setHome] = useState([]);
  const [carbon, setCarbon] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  const data = {
    products, setProducts,
    cart, setCart,
    carbon, setCarbon,
    detector, setDetector,
    home, setHome,
    smoke, setSmoke,
    selectedCategory, setSelectedCategory,
    selectedBrand, setSelectedBrand,
    priceRange, setPriceRange,
    selectedTags, setSelectedTags,
    filteredProducts, setFilteredProducts
  };

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
          <Route path="/carbon_alarm_product/:id" element={<CarbonAlarmDetail />} />
          <Route path="/leakage_detector/:id" element={<LeakageDetectorDetail />} />
          <Route path="/product/:id" element={<ProductDetail />} >
            <Route path='description' element={<Description />} />
          </Route>
        </Routes>
      </Router>
    </MyContext.Provider>
  );
}
