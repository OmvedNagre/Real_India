import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { recordInteraction } from "../services/recommendationService";
import Navbar from "./short-components/Navbar";
import Footer from "./Footer";

function Explore() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((data) => {
        let updated = [...data];
        if (updated.length < 8) {
          let i = 0;
          while (updated.length < 8) {
            updated.push(`${data[i]}-extra`);
            i = (i + 1) % data.length;
          }
        } else if (updated.length > 8) {
          updated = updated.slice(0, 8);
        }
        setCategories(updated);
      });
    // load wishlist ids
    const stored = JSON.parse(localStorage.getItem("wishlistItems")) || [];
    setWishlistIds(stored.map((item) => item.id));
  }, []);

  const handleExploreClick = (categoryName) => {
    setSelectedCategory(categoryName);
    const cleanName = categoryName.replace("-extra", "");
    fetch(`https://fakestoreapi.com/products/category/${encodeURIComponent(cleanName)}`)
      .then((res) => res.json())
      .then((products) => {
        setCategoryProducts(products);
        // reload wishlist when exploring new category
        const stored = JSON.parse(localStorage.getItem("wishlistItems")) || [];
        setWishlistIds(stored.map((item) => item.id));
      });
  };

  const handleBackClick = () => {
    setSelectedCategory(null);
    setCategoryProducts([]);
  };

  const addToWishlist = (item) => {
    const stored = JSON.parse(localStorage.getItem("wishlistItems")) || [];
    const exists = stored.find((p) => p.id === item.id);
    if (!exists) {
      const updated = [...stored, item];
      localStorage.setItem("wishlistItems", JSON.stringify(updated));
      setWishlistIds((prev) => [...prev, item.id]);
    }
    recordInteraction(item.id, "wishlist");
  };

  if (selectedCategory) {
    return (
      <>
        <Navbar />
        <CategoryContainer>
          <BackButton onClick={handleBackClick}>Back</BackButton>
          <h1>{selectedCategory}</h1>
          <ItemList>
            {categoryProducts.map((item) => {
              const inWishlist = wishlistIds.includes(item.id);
              return (
                <li key={item.id}>
                  <div style={{ display: "flex", flexDirection: "column", maxWidth: "200px" }}>
                    <img src={item.image} alt={item.title} style={{ width: "100px", height: "100px", objectFit: "contain", marginBottom: "8px" }} />
                    <strong style={{ fontSize: "0.9rem" }}>{item.title}</strong>
                    <span style={{ fontSize: "0.8rem", color: "#333" }}>₹{item.price}</span>
                  </div>
                  <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                    <button
                      onClick={() => addToWishlist(item)}
                      style={{
                        backgroundColor: inWishlist ? "#28a745" : "transparent",
                        color: inWishlist ? "#fff" : "#000",
                        border: inWishlist ? "1px solid #28a745" : "1px solid #ccc",
                        padding: "0.3rem 0.6rem",
                        borderRadius: "4px",
                        cursor: inWishlist ? "default" : "pointer",
                      }}
                      disabled={inWishlist}
                    >
                      {inWishlist ? "✓ In Wishlist" : "❤️"}
                    </button>
                    <button onClick={() => recordInteraction(item.id, "cart")}>Add to Cart</button>
                  </div>
                </li>
              );
            })}
          </ItemList>
        </CategoryContainer>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <ExploreContainer>
        <h1>Explore Categories</h1>
        <CategoryGrid>
          {categories.map((category, idx) => (
            <CategoryCard key={idx}>
              <h2>{category}</h2>
              <ExploreButton onClick={() => handleExploreClick(category)}>
                Explore
              </ExploreButton>
            </CategoryCard>
          ))}
        </CategoryGrid>
      </ExploreContainer>
      <Footer />
    </>
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
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  justify-items: center;
  align-items: stretch;
`;

const CategoryCard = styled.div`
  background-color: white;
  border: 1px solid grey;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 220px;
  min-height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h2 {
    margin: 0.5rem 0;
    font-size: 1.2rem;
    color: #333;
    text-transform: capitalize;
  }

  &:hover {
    transform: translateY(-5px);
    transition: all 0.3s ease;
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
  }
`;

const ExploreButton = styled.button`
  margin-top: 1rem;
  padding: 0.6rem 1.2rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 600;

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
  padding: 0;
  margin-right: 20px;
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f9f9f9;
    margin: 0.5rem 0;
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    width: 100%;
  }
`;

export default Explore;