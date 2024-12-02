import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { MyContext } from '../App';
import CheckoutCard from './CheckoutCard';
import { toast } from 'react-hot-toast';

export default function Checkout() {
  const { checkoutCart, setCheckoutCart } = useContext(MyContext);

  // Səbət məlumatlarını əldə etmək
  const fetchBasket = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/basket/index', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setCheckoutCart(response.data.products || []);
    } catch (error) {
      console.error('Səbət məlumatlarını əldə edərkən xəta:', error);
      toast.error('Səbət məlumatlarını əldə etmək mümkün olmadı');
    }
  };

  // Ümumi qiyməti hesablamaq
  const calculateTotal = () => {
    const total = checkoutCart.reduce((acc, item) => acc + item.product.price * (item.quantity || 1), 0);
    localStorage.setItem('total', total.toFixed(2));  // Ümumi qiyməti localStorage-da saxlamaq
    return total;
  };

  // Məhsulu səbətdən silmək
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
        toast.success('Məhsul səbətdən silindi');
        fetchBasket(); // Səbəti yenidən yükləmək
      }
    } catch (error) {
      console.error('Məhsulu silərkən xəta:', error);
      toast.error('Məhsulu silmək mümkün olmadı');
    }
  };

  // Quantity update (increase or decrease)
  const updateQuantity = async (productId, action, stock) => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/basket/updateQuantity/${action}`,
        { product_id: productId },
        { headers }
      );

      if (response.data.success) {
        // Update the quantity in the local state (checkoutCart)
        setCheckoutCart((prevCart) =>
          prevCart.map((item) =>
            item.product.id === productId
              ? { ...item, quantity: response.data.basket_quantity }
              : item
          )
        );
        toast.success(response.data.message);
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast.error('Miqdar yenilənərkən xəta baş verdi');
    }
  };

  // İlk dəfə səbəti əldə etmək
  useEffect(() => {
    fetchBasket();
  }, []);

  if (!Array.isArray(checkoutCart)) {
    return <div>Yüklənir...</div>;
  }

  return (
    <div id="checkoutWrapper">
      <h2 className="thick">Ödəmə</h2>
      <div id="checkout_hero">
        <div id="checkoutItems">
          <table>
            <thead>
              <tr>
                <th className="same">Məhsullar</th>
                <th className="same">Qiymət</th>
                <th className="same">Miqdar</th>
                <th className="same">Aralıq Cəm</th>
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
                        <img src="/minus.svg" alt="Miqdarı azalt" />
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
                        <img src="/plus.svg" alt="Miqdarı artır" />
                      </button>
                    </div>
                  </td>
                  <td>${(product.product.price * (product.quantity || 1)).toFixed(2)}</td>
                  <td>
                    <div
                      className="deleteIcon"
                      onClick={() => removeProduct(product.basket_id, product.product.id)}
                    >
                      <img src="/delete.svg" alt="Sil" />
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
