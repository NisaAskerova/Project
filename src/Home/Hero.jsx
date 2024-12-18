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
        const response = await axios.get('http://localhost:8000/api/sliders/get');
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
    return <div className='loadingDiv'><img  src="./loading.gif" alt="" /></div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>; // Xətanı qırmızı ilə göstərin
  }

  return (
<Swiper
  className="custom-swiper"
  modules={[Autoplay, Pagination]}
  spaceBetween={50}
  slidesPerView={1}
  autoplay={{ delay: 3000, disableOnInteraction: false }}
  pagination={{ clickable: true }}
  loop={true}
  onSlideChangeTransitionStart={() => {
    document.querySelectorAll('.swiper-slide').forEach(slide => {
      slide.style.transition = 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out';
    });
  }}
  onSlideChangeTransitionEnd={() => {
    document.querySelectorAll('.swiper-slide').forEach(slide => {
      slide.style.transition = ''; // Keçiddən sonra transition-u silmək
    });
  }}
>
  {sliders.map((slide, index) => (
    <SwiperSlide key={index}>
      <div
        id="homeHero"
        style={{
          backgroundImage: `url(http://localhost:8000/storage/${slide.backImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh',
        }}
      >
        <div id='heroLeft'>
          <h3>{slide.title}</h3>
          <p>{slide.description}</p>
          <button>
            <span className='same'>Başlayın</span>
            <img src={`http://localhost:8000/storage/${slide.icon}`} alt="Left Icon" />
          </button>
        </div>
        <div id="heroRight">
          <img className='security' src={`http://localhost:8000/storage/${slide.image}`} alt="Line Decoration" />
          <img className='yellowLine' src={`http://localhost:8000/storage/${slide.heroImage}`} alt="Security Guard" />
        </div>
      </div>
    </SwiperSlide>
  ))}
</Swiper>

  );
}

export default HeroSlider;
