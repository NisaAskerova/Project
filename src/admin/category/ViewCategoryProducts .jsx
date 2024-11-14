import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Admin from '../Admin';

const ViewCategoryProducts = () => {
    const { id } = useParams(); // Get category ID from the URL
    const [categoryProducts, setCategoryProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategoryProducts = async () => {
            try {
                // Adjusted to fetch category and its products from the correct API endpoint
                const response = await axios.get(`http://127.0.0.1:8000/api/category/${id}/products`);
                console.log('API Response:', response.data);  // Check the API response in console
                // Assuming the response data includes the category and its products
                setCategoryProducts(response.data.products);  // Extracting products from the response
            } catch (error) {
                console.error("Error fetching products for category:", error);
                setError("Failed to load products for the specified category.");
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
                                {/* Additional columns can be added here */}
                            </tr>
                        </thead>
                        <tbody>
                            {categoryProducts.map((product) => (
                                <tr key={product.id}>
                                    <td>{product.name}</td>
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
