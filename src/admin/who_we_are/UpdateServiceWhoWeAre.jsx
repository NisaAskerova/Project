import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Admin from '../Admin';

function UpdateServiceWhoWeAre() {
  const { id } = useParams();
  const [serviceData, setServiceData] = useState({
    title: '',
    description: '',
    icon: null,
    color: '#fff',
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServiceData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:8000/api/who_we_are/get_service/${id}`);
        setServiceData(response.data);
      } catch (error) {
        console.error('Error fetching service data:', error);
        setMessage('Error fetching service data: ' + (error.response?.data.message || error.message));
      } finally {
        setLoading(false);
      }
    };

    fetchServiceData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Create a FormData object for handling file uploads
    const formData = new FormData();
    formData.append('title', serviceData.title);
    formData.append('description', serviceData.description);
    formData.append('color', serviceData.color || '#fff');
    
    // Append the icon only if it's provided
    if (serviceData.icon) {
      formData.append('icon', serviceData.icon);
    }

    try {
      // Use PUT method for updating existing service
      await axios.post(`http://localhost:8000/api/who_we_are/update_service/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('Service updated successfully!');
      navigate('/show_who_we_are');
    } catch (error) {
      console.error('Error updating service:', error);
      setMessage('Error updating service: ' + (error.response?.data.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Admin />
      <div className="adminHero">
        <h2>Update Service Who We Are</h2>
        {message && <p>{message}</p>}
        {loading && <p>Loading...</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title:</label>
            <input
              type="text"
              value={serviceData.title}
              onChange={(e) => setServiceData({ ...serviceData, title: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea
              value={serviceData.description}
              onChange={(e) => setServiceData({ ...serviceData, description: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Icon:</label>
            <input
              type="file"
              onChange={(e) => setServiceData({ ...serviceData, icon: e.target.files[0] })}
            />
          </div>
          <div>
            <label>Color:</label>
            <input
              type="color"
              value={serviceData.color}
              onChange={(e) => setServiceData({ ...serviceData, color: e.target.value })}
            />
          </div>
          <button type="submit" disabled={loading}>Update Service</button>
        </form>
      </div>
    </>
  );
}

export default UpdateServiceWhoWeAre;
