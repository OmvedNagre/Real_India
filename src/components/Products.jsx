import React, { useEffect, useState } from 'react';
import Navbar from './short-components/Navbar';
import Footer from './Footer';

function Products() {
  const [products, setProducts] = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]);
  const [cartIds, setCartIds] = useState([]); // ✅ track cart state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // 4 columns x 2 rows

  // Fetch and randomize products
  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem('wishlistItems')) || [];
    setWishlistIds(storedWishlist.map(p => p.id));

    const storedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartIds(storedCart.map(p => p.id)); // ✅ load cart ids

    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        const shuffled = data.sort(() => 0.5 - Math.random());
        setProducts(shuffled);
      });
  }, []);

  // Pagination logic
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentProducts = products.slice(indexOfFirst, indexOfLast);

  const nextPage = () => {
    if (currentPage < Math.ceil(products.length / itemsPerPage)) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const addToWishlist = (item) => {
    const stored = JSON.parse(localStorage.getItem('wishlistItems')) || [];
    if (!stored.find(p => p.id === item.id)) {
      const updated = [...stored, item];
      localStorage.setItem('wishlistItems', JSON.stringify(updated));
      setWishlistIds(prev => [...prev, item.id]);
    }
  };

  const addToCart = (item) => {
    const stored = JSON.parse(localStorage.getItem('cartItems')) || [];
    if (!stored.find(p => p.id === item.id)) {
      const updated = [...stored, item];
      localStorage.setItem('cartItems', JSON.stringify(updated));
      setCartIds(prev => [...prev, item.id]); // ✅ update state
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ flex: 1, padding: '1rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>All Products</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1rem',
            justifyItems: 'center'
          }}
        >
          {currentProducts.map(product => {
            const inWishlist = wishlistIds.includes(product.id);
            const inCart = cartIds.includes(product.id); // ✅ check if in cart
            return (
              <div
                key={product.id}
                style={{
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  padding: '0.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '350px',
                  width: '220px',
                  boxSizing: 'border-box',
                  textAlign: 'center'
                }}
              >
                <div style={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div
                    style={{
                      width: '150px',
                      height: '150px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      overflow: 'hidden',
                      marginBottom: '0.5rem'
                    }}
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                    />
                  </div>
                  <p style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{product.title}</p>
                  <p style={{ fontSize: '0.8rem', margin: '0.3rem 0' }}>${product.price}</p>
                  <p style={{ fontSize: '0.75rem', color: '#555' }}>
                    {'⭐'.repeat(Math.round(product.rating.rate))} ({product.rating.count})
                  </p>
                </div>
                <div style={{ marginTop: 'auto', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <button
                    style={{
                      flex: 1,
                      padding: '0.4rem',
                      backgroundColor: inWishlist ? '#28a745' : '#f50057',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: inWishlist ? 'default' : 'pointer',
                      textAlign: 'center'
                    }}
                    onClick={() => {
                      if (!inWishlist) addToWishlist(product);
                    }}
                    disabled={inWishlist}
                  >
                    {inWishlist ? '✓ In Wishlist' : '❤️ Wishlist'}
                  </button>
                  <button
                    style={{
                      flex: 1,
                      padding: '0.4rem',
                      backgroundColor: inCart ? '#28a745' : '#007bff',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: inCart ? 'default' : 'pointer',
                      textAlign: 'center'
                    }}
                    onClick={() => {
                      if (!inCart) addToCart(product);
                    }}
                    disabled={inCart}
                  >
                    {inCart ? '✓ In Cart' : '🛒 Cart'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem', gap: '1rem' }}>
          <button onClick={prevPage} disabled={currentPage === 1} style={{ padding: '0.5rem 1rem' }}>
            Prev
          </button>
          <span>Page {currentPage}</span>
          <button
            onClick={nextPage}
            disabled={currentPage === Math.ceil(products.length / itemsPerPage)}
            style={{ padding: '0.5rem 1rem' }}
          >
            Next
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Products;