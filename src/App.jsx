import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Cart from "./components/Cart";
import Contact from "./components/Contact";
import WishList from "./components/WishList";
import Explore from "./components/Explore";
import Products from "./components/Products";
import Blog from "./components/Blog"; // ✅ import Blog component

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/explore" element={<Explore />} />
        {/* ✅ Added dynamic route for category */}
        <Route path="/explore/:categoryName" element={<Explore />} />
        <Route path="/products" element={<Products />} />
        {/* ✅ Added route for Blog page */}
        <Route path="/blogs" element={<Blog />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
