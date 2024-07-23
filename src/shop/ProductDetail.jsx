import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { MyContext } from '../App';

export default function ProductDetail() {
    const { products } = useContext(MyContext);
    const { id } = useParams();
    const product = products.find(p => p.id === parseInt(id));

    if (!product) {
        return <h2>Məhsul tapılmadı</h2>;
    }

    return (
        <div>
            <h1>{product.name}</h1>
            <img src={product.image} alt={product.name} />
            <p>{product.description}</p>
            <p>Price: {product.price}</p>
            <p>Brand: {product.brand}</p>
        </div>
    );
}
