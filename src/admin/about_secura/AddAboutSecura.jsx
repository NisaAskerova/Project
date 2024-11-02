import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Admin from '../Admin';

function AddAboutSecura() {
  const navigate = useNavigate();

  const [type, setType] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [icon, setIcon] = useState(null);

  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('type', type);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', image);
    formData.append('icon', icon);

    try {
      await axios.post('http://localhost:8000/api/about_secura/store', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('Information added successfully!');
      navigate('/show_about_secura');
    } catch (error) {
      setMessage('Error adding information: ' + error.response.data.message);
      console.error('Error:', error);
    }
  };

  return (
    <>
      <Admin />
      <div className="adminHero">
        <h2>Add About Secura</h2>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="type">Type:</label>
            <input
              id="type"
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="image">Image:</label>
            <input
              id="image"
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="icon">Icon:</label>
            <input
              id="icon"
              type="file"
              onChange={(e) => setIcon(e.target.files[0])}
              required
            />
          </div>
          <button type="submit" className="submit-button">Submit</button>
        </form>

        {message && <p className="message">{message}</p>}
        <Link to="/show_about_secura" className="back-link">Show About Secura</Link>
      </div>
    </>
  );
}

export default AddAboutSecura;
