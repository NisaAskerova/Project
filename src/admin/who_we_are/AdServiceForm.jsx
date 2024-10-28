import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Admin from '../Admin';

function AddServiceForm() {
  const navigate = useNavigate(); // Initialize navigate function

  const [mainTitle, setMainTitle] = useState('');
  const [mainDescription, setMainDescription] = useState('');
  const [mainImage, setMainImage] = useState(null);

  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [icon, setIcon] = useState(null);
  const [color, setColor] = useState('#ffffff');

  const [message, setMessage] = useState('');

  // Function to handle "About Us" form submission
  const handleAboutUsSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('main_title', mainTitle);
    formData.append('main_description', mainDescription);
    formData.append('image', mainImage);

    try {
      await axios.post('http://localhost:8000/api/who_we_are/main_info', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('About Us section added successfully!');
    } catch (error) {
      setMessage('Error adding About Us section: ' + error.response.data.message);
      console.error('Error:', error);
    }
  };

  // Function to handle Service form submission
  const handleServiceSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', text);
    formData.append('icon', icon);
    formData.append('color', color);

    try {
      await axios.post('http://localhost:8000/api/who_we_are/service_info', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('Service added successfully!');
      // Navigate to /show_who_we_are after successful submission
      navigate('/show_who_we_are');
    } catch (error) {
      setMessage('Error adding service: ' + error.response.data.message);
      console.error('Error:', error);
    }
  };

  return (
    <>
      <Admin />
      <div className="adminHero">
        {/* Form for About Us Section */}
        <form className="form" onSubmit={handleAboutUsSubmit}>
          <h2 className="form-title">Add About Us Section</h2>
          <div className="form-group">
            <label htmlFor="mainTitle">Main Title:</label>
            <input
              id="mainTitle"
              type="text"
              value={mainTitle}
              onChange={(e) => setMainTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="mainDescription">Main Description:</label>
            <textarea
              id="mainDescription"
              value={mainDescription}
              onChange={(e) => setMainDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="mainImage">Image:</label>
            <input
              id="mainImage"
              type="file"
              onChange={(e) => setMainImage(e.target.files[0])}
              required
            />
          </div>
          <button type="submit" className="submit-button">Add About Us</button>
        </form>

        {/* Form for Adding Service */}
        <form className="form" onSubmit={handleServiceSubmit}>
          <h2 className="form-title">Add Service</h2>
          <div className="form-group">
            <label htmlFor="serviceTitle">Title:</label>
            <input
              id="serviceTitle"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="serviceText">Text:</label>
            <textarea
              id="serviceText"
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="serviceIcon">Icon:</label>
            <input
              id="serviceIcon"
              type="file"
              onChange={(e) => setIcon(e.target.files[0])}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="serviceColor">Color:</label>
            <input
              id="serviceColor"
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>
          <button type="submit" className="submit-button">Add Service</button>
        </form>

        {message && <p className="message">{message}</p>}
      </div>
    </>
  );
}

export default AddServiceForm;
