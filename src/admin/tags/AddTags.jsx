import React, { useState } from 'react';
import axios from 'axios';
import Admin from '../Admin';
import { useNavigate } from 'react-router-dom';

const AddTags = () => {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const navigate=useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/tags/store', { name });
            setMessage(response.data.message);
            navigate('/show_tags');
            setName('');
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data.message);
            } else {
                setMessage("An error occurred. Please try again.");
            }
        }
    };

    return (
        <>
        <Admin/>
        <div className='adminHero'>
            <h2>Add New Tag</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Tag Name:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Add Tag</button>
            </form>
            {message && <p>{message}</p>}
        </div></>
    );
};

export default AddTags;
