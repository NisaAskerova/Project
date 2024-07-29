import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MyContext } from '../App';
import Filters from './Filters';

export default function ProductPage() {
    const { setProducts, products,
        selectedCategory, setSelectedCategory,
        selectedBrand, setSelectedBrand,
        priceRange, setPriceRange,
        selectedTags, setSelectedTags,
        filteredProducts, setFilteredProducts
    } = useContext(MyContext);
    const [loading, setLoading] = useState(true);
    const [shot, setShot] = useState(true);

    const fetchData = async () => {
        try {
            const response = await axios.get('/json/shopcamera.json');
            console.log(response.data.products);
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

    useEffect(() => {
        const filtered = products.filter(product => {
            const productPrice = parseFloat(product.price.replace('$', '').replace(',', ''));
            return (
                (!selectedCategory || product.category === selectedCategory) &&
                (!selectedBrand || product.brand === selectedBrand) &&
                (productPrice >= priceRange[0] && productPrice <= priceRange[1]) &&
                (selectedTags.length === 0 || selectedTags.every(tag => product.tags.includes(tag)))
            );
        });

        setFilteredProducts(filtered);
        console.log("Filtered Products:", filtered);
    }, [products, selectedCategory, selectedBrand, priceRange, selectedTags]);

    // Filtreleme fonksiyonları
    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    const handleBrandChange = (brand) => {
        setSelectedBrand(brand);
    };

    const handlePriceChange = (event) => {
        const value = event.target.value;
        setPriceRange([0, value]);
    };

    const handleTagChange = (tag) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter(t => t !== tag));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    return (
        <div id='productPage'>
            <Filters
                handleCategoryChange={handleCategoryChange}
                handleBrandChange={handleBrandChange}
                handlePriceChange={handlePriceChange}
                handleTagChange={handleTagChange}
                priceRange={priceRange}
            />
            <div id='shopTitle' style={{ float: 'right', width: '75%' }}>
                <div>
                    <img src="grid.svg" alt="Grid" />
                    <img src="list.svg" alt="List" />
                    <span>Showing 1–10 of {filteredProducts.length} results</span>
                </div>
                <div onClick={() => setShot(!shot)}>
                    <span>Shot by latest</span>
                    <img src="down.svg" alt="" />
                </div>
            </div>
            <div style={{ float: 'right', width: '75%', clear: 'both', height: shot ? "100%" : "0", overflow: "hidden" }} className='shopBoxes'>
                {loading ? (
                    <h2>YÜKLƏNİR...</h2>
                ) : filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <div className='shopBox' key={product.id}>
                            <div className='imgDiv'>
                                <img src={product.image} alt={product.name} />
                            </div>
                            <div>
                                <span className='same'>{product.brand}</span>
                                <h3>{product.name}</h3>
                                <span className='same'>{product.price}</span>
                            </div>
                            <div className='shopIcons'>
                                <div className='shopIcon'>
                                    <img src={product.star} alt="Star" />
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
