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
            <p>Bir səhifənin tərtibatına baxarkən oxucunun oxumağa marağını itirəcəyinə dair uzun müddətdir təsdiq edilmiş bir faktdır.</p>
            <div >
              <div className='footerInfo'>
                <img src="/call.svg" alt="footer-fone" />
                <span>(012) 555-0115</span>
              </div>
              <div className='footerInfo'>
                <img src="/location.svg" alt="" />
                <span className='same'>Bakı şəhəri, Nərimanov rayonu</span>
              </div>
            </div>
          </div>

          <div id="footerCenter1">
            <h3>Ətraflı Məlumat</h3>
            <ul>
              <li><NavLink to="/home">Ana Səhifə</NavLink></li>
              <li><NavLink to="/about">Haqqımızda</NavLink></li>
              <li><NavLink to="/services">Xidmətlər</NavLink></li>
              <li><NavLink to="/shop">Mağaza</NavLink></li>
              <li><NavLink to="/blog">Bloq</NavLink></li>
            </ul>
          </div>

          <div id="footerCenter2">
            <h3>Yardım və Dəstək</h3>
            <ul>
              <li><NavLink to="/contact">Əlaqə</NavLink></li>
              <li><NavLink to="/privacy_policy">Məxfilik Siyasəti</NavLink></li>
              <li><NavLink to="/terms_conditions">Şərtlər və Qaydalar</NavLink></li>
            </ul>
          </div>

          <div id="footerRight">
  <h3>Sosial Şəbəkələr</h3>
  <span className='same'>Bizim sosial şəbəkələrdə bizi izləyin və ən son yeniliklərdən xəbərdar olun.</span>
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
            <span>©2024 Secura Bütün Hüquqlar Qorunur</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
