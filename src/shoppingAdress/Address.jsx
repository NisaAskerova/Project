import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Axios istifadə edirik
import NewAddress from "./NewAddress"; // Yeni ünvan əlavə etmək üçün komponent

const Address = () => {
  const [addresses, setAddresses] = useState([]); // Ünvanları saxlayacaq state
  const [loading, setLoading] = useState(true); // Yüklənmə vəziyyəti
  const [error, setError] = useState(""); // Hata mesajı

  // Ünvanları backend-dən çəkirik
  useEffect(() => {
    // Sorğu göndəririk
    axios
      .get("http://127.0.0.1:8000/api/orders/addresses") // Backend ünvanları çəkən API endpoint
      .then((response) => {
        setAddresses(response.data); // Ünvanları state-ə əlavə edirik
        setLoading(false); // Yüklənmə tamamlandı
      })
      .catch((err) => {
        setError("Ünvanlar alınarkən xəta baş verdi");
        setLoading(false); // Yüklənmə tamamlandı
      });
  }, []);

  // Ünvan silmək funksiyası
  const deleteAddress = (addressId) => {
    axios
      .delete(`http://127.0.0.1:8000/api/addresses/${addressId}`) // Ünvan silmək üçün API endpoint
      .then(() => {
        // Silindikdən sonra ünvanları yeniləyirik
        setAddresses(addresses.filter((address) => address.id !== addressId));
      })
      .catch((err) => {
        setError("Ünvan silinərkən xəta baş verdi");
      });
  };
console.log(addresses);

  return (
    <div id="addressHero">
      <h2>Təslim ünvanını seçin</h2>
      <p className="same sm">
        Aşağıda göstərilən ünvanı istifadə etmək istəyirsinizmi? Əgər belədirsə, müvafiq "Bu ünvana təslim et" düyməsini sıxın. Yoxsa yeni bir təslim ünvanı daxil edə bilərsiniz.
      </p>
      <div id="addressCards">
        {loading && <p>Yüklənir...</p>} {/* Yüklənmə vəziyyəti */}
        {error && <p>{error}</p>} {/* Hata mesajı */}

        {addresses.length > 0 ? (
          addresses.map((address) => (
            <div key={address.id} className="addressCart">
              <div className="check">
                <h4>{address.name}</h4>
                <input type="radio" name="check1" id={`check-${address.id}`} />
              </div>
              <div className="addInfo">
                <span className="same">{address.address_line} {address.area}, {address.city} {address.state} {address.pin_code}</span>
              </div>
              <div className="addressButtons">
                <button>
                  <img src="/edit.svg" alt="" />
                  <span>Dəyişdir</span>
                </button>
                <button onClick={() => deleteAddress(address.id)}>
                  <img src="/delete.svg" alt="" />
                  <span>Silmək</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Heç bir ünvan yoxdur.</p>
        )}
      </div>
      <Link to="/shoppingAddress/payment" className="same deliverBtn">
        Buraya Təslim Et
      </Link>
      <NewAddress /> {/* Yeni ünvan əlavə etmək üçün komponent */}
    </div>
  );
};

export default Address;
