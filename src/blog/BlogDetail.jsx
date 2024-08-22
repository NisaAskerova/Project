import React from 'react';
import { useParams } from 'react-router-dom';
import homeBlogs from '../JSON/homeBlogs.json';

export default function BlogDetail() {
  const { id } = useParams();

  // ID-ə əsasən blogu tapırıq
  const blog = homeBlogs.find(blog => blog.id === parseInt(id));

  // Blog tapılmadıqda göstərəcəyimiz məlumat
  // if (!blog) {
  //   return <div>Blog tapılmadı</div>;
  // }

  return (
    <div className='blogDetail'>
      <h2>{blog.title}</h2>
      <img src={blog.image} alt={blog.title} />
      <p>{blog.description}</p>
      <div className='blogDate'>
        <img src={blog.icon} alt="Icon" />
        <span>{blog.date}</span>
      </div>
    </div>
  );
}
