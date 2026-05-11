import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

function getAllCategories() {
  return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
}

export default function CategoriesSlider() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 4, slidesToScroll: 2 } },
      { breakpoint: 768,  settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 480,  settings: { slidesToShow: 2, slidesToScroll: 1 } },
    ],
  };

  const { data, isLoading } = useQuery({
    queryKey: ['getAllCategories'],
    queryFn: getAllCategories,
  });

  const allCategories = data?.data.data;

  if (isLoading) return null;

  return (
    <div style={{ padding: '0 8px' }}>
      <Slider {...settings}>
        {allCategories?.map(category => (
          <div key={category._id} style={{ padding: '0 6px' }}>
            <div style={{
              borderRadius: '12px',
              overflow: 'hidden',
              border: '1px solid #f3f4f6',
              background: '#fff',
              cursor: 'pointer',
              transition: 'box-shadow 0.2s',
            }}>
              <img
                src={category.image}
                alt={category.name}
                style={{
                  width: '100%',
                  height: '120px',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
              <p style={{
                textAlign: 'center',
                fontSize: '13px',
                fontWeight: '600',
                color: '#111827',
                padding: '8px 4px',
                margin: 0,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}>{category.name}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
