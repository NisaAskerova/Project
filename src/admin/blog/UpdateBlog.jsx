import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Admin from '../Admin';

function UpdateBlog() {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [dateIcon, setDateIcon] = useState(null);
    const [buttonIcon, setButtonIcon] = useState(null);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchBlog();
    }, []);

    const fetchBlog = async () => {
        try {
            const response = await axios.post(`http://localhost:8000/api/blogs/update/${id}`);
            const blog = response.data;
            setTitle(blog.title);
            setDescription(blog.description);
        } catch (error) {
            setMessage('Failed to fetch blog details.');
            console.error(error);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        if (image) formData.append('image', image);
        if (dateIcon) formData.append('date_icon', dateIcon);
        if (buttonIcon) formData.append('button_icon', buttonIcon);

        try {
            const response = await axios.post(`http://localhost:8000/api/blogs/update/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setMessage(response.data.message || 'Blog updated successfully.');
            navigate('/show_blog');
        } catch (error) {
            setMessage('Failed to update blog.');
            console.error(error);
        }
    };

    return (
        <>
            <Admin />
            <div className="adminHero">
                <h2>Update Blog</h2>
                {message && <p>{message}</p>}
                <form onSubmit={handleUpdate}>
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
                        <label>New Image (optional)</label>
                        <input
                            type="file"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                    </div>
                    <div>
                        <label>New Date Icon (optional)</label>
                        <input
                            type="file"
                            onChange={(e) => setDateIcon(e.target.files[0])}
                        />
                    </div>
                    <div>
                        <label>New Button Icon (optional)</label>
                        <input
                            type="file"
                            onChange={(e) => setButtonIcon(e.target.files[0])}
                        />
                    </div>
                    <button type="submit">Update Blog</button>
                </form>
            </div>
        </>
    );
}

export default UpdateBlog;
