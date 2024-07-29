import React, { useState } from 'react';
import Header from '../Pages/Header';
import ShopHero from './ShopHero';
import Footer from '../Pages/Footer';
import ProductPage from './ProductPage';
import CarbonAlarm from './CarbonAlarm'; //
import Smoke from './Smoke';
import ProductCategories from './ProductCategories';
import Detector from './Detector';
import SmartHome from './SmartHome';

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState('productPage'); 

  const renderContent = () => {
    switch (selectedCategory) {
      case 'carbonAlarm':
        return <CarbonAlarm />;
      case 'smoke':
        return <Smoke />;
        case 'detector':
        return <Detector />;
        case 'smartHome':
        return <SmartHome />;
      case 'productPage':
        
      default:
        return <ProductPage />;
    }
  };

  return (
    <div>
      <Header />
      <ShopHero />
      <div id='shop'>
        <div id='filterProduct'>
          <ProductCategories setSelectedCategory={setSelectedCategory} />
        </div>
        <div id="render">
          {renderContent()}
        </div>
      </div>
      <Footer />
    </div>
  );
}
