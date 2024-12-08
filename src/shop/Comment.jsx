import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Comment({ addReview, productId, onNewReview }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const authToken = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!authToken) {
      window.location.href = "/login";
      return;
    }

    setIsLoading(false);
  }, [authToken]);

  const handleRating = (count) => {
    setRating(count);
  };

  const starGroups = [
    { count: 1, label: [1] },
    { count: 2, label: [1, 2] },
    { count: 3, label: [1, 2, 3] },
    { count: 4, label: [1, 2, 3, 4] },
    { count: 5, label: [1, 2, 3, 4, 5] },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name.trim() === "" || email.trim() === "" || comment.trim() === "" || rating <= 0) {
      console.error("Please fill in all fields and provide a valid rating.");
      return;
    }

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/reviews/${productId}/store`,
        {
          name: name,
          email: email,
          review_comment: comment,
          rating: rating,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      setName("");
      setEmail("");
      setRating(0); 
      setComment("");

      addReview(response.data.review);

      onNewReview();

      navigate(`/product/${productId}/review`);
    } catch (error) {
      console.error("Error submitting review:", error.response?.data || error.message);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <form id="reviewForm" onSubmit={handleSubmit}>
      <h3>Add your Review</h3>
      <div className="ratingStars">
        {starGroups.map((group, index) => (
          <React.Fragment key={index}>
            <div
              onMouseEnter={() => setHover(group.count)}
              onMouseLeave={() => setHover(rating)}
              onClick={() => handleRating(group.count)}
              style={{ cursor: "pointer", display: "inline-block", padding: "0 5px" }}
            >
              {group.label.map((star, starIndex) => (
                <img
                  key={starIndex}
                  src={hover >= group.count || rating >= group.count ? "/yellowStar.svg" : "/blackEmptyStar.svg"}
                  alt="star"
                  style={{
                    width: "20px",
                    height: "20px",
                    margin: "0 2px",
                  }}
                />
              ))}
            </div>
            {index < starGroups.length - 1 && <hr />}
          </React.Fragment>
        ))}
      </div>
      <span className="same">Your Rating</span>
      <label htmlFor="name">Your Name</label>
      <input
        type="text"
        id="name"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <label htmlFor="email">Your Email</label>
      <input
        type="email"
        id="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />



      <label htmlFor="review">Your Review</label>
      <textarea
        className="same"
        name="review"
        id="review"
        placeholder="Enter Your Review"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>

      <button type="submit">Submit Review</button>
    </form>
  );
}
