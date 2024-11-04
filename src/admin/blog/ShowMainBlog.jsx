import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Admin from '../Admin';

function ShowMainBlog() {
    const [blogs, setBlogs] = useState([]);
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const navigate = useNavigate();

    const fetchBlogs = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/blogs/main_info');
            setBlogs(response.data);
        } catch (error) {
            console.error("Blogları getirirken bir hata oluştu:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/blogs/main_info/${id}`);
            setMessage("Main information deleted successfully!");
            setIsSuccess(true);
            fetchBlogs(); // Silmeden sonra verileri yeniden getirir
        } catch (error) {
            console.error("Blog silinirken bir hata oluştu:", error);
            setMessage("Failed to delete main information.");
            setIsSuccess(false);
        }
    };

    const handleUpdate = (id) => {
        navigate(`/update_main_blog/${id}`);
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    return (
        <>
        <Admin/>
        <div className="adminHero">
        <button className="add-button" onClick={() => navigate('/add_main_blog')}>Add</button>

            <h3>Blog List</h3>
            {message && (
                <p style={{ color: isSuccess ? 'green' : 'red' }}>
                    {message}
                </p>
            )}
            <table border="1" style={{ width: '100%', marginTop: '20px' }}>
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {blogs.map((blog) => (
                        <tr key={blog.id}>
                            <td>{blog.type}</td>
                            <td>{blog.title}</td>
                            <td>{blog.description}</td>
                            <td>
                                <button className='edit-button' onClick={() => handleUpdate(blog.id)}>Update</button>
                                <button className='delete-button' onClick={() => handleDelete(blog.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div></>
    );
}

export default ShowMainBlog;
