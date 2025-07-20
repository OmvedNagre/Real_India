import React, { useState } from "react";
import Navbar from "./short-components/Navbar";
import Footer from "./Footer";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // just simulate submission
    setSubmitted(true);

    // reset after 2 seconds
    setTimeout(() => {
      setName("");
      setEmail("");
      setMessage("");
      setSubmitted(false);
    }, 2000);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ flex: 1, padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
        <h1 style={{ textAlign: "center", marginBottom: "1.5rem" }}>Contact Us</h1>
        <p style={{ fontSize: "1.1rem", lineHeight: "1.6", marginBottom: "1.5rem", textAlign: "center" }}>
          We’d love to hear from you! Whether you have a question about products, features, or anything else,
          our team is ready to answer all your questions.
        </p>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <label style={{ fontWeight: "bold" }}>Name</label>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              padding: "0.6rem",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          <label style={{ fontWeight: "bold" }}>Email</label>
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              padding: "0.6rem",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          <label style={{ fontWeight: "bold" }}>Message</label>
          <textarea
            rows="5"
            placeholder="Write your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{
              padding: "0.6rem",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          <button
            type="submit"
            style={{
              marginTop: "1rem",
              padding: "0.8rem",
              backgroundColor: submitted ? "#28a745" : "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              fontSize: "1rem",
              cursor: "pointer",
            }}
          >
            {submitted ? "Submitted!" : "Send Message"}
          </button>
        </form>
        <div style={{ marginTop: "2rem", textAlign: "center" }}>
          <p><strong>Email:</strong> support@shopnexa.com</p>
          <p><strong>Phone:</strong> +91 6281879270</p>
          <p><strong>Address:</strong> 123 Nexa Street, Hitech City</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Contact;