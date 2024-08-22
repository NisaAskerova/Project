import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import homeBlogs from '../JSON/homeBlogs.json';
import DetailHero from './DetailHero';
import BlogFilter from './BlogFilter';
import BlogComment from './BlogComment';
import Reply from './Reply';

export default function Detail() {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        const foundBlog = homeBlogs.find(blog => blog.id === id);
        setBlog(foundBlog);
    }, [id]);

    if (!blog) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className='blogDetail'>
                <div className="bDetailLeft">
                    <div className='blogDate'>
                        <img className='bdi' src={blog.image} alt={blog.title} />
                    </div>
                    <h2 className='thick dthick'>{blog.title}</h2>
                    <p className='desc'>{blog.desc}</p>
                    <div className='contextDiv'>
                        <p className='context'>{blog.context}</p>
                    </div>
                    <p className='desc'>{blog.desc2}</p>
                    <div>
                        <BlogComment />
                        <Reply />
                    </div>
                </div>
                <div className="BfilterRight">
                    <BlogFilter />
                </div>
            </div>
        </>
    );
}
