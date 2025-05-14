let cart = JSON.parse(localStorage.getItem('vinyl-cart')) || [];
let orders = JSON.parse(localStorage.getItem('vinyl-orders')) || [];

// DOM
const elements = {
    cartContainer: document.getElementById('cart-container'),
    cartSummary: document.getElementById('cart-summary'),
    emptyMsg: document.getElementById('empty-cart-message'),
    confirmMsg: document.getElementById('order-confirmation'),
    totalItems: document.getElementById('total-items'),
    totalPrice: document.getElementById('total-price'),
    orderNumber: document.getElementById('order-number'),
    cartCount: document.getElementById('cart-count'),
};

document.addEventListener('DOMContentLoaded', () => {
    showCart();
    setupEventListeners();
});

// Show cart contents
function showCart() {
    // if !cart.length) = display emptyMsg
    // else = display cartContainer + cartSummary
    if (cart.length === 0) {
        elements.cartContainer.style.display = 'none';
        elements.cartSummary.style.display = 'none';
        elements.emptyMsg.style.display = 'block';
        elements.confirmMsg.style.display = 'none';
        return;
    }

    elements.cartContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image || 'images/placeholder.jpg'}" alt="${item.album}">
            <div class="item-info">
                <h3>${item.album}</h3>
                <p>${item.artist}</p>
                <p>€${(item.price * item.quantity).toFixed(2)}</p>
            </div>
            <div class="item-controls">
                <div>
                    <button class="qty-btn minus" data-id="${item.id}">-</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn plus" data-id="${item.id}">+</button>
                </div>
                <button class="remove-btn" data-id="${item.id}">Remove</button>
            </div>
        </div>
    `).join('');

    updateTotals();
    elements.cartContainer.style.display = 'block';
    elements.cartSummary.style.display = 'block';
    elements.emptyMsg.style.display = 'none';
}

// Cart totals
function updateTotals() {
    const itemsTotal = cart.reduce((sum, item) => sum + item.quantity, 0);
    const priceTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    elements.totalItems.textContent = itemsTotal;
    elements.totalPrice.textContent = `€${priceTotal.toFixed(2)}`;
    elements.cartCount.textContent = itemsTotal;
}

// Save cart to local Storage
function saveCart() {
    localStorage.setItem('vinyl-cart', JSON.stringify(cart));
    updateTotals();
}

// quantity changes
function changeQuantity(e) {
    const id = parseInt(e.target.dataset.id);
    const item = cart.find(cartItem => cartItem.id === id);
    if (!item) return;

    if (e.target.classList.contains('minus')) {
        if (item.quantity > 1) item.quantity--;
        else return;
    } else if (e.target.classList.contains('plus')) {
        item.quantity++;
    }

    saveCart();
    showCart();
}

// Remove item
function removeItem(e) {
    const id = parseInt(e.target.dataset.id);
    cart = cart.filter(item => item.id !== id);
    saveCart();
    showCart();
}

// Empty cart
function emptyCart() {
    const shouldEmpty = window.confirm('Empty your cart?');
    if (shouldEmpty) {
        cart = [];
        saveCart();
        showCart();
    }
}

// Process checkout
function checkout() {
    const orderId = `DI-${Date.now().toString().slice(-6)}`;
    const orderTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // toISOString for date in standard format instead of toString which would return different
    // (outputs of time-zone and format), in different locations and browsers
    orders.push({
        id: orderId,
        date: new Date().toISOString(),
        items: [...cart],
        total: orderTotal,
    });

    localStorage.setItem('vinyl-orders', JSON.stringify(orders));
    elements.orderNumber.textContent = orderId;

    cart = [];
    saveCart();

    elements.cartContainer.style.display = 'none';
    elements.cartSummary.style.display = 'none';
    elements.confirmMsg.style.display = 'block';
}

// Event listeners
function setupEventListeners() {
    document.addEventListener('click', e => {
        if (e.target.classList.contains('qty-btn')) changeQuantity(e);
        if (e.target.classList.contains('remove-btn')) removeItem(e);
    });

    document.getElementById('empty-cart').addEventListener('click', emptyCart);
    document.getElementById('checkout-btn').addEventListener('click', checkout);
    document.getElementById('continue-shopping').addEventListener('click', () => {
        window.location.href = 'index.html';
    });
}
