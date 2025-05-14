let products = JSON.parse(localStorage.getItem('vinyl-products')) || [];
let orders = JSON.parse(localStorage.getItem('vinyl-orders')) || [];

// DOM elements
const elements = {
    productsContainer: document.getElementById('products-container'),
    ordersContainer: document.getElementById('orders-container'),
    addProductForm: document.getElementById('add-product-form'),
    editProductForm: document.getElementById('edit-product-form'),
    resetBtn: document.getElementById('reset-products'),
};

document.addEventListener('DOMContentLoaded', () => {
    // Check if products exist in localStorage first
    if (products.length === 0) {
        loadProductsFromFile(); // Only load from file if no products in localStorage
    } else {
        showProducts(); // Use existing products from localStorage
    }

    loadOrders();
    setupTabs();
    setupEventListeners();
});

// Tab navigation
function setupTabs() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => {
                c.style.display = 'none';
            });

            btn.classList.add('active');
            document.getElementById(`${btn.dataset.tab}-tab`).style.display = 'block';
        });
    });
}

// Load data from file/ JSON (only if local Storage is empty)
async function loadProductsFromFile() {
    try {
        const response = await fetch('products.json');
        products = await response.json();
        localStorage.setItem('vinyl-products', JSON.stringify(products));
        showProducts();
    } catch (error) {
        console.error('Error loading products:', error);
        elements.productsContainer.innerHTML = '<p>Error loading products</p>';
    }
}

function loadOrders() {
    showOrders();
}

// Display products
function showProducts() {
    elements.productsContainer.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Artist</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${products.map(product => `
                    <tr>
                        <td>${product.id}</td>
                        <td>${product.album}</td>
                        <td>${product.artist}</td>
                        <td>€${product.price.toFixed(2)}</td>
                        <td class="${product['in-stock'] ? 'in-stock' : 'out-of-stock'}">
                            ${product['in-stock'] ? 'In Stock' : 'Out of Stock'}
                        </td>
                        <td>
                            <button class="edit-btn" data-id="${product.id}">Edit</button>
                            <button class="delete-btn" data-id="${product.id}">Delete</button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

// Display orders
function showOrders() {
    elements.ordersContainer.innerHTML = orders.length
        ? orders.sort((a, b) => new Date(b.date) - new Date(a.date)).map(order => `
            <div class="order-card">
                <h4>Order: #${order.id}</h4>
                <p>Date: ${new Date(order.date).toLocaleString()}</p>
                <div class="order-items">
                    ${order.items.map(item => `
                        <div class="item">
                            <span>${item.quantity}x ${item.album}</span>
                            <span>€${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    `).join('')}
                </div>
                <p class="total">Total: €${order.total.toFixed(2)}</p>
            </div>
        `).join('')
        : '<p>No orders found</p>';
}

// Add new products form
elements.addProductForm.addEventListener('submit', e => {
    e.preventDefault();
    const newProduct = {
        id: products.length ? Math.max(...products.map(p => p.id)) + 1 : 1,
        album: e.target['vinyl-name'].value,
        artist: e.target.artist.value,
        description: e.target.description.value,
        price: parseFloat(e.target.price.value),
        'in-stock': e.target['in-stock'].checked,
        image: e.target.image.value || 'images/placeholder.jpg',
    };

    products.push(newProduct);
    localStorage.setItem('vinyl-products', JSON.stringify(products));
    showProducts();
    e.target.reset();
    alert('Product added!');
});

// edit products form and modal
elements.editProductForm.addEventListener('submit', e => {
    e.preventDefault();
    const id = parseInt(e.target['edit-id'].value);
    const index = products.findIndex(p => p.id === id);

    if (index !== -1) {
        products[index] = {
            ...products[index],
            album: e.target['edit-vinyl-name'].value,
            artist: e.target['edit-artist'].value,
            description: e.target['edit-description'].value,
            price: parseFloat(e.target['edit-price'].value),
            'in-stock': e.target['edit-in-stock'].checked,
            image: e.target['edit-image'].value,
        };

        localStorage.setItem('vinyl-products', JSON.stringify(products));
        showProducts();
        closeModal();
        alert('Product updated!');
    }
});

// Reset products to JSON
elements.resetBtn.addEventListener('click', () => {
    const shouldReset = window.confirm('Reset all products to default?');
    if (shouldReset) {
        localStorage.removeItem('vinyl-products');
        loadProductsFromFile();
    }
});

document.addEventListener('click', e => {
    if (e.target.classList.contains('edit-btn')) {
        const product = products.find(p => p.id === parseInt(e.target.dataset.id));
        if (product) openEditModal(product);
    }

    if (e.target.classList.contains('delete-btn')) {
        const shouldDelete = window.confirm('Delete this product?');
        if (shouldDelete) {
            products = products.filter(p => p.id !== parseInt(e.target.dataset.id));
            localStorage.setItem('vinyl-products', JSON.stringify(products));
            showProducts();
        }
    }

    if (e.target.classList.contains('close-modal')) {
        closeModal();
    }
});

// Open edit modal
function openEditModal(product) {
    const form = document.getElementById('edit-product-form');
    form['edit-id'].value = product.id;
    form['edit-vinyl-name'].value = product.album;
    form['edit-artist'].value = product.artist;
    form['edit-description'].value = product.description || '';
    form['edit-price'].value = product.price;
    form['edit-in-stock'].checked = product['in-stock'];
    form['edit-image'].value = product.image || 'images/placeholder.jpg';

    document.getElementById('edit-modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('edit-modal').style.display = 'none';
}

function setupEventListeners() {
    window.addEventListener('click', e => {
        if (e.target === document.getElementById('edit-modal')) {
            closeModal();
        }
    });
}
