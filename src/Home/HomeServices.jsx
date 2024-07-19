import React from 'react';
import services from '../JSON/services.json';

export default function HomeServices() {
  const firstDiv=services.slice(0,2);
  const secontDiv=services.slice(2,4);
  const thirdDiv=services.slice(4,6);
  return (
    <div id='HomeServices'>
      <div id='serviceTitle'>
        <span className='same'>OUR SERVICES</span>
        <h2>Services We Provided</h2>
        <p className='same'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
      </div>
      <div id='serviceBoxes'>
        <div className='firstDivServices'>
        {firstDiv.map((item)=>(  <>
          <div className='serviceBox' key={item.id}>
            <div>
              <h2>{item.title}</h2>
              <p className='same'>{item.description}</p>
              <button className='same' style={{ backgroundColor: item.button  }}><span>Explore</span><img src="./leftIcon.svg" alt="" /></button>
            </div>
              <img className='serviceSecuryImg' src={item.image} alt={item.title} />
          </div>
          <div style={{borderBottom: item.underLine ? "1px solid rgba(21, 20, 15, 0.20)" : "transparent" , marginTop:"20px"}}></div>
          </>
        ))}
        </div>

        <div className='divlinee'></div>

        <div className='firstDivServices'>
        {secontDiv.map((item)=>(
          <>
          <div className='serviceBox' key={item.id} style={{backgroundColor: item.color, }}>
              <img className='serviceSecuryImg' src={item.image} alt={item.title} />
            <div style={{paddingLeft: item.padding ? "20px": "0"}}>
              <h2>{item.title}</h2>
              <p className='same'>{item.description}</p>
              <button className='same' style={{ backgroundColor: item.button }}><span>Explore</span><img src="./leftIcon.svg" alt="" /></button>
              </div>

            
          </div>
          <div style={{borderBottom: item.underLine ? "1px solid rgba(21, 20, 15, 0.20)" : "transparent" , marginTop:"20px"}}></div>
          </>
        ))}

        </div>

        <div className='divlinee'></div>
        
        <div className='firstDivServices'>
        {thirdDiv.map((item)=>(
          <>
          <div className='serviceBox' key={item.id}>
            <div>
              <h2>{item.title}</h2>
              <p className='same'>{item.description}</p>
              <button className='same' style={{ backgroundColor: item.button }}><span>Explore</span><img src="./leftIcon.svg" alt="" /></button>

            </div>
              <img className='serviceSecuryImg' src={item.image} alt={item.title} />
          </div>
          <div style={{borderBottom: item.underLine ? "1px solid rgba(21, 20, 15, 0.20)" : "transparent" , marginTop:"20px"}}></div>
          </>
        ))}
          
        </div>
      </div>
    </div>
  );
}
