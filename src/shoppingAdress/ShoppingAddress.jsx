import React, { useContext, useEffect } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import CheckoutCard from '../checkout/CheckoutCard';
import { MyContext } from '../App';

const ShoppingAddressPage = () => {
    const { activeStep, setActiveStep } = useContext(MyContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (activeStep === 'address') {
            navigate('address');
        } else if (activeStep === 'payment') {
            navigate('payment');
        } else if (activeStep === 'review') {
            navigate('review');
        }
    }, [activeStep, navigate]);

    return (
        <div id='shopAddress'>
            <h2 className='thick'>Shopping Cart</h2>
            <div className='address'>
                <div id='addressHero'>

                    <div className="right-page">
                        <Link
                            to="address"
                            className={`step ${activeStep === 'address' ? 'active' : ''}`}
                            onClick={() => setActiveStep('address')}
                        >
                            <div>
                                <div className="shopIcon"><img src="/home3.svg" alt="" />
                                </div>
                                <span className='same'>Address</span>
                            </div>
                        </Link>
                        <Link
                            to="payment"
                            className={`step ${activeStep === 'payment' ? 'active' : ''}`}
                            onClick={() => setActiveStep('payment')}
                        > 
                            <div className='stp'>
                                <div className='steps'>
                                    <div className='line'></div>
                                    <div className="shopIcon"><img src="/ecommers2.svg" alt="" /></div>
                                </div>
                                <span className='same'>Payment Method</span>
                            </div>
                        </Link>
                        <Link
                            to="review"
                            className={`step ${activeStep === 'review' ? 'active' : ''}`}
                            onClick={() => setActiveStep('review')}
                        >
                            <div className='stp'>
                                <div className='steps'>
                                    <div className='line2'></div>
                                    <div className="shopIcon"><img src="/editor.svg" alt="" /></div>
                                </div>
                                <span className='same'>Review</span>
                            </div>
                        </Link>
                    </div>
                    <div className="step-content">
                        <Outlet />
                    </div>
                </div>
                <div>
                    <CheckoutCard showButton={false} />
                </div>
            </div>
        </div>
    );
};

export default ShoppingAddressPage;
