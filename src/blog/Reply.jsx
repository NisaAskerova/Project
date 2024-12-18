import React, { useState, useEffect } from 'react';

export default function Reply({ blogId }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        comment: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        // LocalStorage-dan dəyərləri alıb formData-ya yazırıq
        const firstName = localStorage.getItem('firstName') || '';
        const lastName = localStorage.getItem('lastName') || '';
        const email = localStorage.getItem('email') || '';

        setFormData({
            name: `${firstName} ${lastName}`,
            email: email,
            comment: '',
        });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

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
            setFormData({ ...formData, comment: '' });

            window.location.reload();
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div id="reply">
            <h3>Şərhinizi Burada Yazın</h3>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Ad</label>
                    <input
                        className='same'
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        readOnly // Input dəyişdirilməsinə icazə verilmir
                    />
                </div>
                <div>
                    <label htmlFor="email">Email Ünvanı</label>
                    <input
                        className='same'
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        readOnly // Input dəyişdirilməsinə icazə verilmir
                    />
                </div>
                <div>
                    <label htmlFor="comment">Şərhlər</label>
                    <textarea
                        className='same'
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
