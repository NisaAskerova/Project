import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Avatar from './Avatar'; 
import Comment from "./Comment";
export default function Review() {
    const { id } = useParams();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchReviews = async () => {
        try {
            const response = await axios.get('/json/products.json');
            const product = response.data.products.find(p => p.id === parseInt(id));
            setReviews(product ? product.customerReviews : []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, [id]);

    if (loading) return <div>Loading...</div>;

    return (
        <div className='review'>
            <h3>Customer Reviews</h3>
            {reviews.length === 0 ? (
                <div>No reviews available</div>
            ) : (
                reviews.map((review, index) => (
                    <div key={index} className="reviewCard" >
                        <div className='reviewTitle'>
                        <div>
                            <Avatar name={review.name} avatar={review.avatar} />
                        </div>
                        <div>
                            <span>{review.name}</span>
                            <div>
                            {Array.from({ length: review.rating }).map((_, i) => (
                                <img key={i} src="/yellowStar.svg" alt="star" />
                            ))}
                            {review.rating % 1 !== 0 && <img src="/halfStar.svg" alt="half star" />}
                            {Array.from({ length: 5 - Math.ceil(review.rating) }).map((_, i) => (
                                <img key={i} src="/emptyStar.svg" alt="empty star" />
                            ))}

                            </div>
                        </div>
                        </div>
                        <div>
                            <strong style={{marginTop:"10px", display:"block"}} >{review.comment}</strong>
                            <p className="same">{review.rev}</p>
                        </div>
                        <div className="reviewDate"> 
                            <span className="gray">Review by </span>
                            <span>Secura</span>
                            <span className='gray'>Posted on</span>
                            <span>{review.date}</span>
                        </div>
                    </div>
                ))
            )}
            <Comment/>
        </div>
    );
}
