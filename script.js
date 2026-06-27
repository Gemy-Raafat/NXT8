/* ============================================
   NXT8 FASHION - Main JavaScript
   ============================================ */

// ---- Global Variables ----
const WHATSAPP_NUMBER = '201102612084';
const ADMIN_PASSWORD = 'mohamed123#';
let cart = JSON.parse(localStorage.getItem('nxt8_cart')) || [];

// ---- Default Products ----
const defaultProducts = [
    { id: 1, name: 'Classic Black Suit', category: 'men', price: 3500, discount: 2800, sizes: ['S','M','L','XL'], image: '', description: 'Premium black suit with modern fit', featured: true, newArrival: false, stock: 25 },
    { id: 2, name: 'Gold Embroidered Blazer', category: 'men', price: 2200, discount: 0, sizes: ['M','L','XL'], image: '', description: 'Luxury blazer with gold embroidery', featured: true, newArrival: true, stock: 15 },
    { id: 3, name: 'Premium White Shirt', category: 'men', price: 850, discount: 650, sizes: ['S','M','L','XL','XXL'], image: '', description: 'Egyptian cotton white shirt', featured: true, newArrival: false, stock: 50 },
    { id: 4, name: 'Designer Denim Jacket', category: 'men', price: 1800, discount: 0, sizes: ['M','L','XL'], image: '', description: 'Handcrafted denim jacket', featured: true, newArrival: true, stock: 20 },
    { id: 5, name: 'Slim Fit Chinos', category: 'men', price: 950, discount: 750, sizes: ['S','M','L','XL'], image: '', description: 'Comfortable slim fit chinos', featured: false, newArrival: true, stock: 35 },
    { id: 6, name: 'Elegant Evening Dress', category: 'women', price: 2800, discount: 2200, sizes: ['S','M','L'], image: '', description: 'Stunning evening gown', featured: true, newArrival: true, stock: 10 },
    { id: 7, name: 'Silk Blouse', category: 'women', price: 1200, discount: 0, sizes: ['S','M','L','XL'], image: '', description: 'Pure silk designer blouse', featured: true, newArrival: false, stock: 30 },
    { id: 8, name: 'High-Waist Palazzo', category: 'women', price: 1100, discount: 900, sizes: ['S','M','L'], image: '', description: 'Flowing palazzo pants', featured: false, newArrival: true, stock: 25 },
    { id: 9, name: 'Luxury Leather Bag', category: 'accessories', price: 1800, discount: 1400, sizes: ['One Size'], image: '', description: 'Genuine leather designer bag', featured: true, newArrival: true, stock: 15 },
    { id: 10, name: 'Gold Chain Necklace', category: 'accessories', price: 650, discount: 0, sizes: ['One Size'], image: '', description: '18K gold-plated chain necklace', featured: false, newArrival: true, stock: 40 },
    { id: 11, name: 'Premium Sunglasses', category: 'accessories', price: 950, discount: 750, sizes: ['One Size'], image: '', description: 'UV protection designer sunglasses', featured: true, newArrival: false, stock: 20 },
    { id: 12, name: 'Leather Oxford Shoes', category: 'shoes', price: 2200, discount: 1800, sizes: ['40','41','42','43','44'], image: '', description: 'Handmade leather oxford shoes', featured: true, newArrival: true, stock: 18 },
    { id: 13, name: 'Classic Sneakers', category: 'shoes', price: 1500, discount: 0, sizes: ['39','40','41','42','43','44'], image: '', description: 'Premium white sneakers', featured: false, newArrival: true, stock: 30 },
    { id: 14, name: 'Chelsea Boots', category: 'shoes', price: 2500, discount: 2000, sizes: ['40','41','42','43'], image: '', description: 'Genuine leather Chelsea boots', featured: true, newArrival: false, stock: 12 },
    { id: 15, name: 'Cashmere Overcoat', category: 'men', price: 4200, discount: 3500, sizes: ['M','L','XL'], image: '', description: 'Premium cashmere winter overcoat', featured: true, newArrival: true, stock: 8 },
    { id: 16, name: 'Designer Watch', category: 'accessories', price: 3200, discount: 2600, sizes: ['One Size'], image: '', description: 'Luxury stainless steel watch', featured: true, newArrival: true, stock: 10 }
];

