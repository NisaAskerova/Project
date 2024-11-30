import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MyContext } from '../App';

const PaymentMethod = () => {
  const navigate = useNavigate();
  const { cartTotal } = useContext(MyContext);
  
  // State variables
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Load data from localStorage if exists
  useEffect(() => {
    const savedPaymentData = localStorage.getItem('paymentData');
    if (savedPaymentData) {
      const data = JSON.parse(savedPaymentData);
      setPaymentMethod(data.paymentMethod);
      setCardNumber(data.cardNumber);
      setCardName(data.cardName);
      setExpiryDate(data.expiryDate);
      setCvv(data.cvv);
    }
  }, []);

  const handleExpiryDateChange = (event) => {
    let value = event.target.value;
    if (/[^0-9/]/.test(value)) return;
    if (value.length === 2 && !value.includes('/')) {
      value = value + '/';
    }
    if (value.length > 5) return;
    setExpiryDate(value);
    setError('');
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

  const handleCardNumberChange = (event) => {
    const value = event.target.value;
    if (/[^0-9]/.test(value)) return; 
    setCardNumber(value);
    setError('');
  };

  const handleCardNameChange = (event) => {
    setCardName(event.target.value);
    setError('');
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate payment method
    if (!paymentMethod || !['cashOnDelivery', 'card'].includes(paymentMethod)) {
      setError('Please select a valid payment method (cash or card).');
      return;
    }

    // Save the selected payment method to localStorage
    const paymentData = { paymentMethod };
    localStorage.setItem('paymentData', JSON.stringify(paymentData));
  
    // Only store the other card data if 'card' method is selected
    if (paymentMethod === 'card') {
      if (!cardNumber || cardNumber.length !== 16) {
        setError('Please enter a valid card number.');
        return;
      }
  
      if (!cardName) {
        setError('Please enter the cardholder name.');
        return;
      }
  
      if (!expiryDate || expiryDate.length !== 5) {
        setError('Please enter a valid expiry date (MM/YY).');
        return;
      }
  
      if (!cvv || cvv.length !== 3) {
        setError('Please enter a valid CVV.');
        return;
      }
  
      // Save all card information to localStorage
      const cardData = {
        cardNumber,
        cardName,
        expiryDate,
        cvv,
      };
      localStorage.setItem('cardData', JSON.stringify(cardData));
    }
  
    // Navigate to next page without submitting payment
    navigate('/shoppingAddress/reviews');
  };
  
  return (
    <div>
      <h2>Select a payment method</h2>
      <form id="method" onSubmit={handleSubmit}>
        <div id="debet">
          <input
            className="radio"
            type="radio"
            name="paymentMethod"
            value="card"
            checked={paymentMethod === 'card'}
            onChange={handlePaymentMethodChange}
          />
          <label htmlFor="dcCard"><h2>Debit/Credit Card</h2></label>
        </div>
        {paymentMethod === 'card' && (
          <>
            <div>
              <label htmlFor="cardNumber">Card Number</label>
              <input
                className="same"
                type="text"
                name="cardNumber"
                id="cardNumber"
                value={cardNumber}
                onChange={handleCardNumberChange}
                maxLength="16"
              />
            </div>
            <div>
              <label htmlFor="cardName">Card Name</label>
              <input
                className="same"
                type="text"
                name="cardName"
                id="cardName"
                value={cardName}
                onChange={handleCardNameChange}
              />
            </div>
            <div id="date">
              <div>
                <label htmlFor="expiryDate">Expiry Date</label>
                <input
                  className="same"
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
                  className="same"
                  type="text"
                  name="cvv"
                  id="cvv"
                  value={cvv}
                  onChange={handleCvvChange}
                  maxLength="3"
                />
              </div>
            </div>
          </>
        )}

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button className="same deliverBtn" type="submit" disabled={isProcessing}>
          Add Card
        </button>

        <div>
          <div className="dbcard">
            <input
              className="radio"
              type="radio"
              name="paymentMethod"
              value="googlePay"
              checked={paymentMethod === 'googlePay'}
              onChange={handlePaymentMethodChange}
            />
            <label htmlFor="googlePay"><h2>Google Pay</h2></label>
          </div>
          <div className="dbcard">
            <input
              className="radio"
              type="radio"
              name="paymentMethod"
              value="paypal"
              checked={paymentMethod === 'paypal'}
              onChange={handlePaymentMethodChange}
            />
            <label htmlFor="paypal"><h2>Paypal</h2></label>
          </div>
          <div className="dbcard">
            <input
              className="radio"
              type="radio"
              name="paymentMethod"
              value="cashOnDelivery"
              checked={paymentMethod === 'cashOnDelivery'}
              onChange={handlePaymentMethodChange}
            />
            <label htmlFor="cashOnDelivery"><h2>Cash on Delivery</h2></label>
          </div>
        </div>

        <button type="submit" className="same deliverBtn" disabled={isProcessing}>
          Continue
        </button>
      </form>
    </div>
  );
};

export default PaymentMethod;
