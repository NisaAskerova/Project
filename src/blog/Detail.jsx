import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DetailHero from './DetailHero';
import BlogFilter from './BlogFilter';
import BlogComment from './BlogComment';
import Reply from './Reply';

export default function Detail() {
  const { id } = useParams(); // URL parametrini alırıq
  const [blog, setBlog] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/blogs/get_blog/${id}`);
        setBlog(response.data);
      } catch (error) {
        setMessage('Failed to fetch blog details. Please try again later.');
      }
    };
    
    fetchBlogDetails();
  }, [id]);

  if (message) {
    return <div style={{ color: 'red' }}>{message}</div>;
  }

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className='blogDetail'>
        <div className="bDetailLeft">
          <div className='blogDate'>
            <img className='bdi' src={`http://localhost:8000/storage/${blog.image}`} alt={blog.title} />
          </div>
          <h2 className='thick dthick'>{blog.title}</h2>
          <p className='desc'>{blog.detail_description}</p>
          <div className='contextDiv'>
            <p className='context'>{blog.detail_text}</p>
          </div>
          <p className='desc'>{blog.detail_short_description}</p>
          <div>
            <BlogComment />
            <Reply blogId={id} /> {/* Reply komponentinə id ötürülür */}
          </div>
        </div>
        <div className="BfilterRight">
          <BlogFilter />
        </div>
      </div>
    </>
  );
}
