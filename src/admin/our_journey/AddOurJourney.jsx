import React, { useState } from 'react';
import axios from 'axios';
import Admin from '../Admin';
import { useNavigate } from 'react-router-dom';

const AddOurJourney = () => {
    const [mainData, setMainData] = useState({
        type: '',
        title: '',
        description: ''
    });

    const [counterData, setCounterData] = useState({
        title: '',
        count: ''
    });
    const navigate=useNavigate();
    const handleMainChange = (e) => {
        const { name, value } = e.target;
        setMainData({ ...mainData, [name]: value });
    };

    const handleMainSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://127.0.0.1:8000/api/our_journey/main_store', mainData);
            navigate('/show_our_journey');
            setMainData({ type: '', title: '', description: '' });
        } catch (error) {
            console.error("Error adding main information:", error);
        }
    };

    // OurJourneyCounter formu üçün handle funksiyası
    const handleCounterChange = (e) => {
        const { name, value } = e.target;
        setCounterData({ ...counterData, [name]: value });
    };

    const handleCounterSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://127.0.0.1:8000/api/our_journey/counter_store', counterData);
            navigate('/show_our_journey');
            setCounterData({ title: '', count: '' });
        } catch (error) {
            console.error("Error adding counter information:", error);
        }
    };

    return (
        <>
        <Admin />
        <div className="adminHero">
            <h2>OurJourneyMain Form</h2>
            <form onSubmit={handleMainSubmit}>
                <input
                    type="text"
                    name="type"
                    value={mainData.type}
                    onChange={handleMainChange}
                    placeholder="Type"
                    required
                />
                <input
                    type="text"
                    name="title"
                    value={mainData.title}
                    onChange={handleMainChange}
                    placeholder="Title"
                    required
                />
                <textarea
                    name="description"
                    value={mainData.description}
                    onChange={handleMainChange}
                    placeholder="Description"
                    required
                />
                <button type="submit">Add Main Information</button>
            </form>

            <h2>OurJourneyCounter Form</h2>
            <form onSubmit={handleCounterSubmit}>
                <input
                    type="text"
                    name="title"
                    value={counterData.title}
                    onChange={handleCounterChange}
                    placeholder="Title"
                    required
                />
                <input
                    type="number"
                    name="count"
                    value={counterData.count}
                    onChange={handleCounterChange}
                    placeholder="Count"
                    required
                />
                <button type="submit">Add Counter</button>
            </form>
        </div>
        </>
    );
};

export default AddOurJourney;
