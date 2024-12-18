import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function FavoritesPage() {
    const [favorites, setFavorites] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError('Authentication token not found');
                    return;
                }

                const response = await axios.get('http://127.0.0.1:8000/api/favorites/get_favorites', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setFavorites(response.data);
                console.log(response.data);
            } catch (error) {
                setError(error.response?.data?.message || 'Error fetching favorites');
                console.error(error);
            }
        };

        fetchFavorites();
    }, []);

    const removeFavorite = async (id) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('Authentication token not found');
                return;
            }

            await axios.delete(`http://127.0.0.1:8000/api/favorites/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setFavorites(favorites.filter((favorite) => favorite.id !== id));
        } catch (error) {
            console.error('Error removing favorite:', error);
            alert('Favoriti silmək mümkün olmadı.');
        }
    };

    if (error) {
        return <div style={{ color: 'red' }}>{error}</div>;
    }

    if (favorites.length === 0) {
        return <div style={{display:'flex', justifyContent:"center", padding:"20px"}}><h2 className='thick'>Seçilmiş favorit yoxdur.</h2></div>;
    }

    return (
        <div className="favorites-container">
            <table className="favorites-table">
                <thead>
                    <tr>
                        <th>Şəkil</th>
                        <th>Başlıq</th>
                        <th>Qiymət</th>
                        <th>Əməliyyatlar</th>
                    </tr>
                </thead>
                <tbody>
                    {favorites.map((favorite) => (
                        <tr key={favorite.id}>
                            <td>
                                <img
                                    src={`http://127.0.0.1:8000/storage/${favorite.image}`}
                                    alt={favorite.title}
                                    className="favorite-image"
                                />
                            </td>
                            <td>{favorite.title}</td>
                            <td>{favorite.price} AZN</td>
                            <td >
                                <div id='favoriteTd'>
                                <Link to={`/product/${favorite.id}`} className="details-link same">
                                    Ətraflı
                                </Link>
                                <div>
                                    <img src="delete.svg" alt="delete" onClick={() => removeFavorite(favorite.id)} />

                                </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
