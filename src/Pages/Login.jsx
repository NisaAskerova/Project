import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({}); 
  const handleSubmit = (event) => {
    event.preventDefault(); 
    fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then((res) => {
        if (!res.ok) {
            return res.json().then(errData => {
                throw new Error(errData.message || 'Bir hata oluştu.');
            });
        }
        return res.json();
    })
    .then((data) => {
        if (data.success) {
            localStorage.setItem('token', data.token);
            if (data.role === 'admin') { 
              window.open('http://127.0.0.1:8000/dashboard/main', ); // Yeni pəncərə açın
          } else { 
                navigate('/home'); 
            }
        // console.log(data.role);
        
        }
    })
    .catch((error) => {
        setErrors({ email: error.message });
    });

}

  

  return (
    <div id='login'>
      <div id='SecureImg'></div>
      <div id='loginRight'>
        <div className='rightBox'>
          <div>
            <img src="./logo.svg" alt="" />
            <h2 className='title'>Welcome 👋 </h2>
            <span className='same'>Please login here</span>
          </div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email Address</label>
            <input
              onChange={(e) => setData({ ...data, email: e.target.value })}
              type="email"
              name="email"
              id="email"
            />
            {errors.email && (
              <p style={{ color: 'red' }}>
                {Array.isArray(errors.email) ? errors.email[0] : errors.email}
              </p>
            )}

            <label htmlFor="password">Password</label>
            <input
              onChange={(e) => setData({ ...data, password: e.target.value })}
              type="password"
              name="password"
              id="password"
            />
            {errors.password && (
              <p style={{ color: 'red' }}>
                {Array.isArray(errors.password) ? errors.password[0] : errors.password}
              </p>
            )}
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
