// UpdateServiceOurTeam.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Admin from '../Admin';

function UpdateServiceOurTeam() {
    const [serviceInfo, setServiceInfo] = useState({ title: '', description: '', image: null });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        fetchServiceInfo();
    }, []);

    const fetchServiceInfo = async () => {
        try {
            const response = await axios.post(`http://localhost:8000/api/our_team/service_info/${id}`);
            setServiceInfo(response.data);
        } catch (error) {
            setMessage('Error fetching service information: ' + error.response?.data.message);
        }
    };

    const handleUpdate = async () => {
        try {
            const formData = new FormData();
            formData.append('title', serviceInfo.title);
            formData.append('description', serviceInfo.description);
            if (serviceInfo.image) {
                formData.append('image', serviceInfo.image);
            }

            await axios.post(`http://localhost:8000/api/our_team/service_info/${id}`, formData);
            setMessage('Service information updated successfully!');
            navigate('/our_team'); // Əsas səhifəyə yönləndirmək
        } catch (error) {
            setMessage('Error updating service information: ' + error.response?.data.message);
        }
    };

    return (
        <>
        <Admin />
        <div className="adminHero">
            <h2>Update Service Information</h2>
            {message && <p className="message">{message}</p>}
            <input
                type="text"
                value={serviceInfo.title}
                onChange={(e) => setServiceInfo({ ...serviceInfo, title: e.target.value })}
                placeholder="Service Title"
            />
            <textarea
                value={serviceInfo.description}
                onChange={(e) => setServiceInfo({ ...serviceInfo, description: e.target.value })}
                placeholder="Service Description"
            ></textarea>
            <input
                type="file"
                onChange={(e) => setServiceInfo({ ...serviceInfo, image: e.target.files[0] })}
            />
            <button onClick={handleUpdate}>Update</button>
        </div>
        </>
    );
}

export default UpdateServiceOurTeam;
