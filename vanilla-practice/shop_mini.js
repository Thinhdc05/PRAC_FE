const userInfo = document.querySelector(".user-info")
const userBalance = document.querySelector(".user-balance")
const productCount = document.querySelector("#product-count")
const searchInput = document.querySelector("#search-input")
const categoryTabs = document.querySelector(".category-tabs");
const filterBtns = document.querySelectorAll(".filter-btn")
const productGrid = document.querySelector(".product-grid")
const cartItemsList = document.querySelector(".cart-items-list")
const cartTotal = document.querySelector("#cart-total")
const cartDiscount = document.querySelector("#cart-discount")
const cartFinalTotal = document.querySelector("#cart-final-total")
const checkoutBtn = document.querySelector("#checkout-btn")
const clearCartBtn = document.querySelector("#clear-cart-btn")
const pageSizeSelect = document.querySelector("#page-size-select");
const pageTotalInfo = document.querySelector("#page-total-info");
const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
const pageNumbersEl = document.querySelector("#page-numbers");
const pageInput = document.querySelector("#page-input");
let currentPage = 1;
let pageSize = 6;
const DEFAULT_BALANCE = 50000000;
let products = getProducts();
function loadBalance() {
    try {
        const raw = localStorage.getItem(STORAGE_KEYS.BALANCE);
        return raw !== null ? Number(raw) : DEFAULT_BALANCE;
    } catch {
        return DEFAULT_BALANCE;
    }
}
function saveBalance(amount) {
    try {
        localStorage.setItem(STORAGE_KEYS.BALANCE, amount);
    } catch (e) {
        console.error("Lỗi lưu số dư:", e);
    }
}
let balance = loadBalance();
function renderBalance() {
    if (userBalance) {
        userBalance.textContent = `${balance.toLocaleString()}₫`;
    }
}
renderBalance();

function saveCart(cartData) {
    try {
        localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cartData))
    } catch (e) {
        console.error("Lỗi lưu giỏ hàng:", e)
    }
}
function loadCart() {
    try {
        const raw = localStorage.getItem(STORAGE_KEYS.CART)
        return raw ? JSON.parse(raw) : []
    } catch {
        return [];
    }
}
let cart = loadCart()
let currentCategory = "all"
function renderSplitPage(pageData){
    const{currentPage,totalPages,totalItems} =pageData;
    if(pageTotalInfo){
        pageTotalInfo.textContent=`Tong ${totalItems} san pham`;
    }
    if(prevBtn) prevBtn.disabled =currentPage<=1;
    if(nextBtn) nextBtn.disabled =currentPage>=totalPages;
    if(pageNumbersEl){
        let buttonsHtml="";
        for(let i=1;i<=totalPages;i++){
            const activeClass=i===currentPage?"active":"";
            buttonsHtml+=`
            <button class="page-number-btn ${activeClass}" data-page="${i}">${i}</button>
            `
        }
        pageNumbersEl.innerHTML = buttonsHtml;
    }
    if (pageInput) {
        pageInput.value = currentPage;
        pageInput.max = totalPages;
    }
}
function renderProducts() {
    const filteredProducts = products.filter(item => {
        const matchCategory = currentCategory === "all" || item.category === currentCategory;
        const matchName = item.name.toLowerCase().includes(searchInput.value.toLowerCase().trim());
        const matchStatus = item.status === "active";
        return matchCategory && matchName && matchStatus;
    })
    const pageData = splitPages(filteredProducts, currentPage, pageSize);
    currentPage = pageData.currentPage;
    if (productCount) {
        productCount.textContent = filteredProducts.length
    }
    if (filteredProducts.length === 0) {
        productGrid.innerHTML = `
        <p style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #64748b;">Không có sản phẩm nào phù hợp</p>`;
        return;
    }
    productGrid.innerHTML = pageData.items.map(item => {
        const hotDealBadge = item.rating >= 4.7 ? `<span class="badge-hot">🔥Hot Deal </span>` : ""
        const catName = item.category === 'electronics' ? "Điện tử" : (item.category === "clothing" ? "Thời trang" : "Gia dụng")
        const discount = Math.round((1 - item.price / item.originalPrice) * 100)
        return `
        <div class="product-card">
            <div class="product-image">
                <img src="${item.image}" alt="${item.name}">
                <span class="product-category">${catName}</span>
                ${hotDealBadge}
            </div>
            <div class="product-detail">
                <div class="product-header">
                <span class="rating"> ⭐ ${item.rating} /5</span>
                <span class="discount-tag">${discount}%</span>
                </div>
                <div class="product-title">
                    <h3>${item.name}</h3>
                </div>
                <div class="product-price">
                    <span class="current-price">${item.price.toLocaleString()}₫</span>
                    <span class="original-price">${item.originalPrice.toLocaleString()}₫</span>
                </div>
                <div class="product-stock">
                ${item.stock > 0 ? `<span class="in-stock">Còn hàng ${item.stock}</span>` : '<span class="out-of-stock">Hết hàng</span>'}
                </div>
                <div class="add-cart">
                    <button class="add-to-cart-btn" data-id="${item.id}" ${item.stock > 0 ? "" : "disabled"}>Thêm vào giỏ</button>
                </div>
            </div>
        </div>`
    }).join("")
    renderSplitPage(pageData);
}
renderProducts();
searchInput.addEventListener("input", (e) => {
    currentPage = 1;
    searchKeyword = e.target.value;
    renderProducts();
})
categoryTabs.addEventListener("click", (e) => {
    if (e.target.classList.contains("filter-btn")) {
        currentPage = 1;
        document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"))
        e.target.classList.add("active")
        currentCategory = e.target.dataset.category
        renderProducts()
    }
})

