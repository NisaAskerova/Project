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
        categories: [],
        brands: [],
        tags: [],
    });
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [tags, setTags] = useState([]);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        // Fetch product details
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/products/show_product/${id}`);
                const product = response.data;

                setFormData({
                    title: product.title,
                    description: product.description,
                    price: product.price,
                    has_stock: product.has_stock === 1,
                    stock_quantity: product.stock_quantity,
                    image: null,
                    categories: product.categories.map(cat => cat.id),
                    brands: product.brands.map(brand => brand.id),
                    tags: product.tags.map(tag => tag.id),
                });
            } catch (error) {
                console.error('Error fetching product:', error);
                setMessage('Failed to fetch product details.');
            }
        };

        // Fetch categories, brands, and tags
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/categories/show');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        const fetchBrands = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/brands/show');
                setBrands(response.data);
            } catch (error) {
                console.error('Error fetching brands:', error);
            }
        };

        const fetchTags = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/tags/show');
                setTags(response.data);
            } catch (error) {
                console.error('Error fetching tags:', error);
            }
        };

        fetchProduct();
        fetchCategories();
        fetchBrands();
        fetchTags();
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
        data.append('categories', formData.categories);
        data.append('brands', formData.brands);
        data.append('tags', formData.tags);

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

                    <div>
                        <label>Categories:</label>
                        <select
                            name="categories"
                            multiple
                            value={formData.categories}
                            onChange={handleChange}
                        >
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label>Brands:</label>
                        <select
                            name="brands"
                            multiple
                            value={formData.brands}
                            onChange={handleChange}
                        >
                            {brands.map((brand) => (
                                <option key={brand.id} value={brand.id}>
                                    {brand.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label>Tags:</label>
                        <select
                            name="tags"
                            multiple
                            value={formData.tags}
                            onChange={handleChange}
                        >
                            {tags.map((tag) => (
                                <option key={tag.id} value={tag.id}>
                                    {tag.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button type="submit">Update Product</button>
                </form>
            </div>
        </>
    );
}

export default UpdateProduct;
