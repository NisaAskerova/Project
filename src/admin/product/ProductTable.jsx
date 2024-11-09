import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Admin from '../Admin';

function ProductTable() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:8000/api/products/show')
            .then((response) => response.json())
            .then((data) => {
                setProducts(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    const deleteProduct = (id) => {
        fetch(`http://localhost:8000/api/products/delete/${id}`, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then((data) => {
                alert(data.message);
                setProducts(products.filter((product) => product.id !== id)); // Silinən məhsul cədvəldən silinir
            })
            .catch((error) => console.error('Error deleting product:', error));
    };

    return (
        <>
            <Admin />
            <div className='adminHero'>
                <button className="add-button" onClick={() => navigate('/add_product')}>Add</button>
                <h2>Product List</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>SKU</th>
                            <th>Image</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td>{product.title}</td>
                                <td>{product.description}</td>
                                <td>${product.price}</td>
                                <td>{product.has_stock ? 'In Stock' : 'Out of Stock'}</td>
                                <td>{product.sku}</td>
                                <td>
                                    {product.image ? (
                                        <img
                                            src={`http://localhost:8000/storage/${product.image}`}
                                            alt={product.title}
                                            width="100"
                                        />
                                    ) : (
                                        <p>No image</p>
                                    )}
                                </td>
                                <td>
                                    <button className="edit-button" onClick={() => navigate(`/update_product/${product.id}`)}>Edit</button>
                                    <button className="delete-button" onClick={() => deleteProduct(product.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default ProductTable;
