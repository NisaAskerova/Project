import React from 'react'
import team from '../JSON/team.json'
export default function Team() {
    return (
        <div id='team'>
            <span className="same">OUR Team</span>
            <h2 className='thick'>Meet Our Professional’s Team</h2>
            <p className='same'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
            <div id='teamBoxes'>
                {team.map((e, index) => (
                    <div className='teamBox' key={index}>
                        <img src={e.image} alt="" />
                        <div>
                            <h4>{e.name}</h4>
                            <span>{e.title}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
