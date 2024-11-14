import React, { useState } from 'react';

export default function Comment() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

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

  return (
    <div id='reviewForm'>
      <h3>Add your Review</h3>
      <span className='same'>Your Rating</span>
      <div className='ratingStars'>
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
      <form action="" method="POST">
        <label htmlFor="name">Name</label>
        <input className='same' type="text" name="name" id="name" placeholder="Enter Your Name" />
        <label htmlFor="email">Email</label>
        <input className='same' type="email" name="email" id="email" placeholder="Enter Your Email" />
        <label htmlFor="review">Your Review</label>
        <textarea className='same' name="review" id="review" placeholder="Enter Your Review"></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
