import React from 'react'

export default function ContactUs() {
    return (
        <div id='contactUs'>
            <div >
            <img src="" alt="" />
            <div id='leftContact'>
                <span className='same'>NEED FOR SOME HELP?</span>
                <h2>Let’s Contact Us!</h2>
                <p className='same'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
            </div>
            <div id="rightContact">
                <div>
                    <input className='same' type="email" name="email" placeholder='Email Address' />
                    <button>Submit <img src="../leftIcon.svg" alt="" /></button>
                </div>
            </div>
            </div>
        </div>
    )
}
