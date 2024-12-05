import React, { useState, useEffect, useContext } from 'react';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import axios from 'axios';
import { MyContext } from '../App';
import toast from 'react-hot-toast';

export default function Product() {
  const { cart, setCart, localQuantity, setLocalQuantity } = useContext(MyContext);
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Token and user ID from localStorage
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('user_id');
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  // Fetch product data from API
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/products/show_product/${id}`, { headers });
      if (response.status === 200) {
        const apiProduct = response.data;
        const ratings = apiProduct.ratings || [];
        const averageRating = apiProduct.average_rating 
        ? parseFloat(apiProduct.average_rating).toFixed(1) // Yalnız rəqəm olduğu zaman
        : "0.0"; // Əgər qiymət yoxdursa, default olaraq 0.0 qoy
  
        const formattedProduct = {
          id: apiProduct.id,
          name: apiProduct.title,
          price: apiProduct.price,
          image: `http://localhost:8000/storage/${apiProduct.image}`,
          brand: apiProduct.brands?.[0]?.name || 'No Brand',
          categories: apiProduct.categories?.map((cat) => cat.name) || [],
          description: apiProduct.description,
          stock: apiProduct.has_stock,
          stock_count: apiProduct.stock_quantity,
          reviews: {
            rating: averageRating,
            customerReviews: apiProduct.reviews || [],
          },
          ratings: apiProduct.ratings || [],
          social: apiProduct.social_links || [],
          SKU: apiProduct.sku || 'N/A',
          tags: apiProduct.tags || [],
          images: apiProduct.images || [],
        };
        setProduct(formattedProduct);
      } else {
        toast.error('Product not found');
      }
    } catch (err) {
      console.error('Error fetching product:', err);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, [id]);

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
      const response = await axios.post(
        'http://127.0.0.1:8000/api/basket/store',
        { product_id: product.id, quantity: 1 },
        { headers }
      );
      setCart((prevCart) => {
        const currentCart = Array.isArray(prevCart) ? prevCart : [];
        const productExists = currentCart.find((item) => item.id === product.id);

        if (productExists) {
          return currentCart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: (item.quantity || 0) + 1 }
              : item
          );
        }

        return [...currentCart, { ...response.data.product, quantity: 1 }];
      });
      toast.success('Product added to cart');
    } catch (error) {
      console.error('Error adding product to cart:', error);
      // toast.error('Failed to add product to cart');
    }
  };

  // Update quantity in cart
  const updateQuantity = async (productId, action) => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/basket/updateQuantity/${action}`,
        { product_id: productId },
        { headers }
      );

      if (response.data.success) {
        const updatedQuantity = response.data.basket_quantity;
        setLocalQuantity((prev) => ({
          ...prev,
          [productId]: updatedQuantity,
        }));

        setCart((prevCart) =>
          prevCart.map((item) =>
            item.id === productId
              ? { ...item, quantity: updatedQuantity }
              : item
          )
        );
        toast.success(response.data.message);
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      toast.error('Failed to update quantity');
      console.error('Error updating quantity:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  const fullStars = Math.floor(product.reviews.rating); // Tam ulduz sayı
  const hasHalfStar = product.reviews.rating % 1 !== 0; // Yarım ulduz olub-olmaması
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0); // Boş ulduzların sayı

  return (
    <div>
      <div id="product">
        <div id="leftProduct">
          <div id="bigImg">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="productImageBox">
            {product.images.map((image, index) => (
              <div className="fourImages" key={index}>
                <img
                  src={`http://localhost:8000/storage/${image}`}
                  alt={`Məhsul şəkli ${index + 1}`}
                />
              </div>
            ))}
          </div>
        </div>
        <div id="rightProduct">
          <div>
            <div id="stockDiv">
              {product.stock ? (
                <div className="greenDiv">
                  <span>Stokda mövcuddur</span>
                </div>
              ) : (
                <div className="redDiv">
                  <span>Stokda yoxdur</span>
                </div>
              )}
            </div>
            <span className="brand">{product.brand}</span>
            <h3 className="productName">{product.name}</h3>
            <div className="productRating">
              {Array.from({ length: fullStars }).map((_, i) => (
                <img key={i} src="/yellowStar.svg" alt="Full Star" />
              ))}
              {hasHalfStar && <img src="/halfStar.svg" alt="Half Star" />}
              {Array.from({ length: emptyStars }).map((_, i) => (
                <img key={i} src="/emptyStar.svg" alt="Empty Star" />
              ))}
              <div>
                <span>{product.reviews.rating}</span> {/* Ortalama reytinq */}
                <span>({product.reviews.customerReviews.length} Reviews)</span> {/* Ümumi rəylərin sayı */}
              </div>
            </div>
          </div>
          <span className="productPrice">{product.price} ₼</span>
          <div className="productDescription">
            <p className="same">{product.description}...</p>
          </div>
          <table>
            <tbody>
              <tr>
                <td>
                  <h4>SKU</h4>
                </td>
                <td>{product.SKU}</td>
              </tr>
              <tr>
                <td>
                  <h4>Kateqoriyalar</h4>
                </td>
                <td>
                  {product.categories.length > 0
                    ? product.categories.map((category, index) => (
                      <span key={index}>
                        {category}
                        {index < product.categories.length - 1 && ', '}
                      </span>
                    ))
                    : 'Kateqoriya yoxdur'}
                </td>
              </tr>
              <tr>
                <td>
                  <h4>Etiketlər</h4>
                </td>
                <td>
                  {product.tags.length > 0
                    ? product.tags.map((tag, index) => (
                      <span key={index}>
                        {tag.name || tag}
                        {index < product.tags.length - 1 && ', '}
                      </span>
                    ))
                    : 'Etiket yoxdur'}
                </td>
              </tr>
            </tbody>
          </table>
          <div className="productButtons">
            <div>
              <button
                onClick={() => updateQuantity(product.id, 'decrease')}
                disabled={!product.stock}
              >
                <img src="/minus.svg" alt="Azalt" />
              </button>

              <input
                type="text"
                readOnly
                value={localQuantity[product.id] || 0}
              />

              <button
                onClick={() => updateQuantity(product.id, 'increase')}
                disabled={!product.stock}
              >
                <img src="/plus.svg" alt="Artır" />
              </button>
            </div>
            <button className="addButton same" onClick={addCart}>
              Səbətə əlavə et
            </button>
            <div className="favoriteButton">
              <img src="/favory.svg" alt="Sevimlilər" />
            </div>
          </div>
        </div>
      </div>

      <div id="comments">
        <div>
          <NavLink
            to="description"
            className={({ isActive }) => (isActive ? 'active-link' : '')}
          >
            <span>Təsvir</span>
          </NavLink>
        </div>
        <div>
          <NavLink
            to="review"
            className={({ isActive }) => (isActive ? 'active-link' : '')}
          >
            <span>Rəylər</span>
          </NavLink>
        </div>
      </div>
      <Outlet context={{ product }} />
    </div>
  );

}