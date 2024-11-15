import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Work() {
    const [aboutUs, setAboutUs] = useState([]);
    const [services, setServices] = useState([]);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchAboutUs = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/how_we_works/get_main_info');
            setAboutUs(response.data);
        } catch (error) {
            console.error('Error fetching About Us data:', error);
            setMessage('Error fetching About Us data: ' + (error.response?.data.message || error.message));
        }
    };

    const fetchServices = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/how_we_works/get_service_info');
            setServices(response.data);
        } catch (error) {
            console.error('Error fetching services:', error);
            setMessage('Error fetching services: ' + (error.response?.data.message || error.message));
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await Promise.all([fetchAboutUs(), fetchServices()]);
            setLoading(false);
        };
        fetchData();
    }, []);

    return (
        <div id="work">
            <div id="workLeft">
                {loading && <p>Loading data...</p>}
                {message && <p className="message">{message}</p>}

                {aboutUs.length > 0 ? (
                    aboutUs.map((item) => (
                        <div key={item.id}>
                            <span className="same">{item.type}</span>
                            <h2 className="thick">{item.main_title}</h2>
                            <p className="same">{item.main_description}.</p>
                        </div>
                    ))
                ) : (
                    <p>No About Us data available</p>
                )}
                
                {services.length > 0 ? (
                    services.map((service, index) => (
                        <React.Fragment key={service.id}>
                            <div
                                className="workBox"
                                style={{
                                    borderBottom:
                                        index !== services.length - 1
                                            ? "1px solid rgba(180, 178, 173, 0.20)"
                                            : "none",
                                }}
                            >
                                <div className="workiconDiv">
                                    {service.icon ? (
                                        <img
                                            src={`http://localhost:8000/storage/${service.icon}`}
                                            alt="Icon"
                                            width="50"
                                        />
                                    ) : (
                                        <p>No icon available</p>
                                    )}
                                </div>
                                <div>
                                    <h3>{service.title}</h3>
                                    <p className="same">{service.description}</p>
                                </div>
                            </div>
                        </React.Fragment>
                    ))
                ) : (
                    <p>No services available</p>
                )}
            </div>

            <div id="workRight">
                {aboutUs.length > 0 ? (
                    aboutUs.map((item) => (
                        <div key={item.id}>
                            {item.image ? (
                                <img
                                    src={`http://localhost:8000/storage/${item.image}`}
                                    alt="About Us"
                                />
                            ) : (
                                <p>No image available</p>
                            )}
                        </div>
                    ))
                ) : (
                    <p>No About Us data available</p>
                )}
            </div>
        </div>
    );
}
