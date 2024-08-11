import React, { useState } from 'react';

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

  return (
    <div>
      <h2>Select a payment method</h2>
      <form action="" method='POST'>
        <div>
          <input type="checkbox" name="dcCard" id="dcCard" />
          <label htmlFor="dcCard">Debit/Credit Card</label>
        </div>
        <div>
          <label htmlFor="cardNumber">Card Number</label>
          <input type="number" name="cardNumber" id="cardNumber" />
        </div>
        <div>
          <label htmlFor="cardName">Card Name</label>
          <input type="text" name="cardName" id="cardName" />
        </div>
        <div>
          <div>
            <label htmlFor="expiryDate">Expiry Date</label>
            <input
              type="text"
              name="expiryDate"
              id="expiryDate"
              value={expiryDate}
              onChange={handleExpiryDateChange}
            />
          </div>
          <div>
            <label htmlFor="cvv">CVV</label>
            <input
              type="text"
              name="cvv"
              id="cvv"
              value={cvv}
              onChange={handleCvvChange}
            />
          </div>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button>Add Card</button>
        <div>
          <div>
            <input type="radio" name="" id="" />
            <label htmlFor="Google Pay"></label>
          </div>
          <div>
            <input type="radio" name="" id="" />
            <label htmlFor="Google Pay"></label>
          </div>
          <div>
            <input type="radio" name="" id="" />
            <label htmlFor="Google Pay"></label>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PaymentMethod;
