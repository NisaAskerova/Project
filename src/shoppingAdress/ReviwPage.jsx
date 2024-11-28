import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { MyContext } from '../App';

export default function ReviewsPage() {
  const { checkoutCart, setCheckoutCart } = useContext(MyContext);
  const [shippingAddress, setShippingAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [cartData, setCartData] = useState(null);
  const [totalQuantity, setTotalQuantity] = useState(0); // For total quantity
  const [totalPrice, setTotalPrice] = useState(0); // For total price
  const navigate = useNavigate(); 

  useEffect(() => {
    const token = localStorage.getItem('token');  

    if (!token) {
      navigate('/login'); 
      return;  
    }

    // Get shipping address from local storage
    const storedShipping = localStorage.getItem('addressData');
    if (storedShipping) {
      setShippingAddress(JSON.parse(storedShipping));
    }

    // Get payment data (paymentMethod and cardData) from local storage
    const storedPayment = localStorage.getItem('paymentData');
    if (storedPayment) {
      setPaymentMethod(JSON.parse(storedPayment).paymentMethod);  // Set paymentMethod
      setCartData(JSON.parse(storedPayment).cardData);  // Set cardData (if available)
    }

    const cartData = localStorage.getItem('cardData');
    if (cartData) {
      setCartData(JSON.parse(cartData));
    }
    
    // Fetch cart data from API
    axios.get('http://127.0.0.1:8000/api/basket/index', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(response => {
      if (response.data) {
        setCheckoutCart(response.data.products); // Set products in the cart
        setTotalQuantity(response.data.total_quantity); // Set total quantity
        setTotalPrice(response.data.total_price); // Set total price
      }
    })
    .catch(error => {
      console.error('Error fetching data from API:', error);
    });
  }, [setCheckoutCart, navigate]);

  const removeProduct = (id) => {
    setCheckoutCart(checkoutCart.filter((e) => e.id !== id));
  };
console.log(checkoutCart);

  return (
    <>
      <div id='productsCard'>
        {checkoutCart.map((product) => (
          <div key={product.id}>
            <h3>Estimated delivery: 23 July 2023</h3>
            <div id='cardProducts'>
              <div className='cardBox'>
                <div className='cardImgDiv'>
                  <img src={`http://127.0.0.1:8000/storage/${product.product.image}`} alt={product.name} />
                </div>
                <div className='cardInfo'>
                  <span>{product.product.title}</span>
                  <strong>{product.product.price}</strong>
                  <div>
                    <span>QTY: {product.product.quantity || 1}</span>
                    <div className='deleteIcon' onClick={() => removeProduct(product.product.id)}>
                      {/* Delete Icon */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {checkoutCart?.length > 0 && (
        <>
          <div id='sa'>
            <h3>Shipping Address</h3>
            {shippingAddress ? (
              <>
                <h4>{shippingAddress.name}</h4>
                <span className='same'>{shippingAddress.address_line}</span>
              </>
            ) : (
              <p>No shipping address provided.</p>
            )}
            <div className='edit'>
              <img src="../edit.svg" alt="Edit" />
            </div>
          </div>

          <div id="sa">
            <h3>Payment Method</h3>
            {paymentMethod ? (
              <div>
                {paymentMethod === 'card' ? (
                  cartData ? (
                    <h4>
                      Debit Card (.... .... .... ..{cartData.cardNumber.slice(-2)})
                    </h4>
                  ) : (
                    <p>Card details are not available.</p>
                  )
                ) : (
                  <h4>Cash on Delivery</h4>
                )}
                <div className='edit'>
                  <img src="../edit.svg" alt="Edit" />
                </div>
              </div>
            ) : (
              <p>No payment method selected.</p>
            )}
          </div>
        </>
      )}
    </>
  );
}
