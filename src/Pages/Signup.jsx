import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Signup() {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/home');
      };
    return (
        <div id='asign'>
            <div id='asignSecure'></div>
            <div id='asingRight'>
                <div className='rightBox'>
                    <div>
                        <h2 className='title'>Create New Account </h2>
                        <span className='same'>Please enter details</span>
                    </div>
                    <form action="" method='POST' onSubmit={handleSubmit}>
                        <label htmlFor="firtName">First Name</label>
                        <input type="text" name="firtName" id="firtName" />
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" name="lastName" id="lastName" />
                        <label htmlFor="email">Email Address</label>
                        <input type="email" name="email" id="email" />
                        <label className='same' htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" />

                        <div id='question'>
                                <input type="checkbox" name="check" id="check" />
                                <label className='same' htmlFor='check'>I agree to the <a href="">Terms & Conditions</a></label>
                        </div>
                        <button type='submit'>Signup</button>
                    </form>

                </div>

            </div>
        </div>
    )
}
