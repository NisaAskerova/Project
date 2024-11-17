import React, { useContext, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MyContext } from '../App';

export default function ProductPage() {
    const { setProducts, products } = useContext(MyContext);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        category: '', // Tək bir kateqoriya seçmək üçün
        brand: '',    // Tək bir brend seçmək üçün
        minPrice: 0,
        maxPrice: 2000,
        hasStock: true, // Yalnız anbarda olan məhsullar üçün süzgəc
        tag: '',        // Tək bir tag seçmək üçün
    });
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [tags, setTags] = useState([]);
    const [categoryCounts, setCategoryCounts] = useState({});
    const [brandCounts, setBrandCounts] = useState({});
    const [tagCounts, setTagCounts] = useState({});
    const [shot, setShot] = useState(false);
    const [shot2, setShot2] = useState(false);
    const [shot3, setShot3] = useState(false);
    const [shot4, setShot4] = useState(false); // Tag üçün yeni shot state

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

            const newTagCounts = uniqueTags.reduce((acc, tag) => {
                acc[tag] = response.data.products.filter((product) =>
                    product.tags.some((t) => t.name === tag)
                ).length;
                return acc;
            }, {});

            setCategoryCounts(newCategoryCounts);
            setBrandCounts(newBrandCounts);
            setTagCounts(newTagCounts);
        } catch (error) {
            console.error('Məlumat alınarkən xəta baş verdi:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [filters]);

    const handleFilterChange = (filterType, value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [filterType]: value,
        }));
    };

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const matchesCategory =
                !filters.category ||
                product.categories.some((c) => c.name === filters.category);

            const matchesBrand =
                !filters.brand ||
                product.brands.some((b) => b.name === filters.brand);

            const matchesPrice =
                parseFloat(product.price) >= filters.minPrice &&
                parseFloat(product.price) <= filters.maxPrice;

            const matchesStock = filters.hasStock ? product.has_stock : true;

            const matchesTag =
                !filters.tag ||
                product.tags.some((t) => t.name === filters.tag);

            return matchesCategory && matchesBrand && matchesPrice && matchesStock && matchesTag;
        });
    }, [filters, products]);

    const defaultDisplayProducts = filteredProducts.slice(0, 12);

    return (
        <div id='productPage'>
            <div className='filterProduct'>
                <div className='filter-section'>
                    {/* Categories Filter */}
                    <div className='filterTitle' onClick={() => setShot(!shot)}>
                        <h3>Categories</h3>
                        <img src="down.svg" alt="" />
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

                    {/* Price Filter */}
                    <div className='filterTitle ft' onClick={() => setShot2(!shot2)} >
                        <h3>Price</h3>
                        <img src="down.svg" alt="" />
                    </div>
                    <div style={{ height: shot2 ? "100%" : "0", overflow: "hidden" }} className='filterCatecory filterRange'>
                        <span>Price: ${filters.minPrice} - ${filters.maxPrice}</span>
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

                    {/* Brands Filter */}
                    <div className='filterTitle ft' onClick={() => setShot3(!shot3)}>
                        <h3>Brands</h3>
                        <img src="down.svg" alt="" />
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

                    {/* Tags Filter */}
                    <div className='filterTitle ft' onClick={() => setShot4(!shot4)}>
                        <h3>Tags</h3>
                        <img src="down.svg" alt="" />
                    </div>
                    <div className='tagCategory'>
                    {tags.map((tag) => (
                        <div style={{ height: shot4 ? "100%" : "0", overflow: "hidden" }} key={tag}>
                          
                                <div className='tagButton' onClick={() => handleFilterChange('tag', tag)}>
                                    {tag}
                                </div>
            
                        </div>
                    ))}
</div>
                </div>
            </div>
            <div id='products'>
                <div id='shopTitle'>
                    <div>
                        <img src="grid.svg" alt="Grid" />
                        <img src="list.svg" alt="List" />
                        <span>Showing {defaultDisplayProducts.length} of {products.length} results</span>
                    </div>
                    <div>
                        <span>Shot by latest</span>
                        <img src="down.svg" alt="" />
                    </div>
                </div>
                <div className='shopBoxes'>
                    {loading ? (
                        <h2>YÜKLƏNİR...</h2>
                    ) : defaultDisplayProducts.length > 0 ? (
                        defaultDisplayProducts.map((product) => (
                            <Link to={`/product/${product.id}`} key={product.id}>
                                <div className='shopBox'>
                                    <div className='imgDiv'><img src={`http://localhost:8000/storage/${product.image}`} alt={product.name} /></div>
                                    <div>
                                        {product.brands && product.brands.length > 0 ? (
                                            product.brands.map((brand) => (
                                                <span className='sameBrand' key={brand.name}>{brand.name}</span>
                                            ))
                                        ) : (
                                            <span>No brand</span>
                                        )}
                                    </div>
                                    <div><span>{product.name}</span></div>
                                    <div><span>${product.price}</span></div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div><span>No products found</span></div>
                    )}
                </div>
            </div>
        </div>
    );
}
