import React, { useState, useEffect } from "react";
import Navbar from "./short-components/NavBar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

const WishList = () => {
  const [wishlist, setWishlist] = useState([]);
  const [toast, setToast] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlistItems")) || [];
    setWishlist(storedWishlist);
  }, []);

  const removeFromWishlist = (productId) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== productId);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlistItems", JSON.stringify(updatedWishlist));
  };

  const addToCart = (item) => {
    const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    if (!storedCart.find((p) => p.id === item.id)) {
      const updated = [...storedCart, item];
      localStorage.setItem("cartItems", JSON.stringify(updated));
    }
    removeFromWishlist(item.id);
  };

  const shareWishlist = () => {
    const wishlistNames = wishlist.map((item) => item.title).join(", ");
    navigator.clipboard.writeText(`Check out my wishlist: ${wishlistNames}`);
    setToast(true);
    setTimeout(() => setToast(false), 2000);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ flex: 1, padding: "2rem" }}>
        <h1 style={{ marginBottom: "1rem" }}>My Wishlist</h1>
        {wishlist.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {wishlist.map((item) => (
              <div
                key={item.id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "0.8rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  minHeight: "220px",
                  maxWidth: "200px",
                  margin: "0 auto",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      height: "100px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }}
                    />
                  </div>
                  <p style={{ margin: "0.3rem 0", fontWeight: "bold", fontSize: "0.9rem" }}>{item.title}</p>
                  <p style={{ margin: 0, color: "#555", fontSize: "0.85rem" }}>${item.price}</p>
                </div>
                <div style={{ marginTop: "0.5rem", display: "flex", gap: "0.3rem" }}>
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    style={{
                      flex: 1,
                      backgroundColor: "#dc3545",
                      color: "#fff",
                      border: "none",
                      padding: "0.4rem",
                      fontSize: "0.85rem",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Remove
                  </button>
                  <button
                    onClick={() => addToCart(item)}
                    style={{
                      flex: 1,
                      backgroundColor: "#28a745",
                      color: "#fff",
                      border: "none",
                      padding: "0.4rem",
                      fontSize: "0.85rem",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Move to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            style={{
              textAlign: "center",
              marginTop: "3rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
              alt="empty wishlist"
              style={{ width: "120px", marginBottom: "1rem", opacity: 0.7 }}
            />
            <p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>Your wishlist is empty.</p>
            <button
              onClick={() => navigate("/products")}
              style={{
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                padding: "0.6rem 1.2rem",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Browse Products
            </button>
          </div>
        )}

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
          {toast && (
            <div
              style={{
                marginTop: "1rem",
                padding: "0.5rem 1rem",
                backgroundColor: "#28a745",
                color: "#fff",
                borderRadius: "4px",
                display: "inline-block",
              }}
            >
              Wishlist copied to clipboard!
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default WishList;