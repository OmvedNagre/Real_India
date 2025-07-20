import React from "react";
import Navbar from "./short-components/Navbar";
import Footer from "./Footer";

function Blog() {
  const blogPosts = [
    {
      title: "Top 5 Trending Gadgets of 2025",
      date: "July 15, 2025",
      excerpt:
        "Discover the most innovative gadgets taking 2025 by storm. From smart wearables to home automation, here’s what you should check out...",
    },
    {
      title: "How to Choose the Perfect Product Online",
      date: "July 10, 2025",
      excerpt:
        "Online shopping can be overwhelming with so many choices. Here are expert tips to help you choose products that fit your needs and budget.",
    },
    {
      title: "Behind the Scenes at Shop Nexa",
      date: "July 5, 2025",
      excerpt:
        "Ever wondered how Shop Nexa curates its collections? Let’s take you behind the scenes and show you our process of selecting top-quality products.",
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ flex: 1, padding: "2rem", maxWidth: "1000px", margin: "0 auto" }}>
        <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>Our Blog</h1>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {blogPosts.map((post, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "#fff",
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "1rem",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                transition: "transform 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-5px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            >
              <h2 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>{post.title}</h2>
              <p style={{ fontSize: "0.9rem", color: "#777", marginBottom: "0.8rem" }}>{post.date}</p>
              <p style={{ fontSize: "1rem", lineHeight: "1.5" }}>{post.excerpt}</p>
              <button
                style={{
                  marginTop: "1rem",
                  padding: "0.5rem 1rem",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Read More
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Blog;