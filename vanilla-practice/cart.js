const cart = [];
const productList = [
    { id: "p1", name: "Áo Thun a2", price: 150000 },
    { id: "p2", name: "Quần Jeans Slim", price: 350000 },
    { id: "p3", name: "Giày Sneaker", price: 600000 },
];
const cartList = document.getElementById("cart-list");
const totalPrice = document.getElementById("total-price");
const productListElement = document.getElementById("product-list");
function saveCartToLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
}
function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
        cart.push(...JSON.parse(savedCart));
    }
}
function saveTotalPriceToLocalStorage() {
    localStorage.setItem("totalPrice", totalPrice.textContent);
}
function loadTotalPriceFromLocalStorage() {
    const savedTotalPrice = localStorage.getItem("totalPrice");
    if (savedTotalPrice) {
        totalPrice.textContent = savedTotalPrice;
    }
}
productListElement.addEventListener("click",e =>{
    const btn=e.target.closest(".btn-add")
    if(!btn) return;
    const productItem=btn.closest(".product-item");
    const id=productItem.dataset.id;
    const name=productItem.dataset.name;
    const price=productItem.dataset.price;
    const existingItem=cart.find(item => item.id===id);
    if(!existingItem){
        cart.push({id,name,price:Number(price),quantity:1});
    }else{
        existingItem.quantity+=1;
    }
    saveCartToLocalStorage();
    renderCart();
}) 
function renderCart(){
    cartList.innerHTML="";
    
    if(cart.length===0){
        cartList.innerHTML = '<p style="color:red">Giỏ hàng rỗng</p>';
        totalPrice.textContent="0đ"
        saveCartToLocalStorage();
        saveTotalPriceToLocalStorage();
        return;
    }
    let total = 0;
    cart.forEach(item => {
        const totalProduct = item.price * item.quantity;
        total+=totalProduct;
        const cartItem = document.createElement("div");
        cartItem.className="cart-item";
        cartItem.dataset.id = item.id;
        cartItem.innerHTML = `  
        <div>
        <span class="cart-name">${item.name}</span>
        <small class="cart-price">${item.price.toLocaleString('vi-VN')}đ</small>
        </div>
        <div>
        <button class="btn-remove" data-id="${item.id}">-</button>
        <span class="cart-quantity">${item.quantity}</span>
        <button class="btn-increase" data-id="${item.id}">+</button>
        </div>
        `;
    cartList.appendChild(cartItem);
        
    });

    totalPrice.textContent = total.toLocaleString('vi-VN') + 'đ';
    saveCartToLocalStorage();
    saveTotalPriceToLocalStorage();
};

cartList.addEventListener("click", e => {
    const btn = e.target.closest(".btn-increase") || e.target.closest(".btn-remove");
    if(!btn) return;
    const itemId = btn.dataset.id;
    const item = cart.find(i => i.id === itemId);
    if(!item) return;
    if(btn.classList.contains("btn-increase")) {
        item.quantity++;
    }else if(btn.classList.contains("btn-remove")) {
        item.quantity--;
        if (item.quantity <= 0) {
        const index = cart.indexOf(item);
        cart.splice(index, 1); // Xóa món này ra khỏi mảng
    }
    }
    saveCartToLocalStorage();
    renderCart();
});
