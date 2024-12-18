import React, { useContext, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { MyContext } from '../App';
import toast from 'react-hot-toast';

export default function ProductPage() {
    const { setProducts, products } = useContext(MyContext);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        category: '',
        brand: '',
        minPrice: 0,
        maxPrice: 2000,
        hasStock: true,
        tags: [],
    });
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [categoryCounts, setCategoryCounts] = useState({});
    const [brandCounts, setBrandCounts] = useState({});
    const [shot, setShot] = useState(false);
    const [shot2, setShot2] = useState(false);
    const [shot3, setShot3] = useState(false);
    const [shot4, setShot4] = useState(false);
    const [tags, setTags] = useState([]);
    const [favorites, setFavorites] = useState([]);  // State for favorites
    const navigate = useNavigate(); // Hook to navigate to different routes
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/products/filter', {
                params: filters,
            });
            setProducts(response.data.products);

            const uniqueCategories = [
                ...new Set(response.data.products.flatMap((p) => p.categories.map((c) => c.name))),
            ];
            const uniqueBrands = [
                ...new Set(response.data.products.flatMap((p) => p.brands.map((b) => b.name))),
            ];
            const uniqueTags = [
                ...new Set(response.data.products.flatMap((p) => p.tags.map((t) => t.name))),
            ];

            setCategories(uniqueCategories);
            setBrands(uniqueBrands);
            setTags(uniqueTags);

            const newCategoryCounts = uniqueCategories.reduce((acc, category) => {
                acc[category] = response.data.products.filter((product) =>
                    product.categories.some((c) => c.name === category)
                ).length;
                return acc;
            }, {});

            const newBrandCounts = uniqueBrands.reduce((acc, brand) => {
                acc[brand] = response.data.products.filter((product) =>
                    product.brands.some((b) => b.name === brand)
                ).length;
                return acc;
            }, {});

            setCategoryCounts(newCategoryCounts);
            setBrandCounts(newBrandCounts);
        } catch (error) {
            console.error('Məlumat alınarkən xəta baş verdi:', error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch favorite products
    const fetchFavorites = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/favorites/get_favoritId', { headers });
            if (response.status === 200) {
                setFavorites(response.data); // Store the favorite product IDs
            }
        } catch (err) {
            console.error('Error fetching favorites:', err);
        }
    };

    useEffect(() => {
        fetchData();
        fetchFavorites(); // Fetch favorite products when the page loads
    }, [filters]);

    const handleFilterChange = (filterType, value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [filterType]: value,
        }));
    };

    // Handle tag click for filtering
    const handleTagClick = (tag) => {
        setFilters((prevFilters) => {
            const newTags = prevFilters.tags.includes(tag)
                ? prevFilters.tags.filter((t) => t !== tag)
                : [...prevFilters.tags, tag];
            return { ...prevFilters, tags: newTags };
        });
    };

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const matchesCategory =
                !filters.category || product.categories.some((c) => c.name === filters.category);
            const matchesBrand =
                !filters.brand || product.brands.some((b) => b.name === filters.brand);
            const matchesPrice =
                parseFloat(product.price) >= filters.minPrice &&
                parseFloat(product.price) <= filters.maxPrice;
            const matchesStock = filters.hasStock ? product.has_stock : true;
            const matchesTags =
                filters.tags.length === 0 || filters.tags.every((tag) =>
                    product.tags.some((t) => t.name === tag)
                );

            return matchesCategory && matchesBrand && matchesPrice && matchesStock && matchesTags;
        });
    }, [filters, products]);

    const defaultDisplayProducts = filteredProducts.slice(0, 12);

    const handleFavoriteClick = async (productId, e, isFavorite) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            const response = isFavorite
                ? await axios.delete(`http://127.0.0.1:8000/api/favorites/${productId}`, { headers })
                : await axios.post(`http://127.0.0.1:8000/api/favorites/add_favorite/${productId}`, {}, { headers });

            if (response.status === 200) {
                toast.success(
                    isFavorite ? 'Product removed from favorites' : 'Product added to favorites'
                );
                fetchFavorites();  // Refresh favorite list
            }
        } catch (error) {
            console.error('Error occurred:', error);
            toast.error('An error occurred');
        }
    };

    return (
        <div id="productPage">
            <div className='filterProduct'>
                <div className='filter-section'>
                    {/* Kateqoriyalar Filtri */}
                    <div className='filterTitle' onClick={() => setShot(!shot)}>
                        <h3>Kateqoriyalar</h3>
                        <img src="down.svg" alt="Aç/Söndür" />
                    </div>
                    {categories.map((category) => (
                        <div key={category} style={{ height: shot ? "100%" : "0", overflow: "hidden" }} className='filterCatecory'>
                            <div>
                                <input type="radio" id={category} value={category} name="category" onChange={() => handleFilterChange('category', category)} />
                                <label className='filterLabel' htmlFor={category}>{category}</label>
                            </div>
                            <span>({categoryCounts[category] || 0})</span>
                        </div>
                    ))}

                    {/* Qiymət Filtri */}
                    <div className='filterTitle ft' onClick={() => setShot2(!shot2)}>
                        <h3>Qiymət</h3>
                        <img src="down.svg" alt="Aç/Söndür" />
                    </div>
                    <div style={{ height: shot2 ? "100%" : "0", overflow: "hidden" }} className='filterCatecory filterRange'>
                        <span>Qiymət: ${filters.minPrice} - ${filters.maxPrice}</span>
                        <div className="priceRange">
                            <input
                                type="range"
                                min="0"
                                max="2000"
                                value={filters.minPrice}
                                onChange={(e) => handleFilterChange('minPrice', parseInt(e.target.value))}
                                className="thumb thumb--left"
                                style={{ zIndex: filters.minPrice > 2000 - 100 ? '5' : 'auto' }}
                            />
                            <input
                                type="range"
                                min="0"
                                max="2000"
                                value={filters.maxPrice}
                                onChange={(e) => handleFilterChange('maxPrice', parseInt(e.target.value))}
                                className="thumb thumb--right"
                            />
                        </div>
                    </div>

                    {/* Brendlər Filtri */}
                    <div className='filterTitle ft' onClick={() => setShot3(!shot3)}>
                        <h3>Brendlər</h3>
                        <img src="down.svg" alt="Aç/Söndür" />
                    </div>
                    {brands.map((brand) => (
                        <div style={{ height: shot3 ? "100%" : "0", overflow: "hidden" }} key={brand} className='filterCatecory'>
                            <div>
                                <input type="radio" id={brand} value={brand} name='brand' onChange={() => handleFilterChange('brand', brand)} />
                                <label className='filterLabel' htmlFor={brand}>{brand}</label>
                            </div>
                            <span>({brandCounts[brand] || 0})</span>
                        </div>
                    ))}

                    {/* Taglər Filtri */}
                    <div className='filterTitle ft' onClick={() => setShot4(!shot4)}>
                        <h3>Taglər</h3>
                        <img src="down.svg" alt="Aç/Söndür" />
                    </div>
                    <div style={{ height: shot4 ? "100%" : "0", overflow: "hidden" }} className='tagCategory'>
                        {tags.map((tag) => (
                            <button
                                key={tag}
                                className={`tagButton same ${filters.tags.includes(tag) ? 'selected' : ''}`}
                                onClick={() => handleTagClick(tag)}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div id="products">
                <div className="shopBoxes">
                    {loading ? (
                        <div className="loadingDiv"><img src="/loading.gif" alt="" /></div>
                    ) : defaultDisplayProducts.length > 0 ? (
                        defaultDisplayProducts.map((product) => (
                            <Link to={`/product/${product.id}`} key={product.id}>
                                <div className="shopBox">
                                    <div className="imgDiv">
                                        <img src={`http://localhost:8000/storage/${product.image}`} alt={product.name} />
                                    </div>
                                    <div>
                                        {product.brands && product.brands.length > 0 ? (
                                            product.brands.map((brand) => (
                                                <span className="same" key={brand.id}>{brand.name}</span>
                                            ))
                                        ) : (
                                            <p>Brend yoxdur</p>
                                        )}
                                        <h3>{product.title}</h3>
                                        <span className="same">{product.price}</span>
                                    </div>
                                    <div className="shopIcons">
                                        <div className="shopIcon1" onClick={(e) => handleFavoriteClick(product.id, e, favorites.includes(product.id))}>
                                            <img src={favorites.includes(product.id) ? "/favory-filled.svg" : "/favory.svg"} alt="Favorite" />
                                        </div>
                                        <div className="shopIcon1">
                                            <img src="eye.svg" alt="View" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <h2>Məhsul tapılmadı</h2>
                    )}
                </div>
            </div>
        </div>
    );
}
