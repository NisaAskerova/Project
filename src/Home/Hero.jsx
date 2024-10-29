import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';

function HeroSlider() {
  const [sliders, setSliders] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSliders = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/sliders/show');
        setSliders(response.data);
      } catch (error) {
        setError(error.response ? error.response.data.message : 'Error fetching sliders');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSliders();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Yüklənmə anında mesaj göstərin
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>; // Xətanı qırmızı ilə göstərin
  }

  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      spaceBetween={50}
      slidesPerView={1}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      loop={true}
    >
      {sliders.map((slide, index) => (
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

export default HeroSlider;
