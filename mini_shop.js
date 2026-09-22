const searchInput = document.querySelector("#search-input");
const categoryTabs = document.querySelector(".category-tabs");
const productGrid = document.querySelector(".product-grid");
const productCount = document.querySelector("#product-count");
const cartItemsList = document.querySelector(".cart-items-list")
const cartSummary= document.querySelector(".cart-summary")
const clearCartBtn = document.querySelector("#clear-cart-btn")
const userBalanceEl = document.querySelector('.user-balance');
const products = [
    {
        id: 1,
        name: "Tai nghe không dây Sony WH-1000XM5",
        category: "electronics",
        price: 6990000,
        originalPrice: 8490000,
        inStock: true,
        rating: 4.9,
        image: "images/p1.jpg"
    },
    {
        id: 2,
        name: "Áo khoác Bomber Nam Minimalist",
        category: "clothing",
        price: 590000,
        originalPrice: 850000,
        inStock: true,
        rating: 4.6,
        image: "images/p2.jpg"
    },
    {
        id: 3,
        name: "Robot hút bụi lau nhà thông minh",
        category: "home",
        price: 9990000,
        originalPrice: 12500000,
        inStock: true,
        rating: 4.8,
        image: "images/p3.jpg"
    },
    {
        id: 4,
        name: "Điện thoại Smartphone Flagship 5G",
        category: "electronics",
        price: 24990000,
        originalPrice: 28990000,
        inStock: true,
        rating: 4.9,
        image: "images/p4.jpg"
    },
    {
        id: 5,
        name: "Balo Chống Nước Đa Năng Workpack",
        category: "clothing",
        price: 680000,
        originalPrice: 950000,
        inStock: true,
        rating: 4.5,
        image: "images/p5.jpg"
    },
    {
        id: 6,
        name: "Máy pha cà phê Espresso tự động",
        category: "home",
        price: 4500000,
        originalPrice: 5900000,
        inStock: false, // Tạm hết hàng
        rating: 4.7,
        image: "images/p6.webp"
    },
    {
        id: 7,
        name: "Bàn phím cơ Bluetooth RGB Tenkeyless",
        category: "electronics",
        price: 1850000,
        originalPrice: 2400000,
        inStock: true,
        rating: 4.8,
        image: "images/p7.webp"
    },
    {
        id: 8,
        name: "Quần Jeans Slimfit Co Giãn Cao Cấp",
        category: "clothing",
        price: 450000,
        originalPrice: 650000,
        inStock: true,
        rating: 4.2,
        image: "images/p8.jpg"
    },
    {
        id: 9,
        name: "Nồi chiên không dầu điện tử 6.5L",
        category: "home",
        price: 1990000,
        originalPrice: 2790000,
        inStock: true,
        rating: 4.7,
        image: "images/p9.jpg"
    },
    {
        id: 10,
        name: "Chuột Gaming Không Dây Siêu Nhẹ",
        category: "electronics",
        price: 1290000,
        originalPrice: 1690000,
        inStock: true,
        rating: 4.4,
        image: "images/p11.jpg"
    },
    {
        id: 11,
        name: "Giày Thể Thao Sneaker Streetwear",
        category: "clothing",
        price: 890000,
        originalPrice: 1200000,
        inStock: false, // Tạm hết hàng
        rating: 4.3,
        image: "images/p12.jpg"
    }
];

const STORAGE_KEYS = {
    CART: 'SMART_SHOP_CART',
    BALANCE: 'SMART_SHOP_BALANCE'
};

function saveBalance(amount) {
    try {
        localStorage.setItem(STORAGE_KEYS.BALANCE, amount.toString());
    } catch (error) {
        console.error("Lỗi khi lưu số dư ví:", error);
    }
}

function loadBalance() {
    try {
        const raw = localStorage.getItem(STORAGE_KEYS.BALANCE);
        return raw !== null ? Number(raw) : 50000000;
    } catch (error) {
        return 50000000;
    }
}

