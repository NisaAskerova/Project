import React, { useContext } from 'react';
import { MyContext } from '../App';

export default function ReviewsPage() {
  const { checkoutCart, setCheckoutCart } = useContext(MyContext);

  const removeProduct = (id) => {
    setCheckoutCart(checkoutCart.filter((e) => e.id !== id));
  };

  return (
    <>
      <div id='productsCard'>
        {checkoutCart.length > 0 ? (
          checkoutCart.map((product) => (<>
            <h3>Estimated delivery:  23 July 2023</h3>
            <div id='cardProducts' key={product.id}>
              <div className='cardBox'>
                <div className='cardImgDiv'>
                  <img src={product.image} alt="" />
                </div>
                <div className='cardInfo'>
                  <span>{product.name}</span>
                  <strong>{product.price}</strong>
                  <div>
                    <span>QTY: {product.quantity || 1}</span>
                    <div className='deleteIcon' onClick={() => removeProduct(product.id)}>
                    </div>
                  </div>
                </div>
              </div>
            </div></>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
      
      {checkoutCart.length > 0 && (
        <>
          <div id='sa'>
            <h3>Shipping Address</h3>
            <h4>Kristin Watson</h4>
            <span className='same'>4140 Parker Rd. Allentown, New Mexico 31134</span>
            <div className='edit'>
              <img src="../edit.svg" alt="Edit" />
            </div>
          </div>
          <div id="sa">
            <h3>Payment Method</h3>
            <div>
              <h4>Debit Card (.... .... .... ..89)</h4>
              <div className='edit'>
                <img src="../edit.svg" alt="Edit" />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
