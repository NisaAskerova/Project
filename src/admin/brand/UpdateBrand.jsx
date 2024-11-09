import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Admin from '../Admin';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateBrand = () => {
    const { id } = useParams(); 
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBrand = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/brands/index/${id}`);
                setName(response.data.name);
            } catch (error) {
                console.error("Error fetching brand:", error);
                setMessage("Failed to load brand information.");
            }
        };

        fetchBrand();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            await axios.post(`http://127.0.0.1:8000/api/brands/update/${id}`, { name });
            setMessage("Brand updated successfully!");
            navigate('/show_brands');
        } catch (error) {
            console.error("Error updating brand:", error);
            setMessage("Failed to update brand. Please try again.");
        }
    };

    return (
        <>
        <Admin />
        <div className='adminHero'>
            <h2>Update Brand</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Brand Name:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Update Brand</button>
            </form>
            {message && <p>{message}</p>}
        </div>
        </>
    );
};

export default UpdateBrand;
