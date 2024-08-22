import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MyContext } from '../App';

export default function ProductPage() {
    const { setProducts, products } = useContext(MyContext);
    const [loading, setLoading] = useState(true);
    const [shot, setShot] = useState(true);
    const [shot2, setShot2] = useState(true);
    const [shot3, setShot3] = useState(true);
    const [filters, setFilters] = useState({ category: [], brand: [], minPrice: 0, maxPrice: 2000 });
    const [categoryCounts, setCategoryCounts] = useState({});
    const [brandCounts, setBrandCounts] = useState({});

    const fetchData = async () => {
        try {
            const response = await axios.get('/json/products.json');
            const productsWithQuantity = response.data.products.map(product => ({
                ...product,
                quantity: 1 
            }));
            setProducts(productsWithQuantity);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const calculateCounts = () => {
            const categoryCounts = {};
            const brandCounts = {};

            products.forEach(product => {
                if (categoryCounts[product.category]) {
                    categoryCounts[product.category]++;
                } else {
                    categoryCounts[product.category] = 1;
                }

                if (brandCounts[product.brand]) {
                    brandCounts[product.brand]++;
                } else {
                    brandCounts[product.brand] = 1;
                }
            });

            setCategoryCounts(categoryCounts);
            setBrandCounts(brandCounts);
        };

        calculateCounts();
    }, [products]);

    const handleFilterChange = (filterType, value) => {
        setFilters(prevFilters => {
            const newFilters = { ...prevFilters };
            newFilters[filterType] = value;
            return newFilters;
        });
    };

    const filteredProducts = products.filter(product => {
        const matchesCategory = filters.category.length === 0 || filters.category.includes(product.category);
        const matchesBrand = filters.brand.length === 0 || filters.brand.includes(product.brand);
        const matchesPrice = product.price >= filters.minPrice && product.price <= filters.maxPrice;
        return matchesCategory && matchesBrand && matchesPrice;
    });

    const defaultDisplayProducts = filteredProducts.slice(0, 12);

    return (
        <div id='productPage'>
            <div className='filterProduct'>
                <div className='filter-section'>
                    <div className='filterTitle ' onClick={() => setShot(!shot)}>
                        <h3>Categories</h3>
                        <img src="down.svg" alt="" />
                    </div>
                    {['Carbon Alarm', 'Leakage Detector', 'Security System', 'Smart Home', 'Smoke Alarm'].map((category) => (
                        <div key={category} style={{ height: shot ? "100%" : "0", overflow: "hidden" }} className='filterCatecory'>
                            <div>
                                <input type="radio" id={category} value={category} name="category" onChange={() => handleFilterChange('category', category)} />
                                <label className='filterLabel' htmlFor={category}>{category}</label>
                            </div>
                            <span>({categoryCounts[category] || 0})</span>
                        </div>
                    ))}
               
                    <div className='filterTitle ft' onClick={() => setShot2(!shot2)} >
                        <h3>Price</h3>
                        <img src="down.svg" alt="" />
                    </div>
                    <div style={{ height: shot2 ? "100%" : "0", overflow: "hidden" }} className='filterCatecory filterRange'>
                        <span>Price: ${filters.minPrice} - ${filters.maxPrice}</span>
                        <div className="priceRange">
                            <input
                                type="range"
                                min="0"
                                max="2000"
                                value={filters.minPrice}
                                onChange={(e) => handleFilterChange('minPrice', parseInt(e.target.value))}
                                className="thumb thumb--left"
                                style={{ zIndex: filters.minPrice > 2000 - 100 ? '5' : 'auto' }}
                            />
                            <input
                                type="range"
                                min="0"
                                max="2000"
                                value={filters.maxPrice}
                                onChange={(e) => handleFilterChange('maxPrice', parseInt(e.target.value))}
                                className="thumb thumb--right"
                            />
                        </div>
                    </div>
               
                    <div className='filterTitle ft' onClick={() => setShot3(!shot3)}>
                        <h3>Brands</h3>
                        <img src="down.svg" alt="" />
                    </div>
                    {['Igloohome', 'HIK Vision', 'Ezvir', 'D-Link', 'Samsung', 'CP Plus'].map((brand) => (
                        <div style={{ height: shot3 ? "100%" : "0", overflow: "hidden" }} key={brand} className='filterCatecory'>
                            <div>
                                <input type="radio" id={brand} value={brand} name='brand' onChange={() => handleFilterChange('brand', brand)} />
                                <label className='filterLabel' htmlFor={brand}>{brand}</label>
                            </div>
                            <span>({brandCounts[brand] || 0})</span>
                        </div>
                    ))}
                </div>
            </div>
            <div id='products'>
                <div id='shopTitle'>
                    <div>
                        <img src="grid.svg" alt="Grid" />
                        <img src="list.svg" alt="List" />
                        <span>Showing {defaultDisplayProducts.length} of {products.length} results</span>
                    </div>
                    <div>
                        <span>Shot by latest</span>
                        <img src="down.svg" alt="" />
                    </div>
                </div>
                <div className='shopBoxes'>
                    {loading ? (
                        <h2>YÜKLƏNİR...</h2>
                    ) : defaultDisplayProducts.length > 0 ? (
                        defaultDisplayProducts.map((product) => (
                            <div className='shopBox' key={product.id}>
                                <div className='imgDiv'><img src={product.image} alt={product.name} /></div>
                                <div>
                                    <span className='same'>{product.brand}</span>
                                    <h3>{product.name}</h3>
                                    <span className='same'>{product.price}</span>
                                </div>
                                <div className='shopIcons'>
                                    <div className='shopIcon1'>
                                        <img src="/star2.svg" alt="Star" />
                                    </div>
                                    <div className='shopIcon1'>
                                        <img src="/arrow.svg" alt="Arrow" />
                                    </div>
                                    <div className='shopIcon1'>
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
        </div>
    );
}
