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
        images: [],
        category_ids: [],
        brand_ids: [],
        tag_ids: [],
    });

    const [previousProductData, setPreviousProductData] = useState(null);  // Add this to store the previous product data
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [tags, setTags] = useState([]);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const { id } = useParams(); // Product ID from the route

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

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/products/show_product/${id}`);
                const product = response.data;
    
                // Save the product data to compare later
                setPreviousProductData(product);
                
                setFormData({
                    title: product.title,
                    description: product.description,
                    price: product.price,
                    has_stock: product.has_stock,
                    stock_quantity: product.stock_quantity,
                    image: null, // You can implement logic to display the existing image, if needed
                    images: [], // You can display existing images if needed
                    category_ids: product.category_ids,
                    brand_ids: product.brand_ids,
                    tag_ids: product.tag_ids,
                });
            } catch (error) {
                console.error('Error fetching product:', error);
                setMessage(error.response ? error.response.data.message : 'Error fetching product data.');
            }
        };
        fetchProduct();
    }, [id]);

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
        
        // Əgər əvvəlki və cari məlumatlar eynidirsə, heç bir dəyişiklik edilməyib
        const hasChanges = Object.keys(formData).some(key => formData[key] !== previousProductData[key]);
    
        if (!hasChanges) {
            setMessage('No changes detected.');
            return;
        }
    
        // Yalnızca dəyişən sahələri göndərmək üçün yeni obyekt yaradırıq
        const updatedData = {};
        
        // Category IDs yoxlanır
        if (formData.category_ids && formData.category_ids.length > 0) {
            updatedData.category_ids = formData.category_ids;
        }
        
        // Brand IDs yoxlanır
        if (formData.brand_ids && formData.brand_ids.length > 0) {
            updatedData.brand_ids = formData.brand_ids;
        }
    
        // Tag IDs yoxlanır
        if (formData.tag_ids && formData.tag_ids.length > 0) {
            updatedData.tag_ids = formData.tag_ids;
        }
    
        // Digər sahələri yoxlamaq və əlavə etmək
        if (formData.name !== previousProductData.name) {
            updatedData.name = formData.name;
        }
        if (formData.price !== previousProductData.price) {
            updatedData.price = formData.price;
        }
        if (formData.description !== previousProductData.description) {
            updatedData.description = formData.description;
        }
    
        // Əgər heç bir dəyişiklik yoxdursa, məlumat göndərmə
        if (Object.keys(updatedData).length === 0) {
            setMessage('No changes detected.');
            return;
        }
    
        try {
            // API request göndərmək
            const response = await axios.post(`/api/products/${formData.id}`, updatedData);
    
            if (response.data.success) {
                setMessage('Product updated successfully!');
            } else {
                setMessage('Failed to update product.');
            }
        } catch (error) {
            setMessage('An error occurred while updating the product.');
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
                        />
                    </div>
                    <div>
                        <label>Description:</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Price:</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
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
                        >
                            {tags.map((tag) => (
                                <option key={tag.id} value={tag.id}>
                                    {tag.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Image:</label>
                        <input type="file" onChange={handleFileChange} />
                    </div>
                    <div>
                        <label>Additional Images:</label>
                        <input
                            type="file"
                            multiple
                            onChange={handleImagesChange}
                        />
                    </div>
                    <button type="submit">Update Product</button>
                </form>
            </div>
        </>
    );
}

export default UpdateProduct;
