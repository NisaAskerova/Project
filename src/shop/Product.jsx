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

  // Token and user ID from localStorage
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('user_id');
  const headers = token ? { Authorization: `Bearer ${token}` } : {}; 

  // Add product to cart
  const addCart = async () => {
    if (!userId) {
      toast.error('User is not logged in');
      return;
    }
  
    if (!product?.id) {
      console.error('Product ID is missing');
      return;
    }
  
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/basket/store', {
        product_id: product.id,
        quantity: 1,
      }, { headers });
  
      setCart((prevCart) => [...prevCart, response.data.product]);
      toast.success('Product added to cart');
    } catch (error) {
      console.error('Error adding product to cart:', error);
      toast.error('Failed to add product to cart');
    }
  };
  

  // Fetch product data from API
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/products/show_product/${id}`, { headers });

      if (response.status === 200) {
        const apiProduct = response.data;
        const formattedProduct = {
          id: apiProduct.id,
          name: apiProduct.title,
          price: apiProduct.price,
          image: `http://localhost:8000/storage/${apiProduct.image}`,
          brand: apiProduct.brands?.[0]?.name || 'No Brand',
          categories: apiProduct.categories?.map((cat) => cat.name) || [],
          description: apiProduct.description,
          stock: apiProduct.has_stock,
          reviews: {
            rating: apiProduct.reviews?.[0]?.rating || 0,
            customerReviews: apiProduct.reviews || [],
          },
          ratings: apiProduct.ratings || [],
          social: apiProduct.social_links || [],
          SKU: apiProduct.sku || 'N/A',
          tags: apiProduct.tags || [],
          images: apiProduct.images || [],
        };

        setProduct(formattedProduct);
        setLoading(false);
      } else {
        throw new Error('Product not found');
      }
    } catch (err) {
      setLoading(false);
      console.error('Error fetching product:', err);
      toast.error('Failed to load product');
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  // Update quantity in cart
  const updateQuantity = async (productId, action) => {
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/basket/updateQuantity/${action}`, {
        product_id: productId,
      }, { headers });

      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      toast.error('Failed to update quantity');
    }
  };

  // Loading state or product not found
  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  const fullStars = Math.floor(product.averageRating);
  const hasHalfStar = product.averageRating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div>
      <div id='product'>
        <div id="leftProduct">
          <div id='bigImg'>
            <img src={product.image} alt={product.name} />
          </div>
          <div className="productImageBox">
            {product.images.map((image, index) => (
              <div className="fourImages" key={index}>
                <img src={`http://localhost:8000/storage/${image}`} alt={`Product image ${index + 1}`} />
              </div>
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
                <img key={i} src='/yellowStar.svg' alt="star" />
              ))}
              {hasHalfStar && <img src='/halfStar.svg' alt="half star" />}
              {Array.from({ length: emptyStars }).map((_, i) => (
                <img key={i} src='/emptyStar.svg' alt="empty star" />
              ))}
              <div>
                <span>{product.averageRating}</span>
                <span>({product.reviews.customerReviews.length} Reviews)</span>
              </div>
            </div>
          </div>
          <span className='productPrice'>${product.price}</span>
          <div className='productDescription'>
            <p className='same'>{product.description}...</p>
          </div>
          <table>
            <tbody>
              <tr>
                <td><h4>SKU</h4></td>
                <td>{product.SKU}</td>
              </tr>
              <tr>
                <td><h4>Categories</h4></td>
                <td>
                  {product.categories.length > 0 ? (
                    product.categories.map((category, index) => (
                      <span key={index}>
                        {category}
                        {index < product.categories.length - 1 && ', '}
                      </span>
                    ))
                  ) : (
                    <span>No categories</span>
                  )}
                </td>
              </tr>
              <tr>
                <td><h4>Tags</h4></td>
                <td>
                  {product.tags.length > 0 ? (
                    product.tags.map((tag, index) => (
                      <span key={index}>
                        {tag.name || tag}
                        {index < product.tags.length - 1 && ', '}
                      </span>
                      
                      
                    ))
                  ) : (
                    <span>No tags</span>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
          <div className='productButtons'>
            <div>
              <button 
                onClick={() => updateQuantity(product.id, 'decrease')} 
                disabled={!product.stock}
              >
                <img src="/minus.svg" alt="" />
              </button>
              <input 
                className='same' 
                type="text" 
                readOnly 
                value={localQuantity[id] || 1} 
              />
              <button 
                onClick={() => updateQuantity(product.id, 'increase')} 
                disabled={!product.stock}
              >
                <img src="/plus.svg" alt="" />
              </button>
            </div>
            <button className='addButton' onClick={addCart}>
              Add to Cart
            </button>
            <div className='favoriteButton'>
              <img src="/favory.svg" alt="" />
            </div>
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
      <Outlet context={{ product }} />
      </div>
    
  );
}
