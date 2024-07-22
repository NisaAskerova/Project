import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Header() {
  const [isNavBarOpen, setIsNavBarOpen] = useState(false);


  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/');
  };

  const toggleNavBar = () => {
    setIsNavBarOpen(!isNavBarOpen);
  };

  return (
    <>
      <header>
        <div id='hed'>
          <div className='headerLeft'>
            <img src="/miniLogo.svg" alt="miniLogo" />
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
            <div id='burgerDiv' onClick={toggleNavBar}>
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
              <img src="./search.svg" alt="search" />
              <img src="./favory.svg" alt="favorite" />
              <div id='cartCount'>
                <img src="./shopCar.svg" alt="shop car" />
                <div><span>2</span></div>
              </div>
            </div>
            <div id='headerButtons'>
              <button className='same'>Get a Quote</button>
              <button onClick={handleLogin}>Login</button>
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
    </>
  );
}
