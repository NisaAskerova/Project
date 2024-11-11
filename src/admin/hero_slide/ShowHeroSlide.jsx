import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // useNavigate-i idxal edin
import Admin from '../Admin';

function ShowHeroSlide() {
  const [sliders, setSliders] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // useNavigate-i burada yaradın

  useEffect(() => {
    const fetchSliders = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/sliders/get');
        setSliders(response.data);
      } catch (error) {
        setError(error.response ? error.response.data.message : 'Error fetching sliders');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSliders();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this slider?')) {
      try {
        await axios.delete(`http://localhost:8000/api/sliders/delete/${id}`);
        setSliders(sliders.filter(slider => slider.id !== id));
      } catch (error) {
        setError(error.response ? error.response.data.message : 'Error deleting slider');
        console.error(error);
      }
    }
  };

  const handleUpdate = (id) => {
    navigate(`/update_hero_slider/${id}`); // Update səhifəsinə yönləndirin
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Admin />
      <div className="adminHero">
        <h2>Slider List</h2>
        <button className="add-button" onClick={() => navigate('/add_hero_slide')}>Add Hero Slider</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Image</th>
              <th>Hero Image</th>
              <th>Back Image</th>
              <th>Icon</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sliders.map((slider) => (
              <tr key={slider.id}>
                <td>{slider.title}</td>
                <td>{slider.description}</td>
                <td><img src={`http://localhost:8000/storage/${slider.image}`} alt={slider.title} style={{ width: '100px' }} /></td>
                <td><img src={`http://localhost:8000/storage/${slider.heroImage}`} alt={slider.title} style={{ width: '100px' }} /></td>
                <td><img src={`http://localhost:8000/storage/${slider.backImage}`} alt={slider.title} style={{ width: '100px' }} /></td>
                <td><img src={`http://localhost:8000/storage/${slider.icon}`} alt={slider.title} style={{ width: '100px' }} /></td>
                <td>
                  <button className='edit-button' onClick={() => handleUpdate(slider.id)}>Update</button>
                  <button className='delete-button' onClick={() => handleDelete(slider.id)} >Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ShowHeroSlide;
