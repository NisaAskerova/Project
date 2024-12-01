import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { MyContext } from '../App';

export default function ReviewsPage() {
  const { checkoutCart, setCheckoutCart } = useContext(MyContext);
  const [shippingAddress, setShippingAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [cartData, setCartData] = useState(null);
  const [totalQuantity, setTotalQuantity] = useState(0); // Ümumi say üçün
  const [totalPrice, setTotalPrice] = useState(0); // Ümumi qiymət üçün
  const navigate = useNavigate(); 

  useEffect(() => {
    const token = localStorage.getItem('token');  

    if (!token) {
      navigate('/login'); 
      return;  
    }

    // Yerləşdirmə ünvanını local storage-dən götürmək
    const storedShipping = localStorage.getItem('addressData');
    if (storedShipping) {
      setShippingAddress(JSON.parse(storedShipping));
    }

    // Ödəniş məlumatlarını (paymentMethod və cardData) local storage-dən götürmək
    const storedPayment = localStorage.getItem('paymentData');
    if (storedPayment) {
      setPaymentMethod(JSON.parse(storedPayment).paymentMethod);  // Ödəniş üsulunu təyin et
      setCartData(JSON.parse(storedPayment).cardData);  // Kart məlumatlarını təyin et (mövcudsa)
    }

    const cartData = localStorage.getItem('cardData');
    if (cartData) {
      setCartData(JSON.parse(cartData));
    }
    
    // API-dən kart məlumatlarını əldə etmək
    axios.get('http://127.0.0.1:8000/api/basket/index', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(response => {
      if (response.data) {
        setCheckoutCart(response.data.products); // Kartdakı məhsulları təyin et
        setTotalQuantity(response.data.total_quantity); // Ümumi sayını təyin et
        setTotalPrice(response.data.total_price); // Ümumi qiyməti təyin et
      }
    })
    .catch(error => {
      console.error('API-dən məlumat əldə edərkən xəta baş verdi:', error);
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
            <h3>Təxmini çatdırılma: 23 İyul 2023</h3>
            <div id='cardProducts'>
              <div className='cardBox'>
                <div className='cardImgDiv'>
                  <img src={`http://127.0.0.1:8000/storage/${product.product.image}`} alt={product.name} />
                </div>
                <div className='cardInfo'>
                  <span>{product.product.title}</span>
                  <strong>{product.product.price}</strong>
                  <div>
                    <span>Ədəd: {product.product.quantity || 1}</span>
                    <div className='deleteIcon' onClick={() => removeProduct(product.product.id)}>
                      {/* Silmək ikonu */}
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
            <h3>Çatdırılma Ünvanı</h3>
            {shippingAddress ? (
              <>
                <h4>{shippingAddress.name}</h4>
                <span className='same'>{shippingAddress.address_line}</span>
              </>
            ) : (
              <p>Çatdırılma ünvanı təqdim edilməyib.</p>
            )}
            <div className='edit'>
              <img src="../edit.svg" alt="Dəyişdir" />
            </div>
          </div>

          <div id="sa">
            <h3>Ödəniş Metodu</h3>
            {paymentMethod ? (
              <div>
                {paymentMethod === 'card' ? (
                  cartData ? (
                    <h4>
                      Debet Kartı (.... .... .... ..{cartData.cardNumber.slice(-2)})
                    </h4>
                  ) : (
                    <p>Kart məlumatları mövcud deyil.</p>
                  )
                ) : (
                  <h4>Nağd ödəniş</h4>
                )}
                <div className='edit'>
                  <img src="../edit.svg" alt="Dəyişdir" />
                </div>
              </div>
            ) : (
              <p>Ödəniş metodu seçilməyib.</p>
            )}
          </div>
        </>
      )}
    </>
  );
}
