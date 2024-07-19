import React from 'react'
import Footer from '../Pages/Footer'
import Header from '../Pages/Header'
import HomePage2 from './HomePage2'
import HomeServices from './HomeServices'
import Work from './Work'
import Journey from './Journey'
import Client from './Client'
import HomeBlogs from './HomeBlogs'
import ContactUs from './ContactUs'
import Hero from './Hero'

export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <HomePage2 />
      <HomeServices />
      <Journey />
      <Work />
      <Client />
      <HomeBlogs />
      {/* <ContactUs /> */}
      <Footer />
    </div>
  )
}
