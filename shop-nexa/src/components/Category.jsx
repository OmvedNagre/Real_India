import React from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';

import clothesImg from "../assets/category-img/clothes.jpg";
import electronicImg from "../assets/category-img/electronics.jpg";
import eyewearImg from "../assets/category-img/eyewear.jpg";
import medicalImg from "../assets/category-img/medical.jpg";
import shoesImg from "../assets/category-img/shoes.jpeg";
import furnitureImg from "../assets/category-img/furniture.jpeg";
import toysImg from "../assets/category-img/toys.jpeg";
import sportsImg from "../assets/category-img/sports.jpg";
import booksImg from "../assets/category-img/books.jpg";
import accessoriesImg from "../assets/category-img/accesories.jpg";
import beautyImg from "../assets/category-img/beauty.jpg";
import gamingImg from "../assets/category-img/gaming.jpg";

const CategoryItem = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;


  width: 350px;
  
  height: 300px;
`;

const CategoryImage = styled.img`

  width: 25vw;
  height: 30vh;

  border-radius: 6px;
  margin-bottom: 8px;
  
`;

function Category() {
  const categories = [
    { name: 'Electronics', img: electronicImg },
    { name: 'Clothes', img: clothesImg },
    { name: 'Medical', img: medicalImg },
    { name: 'EyeWear', img: eyewearImg },
    { name: 'Shoes', img: shoesImg },
    { name: 'Furniture', img: furnitureImg },
    { name: 'Toys', img: toysImg },
    { name: 'Sports', img: sportsImg },
    { name: 'Books', img: booksImg },
    { name: 'Accessories', img: accessoriesImg },
    { name: 'Beauty', img: beautyImg },
    { name: 'Gaming', img: gamingImg },
  ];

  return (
    <div className="category-wrapper" style={{ padding: "20px" }}>
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={300}
        slidesPerView={4}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >
        {categories.map((cat, idx) => (
          <SwiperSlide key={idx}>
            <CategoryItem>
              <span>{cat.name}</span>
              <CategoryImage src={cat.img} alt={cat.name} />
              <button>Explore</button>
            </CategoryItem>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Category;