import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Admin from '../Admin';

function UpdateMainWhoWeAre() {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        main_title: '',
        main_description: '',
        image: null,
    });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAboutUsData = async () => {
            setMessage(''); // Clear previous messages
            setLoading(true); // Start loading
            try {
                const response = await axios.post(`http://localhost:8000/api/who_we_are/main_info/${id}`);
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

        try {
            const params = new URLSearchParams();
            params.append('main_title', formData.main_title);
            params.append('main_description', formData.main_description);

            if (formData.image) {
                params.append('image', formData.image); // This might not work well as images are usually not sent in GET requests.
            }

            // Use GET method for updating
            await axios.post(`http://localhost:8000/api/who_we_are/main_info/${id}?${params.toString()}`);
            setMessage('Main information updated successfully!');
            navigate('/show_who_we_are'); // Redirect after successful update
        } catch (error) {
            console.error('Error updating About Us data:', error.response?.data);
            setMessage('Error updating About Us data: ' + (error.response?.data.message || error.message));
        }
    };

    return (
        <>
            <Admin />
            <div className="adminHero">
                <h2>Update About Us</h2>
                {message && <p>{message}</p>}
                {loading && <p>Loading...</p>}
                <form onSubmit={handleSubmit}>
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
            </div></>
    );
}

export default UpdateMainWhoWeAre;
