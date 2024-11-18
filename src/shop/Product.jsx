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
      const response = await axios.get(`http://127.0.0.1:8000/api/products/show_product/${id}`);
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
          rating: apiProduct.reviews?.[0]?.rating || 0,  // Assuming the first rating is the overall rating.
          customerReviews: apiProduct.reviews || [],
        },
        ratings: apiProduct.ratings || [],
        sosial: apiProduct.social_links || [], 
        SKU: apiProduct.sku || 'N/A', 
        tags: apiProduct.tags || [], 
        images: apiProduct.images || [], 
      };

      // Calculate the average rating if ratings exist
      const totalRating = formattedProduct.ratings.reduce((acc, rating) => acc + rating.rating, 0);
      const averageRating = formattedProduct.ratings.length > 0 ? (totalRating / formattedProduct.ratings.length).toFixed(1) : 0;

      setProduct({ ...formattedProduct, averageRating });
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
              {hasHalfStar && <img src='/halfDtar.svg' alt="half star" />}
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
              <button onClick={() => decrementQuantity(id)} disabled={!product.stock}><img src="/minus.svg" alt="" /></button>
              <input className='same' type="text" readOnly value={localQuantity[id] || 1} />
              <button onClick={() => incrementQuantity(id)} disabled={!product.stock}><img src="/plus.svg" alt="" /></button>
            </div>
            <button className='addButton' onClick={() => addCart(product)}>Add to Cart</button>
            <div className='favoriteButton'>
              <img src="/favory.svg" alt="" />
            </div>
          </div>
          <div id='shereMedia'>
            <h3 id='shere'>Share</h3>
            
              <div className='media' >
                <div><img src='/face.svg' alt="Facebook" /></div>
                <div> <img src='/instagram.svg' alt="Instagram" /></div>
                <div> <img src='/twitter.svg' alt="Twitter" /></div>
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
