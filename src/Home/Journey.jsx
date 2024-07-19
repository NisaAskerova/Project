import React, { useState } from 'react'
import CountUp from 'react-countup'
import ScrollTrigger from 'react-scroll-trigger'
export default function Journey() {
    const [counteOn, setCounterOn] = useState(false)
    return (
        <ScrollTrigger onEnter={()=>setCounterOn(true)} onExit={()=>setCounterOn(false)}>
            <div id='journey'>
                <div id='journeyLeft'>
                    <div className="same">OUR JOURNEY</div>
                    <h2>Trusted by 1000+ Happy
                        Customers Who are Using
                        Our Services Since 1995</h2>
                    <p className='same'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                </div>
                <div id="journeyRight">
                    <div id='journeyBoxes'>
                        <div className='joyrneyBox colmnLine' >
                            <div className='rowLine'>

                                <h3>{counteOn && <CountUp start={0} end={150} duration={3} delay={0} />}+</h3>
                                <span className="same">Our Professional</span>
                            </div>
                            <div>
                                <h3>{counteOn &&<CountUp start={0} end={1000} duration={3} delay={0} />}+</h3>
                                <span className="same">Satisfied Clients</span>
                            </div>
                        </div>
                        <div className='joyrneyBox'>
                            <div className='rowLine'>
                                <h3>{counteOn &&<CountUp start={0} end={850} duration={3} delay={0} />}+</h3>
                                <span className="same">Projects Completed</span>
                            </div>
                            <div>
                                <h3>{counteOn &&<CountUp start={0} end={30} duration={3} delay={0} />}+</h3>
                                <span className="same">Award Achieved</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ScrollTrigger>
    )
}
