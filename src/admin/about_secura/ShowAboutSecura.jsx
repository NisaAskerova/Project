import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Admin from '../Admin';
import { useNavigate } from 'react-router-dom';

function ShowAboutSecura() {
  const [aboutSecuraData, setAboutSecuraData] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAboutSecuraData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/about_secura/get');
        setAboutSecuraData(response.data);
      } catch (error) {
        setError('Error loading data');
        console.error('Error:', error);
      }
    };

    fetchAboutSecuraData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/about_secura/delete/${id}`);
      setAboutSecuraData(aboutSecuraData.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
      setError('Error deleting item');
    }
  };

  const handleUpdate = (id) => {
    window.location.href = `/update_about_secura/${id}`;
  };

  return (
    <>
      <Admin />
      <div className='adminHero'>
      <button className="add-button" onClick={() => navigate('/add_about_secura')}>Add About Us</button>
        <h2>About Secura Data</h2>
        {error && <p>{error}</p>}
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Title</th>
              <th>Description</th>
              <th>Image</th>
              <th>Icon</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {aboutSecuraData.map((item) => (
              <tr key={item.id}>
                <td>{item.type}</td>
                <td>{item.title}</td>
                <td>{item.description}</td>
                <td>
                  {item.image ? (
                    <img src={`http://localhost:8000/storage/${item.image}`} alt="Image" width="50" />
                  ) : (
                    'No Image'
                  )}
                </td>
                <td>
                  {item.icon ? (
                    <img src={`http://localhost:8000/storage/${item.icon}`} alt="Icon" width="50" />
                  ) : (
                    'No Icon'
                  )}
                </td>
                <td>
                  <button className='edit-button' onClick={() => handleUpdate(item.id)}>Update</button>
                  <button className='delete-button' onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ShowAboutSecura;


   

