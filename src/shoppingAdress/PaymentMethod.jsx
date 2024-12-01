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
  const [paymentMethod, setPaymentMethod] = useState('');
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Əgər varsa, localStorage-dan məlumatı yükləyin
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

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Ödəmə metodunu yoxlayın
    if (!paymentMethod || !['cashOnDelivery', 'card'].includes(paymentMethod)) {
      setError('Zəhmət olmasa keçərli ödəmə metodu seçin (nağd və ya kart).');
      return;
    }

    // Seçilmiş ödəmə metodunu localStorage-da saxlayın
    const paymentData = { paymentMethod };
    localStorage.setItem('paymentData', JSON.stringify(paymentData));
  
    // Yalnız 'kart' metodu seçildikdə digər kart məlumatlarını saxlayın
    if (paymentMethod === 'card') {
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

    // "Kartı əlavə et" düyməsinə basıldıqda, sadəcə məlumatları saxlayırıq, amma səhifəyə keçməyəcəyik
    setIsProcessing(true);
    navigate('/shoppingAddress/reviews');
  };

  const handleAddCard = () => {
    // "Kartı əlavə et" düyməsi ilə məlumatları saxlayırıq, amma səhifəyə keçmirik
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
            name="paymentMethod"
            value="card"
            checked={paymentMethod === 'card'}
            onChange={handlePaymentMethodChange}
          />
          <label htmlFor="dcCard"><h2>Debet/Kredit Kartı</h2></label>
        </div>
        {paymentMethod === 'card' && (
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
