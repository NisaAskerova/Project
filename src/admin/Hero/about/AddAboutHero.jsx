import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Bu sətiri əlavə edin
import Admin from '../../Admin';

const AddAboutHero = () => {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // useNavigate hookunu istifadə edin

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('title', title);
        formData.append('image', image);
    
        try {
          await axios.post('http://localhost:8000/api/about_hero/store', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          setMessage('Information added successfully!');
          navigate('/show_about_hero');
        } catch (error) {
          setMessage('Error adding information: ' + error.response?.data?.message);
          console.error('Error:', error);
        }
      };

    return (
        <>
            <Admin />
            <div className="adminHero">
                <h2>Add About Hero</h2>
                {message && <p>{message}</p>}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Title:</label>
                        <input type="text" value={title} onChange={handleTitleChange} required />
                    </div>
                    <div>
                        <label>Image:</label>
                        <input type="file" onChange={handleImageChange} />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    );
};

export default AddAboutHero;
