import React, { useContext, useEffect, useState } from 'react';
import { MyContext } from '../App';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Card() {
  const { setVisibleCard, setCart, cart, setCheckoutCart } = useContext(MyContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Ümumi qiymət və miqdarın hesablanması
  const calculateTotal = () => {
    if (!cart || !Array.isArray(cart.products)) return { totalPrice: 0, totalQuantity: 0 };
    const totalPrice = cart.products.reduce((sum, product) => sum + product.product.price * product.quantity, 0);
    const totalQuantity = cart.products.reduce((sum, product) => sum + product.quantity, 0);
    return { totalPrice, totalQuantity };
  };

  // Backenddən kart məlumatlarını əldə etmək
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
  
        console.log('Tam cavab:', response.data); // Cavab strukturu yoxlanılır
  
        // Cavabda basket_id və məhsulların olub-olmaması yoxlanır
        if (response.data && response.data.products && Array.isArray(response.data.products)) {
          setCart(response.data);
          
          // Basket ID yoxlanır
          const basketId = response.data.basket_id || 'default_basket_id'; // Burada backend cavabında basket_id yoxlanır
          localStorage.setItem('basket_id', basketId); // Basket ID-ni localStorage-a yaz
  
          console.log('Basket ID saxlanıldı:', basketId); // Basket ID konsolda izlənir
          setLoading(false);
        } else {
          setError('Basket ID və ya məhsullar mövcud deyil');
          setLoading(false);
        }
      } catch (err) {
        console.error('Kart məlumatları əldə edərkən xəta:', err);
        setError(err.response ? err.response.data.error : 'Bir şey səhv getdi');
        setLoading(false);
      }
    };
  
    fetchCartData();
  }, [setCart, navigate]);
  

  // Məhsulu kartdan və backenddən silmək
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
        // Basket ID-ni localStorage-a yeniləmək
        localStorage.setItem('basket_id', basketId);
      }
    } catch (error) {
      console.error('Kartdan məhsulu silərkən xəta:', error.response?.data?.message || error.message);
      setError(error.response ? error.response.data.message : 'Bir şey səhv getdi');
    }
  };

  const handleCheckout = () => {
    setCheckoutCart(cart);
    navigate('/checkout');
    setVisibleCard(false);
  };

  if (loading) {
    return <div className='loadingDiv'><img  src="./loading.gif" alt="" /></div>;
  }

  if (error) {
    return <div>Xəta: {error}</div>;
  }

  const { totalPrice, totalQuantity } = calculateTotal();

  return (
    <div id="cardWrapper" onClick={() => setVisibleCard(false)}>
      <div id="card" onClick={(e) => e.stopPropagation()}>
        <div id="productsCard">
          <span className="same">
            Səbətinizdə <h3>{cart.products.length} məhsul var</h3>
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
                    <span>Miqdarı: {basketProduct.quantity}</span>
                    <div className="deleteIcon" onClick={() => removeProduct(basketProduct.basket_id, basketProduct.product.id)}>
                      <img src="/delete.svg" alt="Sil" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div id="cartBottom">
          <div>
            <span>Toplam</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <button className="same">Səbətə bax</button>
          <button className="same" onClick={handleCheckout}>
            Ödənişə keç
          </button>
        </div>
      </div>
    </div>
  );
}
