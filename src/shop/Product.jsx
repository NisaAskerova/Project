import React, { useState, useEffect, useContext } from 'react';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import axios from 'axios';
import { MyContext } from '../App';
import toast from 'react-hot-toast'; 

export default function Product() {
  const { cart, setCart, localQuantity, incrementQuantity, decrementQuantity, setLocalQuantity } = useContext(MyContext);
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const addCart = (product) => {
    if (!product.stock) {
      toast.error('Product is out of stock');
      return;
    }
  
    const existingProduct = cart.find((prd) => prd.id === product.id);
    if (existingProduct) {
      toast.error('Product is already in the cart'); 
      return; 
    } else {
      setCart([...cart, { ...product, quantity: localQuantity[id] || 1 }]);
      toast.success('Product added to cart');
    }
  };
  

  const fetchData = async () => {
    try {
      const response = await axios.get('/json/products.json');
      const product = response.data.products.find(p => p.id === parseInt(id));
      setProduct(product);
      setLocalQuantity(id, 1); 
    } catch (error) {
      console.error(error);
      toast.error('Failed to load product'); 
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
    <div>
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
        </div>

        <div id="rightProduct">
          <div>
            <div id='stockDiv'>
              {product.stock ? (
                <div className='greenDiv'><span>In Stock</span></div>
              ) : (
                <div className='redDiv'><span>Out Of Stock</span></div>
              )}
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
          <div className='productDescription'>
            <p className='same'>{product.description.slice(0, 200)}...</p>
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
          <div className='productButtons'>
            <div>
              <button onClick={() => decrementQuantity(id)} disabled={!product.stock}><img src="/minus.svg" alt="" /></button>
              <input className='same' type="text" readOnly value={localQuantity[id] || 1} />
              <button onClick={() => incrementQuantity(id)} disabled={!product.stock}><img src="/plus.svg" alt="" /></button>
            </div>
            <button className='addButton' disabled={!product.stock} onClick={() => addCart(product)}>Add to Cart</button>
            <div className='favoriteButton'>
              <img src="/favory.svg" alt="" />
            </div>
          </div>
          <div id='shereMedia'>
            <h3 id='shere'>Share</h3>
            {product.sosial?.map((e, i) => (
              <div className='media' key={i}>
                <div>{e.facebook && <img src={e.facebook} alt="Facebook" />}</div>
                <div>{e.instagram && <img src={e.instagram} alt="Instagram" />}</div>
                <div>{e.twitter && <img src={e.twitter} alt="Twitter" />}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div id='comments'>
        <div>
          <NavLink to="description" className={({ isActive }) => (isActive ? 'active-link' : '')}>
            <span>Description</span>
          </NavLink>
        </div>
        <div>
          <NavLink to="review" className={({ isActive }) => (isActive ? 'active-link' : '')}>
            <span>Review</span>
          </NavLink>
        </div>
      </div>

      <Outlet />
    </div>
  );
}
