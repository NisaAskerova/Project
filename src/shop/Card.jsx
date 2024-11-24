import React, { useContext, useEffect, useState } from 'react';
import { MyContext } from '../App';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Card() {
  const { setVisibleCard, setCart, cart, localQuantity, setCheckoutCart } = useContext(MyContext);
  const [loading, setLoading] = useState(true); // Yükləmə vəziyyəti
  const [error, setError] = useState(null); // Xəta vəziyyəti
  const navigate = useNavigate();

  // Backend-dən səbət məlumatlarını gətir
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/basket/index', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` // Token əlavə edilir
          }
        });
        setCart(response.data); // Səbətdəki məhsulları kontekstə əlavə et
        setLoading(false); // Yükləmə tamamlandı
      } catch (err) {
        setError(err.response ? err.response.data.error : 'Something went wrong');
        setLoading(false);
      }
    };

    fetchCartData();
  }, [setCart]);

  // Remove product from the cart and backend
  const removeProduct = async (basketId, productId) => {
    try {
      // Send delete request to the backend with basketId and productId
      await axios.delete(`http://127.0.0.1:8000/api/basket/${basketId}/product/${productId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
  
      // Remove product from local cart state
      setCart(cart.filter((e) => e.product.id !== productId));
  
    } catch (error) {
      console.error('Error removing product from cart:', error.response?.data?.message || error.message);
    }
  };
  

  const handleCheckout = () => {
    setCheckoutCart(cart);
    navigate('/checkout');
    setVisibleCard(false);
  };

  if (loading) {
    return <div>Loading...</div>; // Yükləmə vaxtı göstərilir
  }

  if (error) {
    return <div>Error: {error}</div>; // Xəta varsa göstərilir
  }

  return (
    <div id="cardWrapper" onClick={() => setVisibleCard(false)}>
      <div id="card" onClick={(e) => e.stopPropagation()}>
        <div id="productsCard">
          <span className="same">
            You have <h3>{cart.length} items</h3> in your cart
          </span>
          {cart.map((basketProduct) => (
  <div id="cardProducts" key={basketProduct.id}>
    <div className="cardBox">
      <div className="cardImgDiv">
        {/* Dynamically set the image URL */}
        <img 
          src={`http://127.0.0.1:8000/storage/${basketProduct.product.image}`} 
          alt={basketProduct.product.title} 
        />
      </div>
      <div className="cardInfo">
        <span>{basketProduct.product.title}</span>
        <strong>
          ${parseFloat(basketProduct.product.price).toFixed(2)}
        </strong>
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
            <span>
              $ 
              {cart.reduce(
                (acc, item) => acc + item.product.price * item.quantity,
                0
              ).toFixed(2)}
            </span>
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
