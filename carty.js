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
      id: '1',
      name: 'casio quartz',
      price: 215.00,
      image: 'images/watches/1c750239c73e1b0af3721133f7949cd0.jpg',
      gallery: [
        'images/watches/1c750239c73e1b0af3721133f7949cd0.jpg'
      ],
      description:'⌚ Casio Quartz – Élégance Dorée & Intemporelle Adoptez un style raffiné avec cette montre Casio au design carré sophistiqué. Son cadran doré effet soleil capte la lumière avec subtilité, tandis que son bracelet en acier inoxydable doré apporte une touche chic et moderne. Équipée d’un mouvement Quartz précis et d’un affichage date discret, cette montre est parfaite pour sublimer vos tenues au quotidien comme lors de vos occasions spéciales.',
      details: [ '•	Mouvement Quartz précis et fiable',
'•	Cadran doré finition soleil élégant',
'•	Boîtier carré moderne et sophistiqué',
'•	Bracelet en acier inoxydable doré',
'•	Affichage de la date intégré',
'•	Style minimaliste adapté au quotidien et aux occasions',
]
    },
    /* p3 */
    {
      id: '3',
      name: 'Montre Élégance Rose',
      price: 224.00,
      image: 'images/watches/3db26d68d485fe2bec4d92ee7770061f.jpg',
      gallery: [
        'images/watches/3db26d68d485fe2bec4d92ee7770061f.jpg'
      ],
      description:
'⌚ Montre Élégance Rose Gold – Minimalisme & Raffinement Sublimez votre poignet avec cette montre au design épuré et féminin. Son cadran gris mat associé à une finition rose gold crée un contraste doux et sophistiqué. Les index fins et les chiffres romains apportent une touche classique intemporelle, tandis que son bracelet effet suédine gris assure confort et élégance au quotidien. Une pièce parfaite pour compléter vos looks avec discrétion et classe.',
   details: [
'•	Mouvement précis pour une fiabilité quotidienne',
'•	Cadran gris mat au style minimaliste',
'•	Finition rose gold élégante et tendance',
'•	Bracelet confortable effet suédine',
'•	Chiffres romains pour une touche classique',
'•	Design fin et léger adapté à toutes les occasions',
]
    },
    /* p4 */
  {
  id: '4',
  name: 'Montre Rétro Chic',
  price: 189.00,
  image: 'images/watches/f14825b2e72ca03266ba7d2bcc7d11cb.jpg',
  gallery: [
    'images/watches/f14825b2e72ca03266ba7d2bcc7d11cb.jpg'
  ],
  description: '⌚ Montre Rétro Chic "Lucky Fox" – Élégance Intemporelle Habillez votre poignet avec raffinement ! Notre montre classique Lucky Fox est une pièce maîtresse au charme vintage, associant un magnifique cadran texturé à chiffres romains et un bracelet en cuir marron. Un accessoire chic et indémodable aux finitions couleur or rose pour rehausser votre style au quotidien avec une touche de sophistication.',

details: [  
    '•	Design rectangulaire vintage avec un cadran élégant à chiffres romains',  
    '•	Bracelet souple en cuir marron texturé pour un confort optimal au quotidien',  
    '•	Boîtier aux finitions couleur or rose raffinées et aiguilles bleutées contrastantes',  
    '•	Style polyvalent et intemporel, idéal pour un look chic, professionnel ou décontracté',  
  ]

},

    /* 5 */
  {
  id: '5',
  name: 'Bracelet Jonc',
  price: 115.00,
  image: 'images/watches/c4504d6fce8d09769e641fb3a77ab586.jpg',
  gallery: [
    'images/watches/c4504d6fce8d09769e641fb3a77ab586.jpg'
  ],
    description: '✨ Bracelet Jonc "Élégance Romaine" – Or & Noir Sublimez votre poignet avec une touche de luxe ! Notre bracelet jonc est une pièce sophistiquée qui marie parfaitement l’éclat du doré à l’élégance intemporelle d’un médaillon noir orné de chiffres romains. Un bijou chic et raffiné, délicatement rehaussé d’un éclat scintillant, parfait pour illuminer vos tenues de jour comme de nuit.',

details: [  
    '•	Design jonc rigide avec un fermoir à charnière pratique et discret',  
    '•	Médaillon central noir profond entouré de chiffres romains classiques',  
    '•	Orné d’un délicat strass scintillant pour apporter une touche de lumière',  
    '•	Finition dorée éclatante, idéale à porter seule ou en accumulation avec d’autres bijoux',  
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
