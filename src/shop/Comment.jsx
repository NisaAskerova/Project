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

    // localStorage-dan ad və email məlumatlarını oxuyun
    const firstName = localStorage.getItem('firstName') || "";
    const lastName = localStorage.getItem('lastName') || "";
    const userEmail = localStorage.getItem('email') || "";

    setName(`${firstName} ${lastName}`);
    setEmail(userEmail);

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

    if (comment.trim() === "" || rating <= 0) {
      console.error("Xahiş edirik, bütün xanaları doldurun və etibarlı reytinq əlavə edin.");
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

      setRating(0);
      setComment("");

      addReview(response.data.review);

      onNewReview();

      navigate(`/product/${productId}/review`);
    } catch (error) {
      console.error("Rəy göndərilərkən səhv baş verdi:", error.response?.data || error.message);
    }
  };

  if (isLoading) {
    return <div className='loadingDiv'><img src="../loading.gif" alt="Yüklənir..." /></div>;
  }

  return (
    <form id="reviewForm" onSubmit={handleSubmit}>
      <h3>Rəyinizi əlavə edin</h3>
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
                  alt="ulduz"
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
      <span className="same">Sizin Reytinqiniz</span>
      <label htmlFor="name">Adınız</label>
      <input
       className='same'
        type="text"
        id="name"
        value={name}
        readOnly
      />

      <label htmlFor="email">Email Ünvanınız</label>
      <input
       className='same'
        type="email"
        id="email"
        value={email}
        readOnly
      />

      <label htmlFor="review">Rəyiniz</label>
      <textarea
        className="same"
        name="review"
        id="review"
        placeholder="Rəyinizi daxil edin"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>

      <button type="submit">Rəyi Göndərin</button>
    </form>
  );
}
