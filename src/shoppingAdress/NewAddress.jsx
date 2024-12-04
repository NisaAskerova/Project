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
        console.error('Şəhərlər və ya ştatlar yüklənərkən xəta baş verdi:', error);
        setError('Şəhərlər və ya ştatları yükləmək mümkün olmadı.');
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Null dəyərləri yoxlayırıq
    if (!selectedCity || !selectedState) {
      setError('Zəhmət olmasa, həm şəhəri, həm də ştatı seçin.');
      setIsLoading(false);
      return;
    }
    const addressData = {
      name: e.target.name.value,
      mobile_number: e.target.num.value, // Formda input adı 'num' idi
      address_line: e.target.address.value,
      area: e.target.area.value,
      city_id: selectedCity?.value || null, // Dəyəri təhlükəsiz şəkildə əldə etmək üçün opsional zəncir istifadə edilir
      pin_code: e.target.pincode.value,
      state_id: selectedState?.value || null, // Opsional zəncir
      default_address: e.target.default_address.checked,
    };

    // Ünvan məlumatlarını localStorage-da saxlayırıq
    localStorage.setItem('addressData', JSON.stringify(addressData));

    // Növbəti səhifəyə yönləndiririk
    navigate('/shoppingAddress/payment'); // Ödəniş məlumatları daxil ediləcək səhifəyə keçirik
  };

  return (
    <div id="newAddress">
      <form onSubmit={handleSubmit}>
        <h2>Yeni Ünvan Əlavə Et</h2>

        {/* Ad */}
        <div>
          <label htmlFor="name">Ad</label>
          <input type="text" name="name" id="name" placeholder="Adınızı daxil edin" required disabled={isLoading} />
        </div>

        {/* Telefon Nömrəsi */}
        <div>
          <label htmlFor="num">Telefon Nömrəsi</label>
          <input type="text" name="num" id="num" placeholder="Telefon nömrənizi daxil edin" required disabled={isLoading} />
        </div>

        <div>
          <label htmlFor="address">Düzəldilmiş, Ev nömrəsi, Bina</label>
          <input type="text" name="address" id="address" required disabled={isLoading} />
        </div>

        <div>
          <label htmlFor="area">Sahə, Koloniya, Küçə</label>
          <input type="text" name="area" id="area" required disabled={isLoading} />
        </div>

        <div>
          <label htmlFor="city">Şəhər</label>
          <Select
            className="custom-select"
            options={isLoading ? [] : cities}
            placeholder={isLoading ? 'Şəhərlər Yüklənir...' : 'Şəhər Seçin'}
            onChange={(values) => setSelectedCity(values[0])}
            value={selectedCity}
            disabled={isLoading}
          />
        </div>
        <div>
          <label htmlFor="pincode">Poçt Kodu</label>
          <input type="text" name="pincode" id="pincode" placeholder="Poçt Kodunu daxil edin" required disabled={isLoading} />
        </div>
        <div>
          <label htmlFor="state">Ştat</label>
          <Select
            className="custom-select"
            options={isLoading ? [] : states}
            placeholder={isLoading ? 'Ştatlar Yüklənir...' : 'Ştat Seçin'}
            onChange={(values) => setSelectedState(values[0])}
            value={selectedState}
            disabled={isLoading}
          />
        </div>
        <div id="dfAddress">
          <input type="checkbox" name="default_address" id="default_address" disabled={isLoading} />
          <span id="address">Bu ünvana əsas ünvan kimi istifadə et</span>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Əlavə edilir...' : 'Yeni Ünvan Əlavə Et'}
        </button>
      </form>
    </div>
  );
}
