import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';

export default function BlogComment() {
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState('');

  // Tokeni localStorage və ya sessionStorage-dan əldə et
  const token = localStorage.getItem('token');  // Və ya sessionStorage.getItem('authToken') istifadə edin, əgər burada saxlanırsa

  useEffect(() => {
    const fetchComments = async () => {
      if (!token) {
        setMessage('Şərhləri görmək üçün daxil olmalısınız.');
        return;
      }

      try {
        const response = await fetch(`http://localhost:8000/api/blogs/${id}/comments`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`  // Authorization başlığına token əlavə et
          }
        });
        
        if (!response.ok) {
          throw new Error('Şərhləri əldə etmək mümkün olmadı');
        }

        const data = await response.json();
        console.log('Əldə edilən şərhlər:', data); // Cevab məlumatını yoxlamaq üçün log et
        if (Array.isArray(data)) {
          setComments(data); // Məlumatın massiv olduğunu yoxla
        } else {
          setMessage('Əldə edilən məlumat formatı yanlışdır.');
        }
        
      } catch (error) {
        console.error('Şərhləri əldə edərkən səhv:', error); // Hər hansı səhvləri log et
      }
    };

    fetchComments();
  }, [id, token]);  // token-i asılılıq array-ə əlavə et

  const commentCount = comments.length;
  console.log('Şərh sayı:', commentCount); // Şərh sayını log et

  return (
    <div className='blogComments'>
      <h2 className='thick'>
        {commentCount} {commentCount === 1 ? 'Şərh' : 'Şərhlər'}
      </h2>
      {message && <p style={{ color: 'red' }}>{message}</p>} {/* Hər hansı səhv mesajı varsa göstər */}
      {commentCount > 0 ? (
        comments.map((comment, index) => (
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
                <span className='same'>{moment(comment.date).format('MMMM DD, YYYY')}</span>
              </div>
            </div>
            <div className='commentContent'>
              <p className='same'>{comment.comment}</p>
            </div>
          </div>
        ))
      ) : (
        <p className='same'>Şərh yoxdur</p> 
      )}
    </div>
  );
}

function getBackgroundColor(name) {
  const colors = ['#FFB6C1', '#FFDDC1', '#FFABAB', '#FFC3A0', '#B9FBC0'];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
}
