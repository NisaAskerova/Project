import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Order() {
  const navigate = useNavigate();

  const handleViewOrder = () => {
    navigate('/shop');
  };

  const handleBackToHome = () => {
    navigate('/home'); 
  };

  return (
    <div id='orders'>
      <div id='order'>
        <div id='yDiv'>
          <img src="../shopbag.svg" alt="" />
        </div>
        <div>
          <h3>Your order is confirmed</h3>
          <span className='same'>Thanks for shopping!</span>
          <span className='same'>Your order hasn’t shipped yet,</span>
          <span className='same'>but we will send you an email when it’s done.</span>
        </div>
        <div id='orBtn'>
          <button onClick={handleViewOrder} className="same ybtn">View Order</button>
          <button onClick={handleBackToHome} className="same whiteBtn">Back to Home</button>
        </div>
      </div>
    </div>
  );
}
