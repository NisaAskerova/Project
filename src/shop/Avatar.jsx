import React from 'react';

// Təsadüfi rəng seçmək üçün köməkçi funksiya
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
        return <img src={avatar} alt={name} style={{ width: '50px', height: '50px' }} />;
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
                    textAlign: 'center',
                    lineHeight: '50px'
                }}
            >
                {name.charAt(0)}
            </div>
        );
    }
};

export default Avatar;
