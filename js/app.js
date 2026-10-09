/**
 * LUMINA LUXE - Main Application Script
 * Handles Cart, Wishlist, Product Filtering, Modals, Checkout & Theme
 */

// State Management
const AppState = {
  cart: JSON.parse(localStorage.getItem('lumina_cart')) || [],
  wishlist: JSON.parse(localStorage.getItem('lumina_wishlist')) || [],
  category: 'all',
  sortBy: 'featured',
  searchQuery: '',
  maxPrice: 600,
  appliedPromo: null,
  activeQuickViewProduct: null,
  FREE_SHIPPING_THRESHOLD: 150
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  renderProducts();
  renderFlashDeals();
  renderTestimonials();
  updateCartUI();
  updateWishlistUI();
  initCountdownTimer();
  initEventListeners();
});

/* ==========================================================================
   THEME TOGGLE (Dark / Light)
   ========================================================================== */
function initTheme() {
  const savedTheme = localStorage.getItem('lumina_theme') || 'dark';
  document.documentElement.setAttribute('data-bs-theme', savedTheme);
  updateThemeIcon(savedTheme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-bs-theme') || 'dark';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-bs-theme', newTheme);
  localStorage.setItem('lumina_theme', newTheme);
  updateThemeIcon(newTheme);
  showToast(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} Mode`, 'info');
}

function updateThemeIcon(theme) {
  const themeBtn = document.getElementById('themeToggleBtn');
  if (themeBtn) {
    themeBtn.innerHTML = theme === 'dark' 
      ? '<i class="bi bi-sun-fill text-warning"></i>' 
      : '<i class="bi bi-moon-stars-fill text-primary"></i>';
  }
}

/* ==========================================================================
   PRODUCT CATALOG RENDERING & FILTERING
   ========================================================================== */
function getFilteredProducts() {
  return PRODUCTS.filter(product => {
    const matchCategory = AppState.category === 'all' || product.category === AppState.category;
    const matchSearch = product.name.toLowerCase().includes(AppState.searchQuery.toLowerCase()) ||
                        product.description.toLowerCase().includes(AppState.searchQuery.toLowerCase());
    const matchPrice = product.price <= AppState.maxPrice;
    return matchCategory && matchSearch && matchPrice;
  }).sort((a, b) => {
    if (AppState.sortBy === 'price-low') return a.price - b.price;
    if (AppState.sortBy === 'price-high') return b.price - a.price;
    if (AppState.sortBy === 'rating') return b.rating - a.rating;
    if (AppState.sortBy === 'name') return a.name.localeCompare(b.name);
    return 0; // 'featured' retains catalog order
  });
}

function renderProducts() {
  const container = document.getElementById('productGridContainer');
  const countLabel = document.getElementById('productsCountLabel');
  if (!container) return;

  const products = getFilteredProducts();

  if (countLabel) {
    countLabel.textContent = `Showing ${products.length} product${products.length === 1 ? '' : 's'}`;
  }

  if (products.length === 0) {
    container.innerHTML = `
      <div class="col-12 text-center py-5">
        <div class="glass-panel p-5 d-inline-block">
          <i class="bi bi-search display-3 text-muted mb-3 d-block"></i>
          <h4>No products found</h4>
          <p class="text-muted">Try adjusting your filters, search keyword, or price range.</p>
          <button class="btn btn-primary-glow btn-sm mt-2" onclick="resetFilters()">Reset All Filters</button>
        </div>
      </div>
    `;
    return;
  }

  container.innerHTML = products.map(product => {
    const isWishlisted = AppState.wishlist.includes(product.id);
    const starIcons = renderStarIcons(product.rating);

    return `
      <div class="col-12 col-sm-6 col-lg-4 col-xl-3">
        <div class="product-card">
          <div class="product-thumb-container">
            ${product.badge ? `<span class="product-badge bg-${product.badgeType || 'primary'}">${product.badge}</span>` : ''}
            <div class="product-actions-floating">
              <button class="btn-icon-round ${isWishlisted ? 'wishlisted' : ''}" 
                      title="${isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}"
                      onclick="toggleWishlist(${product.id})">
                <i class="bi ${isWishlisted ? 'bi-heart-fill' : 'bi-heart'}"></i>
              </button>
              <button class="btn-icon-round" title="Quick View" onclick="openQuickView(${product.id})">
                <i class="bi bi-eye"></i>
              </button>
            </div>
            <img src="${product.image}" alt="${product.name}" class="product-thumb" loading="lazy">
          </div>
          
          <div class="product-body">
            <div class="product-category-text">${product.categoryLabel}</div>
            <h3 class="product-title" title="${product.name}">${product.name}</h3>
            
            <div class="product-rating">
              ${starIcons}
              <span class="ms-1 text-muted">(${product.reviewsCount})</span>
            </div>

            <div class="product-price-row">
              <span class="current-price">$${product.price}</span>
              ${product.originalPrice ? `<span class="original-price">$${product.originalPrice}</span>` : ''}
              ${product.originalPrice ? `<span class="badge bg-success-subtle text-success ms-auto small">Save $${product.originalPrice - product.price}</span>` : ''}
            </div>

            <button class="btn-add-cart" onclick="addToCart(${product.id})">
              <i class="bi bi-bag-plus"></i> Add to Cart
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function renderStarIcons(rating) {
  let starsHtml = '';
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  for (let i = 0; i < fullStars; i++) {
    starsHtml += '<i class="bi bi-star-fill"></i>';
  }
  if (hasHalfStar) {
    starsHtml += '<i class="bi bi-star-half"></i>';
  }
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  for (let i = 0; i < emptyStars; i++) {
    starsHtml += '<i class="bi bi-star"></i>';
  }
  return starsHtml;
}

function resetFilters() {
  AppState.category = 'all';
  AppState.sortBy = 'featured';
  AppState.searchQuery = '';
  AppState.maxPrice = 600;

  const searchInput = document.getElementById('navSearchInput');
  const sortSelect = document.getElementById('sortSelect');
  const priceRange = document.getElementById('priceRangeInput');
  const priceVal = document.getElementById('priceRangeValue');

  if (searchInput) searchInput.value = '';
  if (sortSelect) sortSelect.value = 'featured';
  if (priceRange) priceRange.value = 600;
  if (priceVal) priceVal.textContent = '$600';

  document.querySelectorAll('.filter-pill').forEach(pill => {
    pill.classList.toggle('active', pill.dataset.category === 'all');
  });

  renderProducts();
}

/* ==========================================================================
   FLASH DEALS
   ========================================================================== */
function renderFlashDeals() {
  const container = document.getElementById('flashDealsContainer');
  if (!container) return;

  const flashItems = PRODUCTS.filter(p => p.isFlashDeal);
  container.innerHTML = flashItems.map(item => `
    <div class="col-12 col-md-6 col-lg-4">
      <div class="glass-panel p-3 h-100 d-flex flex-column">
        <div class="d-flex gap-3 align-items-center mb-3">
          <img src="${item.image}" alt="${item.name}" class="rounded-3" style="width: 90px; height: 90px; object-fit: cover;">
          <div>
            <span class="badge bg-danger mb-1"><i class="bi bi-lightning-charge-fill"></i> Flash Offer</span>
            <h6 class="mb-1 text-truncate" style="max-width: 180px;">${item.name}</h6>
            <div class="d-flex align-items-center gap-2">
              <span class="fw-bold text-danger">$${item.price}</span>
              <span class="text-muted small text-decoration-line-through">$${item.originalPrice}</span>
            </div>
          </div>
        </div>

        <div class="mt-auto">
          <div class="d-flex justify-content-between small text-muted mb-1">
            <span>Sold: ${item.claimedPercent}%</span>
            <span>Only ${item.stock} left!</span>
          </div>
          <div class="progress mb-3" style="height: 6px; background: rgba(255,255,255,0.1);">
            <div class="progress-bar bg-danger progress-bar-striped progress-bar-animated" role="progressbar" style="width: ${item.claimedPercent}%"></div>
          </div>
          <button class="btn btn-add-cart w-100 btn-sm" onclick="addToCart(${item.id})">
            <i class="bi bi-cart-plus"></i> Claim Deal Now
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function initCountdownTimer() {
  // 14 hours 35 minutes countdown from now
  let totalSeconds = 14 * 3600 + 35 * 60 + 40;

  const hoursEl = document.getElementById('cdHours');
  const minutesEl = document.getElementById('cdMinutes');
  const secondsEl = document.getElementById('cdSeconds');

  if (!hoursEl || !minutesEl || !secondsEl) return;

  setInterval(() => {
    if (totalSeconds > 0) {
      totalSeconds--;
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      hoursEl.textContent = String(hours).padStart(2, '0');
      minutesEl.textContent = String(minutes).padStart(2, '0');
      secondsEl.textContent = String(seconds).padStart(2, '0');
    }
  }, 1000);
}

/* ==========================================================================
   SHOPPING CART OPERATIONS
   ========================================================================== */
function addToCart(productId, quantity = 1, color = null, size = null) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const chosenColor = color || product.colors[0];
  const chosenSize = size || product.sizes[0];

  const existingItemIndex = AppState.cart.findIndex(
    item => item.id === productId && item.color === chosenColor && item.size === chosenSize
  );

  if (existingItemIndex > -1) {
    AppState.cart[existingItemIndex].quantity += quantity;
  } else {
    AppState.cart.push({
      id: productId,
      quantity: quantity,
      color: chosenColor,
      size: chosenSize
    });
  }

  saveCart();
  updateCartUI();
  showToast(`Added "${product.name}" to your cart!`, 'success');
}

function updateCartQuantity(index, delta) {
  if (AppState.cart[index]) {
    AppState.cart[index].quantity += delta;
    if (AppState.cart[index].quantity <= 0) {
      AppState.cart.splice(index, 1);
    }
    saveCart();
    updateCartUI();
  }
}

function removeFromCart(index) {
  if (AppState.cart[index]) {
    const item = AppState.cart[index];
    const product = PRODUCTS.find(p => p.id === item.id);
    AppState.cart.splice(index, 1);
    saveCart();
    updateCartUI();
    showToast(`Removed "${product ? product.name : 'Item'}" from cart`, 'info');
  }
}

function clearCart() {
  AppState.cart = [];
  AppState.appliedPromo = null;
  saveCart();
  updateCartUI();
}

function saveCart() {
  localStorage.setItem('lumina_cart', JSON.stringify(AppState.cart));
}

function calculateCartTotals() {
  let subtotal = 0;
  let itemCount = 0;

  AppState.cart.forEach(item => {
    const product = PRODUCTS.find(p => p.id === item.id);
    if (product) {
      subtotal += product.price * item.quantity;
      itemCount += item.quantity;
    }
  });

  let discountAmount = 0;
  let isFreeShipping = subtotal >= AppState.FREE_SHIPPING_THRESHOLD;

  if (AppState.appliedPromo) {
    if (AppState.appliedPromo.discountPercent) {
      discountAmount = (subtotal * AppState.appliedPromo.discountPercent) / 100;
    }
    if (AppState.appliedPromo.freeShipping) {
      isFreeShipping = true;
    }
  }

  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const tax = taxableAmount > 0 ? taxableAmount * 0.08 : 0; // 8% sales tax
  const shipping = isFreeShipping || subtotal === 0 ? 0 : 15;
  const total = taxableAmount + tax + shipping;

  return {
    subtotal,
    itemCount,
    discountAmount,
    shipping,
    tax,
    total,
    isFreeShipping
  };
}

function updateCartUI() {
  const totals = calculateCartTotals();

  // Update Nav Badge
  const badge = document.getElementById('cartBadgeCount');
  if (badge) {
    badge.textContent = totals.itemCount;
    badge.style.display = totals.itemCount > 0 ? 'flex' : 'none';
  }

  // Update Offcanvas Cart View
  const cartItemsContainer = document.getElementById('cartItemsContainer');
  const cartFooter = document.getElementById('cartFooterSection');
  const freeShipBar = document.getElementById('freeShippingBarContainer');

  if (!cartItemsContainer) return;

  if (AppState.cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="text-center py-5">
        <div class="mb-3">
          <i class="bi bi-bag-x display-1 text-muted"></i>
        </div>
        <h5>Your Cart is Empty</h5>
        <p class="text-muted small">Looks like you haven't added anything yet.</p>
        <button class="btn btn-primary-glow btn-sm mt-3" data-bs-dismiss="offcanvas" onclick="scrollToCatalog()">
          Start Shopping
        </button>
      </div>
    `;
    if (cartFooter) cartFooter.style.display = 'none';
    if (freeShipBar) freeShipBar.style.display = 'none';
    return;
  }

  if (cartFooter) cartFooter.style.display = 'block';
  if (freeShipBar) {
    freeShipBar.style.display = 'block';
    const needed = Math.max(0, AppState.FREE_SHIPPING_THRESHOLD - totals.subtotal);
    const percent = Math.min(100, Math.round((totals.subtotal / AppState.FREE_SHIPPING_THRESHOLD) * 100));

    freeShipBar.innerHTML = `
      <div class="free-shipping-progress">
        <div class="d-flex justify-content-between small mb-1">
          <span>${needed === 0 ? '<strong class="text-success"><i class="bi bi-check-circle"></i> You unlocked Free Express Shipping!</strong>' : `Add <strong>$${needed.toFixed(2)}</strong> more for <strong>Free Shipping</strong>`}</span>
          <span class="fw-bold">${percent}%</span>
        </div>
        <div class="progress" style="height: 6px;">
          <div class="progress-bar bg-success" style="width: ${percent}%"></div>
        </div>
      </div>
    `;
  }

  cartItemsContainer.innerHTML = AppState.cart.map((item, index) => {
    const product = PRODUCTS.find(p => p.id === item.id);
    if (!product) return '';

    return `
      <div class="cart-item-row">
        <img src="${product.image}" alt="${product.name}" class="cart-item-thumb">
        <div class="flex-grow-1 min-w-0">
          <div class="d-flex justify-content-between align-items-start">
            <h6 class="mb-1 text-truncate pe-2" style="max-width: 170px;">${product.name}</h6>
            <button class="btn btn-link text-danger p-0 border-0" onclick="removeFromCart(${index})" title="Remove">
              <i class="bi bi-trash3"></i>
            </button>
          </div>
          <div class="small text-muted mb-2">
            <span>Size: ${item.size}</span> • 
            <span class="d-inline-flex align-items-center gap-1">Color: <span style="width:10px;height:10px;border-radius:50%;background:${item.color};display:inline-block;"></span></span>
          </div>
          <div class="d-flex justify-content-between align-items-center">
            <div class="quantity-stepper">
              <button onclick="updateCartQuantity(${index}, -1)"><i class="bi bi-dash"></i></button>
              <span>${item.quantity}</span>
              <button onclick="updateCartQuantity(${index}, 1)"><i class="bi bi-plus"></i></button>
            </div>
            <span class="fw-bold">$${(product.price * item.quantity).toFixed(2)}</span>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Update Summary Rows
  document.getElementById('cartSubtotalAmount').textContent = `$${totals.subtotal.toFixed(2)}`;
  
  const discountRow = document.getElementById('cartDiscountRow');
  const discountAmountEl = document.getElementById('cartDiscountAmount');
  if (discountRow && discountAmountEl) {
    if (totals.discountAmount > 0) {
      discountRow.style.display = 'flex';
      discountAmountEl.textContent = `-$${totals.discountAmount.toFixed(2)}`;
    } else {
      discountRow.style.display = 'none';
    }
  }

  document.getElementById('cartShippingAmount').textContent = totals.shipping === 0 ? 'FREE' : `$${totals.shipping.toFixed(2)}`;
  document.getElementById('cartTaxAmount').textContent = `$${totals.tax.toFixed(2)}`;
  document.getElementById('cartTotalAmount').textContent = `$${totals.total.toFixed(2)}`;
}

function applyPromoCode() {
  const input = document.getElementById('promoCodeInput');
  if (!input) return;

  const code = input.value.trim().toUpperCase();
  if (!code) {
    showToast('Please enter a voucher code', 'warning');
    return;
  }

  if (PROMO_CODES[code]) {
    AppState.appliedPromo = PROMO_CODES[code];
    showToast(`Code "${code}" Applied: ${AppState.appliedPromo.label}!`, 'success');
    input.value = '';
    updateCartUI();
  } else {
    showToast('Invalid promo code. Try "NOVA25" or "SAVE10"', 'danger');
  }
}

/* ==========================================================================
   WISHLIST OPERATIONS
   ========================================================================== */
function toggleWishlist(productId) {
  const index = AppState.wishlist.indexOf(productId);
  const product = PRODUCTS.find(p => p.id === productId);

  if (index > -1) {
    AppState.wishlist.splice(index, 1);
    showToast(`Removed "${product.name}" from Wishlist`, 'info');
  } else {
    AppState.wishlist.push(productId);
    showToast(`Added "${product.name}" to Wishlist!`, 'success');
  }

  saveWishlist();
  updateWishlistUI();
  renderProducts(); // refresh heart icon state
}

function saveWishlist() {
  localStorage.setItem('lumina_wishlist', JSON.stringify(AppState.wishlist));
}

function updateWishlistUI() {
  const badge = document.getElementById('wishlistBadgeCount');
  if (badge) {
    badge.textContent = AppState.wishlist.length;
    badge.style.display = AppState.wishlist.length > 0 ? 'flex' : 'none';
  }

  const container = document.getElementById('wishlistItemsContainer');
  if (!container) return;

  if (AppState.wishlist.length === 0) {
    container.innerHTML = `
      <div class="text-center py-5">
        <i class="bi bi-heart display-1 text-muted mb-3 d-block"></i>
        <h5>Your Wishlist is Empty</h5>
        <p class="text-muted small">Explore the catalog and save your dream items.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = AppState.wishlist.map(productId => {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return '';

    return `
      <div class="d-flex align-items-center gap-3 py-3 border-bottom border-secondary border-opacity-25">
        <img src="${product.image}" alt="${product.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;">
        <div class="flex-grow-1 min-w-0">
          <h6 class="mb-1 text-truncate">${product.name}</h6>
          <span class="fw-bold text-primary">$${product.price}</span>
        </div>
        <div class="d-flex gap-2">
          <button class="btn btn-sm btn-outline-primary" onclick="addToCart(${product.id}); toggleWishlist(${product.id});" title="Move to Cart">
            <i class="bi bi-bag-plus"></i>
          </button>
          <button class="btn btn-sm btn-link text-danger p-1" onclick="toggleWishlist(${product.id})" title="Remove">
            <i class="bi bi-trash"></i>
          </button>
        </div>
      </div>
    `;
  }).join('');
}

/* ==========================================================================
   QUICK VIEW MODAL
   ========================================================================== */
function openQuickView(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  AppState.activeQuickViewProduct = product;
  const modalEl = document.getElementById('quickViewModal');
  const modal = new bootstrap.Modal(modalEl);

  document.getElementById('qvProductName').textContent = product.name;
  document.getElementById('qvProductCategory').textContent = product.categoryLabel;
  document.getElementById('qvProductPrice').textContent = `$${product.price}`;
  document.getElementById('qvProductOriginalPrice').textContent = product.originalPrice ? `$${product.originalPrice}` : '';
  document.getElementById('qvProductDesc').textContent = product.description;
  document.getElementById('qvProductRating').innerHTML = renderStarIcons(product.rating) + ` <span class="ms-1 text-muted">(${product.reviewsCount} reviews)</span>`;
  document.getElementById('qvProductStock').innerHTML = `<i class="bi bi-check2-circle text-success me-1"></i> In Stock (${product.stock} units ready to dispatch)`;

  // Main Image & Gallery
  const mainImg = document.getElementById('qvMainImage');
  mainImg.src = product.image;

  const galleryThumbs = document.getElementById('qvGalleryThumbnails');
  const images = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];
  galleryThumbs.innerHTML = images.map((imgUrl, i) => `
    <img src="${imgUrl}" class="rounded-2 border ${i === 0 ? 'border-primary' : 'border-secondary'} p-1 cursor-pointer" 
         style="width: 55px; height: 55px; object-fit: cover; cursor: pointer;"
         onclick="switchQuickViewImage('${imgUrl}', this)">
  `).join('');

  // Features List
  const featuresList = document.getElementById('qvFeaturesList');
  featuresList.innerHTML = product.features.map(f => `
    <li class="mb-1"><i class="bi bi-check-lg text-primary me-2"></i>${f}</li>
  `).join('');

  // Color Swatches
  const colorContainer = document.getElementById('qvColorSwatches');
  colorContainer.innerHTML = product.colors.map((c, i) => `
    <span class="swatch-color ${i === 0 ? 'active' : ''}" style="background-color: ${c};" 
          data-color="${c}" onclick="selectQuickViewColor(this, '${c}')"></span>
  `).join('');

  // Size Badges
  const sizeContainer = document.getElementById('qvSizeBadges');
  sizeContainer.innerHTML = product.sizes.map((s, i) => `
    <span class="badge-size-choice ${i === 0 ? 'active' : ''}" data-size="${s}" 
          onclick="selectQuickViewSize(this, '${s}')">${s}</span>
  `).join('');

  // Reset quantity input
  document.getElementById('qvQuantityInput').value = 1;

  modal.show();
}

function switchQuickViewImage(imgUrl, thumbEl) {
  document.getElementById('qvMainImage').src = imgUrl;
  document.querySelectorAll('#qvGalleryThumbnails img').forEach(t => {
    t.classList.remove('border-primary');
    t.classList.add('border-secondary');
  });
  thumbEl.classList.add('border-primary');
  thumbEl.classList.remove('border-secondary');
}

function selectQuickViewColor(el, color) {
  document.querySelectorAll('#qvColorSwatches .swatch-color').forEach(s => s.classList.remove('active'));
  el.classList.add('active');
}

function selectQuickViewSize(el, size) {
  document.querySelectorAll('#qvSizeBadges .badge-size-choice').forEach(s => s.classList.remove('active'));
  el.classList.add('active');
}

function addQuickViewToCart() {
  if (!AppState.activeQuickViewProduct) return;

  const qty = parseInt(document.getElementById('qvQuantityInput').value) || 1;
  const activeColorEl = document.querySelector('#qvColorSwatches .swatch-color.active');
  const activeSizeEl = document.querySelector('#qvSizeBadges .badge-size-choice.active');

  const color = activeColorEl ? activeColorEl.dataset.color : AppState.activeQuickViewProduct.colors[0];
  const size = activeSizeEl ? activeSizeEl.dataset.size : AppState.activeQuickViewProduct.sizes[0];

  addToCart(AppState.activeQuickViewProduct.id, qty, color, size);

  // Close Quick View Modal
  const modalEl = document.getElementById('quickViewModal');
  const modal = bootstrap.Modal.getInstance(modalEl);
  if (modal) modal.hide();
}

/* ==========================================================================
   CHECKOUT FLOW & CONFIRMATION
   ========================================================================== */
function openCheckoutModal() {
  if (AppState.cart.length === 0) {
    showToast('Your cart is empty!', 'warning');
    return;
  }

  // Dismiss cart offcanvas if open
  const cartOffcanvasEl = document.getElementById('cartOffcanvas');
  const offcanvas = bootstrap.Offcanvas.getInstance(cartOffcanvasEl);
  if (offcanvas) offcanvas.hide();

  const totals = calculateCartTotals();
  document.getElementById('coTotalDisplay').textContent = `$${totals.total.toFixed(2)}`;
  document.getElementById('coSubtotalDisplay').textContent = `$${totals.subtotal.toFixed(2)}`;
  document.getElementById('coShippingDisplay').textContent = totals.shipping === 0 ? 'FREE' : `$${totals.shipping.toFixed(2)}`;
  document.getElementById('coTaxDisplay').textContent = `$${totals.tax.toFixed(2)}`;

  // Reset confirmation screen
  document.getElementById('checkoutFormView').style.display = 'block';
  document.getElementById('checkoutSuccessView').style.display = 'none';

  const checkoutModal = new bootstrap.Modal(document.getElementById('checkoutModal'));
  checkoutModal.show();
}

function processCheckoutOrder(event) {
  event.preventDefault();

  const form = document.getElementById('checkoutForm');
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const submitBtn = document.getElementById('submitOrderBtn');
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status"></span> Processing Order...';

  // Simulate payment processing delay
  setTimeout(() => {
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="bi bi-shield-lock me-2"></i> Pay & Complete Order';

    const orderNumber = 'NOVA-' + Math.floor(100000 + Math.random() * 900000);
    document.getElementById('confirmedOrderNumber').textContent = orderNumber;

    document.getElementById('checkoutFormView').style.display = 'none';
    document.getElementById('checkoutSuccessView').style.display = 'block';

    // Clear cart after successful checkout
    clearCart();
    showToast('Order confirmed! Check your email for dispatch tracking.', 'success');
  }, 1200);
}

/* ==========================================================================
   TESTIMONIALS & REVIEWS
   ========================================================================== */
function renderTestimonials() {
  const container = document.getElementById('testimonialsContainer');
  if (!container) return;

  container.innerHTML = TESTIMONIALS.map(t => `
    <div class="col-12 col-md-4">
      <div class="testimonial-card">
        <div class="mb-3">
          <div class="d-flex text-warning mb-2">
            ${'<i class="bi bi-star-fill"></i>'.repeat(t.rating)}
          </div>
          <p class="text-muted fst-italic mb-0">"${t.text}"</p>
        </div>
        <div class="d-flex align-items-center gap-3 pt-3 border-top border-secondary border-opacity-25">
          <img src="${t.avatar}" alt="${t.name}" class="avatar-ring">
          <div>
            <h6 class="mb-0 fw-bold">${t.name}</h6>
            <span class="small text-muted">${t.role}</span>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

/* ==========================================================================
   TOAST NOTIFICATION HELPER
   ========================================================================== */
function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const iconMap = {
    success: 'bi-check-circle-fill text-success',
    danger: 'bi-exclamation-triangle-fill text-danger',
    warning: 'bi-exclamation-circle-fill text-warning',
    info: 'bi-info-circle-fill text-primary'
  };

  const toastId = 'toast_' + Date.now();
  const toastHtml = `
    <div id="${toastId}" class="toast toast-custom show align-items-center border-0 mb-2" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="d-flex">
        <div class="toast-body d-flex align-items-center gap-2">
          <i class="bi ${iconMap[type] || iconMap.info} fs-5"></i>
          <span>${message}</span>
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    </div>
  `;

  container.insertAdjacentHTML('beforeend', toastHtml);
  const toastEl = document.getElementById(toastId);
  setTimeout(() => {
    if (toastEl) {
      toastEl.classList.remove('show');
      setTimeout(() => toastEl.remove(), 400);
    }
  }, 3800);
}

/* ==========================================================================
   EVENT LISTENERS & BINDINGS
   ========================================================================== */
function initEventListeners() {
  // Theme Toggle Button
  const themeBtn = document.getElementById('themeToggleBtn');
  if (themeBtn) themeBtn.addEventListener('click', toggleTheme);

  // Category Filter Pills
  document.querySelectorAll('.filter-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      AppState.category = pill.dataset.category;
      renderProducts();
    });
  });

  // Search Input with debounce
  const searchInput = document.getElementById('navSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      AppState.searchQuery = e.target.value;
      renderProducts();
    });
  }

  // Sort Dropdown
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      AppState.sortBy = e.target.value;
      renderProducts();
    });
  }

  // Price Range Input
  const priceRange = document.getElementById('priceRangeInput');
  const priceVal = document.getElementById('priceRangeValue');
  if (priceRange && priceVal) {
    priceRange.addEventListener('input', (e) => {
      AppState.maxPrice = parseInt(e.target.value);
      priceVal.textContent = `$${AppState.maxPrice}`;
      renderProducts();
    });
  }

  // Newsletter Submit
  const nlForm = document.getElementById('newsletterForm');
  if (nlForm) {
    nlForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('newsletterEmailInput').value;
      if (email) {
        showToast(`VIP invitation sent to ${email}! Check your inbox for $20 off.`, 'success');
        nlForm.reset();
      }
    });
  }

  // Back to Top Button
  const backToTopBtn = document.getElementById('backToTopBtn');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

function scrollToCatalog() {
  const catalog = document.getElementById('catalogSection');
  if (catalog) {
    catalog.scrollIntoView({ behavior: 'smooth' });
  }
}
