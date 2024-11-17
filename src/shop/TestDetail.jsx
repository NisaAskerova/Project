import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

export default function TestDetail() {
    const { id } = useParams(); // Məhsul ID-sini URL-dən alır
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://127.0.0.1:8000/api/products/show_product/${id}`);
                console.log(response.data);
                setProduct(response.data);
               

            } catch (err) {
                setError('Məhsul tapılmadı və ya serverdə xəta baş verdi.');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return <h2>YÜKLƏNİR...</h2>;
    }

    if (error) {
        return <h2>{error}</h2>;
    }

    if (!product) {
        return <h2>Məhsul mövcud deyil</h2>;
    }
    return (
        <div id="productDetail">
            <div className="detailContainer">
                {/* Məhsul Şəkli */}
                <div className="imageSection">
                    <img
                        src={`http://localhost:8000/storage/${product.image}`}
                        alt={product.name}
                        className="productImage"
                    />
                </div>

                {/* Məhsul Detalları */}
                <div className="infoSection">
                    <h1>{product.title}</h1>
                    <div className="productBrands">
                        {product.brands && product.brands.length > 0 ? (
                            product.brands.map((brand) => (
                                <span key={brand.id} className="brandBadge">{brand.name}</span>
                            ))
                        ) : (
                            <span>Brand mövcud deyil</span>
                        )}
                    </div>
                    <p className="price">${product.price}</p>

                    {/* Məhsul Kateqoriyaları */}
                    <div className="categories">
                        <h4>Kategoriyalar:</h4>
                        {product.categories && product.categories.length > 0 ? (
                            product.categories.map((category) => (
                                <span key={category.id} className="categoryBadge">{category.name}</span>
                            ))
                        ) : (
                            <span>Kategoriya mövcud deyil</span>
                        )}
                    </div>

                    {/* Məhsul Açıklaması */}
                    <p className="description">{product.description}</p>

                    {/* Stok Vəziyyəti */}
                    <p className="stockStatus">
                        {product.has_stock ? 'Stokda var' : 'Stokda yoxdur'}
                    </p>

                    {/* Əlavə Etdiyiniz Butonlar */}
                    <div className="actionButtons">
                        <button className="addToCart">Səbətə əlavə et</button>
                        <Link to="/" className="backToShop">Mağazaya qayıt</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
