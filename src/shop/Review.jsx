import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Avatar from './Avatar';
import Comment from './Comment';

export default function Review() {
    const { id } = useParams();  // Get the product ID from the URL
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetchReviews();
    }, [id]);
    
    const fetchReviews = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/reviews/${id}`);
            setReviews(response.data);
        } catch (error) {
            console.error("Error fetching reviews:", error);
        } finally {
            setLoading(false);
        }
    };
    
    if (loading) return <div>Loading...</div>;

    return (
        <div className="review">
            <h3>Customer Reviews</h3>
            {reviews.length === 0 ? (
                <div>No reviews available</div>
            ) : (
                reviews.map((review, index) => (
                    <div key={index} className="reviewCard">
                        <div className="reviewTitle">
                            <div>
                                <Avatar name={review.user.first_name} avatar={review.user.avatar} />
                            </div>
                            <div>
                                <span>{review.user.first_name} {review.user.last_name}</span>
                                <div className='ratingReviewStars'>
                                    {/* Display yellow stars based on the rating */}
                                    {Array.from({ length: Math.floor(review.rating.rating) }).map((_, i) => (
                                        <img key={i} src="/yellowStar.svg" alt="yellow star" />
                                    ))}
                                    {/* Display empty stars for the remaining stars to make up 5 */}
                                    {Array.from({ length: 5 - Math.floor(review.rating.rating) }).map((_, i) => (
                                        <img key={i} src="/blackEmptyStar.svg" alt="empty star" />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div>
                            {(() => {
                                const sentences = review.review_comment.split('.'); // Cümlələri ayırır
                                const firstSentence = sentences[0]; // İlk cümləni seçir
                                const restOfComment = sentences.slice(1).join('.'); // Qalan hissələri birləşdirir
                                return (
                                    <p className="same">
                                        <strong style={{ display: 'block' }}>{firstSentence}.</strong>
                                        {restOfComment}
                                    </p>
                                );
                            })()}
                        </div>

                        <div className="reviewDate">
                            <span className="gray">Review by </span>
                            <span>Security</span>
                            <span className="gray">Posted on </span>
                            <span>{new Date(review.review_date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}</span>
                        </div>
                    </div>
                ))
            )}
            {/* Integrating the Comment component */}
            <Comment productId={id} />
        </div>
    );
}
