document.addEventListener('DOMContentLoaded', () => {
  // Get product ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');
  const product = window.getProductById(productId);
  
  if (!product) {
    window.showToast('Product not found!', 'error');
    setTimeout(() => window.location.href = 'index.html', 2000);
    return;
  }
  
  // Set up image gallery
  const mainImage = document.querySelector('.main-image img');
  const thumbnailGrid = document.querySelector('.thumbnail-grid');
  
  // Set main image
  mainImage.src = product.image;
  
  // Create thumbnails
  thumbnailGrid.innerHTML = product.gallery.map((img, index) => `
    <div class="thumbnail ${index === 0 ? 'active' : ''}">
      <img src="${img}" alt="${product.name} thumbnail ${index + 1}">
    </div>
  `).join('');
  
  // Add thumbnail click handlers
  document.querySelectorAll('.thumbnail').forEach(thumb => {
    thumb.addEventListener('click', () => {
      document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
      mainImage.src = thumb.querySelector('img').src;
    });
  });
  
  // Set product info
  document.querySelector('.product-title').textContent = product.name;
  document.querySelector('.product-price').textContent = `${product.price.toFixed(2)}DH`;
  document.querySelector('.product-description').textContent = product.description;
  
  // Set product details
  const detailsList = document.querySelector('.product-details-list');
  detailsList.innerHTML = product.details.map(detail => `
    <div class="detail-item">
      <i class="fas fa-circle-check"></i>
      <span>${detail}</span>
    </div>
  `).join('');
  
  // Add to cart functionality
  document.querySelector('.add-to-cart-btn').addEventListener('click', () => {
    window.cartActions.add(product);
    window.showToast(`${product.name} added to cart 🛒`, 'success');
    
    // Add visual feedback
    const btn = document.querySelector('.add-to-cart-btn');
    btn.classList.add('added');
    setTimeout(() => btn.classList.remove('added'), 500);
  });
});
