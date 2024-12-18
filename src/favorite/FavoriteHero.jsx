import React from 'react'

export default function FavoriteHero() {
  return (
    <div id='favoriteHero'>
    <div className='heroTitle'>
      <div>
        <span
          onClick={() => navigate('/home')}
          className='navLink'
        >
          Ana səhifə
          <img src="../../arrows.svg" alt="Arrow" className='arrow' />
        </span>
        <span>Favoritlər</span>
      </div>
      <h2>Favoritlər</h2>
    </div>
  </div>
  )
}
