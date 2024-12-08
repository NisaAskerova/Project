import React, { useContext, useEffect, useState, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { MyContext } from '../App';
import axios from 'axios';

export default function Header() {
  const [isNavBarOpen, setIsNavBarOpen] = useState(false);
  const { cart, setCart, setVisibleCard } = useContext(MyContext);
  const [basketQuantity, setBasketQuantity] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const searchInputRef = useRef(null);
  const searchResultsRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        await axios.delete('http://127.0.0.1:8000/api/logout', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        localStorage.clear();
        setCart([]);
        setBasketQuantity(0);
        navigate('/login');
      }
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    } else {
      setSearchTerm('');
      setSearchResults([]);
    }
  };

  const toggleNavBar = () => {
    console.log('Toggling NavBar'); // Check if this is printed on click
    setIsNavBarOpen(!isNavBarOpen);
  };

  const handleSearchChange = async (e) => {
    const searchQuery = e.target.value;
    setSearchTerm(searchQuery);

    if (searchQuery.trim() !== '') {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/products/search-products', {
          params: { query: searchQuery },
        });
        setSearchResults(response.data);
      } catch (error) {
        console.error('Search error:', error);
      }
    } else {
      setSearchResults([]);
    }
  };


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
        console.error('Failed to fetch basket quantity', error);
      }
    };

    fetchBasketQuantity();
  }, [cart]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchResultsRef.current &&
        !searchResultsRef.current.contains(event.target) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target)
      ) {
        setIsSearchOpen(false);
        setSearchResults([]);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <header>
      <div id="hed">
        <div className="headerLeft">
          <NavLink to="/home">
            <img id="lg" src="/miniLogo.svg" alt="miniLogo" />
          </NavLink>
        </div>
        <div className="headerRight">
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
          <div id="navIcon">
            {isSearchOpen && (
              <form id="searchForm">
                <input
                  className='same'
                  ref={searchInputRef}
                  type="search"
                  placeholder="Axtar..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <div><span className='same' onClick={handleSearchToggle}>X</span></div>
              </form>
            )}
            {!isSearchOpen && (
              <img className='searchImg' src="/search.svg" alt="search" onClick={handleSearchToggle} />
            )}
            <img src="/favory.svg" alt="favorite" />
            <div id="cartCount" onClick={() => setVisibleCard(true)}>
              <img src="/shopCar.svg" alt="shop car" />
              <div><span>{basketQuantity}</span></div>
            </div>
          </div>
          <div id="headerButtons">
            <button className="same" onClick={handleLogout}>Çıxış</button>
          </div>
        </div>
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

      {searchResults.length > 0 && isSearchOpen && (
        <div id="searchResults" ref={searchResultsRef}>
          <table>
            <tbody>
              {searchResults.map(product => (
                <tr key={product.id} onClick={() => navigate(`/product/${product.id}`)}>
                  <td>
                    <img src={`http://localhost:8000/storage/${product.image}`} alt={product.name} />
                  </td>
                  <td className='same thSame'>
                    <strong>{product.brands ? product.brands[0]?.name : 'Brend yoxdur'} </strong>| {product.title}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </header>
  );
}
