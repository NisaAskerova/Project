import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { MyContext } from '../App';
import CheckoutCard from './CheckoutCard';
import { toast } from 'react-hot-toast';

export default function Checkout() {
  const { checkoutCart, setCheckoutCart } = useContext(MyContext);

  // Fetching basket data
  const fetchBasket = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/basket/index', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setCheckoutCart(response.data.products || []);
    } catch (error) {
      console.error('Error fetching basket:', error);
      toast.error('Failed to fetch basket data');
    }
  };

  // Calculate total price
  const calculateTotal = () => {
    const total = checkoutCart.reduce((acc, item) => acc + item.product.price * (item.quantity || 1), 0);
    localStorage.setItem('total', total.toFixed(2));  // Save total price to localStorage
    return total;
  };

  // Remove product from basket
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
        toast.success('Product removed from basket');
        fetchBasket(); // Reload basket
      }
    } catch (error) {
      console.error('Error removing product:', error);
      toast.error('Failed to remove product');
    }
  };

  // Fetch basket initially
  useEffect(() => {
    fetchBasket();
  }, []);

  if (!Array.isArray(checkoutCart)) {
    return <div>Loading...</div>;
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
                        onClick={() => updateQuantity(product.product.id, 'decrease', product.product.stock)}
                        disabled={product.quantity === 1}
                      >
                        <img src="/minus.svg" alt="Decrease quantity" />
                      </button>
                      <input
                        className="same"
                        type="text"
                        readOnly
                        value={product.quantity || 1}
                      />
                      <button
                        onClick={() => updateQuantity(product.product.id, 'increase', product.product.stock)}
                        disabled={product.quantity >= product.product.stock}
                      >
                        <img src="/plus.svg" alt="Increase quantity" />
                      </button>
                    </div>
                  </td>
                  <td>${(product.product.price * (product.quantity || 1)).toFixed(2)}</td>
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
          <CheckoutCard checkoutCart={checkoutCart} totalPrice={calculateTotal()} />
        </div>
      </div>
    </div>
  );
}