function saveCart(cartData) {
    try {
        localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cartData));
    } catch (error) {
        console.error("Lỗi khi lưu giỏ hàng:", error);
    }
}

function loadCart() {
    try {
        const raw = localStorage.getItem(STORAGE_KEYS.CART);
        return raw ? JSON.parse(raw) : [];
    } catch (error) {
        return [];
    }
}

let cart = loadCart();
let userBalance = loadBalance();
let currentCategory = 'all';
let searchKeyword = '';
function renderBalance() {
    if (userBalanceEl) {
        userBalanceEl.textContent = `Ví: ${userBalance.toLocaleString('vi-VN')} đ`;
    }
}
function renderProducts() {
    // 1. Sàng lọc sản phẩm bằng .filter()
    const filteredProducts = products.filter(item => {
        const matchCategory = currentCategory === 'all' || item.category === currentCategory;
        const matchSearch = item.name.toLowerCase().includes(searchKeyword.toLowerCase().trim());
        return matchCategory && matchSearch;
    });

    // 2. Cập nhật số lượng hiển thị
    if (productCount) {
        productCount.textContent = `Số sản phẩm hiện có: ${filteredProducts.length}`;
    }

    // 3. Nếu không tìm thấy món nào
    if (filteredProducts.length === 0) {
        productGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #64748b;">
                🔍 Không tìm thấy sản phẩm nào phù hợp với từ khóa!
            </div>
        `;
        return;
    }

    // 4. Dùng .map() biến Mảng Object thành HTML
    productGrid.innerHTML = filteredProducts.map(item => {
        const hotDealBadge = item.rating >= 4.7 ? `<span class="badge badge-hot">🔥 HOT DEAL</span>` : '';
        const catName = item.category === 'electronics' ? 'Điện tử' : (item.category === 'clothing' ? 'Thời trang' : 'Gia dụng');
        const discount = Math.round((1 - item.price / item.originalPrice) * 100);

        return `
            <div class="product-card">
                <div class="card-img-wrap">
                    <img src="${item.image}" alt="${item.name}">
                    <span class="badge badge-cat">${catName}</span>
                    ${hotDealBadge}
                </div>
                <div class="card-info">
                    <div class="card-meta">
                        <span class="rating">⭐ ${item.rating} / 5.0</span>
                        <span class="discount-tag">-${discount}%</span>
                    </div>
                    <h4 class="product-title">${item.name}</h4>
                    <div class="price-wrap">
                        <span class="sale-price">${item.price.toLocaleString('vi-VN')} đ</span>
                        <span class="original-price">${item.originalPrice.toLocaleString('vi-VN')} đ</span>
                    </div>
                    <button class="btn-add-cart" data-id="${item.id}" ${!item.inStock ? 'disabled style="background-color: #cbd5e1; cursor: not-allowed; color: #64748b;"' : ''}>
                        ${item.inStock ? '🛒 + Thêm vào giỏ' : '⛔ Tạm hết hàng'}
                    </button>
                </div>
            </div>
        `;
    }).join('');
}
function renderCart() {
    if (cart.length === 0) {
        cartItemsList.innerHTML = `<div style="text-align: center; color: #94a3b8; padding: 24px 0; font-size: 14px;">🛍️ Giỏ hàng đang trống</div>`;
        cartSummary.innerHTML = `
            <div class="summary-title">📋 Tóm tắt đơn hàng</div>
            <div class="summary-row"><span>Tổng số lượng món:</span><strong>0 món</strong></div>
            <div class="summary-row"><span>Tạm tính tiền hàng:</span><span>0 đ</span></div>
            <div class="summary-row"><span>Phí vận chuyển:</span><span class="free-ship">Miễn phí</span></div>
            <hr class="summary-divider">
            <div class="summary-total-wrap">
                <div>
                    <div class="total-label">TỔNG TIỀN THANH TOÁN</div>
                    <small>Đã bao gồm thuế VAT</small>
                </div>
                <div class="total-price-highlight">0 đ</div>
            </div>
            <button class="btn-checkout" style="background-color: #cbd5e1; cursor: not-allowed;" disabled>🛒 Tiến hành thanh toán</button>
        `;
        return;
    }

    const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    cartItemsList.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-img">
            <div class="cart-item-info">
                <h5 class="cart-item-title">${item.name}</h5>
                <div class="cart-item-price">${(item.price * item.quantity).toLocaleString('vi-VN')} đ</div>
                <div class="cart-item-actions">
                    <div class="quantity-control">
                        <button class="btn-qty" data-action="decrease" data-id="${item.id}">-</button>
                        <span class="qty-number">${item.quantity}</span>
                        <button class="btn-qty" data-action="increase" data-id="${item.id}">+</button>
                    </div>
                    <button class="btn-remove-item" data-action="remove" data-id="${item.id}">🗑️</button>
                </div>
            </div>
        </div>
    `).join('');
    cartSummary.innerHTML = `
        <div class="summary-title">📋 Tóm tắt đơn hàng</div>
        <div class="summary-row"><span>Tổng số lượng món:</span><strong>${totalQty} món</strong></div>
        <div class="summary-row"><span>Tạm tính tiền hàng:</span><span>${subtotal.toLocaleString('vi-VN')} đ</span></div>
        <div class="summary-row"><span>Phí vận chuyển:</span><span class="free-ship">Miễn phí</span></div>
        <hr class="summary-divider">
        <div class="summary-total-wrap">
            <div>
                <div class="total-label">TỔNG TIỀN THANH TOÁN</div>
                <small>Đã bao gồm thuế VAT</small>
            </div>
            <div class="total-price-highlight">${subtotal.toLocaleString('vi-VN')} đ</div>
        </div>
        <button class="btn-checkout" id="checkout-btn">🛒 Tiến hành thanh toán</button>
    `;
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product || !product.inStock) return;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        cart = cart.map(item => 
            item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
    } else {
        cart = [...cart, { ...product, quantity: 1 }];
    }

    saveCart(cart);
    renderCart();
}

