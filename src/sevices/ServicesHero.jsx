import React from 'react'

export default function ServicesHero() {
  return (
    <div id='servicesHero'>
      <div className='heroTitle'>
        <div>
        <span
                onClick={() => navigate('/home')}
                className='navLink'
              >
                Ana səhifə
                <img src="../../arrows.svg" alt="Arrow" className='arrow' />
              </span>
          <span>Xidmətlər</span>
        </div>
        <h2>Xidmətlər</h2>
      </div>
    </div>
  )
}
