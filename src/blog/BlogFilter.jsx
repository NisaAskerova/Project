import React, { useState } from 'react';
import homeBlogs from '../JSON/homeBlogs.json';

const BlogFilter = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredBlogs = homeBlogs.filter(
    (blog) =>
      blog.title && // blog.title mövcud olmalıdır
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === 'All' || blog.category === selectedCategory)
  );

  const categories = [ ...new Set(homeBlogs.map((blog) => blog.category))];

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div id='blogFilter'>
      <div id='searchInput'>
        <img src='../../search.svg' alt='Search Icon' />
        <input
          className='same'
          type='text'
          placeholder='Search'
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <div id='blogList'>
        <h3>Latest Post</h3>
        {filteredBlogs.slice(0, 3).map((blog, index) => (
          <div className='blogBox2' key={index}>
            <div>
              <img className='blogImage' src={blog.image} alt={blog.title} />
            </div>
            <div className='blogDateTitle'>
              <h3>{blog.title.slice(0, 35)}...</h3>
              <span>{blog.date}</span>
            </div>
          </div>
        ))}
      </div>

      <div className='categories'>
        <h3>Categories</h3>
        {categories.map((category, index) => (
          <div
            key={index}
            className={`categoryItem ${selectedCategory === category ? 'selected' : ''}`}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogFilter;
