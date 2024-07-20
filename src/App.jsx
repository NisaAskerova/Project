import React, { createContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Home from './Home/Home';
import ContactUs from './Home/ContactUs';
import About from './about/About';
import Services from './sevices/Services';
import Blog from './blog/Blog';

export default function App() {
  const MyContext = createContext();

  return (
    <MyContext.Provider>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='signup' element={<Signup />} />
          <Route path='/home' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/services' element={<Services />} />
          <Route path='blog' element={<Blog/>}/>
        </Routes>
      </Router>


    </MyContext.Provider>
  );
}
