import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Admin from '../../Admin';

const UpdateAboutHero = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        title: '',
        image: '',
    });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAboutUsData = async () => {
            setMessage(''); 
            setLoading(true);
            try {
                const response = await axios.post(`http://localhost:8000/api/about_hero/update/${id}`); 
                setFormData(response.data);
            } catch (error) {
                console.error('Error fetching About Us data:', error);
                setMessage('Error fetching About Us data: ' + (error.response?.data.message || error.message));
            } finally {
                setLoading(false); 
            }
        };

        fetchAboutUsData();
    }, [id]);

    const handleTitleChange = (e) => {
        setFormData({ ...formData, title: e.target.value });
    };

    const handleImageChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading

        const updatedFormData = new FormData();
        updatedFormData.append('title', formData.title); // Correct key for title
        if (formData.image) {
            updatedFormData.append('image', formData.image);
        }

        try {
            await axios.post(`http://localhost:8000/api/about_hero/update/${id}`, updatedFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage('Information updated successfully!');
            navigate('/show_about_hero'); // Redirect after update
        } catch (error) {
            setMessage('Error updating information: ' + (error.response?.data?.message || error.message));
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Admin />
            <div className="adminHero">
                <h2>Update About Hero</h2>
                {message && <p>{message}</p>}
                {loading && <div className='loadingDiv'><img  src="./loading.gif" alt="" /></div>}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Title:</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={handleTitleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Image:</label>
                        <input type="file" onChange={handleImageChange} />
                        {formData.image && typeof formData.image === 'string' && (
                            <img src={`http://localhost:8000/storage/${formData.image}`} alt="Current" width="100" />
                        )}
                    </div>
                    <button type="submit" disabled={loading}>Update</button>
                </form>
            </div>
        </>
    );
};

export default UpdateAboutHero;
