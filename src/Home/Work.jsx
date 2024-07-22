import React from 'react'
import work from '../JSON/work.json'
export default function Work() {
    return (
        <div id='work'>
            <div id='workLeft'>
            <div>
            <span className="same">HOW WE WORKS</span>
            <h2 className='thick'>Our Service Process</h2>
            <p className='same'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                 The point of using Lorem Ipsum.</p>
            </div>
            {work.map((e, index)=>(
                <>
            <div className='workBox' key={index}>
                <div className='workiconDiv'>
                    <img src={e.icon} alt="" />
                </div>
                <div>
                    <h3>{e.title}</h3>
                    <p className='same'>{e.description}</p>
                </div>
            </div>
            {e.line ? (
                            <div className='workLine' style={{ border: "1px solid rgba(180, 178, 173, 0.20)" }}>
                            </div>
                        ) : null}                </>
            ))}
            </div>


            <div id="wirkRight">
                <img src="./Rectangle 34624252.png" alt="" />
            </div>
        </div>
    )
}
