import React, { useState } from 'react';

const CheckoutCard = ({ checkoutCart = [], showButton = true, buttonLabel = "Proceed to Checkout", isReviewPage = false }) => {
  if (!Array.isArray(checkoutCart)) {
    return <div>Loading...</div>; // Handle the case where checkoutCart is not an array
  }

  const [discountCode, setDiscountCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(false); // For handling button state
  const deliveryCharge = 10.00;

  // Calculate subtotal, discounted subtotal, and grand total
  const subtotal = checkoutCart.reduce((acc, item) => acc + item.product.price * (item.quantity || 1), 0);
  const discountedSubtotal = subtotal * (1 - discount / 100);
  const grandTotal = discountedSubtotal + deliveryCharge;

  const handleDiscountCode = () => {
    if (discountCode === 'FLAT50') {
      setDiscount(50); // Apply 50% discount
    } else {
      setDiscount(0); // No discount if code is not valid
    }
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
  
    try {
        // LocalStorage-dən məlumatları oxuyun
        const addressData = JSON.parse(localStorage.getItem('addressData') || '{}');
        const paymentData = JSON.parse(localStorage.getItem('paymentData') || '{}');
  
        const token = localStorage.getItem('token');
  
        if (!token) {
            alert('Authentication error: No token found!');
            setLoading(false); // Loading state-ini dayandırmaq
            return; // Token olmadıqda dayandırmaq
        }
  
        // Serverə sorğu göndərmək
        const response = await fetch('http://localhost:8000/api/orders/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                checkoutCart: checkoutCart,  // Checkout cart data
                addressData: addressData,    // Address data
                paymentData: paymentData,    // Payment data
                discountCode: discountCode,  // Discount code if applicable
                discount: discount,          // Discount percentage
                deliveryCharge: deliveryCharge, // Delivery charge
                total: grandTotal,           // Send the grand total with discount and delivery charge
            }),
        });
  
        // Handle server response
        const data = await response.json();
        if (data && response.ok) {
            alert('Order placed successfully: ' + data.message);
            window.location.href = '/order-success';
        } else {
            alert('Error placing order: ' + data.message || 'Unknown error');
        }
  
    } catch (error) {
        console.error('Error:', error);
        alert('An unexpected error occurred: ' + error.message);
    } finally {
        setLoading(false); // Loading state-ni dayandırırıq
    }
  };

  return (
    <div id="shopCard">
      <div className="codeDiv">
        <h4>Subtotal</h4>
        <h4>${discountedSubtotal.toFixed(2)}</h4>
      </div>
      <div>
        <label id="checkoutLbl" htmlFor="code">Enter Discount Code</label>
        <div>
          <input
            className="same"
            type="text"
            name="code"
            id="code"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
          />
          <button className="same" onClick={handleDiscountCode}>Apply</button>
        </div>
      </div>
      <div className="codeDiv">
        <span className="same">Delivery Charge</span>
        <span className="same">${deliveryCharge.toFixed(2)}</span>
      </div>
      <div className="code_bottom">
        <h4>Grand Total</h4>
        <h4>${grandTotal.toFixed(2)}</h4>
      </div>
      {showButton && (
        <button
          className="same"
          onClick={isReviewPage ? handlePlaceOrder : () => window.location.href = '/shoppingAddress'}
          disabled={loading || checkoutCart.length === 0}
        >
          {loading ? 'Processing...' : isReviewPage ? "Place Order" : buttonLabel}
        </button>
      )}
    </div>
  );
};

export default CheckoutCard;
