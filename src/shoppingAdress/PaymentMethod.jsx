import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PaymentMethod = () => {
  const [expiryDate, setExpiryDate] = useState('09/26');
  const [cvv, setCvv] = useState('...');
  const [error, setError] = useState('');

  const handleExpiryDateChange = (event) => {
    const value = event.target.value;

    if (value.length <= 5) {
      if (/^(0[1-9]|1[0-2])\/\d{2}$/.test(value) || value === '') {
        setExpiryDate(value);
        setError('');
      } else {
        setError('Expiry date format is MM/YY.');
      }
    } else {
      setError('Expiry date must be at most 5 characters long.');
    }
  };

  const handleCvvChange = (event) => {
    const value = event.target.value;

    if (value.length <= 3 && /^[0-9]*$/.test(value)) {
      setCvv(value);
      setError('');
    } else {
      setError('CVV must be a maximum of 3 digits.');
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setActiveStep('reviews'); 
    navigate('/shoppingAddress/reviews');
  };
  return (
    <div>
      <h2>Select a payment method</h2>
      <form id='method' onSubmit={handleSubmit} action="" method='POST'>
        <div id='debet'>
          <input className='radio' type="checkbox" name="dcCard" id="dcCard" />
          <label htmlFor="dcCard"><h2>Debit/Credit Card</h2></label>
        </div>
        <div>
          <label htmlFor="cardNumber">Card Number</label>
          <input className='same' type="number" name="cardNumber" id="cardNumber" />
        </div>
        <div>
          <label htmlFor="cardName">Card Name</label>
          <input className='same' type="text" name="cardName" id="cardName" />
        </div>
        <div id='date'>
          <div>
            <label htmlFor="expiryDate">Expiry Date</label>
            <input className='same' type="text" name="expiryDate" id="expiryDate" value={expiryDate} onChange={handleExpiryDateChange} />
          </div>
          <div>
            <label htmlFor="cvv">CVV</label>
            <input className='same' type="text" name="cvv" id="cvv" value={cvv} onChange={handleCvvChange} />
          </div>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button className="same deliverBtn">Add Card</button>
        <div>
          <div className='dbcard'>
            <input className='radio' type="radio" name="pay" id="googlePay" />
            <label htmlFor="googlePay"> <h2>Google Pay</h2></label>
          </div>
          <div className='dbcard'>
            <input className='radio' type="radio" name="pay" id="paypal" />
            <label htmlFor="paypal"> <h2>Paypal</h2></label>
          </div>
          <div className='dbcard'>
            <input className='radio' type="radio" name="pay" id="cashOnDelivery" />
            <label htmlFor="cashOnDelivery"> <h2>Cash on Delivery</h2></label>
          </div>
        </div>
        <Link to="/shoppingAddress/reviews" className="same deliverBtn">
        Continue
        </Link>
      </form>
    </div>
  );
};

export default PaymentMethod;
