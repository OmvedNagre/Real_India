import React, { useState } from "react";
import styled from "styled-components";

const categories = [
  { id: 1, name: "Electronics", description: "Latest gadgets and devices" },
  { id: 2, name: "Fashion", description: "Trendy clothing and accessories" },
  { id: 3, name: "Home & Kitchen", description: "Essentials for your home" },
  { id: 4, name: "Books", description: "Explore a wide range of books" },
  { id: 5, name: "Sports", description: "Gear and equipment for sports" },
  { id: 6, name: "Toys", description: "Fun toys for kids of all ages" },
  { id: 7, name: "Beauty", description: "Skincare and beauty products" },
  { id: 8, name: "Automotive", description: "Car accessories and tools" },
  { id: 9, name: "Health", description: "Health and wellness products" },
  { id: 10, name: "Music", description: "Instruments and music gear" },
  { id: 11, name: "Gaming", description: "Consoles and gaming accessories" },
  { id: 12, name: "Travel", description: "Travel essentials and gear" },
];

const mockData = {
  Electronics: ["Smartphone", "Laptop", "Headphones"],
  Fashion: ["T-Shirts", "Jeans", "Shoes"],
  "Home & Kitchen": ["Cookware", "Furniture", "Decor"],
  Books: ["Fiction", "Non-Fiction", "Comics"],
  Sports: ["Football", "Cricket Bat", "Tennis Racket"],
  Toys: ["Action Figures", "Board Games", "Puzzles"],
  Beauty: ["Lipstick", "Skincare", "Perfume"],
  Automotive: ["Car Covers", "Tires", "Car Vacuum"],
  Health: ["Vitamins", "Fitness Equipment", "First Aid"],
  Music: ["Guitars", "Keyboards", "Drums"],
  Gaming: ["Consoles", "Controllers", "Games"],
  Travel: ["Luggage", "Travel Pillows", "Backpacks"],
};

function Explore() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleExploreClick = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  const handleBackClick = () => {
    setSelectedCategory(null);
  };

  if (selectedCategory) {
    // Render the category page
    return (
      <CategoryContainer>
        <BackButton onClick={handleBackClick}>Back</BackButton>
        <h1>{selectedCategory}</h1>
        <ItemList>
          {mockData[selectedCategory].map((item, index) => (
            
            <li key={index}>{item} 
                <div style = {{display:"flex",gap:"10px"}}>   
                    <button>❤️</button><button>Add to Cart</button>
                </div>
            </li>
            
            
          ))}
          
        </ItemList>
      </CategoryContainer>
    );
  }

  // Render the explore page
  return (
    <ExploreContainer>
      <h1>Explore Categories</h1>
      <CategoryGrid>
        {categories.map((category) => (
          <CategoryCard key={category.id}>
            <h2>{category.name}</h2>
            <p>{category.description}</p>
            <ExploreButton onClick={() => handleExploreClick(category.name)}>
              Explore
            </ExploreButton>
          </CategoryCard>
        ))}
      </CategoryGrid>
    </ExploreContainer>
  );
}


const ExploreContainer = styled.div`
  padding: 2rem;

  h1 {
    text-align: center;
    margin-bottom: 2rem;
  }
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
`;

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

const ExploreButton = styled.button`
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const CategoryContainer = styled.div`
  padding: 2rem;
  font-family: Arial, sans-serif;

  h1 {
    text-align: center;
    margin-bottom: 2rem;
  }
`;

const BackButton = styled.button`
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #555;
  }
`;

const ItemList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-right:20px;


  li {

    display:flex;
    justify-content: space-between;
    background-color: #f9f9f9;
    margin: 0.5rem 0;
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    width: 100%;
  }
`;
const ListGrid = styled.div`

`;

export default Explore;