import React, { useContext } from 'react';
import { MyContext } from '../App';

export default function Checkout() {
  const { checkoutCart, incrementQuantity, decrementQuantity } = useContext(MyContext);

  return (
    <div id='checkoutWrapper'>
      <h2>Checkout</h2>
      <div id='checkoutItems'>
        <table>
          <thead>
            <tr>
              <th>Products</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {checkoutCart.map((product) => (
              <tr key={product.id}>
                <td>{product.name} <br /> Color: {product.color}</td>
                <td>${product.price}</td>
                <td>
                  <button onClick={() => decrementQuantity(product.id)}><img src="/minus.svg" alt="Decrease" /></button>
                  <input className='same' type="text" readOnly value={product.quantity} />
                  <button onClick={() => incrementQuantity(product.id)}><img src="/plus.svg" alt="Increase" /></button>
                </td>
                <td>${(product.price * product.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div id='checkoutTotal'>
        <span>Total:</span>
        <span>${checkoutCart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</span>
      </div>
    </div>
  );
}
