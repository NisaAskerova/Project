import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Admin from '../Admin';

function ShowWhoWeAre() {
  const [aboutUs, setAboutUs] = useState([]);
  const [services, setServices] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Data fetch functions
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

  // Fetch both About Us and Services data on component mount
  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([fetchAboutUs(), fetchServices()]);
      setLoading(false);
    };
    fetchData();
  }, []);

  // Delete handler
  const handleDelete = async (id, type) => {
    if (window.confirm(`Are you sure you want to delete this ${type === 'main_info' ? 'About Us' : 'Service'}?`)) {
      try {
        await axios.delete(`http://localhost:8000/api/who_we_are/${type}/${id}`);
        setMessage(`${type === 'main_info' ? 'About Us' : 'Service'} deleted successfully!`);
        type === 'main_info' ? fetchAboutUs() : fetchServices();
      } catch (error) {
        console.error('Error deleting:', error);
        setMessage('Error deleting: ' + (error.response?.data.message || error.message));
      }
    }
  };

  return (
    <>
      <Admin />
      <div className="adminHero">
        <button className="add-button" onClick={() => navigate('/who_we_are')}>Add About Us</button>
        <h2>About Us</h2>
        {loading ? <p>Loading data...</p> : null}
        {message && <p className="message">{message}</p>}


        {aboutUs.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Type</th> 
                <th>Main Title</th> 
                <th>Main Description</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {aboutUs.map((item) => (
                <tr key={item.id}>
                  <td>{item.type}</td>
                  <td>{item.main_title}</td>
                  <td>{item.main_description}</td>
                  <td>
                    {item.image ? (
                      <img src={`http://localhost:8000/storage/${item.image}`} alt="Image" width="50" />
                    ) : (
                      'No image available'
                    )}
                  </td>
                  <td>
                    <button className="edit-button" onClick={() => navigate(`/update_who_we_are_main/${item.id}`)}>Edit</button>
                    <button className="delete-button" onClick={() => handleDelete(item.id, 'main_info')}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No About Us data available.</p>
        )}

        <h2>Services</h2>
        
        {services.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Icon</th>
                <th>Color</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service.id}>
                  <td>{service.title}</td>
                  <td>{service.description}</td>
                  <td>
                    {service.icon ? (
                    <img src={`http://localhost:8000/storage/${service.icon}`} alt="Image" width="50" />
                    ) : (
                      'No icon available'
                    )}
                  </td>
                  <td style={{ backgroundColor: service.color }}>{service.color}</td>
                  <td>
                    <button className="edit-button" onClick={() => navigate(`/update_who_we_are_service/${service.id}`)}>Edit</button>
                    <button className="delete-button" onClick={() => handleDelete(service.id, 'service_info')}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No services available.</p>
        )}
      </div>
    </>
  );
}

export default ShowWhoWeAre;
