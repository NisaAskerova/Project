import React from 'react'

export default function TouchRight() {
  return (
    <div id='touchForm'>
      <form action="" method='POST'>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" placeholder='Enter Your Name' />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" placeholder='Enter Your Email' />
        </div>
        <div>
          <label htmlFor="phone">Phone Number</label>
          <input type="tel" name="phone" id="phone" placeholder='Enter Phone Number' />
        </div>
        <div>
          <label htmlFor="message">Message</label>
          <textarea name="message" id="message" placeholder='Enter Your Message'></textarea>
        </div>
        <button className='same'>Send Enquiry</button>
      </form>
    </div>
  )
}
