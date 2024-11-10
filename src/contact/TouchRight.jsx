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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/contact_us/store', formData);
      if (response.status === 200) {
        setResponseMessage({ message: 'Message sent successfully!', status: 'success' });
        setFormData({ name: '', email: '', phone: '', message: '' }); 
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setResponseMessage({ message: 'Failed to send message. Please try again.', status: 'error' });
    }
  };

  return (
    <div id='touchForm'>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder='Enter Your Name'
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
            placeholder='Enter Your Email'
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            name="phone"
            id="phone"
            placeholder='Enter Phone Number'
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="message">Message</label>
          <input
            type="text"
            name="message"
            id="message"
            placeholder='Enter Your Message'
            value={formData.message}
            onChange={handleChange}
          />
        </div>
        <button className='same' type="submit">Send Enquiry</button>
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
