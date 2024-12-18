import React from 'react'
import FavoriteHero from './FavoriteHero'
import Header from '../Pages/Header'
import Footer from '../Pages/Footer'
import FavoritesPage from './FavoritesPage'

export default function Favorite() {
    return (
        <div>
            <Header />
            <FavoriteHero />
            <FavoritesPage/>
            <Footer />

        </div>
    )
}
