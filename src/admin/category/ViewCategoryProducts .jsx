import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Admin from '../Admin';

const ViewCategoryProducts = () => {
    const { id } = useParams();
    const [categoryProducts, setCategoryProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategoryProducts = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/categories/${id}/products`);
                setCategoryProducts(response.data);
            } catch (error) {
                console.error("Error fetching products for Category:", error);
                setError("Failed to load products for the specified Category.");
            }
        };

        fetchCategoryProducts();
    }, [id]);
    return (
        <>
            <Admin />
            <div className='adminHero'>
                <h2>Products for Category {id}</h2>
                {error && <p>{error}</p>}
                {categoryProducts.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categoryProducts.map((product) => (
                                <tr key={product.id}>
                                    <td>{product.title}</td>
                                    <td>{product.price}</td>
                                    <td>{product.description}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : !error ? (
                    <p>No products found for this category.</p>
                ) : null}
            </div>
        </>
    );
};

export default ViewCategoryProducts;
