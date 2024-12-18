import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Team() {
    const [mainInfo, setMainInfo] = useState([]);
    const [serviceInfo, setServiceInfo] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchMainInfo();
        fetchServiceInfo();
    }, []);

    const fetchMainInfo = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/our_team/get_main_info');
            setMainInfo(response.data);
        } catch (error) {
            setMessage('Error fetching main information: ' + (error.response?.data.message || error.message));
        }
    };

    const fetchServiceInfo = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/our_team/get_service_info');
            setServiceInfo(response.data);
        } catch (error) {
            setMessage('Error fetching service information: ' + (error.response?.data.message || error.message));
        }
    };

    return (
        <div id="team">
            {/* Main Info (Baş hissə) */}
            {mainInfo.length > 0 ? (
                mainInfo.map((main) => (
                    <React.Fragment key={main.id}>
                        <span className="same">{main.type}</span>
                        <h2 className="thick">{main.title}</h2>
                        <p className="same">{main.description}</p>
                    </React.Fragment>
                ))
            ) : (
                <div className='loadingDiv'><img  src="./loading.gif" alt="" /></div>
            )}

            {/* Service Info (Komanda üzvləri) */}
            <div id="teamBoxes">
                {serviceInfo.length > 0 ? (
                    serviceInfo.map((member) => (
                        <div className="teamBox" key={member.id}>
                            {member.image ? (
                                <img
                                    src={`http://localhost:8000/storage/${member.image}`}
                                    alt={member.name}
                                />
                            ) : (
                                <p>No image available</p>
                            )}
                            <div>
                                <h4>{member.name}</h4>
                                <span>{member.title}</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className='loadingDiv'><img  src="./loading.gif" alt="" /></div>
                )}
            </div>

            {/* Xətalar və Mesajlar */}
            {message && <p className="error-message">{message}</p>}
        </div>
    );
}
