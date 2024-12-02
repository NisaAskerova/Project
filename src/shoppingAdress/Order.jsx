import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../App';

export default function Order() {
  const { setOrderCart } = useContext(MyContext);
  const navigate = useNavigate();

  const handleViewOrder = () => {
    setOrderCart(false);
    navigate('/shop');
  };

  const handleBackToHome = () => {
    setOrderCart(false);
    navigate('/home'); 
  };

  return (
    <div id='orders'>
      <div id='order'>
        <div id='yDiv'>
          <img src="../shopbag.svg" alt="Səbət" />
        </div>
        <div>
          <h3>Sifarişiniz təsdiqləndi</h3>
          <span className='same'>Bizimlə alış-veriş etdiyiniz üçün təşəkkür edirik!</span>
          <span className='same'>Sifarişiniz hələ göndərilməyib,</span>
          <span className='same'>amma göndərildikdə sizə email göndərəcəyik.</span>
        </div>
        <div id='orBtn'>
          {/* Change the button text here */}
          <button onClick={handleViewOrder} className="same ybtn">Alış-verişə davam et</button>
          <button onClick={handleBackToHome} className="same whiteBtn">Ana səhifəyə qayıt</button>
        </div>
      </div>
    </div>
  );
}
