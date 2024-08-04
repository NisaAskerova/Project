import React, { useContext } from 'react'
import Product from './Product'
import RelatedProducts from './RelatedProducts'
import Header from '../Pages/Header'
import Footer from '../Pages/Footer'


export default function ProductDetail() {

  return (
    <div>
      <Header/>
      <Product/>
      <RelatedProducts/>
      <Footer/>
    </div>
  )
}
