import React from 'react';
import { useNavigate } from 'react-router-dom';
import homeBlogs from '../JSON/homeBlogs.json';

export default function BlogPage2() {
  const navigate = useNavigate();

  const handleButtonClick = (id) => {
    navigate(`/blog/${id}`);
  };

  return (
    <div id='blog'>
      {homeBlogs.map((e, index) => (
        <div onClick={() => handleButtonClick(e.id)} className='blogBox' key={index}>
          <div>
            <img src={e.image} alt="" />
          </div>
          <h3>{e.title}</h3>
          <div className='blogDate'>
            <img src={e.icon} alt="" />
            <span>{e.date}</span>
          </div>
          <p className='same'>{e.description}</p>
          <button className='same'>
            {e.buttonText} <img src={e.buttonIcon} alt="" />
          </button>
        </div>
      ))}
    </div>
  );
}