// ---- Initialize Products ----
function initProducts() {
    if (!localStorage.getItem('nxt8_products')) {
        localStorage.setItem('nxt8_products', JSON.stringify(defaultProducts));
    }
}

function getProducts() {
    return JSON.parse(localStorage.getItem('nxt8_products')) || [];
}

function saveProducts(products) {
    localStorage.setItem('nxt8_products', JSON.stringify(products));
}

// ---- Track Visitors ----
function trackVisitor() {
    let visitors = parseInt(localStorage.getItem('nxt8_visitors') || '0');
    let lastVisit = localStorage.getItem('nxt8_lastVisit');
    let today = new Date().toDateString();
    if (lastVisit !== today) {
        visitors++;
        localStorage.setItem('nxt8_visitors', visitors);
        localStorage.setItem('nxt8_lastVisit', today);
    }
}

// ---- Loader ----
window.addEventListener('load', function() {
    initProducts();
    trackVisitor();
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) loader.classList.add('hidden');
    }, 1800);
    initAll();
});

// ---- Initialize All Functions ----
function initAll() {
    initNavbar();
    initCart();
    initHeroParticles();
    initAOS();
    initCounters();
    initFeaturedProducts();
    initNewArrivals();
    initProductsPage();
    initContactForm();
    initNewsletter();
    initBackToTop();
    initAdminPanel();
}

// ---- Navbar ----
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Close nav on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger) hamburger.classList.remove('active');
            if (navLinks) navLinks.classList.remove('active');
        });
    });
}

// ---- Cart System ----
function initCart() {
    updateCartUI();
    
    const cartIcon = document.getElementById('cartIcon');
    const cartClose = document.getElementById('cartClose');
    const cartOverlay = document.getElementById('cartOverlay');
    
    if (cartIcon) cartIcon.addEventListener('click', openCart);
    if (cartClose) cartClose.addEventListener('click', closeCart);
    if (cartOverlay) cartOverlay.addEventListener('click', closeCart);
}

function openCart() {
    document.getElementById('cartSidebar').classList.add('active');
    document.getElementById('cartOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCart() {
    document.getElementById('cartSidebar').classList.remove('active');
    document.getElementById('cartOverlay').classList.remove('active');
    document.body.style.overflow = '';
}

function addToCart(productId, selectedSize) {
    const products = getProducts();
    const product = products.find(p => p.id == productId);
    if (!product) return;

    if (!selectedSize) {
        showToast('Please select a size first!', 'error');
        return;
    }

    const existingItem = cart.find(item => item.id == productId && item.size == selectedSize);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.discount || product.price,
            image: product.image,
            size: selectedSize,
            quantity: 1
        });
    }

    localStorage.setItem('nxt8_cart', JSON.stringify(cart));
    updateCartUI();
    showToast('Added to cart!', 'success');
    openCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('nxt8_cart', JSON.stringify(cart));
    updateCartUI();
}

function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');

    if (cartCount) {
        cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    }

    if (cartItems) {
        if (cart.length === 0) {
            cartItems.innerHTML = '<div style="text-align:center; padding:40px; color:var(--gray);"><i class="fas fa-shopping-bag" style="font-size:40px; margin-bottom:15px; display:block;"></i><p>Your bag is empty</p></div>';
        } else {
            cartItems.innerHTML = cart.map((item, index) => `
                <div class="cart-item">
                    <div class="cart-item-img">
                        ${item.image ? `<img src="${item.image}" alt="${item.name}">` : '<i class="fas fa-tshirt"></i>'}
                    </div>
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p>Size: ${item.size} | Qty: ${item.quantity}</p>
                        <div class="cart-item-price">EGP ${(item.price * item.quantity).toLocaleString()}</div>
                    </div>
                    <button class="cart-item-remove" onclick="removeFromCart(${index})">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            `).join('');
        }
    }

    if (cartTotal) {
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = `EGP ${total.toLocaleString()}`;
    }
}

