import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Admin from '../Admin';

function UpdateHowWeWorks() {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        type: '',
        main_title: '',
        main_description: '',
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
                const response = await axios.post(`http://localhost:8000/api/how_we_works/main_info/${id}`);
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
        updatedFormData.append('main_title', formData.main_title);
        updatedFormData.append('main_description', formData.main_description);
        if (formData.image) {
            updatedFormData.append('image', formData.image);
        }

        try {
            // Make POST request to update the service info
            await axios.post(`http://localhost:8000/api/how_we_works/main_info/${id}`, updatedFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            
            setMessage('Main information updated successfully!');
            navigate('/show_how_we_works');
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
                <h2>How We Works Main</h2>
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
                            value={formData.main_title}
                            onChange={(e) => setFormData({ ...formData, main_title: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <label>Main Description:</label>
                        <textarea
                            value={formData.main_description}
                            onChange={(e) => setFormData({ ...formData, main_description: e.target.value })}
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

export default UpdateHowWeWorks;
