import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AboutSecura() {
    const [aboutSecuraData, setAboutSecuraData] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAboutSecuraData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/about_secura/get');
                setAboutSecuraData(response.data);
            } catch (error) {
                setError('Error loading data');
                console.error('Error:', error);
            }
        };

        fetchAboutSecuraData();
    }, []);

    const handleUpdate = (id) => {
        window.location.href = `/update_about_secura/${id}`;
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/about_secura/delete/${id}`);
            setAboutSecuraData(aboutSecuraData.filter((item) => item.id !== id));
        } catch (error) {
            setError('Error deleting item');
            console.error('Error:', error);
        }
    };

    return (
        <div id="aboutSecura">
            {error && <p>{error}</p>}
            {aboutSecuraData.length > 0 ? (
                aboutSecuraData.map((item) => (
                    <>
                        <div id="aboySecuraLeft" >
                            <span className="same">{item.type}</span>
                            <h3 className='thick'>{item.title}</h3>
                            <p className='same'>{item.description}</p>
                            <button><span>Explore</span> {item.icon && <img src={`http://localhost:8000/storage/${item.icon}`} alt="Icon" />}</button>
                        </div>
                        <div> {item.image && <img src={`http://localhost:8000/storage/${item.image}`} alt="Image" />}</div>
                    </>
                ))
            ) : (
                <p>No About Secura data available</p>
            )}
        </div>

    );
}