function checkoutWhatsApp() {
    if (cart.length === 0) {
        showToast('Your cart is empty!', 'error');
        return;
    }

    let message = '🛍️ *New Order - NXT8 Fashion*\n\n';
    message += '📦 *Order Details:*\n';
    message += '─────────────────\n';
    
    let total = 0;
    cart.forEach((item, i) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        message += `${i+1}. *${item.name}*\n`;
        message += `   Size: ${item.size}\n`;
        message += `   Qty: ${item.quantity}\n`;
        message += `   Price: EGP ${itemTotal.toLocaleString()}\n\n`;
    });

    message += '─────────────────\n';
    message += `💰 *Total: EGP ${total.toLocaleString()}*\n\n`;
    message += '📍 Please provide your:\n- Full Name\n- Address\n- Phone Number';

    // Save order
    saveOrder(cart, total);

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');

    // Clear cart
    cart = [];
    localStorage.setItem('nxt8_cart', JSON.stringify(cart));
    updateCartUI();
    closeCart();
}

function orderSingleProduct(productId) {
    const products = getProducts();
    const product = products.find(p => p.id == productId);
    if (!product) return;

    const sizeBtn = document.querySelector(`.product-card[data-id="${productId}"] .size-btn.active`);
    const size = sizeBtn ? sizeBtn.textContent : 'Not selected';
    const price = product.discount || product.price;

    let message = '🛍️ *Quick Order - NXT8 Fashion*\n\n';
    message += `📦 *Product:* ${product.name}\n`;
    message += `📏 *Size:* ${size}\n`;
    message += `💰 *Price:* EGP ${price.toLocaleString()}\n\n`;
    message += '📍 Please provide your:\n- Full Name\n- Address\n- Phone Number';

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');

    // Save order
    saveOrder([{ name: product.name, size, price, quantity: 1 }], price);
}

function saveOrder(items, total) {
    let orders = JSON.parse(localStorage.getItem('nxt8_orders') || '[]');
    orders.push({
        id: 'ORD' + Date.now().toString().slice(-6),
        items: items,
        total: total,
        status: 'pending',
        date: new Date().toISOString(),
        customer: 'WhatsApp Customer'
    });
    localStorage.setItem('nxt8_orders', JSON.stringify(orders));
}

// ---- Hero Particles ----
function initHeroParticles() {
    const container = document.getElementById('heroParticles');
    if (!container) return;

    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
        particle.style.width = (Math.random() * 4 + 2) + 'px';
        particle.style.height = particle.style.width;
        container.appendChild(particle);
    }
}

// ---- AOS (Manual Scroll Animation) ----
function initAOS() {
    const elements = document.querySelectorAll('[data-aos]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('aos-animate');
                }, parseInt(delay));
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    elements.forEach(el => observer.observe(el));
}

// ---- Counter Animation ----
function initCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-count'));
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    });

    counters.forEach(c => observer.observe(c));
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 60;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current).toLocaleString();
    }, 25);
}

// ---- Featured Products ----
function initFeaturedProducts() {
    const container = document.getElementById('featuredProducts');
    if (!container) return;

    const products = getProducts().filter(p => p.featured);
    container.innerHTML = products.map(p => createProductCard(p)).join('');
    initSizeButtons();

    // Slider controls
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            container.scrollBy({ left: -310, behavior: 'smooth' });
        });
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            container.scrollBy({ left: 310, behavior: 'smooth' });
        });
    }
}

