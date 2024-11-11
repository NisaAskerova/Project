import React, { useState } from 'react';
import axios from 'axios';
import Admin from '../Admin';
import { useNavigate } from 'react-router-dom';

function SliderForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [heroImage, setHeroImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [icon, setIcon] = useState(null);
  const [message, setMessage] = useState('');
  const navigate=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', image);
    formData.append('heroImage', heroImage);
    formData.append('backImage', backImage);
    formData.append('icon', icon);

    try {
      const response = await axios.post('http://localhost:8000/api/sliders/store', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/show_hero_slide')
    } catch (error) {
      setMessage(error.response?.data.message || 'Error adding slider.');
      console.error('Error:', error);
    }
  };

  return (
    <>
    <Admin />
    <div className="adminHero">
      <h2>Add New Slider</h2>
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
          <label>Image:</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>
        <div>
          <label>Hero Image:</label>
          <input
            type="file"
            onChange={(e) => setHeroImage(e.target.files[0])}
            required
          />
        </div>
        <div>
          <label>Back Image:</label>
          <input
            type="file"
            onChange={(e) => setBackImage(e.target.files[0])}
            required
          />
        </div>
        <div>
          <label>Icon:</label>
          <input
            type="file"
            onChange={(e) => setIcon(e.target.files[0])}
            required
          />
        </div>
        <button type="submit">Add Slider</button>
      </form>
      {message && <p>{message}</p>}
    </div></>
  );
}

export default SliderForm;
