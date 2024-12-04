import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BlogFilter = () => {
  const [blogs, setBlogs] = useState([]); 
  const [searchTerm, setSearchTerm] = useState(''); // Axtarış üçün state
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Blogları gətirən funksiyalar
  const fetchBlogs = async (query = '') => {
    try {
      const url = query
        ? `http://localhost:8000/api/blogs/search?search=${query}` // Axtarış nəticələri üçün
        : `http://localhost:8000/api/blogs/show_blog`; // İlk 3 blog üçün
      const response = await axios.get(url);
      setBlogs(response.data);
    } catch (error) {
      setMessage('Failed to fetch blogs. Please try again later.');
    }
  };

  // Axtarış terminin dəyişməsinə görə yenilənir
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchTerm(query);
    fetchBlogs(query); // Axtarış funksiyasını çağırır
  };

  const handleButtonClick = (id) => {
    navigate(`/blog/${id}`);
  };

  // İlk yükləmə üçün ilk 3 blogu gətirir
  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div id='blogFilter'>
      <div id='searchInput'>
        <img src='../../search.svg' alt='Search Icon' />
        <input
          className='same'
          type='text'
          placeholder='Search'
          value={searchTerm}
          onChange={handleSearchChange} // Axtarış inputunu izləyir
        />
      </div>

      <div id='blogList'>
        <h3>{searchTerm ? 'Search Results' : 'Latest Posts'}</h3>
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <div
              onClick={() => handleButtonClick(blog.id)}
              key={blog.id}
              className='blogBox2'
            >
              <img
                className='blogImage'
                src={`http://localhost:8000/storage/${blog.image}`}
                alt={blog.title}
              />
              <div className='blogDateTitle'>
                <h3>{blog.title.slice(0, 45)}...</h3>
                <span>{new Date(blog.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          ))
        ) : (
          <p>{searchTerm ? 'No blogs found.' : 'No latest posts available.'}</p>
        )}
      </div>
    </div>
  );
};

export default BlogFilter;
