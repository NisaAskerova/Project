import React from 'react'
import BlogHero from './BlogHero'

import BlogPage2 from './BlogPage2'
import Header from '../Pages/Header'
import Footer from '../Pages/Footer'

export default function Blog() {
    return (
        <div>
            <Header/>
            <BlogHero />
            <BlogPage2/>
            <Footer/>
        </div>
    )
}
