import React from 'react';

const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

const Avatar = ({ name, avatar }) => {
    if (avatar) {
        return <img src={avatar} alt={name} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />;
    } else {
        return (
            <div
                style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    backgroundColor: getRandomColor(),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: '20px',
                    textAlign: 'center',
                }}
            >
                {name ? name.charAt(0).toUpperCase() : '?'}
            </div>
        );
    }
};

export default Avatar;
