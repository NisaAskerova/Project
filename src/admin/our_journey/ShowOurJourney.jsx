import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Admin from '../Admin';

const ShowOurJourney = () => {
    const [mainData, setMainData] = useState([]);
    const [counterData, setCounterData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchMainData();
        fetchCounterData();
    }, []);

    // Fetch main data
    const fetchMainData = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/our_journey/show_main_info');
            setMainData(response.data);
        } catch (error) {
            console.error("Error fetching main information:", error);
        }
    };

    // Fetch counter data
    const fetchCounterData = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/our_journey/show_counter_info');
            setCounterData(response.data);
        } catch (error) {
            console.error("Error fetching counter information:", error);
        }
    };

    // Handle delete for main info
    const deleteMainInfo = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/our_journey/main_info/${id}`);
            setMainData(mainData.filter((item) => item.id !== id));
        } catch (error) {
            console.error("Error deleting main information:", error);
        }
    };

    // Handle delete for counter info
    const deleteCounterInfo = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/our_journey/counter_info/${id}`);
            setCounterData(counterData.filter((item) => item.id !== id));
        } catch (error) {
            console.error("Error deleting counter information:", error);
        }
    };

    return (
        <>
        <Admin />
        <div className="adminHero">
        <button className="add-button" onClick={() => navigate('/add_our_journey')}>Add Blog</button>
            <h2>OurJourneyMain Information</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Type</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {mainData.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.type}</td>
                            <td>{item.title}</td>
                            <td>{item.description}</td>
                            <td>
                                <button className='edit-button' onClick={() => navigate(`/update_main/${item.id}`)}>Update</button>
                                <button className='delete-button' onClick={() => deleteMainInfo(item.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2>OurJourneyCounter Information</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Count</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {counterData.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.title}</td>
                            <td>{item.count}</td>
                            <td>
                                <button className='edit-button' onClick={() => navigate(`/update_counter/${item.id}`)}>Update</button>
                                <button className='delete-button' onClick={() => deleteCounterInfo(item.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </>
    );
};

export default ShowOurJourney;
