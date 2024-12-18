import React from 'react';

const NotFound = () => {
    return (
        <div className="not-found-container">
            <img src="/oppsError.png" alt="Səhifə tapılmadı" className="not-found-image" />
            <p className="same">Təəssüf ki, axtardığınız səhifə tapılmadı.</p>
             <a className='same notFoundButton' href="home">Ana Səhifəyə Dön</a>
        </div>
    );
}

export default NotFound;
