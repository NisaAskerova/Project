import React, { useState, useEffect } from 'react';
import Admin from '../Admin';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function UpdateProduct() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        has_stock: false,
        stock_quantity: 0,
        image: null,
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.post(`http://127.0.0.1:8000/api/products/update/${id}`);
                const product = response.data;

                setFormData({
                    title: product.title,
                    description: product.description,
                    price: product.price,
                    has_stock: product.has_stock === 1,
                    stock_quantity: product.stock_quantity,
                    image: null,
                });
            } catch (error) {
                console.error('Error fetching product:', error);
                setMessage('Failed to fetch product details.');
            }
        };

        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({
            ...formData,
            image: file ? file : null,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('price', formData.price);
        data.append('has_stock', formData.has_stock ? '1' : '0');
        data.append('stock_quantity', formData.has_stock ? formData.stock_quantity : 0);

        if (formData.image) {
            data.append('image', formData.image);
        }

        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/products/update/${id}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                setMessage('Product updated successfully!');
                navigate('/show_product', { replace: true });
            } else {
                setMessage('Failed to update product.');
            }
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
            setMessage(error.response && error.response.data.message
                ? error.response.data.message
                : 'An unexpected error occurred.');
        }
    };

    return (
        <>
            <Admin />
            <div className='adminHero'>
                <h2>Update Product</h2>
                {message && <p>{message}</p>}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Title:</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Description:</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Price:</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                            step="0.01"
                        />
                    </div>
                    <div>
                        <label>Has Stock:</label>
                        <input
                            type="checkbox"
                            name="has_stock"
                            checked={formData.has_stock}
                            onChange={handleChange}
                        />
                    </div>
                    {formData.has_stock && (
                        <div>
                            <label>Stock Quantity:</label>
                            <input
                                type="number"
                                name="stock_quantity"
                                value={formData.stock_quantity}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    )}
                    <div>
                        <label>Image:</label>
                        <input
                            type="file"
                            name="image"
                            onChange={handleFileChange}
                            accept="image/*"
                        />
                    </div>
                    <button type="submit">Update Product</button>
                </form>
            </div>
        </>
    );
}

export default UpdateProduct;