// ---- New Arrivals ----
function initNewArrivals() {
    const container = document.getElementById('newArrivals');
    if (!container) return;

    const products = getProducts().filter(p => p.newArrival).slice(0, 8);
    container.innerHTML = products.map(p => createProductCard(p)).join('');
    initSizeButtons();
}

// ---- Create Product Card HTML ----
function createProductCard(product) {
    const hasDiscount = product.discount && product.discount > 0;
    const discountPercent = hasDiscount ? Math.round((1 - product.discount / product.price) * 100) : 0;
    const displayPrice = hasDiscount ? product.discount : product.price;

    return `
        <div class="product-card" data-id="${product.id}" data-category="${product.category}">
            <div class="product-image">
                ${product.image ? 
                    `<img src="${product.image}" alt="${product.name}">` : 
                    `<i class="fas fa-tshirt placeholder-icon"></i>`
                }
                ${hasDiscount ? `<span class="product-badge sale">-${discountPercent}%</span>` : ''}
                ${product.newArrival ? `<span class="product-badge new" style="${hasDiscount ? 'top:50px' : ''}">NEW</span>` : ''}
                <button class="product-wishlist" onclick="showToast('Added to wishlist!','success')">
                    <i class="far fa-heart"></i>
                </button>
            </div>
            <div class="product-info">
                <div class="product-category-label">${product.category}</div>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price">
                    <span class="current">EGP ${displayPrice.toLocaleString()}</span>
                    ${hasDiscount ? `<span class="original">EGP ${product.price.toLocaleString()}</span>` : ''}
                </div>
                <div class="product-sizes">
                    ${(product.sizes || []).map(s => `<button class="size-btn" data-size="${s}">${s}</button>`).join('')}
                </div>
                <div class="product-actions">
                    <button class="btn btn-gold btn-sm" onclick="addToCartFromCard(${product.id})">
                        <i class="fas fa-shopping-bag"></i> Add
                    </button>
                    <button class="btn btn-outline btn-sm" onclick="orderSingleProduct(${product.id})">
                        <i class="fab fa-whatsapp"></i> Order
                    </button>
                </div>
            </div>
        </div>
    `;
}

function addToCartFromCard(productId) {
    const card = document.querySelector(`.product-card[data-id="${productId}"]`);
    const activeSize = card ? card.querySelector('.size-btn.active') : null;
    const size = activeSize ? activeSize.getAttribute('data-size') : null;
    addToCart(productId, size);
}

function initSizeButtons() {
    document.querySelectorAll('.product-card').forEach(card => {
        card.querySelectorAll('.size-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                card.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            });
        });
    });
}

// ---- Products Page ----
function initProductsPage() {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;

    // URL params
    const urlParams = new URLSearchParams(window.location.search);
    const catParam = urlParams.get('cat');
    if (catParam) {
        const radio = document.querySelector(`input[name="category"][value="${catParam}"]`);
        if (radio) radio.checked = true;
    }

    renderProducts();

    // Filters
    const searchInput = document.getElementById('searchInput');
    const categoryInputs = document.querySelectorAll('input[name="category"]');
    const priceRange = document.getElementById('priceRange');
    const sortSelect = document.getElementById('sortSelect');
    const filterToggle = document.getElementById('filterToggle');
    const filterClose = document.getElementById('filterClose');

    if (searchInput) searchInput.addEventListener('input', renderProducts);
    categoryInputs.forEach(input => input.addEventListener('change', renderProducts));
    if (priceRange) {
        priceRange.addEventListener('input', function() {
            document.getElementById('priceValue').textContent = `EGP ${parseInt(this.value).toLocaleString()}`;
            renderProducts();
        });
    }
    if (sortSelect) sortSelect.addEventListener('change', renderProducts);
    
    if (filterToggle) {
        filterToggle.addEventListener('click', () => {
            document.getElementById('storeFilters').classList.add('active');
        });
    }
    if (filterClose) {
        filterClose.addEventListener('click', () => {
            document.getElementById('storeFilters').classList.remove('active');
        });
    }
}

