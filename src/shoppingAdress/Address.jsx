import React from 'react';
import NewAddress from './NewAddress';
import { Link } from 'react-router-dom';

const Address = () => {
  return (
    <div id='addressHero'>
      <h2>Select a delivery address</h2>
      <p className='same sm'>
        Is the address you'd like to use displayed below? If so, click the corresponding "Deliver to this address" button.
         Or you can enter a new delivery address.
      </p>
      <div id='addressCards'>
        <div className='addressCart'>
          <div className='check'>
            <h4>Kristin Watson</h4>
            <input type="radio" name='check1' id='check1'/>
          </div>
          <div className='addInfo'>
            <span className='same'>4140 Parker Rd. Allentown, New Mexico 31134</span>
          </div>
          <div className='addressButtons'>
            <button><img src="/edit.svg" alt="" /><span>Edit</span></button>
            <button><img src="/delete.svg" alt="" /><span>Delete</span></button>
          </div>
        </div>
        <div className='addressCart'>
          <div className='check'>
            <h4>Kristin Watson</h4>
            <input type="radio" name='check1' id='check2'/>
          </div>
          <div className='addInfo'>
            <span className='same'>4140 Parker Rd. Allentown, New Mexico 31134</span>
          </div>
          <div className='addressButtons'>
            <button><img src="/edit.svg" alt="" /><span>Edit</span></button>
            <button><img src="/delete.svg" alt="" /><span>Delete</span></button>
          </div>
        </div>
      </div>
      <Link to='/shoppingAddress/payment' className='same' id='deliverBtn'>Deliver Here</Link>
      <NewAddress/>
    </div>
  );
};

export default Address;
