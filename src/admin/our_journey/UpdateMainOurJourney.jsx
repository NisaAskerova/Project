import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Admin from '../Admin';

const UpdateMainOurJourney = () => {
    const { id } = useParams();
    const [mainData, setMainData] = useState({ type: '', title: '', description: '' });
    const navigate = useNavigate();

    useEffect(() => {
        fetchMainData();
    }, []);

    const fetchMainData = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/our_journey/show_main_info/${id}`);
            setMainData(response.data);
        } catch (error) {
            console.error("Error fetching main information:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMainData({ ...mainData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://127.0.0.1:8000/api/our_journey/main_info/${id}`, mainData);
            navigate('/show_our_journey');
        } catch (error) {
            console.error("Error updating main information:", error);
        }
    };

    return (
        <>
        <Admin />
        <div className="adminHero">
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="type"
                value={mainData.type}
                onChange={handleChange}
                placeholder="Type"
                required
            />
            <input
                type="text"
                name="title"
                value={mainData.title}
                onChange={handleChange}
                placeholder="Title"
                required
            />
            <textarea
                name="description"
                value={mainData.description}
                onChange={handleChange}
                placeholder="Description"
                required
            />
            <button type="submit">Update Main Information</button>
        </form>
        </div>
        </>
    );
};

export default UpdateMainOurJourney;
