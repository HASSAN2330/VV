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
      price: 124.00,
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
  name: 'Aker fassi scrub',
  price: 89.00,
  image: 'images/IMG-20251025-WA0025.jpg',
  gallery: [
    'images/IMG-20251025-WA0022.jpg'
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
  name: 'Aker fassi balm',
  price: 89.00,
  image: 'images/aker2.jpg',
  gallery: [
    'images/aker2.jpg'
  ],
  description: `Baume Bous Bous - Akar Fassi

'Offrez à votre peau un soin raffiné avec le Baume Bous Bous Akar Fassi, inspiré du secret ancestral de la beauté marocaine.

 'Enrichi en Akar Fassi naturel, ce baume nourrit intensément la peau et révèle un éclat naturel tout en laissant une sensation de douceur et de fraîcheur durable.

  💎 grâce aux propriétés reconnues de l’Akar Fassi, réputé pour illuminer le teint et unifier la peau, ce baume nourrit intensément, adoucit la texture et révèle une lueur rosée naturelle et éclatante.

    🪄 ' idéal pour une utilisation quotidienne afin d’hydrater, protéger et sublimer la peau avec douceur et vitalité.`,
  
   details: [
    '• Purifie la peau et élimine en douceur les cellules mortes',
    '• Offre une douceur soyeuse et un aspect sain à la peau',
    '• Contient de l’Akar Fassi, reconnu pour ses propriétés naturelles d’éclaircissement et d’unification du teint',
    '• Ravive l’éclat du visage et lui donne une luminosité rosée naturelle',
]
},
    
{
id: '6',
name: 'Serum Niacinamide',
price:  189.00,
image: 'images/mockup-gray-serum-50ml-main.png',
gallery: [
'images/mockup-gray-serum-50ml-left.png',
'images/mockup-gray-serum-50ml-right.png',
'images/mockup-gray-serum-50ml-main.png',
],
description: `Serum Niacinamide

'Sérum avancé conçu pour améliorer l’apparence de la peau et unifier son teint. Il contient de la niacinamide à une concentration efficace, reconnue pour ses propriétés aidant à réduire l’apparence des pores et à contrôler l’excès de sébum, ce qui contribue à améliorer la texture de la peau et à diminuer les imperfections. Avec une utilisation régulière, il offre à la peau un éclat naturel ainsi qu’un aspect plus sain et plus pur. ✨
`,

INGREDIENTS: [
'• Niacinamide',
'• Extrait d'Aloe Vera',
'• Vitamine E',
'• Acide Hyaluronique',
]
},
    
{
id: '7',
name: 'COLLAGEN MARINE',
price:  249.00,
image: 'mockup-capsule-white-2-main.png',
gallery: [
'images/mockup-capsule-white-2-left.png',
'images/mockup-capsule-white-2-right.png',
'images/mockup-capsule-white-2-main.png',
],
description: `COLLAGEN MARINE

'Complément alimentaire haut de gamme à base de collagène marin hydrolysé, facilement absorbé, enrichi en vitamine C pour favoriser la production naturelle de collagène. Il aide à améliorer l’élasticité de la peau, à renforcer les cheveux et les ongles, à soutenir la santé des articulations et à réduire les signes du vieillissement. Une formule pure, au goût naturel et sucrée à la stévia, idéale pour prendre soin de la beauté de l’intérieur. ✨
`,

INGREDIENTS: [
'• Collagène marin hydrolysé ',
'• Vitamine C (Acide ascorbique)',
'• Gomme arabique (support)',
'•Arôme naturel (selon la version)',
'•Édulcorant naturel : Stevia',
]
},
    
{
id: '8',
name: 'CREME RETINOLE',
price:  129.00,
image: 'mockup-white-oil-60ml-main.png',
gallery: [
'images/mockup-white-oil-60ml-left.png',
'images/mockup-white-oil-60ml-right.png',
'images/mockup-white-oil-60ml-main.png',
],
description: `CREME RETINOLE

'La crème au rétinol est un produit de soin de la peau conçu pour améliorer l’apparence de la peau et favoriser son renouvellement de manière efficace. Elle contient une forte concentration de rétinol, reconnu pour sa capacité à stimuler le renouvellement des cellules cutanées et à réduire l’apparence des ridules et des rides. La crème aide également à améliorer la texture de la peau et à unifier son teint, contribuant ainsi à une peau plus jeune et plus éclatante. ✨
`,

INGREDIENTS: [
'• Émulsion de cire ',
'• Gel d'aloe Vera',
'• Rétinol',
'•Acide lactique',
'•Vitamine C',
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
