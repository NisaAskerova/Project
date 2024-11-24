import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { MyContext } from '../App';
import axios from 'axios';

export default function Header() {
  const [isNavBarOpen, setIsNavBarOpen] = useState(false);
  const { cart, setCart, setVisibleCard } = useContext(MyContext);
  const [basketQuantity, setBasketQuantity] = useState(0);
  const navigate = useNavigate();

  // Çıxış funksiyası (logout)
  const handleLogout = async () => {
    try {
      await axios.post('http://127.0.0.1:8000/api/logout'); // Backend-ə logout sorğusu göndəririk
      navigate('/login'); // Logoutdan sonra login səhifəsinə yönləndiririk
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  // NavBar-ı açıb-bağlama funksiyası
  const toggleNavBar = () => {
    setIsNavBarOpen(!isNavBarOpen);
  };

  // Basketin sayını backend-dən çəkmək üçün API çağırışı
  useEffect(() => {
    const fetchBasketQuantity = async () => {
      try {
        const token = localStorage.getItem('token');  // Assuming the token is stored in localStorage
        const response = await axios.get('http://127.0.0.1:8000/api/basket/quantity', {
          headers: {
            Authorization: `Bearer ${token}`,  // Include token in headers
          }
        });
        setBasketQuantity(response.data.total_items);  // Fərqli məhsulların sayını təyin et
      } catch (error) {
        console.error("Basket quantity fetch failed", error);
      }
    };
  
    fetchBasketQuantity();
  }, [cart]);
  
  
  return (
    <header>
      <div id='hed'>
        <div className='headerLeft'>
          <img id='lg' src="/miniLogo.svg" alt="miniLogo" />
        </div>
        <div className="headerRight">
          <div className='contact'>
            <div className="headerIcon">
              <img src="/call.svg" alt="call" />
            </div>
            <div className='info'>
              <span className='same'>Make Call Anytime</span>
              <span>(219) 555-0114</span>
            </div>
          </div>
          <div className="contact">
            <div className="headerIcon">
              <img src="/calendar.svg" alt="calendar" />
            </div>
            <div className='info'>
              <span className='same'>Appointment Time</span>
              <span>10:00am - 07:00pm</span>
            </div>
          </div>
        </div>
      </div>
      <nav>
        <div id='navLeft'>
          <div id='burgerDiv' onClick={toggleNavBar} aria-label="Toggle Navigation">
            <img src="burger.svg" alt="burger" />
          </div>
          <ul className='navUl'>
            <li><NavLink to="/home">Home</NavLink></li>
            <li><NavLink to="/about">About Us</NavLink></li>
            <li><NavLink to="/services">Services</NavLink></li>
            <li><NavLink to="/shop">Shop</NavLink></li>
            <li><NavLink to="/blog">Blog</NavLink></li>
            <li><NavLink to="/contact">Contact Us</NavLink></li>
          </ul>
        </div>
        <div id='navRight'>
          <div id='navIcon'>
            <img src="/search.svg" alt="search" />
            <img src="/favory.svg" alt="favorite" />
            <div id='cartCount' onClick={() => setVisibleCard(true)}>
              <img src="/shopCar.svg" alt="shop car" />
              <div><span>{basketQuantity}</span></div>
            </div>
          </div>
          <div id='headerButtons'>
            <button className='same'>Get a Quote</button>
            <button className='same' onClick={handleLogout}>Logout</button>
          </div>
        </div>
        <div id='navBar' className={isNavBarOpen ? 'open' : ''}>
          <div id='closeDiv' onClick={toggleNavBar}>
            <img src="close.svg" alt="close" />
          </div>
          <ul>
            <li><NavLink to="/home">Home</NavLink></li>
            <li><NavLink to="/about">About Us</NavLink></li>
            <li><NavLink to="/services">Services</NavLink></li>
            <li><NavLink to="/shop">Shop</NavLink></li>
            <li><NavLink to="/blog">Blog</NavLink></li>
            <li><NavLink to="/contact">Contact Us</NavLink></li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
