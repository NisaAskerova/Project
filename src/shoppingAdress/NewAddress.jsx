import React, { useContext, useEffect, useState } from 'react';
import Select from 'react-dropdown-select';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MyContext } from '../App';

export default function NewAddress() {
  const navigate = useNavigate();
  const { setActiveStep } = useContext(MyContext);

  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [citiesResponse, statesResponse] = await Promise.all([
          axios.get('http://127.0.0.1:8000/api/cities/index'),
          axios.get('http://127.0.0.1:8000/api/states/index'),
        ]);

        setCities(
          citiesResponse.data.map((city) => ({
            label: city.name,
            value: city.id,
          }))
        );

        setStates(
          statesResponse.data.map((state) => ({
            label: state.name,
            value: state.id,
          }))
        );
      } catch (error) {
        console.error('Error fetching cities or states:', error);
        setError('Failed to load cities or states.');
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    // Check for null values
    if (!selectedCity || !selectedState) {
      setError('Please select both city and state.');
      setIsLoading(false);
      return;
    }
  
    const addressData = {
      name: e.target.name.value,
      mobile_number: e.target.num.value, // Form input name was 'num', not 'mobile_number'
      address_line: e.target.address.value,
      area: e.target.area.value,
      city_id: selectedCity?.value || null, // Use optional chaining to safely access 'value'
      pin_code: e.target.pincode.value,
      state_id: selectedState?.value || null, // Use optional chaining
      default_address: e.target.default_address.checked,
    };
  
    // Store address data in localStorage
    localStorage.setItem('addressData', JSON.stringify(addressData));
  
    // Navigate to the next page
    navigate('/shoppingAddress/payment'); // Navigate to the next page where payment details are filled
  };
  
  return (
    <div id="newAddress">
      <form onSubmit={handleSubmit}>
        <h2>Add New Address</h2>

        {/* Name */}
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" placeholder="Enter Name" required disabled={isLoading} />
        </div>

        {/* Mobile Number */}
        <div>
          <label htmlFor="num">Mobile Number</label>
          <input type="text" name="num" id="num" placeholder="Enter Mobile Number" required disabled={isLoading} />
        </div>

        {/* Address Line */}
        <div>
          <label htmlFor="address">Flat, House no., Building</label>
          <input type="text" name="address" id="address" required disabled={isLoading} />
        </div>

        {/* Area */}
        <div>
          <label htmlFor="area">Area, Colony, Street</label>
          <input type="text" name="area" id="area" required disabled={isLoading} />
        </div>

        {/* City Select */}
        <div>
          <label htmlFor="city">City</label>
          <Select
            className="custom-select"
            options={isLoading ? [] : cities}
            placeholder={isLoading ? 'Loading Cities...' : 'Select City'}
            onChange={(values) => setSelectedCity(values[0])}
            value={selectedCity}
            disabled={isLoading}
          />
        </div>

        {/* Pin Code */}
        <div>
          <label htmlFor="pincode">Pin Code</label>
          <input type="text" name="pincode" id="pincode" placeholder="Enter Pin Code" required disabled={isLoading} />
        </div>

        {/* State Select */}
        <div>
          <label htmlFor="state">State</label>
          <Select
            className="custom-select"
            options={isLoading ? [] : states}
            placeholder={isLoading ? 'Loading States...' : 'Select State'}
            onChange={(values) => setSelectedState(values[0])}
            value={selectedState}
            disabled={isLoading}
          />
        </div>

        {/* Default Address Checkbox */}
        <div id="dfAddress">
          <input type="checkbox" name="default_address" id="default_address" disabled={isLoading} />
          <span id="address">Use as my default address</span>
        </div>

        {/* Error Messages */}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {/* Submit Button */}
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Adding...' : 'Add New Address'}
        </button>
      </form>
    </div>
  );
}
