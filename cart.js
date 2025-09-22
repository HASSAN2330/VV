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
      price: 124.00,
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
    /* p2 */
    {
      id: '2',
      name: 'Huile Fortifiante Ongles & Cuticules',
      price: 115.00,
      image: 'images/AISelect_20250624_015646_OneDrive.jpg',
      gallery: [
        'images/AISelect_20250624_015720_OneDrive.jpg'
      ],
      description: '🌿 Huile Fortifiante Ongles & Cuticules – 100% Naturelle Offrez à vos ongles la cure naturelle qu’ils méritent ! Notre Huile Fortifiante pour Ongles & Cuticules est une formule précieuse, riche en huile de ricin, huile d’amande douce, et huile essentielle de citron. Un mélange 100% naturel pour renforcer, hydrater, et embellir vos ongles et cuticules dès la première application.',
      
      
      details: [
        '•	Renforce la structure des ongles cassants et secs',
        '•	Hydrate et nourrit en profondeur les cuticulse',
        '•	Stimule la pousse des ongles grâce à l’huile de ricin',
        '•	Laisse un parfum frais et délicat de citron',
      ]
    },
    /* p3 */
    {
      id: '3',
      name: 'RAMCHA Eyelash Serum',
      price: 89.00,
      image: 'images/rm2.jpg',
      gallery: [
        'images/rm2.jpg'
      ],
      description: 'For Longer, Thicker & Healthier Lashes & Brows Discover the power of nature with RAMCHA Eyelash Serum, expertly crafted to nourish and strengthen your lashes and eyebrows.Infused with a luxurious blend of plant - based oils, this serum promotes natural growth, reduces breakage, and adds a soft, healthy shine.',
      
      
      details: [
        '•Stimulates natural lash and brow growth',
        '•Strengthens hair follicles and reduces thinning',
        '•Deeply moisturizes with no irritation',
        '•Gentle for daily use on sensitive areas',
      ]
    },
    /* p4 */
  {
  id: '4',
  name: 'aker fassi scrub',
  price: 89.00,
  image: 'images/aker.jpg',
  gallery: [
    'images/aker.jpg'
  ],
  description: `Profitez d’une beauté naturelle avec Bous Kiss Akar Fassi Scrub, inspiré du secret ancestral de la beauté marocaine – l’Akar Fassi. Sa formule riche en poudre de coquelicot naturel offre à votre peau une exfoliation douce, élimine les cellules mortes et lui redonne son éclat naturel.

💎 Grâce aux propriétés reconnues de l’Akar Fassi, connues pour éclaircir le teint et unifier la peau, ce gommage aide à adoucir la texture et à révéler une lueur rosée et saine.

🌿 Idéal pour une utilisation régulière afin d’obtenir une peau nette, douce et pleine de vitalité.`,
  
  details: [
    '• Purifie la peau et élimine en douceur les cellules mortes',
    '• Offre une douceur soyeuse et un aspect sain à la peau',
    '• Contient de l’Akar Fassi, reconnu pour ses propriétés naturelles d’éclaircissement et d’unification du teint',
    '• Ravive l’éclat du visage et lui donne une luminosité rosée naturelle',
  ]
},

    /* 5 */
  {
  id: '5',
  name: 'aker fassi scrub',
  price: 124.00,
  image: 'images/aker.jpg',
  gallery: [
    'images/aker2.jpg'
  ],
  description: `Baume Bous Bous - Akar Fassi

Offrez à votre peau un soin raffiné avec le Baume Bous Bous Akar Fassi, inspiré du secret ancestral de la beauté marocaine.

Enrichi en Akar Fassi naturel, ce baume nourrit intensément la peau et révèle un éclat naturel tout en laissant une sensation de douceur et de fraîcheur durable.

💎 Grâce aux propriétés reconnues de l’Akar Fassi, réputé pour illuminer le teint et unifier la peau, ce baume nourrit intensément, adoucit la texture et révèle une lueur rosée naturelle et éclatante.

🌿 Idéal pour une utilisation quotidienne afin d’hydrater, protéger et sublimer la peau avec douceur et vitalité.
  
  details: [
    '• Purifie la peau et élimine en douceur les cellules mortes',
    '• Offre une douceur soyeuse et un aspect sain à la peau',
    '• Contient de l’Akar Fassi, reconnu pour ses propriétés naturelles d’éclaircissement et d’unification du teint',
    '• Ravive l’éclat du visage et lui donne une luminosité rosée naturelle',
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
