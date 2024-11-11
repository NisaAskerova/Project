import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Admin from '../Admin';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateHerSlider() {
  const { id } = useParams(); // URL-dən id alırıq
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [heroImage, setHeroImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [icon, setIcon] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  // Slideni əldə etmək üçün useEffect
  useEffect(() => {
    const fetchSlider = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/sliders/show/${id}`);
        const slider = response.data;
        setTitle(slider.title);
        setDescription(slider.description);
        setImage(null);
        setHeroImage(null);
        setBackImage(null);
        setIcon(null);
      } catch (error) {
        console.error('Error fetching slider:', error);
        setMessage('Error fetching slider data.');
      }
    };
  
    fetchSlider();
  }, [id]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (image) formData.append('image', image);
    if (heroImage) formData.append('heroImage', heroImage);
    if (backImage) formData.append('backImage', backImage);
    if (icon) formData.append('icon', icon);

    try {
      const response = await axios.post(`http://localhost:8000/api/sliders/update/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/show_hero_slide')
    } catch (error) {
      setMessage(error.response?.data.message || 'Error updating slider.');
      console.error('Error:', error);
    }
  };

  return (
    <>
      <Admin />
      <div className="adminHero">
        <h2>Update Slider</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div>
            <label>Image (leave blank if not changing):</label>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <div>
            <label>Hero Image (leave blank if not changing):</label>
            <input
              type="file"
              onChange={(e) => setHeroImage(e.target.files[0])}
            />
          </div>
          <div>
            <label>Back Image (leave blank if not changing):</label>
            <input
              type="file"
              onChange={(e) => setBackImage(e.target.files[0])}
            />
          </div>
          <div>
            <label>Icon (leave blank if not changing):</label>
            <input
              type="file"
              onChange={(e) => setIcon(e.target.files[0])}
            />
          </div>
          <button type="submit">Update Slider</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </>
  );
}

export default UpdateHerSlider;
