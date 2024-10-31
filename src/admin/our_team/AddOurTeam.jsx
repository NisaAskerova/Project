import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Admin from '../Admin';

function AddOurTeam() {
    const navigate = useNavigate();

    const [type, setType] = useState('');
    const [mainTitle, setMainTitle] = useState('');
    const [mainDescription, setMainDescription] = useState('');
    const [mainImage, setMainImage] = useState(null);

    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [image, setImage] = useState(null);

    const [message, setMessage] = useState('');

    const handleAboutUsSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('type', type);
        formData.append('title', mainTitle);
        formData.append('description', mainDescription);

        try {
            await axios.post('http://localhost:8000/api/our_team/main_info', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage('About Us section added successfully!');
            navigate('/our_team');
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Error adding About Us section';
            setMessage(errorMessage);
            console.error('Error:', error);
        }
    };

    const handleServiceSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', text);
        if (image) {
            formData.append('image', image); // Only add if image is present
        }

        try {
            await axios.post('http://localhost:8000/api/our_team/service_info', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage('Service added successfully!');
            navigate('/our_team');
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Error adding service';
            setMessage(errorMessage);
            console.error('Error:', error);
        }
    };

    return (
        <>
            <Admin />
            <div className="adminHero">
                <h2>Add Our Team Main</h2>
                <form className="form" onSubmit={handleAboutUsSubmit}>
                    <h2 className="form-title">Our Team Main</h2>
                    <div className="form-group">
                        <label htmlFor="type">Type:</label>
                        <input
                            id="type"
                            type="text"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="mainTitle">Main Title:</label>
                        <input
                            id="mainTitle"
                            type="text"
                            value={mainTitle}
                            onChange={(e) => setMainTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="mainDescription">Main Description:</label>
                        <textarea
                            id="mainDescription"
                            value={mainDescription}
                            onChange={(e) => setMainDescription(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <button type="submit" className="submit-button">Submit</button>
                </form>




                <form className="form" onSubmit={handleServiceSubmit}>
                    <h2 className="form-title">Our Team Service</h2>
                    <div className="form-group">
                        <label htmlFor="serviceTitle">Title:</label>
                        <input
                            id="serviceTitle"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="serviceText">Text:</label>
                        <textarea
                            id="serviceText"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="serviceImage">Icon:</label>
                        <input
                            id="serviceImage"
                            type="file"
                            onChange={(e) => setImage(e.target.files[0])}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-button">Submit</button>
                </form>

                {message && <p className="message">{message}</p>}
            </div>
        </>
    );
}

export default AddOurTeam;
