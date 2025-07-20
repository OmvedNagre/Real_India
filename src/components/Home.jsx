import React, { useEffect, useState } from 'react'
import Navbar from './short-components/NavBar'
// import SearchArea from './SearchArea'
import Footer from './Footer'
import Category from './Category'
import { calculateScores, getRecommendedProducts } from '../services/recommendationService'

export default function Home() {
  const [allProducts, setAllProducts] = useState([])
  const [recommended, setRecommended] = useState([])
  const [wishlistIds, setWishlistIds] = useState([])
  const [cartIds, setCartIds] = useState([]) // ✅ track cart state

  useEffect(() => {
    const wishlistItems = JSON.parse(localStorage.getItem('wishlistItems')) || []
    setWishlistIds(wishlistItems.map(item => item.id))

    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || []
    setCartIds(cartItems.map(item => item.id)) // ✅ load cart ids

    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        setAllProducts(data)
        const storedInteractions = JSON.parse(localStorage.getItem('interactions')) || []
        if (storedInteractions.length > 0) {
          const scores = calculateScores(storedInteractions)
          const excludedIds = new Set([...wishlistItems.map(i=>i.id), ...cartItems.map(i=>i.id)])
          const filteredProducts = data.filter(p => !excludedIds.has(p.id))
          const recs = getRecommendedProducts(filteredProducts, scores, 4) // only 4
          setRecommended(recs)
        } else {
          setRecommended([])
        }
      })
  }, [])

  const addToWishlist = (item) => {
    const stored = JSON.parse(localStorage.getItem('wishlistItems')) || []
    if (!stored.find(p => p.id === item.id)) {
      const updated = [...stored, item]
      localStorage.setItem('wishlistItems', JSON.stringify(updated))
      setWishlistIds(prev => [...prev, item.id])
    }
    const interactions = JSON.parse(localStorage.getItem('interactions')) || []
    interactions.push({ productId: item.id, category: item.category, type: "wishlist" })
    localStorage.setItem('interactions', JSON.stringify(interactions))
  }

  const addToCart = (item) => {
    const stored = JSON.parse(localStorage.getItem('cartItems')) || []
    if (!stored.find(p => p.id === item.id)) {
      const updated = [...stored, item]
      localStorage.setItem('cartItems', JSON.stringify(updated))
      setCartIds(prev => [...prev, item.id]) // ✅ update state
    }
    const interactions = JSON.parse(localStorage.getItem('interactions')) || []
    interactions.push({ productId: item.id, category: item.category, type: "cart" })
    localStorage.setItem('interactions', JSON.stringify(interactions))
  }

  const renderStars = (rate) => {
    const rounded = Math.round(rate)
    return "⭐".repeat(rounded)
  }

  return (
    <div>
      <Navbar></Navbar>

      {recommended.length > 0 ? (
        <section className="recommended-products" style={{ padding: '1rem', textAlign: 'center' }}>
          <h2>Recommended for you</h2>
          <div
            className="recommended-grid"
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '1rem',
              alignItems: 'stretch',
              flexWrap: 'nowrap',
              overflowX: 'auto',
              padding: '1rem'
            }}
          >
            {recommended.map(product => {
              const inWishlist = wishlistIds.includes(product.id)
              const inCart = cartIds.includes(product.id)
              return (
                <div
                  key={product.id}
                  className="recommended-card"
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
                    textAlign: 'center',
                    flex: '0 0 auto'
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
                        style={{
                          maxWidth: '100%',
                          maxHeight: '100%',
                          objectFit: 'contain'
                        }}
                      />
                    </div>
                    <p style={{ fontSize: '0.9rem', fontWeight: 'bold', textAlign: 'center', flexGrow: 0 }}>{product.title}</p>
                    <p style={{ fontSize: '0.8rem', margin: '0.3rem 0' }}>${product.price}</p>
                    <p style={{ fontSize: '0.75rem', color: '#555' }}>
                      {renderStars(product.rating.rate)} ({product.rating.count})
                    </p>
                  </div>
                  <div
                    style={{
                      marginTop: 'auto',
                      display: 'flex',
                      justifyContent: 'space-between',
                      gap: '0.5rem',
                      flexWrap: 'wrap'
                    }}
                  >
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
                        if (!inWishlist) addToWishlist(product)
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
                        if (!inCart) addToCart(product)
                      }}
                      disabled={inCart}
                    >
                      {inCart ? '✓ In Cart' : '🛒 Cart'}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      ) : (
        <section className="recommended-products" style={{ padding: '1rem', textAlign: 'center' }}>
          <h2>Recommended for you</h2>
          <p style={{ fontSize: '0.9rem', color: '#666' }}>
            Add some products to your wishlist to see personalized recommendations.
          </p>
        </section>
      )}

      <Category></Category>
      <Footer></Footer>
    </div>
  )
}
