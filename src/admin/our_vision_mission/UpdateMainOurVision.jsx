import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Admin from '../Admin';

function UpdateMainOurVision() {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        type: '',
        title: '',
        description: '',
        image: null,
    });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAboutUsData = async () => {
            setMessage('');
            setLoading(true);
            try {
                const response = await axios.post(`http://localhost:8000/api/our_vision_mission/main_info/${id}`);
                setFormData(response.data);
            } catch (error) {
                console.error('Error fetching About Us data:', error);
                setMessage('Error fetching About Us data: ' + (error.response?.data.message || error.message));
            } finally {
                setLoading(false); // Stop loading
            }
        };

        fetchAboutUsData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading

        const updatedFormData = new FormData();
        updatedFormData.append('type', formData.type);
        updatedFormData.append('title', formData.title);
        updatedFormData.append('description', formData.description);
        if (formData.image) {
            updatedFormData.append('image', formData.image);
        }

        try {
            // Make POST request to update the service info
            await axios.post(`http://localhost:8000/api/our_vision_mission/main_info/${id}`, updatedFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setMessage('Main information updated successfully!');
            navigate('/our_vision_mission');
        } catch (error) {
            console.error('Error updating About Us data:', error.response?.data);
            setMessage('Error updating About Us data: ' + (error.response?.data.message || error.message));
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <>
            <Admin />
            <div className="adminHero">
                <h2>Update Our Vision/Mission Main</h2>
                {message && <p>{message}</p>}
                {loading && <p>Loading...</p>}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Type:</label>
                        <input
                            type="text"
                            value={formData.type}
                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <label>Main Title:</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <label>Main Description:</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <label>Image:</label>
                        <input
                            type="file"
                            onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                        />
                    </div>
                    <button type="submit" disabled={loading}>Update About Us</button>
                </form>
            </div>
        </>
    );
}

export default UpdateMainOurVision;