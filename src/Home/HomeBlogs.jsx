import React from 'react'
import homeBlogs from '../JSON/homeBlogs.json'
import { useNavigate } from 'react-router-dom';

export default function HomeBlogs() {

  const navigate = useNavigate();

  const handleButtonClick = (id) => {
    navigate(`/blog/${id}`);
  };
  const blogs=homeBlogs.slice(0, 3)
  return (
    <div id='homeBlogs'>
      <span className="same">OUR BLOG</span>
      <h2 className="theck">Our Latest Blogs</h2>
      <p className="same">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
        The point of using Lorem Ipsum.</p>
      <div id='blogBoxes'>
        {blogs.map((e, index) => (
          <div onClick={() => handleButtonClick(e.id)} className='blogBox' key={index}>
            <div className='fDiv'>
              <img src={e.image} alt="" />
            </div>
            <h3>{e.title}</h3>
            <div className='blogDate'>
              <img src={e.icon} alt="" />
              <span>{e.date}</span>
            </div>
            <p className='same'>{e.description}</p>
            <button className='same'>{e.buttonText}<img src={e.buttonIcon} alt="" /></button>

          </div>
        ))}
      </div>
    </div>
  )
}
