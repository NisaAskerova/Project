import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MyContext } from '../App';

export default function ProductPage() {
    const { setProducts, products } = useContext(MyContext);
    const [loading, setLoading] = useState(true);
    const [shot, setShot] = useState(true);
    const [filters, setFilters] = useState({ category: [], brand: [], price: 2000 });

    const fetchData = async () => {
        try {
            const response = await axios.get('/json/products.json');
            setProducts(response.data.products);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleFilterChange = (filterType, value) => {
        setFilters(prevFilters => {
            if (filterType === 'price') {
                return { ...prevFilters, [filterType]: value };
            }
            const isValueSelected = prevFilters[filterType].includes(value);
            const newFilterValues = isValueSelected
                ? prevFilters[filterType].filter(v => v !== value)
                : [...prevFilters[filterType], value];
            return { ...prevFilters, [filterType]: newFilterValues };
        });
    };

    const filteredProducts = products.filter(product => {
        const matchesCategory = filters.category.length === 0 || filters.category.includes(product.category);
        const matchesBrand = filters.brand.length === 0 || filters.brand.includes(product.brand);
        const matchesPrice = product.price <= filters.price;
        return matchesCategory && matchesBrand && matchesPrice;
    });

    const defaultDisplayProducts = filteredProducts.slice(0, 12);

    return (
        <div id='productPage'>
            <div className='filters'>
                <div className='filter-section'>
                    <h3>Categories</h3>
                    {['Carbon Alarm', 'Leakage Detector', 'Security System', 'Smart Home', 'Smoke Alarm'].map((category) => (
                        <div key={category}>
                            <input
                                type="radio"
                                id={category}
                                value={category}
                                name="radio"
                                onChange={() => handleFilterChange('category', category)}
                            />
                            <label htmlFor={category}>{category}</label>
                        </div>
                    ))}
                </div>
                <div className='filter-section'>
                    <h3>Brands</h3>
                    {['igloohome', 'HIK Vision', 'Ezvir', 'D-Link', 'Samsung', 'CP Plus'].map((brand) => (
                        <div key={brand}>
                            <input
                                type="radio"
                                id={brand}
                                value={brand}
                                name='radio'
                                onChange={() => handleFilterChange('brand', brand)}
                            />
                            <label htmlFor={brand}>{brand}</label>
                        </div>
                    ))}
                </div>
                <div className='filter-section'>
                    <h3>Price</h3>
                    <input
                        type="range"
                        min="0"
                        max="3000"
                        value={filters.price}
                        onChange={(e) => handleFilterChange('price', e.target.value)}
                    />
                    <span>Up to ${filters.price}</span>
                </div>
            </div>
            <div id='shopTitle'>
                <div>
                    <img src="grid.svg" alt="Grid" />
                    <img src="list.svg" alt="List" />
                    <span>Showing {defaultDisplayProducts.length} of {products.length} results</span>
                </div>
                <div onClick={() => setShot(!shot)}>
                    <span>Shot by latest</span>
                    <img src="down.svg" alt="" />
                </div>
            </div>
            <div style={{ height: shot ? "100%" : "0", overflow: "hidden" }} className='shopBoxes'>
                {loading ? (
                    <h2>YÜKLƏNİR...</h2>
                ) : defaultDisplayProducts && defaultDisplayProducts.length > 0 ? (
                    defaultDisplayProducts.map((product) => (
                        <div className='shopBox' key={product.id}>
                            <div className='imgDiv'><img src={product.image} alt={product.name} /></div>
                            <div>
                                <span className='same'>{product.brand}</span>
                                <h3>{product.name}</h3>
                                <span className='same'>{product.price}</span>
                            </div>
                            <div className='shopIcons'>
                                <div className='shopIcon'>
                                    <img src="star2.svg" alt="Star" />
                                </div>
                                <div className='shopIcon'>
                                    <img src="arrow.svg" alt="Arrow" />
                                </div>
                                <div className='shopIcon'>
                                    <Link to={`/product/${product.id}`}>
                                        <img src="eye.svg" alt="Eye" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <h2>Mehsul tapılmadı</h2>
                )}
            </div>
        </div>
    );
}
