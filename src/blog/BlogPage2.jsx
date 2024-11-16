import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

export default function BlogPage2() {
  const [blogs, setBlogs] = useState([]); 
  const [message, setMessage] = useState(''); 
  const navigate = useNavigate();

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/blogs/show');
      setBlogs(response.data); 
    } catch (error) {
      setMessage('Failed to fetch blogs. Please try again later.');
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleButtonClick = (id) => {
    navigate(`/blog/${id}`);
  };

  return (
    <div id='blog'>
      {message && <p style={{ color: 'red' }}>{message}</p>}
      {blogs.map((blog) => (
        <div onClick={() => handleButtonClick(blog.id)} className='blogBox' key={blog.id}>
          <div>
            <img
              src={`http://localhost:8000/storage/${blog.image}`}
              alt={blog.title}
              style={{ width: '100%', height: 'auto' }} 
            />
          </div>
          <h3>{blog.title}</h3>
          <div className='blogDate'>
            <img
              src={`http://localhost:8000/storage/${blog.date_icon}`}
              alt="Date Icon"
              style={{ width: '20px', height: '20px' }}
            />
            <span className='same'>{moment(blog.date).format('MMMM DD, YYYY')}</span>
          </div>
          <p className='same'>{blog.description}</p>
          <button className='same'>
            Read More
            <img
              src={`http://localhost:8000/storage/${blog.button_icon}`}
              alt="Button Icon"
              style={{ width: '15px', height: '15px' }}
            />
          </button>
        </div>
      ))}
    </div>
  );
}
