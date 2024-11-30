import React from 'react';
import client from '../JSON/client.json';

export default function Client() {
    return (
        <div id='client'>
            <div>
                <span className="same">MÜŞTERİLƏRİN RƏYLƏRİ</span>
                <h2 className="thick">Müştərilərimiz Bizim Haqqımızda Nə Deyir</h2>
                <p className="same">
                    Uzun müddətdir ki, oxuyucular səhifənin tərtibatına baxarkən diqqətlərini yayındıran faktlar mövcuddur. Lorem Ipsum istifadə etmənin məqsədi budur.
                </p>
            </div>
            <div id='clientBoxes'>
                {client.map((e, index) => (
                    <div className='clientBox' key={index}>
                        <div>
                            {Array.from({ length: e.rating }, (_, i) => (
                                <img key={i} src={e.icon} alt="star" />
                            ))}
                        </div>
                        <div className='clientRew'>
                        <p className='same'>{e.review}</p>
                        </div>
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
