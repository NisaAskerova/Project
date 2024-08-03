import React, { useContext } from 'react';
import { MyContext } from '../App';

export default function Card() {
    const { setVisibleCard, cart, setCart, localQuantity } = useContext(MyContext);

    const removeProduct = (id) => {
        setCart(cart.filter((e) => e.id !== id)); // Məhsulu silin
    };

    return (
        <div id='cardWrapper'>
            <div id='card'>
                <div id='productsCard'>
                    <span className='same'>You have <h3>{cart.length} items</h3> in your cart</span>
                    {cart.map((product) => (
                        <div id='cardProducts' key={product.id}>
                            <div className='cardBox'>
                                <div className='cardImgDiv'><img src={product.image} alt="" /></div>
                                <div className='cardInfo'>
                                    <span>{product.name}</span>
                                    <strong>{product.price}</strong>
                                    <div>
                                        <span>QTY: {localQuantity}</span>
                                        <div className='deleteIcon' onClick={() => removeProduct(product.id)}>
                                            <img src="/delete.svg" alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div id='cartBottom'> 
                    <div>
                        <span>Subtotal</span>
                        <span>${cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</span>
                    </div>
                    <button className='same' onClick={() => setVisibleCard(false)}>View Cart</button>
                    <button className='same'>Checkout</button>
                </div>
            </div>
        </div>
    );
}
