import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Admin from '../Admin';

function ShowBlog() {
    const [blogs, setBlogs] = useState([]);
    const [mainBlogs, setMainBlogs] = useState([]);
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const navigate = useNavigate();

    // Function to fetch regular blogs
    const fetchBlogs = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/blogs/show');
            setBlogs(response.data);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        }
    };

    // Function to fetch main blogs
    const fetchMainBlogs = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/blogs/main_info');
            setMainBlogs(response.data);
        } catch (error) {
            console.error('Error fetching main blogs:', error);
        }
    };

    // Function to handle delete action for regular blogs
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/blogs/delete/${id}`);
            setMessage('Blog deleted successfully.');
            setIsSuccess(true);
            fetchBlogs();
        } catch (error) {
            setMessage('Failed to delete blog.');
            setIsSuccess(false);
        }
    };

    // Function to handle delete action for main blogs
    const handleMainDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/blogs/main_info/${id}`);
            setMessage("Main information deleted successfully!");
            setIsSuccess(true);
            fetchMainBlogs(); // Fetch main blogs after deletion
        } catch (error) {
            console.error("Error deleting main information:", error);
            setMessage("Failed to delete main information.");
            setIsSuccess(false);
        }
    };

    // Function to handle updating a blog
    const handleUpdate = (id) => {
        navigate(`/update_blog/${id}`);
    };

    // Effect to fetch blogs on component mount
    useEffect(() => {
        fetchBlogs();
        fetchMainBlogs();
    }, []);

    return (
        <>
            <Admin />
            <div className="adminHero">
                <button className="add-button" onClick={() => navigate('/add_blog')}>Add Blog</button>
                <button className="add-button" onClick={() => navigate('/add_main_blog')}>Add Main Blog</button>
                <h3>Main Blog List</h3>
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
                        {mainBlogs.map((mainBlog) => (
                            <tr key={mainBlog.id}>
                                <td>{mainBlog.type}</td>
                                <td>{mainBlog.title}</td>
                                <td>{mainBlog.description}</td>
                                <td>
                                    <button className='edit-button' onClick={() => navigate(`/update_main_blog/${mainBlog.id}`)}>Update</button>
                                    <button className='delete-button' onClick={() => handleMainDelete(mainBlog.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <h3>Blog List</h3>
                {message && (
                    <p style={{ color: isSuccess ? 'green' : 'red' }}>
                        {message}
                    </p>
                )}
                <table border="1" cellPadding="10" cellSpacing="0" style={{ width: '100%', marginTop: '20px' }}>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Image</th>
                            <th>Date Icon</th>
                            <th>Button Icon</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs.map((blog) => (
                            <tr key={blog.id}>
                                <td>{blog.title}</td>
                                <td>{blog.description}</td>
                                <td>
                                    {blog.image && (
                                        <img 
                                            src={`http://localhost:8000/storage/${blog.image}`} 
                                            alt="Blog" 
                                            width="100"
                                        />
                                    )}
                                </td>
                                <td>
                                    {blog.date_icon && (
                                        <img 
                                            src={`http://localhost:8000/storage/${blog.date_icon}`} 
                                            alt="Date Icon" 
                                            width="30"
                                        />
                                    )}
                                </td>
                                <td>
                                    {blog.button_icon && (
                                        <img 
                                            src={`http://localhost:8000/storage/${blog.button_icon}`} 
                                            alt="Button Icon" 
                                            width="30"
                                        />
                                    )}
                                </td>
                                <td>
                                    <button className='edit-button' onClick={() => handleUpdate(blog.id)}>
                                        Update
                                    </button>
                                    <button className='delete-button' onClick={() => handleDelete(blog.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </>
    );
}

export default ShowBlog;
