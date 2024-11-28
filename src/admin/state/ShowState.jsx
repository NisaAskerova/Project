import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Admin from "../Admin";

const ShowState = () => {
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(""); // Yeni state
  const navigate = useNavigate();

  useEffect(() => {
    fetchStates();
  }, []);

  const fetchStates = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/states/index");
      setStates(response.data);
    } catch (err) {
      console.error("Xəta baş verdi:", err);
      setError("State-ləri yükləmək mümkün olmadı.");
    } finally {
      setLoading(false);
    }
  };

  const deleteState = async (id) => {
    if (window.confirm("Bu state-i silmək istədiyinizdən əminsiniz?")) {
      try {
        const response = await axios.delete(`http://127.0.0.1:8000/api/states/delete/${id}`);
        setMessage(response.data.message); // Mesajı yeniləyin
        fetchStates();
      } catch (err) {
        console.error("Xəta baş verdi:", err.response.data);
        setMessage("State silinərkən xəta baş verdi.");
      }
    }
  };

  if (loading) return <p>Yüklənir...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Admin />
      <div className="adminHero">
        <button className="add-button" onClick={() => navigate('/add_state')}>Add About Us</button>
        <h2>State Siyahısı</h2>
        {message && <p className="message">{message}</p>} {/* Mesajı göstər */}
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Ad</th>
              <th>Əməliyyatlar</th>
            </tr>
          </thead>
          <tbody>
            {states.map((state) => (
              <tr key={state.id}>
                <td>{state.id}</td>
                <td>{state.name}</td>
                <td>
                  <button className="edit-button" onClick={() => navigate(`/update_state/${state.id}`)}>
                    Edit
                  </button>
                  <button className="delete-button" onClick={() => deleteState(state.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ShowState;
