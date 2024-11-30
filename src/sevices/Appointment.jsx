import React from 'react';

export default function Appointment() {
    return (
        <div id='appointment'>
            <div id="appointmentLeft">
                <span className="same">TƏYİNAT YARADIN</span>
                <h2 className="thick">Hər Xidmət Üçün Mükəmməl Həll</h2>
                <p className="same">Oxucu bir səhifənin dizaynını yoxlarkən, mətndəki oxunaqlı məzmunun diqqətini yayındırması uzun müddətdir təsdiq olunmuş bir faktdır. Lorem Ipsum istifadəsinin məqsədi budur.</p>
            </div>
            <div id="appointmentRight">
                <form action="#" method='POST'>
                    <div id='formDivTop'>
                        <div>
                            <label htmlFor="name">Ad</label>
                            <input className='same' type="text" name="name" id="name" placeholder='Adınızı daxil edin' />
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input className='same' type="email" name="email" id="email" placeholder='Emailinizi daxil edin' />
                        </div>
                        <div>
                            <label htmlFor="number">Mobil Nömrə</label>
                            <input className='same' type="number" name="number" id="number" placeholder='Mobil nömrənizi daxil edin' />
                        </div>
                        <div>
                            <label htmlFor="services">Xidmətlər</label>
                            <input className='same' type="text" name="services" id="services" placeholder='Seçin' />
                        </div>
                    </div>
                    <div id='formDivBottom'>
                        <label htmlFor="message">Mesaj</label>
                        <textarea className='same' name="message" id="message" placeholder='Mesajınızı yazın'></textarea>
                        <button>Yaradın</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
