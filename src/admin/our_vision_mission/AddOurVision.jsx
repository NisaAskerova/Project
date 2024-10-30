import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Admin from '../Admin';

function AddOurVision() {
    const navigate = useNavigate();

    const [type, setType] = useState('');
    const [mainTitle, setMainTitle] = useState('');
    const [mainDescription, setMainDescription] = useState('');
    const [mainImage, setMainImage] = useState(null);

    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [icon, setIcon] = useState(null);

    const [message, setMessage] = useState('');

    const handleAboutUsSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('type', type);
        formData.append('title', mainTitle);
        formData.append('description', mainDescription);
        formData.append('image', mainImage);

        try {
            await axios.post('http://localhost:8000/api/our_vision_mission/main_info', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage('About Us section added successfully!');
            navigate('/our_vision_mission');
        } catch (error) {
            setMessage('Error adding About Us section: ' + error.response.data.message);
            console.error('Error:', error);
        }
    };

    const handleServiceSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', text);
        formData.append('icon', icon);

        try {
            await axios.post('http://localhost:8000/api/our_vision_mission/service_info', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage('Service added successfully!');
            navigate('/our_vision_mission');
        } catch (error) {
            setMessage('Error adding service: ' + error.response.data.message);
            console.error('Error:', error);
        }
    };

    return (
        <>
            <Admin />
            <div className="adminHero">
                <h2>Add Our Vision/Mission Main</h2>
                <form className="form" onSubmit={handleAboutUsSubmit}>
                    <h2 className="form-title">Our Vision/Mission Main</h2>
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
                    <div className="form-group">
                        <label htmlFor="mainImage">Image:</label>
                        <input
                            id="mainImage"
                            type="file"
                            onChange={(e) => setMainImage(e.target.files[0])}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-button">Submit</button>
                </form>

                <form className="form" onSubmit={handleServiceSubmit}>


                    <h2 className="form-title">Our Vision/Mission Service</h2>

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
                        <label htmlFor="serviceIcon">Icon:</label>
                        <input
                            id="serviceIcon"
                            type="file"
                            onChange={(e) => setIcon(e.target.files[0])}
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

export default AddOurVision;
