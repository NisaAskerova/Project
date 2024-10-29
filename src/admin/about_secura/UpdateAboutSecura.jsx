import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Admin from '../Admin';

function UpdateAboutSecura() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [type, setType] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [icon, setIcon] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/about_secura/show/${id}`);
        const data = response.data;
        setType(data.type);
        setTitle(data.title);
        setDescription(data.description);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
    fetchData();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('type', type);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', image);
    formData.append('icon', icon);

    try {
      await axios.post(`http://localhost:8000/api/about_secura/update/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('Information updated successfully!');
      navigate('/show_about_secura');  // Redirects to the desired page
    } catch (error) {
      setMessage('Error updating information: ' + (error.response?.data.message || error.message));
      console.error('Error:', error);
    }
  };

  return (
    <>
      <Admin />
      <div className="adminHero">
        <h2>Update About Secura</h2>
        <form onSubmit={handleUpdate}>
          <div>
            <label>Type:</label>
            <input
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            />
          </div>
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
            />
          </div>
          <div>
            <label>Icon:</label>
            <input
              type="file"
              onChange={(e) => setIcon(e.target.files[0])}
            />
          </div>
          <button type="submit">Update</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </>
  );
}

export default UpdateAboutSecura;
