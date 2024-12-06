import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Reply({ blogId }) { // blogId-ni props ilə alırıq
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        comment: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Form dəyişikliklərini izləmək üçün
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Formu göndərmək üçün
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const token = localStorage.getItem('token');
        if (!token) {
            setError('Token tapılmadı. Zəhmət olmasa, yenidən daxil olun.');
            return;
        }

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/blogs/${blogId}/add_comment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Şərhinizi göndərmək mümkün olmadı.');
            }

            const result = await response.json();
            setSuccess('Şərhiniz uğurla göndərildi!');
            setFormData({ name: '', email: '', comment: '' });

            // Səhifəni yeniləyirik
            window.location.reload(); // Bu funksiya səhifəni yeniləyir

        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div id='reply'>
            <h3>Şərhinizi Burada Yazın</h3>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Ad</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Adınızı Daxil Edin"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email Ünvanı</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email Ünvanınızı Daxil Edin"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="comment">Şərhlər</label>
                    <textarea
                        name="comment"
                        id="comment"
                        placeholder="Şərhinizi Daxil Edin"
                        value={formData.comment}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <button type="submit">Göndər</button>
            </form>
        </div>
    );
}
