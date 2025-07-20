/**
 * recommendationService.js
 *
 * This service manages the point-based recommendation logic.
 * It is modular so you can easily adjust scoring rules or extend logic later.
 */

// Points configuration for each type of interaction
const POINTS = {
  view: 1,
  wishlist: 3,
  cart: 5,
};

/**
 * Record an interaction to localStorage.
 * @param {number} productId - The product's ID
 * @param {string} type - One of 'view', 'wishlist', 'cart'
 */
export function recordInteraction(productId, type) {
  const existing = JSON.parse(localStorage.getItem('interactions') || '[]');
  existing.push({ productId, type });
  localStorage.setItem('interactions', JSON.stringify(existing));
}

/**
 * Calculate scores based on user interactions.
 * @param {Array} interactions - Array like:
 *   [{ productId: 1, type: 'view' }, { productId: 1, type: 'wishlist' }]
 * @returns {Object} - { productId: score, ... }
 */
export function calculateScores(interactions) {
  const scores = {};
  interactions.forEach(({ productId, type }) => {
    const points = POINTS[type] || 0;
    scores[productId] = (scores[productId] || 0) + points;
  });
  return scores;
}

/**
 * Get recommended products sorted by score.
 * @param {Array} products - All products from your API.
 * @param {Object} scores - Output of calculateScores().
 * @param {number} limit - How many to return.
 * @returns {Array} Recommended products sorted by highest score.
 */
export function getRecommendedProducts(products, scores, limit = 10) {
  return products
    .map((p) => ({
      ...p,
      score: scores[p.id] || 0,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}