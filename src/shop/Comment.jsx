import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

export default function Comment({ addReview, productId }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState(""); 
  const [user, setUser] = useState(null); 
  const [isLoading, setIsLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState(""); 

  const authToken = localStorage.getItem("token"); 
  const navigate = useNavigate(); // Initialize navigate function

  useEffect(() => {
    if (!authToken) {
      window.location.href = "/login"; 
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/me", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (response.data.status) {
          setUser(response.data.data);
        } else {
          window.location.href = "/login";
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        window.location.href = "/login";
      } finally {
        setIsLoading(false); 
      }
    };

    fetchUser();
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

    if (comment.trim() === "" || rating <= 0) {
      console.error("Please provide both a comment and a valid rating.");
      return;
    }

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/reviews/${productId}/store`,
        {
          review_comment: comment,
          rating: rating,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      addReview(response.data.review); 
      setRating(0); 
      setComment(""); 
      setSuccessMessage("Your review has been successfully added!"); 

      // Redirect to the review page after successful submission
      navigate(`/reviews/${productId}`); // Update this URL to match your actual review page route
    } catch (error) {
      console.error("Error submitting review:", error.response?.data || error.message);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div id="reviewForm">
      <h3>Add your Review</h3>
      <span className="same">Your Rating</span>
      <div className="ratingStars">
        {starGroups.map((group, index) => (
          <React.Fragment key={index}>
            <div
              onMouseEnter={() => setHover(group.count)}
              onMouseLeave={() => setHover(rating)}
              onClick={() => handleRating(group.count)}
              style={{ cursor: 'pointer', display: 'inline-block', padding: '0 5px' }}
            >
              {group.label.map((star, starIndex) => (
                <img
                  key={starIndex}
                  src={hover >= group.count || rating >= group.count ? "/yellowStar.svg" : "/blackEmptyStar.svg"}
                  alt="star"
                  style={{
                    width: '20px',
                    height: '20px',
                    margin: '0 2px',
                  }}
                />
              ))}
            </div>
            {index < starGroups.length - 1 && <hr />}
          </React.Fragment>
        ))}
      </div>

      <label htmlFor="name">Name</label>
      <input
        className='same'
        type="text"
        name="name"
        id="name"
        placeholder='Enter Your Name'
      />
      <label htmlFor="email">Email</label>
      <input
        className='same emailInput'
        type="email"
        name="email"
        id="email"
        placeholder='Enter Your Email'
      />
      <label htmlFor="review">Your Review</label>
      <textarea
        className='same'
        name="review"
        id="review"
        placeholder='Enter Your Review'
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>
      <button type="submit" onClick={handleSubmit}>Submit Review</button>

      {successMessage && <div className="successMessage">{successMessage}</div>}
    </div>
  );
}
