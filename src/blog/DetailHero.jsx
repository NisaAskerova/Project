import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'; 

export default function DetailHero() {
    const { id } = useParams(); 
    const [blog, setBlog] = useState(null); 
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlogDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/blogs/get_blog/${id}`);
                setBlog(response.data); 
            } catch (error) {
                console.error('Error fetching blog details:', error);
            }
        };

        fetchBlogDetails(); 
    }, [id]); 

    if (!blog) {
        return <div>Loading...</div>; 
    }

    return (
        <div
            id='bdetail'
            style={{
                backgroundImage: `url(http://localhost:8000/storage/${blog.image})`,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '550px',
                position: 'relative',
            }}
        >
            <div className='overlay'></div>
            <div className='heroTitle'>
                <div className='navigation'>
                    <span
                        onClick={() => navigate('/home')}
                        className='navLink'
                    >
                        Ana səhifə
                        <img src="../../arrows.svg" alt="Arrow" className='arrow' />
                    </span>
                    <span
                        onClick={() => navigate('/blog')}
                        className='navLink'
                    >
                        Bloq
                        <img src="../../arrows.svg" alt="Arrow" className='arrow' />
                    </span>
                    <span className='navLink'>
                        {blog.title} 
                    </span>
                </div>
                <div id='blTitle'>
                    <h2 className='thick wh'>{blog.title}</h2> 
                </div>
            </div>
        </div>
    );
}
