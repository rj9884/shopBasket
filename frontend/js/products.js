const productsDiv = document.getElementById('products');
const token = localStorage.getItem('token');
let allProducts = [];
let filteredProducts = [];

const categoryFallbackImageMap = {
    Laptops: 'https://source.unsplash.com/featured/500x500/?laptop',
    Smartphones: 'https://source.unsplash.com/featured/500x500/?smartphone',
    Tablets: 'https://source.unsplash.com/featured/500x500/?tablet',
    Headphones: 'https://source.unsplash.com/featured/500x500/?headphones',
    Smartwatches: 'https://source.unsplash.com/featured/500x500/?smartwatch',
    Gaming: 'https://source.unsplash.com/featured/500x500/?gaming-console',
    Electronics: 'https://source.unsplash.com/featured/500x500/?electronics'
};

// Rich Dummy Products to make the store look "Filled and Full"
const dummyProducts = [
    { product_id: 'd1', name: 'Premium Wireless Headphones', description: 'Noise-canceling over-ear headphones with 40h battery life.', price: 12500, category: 'Headphones', rating: 4.8, reviews: 342, image_url: 'https://source.unsplash.com/featured/500x500/?headphones,wireless' },
    { product_id: 'd2', name: 'MacBook Pro 16"', description: 'M2 Max Chip, 32GB RAM, 1TB SSD for ultimate performance.', price: 235000, category: 'Laptops', rating: 4.9, reviews: 1024, image_url: 'https://source.unsplash.com/featured/500x500/?macbook,laptop' },
    { product_id: 'd3', name: 'Sony PlayStation 5', description: 'Next-gen gaming console with ultra-high speed SSD.', price: 49990, category: 'Gaming', rating: 4.9, reviews: 2011, image_url: 'https://source.unsplash.com/featured/500x500/?playstation,gaming' },
    { product_id: 'd4', name: 'iPhone 15 Pro Max', description: 'Latest iPhone with Pro camera system and titanium design.', price: 159900, category: 'Smartphones', rating: 4.9, reviews: 1500, image_url: 'https://source.unsplash.com/featured/500x500/?iphone,smartphone' },
    { product_id: 'd5', name: 'Samsung Galaxy S24 Ultra', description: 'Flagship Android phone with S Pen and AI features.', price: 129900, category: 'Smartphones', rating: 4.7, reviews: 890, image_url: 'https://source.unsplash.com/featured/500x500/?samsung,smartphone' },
    { product_id: 'd6', name: 'iPad Pro 12.9"', description: 'Professional tablet with M2 chip and Liquid Retina XDR display.', price: 119900, category: 'Tablets', rating: 4.8, reviews: 650, image_url: 'https://source.unsplash.com/featured/500x500/?ipad,tablet' },
    { product_id: 'd7', name: 'Apple Watch Ultra 2', description: 'Rugged smartwatch for extreme sports and adventures.', price: 79900, category: 'Smartwatches', rating: 4.6, reviews: 420, image_url: 'https://source.unsplash.com/featured/500x500/?smartwatch,apple' },
    { product_id: 'd8', name: 'Dell XPS 13 Plus', description: 'InfinityEdge display laptop with 12th Gen Intel processors.', price: 145000, category: 'Laptops', rating: 4.5, reviews: 380, image_url: 'https://source.unsplash.com/featured/500x500/?dell,laptop' },
    { product_id: 'd9', name: 'Bose QuietComfort Ultra Earbuds', description: 'World-class noise cancellation in compact earbuds.', price: 27990, category: 'Headphones', rating: 4.7, reviews: 720, image_url: 'https://source.unsplash.com/featured/500x500/?earbuds,headphones' },
    { product_id: 'd10', name: 'Nintendo Switch OLED', description: 'Handheld gaming console with vibrant 7-inch OLED screen.', price: 32990, category: 'Gaming', rating: 4.4, reviews: 1100, image_url: 'https://source.unsplash.com/featured/500x500/?nintendo,switch' },
    { product_id: 'd11', name: 'Samsung Galaxy Tab S9+', description: 'Premium Android tablet with S Pen and 120Hz display.', price: 89900, category: 'Tablets', rating: 4.6, reviews: 290, image_url: 'https://source.unsplash.com/featured/500x500/?samsung,tablet' },
    { product_id: 'd12', name: 'Garmin Fenix 7', description: 'Multisport GPS smartwatch with advanced training features.', price: 69900, category: 'Smartwatches', rating: 4.5, reviews: 180, image_url: 'https://source.unsplash.com/featured/500x500/?garmin,watch' }
];

