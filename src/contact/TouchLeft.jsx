import React from 'react';

export default function TouchLeft() {
  return (
    <div id='touchLeft'>
      <h2 className="thick">Əlaqə</h2>
      <p>İngilis dili öyrəndiyinizi göstərmək üçün bu, yaxşı bir fürsətdir. Burada bir çətinlik var.</p>
      <div>
        <div className='touchBox'>
          <div className='divYellow'>
            <img src="location.svg" alt="Location" />
          </div>
          <div>
            <span className="same">Ünvan</span>
            <span className='same'>Bakı şəhəri, Nərimanov rayonu, Həsən Əliyev küçəsi 2, AZ1000</span>
          </div>
        </div>
        <div className='touchBox'>
          <div className='divYellow'>
            <img src="phone.svg" alt="Phone" />
          </div>
          <div>
            <span className='same'>Telefon Nömrəsi</span>
            <span className='same'>(012) 555-0115</span>
          </div>
        </div>
        <div className='touchBox'>
          <div className='divYellow'>
            <img src="share.svg" alt="Follow Us" />
          </div>
          <div>
            <span className='same'>Bizi İzləyin</span>
            <div id='socialDiv'>
              <img src="face.svg" alt="Facebook" />
              <img src="instagram.svg" alt="Instagram" />
              <img src="twitter.svg" alt="Twitter" />
              <img src="linkedin.svg" alt="LinkedIn" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
