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
                Home
                <img src="../../arrows.svg" alt="Arrow" className='arrow' />
              </span>
          <span>Services</span>
        </div>
        <h2>Services</h2>
      </div>
    </div>
  )
}
