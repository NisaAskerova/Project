import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Avatar from './Avatar';
import Comment from './Comment';

export default function Review() {
    const { id } = useParams();  // URL-dən məhsul ID-sini alırıq
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchReviews();
    }, [id]);

    const fetchReviews = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/reviews/${id}`);
            setReviews(response.data);
            console.log(response.data); // Backend-dən gələn məlumatı yoxlayın
        } catch (error) {
            console.error("Rəy alınarkən xəta baş verdi:", error);
        } finally {
            setLoading(false);
        }
    };

    // Səhifə yüklənirsə, yüklenmə mesajı göstəririk
    if (loading) return <div>Yüklənir...</div>;

    return (
        <div className="review">
            <h3>Müştəri Rəyləri</h3>
            {reviews.length === 0 ? (
                <div>Rəy mövcud deyil</div>
            ) : (
                reviews.map((review, index) => (
                    <div key={index} className="reviewCard">
                        <div className="reviewTitle">
                            <div>
                                <Avatar name={review.user.first_name} avatar={review.user.avatar} />
                            </div>
                            <div>
                                <span>{review.user.first_name} {review.user.last_name}</span>
                                <div className="ratingReviewStars">
                                    {/* Reytinqə əsasən sarı ulduzları göstəririk */}
                                    {Array.from({ length: Math.floor(review.rating_value) }).map((_, i) => (
                                        <img key={i} src="/yellowStar.svg" alt="sarı ulduz" />
                                    ))}
                                    {/* 5 ulduz üçün boş ulduzları göstəririk */}
                                    {Array.from({ length: 5 - Math.floor(review.rating_value) }).map((_, i) => (
                                        <img key={i} src="/blackEmptyStar.svg" alt="boş ulduz" />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div>
                            {(() => {
                                const sentences = review.review_comment.split('.'); // Cümlələri ayırırıq
                                const firstSentence = sentences[0]; // İlk cümləni seçirik
                                const restOfComment = sentences.slice(1).join('.'); // Qalan hissələri birləşdiririk
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
                            <span>{new Date(review.review_date).toLocaleDateString('az-AZ', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}</span>
                        </div>
                    </div>
                ))
            )}
            {/* Comment komponentini inteqrasiya edirik */}
            <Comment productId={id} onNewReview={fetchReviews} />
        </div>
    );
}
