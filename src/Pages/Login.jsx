import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/signup');
  };

  return (
    <div id='login'>
      <div id='SecureImg'></div>
      <div id='loginRight'>
        <div className='rightBox'>
          <div><img src="./logo.svg" alt="" />
            <h2 className='title'>Welcome 👋 </h2>
            <span className='same'>Please login here</span>
          </div>
          <form action="" method='POST' onSubmit={handleSubmit}>
            <label htmlFor="email">Email Address</label>
            <input type="email" name="email" id="email" />
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" />
            <div id='remember'>
              <div>
                <input type="checkbox" name="check" id="check" />
                <label className='same' htmlFor='check'>Remember Me</label>
              </div>
              <div><a href="">Forgot Password?</a></div>
            </div>
            <button type='submit'>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}
