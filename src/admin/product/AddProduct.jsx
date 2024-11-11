import React, { useState, useEffect } from 'react';
import Admin from '../Admin';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddProduct() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        has_stock: false,
        stock_quantity: 0,
        image: null,
        images: [],
        category_ids: [],
        brand_ids: [],
        tag_ids: [],
    });

    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [tags, setTags] = useState([]);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch categories, brands, and tags for select options
        const fetchOptions = async () => {
            try {
                const [categoriesRes, brandsRes, tagsRes] = await Promise.all([
                    axios.get('http://127.0.0.1:8000/api/categories/get'),
                    axios.get('http://127.0.0.1:8000/api/brands/show'),
                    axios.get('http://127.0.0.1:8000/api/tags/get'),
                ]);
                setCategories(categoriesRes.data);
                setBrands(brandsRes.data);
                setTags(tagsRes.data);
            } catch (error) {
                console.error('Error fetching options:', error);
                setMessage('Error loading categories, brands, or tags.');
            }
        };
        fetchOptions();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setFormData({
                ...formData,
                [name]: checked,
            });
        } else if (type === 'select-multiple') {
            const selectedValues = Array.from(e.target.selectedOptions, option => option.value);
            setFormData({
                ...formData,
                [name]: selectedValues,
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({
            ...formData,
            image: file ? file : null,
        });
    };

    const handleImagesChange = (e) => {
        const files = Array.from(e.target.files);
        setFormData({
            ...formData,
            images: files,
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

        // Log each field before appending to FormData
        console.log('Sending data:', {
            title: formData.title,
            description: formData.description,
            price: formData.price,
            has_stock: formData.has_stock,
            stock_quantity: formData.stock_quantity,
            category_ids: formData.category_ids,
            brand_ids: formData.brand_ids,
            tag_ids: formData.tag_ids,
        });

        formData.category_ids.forEach(id => {
            data.append('category_ids[]', id);
        });

        formData.brand_ids.forEach(id => {
            data.append('brand_ids[]', id);
        });

        formData.tag_ids.forEach(id => {
            data.append('tag_ids[]', id);
        });

        if (formData.image) {
            data.append('image', formData.image);
        }

        if (formData.images.length > 0) {
            formData.images.forEach(image => {
                data.append('images[]', image);
            });
        }

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/products/store', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Response:', response); // Log the full response to check what the backend returns

            if (response.status === 201) {
                setMessage('Product added successfully!');
                setFormData({
                    title: '',
                    description: '',
                    price: '',
                    has_stock: false,
                    stock_quantity: 0,
                    image: null,
                    images: [],
                    category_ids: [],
                    brand_ids: [],
                    tag_ids: [],
                });
                navigate('/show_product', { replace: true });
            } else {
                setMessage('Failed to add product.');
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
                <h2>Add New Product</h2>
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
                        <label>Categories:</label>
                        <select
                            name="category_ids"
                            multiple
                            value={formData.category_ids}
                            onChange={handleChange}
                            required
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
                            name="brand_ids"
                            multiple
                            value={formData.brand_ids}
                            onChange={handleChange}
                            required
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
                            name="tag_ids"
                            multiple
                            value={formData.tag_ids}
                            onChange={handleChange}
                            required
                        >
                            {tags.map((tag) => (
                                <option key={tag.id} value={tag.id}>
                                    {tag.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Single Image:</label>
                        <input
                            type="file"
                            name="image"
                            onChange={handleFileChange}
                            accept="image/*"
                        />
                    </div>
                    <div>
                        <label>Multiple Images:</label>
                        <input
                            type="file"
                            name="images"
                            onChange={handleImagesChange}
                            accept="image/*"
                            multiple
                        />
                    </div>
                    <button type="submit">Add Product</button>
                </form>
            </div>
        </>
    );
}

export default AddProduct;
