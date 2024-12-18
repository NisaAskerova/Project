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

    fetch("http://127.0.0.1:8000/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    .then((res) => {
      if (!res.ok) {
        return res.json().then(errData => {
          setErrors(errData.errors || { message: 'Bir xəta baş verdi.' });
          throw new Error(errData.message || 'Bir xəta baş verdi.');
        });
      }
      return res.json();
    })
    .then((data) => {
      if (data.success) {
        localStorage.setItem('token', data.token);  // Token-i localStorage-a saxla
        localStorage.setItem('role', data.role);    // Rolü də saxla

        // Rola görə yönləndirmə
        if (data.role === 'admin') { 
          window.location.href = '/admin'; // Admin səhifəsinə yönləndir
        } else { 
          window.location.href = '/home'; // Digər istifadəçilər üçün ana səhifəyə yönləndir
        }
      }
    })
    .catch((error) => {
      setErrors({ message: error.message });
    });
  };

  return (
    <div id='login'>
      <div id='SecureImg'></div>
      <div id='loginRight'>
        <div className='rightBox'>
          <div>
            <img src="./logo.svg" alt="" />
            <h2 className='title'>Xoş Gəlmisiniz 👋 </h2>
            <span className='same'>Zəhmət olmasa buradan daxil olun</span>
          </div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email Ünvanı</label>
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

            <label htmlFor="password">Şifrə</label>
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
              {/* <div>
                <input type="checkbox" name="check" id="check" />
                <label className='same' htmlFor='check'>Məni xatırla</label>
              </div> */}
              {/* <div><a href="">Şifrənizi unutdunuz?</a></div> */}
            </div>
            <div>
              <span className='same'>Hesabınız yoxdursa <a className='logRe' href="/"> Qeydiyyatdan keçin</a></span>
            </div>
            <button type='submit'>Daxil ol</button>
          </form>

          {errors.message && (
            <p style={{ color: 'red' }}>{errors.message}</p>
          )}
        </div>
      </div>
    </div>
  );
}
