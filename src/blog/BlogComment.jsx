import React from 'react';
import { useParams } from 'react-router-dom';
import homeBlogs from '../JSON/homeBlogs.json';

export default function BlogComment() {
  const { id } = useParams();
  const blog = homeBlogs.find(blog => blog.id === id);

  if (!blog) {
    return <div>Blog not found</div>;
  }

  const commentCount = blog.comment ? blog.comment.length : 0;

  return (
    <div className='blogComments'>
      <h2 className='thick'>
        {commentCount} {commentCount === 1 ? 'Comment' : 'Comments'}
      </h2>
      {blog.comment && blog.comment.length > 0 ? (
        <div>
          {blog.comment.map((comment, index) => (
            <div key={index} className='commentBox'>
                <div className='commentTitle'>
                    <div className='commentUserImage'>
                {comment.image ? (
                  <img src={comment.image} alt={`${comment.name}'s profile`} />
                ) : (
                  <div className='userInitial' style={{ backgroundColor: getBackgroundColor(comment.name) }}>
                    {comment.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div>
                    <h4>{comment.name}</h4>
                <span>{comment.date}</span>
              </div>
           
                </div>
              
              <div className='commentContent'>
               
                <p className='same'>{comment.rev}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No comments available</p>
      )}
    </div>
  );
}

function getBackgroundColor(name) {
  const colors = ['#FFB6C1', '#FFDDC1', '#FFABAB', '#FFC3A0', '#B9FBC0'];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
}
