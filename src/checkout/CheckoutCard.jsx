import React, { useState } from 'react';

const CheckoutCard = ({ checkoutCart = [], showButton = true, buttonLabel = "Ödənişi Tamamla", isReviewPage = false }) => {
  if (!Array.isArray(checkoutCart)) {
    return <div>Yüklənir...</div>; // checkoutCart massiv olmadıqda halda işləmə
  }

  const [discountCode, setDiscountCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(false); // Button-un vəziyyətini idarə etmək üçün
  const deliveryCharge = 10.00;

  // Subtotal, endirimli subtotal və ümumi məbləği hesablamaq
  const subtotal = checkoutCart.reduce((acc, item) => acc + item.product.price * (item.quantity || 1), 0);
  const discountedSubtotal = subtotal * (1 - discount / 100);
  const grandTotal = discountedSubtotal + deliveryCharge;

  const handleDiscountCode = () => {
    if (discountCode === 'FLAT50') {
      setDiscount(50); // 50% endirim tətbiq et
    } else {
      setDiscount(0); // Kod düzgün deyilsə endirim tətbiq etmir
    }
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
  
    try {
      // basket_id-ni localStorage-dən al
      const basket_id = localStorage.getItem('basket_id');
      console.log("Basket ID:", basket_id);  // Debugging üçün konsolda çap et
  
      if (!basket_id) {
        alert('Basket ID yoxdur! Əvvəlcə səbətə məhsul əlavə edin.');
        setLoading(false);
        return;
      }
  
      // Ünvan və ödəniş məlumatlarını localStorage-dən al
      const addressData = JSON.parse(localStorage.getItem('addressData') || '{}');
      let paymentData = JSON.parse(localStorage.getItem('paymentData') || '{}');
      const token = localStorage.getItem('token');
  
      if (!token) {
        alert('Təsdiq səhvi: Token tapılmadı!');
        setLoading(false);
        return;
      }
  
      // paymentData-da payment_type yoxdursa, 'cash' olaraq təyin et
      if (!paymentData.payment_type) {
        paymentData.payment_type = 'cash'; // Default olaraq 'cash' (nağd) seç
      }
  
      // Sifariş məlumatları üçün payload hazırlamaq
      const payload = {
        checkoutCart: checkoutCart.map(item => ({
          product_id: item.product.id,
          quantity: item.quantity || 1,  // Əgər quantity verilməyibsə, 1 olaraq qəbul et
        })),
        addressData,
        paymentData,
        total: grandTotal,  // Grand total burada hesablanır
        basket_id,  // basket_id artıq burada alınmış və təyin olunmuşdur
        discount,  // Endirim burada təyin edilir
        deliveryCharge,  // Çatdırılma haqqı
      };
  
      console.log('Göndərilən payload:', JSON.stringify(payload, null, 2));
  
      // Sifarişi backend-ə göndər
      const response = await fetch('http://127.0.0.1:8000/api/orders/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,  // Bearer token ilə autentifikasiya
        },
        body: JSON.stringify(payload), // Payload-ı göndərmək üçün body olaraq göndər
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert(`Sifariş uğurla yerləşdirildi: ${data.message}`);
        window.location.href = '/order-success';  // Uğur səhifəsinə yönləndir
      } else {
        alert(`Sifariş yerləşdirilərkən səhv: ${data.error || 'Bilinməyən səhv'}`);
      }
    } catch (error) {
      console.error('Xəta:', error);
      alert(`Gözlənilməz bir səhv baş verdi: ${error.message}`);
    } finally {
      setLoading(false);  // Yüklenme vəziyyətini dayandır
    }
  };

  return (
    <div id="shopCard">
      <div className="codeDiv">
        <h4>Subtotal</h4>
        <h4>${discountedSubtotal.toFixed(2)}</h4>
      </div>
      <div>
        <label id="checkoutLbl" htmlFor="code">Endirim Kodunu Daxil Edin</label>
        <div>
          <input
            className="same"
            type="text"
            name="code"
            id="code"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
          />
          <button className="same" onClick={handleDiscountCode}>Tətbiq Et</button>
        </div>
      </div>
      <div className="codeDiv">
        <span className="same">Çatdırılma Haqqı</span>
        <span className="same">${deliveryCharge.toFixed(2)}</span>
      </div>
      <div className="code_bottom">
        <h4>Ümumi Məbləğ</h4>
        <h4>${grandTotal.toFixed(2)}</h4>
      </div>
      {showButton && (
        <button
          className="same"
          onClick={isReviewPage ? handlePlaceOrder : () => window.location.href = '/shoppingAddress/address'}
          disabled={loading || checkoutCart.length === 0}
        >
          {loading ? 'Sifarişi Yerləşdirir...' : buttonLabel}
        </button>
      )}
    </div>
  );
};

export default CheckoutCard;
