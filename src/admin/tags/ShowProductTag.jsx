import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Admin from '../Admin';

const ShowProductTag = () => {
    const { id } = useParams();
    const [tagProducts, setTagProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTagProducts = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/tags/${id}/products`);
                console.log(response.data); // Serverdən gələn məlumatları yoxlayın
                setTagProducts(response.data);
            } catch (error) {
                console.error("Error fetching products for tag:", error);
                setError("Failed to load products for the specified tag.");
            }
        };

        fetchTagProducts();
    }, [id]);

    return (
        <>
            <Admin />
            <div className='adminHero'>
                <h2>Products for Tag {id}</h2>
                {error && <p>{error}</p>}
                {tagProducts.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Description</th>
                                {/* Digər sütunlar buraya əlavə edilə bilər */}
                            </tr>
                        </thead>
                        <tbody>
                            {tagProducts.map((product) => (
                                <tr key={product.id}>
                                    <td>{product.title}</td>
                                    <td>{product.price}</td>
                                    <td>{product.description}</td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                ) : !error ? (
                    <p>No products found for this tag.</p>
                ) : null}
            </div>
        </>
    );
};

export default ShowProductTag;
