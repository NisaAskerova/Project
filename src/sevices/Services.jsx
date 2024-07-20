import React from 'react'
import Header from '../Pages/Header'
import Footer from '../Pages/Footer'
import ServicesHero from './ServicesHero'
import HomeServices from '../Home/HomeServices'
import Journey from '../Home/Journey'
import Work from '../Home/Work'
import Appointment from './Appointment'

export default function Services() {
    return (
        <div>
            <Header />
            <ServicesHero />
            <HomeServices />
            <Work />
            <Appointment />
            <Footer />
        </div>
    )
}
