import React from 'react';

function Filters({ handleCategoryChange, handleBrandChange, handlePriceChange, handleTagChange, priceRange }) {
    return (
        <div id='filters' style={{ float: 'left', width: '25%' }}>
            <h2>Product Categories</h2>
            <div>
                <input type="radio" name='radio' onChange={() => handleCategoryChange("Carbon Alarm")} /> Carbon Alarm
                <input type="radio" name='radio' onChange={() => handleCategoryChange("Leakage Detector")} /> Leakage Detector
                <input type="radio" name='radio' onChange={() => handleCategoryChange("Security System")} /> Security System
                <input type="radio" name='radio' onChange={() => handleCategoryChange("Smart Home")} /> Smart Home
                <input type="radio" name='radio' onChange={() => handleCategoryChange("Smoke Alarm")} /> Smoke Alarm
            </div>
            <h2>Filter by Price</h2>
            <input type="range" min="0" max="2000" value={priceRange[1]} onChange={handlePriceChange} />
            <span>{priceRange[1]}</span>
            <h2>Filter by Brands</h2>
            <div>
                <input type="radio" name='radio' onChange={() => handleBrandChange("igloohome")} /> igloohome
                <input type="radio" name='radio' onChange={() => handleBrandChange("HIK Vision")} /> HIK Vision
                <input type="radio" name='radio' onChange={() => handleBrandChange("Ezvir")} /> Ezvir
                <input type="radio" name='radio' onChange={() => handleBrandChange("D-Link")} /> D-Link
                <input type="radio" name='radio' onChange={() => handleBrandChange("Samsung")} /> Samsung
                <input type="radio" name='radio' onChange={() => handleBrandChange("CP Plus")} /> CP Plus
            </div>
            <h2>Tags</h2>
            <div>
                <input type="radio" name='radio' onChange={() => handleTagChange("Camera")} /> Camera
                <input type="radio" name='radio' onChange={() => handleTagChange("Commercial")} /> Commercial
                <input type="radio" name='radio' onChange={() => handleTagChange("Home Security")} /> Home Security
                <input type="radio" name='radio' onChange={() => handleTagChange("Lens")} /> Lens
                <input type="radio" name='radio' onChange={() => handleTagChange("Commercial Security")} /> Commercial Security
            </div>
        </div>
    );
}

export default Filters;
