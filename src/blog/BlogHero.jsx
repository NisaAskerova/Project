import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function BlogHero() {
  const navigate = useNavigate();

  return (
    <div id='blogHero'>
      <div className='heroTitle'>
        <div>
          <span
            onClick={() => navigate('/home')}
            className='navLink'
          >
            Ana səhifə
            <img src="../../arrows.svg" alt="Arrow" className='arrow' />
          </span>
          <span>Bloq</span>
        </div>
        <h2>Bloq</h2>
      </div>
    </div>
  )
}
