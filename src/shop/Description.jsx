import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function Description() {
    const { id } = useParams();
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchDescription = async () => {
        try {
            const response = await axios.get('/json/products.json');
            const product = response.data.products.find(p => p.id === parseInt(id));
            setDescription(product ? product.description : 'Description not found');
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDescription();
    }, [id]);

    if (loading) return <div>Loading...</div>;

    return (
        <div className='description'>
           <p className='same'>{description}</p> 
        </div>
    );
}
