import React, { useEffect, useState } from 'react'
import Navbar from './short-components/Navbar'
import SearchArea from './SearchArea'
import Footer from './Footer'
import Category from './Category'
import { calculateScores, getRecommendedProducts } from '../services/recommendationService'

export default function Home() {
  const [allProducts, setAllProducts] = useState([])
  const [recommended, setRecommended] = useState([])

  useEffect(() => {
    // Fetch products from API
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        setAllProducts(data)

        // Mock interactions for demo
        const interactions = [
          { productId: 1, type: 'view' },
          { productId: 2, type: 'wishlist' },
          { productId: 2, type: 'view' },
          { productId: 3, type: 'cart' },
        ]
        const scores = calculateScores(interactions)
        const recs = getRecommendedProducts(data, scores, 5)
        setRecommended(recs)
      })
  }, [])

  return (
    <div>
      <Navbar></Navbar>
      <SearchArea></SearchArea>

      {recommended.length > 0 && (
        <section className="recommended-products" style={{ padding: '1rem' }}>
          <h2>Recommended for you</h2>
          <div className="recommended-grid" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {recommended.map(product => (
              <div
                key={product.id}
                className="recommended-card"
                style={{
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  padding: '0.5rem',
                  width: '150px'
                }}
              >
                <img src={product.image} alt={product.title} style={{ width: '100%', height: 'auto' }} />
                <p style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{product.title}</p>
                <p style={{ fontSize: '0.8rem' }}>${product.price}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <Category></Category>
      <Footer></Footer>
    </div>
  )
}
