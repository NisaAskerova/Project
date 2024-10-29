import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate(); // useNavigate hook-u düzgün istifadə edirik
  const [data, setData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({}); // Xətaları saxlamaq üçün state
  
  // Form məlumatlarının dəyişməsi zamanı state-i yeniləyən funksiya
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  // Formu submit etdikdə işə düşən funksiya
  const handleSubmit = (event) => {
    event.preventDefault(); // Formun default davranışını bloklamaq

    console.log('Sorğu göndərilir...');

    fetch("http://127.0.0.1:8000/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // Məlumatları JSON formatında göndəririk
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log("Registration successful:", data);
          navigate('/login'); 
        } else {
       
          console.log("Error during registration:", data);
          setErrors(data.errors); 
        }
      })
      .catch((error) => {
        console.error("Error:", error); 
      });
  };

  return (
    <div id='asign'>
      <div id='asignSecure'></div>
      <div id='asingRight'>
        <div className='rightBox'>
          <div>
            <h2 className='title'>Create New Account</h2>
            <span className='same'>Please enter details</span>
          </div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="firstName">First Name</label>
            <input 
              onChange={(e) => setData({ ...data, first_name: e.target.value })}
              type="text" 
              name="first_name" 
              id="firstName" 
            />
            {errors.first_name && Array.isArray(errors.first_name) && (
              <p style={{ color: 'red' }}>{errors.first_name[0]}</p>
            )}

            <label htmlFor="lastName">Last Name</label>
            <input 
              onChange={(e) => setData({ ...data, last_name: e.target.value })}
              type="text" 
              name="last_name" 
              id="lastName" 
            />
            {errors.last_name && Array.isArray(errors.last_name) && (
              <p style={{ color: 'red' }}>{errors.last_name[0]}</p>
            )}

            <label htmlFor="email">Email Address</label>
            <input 
              onChange={(e) => setData({ ...data, email: e.target.value })}
              type="email" 
              name="email" 
              id="email" 
            />
            {errors.email && Array.isArray(errors.email) && (
              <p style={{ color: 'red' }}>{errors.email[0]}</p>
            )}

            <label className='same' htmlFor="password">Password</label>
            <input 
              onChange={(e) => setData({ ...data, password: e.target.value })}
              type="password" 
              name="password" 
              id="password" 
            />
            {errors.password && Array.isArray(errors.password) && (
              <p style={{ color: 'red' }}>{errors.password[0]}</p>
            )}

            <div id='question'>
              <input type="checkbox" name="check" id="check" />
              <label className='same' htmlFor='check'>
                I agree to the <a href="">Terms & Conditions</a>
              </label>
            </div>
            <button type='submit'>Signup</button>
          </form>
        </div>
      </div>
    </div>
  );
}
