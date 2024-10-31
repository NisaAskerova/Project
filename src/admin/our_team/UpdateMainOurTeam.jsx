// UpdateMainOurTeam.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Admin from '../Admin';

function UpdateMainOurTeam() {
    const [mainInfo, setMainInfo] = useState({ type: '', title: '', description: '' });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        fetchMainInfo();
    }, []);

    const fetchMainInfo = async () => {
        try {
            const response = await axios.post(`http://localhost:8000/api/our_team/main_info/${id}`);
            setMainInfo(response.data);
        } catch (error) {
            setMessage('Error fetching main information: ' + error.response?.data.message);
        }
    };

    const handleUpdate = async () => {
        try {
            await axios.post(`http://localhost:8000/api/our_team/main_info/${id}`, mainInfo);
            setMessage('Main information updated successfully!');
            navigate('/our_team'); 
        } catch (error) {
            setMessage('Error updating main information: ' + error.response?.data.message);
        }
    };

    return (
    <>
        <Admin />
        <div className="adminHero">
            <h2>Update Main Information</h2>
            {message && <p className="message">{message}</p>}
            <input
                type="text"
                value={mainInfo.type}
                onChange={(e) => setMainInfo({ ...mainInfo, type: e.target.value })}
                placeholder="Type"
            />
            <input
                type="text"
                value={mainInfo.title}
                onChange={(e) => setMainInfo({ ...mainInfo, title: e.target.value })}
                placeholder="Main Title"
            />
            <textarea
                value={mainInfo.description}
                onChange={(e) => setMainInfo({ ...mainInfo, description: e.target.value })}
                placeholder="Main Description"
            ></textarea>
            <button onClick={handleUpdate}>Update</button>
        </div>
    </>
    );
}

export default UpdateMainOurTeam;
