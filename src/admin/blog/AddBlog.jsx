import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Admin from '../Admin';

function AddBlog() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [dateIcon, setDateIcon] = useState(null);
    const [buttonIcon, setButtonIcon] = useState(null);
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); 


    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('image', image);
        formData.append('date_icon', dateIcon);
        formData.append('button_icon', buttonIcon);

        try {
            const response = await axios.post('http://localhost:8000/api/blogs/store', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setMessage(response.data.message);
            setTitle('');
            setDescription('');
            setImage(null);
            setDateIcon(null);
            setButtonIcon(null);
            navigate('/show_blog');
        } catch (error) {
            setMessage('Failed to create blog.');
        }
    };

    return (
        <>
        <Admin />
        <div className="adminHero">
            <h2>Create New Blog</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div>
                    <label>Image</label>
                    <input
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                        required
                    />
                </div>
                <div>
                    <label>Date Icon</label>
                    <input
                        type="file"
                        onChange={(e) => setDateIcon(e.target.files[0])}
                        required
                    />
                </div>
                <div>
                    <label>Button Icon</label>
                    <input
                        type="file"
                        onChange={(e) => setButtonIcon(e.target.files[0])}
                        required
                    />
                </div>
                <button type="submit">Create Blog</button>
            </form>
        </div>
        </>
    );
}

export default AddBlog;
