import React from 'react'
import AboutHero from './AboutHero'
import AboutSecura from './AboutSecura'
import Journey from '../Home/Journey'
import Vision from './Vision'
import Client from '../Home/Client'
import Team from './Team'
import Header from '../Pages/Header'
import Footer from '../Pages/Footer'

export default function About() {
  return (
    <div>
      <Header/>
      <AboutHero />
      <AboutSecura />
      <Journey />
      <Vision />
      <Team/>
      <Client/>
      <Footer/>
    </div>
  )
}
