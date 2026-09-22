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

const PRODUCTS = [
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
        inStock: false,
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
        inStock: false,
        rating: 4.3,
        image: "images/p12.jpg"
    }
];
const STORAGE_KEYS = {
    CART: "SHOP_MINI_CART",
    BALANCE: "SHOP_MINI_BALANCE"
}
function saveCart(cartData){
    try{
        localStorage.setItem(STORAGE_KEYS.CART,JSON.stringify(cartData))
    } catch(e){
        console.error("Lỗi lưu giỏ hàng:",e)
    }
}
function loadCart(){
    try{
        const raw = localStorage.getItem(STORAGE_KEYS.CART)
        return raw?JSON.parse(raw):[]
    } catch{
        return [];
    }
}
let cart = loadCart()
let currentCategory ="all"
function renderProducts(){
    const filteredProducts = PRODUCTS.filter(item =>{
        const matchCategory = currentCategory === "all" || item.category === currentCategory;
        const matchName = item.name.toLowerCase().includes(searchInput.value.toLowerCase().trim());
        return matchCategory && matchName;
    })
    if(productCount){
        productCount.textContent = filteredProducts.length
    }
    if(filteredProducts.length===0){
        productGrid.innerHTML = `
        <p>Không có sản phẩm nào phù hợp</p>`
    }
    productGrid.innerHTML = filteredProducts.map(item => {
        const hotDealBadge = item.rating >= 4.7 ? `<span class="badge-hot">🔥Hot Deal </span>` : ""
        const catName = item.category === 'electronics' ? "Điện tử": (item.category === "clothing" ? "Thời trang" : "Gia dụng")
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
                ${item.inStock ? '<span class="in-stock">Còn hàng</span>' : '<span class="out-of-stock">Hết hàng</span>'}
                </div>
                <div class="add-cart">
                    <button class="add-to-cart-btn" data-id="${item.id}" ${item.inStock ? "" : "disabled"}>Thêm vào giỏ</button>
                </div>
            </div>
        </div>`
    }).join("")
}
renderProducts();
searchInput.addEventListener("input", (e) => {
    searchKeyword = e.target.value;
    renderProducts();
})
categoryTabs.addEventListener("click",(e)=>{
    if(e.target.classList.contains("filter-btn")){
        document.querySelectorAll(".filter-btn").forEach(btn=>btn.classList.remove("active"))
        e.target.classList.add("active")
        currentCategory = e.target.dataset.category
        renderProducts()
    }
})

function renderCart(){
    if(cart.length===0){
        cartItemsList.innerHTML = '<p>Giỏ hàng rỗng</p>';
        clearCartBtn.style.display="none";
        return;
    }
    clearCartBtn.style.display="block"
    
    const subtotal = cart.reduce((sum,item)=>{
        return sum+item.price*item.quantity;
    },0)
    cartTotal.textContent = `${subtotal.toLocaleString()}đ`
    cartDiscount.textContent = `0đ`
    cartFinalTotal.textContent = `${subtotal.toLocaleString()}đ`
    cartItemsList.innerHTML = cart.map(item =>`
        <div class="cart-item">
        <div class="cart-item-img">
            <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="cart-item-info">
            <span class="item-name">${item.name}</span>
            <span class="item-price">${(item.price*item.quantity).toLocaleString()}đ</span>
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
function addToCart(productId){
    const product =PRODUCTS.find(p=>p.id === productId)
    if(!product || !product.inStock){
        return;
    }
    const existingItem =cart.find(i=>i.id===productId)
    if(existingItem){
        cart=cart.map(item =>
            item.id===productId ? {...item,quantity:item.quantity+1}:item);
    }
    else {
        cart.push({
            id:productId,
            name:product.name,
            price:product.price,
            image:product.image,
            quantity:1
        });
    }
    saveCart(cart);
    renderCart();
}
productGrid.addEventListener("click",(e)=>{
    const btn=e.target.closest(".add-to-cart-btn")
    if(btn && !btn.disabled){
        const productID = Number(btn.dataset.id)
        addToCart(productID)
        
    }
})
