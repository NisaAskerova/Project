import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Admin from '../Admin';

function MainBlog() {
    const [formData, setFormData] = useState({
        type: '',
        title: '',
        description: ''
    });

    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const navigate = useNavigate(); 

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post('http://localhost:8000/api/blogs/main_info', formData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            setMessage(response.data.message);
            setIsSuccess(true);
            setFormData({
                type: '',
                title: '',
                description: ''
            });
    
            // Yönlendirmeyi burada çağırıyoruz
            navigate('/show_main_blog');
            
        } catch (error) {
            console.error("Form gönderimi sırasında bir hata oluştu:", error.response?.data || error.message);
            setMessage("Failed to add main information.");
            setIsSuccess(false);
        }
    };
    
    return (
        <>
            <Admin />
            <div className="adminHero">
                <h2>Add Main Information</h2>
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
                    <button type="submit">Main Info Ekle</button>
                </form>
            </div>
        </>
    );
}

export default MainBlog;
