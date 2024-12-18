import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Appointment() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        number: '',
        services: '',
        message: ''
    });

    useEffect(() => {
        // Retrieve data from localStorage
        const firstName = localStorage.getItem('firstName');
        const lastName = localStorage.getItem('lastName');
        const email = localStorage.getItem('email');

        // Set the form data with the retrieved localStorage values
        if (firstName && lastName) {
            setFormData(prevData => ({
                ...prevData,
                name: `${firstName} ${lastName}`,
                email: email || prevData.email // In case email is not found in localStorage
            }));
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send the form data to the API
            const response = await axios.post('http://127.0.0.1:8000/api/contact_us/store', formData);
            console.log(response.data); // Handle the response
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    return (
        <div id='appointment'>
            <div id="appointmentLeft">
                <span className="same">TƏYİNAT YARADIN</span>
                <h2 className="thick">Hər Xidmət Üçün Mükəmməl Həll</h2>
                <p className="same">Oxucu bir səhifənin dizaynını yoxlarkən, mətndəki oxunaqlı məzmunun diqqətini yayındırması uzun müddətdir təsdiq olunmuş bir faktdır. Lorem Ipsum istifadəsinin məqsədi budur.</p>
            </div>
            <div id="appointmentRight">
                <form onSubmit={handleSubmit} method='POST'>
                    <div id='formDivTop'>
                        <div>
                            <label htmlFor="name">Ad</label>
                            <input
                                className='same'
                                type="text"
                                name="name"
                                id="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder='Adınızı daxil edin'
                                readOnly
                            />
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input
                                className='same'
                                type="email"
                                name="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder='Emailinizi daxil edin'
                                readOnly
                            />
                        </div>
                        <div>
                            <label htmlFor="number">Mobil Nömrə</label>
                            <input
                                className='same'
                                type="text"
                                name="number"
                                id="number"
                                value={formData.number}
                                onChange={handleChange}
                                placeholder='Mobil nömrənizi daxil edin'
                            />
                        </div>
                        <div>
                            <label htmlFor="services">Xidmətlər</label>
                            <input
                                className='same'
                                type="text"
                                name="services"
                                id="services"
                                placeholder='Seçin'
                            />
                        </div>
                    </div>
                    <div id='formDivBottom'>
                        <label htmlFor="message">Mesaj</label>
                        <textarea
                            className='same'
                            name="message"
                            id="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder='Mesajınızı yazın'
                        ></textarea>
                        <button className='same' type="submit">Yaradın</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
