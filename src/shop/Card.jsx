import React, { useContext, useEffect, useState } from 'react';
import { MyContext } from '../App';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Card() {
  const { setVisibleCard, setCart, cart, setCheckoutCart } = useContext(MyContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Calculate total price and quantity
  const calculateTotal = () => {
    if (!cart || !Array.isArray(cart.products)) return { totalPrice: 0, totalQuantity: 0 };
    const totalPrice = cart.products.reduce((sum, product) => sum + product.product.price * product.quantity, 0);
    const totalQuantity = cart.products.reduce((sum, product) => sum + product.quantity, 0);
    return { totalPrice, totalQuantity };
  };

  // Fetch cart data from backend
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
        }
        const response = await axios.get('http://127.0.0.1:8000/api/basket/index', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCart(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response ? err.response.data.error : 'Something went wrong');
        setLoading(false);
      }
    };

    fetchCartData();
  }, [setCart, navigate]);

  // Remove product from cart and backend
  const removeProduct = async (basketId, productId) => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/basket/${basketId}/product/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.status === 200) {
        const updatedCart = Array.isArray(cart.products) ? cart.products.filter((e) => e.product.id !== productId) : [];
        setCart({ ...cart, products: updatedCart });
      }
    } catch (error) {
      console.error('Error removing product from cart:', error.response?.data?.message || error.message);
      setError(error.response ? error.response.data.message : 'Something went wrong');
    }
  };

  const handleCheckout = () => {
    setCheckoutCart(cart);
    navigate('/checkout');
    setVisibleCard(false);
  };

  // If loading or error
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const { totalPrice, totalQuantity } = calculateTotal();

  return (
    <div id="cardWrapper" onClick={() => setVisibleCard(false)}>
      <div id="card" onClick={(e) => e.stopPropagation()}>
        <div id="productsCard">
          <span className="same">
            You have <h3>{cart.products.length} items</h3> in your cart
          </span>
          {Array.isArray(cart.products) && cart.products.map((basketProduct) => (
            <div id="cardProducts" key={basketProduct.id}>
              <div className="cardBox">
                <div className="cardImgDiv">
                  <img 
                    src={`http://127.0.0.1:8000/storage/${basketProduct.product.image}`} 
                    alt={basketProduct.product.title} 
                  />
                </div>
                <div className="cardInfo">
                  <span>{basketProduct.product.title}</span>
                  <strong>${parseFloat(basketProduct.product.price).toFixed(2)}</strong>
                  <div>
                    <span>QTY: {basketProduct.quantity}</span>
                    <div className="deleteIcon" onClick={() => removeProduct(basketProduct.basket_id, basketProduct.product.id)}>
                      <img src="/delete.svg" alt="Delete" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div id="cartBottom">
          <div>
            <span>Subtotal</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div>
            <span>Total Quantity</span>
            <span>{totalQuantity} items</span>
          </div>
          <button className="same">View Cart</button>
          <button className="same" onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
