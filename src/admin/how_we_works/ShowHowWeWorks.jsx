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

  const fetchAboutUs = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/how_we_works/show_main_info');  // `show_main_info` istifadə edilir
      setAboutUs(response.data);
    } catch (error) {
      console.error('Error fetching About Us data:', error);
      setMessage('Error fetching About Us data: ' + (error.response?.data.message || error.message));
    }
  };

  const fetchServices = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/how_we_works/show_service_info');  // `show_service_info` istifadə edilir
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

  const handleDelete = async (id, type) => {
    if (window.confirm(`Are you sure you want to delete this ${type === 'main_info' ? 'About Us' : 'Service'}?`)) {
      try {
        await axios.delete(`http://localhost:8000/api/how_we_works/${type}/${id}`);
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
        <button className="add-button" onClick={() => navigate('/how_we_works')}>Add About Us</button>
        <h2>About Us</h2>
        {loading ? <p>Loading data...</p> : null}
        {message && <p className="message">{message}</p>}

        {aboutUs.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Main Title</th>
                <th>Main Description</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {aboutUs.map((item) => (
                <tr key={item.id}>
                  <td>{item.main_title}</td>
                  <td>{item.main_description}</td>
                  <td>
                    {item.image ? (
                      <img src={`http://localhost:8000/storage/${item.image}`} alt="Image" width="50" />) : (
                      'No image available'
                    )}
                  </td>
                  <td>
                    <button className="edit-button" onClick={() => navigate(`/update_how_we_works_main/${item.id}`)}>Edit</button>
                    <button className="delete-button" onClick={() => handleDelete(item.id, 'main_info')}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No About Us data available</p>
        )}

        <h2>Services</h2>
        {services.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Icon</th>
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
                  <td>
                    <button className="edit-button" onClick={() => navigate(`/update_how_we_works_service/${service.id}`)}>Edit</button>
                    <button className="delete-button" onClick={() => handleDelete(service.id, 'service_info')}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No services available</p>
        )}
      </div>
    </>
  );
}

export default ShowWhoWeAre;