function renderProducts() {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;

    let products = getProducts();
    const search = (document.getElementById('searchInput')?.value || '').toLowerCase();
    const category = document.querySelector('input[name="category"]:checked')?.value || 'all';
    const maxPrice = parseInt(document.getElementById('priceRange')?.value || '5000');
    const sort = document.getElementById('sortSelect')?.value || 'default';

    // Filter
    if (search) {
        products = products.filter(p => p.name.toLowerCase().includes(search) || p.category.toLowerCase().includes(search));
    }
    if (category !== 'all') {
        products = products.filter(p => p.category === category);
    }
    products = products.filter(p => (p.discount || p.price) <= maxPrice);

    // Sort
    switch(sort) {
        case 'price-low':
            products.sort((a, b) => (a.discount || a.price) - (b.discount || b.price));
            break;
        case 'price-high':
            products.sort((a, b) => (b.discount || b.price) - (a.discount || a.price));
            break;
        case 'name':
            products.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'newest':
            products.sort((a, b) => b.id - a.id);
            break;
    }

    // Render
    const noProducts = document.getElementById('noProducts');
    const count = document.getElementById('productsCount');

    if (products.length === 0) {
        grid.innerHTML = '';
        if (noProducts) noProducts.style.display = 'block';
    } else {
        if (noProducts) noProducts.style.display = 'none';
        grid.innerHTML = products.map(p => createProductCard(p)).join('');
        initSizeButtons();
    }

    if (count) count.textContent = `${products.length} Product${products.length !== 1 ? 's' : ''}`;
}

// ---- Contact Form ----
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('contactName').value;
        const phone = document.getElementById('contactPhone').value;
        const email = document.getElementById('contactEmail').value;
        const message = document.getElementById('contactMessage').value;

        let waMessage = '📩 *New Contact Message - NXT8 Fashion*\n\n';
        waMessage += `👤 *Name:* ${name}\n`;
        waMessage += `📱 *Phone:* ${phone}\n`;
        waMessage += `📧 *Email:* ${email}\n\n`;
        waMessage += `💬 *Message:*\n${message}`;

        // Save customer
        let customers = JSON.parse(localStorage.getItem('nxt8_customers') || '[]');
        customers.push({ name, phone, email, date: new Date().toISOString() });
        localStorage.setItem('nxt8_customers', JSON.stringify(customers));

        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waMessage)}`;
        window.open(url, '_blank');
        
        form.reset();
        showToast('Message sent via WhatsApp!', 'success');
    });
}

// ---- Newsletter ----
function initNewsletter() {
    const form = document.getElementById('newsletterForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        showToast('Subscribed successfully! 🎉', 'success');
        form.reset();
    });
}

// ---- Back to Top ----
function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ---- Toast Notification ----
function showToast(message, type = 'success') {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i> ${message}`;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 100);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}

// ============================================
// ADMIN PANEL
// ============================================

function initAdminPanel() {
    const loginForm = document.getElementById('loginForm');
    if (!loginForm) return;

    // Check if already logged in
    if (sessionStorage.getItem('nxt8_admin') === 'true') {
        showDashboard();
    }

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const password = document.getElementById('adminPassword').value;
        
        if (password === ADMIN_PASSWORD) {
            sessionStorage.setItem('nxt8_admin', 'true');
            showDashboard();
        } else {
            document.getElementById('loginError').style.display = 'block';
            setTimeout(() => {
                document.getElementById('loginError').style.display = 'none';
            }, 3000);
        }
    });

    // Admin navigation
    document.querySelectorAll('.admin-nav-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('data-section');
            
            document.querySelectorAll('.admin-nav-item').forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
            document.getElementById(`section-${section}`).classList.add('active');
            
            document.getElementById('adminPageTitle').textContent = this.textContent.trim();

            // Close sidebar on mobile
            document.getElementById('adminSidebar').classList.remove('active');
        });
    });

    // Mobile sidebar toggle
    const menuToggle = document.getElementById('adminMenuToggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            document.getElementById('adminSidebar').classList.toggle('active');
        });
    }

    // Add product form
    const addProductForm = document.getElementById('addProductForm');
    if (addProductForm) {
        addProductForm.addEventListener('submit', handleProductSubmit);
    }
}

