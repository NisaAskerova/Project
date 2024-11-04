import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Admin from '../Admin';

function UpdateMainBlog() {
    const [formData, setFormData] = useState({
        type: '',
        title: '',
        description: ''
    });
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const { id } = useParams(); // URL'den blog ID'sini alır
    const navigate = useNavigate();

    // Blog verisini almak için useEffect kullanıyoruz
    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.post(`http://localhost:8000/api/blogs/main_info/${id}`);
                setFormData({
                    type: response.data.type,
                    title: response.data.title,
                    description: response.data.description,
                });
            } catch (error) {
                console.error("Veri alınırken bir hata oluştu:", error);
            }
        };

        fetchBlog();
    }, [id]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`http://localhost:8000/api/blogs/main_info/${id}`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            setMessage(response.data.message);
            setIsSuccess(true);

            // Güncelleme tamamlandıktan sonra yönlendirme
            navigate('/show_main_blog');
        } catch (error) {
            console.error("Güncelleme sırasında bir hata oluştu:", error.response?.data || error.message);
            setMessage("Failed to update main information.");
            setIsSuccess(false);
        }
    };

    return (
        <>
            <Admin />
            <div className="adminHero">
                <h2>Update Main Information</h2>
                {message && (
                    <p style={{ color: isSuccess ? 'green' : 'red' }}>
                        {message}
                    </p>
                )}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Type:</label>
                        <input
                            type="text"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Title:</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Description:</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit">Update Main Info</button>
                </form>
            </div>
        </>
    );
}

export default UpdateMainBlog;
