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
                Ana səhifə
                <img src="../../arrows.svg" alt="Arrow" className='arrow' />
              </span>
              <span>Əlaqə</span>
            </div>
            <h2>Əlaqə</h2>
          </div>
        </div>
        <Touch />
      </>
    )
  
}
