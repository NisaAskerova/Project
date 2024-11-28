import React from 'react'
import Admin from '../Admin'
import { useNavigate } from 'react-router-dom';

export default function AllAddress() {
    const navigate=useNavigate();

    return (
        <>
            <Admin />
            <div className='adminHero'>
                <button className="add-button" onClick={() => navigate('/show_state')}>State</button>
                <button className="add-button" onClick={() => navigate('/show_cities')}>City</button>
            </div>
        </>
    )
}
