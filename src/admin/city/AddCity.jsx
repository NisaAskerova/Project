import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Admin from "../Admin";

const AddCity = () => {
  const [states, setStates] = useState([]);
  const [cityData, setCityData] = useState({ name: "", state_id: "" });
  const navigate = useNavigate();

  useEffect(() => {
    fetchStates();
  }, []);

  const fetchStates = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/states/index");
      setStates(response.data);
    } catch (err) {
      console.error("State-ləri yükləmək mümkün olmadı:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/cities/store", cityData);
      alert(response.data.message);
      navigate("/show_cities");
    } catch (err) {
      console.error("Xəta baş verdi:", err);
      alert("City əlavə olunarkən xəta baş verdi.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCityData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
    <Admin/>
    <div className="adminHero">

    
    <form onSubmit={handleSubmit}>
      <div>
        <label>Ad:</label>
        <input type="text" name="name" onChange={handleChange} required />
      </div>
      <div>
        <label>State:</label>
        <select name="state_id" onChange={handleChange} required>
          <option value="">Seçin</option>
          {states.map((state) => (
            <option key={state.id} value={state.id}>
              {state.name}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Əlavə Et</button>
    </form></div></>
  );
};

export default AddCity;
