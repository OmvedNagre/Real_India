/****
 * recommendationService.js
 *
 * This service manages the point-based recommendation logic.
 * It is modular so you can easily adjust scoring rules or extend logic later.
 */

// ✅ Updated points configuration for each type of interaction
// wishlist = 3 points, cart = 5 points, view = 1 point (already matches your logic)
const POINTS = {
  view: 1,
  wishlist: 3,
  cart: 5,
};

/**
 * Record an interaction to localStorage.
 * Now also allows storing category for better recommendations if needed.
 * @param {number} productId - The product's ID
 * @param {string} type - One of 'view', 'wishlist', 'cart'
 * @param {string} category - Optional category of product
 */
export function recordInteraction(productId, type, category = null) {
  const existing = JSON.parse(localStorage.getItem('interactions') || '[]');
  const interaction = { productId, type };
  if (category) {
    interaction.category = category;
  }
  existing.push(interaction);
  localStorage.setItem('interactions', JSON.stringify(existing));
}

/**
 * Calculate scores based on user interactions.
 * Scores are summed across all interaction types with their weights.
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
 * Removes products with zero score and sorts by highest score.
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
    .filter((p) => p.score > 0) // ✅ only include items with positive score
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}