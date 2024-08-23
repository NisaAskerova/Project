// Card.jsx
import React, { useContext } from 'react';
import { MyContext } from '../App';
import { useNavigate } from 'react-router-dom';

export default function Card() {
  const { setVisibleCard, cart, setCart, localQuantity, setCheckoutCart, } = useContext(MyContext);
  const navigate = useNavigate();
  
  const removeProduct = (id) => {
    setCart(cart.filter((e) => e.id !== id));
  };
  
  const handleCheckout = () => {
    setCheckoutCart(cart);
    navigate('/checkout');
    setVisibleCard(false);
  };

  return (
    <div id='cardWrapper'>
      <div id='card'>
        <div id='productsCard'>
          <span className='same'>You have <h3>{cart.length} items</h3> in your cart</span>
          {cart.map((product) => (
            <div id='cardProducts' key={product.id}>
              <div className='cardBox'>
                <div className='cardImgDiv'><img src={product.image} alt="" /></div>
                <div className='cardInfo'>
                  <span>{product.name}</span>
                  <strong>{product.price}</strong>
                  <div>
                    <span>QTY: {localQuantity[product.id] || 1}</span>
                    <div className='deleteIcon' onClick={() => removeProduct(product.id)}>
                      <img src="/delete.svg" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div id='cartBottom'>
          <div>
            <span>Subtotal</span>
            <span>${cart.reduce((acc, item) => acc + item.price * (localQuantity[item.id] || 1), 0).toFixed(2)}</span>
          </div>
          <button className='same' onClick={() => setVisibleCard(false)}>View Cart</button>
          <button className='same' onClick={handleCheckout}>Checkout</button>
        </div>
      </div>
    </div>
  );
}
