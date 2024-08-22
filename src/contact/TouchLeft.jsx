import React from 'react'

export default function TouchLeft() {
  return (
    <div id='touchLeft'>
      <h2 className="thick">Get in Touch</h2>
      <p>Using it can make you sound like you have been studying english for 
      a long time. Here’s the challenge</p>
      <div>
        <div className='touchBox'>
            <div className='divYellow'>
              <img src="location.svg" alt="" />
              </div>
            <div>
                <span className="same">Location</span>
                <span className='same'>4140 Parker Rd. Allentown, New Mexico 31134</span>
            </div>
        </div>
        <div className='touchBox'>
          <div className='divYellow'>
            <img src="phone.svg" alt="" />
          </div>
          <div>
          <span className='same'>Phone Number</span>
          <span className='same'>(319) 555-0115</span>
          </div>
        </div>
        <div className='touchBox'>
          <div className='divYellow'>
            <img src="share.svg" alt="" />
          </div>
          <div>

          <span  className='same'>Follow Us</span>
          <div id='socialDiv'>
            <img src="face.svg" alt="" />
            <img src="instagram.svg" alt="" />
            <img src="twitter.svg" alt="" />
            <img src="linkedin.svg" alt="" />
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}
