import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Admin from '../Admin';
import { useNavigate } from 'react-router-dom';

function ShowOurTeam() {
    const [mainInfo, setMainInfo] = useState([]);
    const [serviceInfo, setServiceInfo] = useState([]);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchMainInfo();
        fetchServiceInfo();
    }, []);

    const fetchMainInfo = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/our_team/show_main_info');
            setMainInfo(response.data);
        } catch (error) {
            setMessage('Error fetching main information: ' + error.response?.data.message);
        }
    };

    const fetchServiceInfo = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/our_team/show_service_info');
            setServiceInfo(response.data);
        } catch (error) {
            setMessage('Error fetching service information: ' + error.response?.data.message);
        }
    };

    const handleDelete = async (id, type) => {
        const itemType = type === 'main_info' ? 'About Us' : 'Service';
        if (window.confirm(`Are you sure you want to delete this ${itemType}?`)) {
            try {
                await axios.delete(`http://localhost:8000/api/our_team/${type}/${id}`);
                setMessage(`${itemType} deleted successfully!`);
                type === 'main_info' ? fetchMainInfo() : fetchServiceInfo();
            } catch (error) {
                setMessage('Error deleting: ' + (error.response?.data.message || error.message));
            }
        }
    };

    return (
        <>
            <Admin />
            <div className="adminHero">
            <button className="add-button" onClick={() => navigate('/add_our_team')}>Add</button>
                <h2>Our Team Main Information</h2>
                {message && <p className="message">{message}</p>}

                <h3>Main Information</h3>
                <table className="info-table">
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Main Title</th>
                            <th>Main Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mainInfo.map((info) => (
                            <tr key={info.id}>
                                <td>{info.type}</td>
                                <td>{info.title}</td>
                                <td>{info.description}</td>
                                <td>
                                <button className="edit-button" onClick={() => navigate(`/update_main_our_team/${info.id}`)}>Edit</button>
                                    <button className='delete-button' onClick={() => handleDelete(info.id, 'main_info')}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <h3> Our Team Service Information</h3>
                <table className="info-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Image</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {serviceInfo.map((service) => (
                            <tr key={service.id}>
                                <td>{service.title}</td>
                                <td>{service.description}</td>
                                <td>
                                    {service.image && (
                                        <img
                                            src={`http://localhost:8000/storage/${service.image}`}
                                            alt={service.title}
                                            style={{ width: '50px', height: '50px' }}
                                        />
                                    )}
                                </td>
                                <td>
                                <button className="edit-button" onClick={() => navigate(`/update_service_our_team/${service.id}`)}>Edit</button>
                                <button className='delete-button' onClick={() => handleDelete(service.id, 'service_info')}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default ShowOurTeam;
