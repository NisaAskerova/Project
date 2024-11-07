import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Admin from '../Admin';
import { useNavigate } from 'react-router-dom';

const ShowCategories = () => {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/categories/show');
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        
        fetchCategories();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/categories/delete/${id}`);
            setCategories(categories.filter((category) => category.id !== id));
            alert("Category deleted successfully!");
        } catch (error) {
            console.error("Error deleting category:", error);
            alert("Failed to delete category. Please try again.");
        }
    };

    const handleUpdate = (id) => {
        navigate(`/update_categories/${id}`);
    };

    return (
        <>
        <Admin/>
        <div className='adminHero'>
            <h2>Categories</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Category Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category) => (
                        <tr key={category.id}>
                            <td>{category.id}</td>
                            <td>{category.name}</td>
                            <td>
                                <button className='edit-button' onClick={() => handleUpdate(category.id)}>Update</button>
                                <button className='delete-button' onClick={() => handleDelete(category.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </>
    );
};

export default ShowCategories;
