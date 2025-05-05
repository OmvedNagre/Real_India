import { useState } from 'react'
import './App.css'

import Home from'./components/Home'
import About  from './components/About'
import Cart from './components/Cart'
import Contact from './components/Contact'
import WishList from './components/WishList'
import Explore from './components/Explore'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

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
      </Routes>
    </BrowserRouter>
  );
}

export default App