function renderCart() {
    if (cart.length === 0) {
        cartItemsList.innerHTML = '<p>Giỏ hàng rỗng</p>';
        clearCartBtn.style.display = "none";
        if (cartTotal) cartTotal.textContent = "0đ";
        if (cartDiscount) cartDiscount.textContent = "0đ";
        if (cartFinalTotal) cartFinalTotal.textContent = "0đ";
        return;
    }
    clearCartBtn.style.display = "block"

    const subtotal = cart.reduce((sum, item) => {
        return sum + item.price * item.quantity;
    }, 0)
    cartTotal.textContent = `${subtotal.toLocaleString()}đ`
    cartDiscount.textContent = `0đ`
    cartFinalTotal.textContent = `${subtotal.toLocaleString()}đ`
    cartItemsList.innerHTML = cart.map(item => `
        <div class="cart-item">
        <div class="cart-item-img">
            <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="cart-item-info">
            <span class="item-name">${item.name}</span>
            <span class="item-price">${(item.price * item.quantity).toLocaleString()}đ</span>
            <div class="cart-item-quantity">
                <button class="quantity-btn" data-id="${item.id}" data-type="decrease">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="quantity-btn" data-id="${item.id}" data-type="increase">+</button>
            </div>
        </div>
        <div class="cart-item-remove">
            <button class="remove-item-btn" data-id="${item.id}">Xóa</button>
        </div>
        </div>
        `).join("");
    saveCart(cart);
}
renderCart();
function addToCart(productId) {
    const product = products.find(p => p.id === productId)
    if (!product || product.stock <= 0) {
        return;
    }
    // const existingItem = cart.find(i => i.id === productId)
    const index = cart.findIndex(i => i.id === productId);
    if (index !== -1) {
        cart[index] = { ...cart[index], quantity: cart[index].quantity + 1 }
        // cart = cart.map(item =>
        //     item.id === productId ? { ...item, quantity: item.quantity + 1 } : item);
    }
    else {
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    saveCart(cart);
    renderCart();
}
productGrid.addEventListener("click", (e) => {
    const btn = e.target.closest(".add-to-cart-btn")
    if (btn && !btn.disabled) {
        const productID = Number(btn.dataset.id)
        addToCart(productID)

    }
})
function removeFormCart(productId) {
    cart = cart.filter(item => item.id !== productId)
    saveCart(cart);
    renderCart();
}
function updateQuantity(productId, delta) {
    const item = cart.find(i => i.id === productId)
    if (!item) return;
    if (delta > 0) {
        const product = products.find(p => p.id === productId)
        if (product && item.quantity >= product.stock) {
            alert("số lượng quá giới hạn")
            item.quantity = product.stock;
            saveCart(cart);
            renderCart();
            return;
        }
    }
    item.quantity += delta;
    if (item.quantity <= 0) {
        removeFormCart(productId);
        return;
    }
    saveCart(cart);
    renderCart();
}
cartItemsList.addEventListener("click", (e) => {
    const qtyBtn = e.target.closest(".quantity-btn")
    if (qtyBtn) {
        const productID = Number(qtyBtn.dataset.id)
        const type = qtyBtn.dataset.type
        const delta = type === "increase" ? 1 : -1
        updateQuantity(productID, delta)
        return;
    }
    const removeBtn = e.target.closest(".remove-item-btn")
    if (removeBtn) {
        const productID = Number(removeBtn.dataset.id)
        removeFormCart(productID)
        return;
    }
})
clearCartBtn.addEventListener("click", () => {
    if (cart.length === 0) return;
    const isConfirm = confirm("Sure?");
    if (isConfirm) {
        cart = [];
        saveCart(cart);
        renderCart();
    }
});
function checkout() {
    if (cart.length === 0) {
        alert("Giỏ trống")
        return;
    }
    const subtotal = cart.reduce((sum, item) => {
        return sum + item.price * item.quantity;
    }, 0)
    if (balance < subtotal) {
        alert("Không đủ tiền");
        return;
    }
    if (!confirm("Xác nhận thanh toán?")) return;
    balance -= subtotal;
    saveBalance(balance);
    renderBalance();
    cart.forEach(item => {
        const product = products.find(p => p.id === item.id);
        if (product) {
            product.stock -= item.quantity;
        }
    });
    saveProducts(products);
    renderProducts();
    const newOrder={
        id:"DH"+Date.now(),
        items: [...cart],
        totalAmount: subtotal,
        status:"paid",
        timestamp: new Date().toLocaleString()
    }
    const orders=getOrders();
    orders.unshift(newOrder)
    saveOrders(orders)
    cart = [];
    saveCart(cart);
    renderCart();

}
checkoutBtn.addEventListener("click", () => {
    checkout();
})

if (prevBtn) {
    prevBtn.addEventListener("click", () => {
        currentPage--;
        renderProducts();
    });
}
if (nextBtn) {
    nextBtn.addEventListener("click", () => {
        currentPage++;
        renderProducts();
    });
}
if (pageNumbersEl) {
    pageNumbersEl.addEventListener("click", (e) => {
        const btn = e.target.closest(".page-number-btn");
        if (btn) {
            currentPage = Number(btn.dataset.page);
            renderProducts();
        }
    });
}
if (pageSizeSelect) {
    pageSizeSelect.addEventListener("change", (e) => {
        pageSize = Number(e.target.value);
        currentPage = 1;
        renderProducts();
    });
}
if (pageInput) {
    pageInput.addEventListener("change", (e) => {
        const targetPage = Number(e.target.value);
        if (targetPage > 0) {
            currentPage = targetPage;
            renderProducts();
        }
    });
}