async function loadProducts() {
    try {
        const response = await fetch('http://localhost:3000/products');
        let dbProducts = [];
        if (response.ok) {
            dbProducts = await response.json();
            // Enrich missing properties on DB products to make them look premium
            const categoryImageMap = {
                Laptops: 'https://source.unsplash.com/featured/500x500/?laptop',
                Smartphones: 'https://source.unsplash.com/featured/500x500/?smartphone',
                Tablets: 'https://source.unsplash.com/featured/500x500/?tablet',
                Headphones: 'https://source.unsplash.com/featured/500x500/?headphones',
                Smartwatches: 'https://source.unsplash.com/featured/500x500/?smartwatch',
                Gaming: 'https://source.unsplash.com/featured/500x500/?gaming-console',
                Electronics: 'https://source.unsplash.com/featured/500x500/?electronics'
            };

            const dbImageMap = {
                'dell_xps.jpg': 'https://source.unsplash.com/featured/500x500/?dell,laptop',
                'iphone15.jpg': 'https://source.unsplash.com/featured/500x500/?iphone,smartphone',
                'galaxy_tab.jpg': 'https://source.unsplash.com/featured/500x500/?samsung,tablet',
                'sony_headphones.jpg': 'https://source.unsplash.com/featured/500x500/?sony,headphones',
                'apple_watch.jpg': 'https://source.unsplash.com/featured/500x500/?apple,watch',
                'ps5.jpg': 'https://source.unsplash.com/featured/500x500/?ps5,gaming',
                'macbook_air.jpg': 'https://source.unsplash.com/featured/500x500/?macbook,air',
                'pixel8.jpg': 'https://source.unsplash.com/featured/500x500/?pixel,smartphone',
                'ipad_pro.jpg': 'https://source.unsplash.com/featured/500x500/?ipad,tablet',
                'bose_earbuds.jpg': 'https://source.unsplash.com/featured/500x500/?bose,earbuds'
            };

            const resolveImage = (product) => {
                if (product.image_url && product.image_url !== 'placeholder.jpg') {
                    const isUrl = product.image_url.startsWith('http://') || product.image_url.startsWith('https://');
                    if (isUrl) return product.image_url;
                    const key = product.image_url.replace(/^images\//, '');
                    return dbImageMap[key] || categoryImageMap[product.category] || categoryImageMap.Electronics;
                }
                const cat = product.category || 'Electronics';
                return categoryImageMap[cat] || categoryImageMap.Electronics;
            };

            dbProducts = dbProducts.map(p => ({
                ...p,
                category: p.category || 'Electronics',
                rating: 4.0 + Math.random(),
                reviews: Math.floor(Math.random() * 200) + 10,
                image_url: resolveImage(p)
            }));
        }

        // Combine DB Products with our Rich Dummy Products to make the store look full
        allProducts = [...dbProducts, ...dummyProducts];
        
        applyFilters(); 
    } catch(err) {
        console.error('Failed to load DB products. Showing dummies.', err);
        allProducts = [...dummyProducts];
        applyFilters();
    }
}

function renderProducts(productsToRender) {
    if(productsToRender.length === 0) {
        productsDiv.innerHTML = '<p style="text-align:center;width:100%;color:var(--text-muted);padding:40px;">No products match your filters.</p>';
        return;
    }

    productsDiv.innerHTML = productsToRender.map(p => `
        <div class="product-card">
            <div class="product-img-wrap">
                ${p.rating >= 4.5 ? '<span class="product-badge">⭐ Top Rated</span>' : ''}
                <img 
                    src="${p.image_url}" 
                    alt="${p.name}" 
                    class="product-img" 
                    loading="lazy"
                    onerror="this.onerror=null;this.src='${categoryFallbackImageMap[p.category] || categoryFallbackImageMap.Electronics}'"
                >
            </div>
            <div class="product-info">
                <span class="product-category-text">${p.category}</span>
                <h3 class="product-name">${p.name}</h3>

                <div class="product-rating">
                    <span class="stars">${getStarHTML(p.rating)}</span>
                    <span class="count">(${p.reviews})</span>
                </div>

                <p class="product-desc">${p.description}</p>

                <div class="product-bottom">
                    <div class="product-price">₹${p.price.toLocaleString('en-IN')}</div>
                    <button class="add-to-cart-btn" onclick="addToCart('${p.product_id}')">
                        <i class="fa-solid fa-cart-plus"></i> Add
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function getStarHTML(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    for(let i=0; i<5; i++) {
        if (i < fullStars) {
            stars += '<i class="fa-solid fa-star"></i>';
        } else if (i === fullStars && halfStar) {
            stars += '<i class="fa-solid fa-star-half-stroke"></i>';
        } else {
            stars += '<i class="fa-regular fa-star"></i>';
        }
    }
    return stars;
}

// Filtering Logic
const filterRadios = document.querySelectorAll('.sidebar input[type="radio"]');
filterRadios.forEach(radio => {
    radio.addEventListener('change', applyFilters);
});

function applyFilters() {
    const categoryFilter = document.querySelector('input[name="category"]:checked').value;
    const priceFilter = document.querySelector('input[name="price"]:checked').value;
    const ratingFilter = document.querySelector('input[name="rating"]:checked').value;

    filteredProducts = allProducts.filter(p => {
        // Category Match
        if (categoryFilter !== 'all' && p.category !== categoryFilter) return false;

        // Price Match
        if (priceFilter !== 'all') {
            if (priceFilter === '0-1000' && p.price > 1000) return false;
            if (priceFilter === '1000-5000' && (p.price < 1000 || p.price > 5000)) return false;
            if (priceFilter === '5000+' && p.price < 5000) return false;
        }

        // Rating Match
        if (ratingFilter !== 'all' && p.rating < parseFloat(ratingFilter)) return false;

        return true;
    });

    renderProducts(filteredProducts);
}

async function addToCart(product_id) {
    if (!token) {
        alert("Please login first!");
        window.location.href = 'login.html';
        return;
    }
    
    // For dummy products without real backend IDs, we'll store them in localStorage
    if (typeof product_id === 'string' && product_id.startsWith('d')) {
        let dummyCart = JSON.parse(localStorage.getItem('dummyCart') || '[]');
        const product = dummyProducts.find(p => p.product_id === product_id);
        if (product) {
            const existing = dummyCart.find(item => item.product_id === product_id);
            if (existing) {
                existing.quantity += 1;
            } else {
                dummyCart.push({ ...product, quantity: 1 });
            }
            localStorage.setItem('dummyCart', JSON.stringify(dummyCart));
        }
        updateCartBadge();
        showFlyoutNotification('Added to Cart Successfully!');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/cart/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ product_id, quantity: 1 })
        });
        const data = await response.json();
        
        if(response.ok) {
            updateCartBadge();
            showFlyoutNotification('Added to Cart Successfully!');
        } else {
            alert(data.message || data.error);
        }
    } catch(err) {
        console.error(err);
    }
}

// Cart UI updates (mock for demo feeling)
let cartCount = 0;
function updateCartBadge() {
    cartCount++;
    const badge = document.getElementById('cartBadge');
    if(badge) {
        badge.innerText = cartCount;
        badge.style.display = 'inline-block';
        badge.style.transform = 'scale(1.2)';
        setTimeout(() => badge.style.transform = 'scale(1)', 200);
    }
}

function showFlyoutNotification(msg) {
    const flyout = document.createElement('div');
    flyout.textContent = msg;
    Object.assign(flyout.style, {
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        background: 'var(--success-green)',
        color: 'white',
        padding: '12px 24px',
        borderRadius: '8px',
        boxShadow: 'var(--shadow-md)',
        zIndex: 9999,
        fontWeight: '600',
        animation: 'fadeIn 0.3s ease-out'
    });
    document.body.appendChild(flyout);
    setTimeout(() => {
        flyout.style.opacity = '0';
        flyout.style.transition = 'opacity 0.3s';
        setTimeout(() => flyout.remove(), 300);
    }, 2500);
}

// Initialize
loadProducts();