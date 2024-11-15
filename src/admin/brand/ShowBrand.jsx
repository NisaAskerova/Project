import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Admin from '../Admin';
import { useNavigate } from 'react-router-dom';

const ShowBrand = () => {
    const [brands, setBrands] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/brands/show');
                setBrands(response.data);
            } catch (error) {
                console.error("Error fetching brands:", error);
            }
        };
        
        fetchBrands();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/brands/delete/${id}`);
            setBrands(brands.filter((brand) => brand.id !== id));
            alert("Brand deleted successfully!");
        } catch (error) {
            console.error("Error deleting brand:", error);
            alert("Failed to delete brand. Please try again.");
        }
    };
    const handleViewProducts = (id) => {
        navigate(`/view_brand_product/${id}`);
    };
    const handleUpdate = (id) => {
        navigate(`/update_brand/${id}`);
    };

    return (
        <>
        <Admin />
        <div className='adminHero'>
            <button className="add-button" onClick={() => navigate('/add_brand')}>Add</button>
            <h2>Brands</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Brand Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {brands.map((brand) => (
                        <tr key={brand.id}>
                            <td>{brand.id}</td>
                            <td>{brand.name}</td>
                            <td>
                                <button className='edit-button' onClick={() => handleUpdate(brand.id)}>Update</button>
                                <button className='delete-button' onClick={() => handleDelete(brand.id)}>Delete</button>
                                <button className="view-button" onClick={() => handleViewProducts(brand.id)}>View Products</button> {/* Yeni düymə */}

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </>
    );
};

export default ShowBrand;
