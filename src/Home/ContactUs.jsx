import React from 'react';

export default function ContactUs() {
    return (
        <div id='contactUs' className='contuactus'>
            <div>
                <img src="" alt="" />
                <div id='leftContact'>
                    <span className='same'>YARDIMA EHTİYACINIZ VAR?</span>
                    <h2 className='thick'>Bizimlə Əlaqə Saxlayın!</h2>
                    <p className='same'>Uzun müddətdir ki, bir səhifənin dizaynına baxarkən oxucunun diqqətinin asanlıqla yayılacağı barədə qəbul edilmiş bir faktdır.</p>
                </div>
                <div id="rightContact">
                    <div>
                        <input className='same' type="email" name="email" placeholder='Email Ünvanı' />
                        <button>Göndər <img src="../leftIcon.svg" alt="" /></button>
                    </div>
                </div>
            </div>
        </div>
    );
}
