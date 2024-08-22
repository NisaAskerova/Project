import React from 'react'
import { NavLink } from 'react-router-dom'
import ContactUs from '../Home/ContactUs'

export default function Footer() {
  return (
    <div id='foot'>
      <ContactUs />
      <footer>
        <div id='information'>
          <div id="footerLeft">
            <img src="/miniLogo.svg" alt="footerLogo" />
            <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
            <div >
              <div className='footerInfo'>
                <img src="/call.svg" alt="footer-fone" />
                <span>(505) 555-0125</span>
              </div>
              <div className='footerInfo'>
                <img src="/location.svg" alt="" />
                <span className='same'>2715 Ash Dr. San Jose, South Dakota 83475</span>
              </div>
            </div>
          </div>

          <div id="footerCenter1">
            <h3>Information</h3>
            <ul>
              <li><NavLink to="/home">Home</NavLink></li>
              <li><NavLink to="/about">About Us</NavLink></li>
              <li><NavLink to="/services">Services</NavLink></li>
              <li><NavLink to="/shop">Shop</NavLink></li>
              <li><NavLink to="/blog">Blog</NavLink></li>
            </ul>
          </div>

          <div id="footerCenter2">
            <h3>Help & Support</h3>
            <ul>
              <li><NavLink to="/contact">Contact Us</NavLink></li>
              <li><NavLink to="/privacy_policy">Privacy Policy</NavLink></li>
              <li><NavLink to="/terms_conditions">Terms & Conditions</NavLink></li>
              <li><NavLink to="">FAQ’S</NavLink></li>
              <li><NavLink to="">Disclaimer</NavLink></li>
            </ul>
          </div>

          <div id="footerRight">
            <h3>Social Media</h3>
            <span className='same'>Lorem ipsum dolor sit amet,
              consectetur adipiscing elit.</span>
            <div id='mediaIcons'>
              <img src="/facebook.svg" alt="faceIcon" />
              <img src="/instagram.svg" alt="instaIcon" />
              <img src="/twitter.svg" alt="twitterIcon" />
            </div>
          </div>
        </div>
        <div id='footerEnd'>
          <div id='line'></div>
          <div id='end'>
            <span>©2023 Secura All Rights are reserved️ </span>
          </div>
        </div>
      </footer>

    </div>
  )
}
