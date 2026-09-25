
const totalProductsEl = document.querySelector("#total-products");
const activeStatusEl = document.querySelector("#active-status");
const pendingStatusEl = document.querySelector("#pending-status");
const outOfStockEl = document.querySelector("#out-of-stock");
const searchInput = document.querySelector(".search-input");
const statusFilter = document.querySelector("#status-filter");
const categoryFilter = document.querySelector("#category-filter");
const addProductBtn = document.querySelector("#add-product-btn");
const productTableBody = document.querySelector("#product-table-body");
const productModal = document.querySelector("#product-modal");
const closeModalBtn = document.querySelector("#close-modal-btn");
const cancelModalBtn = document.querySelector("#cancel-modal-btn");
const productForm = document.querySelector("#product-form");
const modalTitle = document.querySelector("#modal-title");
const productNameInput = document.querySelector("#product-name");
const productCategorySelect = document.querySelector("#product-category");
const productStatusSelect = document.querySelector("#product-status");
const productPriceInput = document.querySelector("#product-price");
const productOriginalPriceInput = document.querySelector("#product-original-price");
const productStockInput = document.querySelector("#product-stock");
const productRatingInput = document.querySelector("#product-rating");
const productImageInput = document.querySelector("#product-image");
const pageSizeSelect = document.querySelector("#page-size-select");
const pageTotalInfo = document.querySelector("#page-total-info");
const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
const pageNumbersEl = document.querySelector("#page-numbers");
const pageInput = document.querySelector("#page-input");
let currentPage = 1;
let pageSize = 6;
let products=getProducts();
function renderTable(data=products){
    const pageData=splitPages(data,currentPage,pageSize);
    currentPage = pageData.currentPage;
    if(pageData.items.length===0){
        productTableBody.innerHTML =`
        <tr>
            <td colspan="7" class="text-center">không có sản phẩm nào</td>
        </tr> `
    }
    productTableBody.innerHTML=pageData.items.map((item,index)=>{
        const stt =(currentPage-1)*pageSize+index+1;
        const catName=item.category==="electronics"?"Điện tử":(item.category==="clothing"?"Thơi trang":"Gia dụng")
         const statusText = item.status === 'active' ? "Đang bán" : "Tạm ẩn";
         const statusClass = item.status === 'active' ? "status-active" : "status-pending";
         return `
            <tr>
                <td>${stt}</td>
                <td><img src="${item.image}" alt="${item.name}" class="product-img-table"></td>
                <td>${item.name}</td>
                <td>${catName}</td>
                <td>${item.originalPrice.toLocaleString()}đ</td>
                <td>${item.price.toLocaleString()}đ</td>
                <td>${item.stock}</td>
                <td>
                    <span class="${statusClass}">${statusText}</span>
                </td>
                <td>${item.rating}</td>
                <td>
                    <button class="edit-btn" data-id="${item.id}">Sửa</button>
                    <button class="delete-btn" data-id="${item.id}">Xóa</button>
                </td>
            </tr>
         `
    }).join("")
    renderSplitPage(pageData);
}
renderTable();
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
function renderStats(){
    if(totalProductsEl) totalProductsEl.textContent=products.length;
    if(activeStatusEl) activeStatusEl.textContent = products.filter(p=>p.status==="active").length;
    if(pendingStatusEl) pendingStatusEl.textContent=products.filter(p=>p.status==="pending").length;
    if(outOfStockEl) outOfStockEl.textContent=products.filter(p=>p.stock===0).length
}
renderStats();
function applyFilters(){
    const keyword=searchInput.value.toLowerCase().trim();
    const status=statusFilter.value;
    const category=categoryFilter.value;
    const filtered=products.filter(item=>{
    const matchName=item.name.toLowerCase().trim().includes(keyword);
    const matchStatus=status==="all"||item.status===status;
    const matchCategory=category==="all"||item.category===category;
    return matchName&&matchStatus&&matchCategory;
    });
    renderTable(filtered);
}
searchInput.addEventListener("input",()=>{  
    currentPage = 1;
    applyFilters();
})
statusFilter.addEventListener("change",()=>{
    currentPage = 1;
    applyFilters();
})
categoryFilter.addEventListener("change",()=>{
    currentPage = 1;
    applyFilters();
})

function openModal() {
    productModal.classList.add("active");
}
function closeModal() {
    productModal.classList.remove("active");
    productForm.reset();
    editingId=null;
}
closeModalBtn.addEventListener("click",closeModal)
cancelModalBtn.addEventListener("click",closeModal)
productModal.addEventListener("click",(e)=>{
    if(e.target===productModal) closeModal();
})
addProductBtn.addEventListener("click",()=>{
    editingId=null;
    modalTitle.textContent="thêm sản phẩm mới";
    productForm.reset();
    openModal();
})
function handleEdit(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    editingId = productId;
    modalTitle.textContent = "Chỉnh sửa sản phẩm";
    productNameInput.value = product.name;
    productCategorySelect.value = product.category;
    productStatusSelect.value = product.status;
    productPriceInput.value = product.price;
    productOriginalPriceInput.value = product.originalPrice || "";
    productStockInput.value = product.stock;
    productRatingInput.value = product.rating || "";
    productImageInput.value = product.image;
    openModal();
}
productTableBody.addEventListener("click", (e) => {
    const editBtn = e.target.closest(".edit-btn");
    if (editBtn) {
        const id = Number(editBtn.dataset.id);
        handleEdit(id);
        return;
    }
    const deleteBtn=e.target.closest(".delete-btn");
    if(deleteBtn){
        const id=Number(deleteBtn.dataset.id);
        if(confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")){
            products=products.filter(p=>p.id!==id);
            saveProducts(products);
            renderTable();
            renderStats();
        }
        return;
    }
});
productForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const productData={
        name:productNameInput.value.trim(),
        category:productCategorySelect.value,
        status:productStatusSelect.value,
        price:+productPriceInput.value,
        originalPrice:+productOriginalPriceInput.value,
        stock:+productStockInput.value,
        rating:+productRatingInput.value,
        image:productImageInput.value.trim()
    }
    if(editingId===null){
        const newId=products.length>0?Math.max(...products.map(p=>p.id))+1:1;
        products.push({...productData,id:newId});
    }else{
        // products=products.map(p=>p.id===editingId?{...p,...productData}:p);
        const index=products.findIndex(p=>p.id===editingId);
        if(index!==-1){
            products[index]={
                ...products[index],
                ...productData
            }
        }

    }
    saveProducts(products);
    renderTable();
    renderStats();
    closeModal();
})
if (prevBtn) {
    prevBtn.addEventListener("click", () => {
        currentPage--;
        applyFilters();
    });
}
if (nextBtn) {
    nextBtn.addEventListener("click", () => {
        currentPage++;
        applyFilters();
    });
}
if (pageNumbersEl) {
    pageNumbersEl.addEventListener("click", (e) => {
        const btn = e.target.closest(".page-number-btn");
        if (btn) {
            currentPage = Number(btn.dataset.page);
            applyFilters();
        }
    });
}
if (pageSizeSelect) {
    pageSizeSelect.addEventListener("change", (e) => {
        pageSize = Number(e.target.value);
        currentPage = 1; 
        applyFilters();
    });
}
if (pageInput) {
    pageInput.addEventListener("change", (e) => {
        const targetPage = Number(e.target.value);
        if (targetPage > 0) {
            currentPage = targetPage;
            applyFilters();
        }
    });
}
