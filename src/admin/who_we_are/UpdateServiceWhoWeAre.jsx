import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Admin from '../Admin';

function UpdateServiceWhoWeAre() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: null,
    color: '#fff', // Default dəyəri '#fff' təyin etdik
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServiceData = async () => {
      setLoading(true);
      try {
        const response = await axios.post(`http://localhost:8000/api/who_we_are/service_info/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching service data:', error);
        setMessage('Error fetching service data: ' + (error.response?.data.message || error.message));
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchServiceData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    // Boş color üçün default dəyər təyin edirik
    const color = formData.color || '#fff';
  
    // Query parametrləri yaradılır
    const params = new URLSearchParams({
      title: formData.title,
      description: formData.description,
      color: color,
    });
  
    // İkon varsa, onu da parametrlərə əlavə edirik
    if (formData.icon) {
      params.append('icon', formData.icon);
    }
  
    try {
      // GET metodu ilə query parametrləri göndəririk
      await axios.post(`http://localhost:8000/api/who_we_are/service_info/${id}?${params.toString()}`);
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
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Icon:</label>
          <input
            type="file"
            onChange={(e) => setFormData({ ...formData, icon: e.target.files[0] })}
          />
        </div>
        <div>
          <label>Color:</label>
          <input
            type="color"
            value={formData.color}
            onChange={(e) => setFormData({ ...formData, color: e.target.value })}
          />
        </div>
        <button type="submit" disabled={loading}>Update Service</button>
      </form>
    </div></>
  );
}

export default UpdateServiceWhoWeAre;