function showDashboard() {
    document.getElementById('adminLogin').style.display = 'none';
    document.getElementById('adminDashboard').style.display = 'flex';
    loadDashboardData();
    loadProductsTable();
    loadOrdersTable();
    loadCustomersTable();
}

function adminLogout() {
    sessionStorage.removeItem('nxt8_admin');
    document.getElementById('adminLogin').style.display = 'flex';
    document.getElementById('adminDashboard').style.display = 'none';
    document.getElementById('adminPassword').value = '';
}

function togglePassword() {
    const input = document.getElementById('adminPassword');
    const icon = document.querySelector('.toggle-pass i');
    if (input.type === 'password') {
        input.type = 'text';
        icon.className = 'fas fa-eye-slash';
    } else {
        input.type = 'password';
        icon.className = 'fas fa-eye';
    }
}

function loadDashboardData() {
    const products = getProducts();
    const orders = JSON.parse(localStorage.getItem('nxt8_orders') || '[]');
    const customers = JSON.parse(localStorage.getItem('nxt8_customers') || '[]');
    const visitors = parseInt(localStorage.getItem('nxt8_visitors') || '0');

    const totalSales = orders.reduce((sum, o) => sum + (o.total || 0), 0);
    const profit = Math.round(totalSales * 0.35);

    const el = (id) => document.getElementById(id);
    if (el('totalProducts')) el('totalProducts').textContent = products.length;
    if (el('totalOrders')) el('totalOrders').textContent = orders.length;
    if (el('totalCustomers')) el('totalCustomers').textContent = customers.length;
    if (el('totalVisitors')) el('totalVisitors').textContent = visitors;
    if (el('totalSales')) el('totalSales').textContent = `EGP ${totalSales.toLocaleString()}`;
    if (el('netProfit')) el('netProfit').textContent = `EGP ${profit.toLocaleString()}`;

    // Recent orders
    const recentTable = document.getElementById('recentOrdersTable');
    if (recentTable) {
        const recent = orders.slice(-5).reverse();
        if (recent.length === 0) {
            recentTable.innerHTML = '<tr><td colspan="6" style="text-align:center; color:var(--gray); padding:30px;">No orders yet</td></tr>';
        } else {
            recentTable.innerHTML = recent.map(order => `
                <tr>
                    <td>${order.id}</td>
                    <td>${order.customer || 'N/A'}</td>
                    <td>${order.items ? order.items.map(i => i.name).join(', ').substring(0, 30) + '...' : 'N/A'}</td>
                    <td>EGP ${(order.total || 0).toLocaleString()}</td>
                    <td><span class="status-badge ${order.status}">${order.status}</span></td>
                    <td>${new Date(order.date).toLocaleDateString()}</td>
                </tr>
            `).join('');
        }
    }
}

function loadProductsTable() {
    const table = document.getElementById('productsTable');
    if (!table) return;

    const products = getProducts();
    if (products.length === 0) {
        table.innerHTML = '<tr><td colspan="6" style="text-align:center; color:var(--gray); padding:30px;">No products yet</td></tr>';
        return;
    }

    table.innerHTML = products.map(p => `
        <tr>
            <td>
                <div class="product-thumb">
                    ${p.image ? `<img src="${p.image}" alt="${p.name}">` : `<i class="fas fa-tshirt" style="color:var(--gray);"></i>`}
                </div>
            </td>
            <td>${p.name}</td>
            <td style="text-transform:capitalize;">${p.category}</td>
            <td>EGP ${(p.discount || p.price).toLocaleString()}${p.discount ? ` <small style="color:var(--gray);text-decoration:line-through;">EGP ${p.price.toLocaleString()}</small>` : ''}</td>
            <td>${p.stock || 0}</td>
            <td>
                <button class="action-btn edit" onclick="editProduct(${p.id})"><i class="fas fa-edit"></i></button>
                <button class="action-btn delete" onclick="deleteProduct(${p.id})"><i class="fas fa-trash"></i></button>
            </td>
        </tr>
    `).join('');
}

