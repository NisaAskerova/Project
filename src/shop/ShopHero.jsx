import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function ShopHero() {
  const navigate = useNavigate();

  return (
    <div id='shopHero'>
      <div className='heroTitle'>
        <div>
          <span
            onClick={() => navigate('/home')}
            className='navLink'
          >
            Ana səhifə
            <img src="../../arrows.svg" alt="Arrow" className='arrow' />
          </span>
          <span>Mağaza</span>
        </div>
        <h2>Mağaza</h2>
      </div>
    </div>
  )
}