function updateQuantity(productId, delta) {
    cart = cart.map(item => {
        if (item.id === productId) {
            return { ...item, quantity: item.quantity + delta };
        }
        return item;
    }).filter(item => item.quantity > 0);

    saveCart(cart);
    renderCart();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
    renderCart();
}

function clearCart() {
    if (cart.length === 0) return;
    cart = [];
    saveCart(cart);
    renderCart();
}

function checkout() {
    if (cart.length === 0) {
        alert("Giỏ hàng của bạn đang trống!");
        return;
    }

    const totalBill = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    if (userBalance < totalBill) {
        alert("Số dư tài khoản không đủ để thanh toán đơn hàng này!");
        return;
    }

    userBalance -= totalBill;
    saveBalance(userBalance);
    cart = [];
    saveCart(cart);

    renderBalance();
    renderCart();
    alert(`🎉 Thanh toán thành công ${totalBill.toLocaleString('vi-VN')} đ! Số dư còn lại: ${userBalance.toLocaleString('vi-VN')} đ`);
}

productGrid.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-add-cart');
    if (btn && !btn.disabled) {
        const id = Number(btn.dataset.id);
        addToCart(id);
    }
});

cartItemsList.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;

    const action = btn.dataset.action;
    const id = Number(btn.dataset.id);

    if (action === 'increase') updateQuantity(id, 1);
    if (action === 'decrease') updateQuantity(id, -1);
    if (action === 'remove') removeFromCart(id);
});

clearCartBtn.addEventListener('click', clearCart);

cartSummary.addEventListener('click', (e) => {
    if (e.target.id === 'checkout-btn') {
        checkout();
    }
});

renderBalance();
renderProducts();
renderCart();

searchInput.addEventListener('input', (e) => {
    searchKeyword = e.target.value;
    renderProducts();
});

categoryTabs.addEventListener('click', (e) => {
    if (e.target.classList.contains('filter-btn')) {
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        currentCategory = e.target.dataset.category;
        renderProducts();
    }
});