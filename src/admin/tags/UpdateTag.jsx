import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Admin from '../Admin';

const UpdateTag = () => {
    const { id } = useParams(); 
    const [name, setName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTag = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/tags/show/${id}`);
                setName(response.data.name); 
            } catch (error) {
                console.error("Error fetching tag:", error);
            }
        };

        fetchTag();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://127.0.0.1:8000/api/tags/update/${id}`, { name });
            navigate('/show_tags');
        } catch (error) {
            console.error("Error updating tag:", error);
            alert("Failed to update tag. Please try again.");
        }
    };

    return (
        <>
        <Admin/>
        <div className='adminHero'>
            <h2>Update Tag</h2>
            <form onSubmit={handleUpdate}>
                <label htmlFor="name">Tag Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <button type="submit">Update</button>
            </form>
        </div>
        </>
    );
};

export default UpdateTag;
