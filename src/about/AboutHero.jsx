import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function AboutHero() {
  const navigate = useNavigate();
  return (
    <div id='aboutHero'>
      <div className='heroTitle'>
        <div>
          <span
            onClick={() => navigate('/home')}
            className='navLink'
          >
            Home
            <img src="../../arrows.svg" alt="Arrow" className='arrow' />
          </span>
          <span>About Us</span>
        </div>
        <h2>About Us</h2>
      </div>
    </div>
  )
}
