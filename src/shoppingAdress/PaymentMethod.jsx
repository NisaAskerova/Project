import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MyContext } from '../App';

const PaymentMethod = () => {
  const navigate = useNavigate();
  const { cartTotal } = useContext(MyContext);

  // Dövlət dəyişənləri
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [payment_type, setPaymentType] = useState('');
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Əgər varsa, localStorage-dan məlumatı yükləyin
  useEffect(() => {
    const savedPaymentData = localStorage.getItem('paymentData');
    if (savedPaymentData) {
      const data = JSON.parse(savedPaymentData);
      setPaymentType(data.payment_type);
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
      setError('CVV maksimum 3 rəqəm olmalıdır.');
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

  const handlePaymentTypeChange = (event) => {
    setPaymentType(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ödəmə metodunu yoxlayın
    if (!payment_type || !['cashOnDelivery', 'card'].includes(payment_type)) {
      setError('Zəhmət olmasa keçərli ödəmə metodu seçin (nağd və ya kart).');
      return;
    }

    // Seçilmiş ödəmə metodunu localStorage-da saxlayın
    const paymentData = { payment_type };
    localStorage.setItem('paymentData', JSON.stringify(paymentData));

    // Yalnız 'kart' metodu seçildikdə digər kart məlumatlarını saxlayın
    if (payment_type === 'card') {
      if (!cardNumber || cardNumber.length !== 16) {
        setError('Zəhmət olmasa düzgün kart nömrəsi daxil edin.');
        return;
      }

      if (!cardName) {
        setError('Zəhmət olmasa kart sahibinin adını daxil edin.');
        return;
      }

      if (!expiryDate || expiryDate.length !== 5) {
        setError('Zəhmət olmasa düzgün son istifadə tarixini (AA/YY) daxil edin.');
        return;
      }

      if (!cvv || cvv.length !== 3) {
        setError('Zəhmət olmasa düzgün CVV daxil edin.');
        return;
      }

      // Bütün kart məlumatlarını localStorage-da saxlayın
      const cardData = {
        cardNumber,
        cardName,
        expiryDate,
        cvv,
      };
      localStorage.setItem('cardData', JSON.stringify(cardData));
    }

    setIsProcessing(true);
    navigate('/shoppingAddress/reviews');
  };

  const handleAddCard = () => {
    const cardData = { cardNumber, cardName, expiryDate, cvv };
    localStorage.setItem('cardData', JSON.stringify(cardData));
    alert('Kart məlumatları yadda saxlanıldı!');
  };

  return (
    <div>
      <h2>Ödəmə metodunu seçin</h2>
      <form id="method" onSubmit={handleSubmit}>
        <div id="debet">
          <input
            className="radio"
            type="radio"
            name="payment_type"
            value="card"
            checked={payment_type === 'card'}
            onChange={handlePaymentTypeChange}
          />
          <label htmlFor="dcCard"><h2>Debet/Kredit Kartı</h2></label>
        </div>
        {payment_type === 'card' && (
          <>
            <div>
              <label htmlFor="cardNumber">Kart Nömrəsi</label>
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
              <label htmlFor="cardName">Kart Sahibi</label>
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
                <label htmlFor="expiryDate">Son İstifadə Tarixi</label>
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

        <button className="same deliverBtn" type="button" onClick={handleAddCard} disabled={isProcessing}>
          Kartı əlavə et
        </button>

        <div>
          <div className="dbcard">
            <input
              className="radio"
              type="radio"
              name="payment_type"
              value="googlePay"
              checked={payment_type === 'googlePay'}
              onChange={handlePaymentTypeChange}
            />
            <label htmlFor="googlePay"><h2>Google Pay</h2></label>
          </div>
          <div className="dbcard">
            <input
              className="radio"
              type="radio"
              name="payment_type"
              value="paypal"
              checked={payment_type === 'paypal'}
              onChange={handlePaymentTypeChange}
            />
            <label htmlFor="paypal"><h2>Paypal</h2></label>
          </div>
          <div className="dbcard">
            <input
              className="radio"
              type="radio"
              name="payment_type"
              value="cashOnDelivery"
              checked={payment_type === 'cashOnDelivery'}
              onChange={handlePaymentTypeChange}
            />
            <label htmlFor="cashOnDelivery"><h2>Nağd Ödəmə</h2></label>
          </div>
        </div>

        <button type="submit" className="same deliverBtn" disabled={isProcessing}>
          Davam et
        </button>
      </form>
    </div>
  );
};

export default PaymentMethod;
