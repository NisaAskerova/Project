import React, { useState } from 'react';
import homeBlogs from '../JSON/homeBlogs.json';

const BlogFilter = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredBlogs = homeBlogs
    .filter(blog => 
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === 'All' || blog.category === selectedCategory)
    );

  const categories = ['All', ...new Set(homeBlogs.map(blog => blog.category))];

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div id='blogFilter'>
      <input 
        type='text' 
        placeholder='Search...' 
        value={searchTerm} 
        onChange={handleSearchChange} 
      />

      <div id='blogList'>
        {filteredBlogs.slice(0, 3).map((blog, index) => (
          <div className='blogBox' key={index}>
            <div>
              <img src={blog.image} alt="" />
            </div>
            <h3>{blog.title}</h3>
            <div className='blogDate'>
              <img src={blog.icon} alt="" />
              <span>{blog.date}</span>
            </div>
            <p className='same'>{blog.description}</p>
          </div>
        ))}
      </div>
      <select value={selectedCategory} onChange={handleCategoryChange} multiple>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BlogFilter;
