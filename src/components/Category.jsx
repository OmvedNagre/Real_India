import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Category = () => {
  const [categories, setCategories] = useState([]);

  // Fetch categories dynamically from Fake Store API
  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  return (
    <CategoryContainer>
      <h1>Categories</h1>
      <CategoryGrid>
        {categories.map((category, index) => (
          <Link
            key={index}
            to={`/explore/${encodeURIComponent(category)}`}
            style={{ textDecoration: "none", color: "inherit", width: "100%" }}
          >
            <CategoryCard>
              <span>{category}</span>
            </CategoryCard>
          </Link>
        ))}
      </CategoryGrid>
    </CategoryContainer>
  );
};

const CategoryContainer = styled.div`
  padding: 2rem;
  h1 {
    text-align: center;
    margin-bottom: 2rem;
  }
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  justify-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CategoryCard = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  text-align: center;
  padding: 1.5rem;
  font-weight: 600;
  text-transform: capitalize;
  width: 100%;
  max-width: 220px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
  }
`;

export default Category;