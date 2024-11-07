import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Admin from '../Admin';

const UpdateCounterOurJourney = () => {
    const { id } = useParams();
    const [counterData, setCounterData] = useState({ title: '', count: '' });
    const navigate = useNavigate();

    useEffect(() => {
        fetchCounterData();
    }, []);

    const fetchCounterData = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/our_journey/counter_info/${id}`);
            setCounterData(response.data);
        } catch (error) {
            console.error("Error fetching counter information:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCounterData({ ...counterData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://127.0.0.1:8000/api/our_journey/counter_update/${id}`, counterData);
            navigate('/show_our_journey');
        } catch (error) {
            console.error("Error updating counter information:", error);
        }
    };

    return (  <>
        <Admin />
        <div className="adminHero">
        <form onSubmit={handleSubmit}>
            <h2>Update Counter Information</h2>
            <input
                type="text"
                name="title"
                value={counterData.title}
                onChange={handleChange}
                placeholder="Title"
                required
            />
            <input
                type="number"
                name="count"
                value={counterData.count}
                onChange={handleChange}
                placeholder="Count"
                required
            />
            <button type="submit">Update Counter</button>
        </form>
        </div>
        </>
    );
};

export default UpdateCounterOurJourney;
