import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

export default function TouchRight() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  // localStorage-dan məlumatları oxumaq üçün useEffect istifadə edirik
  useEffect(() => {
    const firstName = localStorage.getItem('firstName') || '';
    const lastName = localStorage.getItem('lastName') || '';
    const email = localStorage.getItem('email') || '';

    setFormData((prevFormData) => ({
      ...prevFormData,
      name: `${firstName} ${lastName}`,
      email: email
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasiya
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      toast.error('Bütün sahələri doldurmaq məcburidir.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/contact_us/store', formData);

      if (response.status === 200) {
        toast.success('Mesaj uğurla göndərildi!');
        setFormData({ ...formData, phone: '', message: '' }); // Formanı qismən sıfırla
      }
    } catch (error) {
      console.error('Xəta:', error);
      toast.error('Mesaj göndərilmədi. Yenidən cəhd edin.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id='touchForm'>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Ad</label>
          <input
            className='same'
            type="text"
            name="name"
            id="name"
            value={formData.name}
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
            readOnly
          />
        </div>

        <div>
          <label htmlFor="phone">Telefon Nömrəsi</label>
          <input
            className='same'
            type="tel"
            name="phone"
            id="phone"
            placeholder="Telefon nömrənizi daxil edin"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="message">Mesaj</label>
          <textarea
            className='same'
            name="message"
            id="message"
            placeholder="Mesajınızı daxil edin"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            required
          />
        </div>

        <button type="submit" className="same" disabled={isLoading}>
          {isLoading ? 'Göndərilir...' : 'Sual göndər'}
        </button>
      </form>

      {/* Toast mesajları üçün */}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}
