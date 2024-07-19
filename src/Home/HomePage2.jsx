import React from 'react'
import homePage2 from '../JSON/homePage2.json'
export default function HomePage2() {
    return (

        <div id='homepage2' className='container'>
            <div id="homePage2Left">
            <div id='titleDiv'>
                <span className='same'>WHO WE ARE</span>
                <h2>Private Security Authorised by the Police to Take Care of Your Security </h2>
                <p className='same'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum.</p>
            </div>
                <div id="boxes">
                {homePage2.map((e, index) => (
                    <div className='homeBox' key={index} style={{ backgroundColor: e.color, border: e.border }}>
                        <div className='iconsBox' style={{ backgroundColor: e.iconDivColor }}>
                            <img src={e.icon} alt="" />
                        </div>
                        <h4>{e.title}</h4>
                        <span className='same'>{e.description}</span>
                    </div>
                ))}
                </div>
            </div>
            <div id="homePage2Right">
                <img src="..//Rectangle 34624213.png" alt="" />
            </div>
        </div>
    )
}
