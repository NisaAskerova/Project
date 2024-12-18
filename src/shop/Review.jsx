import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Avatar from './Avatar';
import Comment from './Comment';
import moment from 'moment';

export default function Review() {
  const { id } = useParams(); // URL-dən məhsul ID-sini alırıq
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token'); // Tokeni localStorage-dən götürürük

  useEffect(() => {
    fetchReviews();
  }, [id]);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/reviews/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Gələn məlumat:", response.data);

      // Gələn məlumatın strukturu burada yoxlanılır
      if (Array.isArray(response.data.reviews)) {
        setReviews(response.data.reviews); // Əgər `reviews` massivdirsə
      } else {
        console.error("Gözlənilməyən məlumat strukturu:", response.data);
        setReviews([]); // Gözlənilməz strukturlar üçün boş massiv təyin edirik
      }
    } catch (error) {
      console.error("Rəy alınarkən xəta baş verdi:", error);
      if (error.response) {
        console.error("Server xətası:", error.response.data);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleNewReview = () => {
    fetchReviews(); // Yeni rəy əlavə edildikdə rəyləri yenidən yükləyir
  };

  if (loading) return <div className='loadingDiv'><img  src="/loading.gif" alt="" /></div>;

  return (
    <div className="review">
      <h3>Müştəri Rəyləri</h3>
      {reviews.length === 0 ? (
        <div>Rəy mövcud deyil</div>
      ) : (
        reviews.map((review, index) => {
          // `ratings` massivini yoxlayıb ən yüksək qiyməti alırıq
          const ratingValue = review.ratings && review.ratings.length > 0 
            ? Math.max(...review.ratings.map(rating => parseFloat(rating.rating))) // Ən yüksək qiyməti alırıq
            : 0;  // Əgər `ratings` massivində heç bir qiymət yoxdursa, sıfır göstəririk
          
          return (
            <div key={index} className="reviewCard">
              <div className="reviewTitle">
                <div>
                  <Avatar name={review.user.first_name} avatar={review.user.avatar} />
                </div>
                <div>
                  <span>{review.user.first_name} {review.user.last_name}</span>
                  <div className="ratingReviewStars">
                    {Array.from({ length: Math.floor(ratingValue) }).map((_, i) => (
                      <img key={i} src="/yellowStar.svg" alt="yellow star" />
                    ))}
                    {ratingValue % 1 >= 0.5 && (
                      <img src="/halfStar.svg" alt="half star" />
                    )}
                    {Array.from({ length: 5 - Math.ceil(ratingValue) }).map((_, i) => (
                      <img key={i} src="/blackEmptyStar.svg" alt="empty star" />
                    ))}
                  </div>
                </div>
              </div>
              <div>
                {(() => {
                  const sentences = review.review_comment.split('.'); 
                  const firstSentence = sentences[0]; 
                  const restOfComment = sentences.slice(1).join('.');

                  return (
                    <p className="same">
                      <strong style={{ display: 'block' }}>{firstSentence}.</strong>
                      {restOfComment}
                    </p>
                  );
                })()}
              </div>
              <div className="reviewDate">
                <span className="gray">Rəy yazar: </span>
                <span>{review.user.first_name}</span>
                <span className="gray">Paylaşılma tarixi: </span>
                <span className='same'>{moment(review.created_at).format('MMMM DD, YYYY')}</span>
              </div>
            </div>
          );
        })
      )}
      <Comment productId={id} onNewReview={handleNewReview} />
    </div>
  );
}
