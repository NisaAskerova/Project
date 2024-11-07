import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Admin from '../Admin';

const UpdateCategories = () => {
    const { id } = useParams(); // URL-dən kateqoriyanın id-sini alır
    const [name, setName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Seçilmiş kateqoriyanın məlumatlarını əldə edir
        const fetchCategory = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/categories/show/${id}`);
                setName(response.data.name); // Məlumatı input sahəsinə doldurur
            } catch (error) {
                console.error("Error fetching category:", error);
            }
        };

        fetchCategory();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://127.0.0.1:8000/api/categories/update/${id}`, { name });
            navigate('/show_categories'); // Yeniləndikdən sonra kateqoriya siyahısına geri qaytarır
        } catch (error) {
            console.error("Error updating category:", error);
            alert("Failed to update category. Please try again.");
        }
    };

    return (
        <>
        <Admin/>
        <div className='adminHero'>
            <h2>Update Category</h2>
            <form onSubmit={handleUpdate}>
                <label htmlFor="name">Category Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <button type="submit">Update</button>
            </form>
        </div>
        </>
    );
};

export default UpdateCategories;
