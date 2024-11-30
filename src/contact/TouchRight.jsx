import React, { useState } from 'react';
import axios from 'axios';

export default function TouchRight() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [responseMessage, setResponseMessage] = useState({
    message: '',
    status: '' 
  });

  const [isLoading, setIsLoading] = useState(false);  // Yeni yüklənmə vəziyyəti

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Əsas forma doğrulama
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      setResponseMessage({ message: 'Bütün sahələr boş olmamalıdır.', status: 'error' });
      return;
    }

    setIsLoading(true);  // Yüklənmə vəziyyətini aktiv edin

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/contact_us/store', formData);
      if (response.status === 200) {
        setResponseMessage({ message: 'Mesaj uğurla göndərildi!', status: 'success' });
        setFormData({ name: '', email: '', phone: '', message: '' }); 
      }
    } catch (error) {
      console.error('Mesaj göndərilərkən xəta baş verdi:', error);
      setResponseMessage({ message: 'Mesaj göndərilmədi. Zəhmət olmasa, yenidən cəhd edin.', status: 'error' });
    } finally {
      setIsLoading(false);  // Sorğu bitdikdən sonra yüklənmə vəziyyətini sıfırlayın
    }
  };

  return (
    <div id='touchForm'>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Ad</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder='Adınızı daxil edin'
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder='Emailinizi daxil edin'
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="phone">Telefon Nömrəsi</label>
          <input
            type="tel"
            name="phone"
            id="phone"
            placeholder='Telefon nömrənizi daxil edin'
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="message">Mesaj</label>
          <input
            type="text"
            name="message"
            id="message"
            placeholder='Mesajınızı daxil edin'
            value={formData.message}
            onChange={handleChange}
          />
        </div>
        <button className='same' type="submit" disabled={isLoading}>
          {isLoading ? 'Göndərilir...' : 'Sual göndər'}
        </button>
      </form>

      {responseMessage.message && (
        <div
          style={{
            color: responseMessage.status === 'success' ? 'green' : 'red',
            marginTop: '10px'
          }}
        >
          {responseMessage.message}
        </div>
      )}
    </div>
  );
}
