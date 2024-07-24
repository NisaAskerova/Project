import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function Product() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const response = await axios.get('/json/shopcamera.json');
            const product = response.data.products.find(p => p.id === parseInt(id));
            setProduct(product);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (!product) return <div>Product not found</div>;

    const fullStars = Math.floor(product.review.rating);
    const hasHalfStar = product.review.rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
        <div id='product'>
            <div id="leftProduct">
                <div id='bigImg'>
                    <img src={product.image} alt={product.name} />
                </div>
                <div className='productImageBox'>
                    {product.images.map((e, index) => (
                        <div className='fourImages' key={index}><img src={e} alt="" /></div>
                    ))}
                </div>
            </div >
            <div id="rightProduct">
                <div>
                    <div id='stockDiv'>
                        {product.stock ? (
                            <div className='greenDiv'><span>In Stock</span></div>
                        ) : <div className='redDiv'><span>Out Of Stock</span></div>}
                    </div>
                    <span className='brand'>{product.brand}</span>
                    <h3 className='productName'>{product.name}</h3>
                    <div className='productRating'>
                        {Array.from({ length: fullStars }).map((_, i) => (
                            <img key={i} src={product.star} alt="star" />
                        ))}
                        {hasHalfStar && <img src={product.halfStar} alt="half star" />}
                        {Array.from({ length: emptyStars }).map((_, i) => (
                            <img key={i} src={product.emptyStar} alt="empty star" />
                        ))}
                        <div>
                        <span>{product.review.rating}</span>
                        <span>({product.customerReviews.length} Reviews)</span>
                        </div>
                    </div>
                </div>
                <span className='productPrice'>{product.price}</span>
                <div>
                    <p className='same'>{product.description}</p>
                </div>
                <table>
                    <tbody>
                        <tr>
                            <td><h4>SKU</h4></td>
                            <td>{product.SKU}</td>
                        </tr>
                        <tr>
                            <td><h4>Categories</h4></td>
                            <td>{product.categories.join(', ')}</td>
                        </tr>
                        <tr>
                            <td><h4>Tags</h4></td>
                            <td>{product.tags.join(', ')}</td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <div>
                        <button disabled={!product.stock}>-</button>
                        <input type="text" readOnly value={1} />
                        <button disabled={!product.stock}>+</button>
                    </div>
                    <button disabled={!product.stock}>Add to Cart</button>
                    <img src="/favory.svg" alt="" />
                </div>
                <div>
                    {product.sosial?.map((e, i) => (
                        <div key={i}>
                            {e.facebook && <img src={e.facebook} alt="Facebook" />}
                            {e.instagram && <img src={e.instagram} alt="Instagram" />}
                            {e.twitter && <img src={e.twitter} alt="Twitter" />}
                        </div>
                    ))}
                </div>
            </div>

        </div >
    );
}
