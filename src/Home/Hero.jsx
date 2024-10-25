import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';

export default function Hero() {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const fetchSlides = async () => {
      const response = await axios.get('http://127.0.0.1:8000/api/sliders');
      setSlides(response.data);
    };

    fetchSlides();
  }, []);

  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      spaceBetween={50}
      slidesPerView={1}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      loop={true}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div id="homeHero" className={slide.backImage}>
            <div id='heroLeft'>
              <h3>{slide.title}</h3>
              <p>{slide.description}</p>
              <button>
                <span className='same'>Get Started</span>
                <img src={slide.icon} alt="Left Icon" />
              </button>
            </div>
            <div id="heroRight">
              <img src={slide.heroImage} alt="Line Decoration" />
              <img src={slide.image} alt="Security Guard" />
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
