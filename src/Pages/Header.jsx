import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { MyContext } from '../App';

export default function Header() {
  const [isNavBarOpen, setIsNavBarOpen] = useState(false);
  const { cart, setVisibleCard } = useContext(MyContext);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  if (!token) {
    return (window.location.href = "/login");
  }

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/me", {
      headers: {
        Authorization: `Bearer ${token}`,
        
      },
    })
  
    
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          setUser(data.data);
        } else {
          return (window.location.href = "/login");
        }
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  const handleLogout = () => {
    // Tokeni silirik və istifadəçini login səhifəsinə yönləndiririk
    localStorage.removeItem('token');
    navigate('/login');
  };
  const toggleNavBar = () => {
    setIsNavBarOpen(!isNavBarOpen);
  };

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
              <div><span>{cart.length}</span></div>
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
