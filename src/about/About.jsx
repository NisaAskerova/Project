import React from 'react'
import Header from '../Pages/Header'
import Footer from '../Pages/Footer'
import AboutHero from './AboutHero'
import AboutSecura from './AboutSecura'
import Journey from '../Home/Journey'
import Vision from './Vision'
import Client from '../Home/Client'
import ContactUs from '../Home/ContactUs'
import Team from './Team'

export default function About() {
  return (
    <div>
      <Header />
      <AboutHero />
      <AboutSecura />
      <Journey />
      <Vision />
      <Team/>
      <Client/>
      {/* <ContactUs/> */}
      <Footer />
    </div>
  )
}