function loadOrdersTable() {
    const table = document.getElementById('ordersTable');
    if (!table) return;

    const orders = JSON.parse(localStorage.getItem('nxt8_orders') || '[]').reverse();
    if (orders.length === 0) {
        table.innerHTML = '<tr><td colspan="7" style="text-align:center; color:var(--gray); padding:30px;">No orders yet</td></tr>';
        return;
    }

    table.innerHTML = orders.map(order => `
        <tr>
            <td>${order.id}</td>
            <td>${order.customer || 'WhatsApp'}</td>
            <td>${order.items ? order.items.map(i => i.name).join(', ').substring(0, 40) : 'N/A'}</td>
            <td>EGP ${(order.total || 0).toLocaleString()}</td>
            <td><span class="status-badge ${order.status}">${order.status}</span></td>
            <td>${new Date(order.date).toLocaleDateString()}</td>
            <td>
                <button class="action-btn edit" onclick="updateOrderStatus('${order.id}','completed')"><i class="fas fa-check"></i></button>
                <button class="action-btn delete" onclick="updateOrderStatus('${order.id}','cancelled')"><i class="fas fa-times"></i></button>
            </td>
        </tr>
    `).join('');
}

function updateOrderStatus(orderId, status) {
    let orders = JSON.parse(localStorage.getItem('nxt8_orders') || '[]');
    const order = orders.find(o => o.id === orderId);
    if (order) {
        order.status = status;
        localStorage.setItem('nxt8_orders', JSON.stringify(orders));
        loadOrdersTable();
        loadDashboardData();
        showToast(`Order ${status}!`, status === 'completed' ? 'success' : 'error');
    }
}

function loadCustomersTable() {
    const table = document.getElementById('customersTable');
    if (!table) return;

    const customers = JSON.parse(localStorage.getItem('nxt8_customers') || '[]').reverse();
    if (customers.length === 0) {
        table.innerHTML = '<tr><td colspan="5" style="text-align:center; color:var(--gray); padding:30px;">No customers yet</td></tr>';
        return;
    }

    table.innerHTML = customers.map(c => `
        <tr>
            <td>${c.name || 'N/A'}</td>
            <td>${c.phone || 'N/A'}</td>
            <td>-</td>
            <td>-</td>
            <td>${new Date(c.date).toLocaleDateString()}</td>
        </tr>
    `).join('');
}

