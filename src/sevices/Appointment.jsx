import React from 'react'

export default function Appointment() {
    return (
        <div id='appointment'>
            <div id="appointmentLeft">
                <span className="same">MAKE APPOINTMENT</span>
                <h2 className="thick">The Perfect Solution For All Service</h2>
                <p className="same">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                     The point of using Lorem Ipsum.</p>
            </div>
            <div id="appointmentRight">
                <form action="#" method='POST'>
                    <div id='formDivTop'>
                        <div>
                        <label htmlFor="name">Name</label>
                        <input className='same' type="text" name="name" id="name" placeholder='Name' />
                        </div>
                        <div>
                        <label htmlFor="email">Email</label>
                        <input className='same' type="email" name="email" id="email" placeholder='Email'/>
                        </div>
                        <div>
                        <label htmlFor="number">Mobil Number</label>
                        <input className='same' type="number" name="number" id="number" placeholder='Mobil Number'/>
                        </div>
                        <div>
                        <label htmlFor="services">Services</label>
                        <input className='same' type="text" name="services" id="services" placeholder='Select' />
                        </div>
                    </div>
                    <div id='formDivBottom'>
                        <label htmlFor="message">Message</label>
                        <textarea className='same' name="message" id="message" placeholder='Message'></textarea>
                        <button>Make Appointment</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
