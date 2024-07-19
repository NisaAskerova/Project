import React from 'react';
import client from '../JSON/client.json';

export default function Client() {
    return (
        <div id='client'>
            <div>
                <span className="same">CLIENT’S TESTIMONIALS</span>
                <h2 className="thick">What Our Customer Say’s About Us</h2>
                <p className="same">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                     The point of using Lorem Ipsum.</p>
            </div>
            <div id='clientBoxes'>
                {client.map((e, index) => (
                    <div className='clientBox' key={index}>
                        <div>
                            {Array.from({ length: e.rating }, (_, i) => (
                                <img key={i} src={e.icon} alt="star" />
                            ))}
                        </div>
                        <p className='same'>{e.review}</p>
                        <div className='clientInfo'>
                            <div>
                                <img src={e.image} alt={e.name} />
                            </div>
                            <div>
                                <strong>{e.name}</strong>
                                <span>{e.title}</span>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
