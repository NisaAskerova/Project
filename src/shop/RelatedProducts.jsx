import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { MyContext } from '../App';
import { Link } from 'react-router-dom';

export default function RelatedProducts() {
    const { setProducts, products } = useContext(MyContext);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/products/show');
                const allProducts = response.data; 
               
              
                const shuffleProducts = (array) => {
                    for (let i = array.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1)); 
                        [array[i], array[j]] = [array[j], array[i]];
                    }
                    return array;
                };

                const shuffledProducts = shuffleProducts(allProducts).slice(0, 4);

            
                setProducts(shuffledProducts);
                localStorage.setItem('randomProducts', JSON.stringify(shuffledProducts));
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        // Check if random products are already stored in localStorage
        const storedProducts = localStorage.getItem('randomProducts');
        if (storedProducts) {
            // If found in localStorage, use them
            setProducts(JSON.parse(storedProducts));
        } else {
            // If not, fetch products
            fetchProducts();
        }
    }, [setProducts]);

    return (
        <div id="relatedProducts">
            <h2>Related Products</h2>
            <div className="products-grid">
                {products.length > 0 ? (
                    products.map(product => (
                        <Link to={`/product/${product.id}`} key={product.id}>
                            {/* { console.log(product)} */}
                            <div className="shopBox">
                                <div className='imgDiv'>
                                    <img src={`http://localhost:8000/storage/${product.image}`} alt={product.name} />
                                </div>
                                <div>
                                    <span className='same'>{product.brand}</span>
                                    <h3>{product.name}</h3>
                                    <span className='same'>${product.price}</span>
                                </div>
                                <div className='shopIcons'>
                                    <div className='shopIcon1'>
                                        <img src="/star2.svg" alt="Star" />
                                    </div>
                                    <div className='shopIcon1'>
                                        <img src="/arrow.svg" alt="Arrow" />
                                    </div>
                                    <div className='shopIcon1'>
                                        <img src="/eye.svg" alt="Eye" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p>No products available</p>
                )}
            </div>
        </div>
    );
}
