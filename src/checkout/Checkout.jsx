import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { MyContext } from '../App';
import CheckoutCard from './CheckoutCard';
import { toast } from 'react-hot-toast';

export default function Checkout() {
  const { checkoutCart, setCheckoutCart, localQuantity, setLocalQuantity } = useContext(MyContext);

  const fetchBasket = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/basket/index', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setCheckoutCart(response.data.products || []); // Boş array qaytar
      const initialQuantities = {};
      (response.data.products || []).forEach((item) => {
        initialQuantities[item.product.id] = item.quantity;
      });
      setLocalQuantity(initialQuantities);
      localStorage.setItem('localQuantities', JSON.stringify(initialQuantities));
    } catch (error) {
      console.error('Error fetching basket:', error);
      toast.error('Failed to fetch basket data');
    }
  };

  useEffect(() => {
    fetchBasket();
  }, []);

  useEffect(() => {
    const savedQuantities = JSON.parse(localStorage.getItem('localQuantities')) || {};
    setLocalQuantity(savedQuantities);
  }, []);

  if (!Array.isArray(checkoutCart)) {
    return <div>Loading...</div>; // Yüklənmə zamanı göstəriləcək
  }

  return (
    <div id="checkoutWrapper">
      <h2 className="thick">Checkout</h2>
      <div id="checkout_hero">
        <div id="checkoutItems">
          <table>
            <thead>
              <tr>
                <th className="same">Products</th>
                <th className="same">Price</th>
                <th className="same">Quantity</th>
                <th className="same">Subtotal</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {checkoutCart.map((product) => (
                <tr key={product.product.id}>
                  <td>
                    <div id="imageDiv">
                      <div className="cardImgDiv">
                        <img
                          src={`http://127.0.0.1:8000/storage/${product.product.image}`}
                          alt={product.product.title}
                        />
                      </div>
                      <div className="ch_productInfo">
                        <h3>{product.product.title}</h3>
                      </div>
                    </div>
                  </td>
                  <td className="same">${product.product.price}</td>
                  <td className="productButtons btn">
                    <div>
                      <button
                        onClick={() => updateQuantity(product.product.id, 'decrease')}
                        disabled={localQuantity[product.product.id] === 1}
                      >
                        <img src="/minus.svg" alt="Decrease quantity" />
                      </button>
                      <input
                        className="same"
                        type="text"
                        readOnly
                        value={localQuantity[product.product.id] || 1}
                      />
                      <button onClick={() => updateQuantity(product.product.id, 'increase')}>
                        <img src="/plus.svg" alt="Increase quantity" />
                      </button>
                    </div>
                  </td>
                  <td>${(product.product.price * (localQuantity[product.product.id] || 1)).toFixed(2)}</td>
                  <td>
                    <div
                      className="deleteIcon"
                      onClick={() => removeProduct(product.basket_id, product.product.id)}
                    >
                      <img src="/delete.svg" alt="Delete" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div id="checkoutTotal">
          <CheckoutCard checkoutCart={checkoutCart} />
        </div>
      </div>
    </div>
  );
}
