import React, { useContext } from 'react'
import Header from '../Pages/Header'
import Footer from '../Pages/Footer'
import Product from './Product'
import RelatedProducts from './RelatedProducts'
import { MyContext } from '../App';

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
