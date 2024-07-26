import React from 'react'
import Header from '../Pages/Header'
import Footer from '../Pages/Footer'
import Product from './Product'
import Description from './Description'

export default function ProductDetail() {
  return (
    <div>
      <Header/>
      <Product/>
      <Description/>
      <Footer/>
    </div>
  )
}
