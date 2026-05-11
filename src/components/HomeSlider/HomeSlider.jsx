import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from '../../assets/images/banner-4.jpeg'
import img2 from '../../assets/images/blog-img-1.jpeg'
import img3 from '../../assets/images/blog-img-2.jpeg'
import img4 from '../../assets/images/grocery-banner-2.jpeg'

export default function HomeSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <div style={{ display: 'flex', height: '320px' }}>

      {/* Main slider — 3/4 width */}
      <div style={{ width: '75%', overflow: 'hidden' }}>
        <Slider {...settings}>
          {[img1, img2, img3, img4].map((img, i) => (
            <div key={i}>
              <img
                src={img}
                alt={`slide-${i}`}
                style={{ width: '100%', height: '320px', objectFit: 'cover', display: 'block' }}
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Side images — 1/4 width */}
      <div style={{ width: '25%', display: 'flex', flexDirection: 'column' }}>
        <img
          src={img2}
          alt="side-1"
          style={{ width: '100%', height: '160px', objectFit: 'cover', display: 'block' }}
        />
        <img
          src={img3}
          alt="side-2"
          style={{ width: '100%', height: '160px', objectFit: 'cover', display: 'block' }}
        />
      </div>

    </div>
  );
}
