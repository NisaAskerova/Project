import React, { useState } from "react";
import axios from "axios";
import Admin from "../Admin";
import { useNavigate } from "react-router-dom";

const AddState = ({ onSuccess }) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
const navigate=useNavigate();
  // Form submit funksiyası
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Yeni state yaratmaq üçün API çağırışı
      await axios.post("http://127.0.0.1:8000/api/states/store", { name });
     navigate('/show_state')
      if (onSuccess) onSuccess(); // Əgər üst komponenti yeniləmək lazımdırsa
    } catch (err) {
      console.error("Xəta baş verdi:", err);
      setError("State əlavə edilərkən xəta baş verdi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Admin/>
    <div className="adminHero">
    <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h2>Yeni State Əlavə Et</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ marginBottom: "10px" }}>
        <label htmlFor="name" style={{ display: "block", marginBottom: "5px" }}>
          State Adı:
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        style={{
          backgroundColor: "#007BFF",
          color: "white",
          padding: "10px 15px",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        {loading ? "Göndərilir..." : "Əlavə Et"}
      </button>
    </form>
    </div>
    </>
  );
};

export default AddState;
