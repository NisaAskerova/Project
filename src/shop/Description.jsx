import React, { useContext } from 'react';
import { useOutletContext } from 'react-router-dom';

export default function Description() {
  const { product } = useOutletContext();  // Access product data from the context

  if (!product) return <div>Product not found</div>;

  return (
    <div className='description'>
      <p className='same'>{product.description}</p>  {/* Directly use product's description */}
    </div>
  );
}
