let vinylProducts = JSON.parse(localStorage.getItem('vinyl-products')) || [];
let cart = JSON.parse(localStorage.getItem('vinyl-cart')) || [];

const elements = {
    productsContainer: document.getElementById('products-container'),
    cartCount: document.getElementById('cart-count'),
    searchInput: document.getElementById('search-input'),
    artistFilter: document.getElementById('artist-filter'),
    availabilityFilter: document.getElementById('availability-filter'),
};

async function init() {
    if (vinylProducts.length === 0) {
        await fetchProducts();
    } else {
        populateFilters(vinylProducts); // filters geven
        renderProducts(vinylProducts); // producten renderen
        console.log('Products loaded from localStorage');
        console.log(vinylProducts);
    }

    updateCartCount();
    setupEventListeners();
}

async function fetchProducts() {
    try {
        const response = await fetch('products.json');
        if (!response.ok) throw new Error('Failed to fetch products');
        vinylProducts = await response.json();
        console.log('Products fetched from JSON:', vinylProducts);
        localStorage.setItem('vinyl-products', JSON.stringify(vinylProducts));
        populateFilters(vinylProducts);
        renderProducts(vinylProducts);
    } catch (error) {
        console.error('Error:', error);
        elements.productsContainer.innerHTML = '<p>Could not load products...</p>';
    }
}

function populateFilters(products) {
    const artists = [...new Set(products.map(p => p.artist))];
    while (elements.artistFilter.options.length > 1) {
        elements.artistFilter.remove(1);
    }
    artists.forEach(artist => {
        const option = document.createElement('option');
        option.value = artist;
        option.textContent = artist;
        elements.artistFilter.appendChild(option);
    });
}

function renderProducts(products) {
    elements.productsContainer.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="image-container">
                <img src="${product.image}" alt="${product.album}" 
                     onerror="this.src='images/placeholder.jpg'">
            </div>
            <div class="product-info">
                <h3>${product.album}</h3>
                <h4>${product.artist}</h4>
                <p>${product.discription}</p>
                <p class="price">€${product.price.toFixed(2)}</p>
                ${product['in-stock'] ?
        `<button class="add-to-cart" data-id="${product.id}">Add to Cart</button>` :
        '<span class="out-of-stock">Out of Stock</span>'}
            </div>
        </div>
    `).join('');
}

function addToCart(productId) {
    const product = vinylProducts.find(p => p.id === productId);
    if (!product) return;
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    saveCart();
    updateCartCount();
}

function saveCart() {
    localStorage.setItem('vinyl-cart', JSON.stringify(cart));
}

function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    elements.cartCount.textContent = count;
    console.log('Cart count updated:', count);
}

function setupEventListeners() {
    document.addEventListener('click', e => {
        if (e.target.classList.contains('add-to-cart')) {
            addToCart(parseInt(e.target.dataset.id));
        }
    });

    elements.searchInput.addEventListener('input', filterProducts);
    elements.artistFilter.addEventListener('change', filterProducts);
    elements.availabilityFilter.addEventListener('change', filterProducts);
}

function filterProducts() {
    const search = elements.searchInput.value.toLowerCase();
    const artist = elements.artistFilter.value;
    const inStock = elements.availabilityFilter.value;

    let filtered = [...vinylProducts];

    if (search) {
        filtered = filtered.filter(p => p.album.toLowerCase().includes(search) ||
        p.artist.toLowerCase().includes(search),
        );
    }
    if (artist) {
        filtered = filtered.filter(p => p.artist === artist);
    }

    if (inStock) {
        filtered = filtered.filter(p => p['in-stock'] === (inStock === 'true'));
    }

    renderProducts(filtered);
}

document.addEventListener('DOMContentLoaded', init);
