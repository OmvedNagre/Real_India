import React, { useState, useEffect } from "react";
import Navbar from "./short-components/Navbar";
import Footer from "./Footer";

const WishList = () => {
  const [wishlist, setWishlist] = useState([]);

  // Load wishlist from localStorage when component mounts
  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlistItems")) || [];
    setWishlist(storedWishlist);
  }, []);

  // Remove an item from wishlist and update localStorage
  const removeFromWishlist = (productId) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== productId);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlistItems", JSON.stringify(updatedWishlist));
  };

  const shareWishlist = () => {
    const wishlistNames = wishlist.map((item) => item.title).join(", ");
    navigator.clipboard.writeText(`Check out my wishlist: ${wishlistNames}`);
    alert("Wishlist copied to clipboard! Share it with your friends.");
  };

  return (
    <>
      <Navbar />
      <div style={{ padding: "2rem" }}>
        <h1>My Wishlist</h1>
        <div>
          <h2>Wishlist Items</h2>
          {wishlist.length > 0 ? (
            <ul style={{ listStyle: "none", padding: 0 }}>
              {wishlist.map((item) => (
                <li key={item.id} style={{ marginBottom: "1rem", border: "1px solid #ddd", borderRadius: "8px", padding: "1rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <img src={item.image} alt={item.title} style={{ width: "60px", height: "60px", objectFit: "contain" }} />
                    <div>
                      <p style={{ margin: 0, fontWeight: "bold" }}>{item.title}</p>
                      <p style={{ margin: 0, color: "#555" }}>${item.price}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    style={{
                      marginTop: "0.5rem",
                      backgroundColor: "#dc3545",
                      color: "#fff",
                      border: "none",
                      padding: "0.5rem 1rem",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>Your wishlist is empty.</p>
          )}
        </div>

        <div style={{ marginTop: "2rem" }}>
          <h2>Share Wishlist</h2>
          <button
            onClick={shareWishlist}
            style={{
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              padding: "0.5rem 1rem",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Share Wishlist
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default WishList;