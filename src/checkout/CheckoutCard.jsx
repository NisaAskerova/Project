import React, { useContext, useState, useEffect } from 'react';
import { MyContext } from '../App';

const CheckoutCard = ({ checkoutCart = [], showButton = true, buttonLabel = "Ödənişi Tamamla", isReviewPage = false }) => {
  if (!Array.isArray(checkoutCart)) {
    return <div>Yüklənir...</div>; // checkoutCart massiv olmadıqda işləmə
  }

  const { setOrderCart } = useContext(MyContext);
  const [discountCode, setDiscountCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(false); // Button-un vəziyyətini idarə etmək üçün
  const [error, setError] = useState(''); // Error vəziyyətinin idarə edilməsi
  const deliveryCharge = 10.00;

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
    setError(''); // Reset error message
  
    try {
      const basket_id = localStorage.getItem('basket_id');
      const basketIdNumber = Number(basket_id);
  
      if (!basket_id || isNaN(basketIdNumber)) {
        setError('Basket ID düzgün deyil! Əvvəlcə səbətə məhsul əlavə edin.');
        setLoading(false);
        return;
      }
  
      const addressData = JSON.parse(localStorage.getItem('addressData') || '{}');
      let paymentData = JSON.parse(localStorage.getItem('paymentData') || '{}');
      const token = localStorage.getItem('token');
  
      if (!token) {
        setError('Təsdiq səhfi: Token tapılmadı!');
        setLoading(false);
        return;
      }
  
      // Ensure payment type is set
      if (!paymentData.payment_type) {
        paymentData.payment_type = 'cash'; // Default to 'cash' if not available
      }
  
      const payload = {
        checkoutCart: checkoutCart.map(item => ({
          product_id: item.product.id,
          quantity: item.quantity || 1,
        })),
        addressData,
        paymentData,
        total: grandTotal,
        basket_id: basketIdNumber,
        discount,
        deliveryCharge,
      };
  
      const response = await fetch('http://127.0.0.1:8000/api/orders/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Order placed successfully, now remove products from the basket
        await removeProductsFromBasket(basketIdNumber, checkoutCart);
        setOrderCart(true);
      } else {
        setError(`Sifariş yerləşdirilərkən səhv: ${data.error || 'Bilinməyən səhv'}`);
      }
    } catch (error) {
      console.error('Xəta:', error);
      setError(`Gözlənilməz bir səhv baş verdi: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  
  // Function to remove products from the basket
  const removeProductsFromBasket = async (basketId, checkoutCart) => {
    try {
      const token = localStorage.getItem('token');
  
      for (const item of checkoutCart) {
        const productId = item.product.id;
        
        const response = await fetch(`http://127.0.0.1:8000/api/basket/${basketId}/product/${productId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          console.error(`Product ${productId} removal failed`);
        }
      }
    } catch (error) {
      console.error('Error while removing basket items:', error);
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

      {/* Error mesajını göstər */}
      {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}

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
