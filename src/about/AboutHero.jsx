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
            Ana səhifə
            <img src="../../arrows.svg" alt="Arrow" className='arrow' />
          </span>
          <span>Haqqımızda</span>
        </div>
        <h2>Haqqımızda</h2>
      </div>
    </div>
  )
}
