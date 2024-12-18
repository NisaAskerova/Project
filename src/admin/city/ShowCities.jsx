import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Admin from "../Admin";

const ShowCities = () => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/cities/index");
      setCities(response.data);
    } catch (err) {
      console.error("Xəta baş verdi:", err);
      setError("Cities yüklənərkən xəta baş verdi.");
    } finally {
      setLoading(false);
    }
  };

  const deleteCity = async (id) => {
    if (window.confirm("Bu şəhəri silmək istədiyinizdən əminsiniz?")) {
      try {
        const response = await axios.delete(`http://127.0.0.1:8000/api/cities/delete/${id}`);
        alert(response.data.message);
        fetchCities();
      } catch (err) {
        console.error("Xəta baş verdi:", err);
        alert("City silinərkən xəta baş verdi.");
      }
    }
  };

  if (loading) return <div className='loadingDiv'><img  src="loading.gif" alt="" /></div>;
  if (error) return <p>{error}</p>;

  return (
    <>
    <Admin/>
    <div className="adminHero">
      <button className="add-button" onClick={() => navigate("/add_city")}>Yeni Şəhər Əlavə Et</button>
      <h2>Şəhər Siyahısı</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Ad</th>
            <th>State</th>
            <th>Əməliyyatlar</th>
          </tr>
        </thead>
        <tbody>
          {cities.map((city) => (
            <tr key={city.id}>
              <td>{city.id}</td>
              <td>{city.name}</td>
              <td>{city.state.name}</td>
              <td>
                <button className="edit-button" onClick={() => navigate(`/update_city/${city.id}`)}>Edit</button>
                <button className="delete-button" onClick={() => deleteCity(city.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div></>
  );
};

export default ShowCities;
