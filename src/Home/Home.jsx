import React from 'react'
import HomePage2 from './HomePage2'
import HomeServices from './HomeServices'
import Work from './Work'
import Journey from './Journey'
import Client from './Client'
import HomeBlogs from './HomeBlogs'
import Hero from './Hero'
import Header from '../Pages/Header'
import Footer from '../Pages/Footer'

export default function Home() {
  return (
    <>
      <Header/>
      <Hero />
      <HomePage2 />
      <HomeServices />
      <Journey />
      <Work />
      <Client />
      <HomeBlogs />
      <Footer/>
    </>
  )
}
