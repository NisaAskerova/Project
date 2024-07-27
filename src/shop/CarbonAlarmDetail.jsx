import React from 'react'
import Header from '../Pages/Header'
import Footer from '../Pages/Footer'
import Description from './Description'
import CarbonAlarmProduct from './CarbonAlarmProduct'
export default function CarbonAlarmDetail() {
  return (
    <div>
    <Header/>
    <CarbonAlarmProduct/>
    <Description/>
    <Footer/>
  </div>
  )
}
