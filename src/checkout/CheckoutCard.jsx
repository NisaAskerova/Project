import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../App';

const CheckoutCard = ({ showButton = true, buttonLabel = "Proceed to Checkout" }) => {
  const { checkoutCart, setCheckoutCart, setOrderCart } = useContext(MyContext);
  const [discountCode, setDiscountCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const deliveryCharge = 10.00;

  const subtotal = checkoutCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountedSubtotal = subtotal * (1 - discount / 100);
  const grandTotal = discountedSubtotal + deliveryCharge;

  const handleDiscountCode = () => {
    if (discountCode === 'FLAT50') {
      setDiscount(50);
    } else {
      setDiscount(0);
    }
  };

  const navigate = useNavigate();
  const handleCheckout = () => {
    if (buttonLabel === "Place Order") {
      setOrderCart(true);  
    } else {
      navigate('/shoppingAddress');
    }
  };

  return (
    <div id='shopCard'>
      <div className='codeDiv'>
        <h4>Subtotal</h4>
        <h4>${discountedSubtotal.toFixed(2)}</h4>
      </div>
      <div>
        <label id='checkoutLbl' htmlFor="code">Enter Discount Code</label>
        <div>
          <input
            className='same'
            type="text"
            name="code"
            id="code"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
          />
          <button className='same' onClick={handleDiscountCode}>Apply</button>
        </div>
      </div>
      <div className='codeDiv'>
        <span className='same'>Delivery Charge</span>
        <span className='same'>${deliveryCharge.toFixed(2)}</span>
      </div>
      <div className='code_bottom'>
        <h4>Grand Total</h4>
        <h4>${grandTotal.toFixed(2)}</h4>
      </div>
      {showButton && (
        <button
          className='same'
          onClick={handleCheckout}
          disabled={checkoutCart.length === 0} 
        >
          {buttonLabel}
        </button>
      )}
    </div>
  );
};

export default CheckoutCard;
