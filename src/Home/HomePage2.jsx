import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function HomePage2() {
  const [aboutUs, setAboutUs] = useState([]);
  const [services, setServices] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchAboutUs = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/who_we_are/show_main_info');
      setAboutUs(response.data);
    } catch (error) {
      console.error('Error fetching About Us data:', error);
      setMessage('Error fetching About Us data: ' + (error.response?.data.message || error.message));
    }
  };

  const fetchServices = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/who_we_are/show_service_info');
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
      setMessage('Error fetching services: ' + (error.response?.data.message || error.message));
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([fetchAboutUs(), fetchServices()]);
      setLoading(false);
    };
    fetchData();
  }, []);

  


  return (
    <div id='homepage2' className='padding'>
      <div  id="homePage2Left">
      {loading ? <p>Loading data...</p> : null}
      {message && <p className="message">{message}</p>}

      {/* About Us Section */}
      {aboutUs.length > 0 ? (
        aboutUs.map((item) => (
            <div key={item.id} id='titleDiv'>
              <span className='same'>{item.type}</span>
              <h2>{item.main_title}</h2>
              <p className='same'>{item.main_description}</p>
            </div>
        ))
    ) : (
        <p>No About Us data available.</p>
    )}

      <div id="boxes">
        {services.length > 0 ? (
          services.map((service) => (
            <div key={service.id} className='homeBox' style={{ backgroundColor: service.color }}>
              <div className='iconsBox'>
                {service.icon ? (
                  <img src={`http://localhost:8000/storage/${service.icon}`} alt="Service Icon" />
                ) : (
                  'No icon available'
                )}
              </div>
              <h4>{service.title}</h4>
              <span className='same'>{service.description}</span>
            </div>
          ))
        ) : (
          <p>No Services data available.</p>
        )}
      </div>
      </div>
      <div id="homePage2Right">
      {aboutUs.length > 0 ? (
        aboutUs.map((item) => (
            <img src={`http://localhost:8000/storage/${item.image}`} alt="Image"/>
        
        ))
    ) : (
        <p>No About Us data available.</p>
    )}
            </div>
    </div>
  );
}
