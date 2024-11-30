import React from 'react';

export default function Reply() {
    return (
        <div id='reply'>
            <h3>Cavabınızı Burada Yazın</h3>
            <form action="" method='POST'>
                <div>
                    <label htmlFor="name">Ad</label>
                    <input type="text" name="name" id="name" placeholder='Adınızı Daxil Edin' />
                </div>
                <div>
                    <label htmlFor="email">Email Ünvanı</label>
                    <input type="email" name="email" id="email" placeholder='Email Ünvanınızı Daxil Edin' />
                </div>
                <div>
                    <label htmlFor="comment">Şərhlər</label>
                    <textarea name="comment" id="comment" placeholder='Şərhinizi Daxil Edin'></textarea>
                </div>
                <button>Göndər</button>
            </form>
        </div>
    );
}
