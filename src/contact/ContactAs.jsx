import React, { Component } from 'react'
import Touch from './Touch'

export default class ContactAs extends Component {
  render() {
    return (
      <>
        <div id='contactAs'>
          <div className='heroTitle'>
            <div>
              <span>Home</span>
              <img src="./arrows.svg" alt="" />
              <span>Contact Us</span>
            </div>
            <h2>Contact Us</h2>
          </div>
        </div>
        <Touch/>
      </>
    )
  }
}
