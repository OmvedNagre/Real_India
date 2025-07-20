import React from "react";
import Navbar from "./short-components/NavBar";
import Footer from "./Footer";

function About() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ flex: 1, padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
        <h1 style={{ textAlign: "center", marginBottom: "1.5rem" }}>About Us</h1>
        <p style={{ fontSize: "1.1rem", lineHeight: "1.6", marginBottom: "1rem" }}>
          Welcome to <strong>Shop Nexa</strong>, your go-to destination for a seamless online shopping experience.
          We bring you a curated selection of products across diverse categories, all in one place.
        </p>
        <p style={{ fontSize: "1.1rem", lineHeight: "1.6", marginBottom: "1rem" }}>
          Our mission is simple: <em>to make online shopping easy, fun, and rewarding.</em> 
          With a user-friendly interface, a point-based recommendation system, and carefully chosen categories,
          we aim to help you find exactly what you need — and discover things you’ll love.
        </p>
        <p style={{ fontSize: "1.1rem", lineHeight: "1.6", marginBottom: "1rem" }}>
          At <strong>Shop Nexa</strong>, we believe that shopping is not just about buying products, 
          but also about exploring trends, discovering new brands, and enjoying the process. 
          That’s why we are constantly improving our platform to serve you better.
        </p>
        <p style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>
          Thank you for being a part of our journey. We hope you enjoy your time here, 
          and we’re always here to help if you have any questions or feedback.
        </p>
      </div>
      <Footer />
    </div>
  );
}

export default About;