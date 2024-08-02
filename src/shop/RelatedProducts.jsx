import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { MyContext } from '../App';
import { Link } from 'react-router-dom';


export default function RelatedProducts() {
    const { setProducts, products } = useContext(MyContext);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/json/products.json');
                const allProducts = response.data.products;
                // Filtrele ve sadece id'si 46 ile 50 arasında olan ürünleri al
                const filteredProducts = allProducts.filter(product => product.id >= 46 && product.id <= 49);
                setProducts(filteredProducts);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [setProducts]);

    return (
        <div id="relatedProducts">
            <h2>Filtered Products </h2>
            <div className="products-grid">
                {products.map(product => (
                    <div key={product.id} className="shopBox">
                          <div className='imgDiv'><img src={product.image} alt={product.name} /></div>
                                <div>
                                    <span className='same'>{product.brand}</span>
                                    <h3>{product.name}</h3>
                                    <span className='same'>{product.price}</span>
                                </div>
                                <div className='shopIcons'>
                                    <div className='shopIcon'>
                                        <img src="/star2.svg" alt="Star" />
                                    </div>
                                    <div className='shopIcon'>
                                        <img src="/arrow.svg" alt="Arrow" />
                                    </div>
                                    <div className='shopIcon'>
                                        <Link to={`/product/${product.id}`}>
                                            <img src="/eye.svg" alt="Eye" />
                                        </Link>
                                    </div>
                                </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
