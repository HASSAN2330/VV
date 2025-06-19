document.addEventListener('DOMContentLoaded', function() {
  // ======================
  //  Toast Notification System
  // ======================
  const toast = document.createElement('div');
  toast.className = 'toast-notification';
  toast.innerHTML = `
    <span class="toast-message"></span>
    <div class="toast-progress"></div>
  `;
  document.body.appendChild(toast);
  
  const showToast = (message, type = 'success') => {
    const toastMessage = toast.querySelector('.toast-message');
    toastMessage.textContent = message;
    toast.className = `toast-notification ${type}`;
    void toast.offsetWidth; // Trigger reflow
    toast.classList.add('active');
    setTimeout(() => toast.classList.remove('active'), 3000);
  };
  
  // ======================
  //  Product Database
  // ======================
 const products = [
  {
    id: '1',
    name: 'Crème Solaire Multifonction SPF 50+',
    price: 29.99,
    image: 'images/hh.jpg',
    gallery: [
      'images/scene_006_v3.jpg',
      'images/DSC00089.jpg',
      'images/DSC00045_ff684f91-e8de-4d1c-b19c-210952c3f7b6.jpg',
      'images/hh.jpg'
    ],
    description: 'avec des filtres solaires chimiques, se fond sans effort dans toutes les carnations et offre une sensation de légèreté. Il offre une protection SPF 50 et laisse un fini rosé et éclatant. Elle se présente dans un format pratique de 50 ml pour une application et un transport aisés.',
    details: [
      'Sétale facilement',
      'Pas de boulochage',
      'Pas de traces blanches',
      'Non grasse',
      'Ne pique pas les yeux',
      'Fonctionne bien sous le maquillage'
    ]
  },
  // Add similar structure for other products
  {
  id: '2',
  name: 'Lipstick',
  price: 29.99,
  image: 'images/th.jpg',
  gallery: [
    'images/lipstick-angle1.jpg',
    'images/th.jpg',
    'images/lipstick-package.jpg',
    'images/lipstick-swatches.jpg'
  ],
  description: 'Luxurious matte finish with long-lasting color',
  details: [
    'Weight: 3.2g',
    'Matte finish',
    'Vegan formula',
    '20+ shades available'
  ]
},
{
  id: '3',
  name: 'Velvet Matte Lipstick',
  price: 114.99,
  image: 'images/thr.jpg',
  gallery: [
    'images/lipstick-angle1.jpg',
    'images/th.jpg',
    'images/lipstick-package.jpg',
    'images/lipstick-swatches.jpg'
  ],
  description: 'Luxurious matte finish with long-lasting color',
  details: [
    'Weight: 3.2g',
    'Matte finish',
    'Vegan formula',
    '20+ shades available'
  ]
},
   {
    id: '7',
    name: 'Crème Solaire Multifonction SPF 50+',
    price: 29.99,
    image: 'images/hh.jpg',
    gallery: [
      'images/BILLAVILUXE.zip',
      'images/DSC00089.jpg',
      'images/DSC00045_ff684f91-e8de-4d1c-b19c-210952c3f7b6.jpg',
      'images/hh.jpg'
    ],
    description: 'avec des filtres solaires chimiques, se fond sans effort dans toutes les carnations et offre une sensation de légèreté. Il offre une protection SPF 50 et laisse un fini rosé et éclatant. Elle se présente dans un format pratique de 50 ml pour une application et un transport aisés.',
    details: [
      'Sétale facilement',
      'Pas de boulochage',
      'Pas de traces blanches',
      'Non grasse',
      'Ne pique pas les yeux',
      'Fonctionne bien sous le maquillage'
    ]
  },
];
  
  // ======================
  //  Cart System
  // ======================
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  const cartActions = {
    add: (product) => {
      const existingItem = cart.find(item => item.id === product.id);
      existingItem ? existingItem.quantity++ : cart.push({ ...product, quantity: 1 });
      cartActions.save();
      updateCartCount();
    },
    
    remove: (productId) => {
      cart = cart.filter(item => item.id !== productId);
      cartActions.save();
      updateCartCount();
    },
    
    updateQuantity: (productId, newQuantity) => {
      const item = cart.find(item => item.id === productId);
      if (item) {
        item.quantity = Math.max(1, newQuantity);
        cartActions.save();
        updateCartCount();
      }
    },
    
    save: () => {
      localStorage.setItem('cart', JSON.stringify(cart));
      if (document.getElementById('cart-table-body')) displayCartItems();
    },
    
    clear: () => {
      cart = [];
      cartActions.save();
      updateCartCount();
    }
  };
  
  // ======================
  //  Product Rendering
  // ======================
 function renderProducts() {
  const productGrid = document.querySelector('.product-grid');
  if (!productGrid) return;
  
  productGrid.innerHTML = products.map(product => `
      <div class="product-card" data-id="${product.id}">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p class="price">${product.price.toFixed(2)}DH</p>
        <button class="add-to-cart" 
                data-id="${product.id}"
                aria-label="Add ${product.name} to cart">
          Add to Cart
        </button>
      </div>
    `).join('');
    
    // Product card click handling
    document.querySelectorAll('.product-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (!e.target.closest('.add-to-cart')) {
          window.location.href = `product-details.html?id=${card.dataset.id}`;
        }
      });
    });
    
    // Add to cart functionality
    document.querySelectorAll('.add-to-cart').forEach(button => {
      button.addEventListener('click', () => {
        const product = products.find(p => p.id === button.dataset.id);
        cartActions.add(product);
        showToast(`${product.name} added to cart 🛒`, 'success');
      });
    });
  }
  
  // ======================
  //  Cart UI Functions
  // ======================
  const updateCartCount = () => {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelectorAll('.cart-count').forEach(el => el.textContent = count);
  };
  
  const displayCartItems = () => {
    const cartTableBody = document.getElementById('cart-table-body');
    if (!cartTableBody) return;
    
    cartTableBody.innerHTML = cart.length ?
      cart.map(item => `
        <tr>
          <td><img src="${item.image}" class="cart-product-image" alt="${item.name}"></td>
          <td>${item.name}</td>
          <td>${item.price.toFixed(2)}DH</td>
          <td>
            <button class="quantity-btn minus" data-id="${item.id}">-</button>
            <span class="quantity">${item.quantity}</span>
            <button class="quantity-btn plus" data-id="${item.id}">+</button>
          </td>
          <td>${(item.price * item.quantity).toFixed(2)}DH</td>
          <td><button class="remove-btn" data-id="${item.id}"><i class="fas fa-trash"></i></button></td>
        </tr>
      `).join('') : '<tr><td colspan="6">Your cart is empty</td></tr>';
    
    addCartEventListeners();
    updateCartSummary();
  };
  
  const addCartEventListeners = () => {
    document.querySelectorAll('.quantity-btn').forEach(button => {
      button.addEventListener('click', () => {
        const item = cart.find(item => item.id === button.dataset.id);
        const newQuantity = button.classList.contains('plus') ?
          item.quantity + 1 : item.quantity - 1;
        
        cartActions.updateQuantity(item.id, newQuantity);
        showToast(`${item.name} quantity updated to ${newQuantity}`, 'info');
      });
    });
    
    document.querySelectorAll('.remove-btn').forEach(button => {
      button.addEventListener('click', () => {
        const item = cart.find(item => item.id === button.dataset.id);
        cartActions.remove(item.id);
        showToast(`${item.name} removed from cart`, 'warning');
      });
    });
  };
  
  const updateCartSummary = () => {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 0 ? 5.99 : 0;
    
    document.getElementById('subtotal').textContent = `${subtotal.toFixed(2)}DH`;
    document.getElementById('shipping').textContent = `${shipping.toFixed(2)}DH`;
    document.getElementById('total').textContent = `${(subtotal + shipping).toFixed(2)}DH`;
  };
  
  // ======================
  //  Initialization
  // ======================
  if (document.querySelector('.product-grid')) renderProducts();
  updateCartCount();
  if (document.getElementById('cart-table-body')) displayCartItems();
  
  // ======================
  //  Checkout System
  // ======================
  document.getElementById('checkout-btn')?.addEventListener('click', () => {
    if (cart.length === 0) {
      showToast('Your cart is empty!', 'warning');
      return;
    }
    
    showToast('Order placed successfully! 🎉', 'success');
    cartActions.clear();
  });
  
  // ======================
  //  Global Exports
  // ======================
  window.cartActions = cartActions;
  window.showToast = showToast;
  window.getProductById = (id) => products.find(p => p.id === id);
});
