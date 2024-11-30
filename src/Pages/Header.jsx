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
      const token = localStorage.getItem('token');
      if (token) {
        await axios.delete(
          'http://127.0.0.1:8000/api/logout',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        localStorage.removeItem('token'); // Token-i sil

        // Bütün localStorage məlumatlarını silmək
        localStorage.clear(); // Bütün məlumatları sil

        // React state-lərini sıfırlamaq
        setCart([]); // Cart-ı təmizləyin
        setBasketQuantity(0); // Basketin sayını sıfırlayın

        navigate('/login', '/'); // Login səhifəsinə yönləndir
      }
    } catch (error) {
      console.error('Çıxış alınmadı', error);
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
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get(
            'http://127.0.0.1:8000/api/basket/quantity',
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setBasketQuantity(response.data.total_items);
        }
      } catch (error) {
        console.error('Basketin sayı çəkilmədi', error);
      }
    };

    fetchBasketQuantity();
  }, [cart]);

  return (
    <header>
      <div id="hed">
        <div className="headerLeft">
          {/* Logo */}
          <NavLink to="/home">
            <img id="lg" src="/miniLogo.svg" alt="miniLogo" />
          </NavLink>
        </div>
        <div className="headerRight">
          {/* Əlaqə məlumatları */}
          <div className="contact">
            <div className="headerIcon">
              <img src="/call.svg" alt="call" />
            </div>
            <div className="info">
              <span className="same">Hər zaman zəng edə bilərsiniz</span>
              <span>(219) 555-0114</span>
            </div>
          </div>
          <div className="contact">
            <div className="headerIcon">
              <img src="/calendar.svg" alt="calendar" />
            </div>
            <div className="info">
              <span className="same">Təqvim vaxtı</span>
              <span>10:00am - 07:00pm</span>
            </div>
          </div>
        </div>
      </div>
      <nav>
        <div id="navLeft">
          {/* Burger menyu */}
          <div id="burgerDiv" onClick={toggleNavBar} aria-label="Nav-u açıb-bağlama">
            <img src="/burger.svg" alt="burger" />
          </div>
          {/* Menyu elementləri */}
          <ul className="navUl">
            <li><NavLink to="/home">Ana səhifə</NavLink></li>
            <li><NavLink to="/about">Haqqımızda</NavLink></li>
            <li><NavLink to="/services">Xidmətlər</NavLink></li>
            <li><NavLink to="/shop">Mağaza</NavLink></li>
            <li><NavLink to="/blog">Bloq</NavLink></li>
            <li><NavLink to="/contact">Əlaqə</NavLink></li>
          </ul>
        </div>
        <div id="navRight">
          {/* İkonlar */}
          <div id="navIcon">
            <img src="/favory.svg" alt="favorite" />
            <div id="cartCount" onClick={() => setVisibleCard(true)}>
              <img src="/shopCar.svg" alt="shop car" />
              <div><span>{basketQuantity}</span></div>
            </div>
          </div>
          {/* Logout və digər düymələr */}
          <div id="headerButtons">
            <button className="same">Təklif al</button>
            <button className="same" onClick={handleLogout}>Çıxış</button>
          </div>
        </div>
        {/* Mobil üçün açılıb-bağlanan menyu */}
        <div id="navBar" className={isNavBarOpen ? 'open' : ''}>
          <div id="closeDiv" onClick={toggleNavBar}>
            <img src="/close.svg" alt="close" />
          </div>
          <ul>
            <li><NavLink to="/home">Ana səhifə</NavLink></li>
            <li><NavLink to="/about">Haqqımızda</NavLink></li>
            <li><NavLink to="/services">Xidmətlər</NavLink></li>
            <li><NavLink to="/shop">Mağaza</NavLink></li>
            <li><NavLink to="/blog">Bloq</NavLink></li>
            <li><NavLink to="/contact">Əlaqə</NavLink></li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
