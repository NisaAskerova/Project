import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Admin from "../Admin";

const UpdateState = () => {
  const { id } = useParams(); // URL-dən state ID-ni götür
  const [stateData, setStateData] = useState({ name: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchState();
  }, []);

  const fetchState = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/states/show/${id}`);
      setStateData({ name: response.data.name });
    } catch (err) {
      console.error("Xəta baş verdi:", err);
      setError("State məlumatını yükləmək mümkün olmadı.");
    } finally {
      setLoading(false);
    }
  };

  // Form submit edildikdə
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/states/update/${id}`, stateData);
      setMessage(response.data.message);
      setTimeout(() => navigate("/show_state"), 2000); // 2 saniyə sonra siyahı səhifəsinə keçid
    } catch (err) {
      console.error("Xəta baş verdi:", err.response?.data || err);
      setMessage("State yenilənərkən xəta baş verdi.");
    }
  };

  // Input dəyərini dəyiş
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStateData((prevData) => ({ ...prevData, [name]: value }));
  };

  if (loading) return <div className='loadingDiv'><img  src="./loading.gif" alt="" /></div>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Admin />
      <div className="adminHero">
        <h2>State Yeniləmə</h2>
        {message && <p className="message">{message}</p>} {/* Mesaj göstər */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Ad:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={stateData.name}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="submit-button">Yenilə</button>
        </form>
        <button className="add-button" onClick={() => navigate("/show_state")}>Geri</button>
      </div>
    </>
  );
};

export default UpdateState;
