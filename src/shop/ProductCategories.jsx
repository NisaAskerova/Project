import React, { useState } from 'react';
export default function ProductCategories({ setSelectedCategory }) {
    const upImg = 'up.svg';
    const downImg = 'down.svg';
    const [image, setImage] = useState(upImg);
    const [isOpen, setIsOpen] = useState(false);

    const toggleImage = () => {
        setImage((prevImg) =>
            prevImg === upImg ? downImg : upImg
        );
        setIsOpen((prevIsOpen) => !prevIsOpen);
    };

    return (
        <div id='ProductCategories'>
            <div className='cotegoriesTitle' onClick={toggleImage}>
                <h3>Product Categories</h3>
                <img src={image} alt="Toggle" />
            </div>
            {isOpen && (
                <div className='categories'>
                    <div className='category'>
                        <div>
                            <input type="radio" id="check0" name='radio' onChange={() => setSelectedCategory('carbonAlarm')} />
                            <label htmlFor="check0">Carbon Alarm</label>
                        </div>
                        <div>
                        <span>(0)</span>
                        </div>
                    </div>
                    <div className='category'>
                        <div>
                            <input type="radio" id="check1" name='radio' onChange={() => setSelectedCategory('detector')} />
                            <label htmlFor="check1">Leakage Detector</label>
                        </div>
                        <div>
                            <span>(0)</span>
                        </div>
                    </div>
                    <div className='category'>
                        <div>
                            <input type="radio" id="check2" name='radio' onChange={() => setSelectedCategory('securitySystem')} />
                            <label htmlFor="check2">Security System</label>
                        </div>
                        <div>
                            <span>(0)</span>
                        </div>
                    </div>
                    <div className='category'>
                        <div>
                            <input type="radio" id="check3" name='radio' onChange={() => setSelectedCategory('smartHome')} />
                            <label htmlFor="check3">Smart Home</label>
                        </div>
                        <div>
                            <span>(0)</span>
                        </div>
                    </div>
                    <div className='category'>
                        <div>
                            <input type="radio" id="check4" name='radio' onChange={() => setSelectedCategory('smoke')} />
                            <label htmlFor="check4">Smoke Alarm</label>
                        </div>
                        <div>
                            <span>(0)</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
