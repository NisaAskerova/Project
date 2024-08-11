import React, { useContext } from 'react';
import Select from 'react-dropdown-select';
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../App';

export default function NewAddress() {
  const navigate = useNavigate(); 
  const { setActiveStep } = useContext(MyContext);

  const cities = [
    { label: "New York", value: "new_york" },
    { label: "Los Angeles", value: "los_angeles" },
  ];

  const states = [
    { label: "California", value: "california" },
    { label: "Texas", value: "texas" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setActiveStep('payment'); 
    navigate('/shoppingAddress/payment');
  };

  return (
    <div id='newAddress'>
      <form onSubmit={handleSubmit} method="POST">
        <div>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" placeholder='Enter Name'/>
        </div>
        <div>
            <label htmlFor="num">Mobile Number</label>
            <input type="text" name="num" id="num" placeholder='Enter Mobile Number'/>
        </div>
        <div>
            <label htmlFor="address">Flat, House no., Building, Company, Apartment</label>
            <input type="text" name="address" id="address" />
        </div>
        <div>
            <label htmlFor="area">Area, Colony, Street, Sector, Village</label>
            <input type="text" name="area" id="area" />
        </div>
        <div>
            <label htmlFor="city">City</label>
            <Select className="custom-select" options={cities} placeholder="Select City" />
        </div>
        <div>
            <label htmlFor="pincode">Pin Code</label>
            <input type="text" name="pincode" id="pincode" placeholder='Enter Pin Code' />
        </div>
        <div>
            <label htmlFor="state">State</label>
            <Select className="custom-select" options={states} placeholder="Select State" />
        </div>
        <div id='dfAddress'>
            <input type="checkbox" name="" id="address" />
            <span id="address">Use as my default address</span>
        </div>
        <button type="submit">Add New Address</button>
      </form>
    </div>
  );
}
