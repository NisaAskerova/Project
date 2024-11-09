import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Admin from '../Admin';
import { useNavigate } from 'react-router-dom';

const ShowTags = () => {
    const [tags, setTags] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/tags/show');
                setTags(response.data);
            } catch (error) {
                console.error("Error fetching tags:", error);
            }
        };
        
        fetchTags();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/tags/delete/${id}`);
            setTags(tags.filter((tag) => tag.id !== id));
            alert("Tag deleted successfully!");
        } catch (error) {
            console.error("Error deleting tag:", error);
            alert("Failed to delete tag. Please try again.");
        }
    };

    const handleUpdate = (id) => {
        navigate(`/update_tag/${id}`);
    };

    return (
        <>
        <Admin />
        <div className='adminHero'>
            <button className="add-button" onClick={() => navigate('/add_tag')}>Add</button>
            <h2>Tags</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tag Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tags.map((tag) => (
                        <tr key={tag.id}>
                            <td>{tag.id}</td>
                            <td>{tag.name}</td>
                            <td>
                                <button className='edit-button' onClick={() => handleUpdate(tag.id)}>Update</button>
                                <button className='delete-button' onClick={() => handleDelete(tag.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </>
    );
};

export default ShowTags;
