import React, { useState } from "react";
import Navbar from "./short-components/Navbar";
import Footer from "./Footer";

const WishList = () => {
    const [wishlist, setWishlist] = useState([]);
    const [recommendations, setRecommendations] = useState([]);

    const addToWishlist = (product) => {
        if (!wishlist.includes(product)) {
            setWishlist([...wishlist, product]);
            fetchRecommendations([...wishlist, product]);
        }
    };

    const removeFromWishlist = (product) => {
        const updatedWishlist = wishlist.filter((item) => item !== product);
        setWishlist(updatedWishlist);
        fetchRecommendations(updatedWishlist);
    };

    const fetchRecommendations = (currentWishlist) => {

        // Mock recommendations based on wishlist
        const mockRecommendations = ["Product A", "Product B", "Product C"].filter(
            (item) => !currentWishlist.includes(item)
        );
        setRecommendations(mockRecommendations);
    };

    const shareWishlist = () => {
        const wishlistString = wishlist.join(", ");
        navigator.clipboard.writeText(`Check out my wishlist: ${wishlistString}`);
        alert("Wishlist copied to clipboard! Share it with your friends.");
    };

    return (
        <>
        <div>
            <Navbar />
        </div>
        
        <div>
            <h1>My Wishlist</h1>
            <div>
                <h2>Wishlist Items</h2>
                {wishlist.length > 0 ? (
                    <ul>
                        {wishlist.map((item, index) => (
                            <li key={index}>
                                {item}{" "}
                                <button onClick={() => removeFromWishlist(item)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Your wishlist is empty.</p>
                )}
            </div>

            <div>
                <h2>Add a Product</h2>
                <button onClick={() => addToWishlist("Product 1")}>Add Product 1</button>
                <button onClick={() => addToWishlist("Product 2")}>Add Product 2</button>
                <button onClick={() => addToWishlist("Product 3")}>Add Product 3</button>
            </div>

            <div>
                <h2>Recommendations</h2>
                {recommendations.length > 0 ? (
                    <ul>
                        {recommendations.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No recommendations available.</p>
                )}
            </div>

            <div>
                <h2>Share Wishlist</h2>
                <button onClick={shareWishlist}>Share Wishlist</button>
            </div>
        </div>
        <div>
            <Footer/>
        </div>
        </>
    );
};

export default WishList;