import React, { useState } from 'react';

export default function Comment() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleRating = (index) => {
    setRating(index);
  };

  const getStarIndex = (index) => {
    if (index < 2) return 1;
    if (index < 4) return 2;
    if (index < 7) return 3;
    if (index < 12) return 5;
    return 15;
  };

  return (
    <div id='reviewForm'>
      <h3>Add your Review</h3>
      <span className='same'>Your Rating</span>
      <div className='ratingStars'>
        {[...Array(15)].map((_, index) => {
          const starIndex = index + 1;
          const groupIndex = getStarIndex(starIndex);
          return (
            <React.Fragment key={starIndex}>
                <div>
              <img
                src={starIndex <= (hover || rating) ? "/yellowStar.svg" : "/blackEmptyStar.svg"}
                alt=""
                onMouseEnter={() => setHover(starIndex)}
                onMouseLeave={() => setHover(rating)}
                onClick={() => handleRating(starIndex)}
                className="star"
              />
                </div>
              {(starIndex % groupIndex === 0) && starIndex !== 15 && <hr />}
            </React.Fragment>
          );
        })}
      </div>
      <form  action="" method='POST'>
        <label htmlFor="name">Name</label>
        <input className='same' type="text" name="name" id="name" placeholder='Enter Your Name' />
        <label htmlFor="email">Email</label>
        <input className='same' type="email" name="email" id="email" placeholder='Enter Your Email' />
        <label htmlFor="review">Your Review</label>
        <textarea className='same' name="review" id="review" placeholder='Enter Your Review'></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
