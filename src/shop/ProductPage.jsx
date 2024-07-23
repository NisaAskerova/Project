import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MyContext } from '../App';

export default function ProductPage() {
    const { setProduct, products } = useContext(MyContext);
    const [loading, setLoading] = useState(true);
    const [shot, setShot] = useState(true);

    const fetchData = async () => {
        try {
            const response = await axios.get('/json/shopcamera.json');
            console.log(response.data.products);
            setProduct(response.data.products);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div id='productPage'>
            <div id='shopTitle'>
                <div >
                    <img src="grid.svg" alt="Grid" />
                    <img src="list.svg" alt="List" />
                    <span>Showing 1–10 of 60 results</span>
                </div>
                <div onClick={() => setShot(!shot)}>
                    <span>Shot by latest</span>
                    <img src="down.svg" alt="" />
                </div>
            </div>
            <div style={{ height: shot ? "100%" : "0", overflow: "hidden" }} className='shopBoxes'>
                {loading ? (
                    <h2>YÜKLƏNİR...</h2>
                ) : products && products.length > 0 ? (
                    products.map((product) => (
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
