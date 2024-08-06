import React, { useContext } from 'react';
import { MyContext } from '../App';
import CheckoutCard from './CheckoutCard';

export default function Checkout() {
  const { checkoutCart, incrementQuantity, decrementQuantity, setCheckoutCart } = useContext(MyContext);

  const removeProduct = (id) => {
    setCheckoutCart(checkoutCart.filter((e) => e.id !== id));
  };

  return (
    <div id='checkoutWrapper'>
      <h2 className='thick'>Checkout</h2>
      <div id='checkout_hero'>
        <div id='checkoutItems'>
          <table>
            <thead>
              <tr>
                <th className='same'>Products</th>
                <th className='same'>Price</th>
                <th className='same'>Quantity</th>
                <th className='same'>Subtotal</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {checkoutCart.map((product) => (
                <tr key={product.id}>
                  <td>
                    <div id='imageDiv'>
                      <div className='cardImgDiv'>
                        <img src={product.image} alt="" />
                      </div>
                      <div className='ch_productInfo'>
                        <h3>{product.name}</h3>
                        <span className='same'> Color: {product.color}</span>
                      </div>
                    </div>
                  </td>
                  <td className='same'>${product.price}</td>
                  <td className='productButtons btn'>
                    <div>
                      <button onClick={() => decrementQuantity(product.id)}><img src="/minus.svg" alt="Decrease" /></button>
                      <input className='same' type="text" readOnly value={product.quantity} />
                      <button onClick={() => incrementQuantity(product.id)}><img src="/plus.svg" alt="Increase" /></button>
                    </div>
                  </td>
                  <td>${(product.price * product.quantity).toFixed(2)}</td>
                  <td><div className='del' onClick={() => removeProduct(product.id)}><img src="/delete.svg" alt="" /></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div id='checkoutTotal'>
          <CheckoutCard 
            checkoutCart={checkoutCart} 
            setCheckoutCart={setCheckoutCart}
          />
        </div>
      </div>
    </div>
  );
}
