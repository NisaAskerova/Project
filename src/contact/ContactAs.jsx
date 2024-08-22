import React, { Component } from 'react'
import Touch from './Touch'
import { useNavigate } from 'react-router-dom';

export default function  ContactAs() {
    const navigate = useNavigate();

    return (
      <>
        <div id='contactAs'>
          <div className='heroTitle'>
            <div>
              <span
                onClick={() => navigate('/home')}
                className='navLink'
              >
                Home
                <img src="../../arrows.svg" alt="Arrow" className='arrow' />
              </span>
              <span>Contact Us</span>
            </div>
            <h2>Contact Us</h2>
          </div>
        </div>
        <Touch />
      </>
    )
  
}
