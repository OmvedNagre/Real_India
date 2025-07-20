import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { recordInteraction } from "../services/recommendationService";
import Navbar from "./short-components/Navbar";
import Footer from "./Footer";

function Explore() {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]);

  useEffect(() => {
    // fetch categories for grid
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));

    // load wishlist
    const stored = JSON.parse(localStorage.getItem("wishlistItems")) || [];
    setWishlistIds(stored.map((item) => item.id));
  }, []);

  useEffect(() => {
    if (categoryName) {
      // if categoryName present in URL, fetch its products
      fetch(`https://fakestoreapi.com/products/category/${encodeURIComponent(categoryName)}`)
        .then((res) => res.json())
        .then((products) => {
          setCategoryProducts(products);
          setSelectedCategory(categoryName);
          const stored = JSON.parse(localStorage.getItem("wishlistItems")) || [];
          setWishlistIds(stored.map((item) => item.id));
        });
    }
  }, [categoryName]);

  const handleExploreClick = (categoryName) => {
    setSelectedCategory(categoryName);
    fetch(`https://fakestoreapi.com/products/category/${encodeURIComponent(categoryName)}`)
      .then((res) => res.json())
      .then((products) => {
        setCategoryProducts(products);
        const stored = JSON.parse(localStorage.getItem("wishlistItems")) || [];
        setWishlistIds(stored.map((item) => item.id));
      });
  };

  const handleBackClick = () => {
    // ✅ Navigate back to home page
    navigate("/");
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

  // Show products if category selected either by button or by route param
  if (selectedCategory) {
    return (
      <>
        <Navbar />
        <CategoryContainer>
          <BackButton onClick={handleBackClick}>Back</BackButton>
          <h1>{selectedCategory}</h1>
          <ResponsiveItemList>
            {categoryProducts.map((item) => {
              const inWishlist = wishlistIds.includes(item.id);
              return (
                <li key={item.id}>
                  <ProductCard>
                    <img src={item.image} alt={item.title} />
                    <strong>{item.title}</strong>
                    <span>₹{item.price}</span>
                    <div className="actions">
                      <button
                        onClick={() => addToWishlist(item)}
                        className={inWishlist ? "in-wishlist" : ""}
                        disabled={inWishlist}
                      >
                        {inWishlist ? "✓ In Wishlist" : "❤️"}
                      </button>
                      <button className="cart" onClick={() => recordInteraction(item.id, "cart")}>
                        Add to Cart
                      </button>
                    </div>
                  </ProductCard>
                </li>
              );
            })}
          </ResponsiveItemList>
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
  gap: 1.5rem;
  justify-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CategoryCard = styled.div`
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  width: 100%;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h2 {
    font-size: 1.2rem;
    text-transform: capitalize;
    margin-bottom: 0.5rem;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
  }
`;

const ExploreButton = styled.button`
  padding: 0.6rem 1rem;
  margin-top: 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-weight: 600;
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
    text-transform: capitalize;
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

const ResponsiveItemList = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
  li {
    display: flex;
    justify-content: center;
  }
`;

const ProductCard = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  width: 100%;
  max-width: 250px;
  min-height: 280px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: all 0.3s ease;

  img {
    width: 120px;
    height: 120px;
    object-fit: contain;
    margin-bottom: 0.5rem;
  }

  strong {
    font-size: 0.95rem;
    margin: 0.5rem 0;
    color: #333;
  }

  span {
    font-size: 0.85rem;
    color: #555;
  }

  .actions {
    margin-top: auto;
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;

    button {
      padding: 0.4rem 0.6rem;
      border: 1px solid #ccc;
      border-radius: 5px;
      background: transparent;
      cursor: pointer;
      font-size: 0.85rem;
      transition: all 0.2s ease;

      &:hover {
        background: #f0f0f0;
      }
    }

    .in-wishlist {
      background-color: #28a745;
      color: #fff;
      border: none;
      cursor: default;
    }

    .cart {
      background-color: #007bff;
      color: #fff;
      border: none;

      &:hover {
        background-color: #0056b3;
      }
    }
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
  }
`;

export default Explore;