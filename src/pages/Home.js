import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { translations } from '../translations/translations';

function Home({ language }) {
  const products = [
    {
      id: 1,
      name: 'Bodom',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
      desc: 'Yuqori sifatli bodom, foydali va mazali.'
    },
    {
      id: 2,
      name: 'Pista',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
      desc: 'Tabiiy pista, energiya va vitaminlarga boy.'
    },
    {
      id: 3,
      name: "Mayiz",
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
      desc: "Shirin va tabiiy mayiz."
    },
    {
      id: 4,
      name: "O'rik quritilgan",
      image: 'https://images.unsplash.com/photo-1506089676908-3592f7389d4d?auto=format&fit=crop&w=400&q=80',
      desc: "Vitaminlarga boy quritilgan o'rik."
    },
    {
      id: 5,
      name: "Anjir",
      image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
      desc: "Tabiiy quritilgan anjir."
    },
    {
      id: 6,
      name: "Anjir",
      image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
      desc: "Tabiiy quritilgan anjir."
    },
    {
      id: 7,
      name: "Anjir",
      image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
      desc: "Tabiiy quritilgan anjir."
    }
  ];

  const slides = [
    {
      title: translations[language].slide1Title,
      text: translations[language].slide1Text,
      linkText: translations[language].viewProducts,
      linkTo: '/products',
      image: 'https://media.istockphoto.com/id/523458571/photo/organic-healthy-assorted-dried-fruit.jpg?s=612x612&w=0&k=20&c=PuuQap2lSgZNoZO0OPyiEQr0Qy9hvX12m8xHlNJ54FU='
    },
    {
      title: translations[language].slide2Title,
      text: translations[language].slide2Text,
      linkText: translations[language].viewProducts,
      linkTo: '/products',
      image: 'https://media.istockphoto.com/id/523458571/photo/organic-healthy-assorted-dried-fruit.jpg?s=612x612&w=0&k=20&c=PuuQap2lSgZNoZO0OPyiEQr0Qy9hvX12m8xHlNJ54FU='
    },
    {
      title: translations[language].slide3Title,
      text: translations[language].slide3Text,
      linkText: translations[language].viewProducts,
      linkTo: '/products',
      image: 'https://media.istockphoto.com/id/523458571/photo/organic-healthy-assorted-dried-fruit.jpg?s=612x612&w=0&k=20&c=PuuQap2lSgZNoZO0OPyiEQr0Qy9hvX12m8xHlNJ54FU='
    }
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          loop={true}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="slide" style={{ backgroundImage: `url(${slide.image})` }}>
                <div className="slide-content">
                  <h1>{slide.title}</h1>
                  <p>{slide.text}</p>
                  <Link to={slide.linkTo} className="cta-button">
                    {slide.linkText}
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Featured Products */}
      <section className="featured-products">
        <div className="container">
          <h2>{translations[language].featuredProducts}</h2>
          <div className="products-grid">
            {products.slice(0, 6).map(product => (
              <div key={product.id} className="product-card">
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <p>{product.desc}</p>
                <Link to="/products" className="view-more">
                  {translations[language].viewMore}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home; 