import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export default function ContactUs() {
    const [email, setEmail] = useState('');
    const [localEmail, setLocalEmail] = useState('');
    const [message, setMessage] = useState('');

    // localStorage-dan emaili oxuyuruq
    useEffect(() => {
        const storedEmail = localStorage.getItem('email');
        setLocalEmail(storedEmail);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Email uyğunluğunu yoxlayırıq
        if (email === localEmail) {
            toast.success('Sizinlə əlaqə saxlanacaq!');
        } else {
            toast.error('Daxil etdiyiniz email doğru deyil.');
        }
        setEmail(''); // Inputu sıfırlayırıq

    };

    return (
        <div id='contactUs' className='contuactus'>
            <div>
                <img src="" alt="" />
                <div id='leftContact'>
                    <span className='same'>YARDIMA EHTİYACINIZ VAR?</span>
                    <h2 className='thick'>Bizimlə Əlaqə Saxlayın!</h2>
                    <p className='same'>
                        Uzun müddətdir ki, bir səhifənin dizaynına baxarkən oxucunun diqqətinin asanlıqla yayılacağı barədə qəbul edilmiş bir faktdır.
                    </p>
                </div>
                <div id="rightContact">
                    <div>
                        <input
                            className='same'
                            type="email"
                            name="email"
                            placeholder='Email ünvanı'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <button onClick={handleSubmit}>Göndər <img src="../leftIcon.svg" alt="" /></button>
                    </div>
                    {message && (
                        <div style={{ marginTop: '10px', color: email === localEmail ? 'green' : 'red' }}>
                            {message}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
