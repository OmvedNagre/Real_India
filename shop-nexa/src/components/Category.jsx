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


const CategoryCard = styled.div`
  background-color: white;
  border: 1px solid grey;
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h2 {
    margin: 0.5rem 0;
    font-size: 1.5rem;
    color: #333;
  }

  p {
    color: #666;
    font-size: 1rem;
  }

  &:hover {
    transform: translateY(-5px);
    transition: all 0.3s ease;
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
  }
`;

const CategoryImage = styled.img`

  width: 25vw;
  height: 30vh;

  border-radius: 6px;
  margin-bottom: 8px;
  
`;

const ViewAllButton = styled.button`
  margin-bottom: 1rem;
  padding: 0.5rem 1.2rem;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }
`;

function Category() {
  const categories = [
    { id: 1, name: "Electronics", description: "Latest gadgets and devices", img: electronicImg },
    { id: 2, name: "Fashion", description: "Trendy clothing and accessories", img: clothesImg },
    { id: 3, name: "Home & Kitchen", description: "Essentials for your home", img: furnitureImg },
    { id: 4, name: "Books", description: "Explore a wide range of books", img: booksImg },
    { id: 5, name: "Sports", description: "Gear and equipment for sports", img: sportsImg },
    { id: 6, name: "Toys", description: "Fun toys for kids of all ages", img: toysImg },
    { id: 7, name: "Beauty", description: "Skincare and beauty products", img: beautyImg },
    { id: 8, name: "Automotive", description: "Car accessories and tools", img: medicalImg },
    { id: 9, name: "Health", description: "Health and wellness products", img: eyewearImg },
    { id: 10, name: "Music", description: "Instruments and music gear", img: accessoriesImg },
    { id: 11, name: "Gaming", description: "Consoles and gaming accessories", img: gamingImg },
    { id: 12, name: "Travel", description: "Travel essentials and gear", img: shoesImg },
  ];

  // const handleExploreClick = (categoryName) => {
  //   console.log(`Explore clicked for category: ${categoryName}`);
  //   window.location.href = `/explore`;
  // };

  return (
    <div className="category-wrapper" style={{ padding: "20px" }}>
      <ViewAllButton onClick={() => window.location.href = "/explore"}>View All</ViewAllButton>
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={30}
        slidesPerView={4}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >
        
        {categories.map((category) => (
          <SwiperSlide key={category.id}>
            <CategoryCard>
              <CategoryImage src={category.img} alt={category.name} />
              <h2>{category.name}</h2>
              <p>{category.description}</p>
              {/* <ExploreButton onClick={() => handleExploreClick(category.name)}>
                Explore
              </ExploreButton> */}
            </CategoryCard>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Category;