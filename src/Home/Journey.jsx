
import React, { useState, useEffect } from 'react';
import CountUp from 'react-countup';
import ScrollTrigger from 'react-scroll-trigger';
import axios from 'axios';

export default function Journey() {
    const [counterOn, setCounterOn] = useState(false);
    const [mainData, setMainData] = useState([]);
    const [counterData, setCounterData] = useState([]);

    useEffect(() => {
        fetchMainData();
        fetchCounterData();
    }, []);

    const fetchMainData = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/our_journey/get_main_info');
            setMainData(response.data);
        } catch (error) {
            console.error("Error fetching main information:", error);
        }
    };

    const fetchCounterData = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/our_journey/get_counter_info');
            setCounterData(response.data);
        } catch (error) {
            console.error("Error fetching counter information:", error);
        }
    };

    return (
        <ScrollTrigger onEnter={() => setCounterOn(true)} onExit={() => setCounterOn(false)}>
            <div id="journey">
                {mainData.map((item) => (
                    <div key={item.id} id="journeyLeft">
                        <div className="same">{item.type}</div>
                        <h2 className="thick">{item.title}</h2>
                        <p className="same">{item.description}</p>
                    </div>
                ))}
                <div id="journeyRight">
                    <div id="journeyBoxes">
                        {counterData.length > 0 && (
                            <div className="counterRow">
                                {counterData.map((counter, index) => (
                                    <div
                                        key={index}
                                        className={`joyrneyBox ${index === 0 || index === 2 ? 'separatorLine' : ''}`}
                                    >

                                        <div
                                            className={` ${index === 0 || index === 1 ? 'rowLine' : ''}`}
                                        >
                                            <h3 className="thick">
                                                {counterOn && (
                                                    <CountUp
                                                        start={0}
                                                        end={counter.count || 0}
                                                        duration={3}
                                                        delay={0}
                                                    />
                                                )}
                                                +
                                            </h3>
                                            <span className="same">{counter.title}</span>
                                        </div>
                                        {/* Add a line after each pair */}

                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </ScrollTrigger>
    );
}
