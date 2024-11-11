import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Admin from '../Admin';

function UpdateServiceHowWeWorks() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: null,
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServiceData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:8000/api/how_we_works/show_service_info/${id}`);
        setFormData(response.data);
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

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);

    // İkonu yoxla
    if (formData.icon) {
        formDataToSend.append('icon', formData.icon);
    }

    try {
        await axios.post(`http://localhost:8000/api/how_we_works/service_info/${id}`, formDataToSend, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        setMessage('Service updated successfully!');
        navigate('/show_how_we_works'); // Uğurlu yeniləmə halında yönləndirin
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
        <h2>Update How We Works Service</h2>
        {message && <p>{message}</p>}
        {loading && <p>Loading...</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title:</label>
            <input
              type="text"
              value={formData.title || ''} // Ensure it's always a string
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea
              value={formData.description || ''} // Ensure it's always a string
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
          <button type="submit" disabled={loading}>Update Service</button>
        </form>
      </div>
    </>
  );
}

export default UpdateServiceHowWeWorks;
