import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import Admin from "../Admin";

const UpdateCity = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [states, setStates] = useState([]);
  const [stateId, setStateId] = useState("");

  useEffect(() => {
    fetchCityDetails();
    fetchStates();
  }, []);

  const fetchCityDetails = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/cities/show/${id}`);
      const city = response.data;
      setName(city.name);
      setStateId(city.state_id);
    } catch (err) {
      console.error("Xəta baş verdi:", err);
      toast.error("Şəhər məlumatları yüklənərkən xəta baş verdi.");
    }
  };

  const fetchStates = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/states/index");
      setStates(response.data);
    } catch (err) {
      console.error("Xəta baş verdi:", err);
      toast.error("States məlumatları yüklənərkən xəta baş verdi.");
    }
  };

  const updateCity = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://127.0.0.1:8000/api/cities/update/${id}`, {
        name,
        state_id: stateId,
      });
      toast.success("Şəhər uğurla yeniləndi!");
      navigate("/show_cities");
    } catch (err) {
      console.error("Xəta baş verdi:", err);
      toast.error("Şəhər yenilənərkən xəta baş verdi.");
    }
  };

  return (
    <>
    <Admin/>
    <div className="adminHero">
      <h2>Şəhəri Yenilə</h2>
      <form onSubmit={updateCity}>
        <div>
          <label>Ad:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>State:</label>
          <select value={stateId} onChange={(e) => setStateId(e.target.value)} required>
            <option value="">Seçin</option>
            {states.map((state) => (
              <option key={state.id} value={state.id}>
                {state.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Yenilə</button>
      </form>
    </div>
    </>
  );
};

export default UpdateCity;
