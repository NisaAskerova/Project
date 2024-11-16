import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

export default function HomeBlogs() {
  const [blogs, setBlogs] = useState([]); 
  const [message, setMessage] = useState(''); 
  const navigate = useNavigate();

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/blogs/show');
      const fetchedBlogs = response.data.slice(0, 3); 
      setBlogs(fetchedBlogs);
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
    <div id="homeBlogs">
      <span className="same">OUR BLOG</span>
      <h2 className="thick">Our Latest Blogs</h2>
      <p className="same">
        It is a long established fact that a reader will be distracted by the
        readable content of a page when looking at its layout. The point of
        using Lorem Ipsum.
      </p>
      <div id="blogBoxes">
        {message && <p style={{ color: 'red' }}>{message}</p>}
        {blogs.map((blog) => (
          <div
            onClick={() => handleButtonClick(blog.id)}
            className="blogBox"
            key={blog.id}
          >
            <div className="fDiv">
              <img
                src={`http://localhost:8000/storage/${blog.image}`}
                alt={blog.title}
              />
            </div>
            <h3>{blog.title}</h3>
            <div className="blogDate">
              <img
                src={`http://localhost:8000/storage/${blog.date_icon}`}
                alt="Date Icon"
              />
            <span className='same'>{moment(blog.date).format('MMMM DD, YYYY')}</span>
            </div>
            <p className="same">{blog.description}</p>
            <button className="same">
              Read More
              {blog.button_text}
              <img
                src={`http://localhost:8000/storage/${blog.button_icon}`}
                alt="Button Icon"
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