// ---- Product Management ----
function showAddProduct() {
    document.getElementById('productForm').style.display = 'block';
    document.getElementById('productFormTitle').textContent = 'Add New Product';
    document.getElementById('addProductForm').reset();
    document.getElementById('editProductId').value = '';
    document.getElementById('imagePreview').style.display = 'none';
    document.getElementById('uploadPlaceholder').style.display = 'flex';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function hideAddProduct() {
    document.getElementById('productForm').style.display = 'none';
}

function editProduct(id) {
    const products = getProducts();
    const product = products.find(p => p.id == id);
    if (!product) return;

    document.getElementById('productForm').style.display = 'block';
    document.getElementById('productFormTitle').textContent = 'Edit Product';
    document.getElementById('editProductId').value = product.id;
    document.getElementById('productName').value = product.name;
    document.getElementById('productCategory').value = product.category;
    document.getElementById('productPrice').value = product.price;
    document.getElementById('productDiscount').value = product.discount || '';
    document.getElementById('productSizes').value = (product.sizes || []).join(', ');
    document.getElementById('productStock').value = product.stock || 0;
    document.getElementById('productDescription').value = product.description || '';
    document.getElementById('productFeatured').checked = product.featured || false;
    document.getElementById('productNew').checked = product.newArrival || false;

    if (product.image) {
        document.getElementById('imagePreview').src = product.image;
        document.getElementById('imagePreview').style.display = 'block';
        document.getElementById('uploadPlaceholder').style.display = 'none';
    }

    // Navigate to products section
    document.querySelectorAll('.admin-nav-item').forEach(i => i.classList.remove('active'));
    document.querySelector('[data-section="products"]').classList.add('active');
    document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
    document.getElementById('section-products').classList.add('active');
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function deleteProduct(id) {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    let products = getProducts();
    products = products.filter(p => p.id != id);
    saveProducts(products);
    loadProductsTable();
    loadDashboardData();
    showToast('Product deleted!', 'success');
}

function handleProductSubmit(e) {
    e.preventDefault();
    
    const editId = document.getElementById('editProductId').value;
    let products = getProducts();

    const productData = {
        id: editId ? parseInt(editId) : Date.now(),
        name: document.getElementById('productName').value,
        category: document.getElementById('productCategory').value,
        price: parseInt(document.getElementById('productPrice').value),
        discount: parseInt(document.getElementById('productDiscount').value) || 0,
        sizes: document.getElementById('productSizes').value.split(',').map(s => s.trim()).filter(s => s),
        stock: parseInt(document.getElementById('productStock').value),
        description: document.getElementById('productDescription').value,
        featured: document.getElementById('productFeatured').checked,
        newArrival: document.getElementById('productNew').checked,
        image: document.getElementById('imagePreview').src || ''
    };

    if (editId) {
        const index = products.findIndex(p => p.id == editId);
        if (index > -1) {
            // Preserve existing image if no new one
            if (!productData.image || productData.image === window.location.href) {
                productData.image = products[index].image;
            }
            products[index] = productData;
        }
    } else {
        products.push(productData);
    }

    saveProducts(products);
    hideAddProduct();
    loadProductsTable();
    loadDashboardData();
    showToast(editId ? 'Product updated!' : 'Product added!', 'success');
}

function previewImage(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const preview = document.getElementById('imagePreview');
        preview.src = e.target.result;
        preview.style.display = 'block';
        document.getElementById('uploadPlaceholder').style.display = 'none';
    };
    reader.readAsDataURL(file);
}

function exportData() {
    const data = {
        products: getProducts(),
        orders: JSON.parse(localStorage.getItem('nxt8_orders') || '[]'),
        customers: JSON.parse(localStorage.getItem('nxt8_customers') || '[]'),
        visitors: localStorage.getItem('nxt8_visitors'),
        exportDate: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nxt8_data_${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Data exported!', 'success');
}

function clearAllData() {
    if (!confirm('⚠️ This will delete ALL data including products, orders, and customers. Are you sure?')) return;
    if (!confirm('This action cannot be undone. Continue?')) return;

    localStorage.removeItem('nxt8_products');
    localStorage.removeItem('nxt8_orders');
    localStorage.removeItem('nxt8_customers');
    localStorage.removeItem('nxt8_cart');
    localStorage.removeItem('nxt8_visitors');
    cart = [];

    initProducts();
    loadDashboardData();
    loadProductsTable();
    loadOrdersTable();
    loadCustomersTable();
    showToast('All data cleared!', 'success');
}

// ---- Custom Cursor ----
document.addEventListener('mousemove', (e) => {
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursorFollower');
    if (cursor) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    }
    if (follower) {
        follower.style.left = e.clientX + 'px';
        follower.style.top = e.clientY + 'px';
    }
});

// ---- Smooth scroll for anchor links ----
document.addEventListener('click', function(e) {
    const link = e.target.closest('a[href^="#"]');
    if (link) {
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    }
});