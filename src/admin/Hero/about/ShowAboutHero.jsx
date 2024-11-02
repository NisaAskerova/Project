import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // useNavigate hookunu əlavə edin
import Admin from '../../Admin';

const ShowAboutHero = () => {
    const [aboutHeroData, setAboutHeroData] = useState([]);
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // useNavigate hookunu istifadə edin

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/about_hero/show');
                setAboutHeroData(response.data);
            } catch (error) {
                setMessage('Error fetching data: ' + error.response?.data?.message);
                console.error('Error:', error);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            try {
                await axios.delete(`http://localhost:8000/api/about_hero/delete/${id}`);
                setAboutHeroData(aboutHeroData.filter(item => item.id !== id));
                setMessage('Item deleted successfully!');
            } catch (error) {
                setMessage('Error deleting item: ' + error.response?.data?.message);
                console.error('Error:', error);
            }
        }
    };

    const handleUpdate = (id) => {
        navigate(`/update_about_hero/${id}`); // /update_about_hero/:id səhifəsinə yönləndirin
    };

    return (
        <>
            <Admin />
            <div className="adminHero">
            <button className="add-button" onClick={() => navigate('/add_about_hero')}>Add</button>
                <h2>About Hero List</h2>
                {message && <p>{message}</p>}
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Image</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {aboutHeroData.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.title}</td>
                                <td>
                                    {item.image && (
                                        <img src={`http://localhost:8000/storage/${item.image}`} alt={item.title} width="100" />
                                    )}
                                </td>
                                <td>
                                    <button className="edit-button" onClick={() => handleUpdate(item.id)}>Update</button> {/* Update düyməsi */}
                                    <button className="delete-button" onClick={() => handleDelete(item.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default ShowAboutHero;
