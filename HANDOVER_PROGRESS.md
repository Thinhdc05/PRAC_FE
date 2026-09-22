# 📋 BÁO CÁO TIẾN ĐỘ & BÀN GIAO DỰ ÁN PRAC_FE (HANDOVER PROGRESS)

> **Dành cho AI tiếp quản tại máy cá nhân:** 
> Vui lòng đọc kỹ file này kết hợp với `.agents/skills/fe-teaching-method/SKILL.md` để tiếp tục giữ đúng phong cách giảng dạy: **mổ xẻ cơ chế ngầm Browser/JS Engine, clean code không comment thừa, không dùng LaTeX, đồng hành hướng dẫn người học tự code.**

---

## 🧭 1. TỔNG QUAN NGỮ CẢNH DỰ ÁN

- **Thư mục repo:** `/Users/thinh/FE/Prac_FE/PRAC_FE` (Chú ý: thư mục git nằm trong `PRAC_FE`).
- **Nhánh Git:** `main` (Đã commit và push code mới nhất lên `origin/main`).
- **Bộ file tham chiếu mẫu đã hoàn thiện trước đó:** `mini_shop.html`, `mini_shop.css`, `mini_shop.js`.
- **Bộ file người học đang trực tiếp xây dựng:**
  - `shop_mini.html`
  - `shop_mini.css`
  - `shop_mini.js`
  - *(Kế hoạch tiếp theo: `admin.html`, `admin.css`, `admin.js`)*.

---

## ✅ 2. NHỮNG GÌ ĐÃ HOÀN THÀNH HÔM NAY (DAY 1)

### A. Giao diện & HTML/CSS (`shop_mini.html`, `shop_mini.css`)
- Khung Semantic HTML chuẩn: Header, Layout 2 cột (`2fr 1fr`), Lưới sản phẩm Grid 3 cột, Cột giỏ hàng bên phải.
- Tự tay CSS hoàn thiện các Card sản phẩm:
  - Khung `.product-card` flexbox, hover nổi bóng.
  - Ảnh `.product-image` dùng `position: relative`, `object-fit: cover` khống chế 11 ảnh không bị vỡ/tràn.
  - Huy hiệu `.product-category` và `.badge-hot` định vị tuyệt đối `position: absolute`.
  - Header card, rating, tag giảm giá, giá tiền căn thẳng `align-items: baseline`, tồn kho, nút thêm vào giỏ.
- CSS xong các thành phần cơ bản trong giỏ hàng (`.cart-item`, `.cart-item-img`, `.cart-item-info`, `.item-name`, `.item-price`, `.cart-item-quantity` flexbox hàng ngang, nút tăng giảm `.quantity-btn`).
- Đã thêm nút chuyển hướng sang Admin trên header: `<a href="admin.html" class="admin-nav-btn">⚙️ Quản trị Admin</a>`.

### B. Logic JavaScript (`shop_mini.js`)
- **Dữ liệu 11 sản phẩm:** Khai báo chuẩn mảng `PRODUCTS` tương ứng với 11 ảnh trong thư mục `images/` (chú ý `p6.webp`, `p7.webp`).
- **Render sản phẩm (`renderProducts`):**
  - Kết hợp sàng lọc 2 lớp: `.filter()` theo danh mục (`currentCategory === 'all' || item.category === currentCategory`) và ô tìm kiếm (`item.name.toLowerCase().includes(...)`).
  - Dùng `.map().join('')` đổ thẻ HTML.
- **Sự kiện Bộ lọc & Tìm kiếm:**
  - `searchInput.addEventListener('input', ...)`
  - `categoryTabs.addEventListener('click', ...)` (Áp dụng kỹ thuật Ủy quyền sự kiện Event Delegation).
- **Cơ chế LocalStorage cho giỏ hàng:**
  - Khóa `SHOP_MINI_CART`.
  - Hàm `saveCart(cartData)` và `loadCart()` có bọc `try...catch` phòng thủ lỗi bộ nhớ.
- **Hàm `renderCart()`:**
  - Dùng **`.reduce()`** tính tổng tiền hàng `subtotal`.
  - Đổ dữ liệu vào các thẻ `#cart-total`, `#cart-discount`, `#cart-final-total`.
  - Dùng `.map().join('')` vẽ các món trong giỏ (`.cart-item`).
  - Xử lý trạng thái giỏ rỗng: hiện chữ báo rỗng và ẩn nút `clearCartBtn`.
- **Hàm `addToCart(productId)`:**
  - Tìm sản phẩm theo ID.
  - Kiểm tra tồn tại trong giỏ: nếu đã có thì tăng `quantity + 1`, nếu chưa thì thêm mới với `quantity: 1`.
  - Bắt sự kiện click nút "Thêm vào giỏ" qua Event Delegation trên `productGrid`.

---

## 🚧 3. CÔNG VIỆC ĐANG LÀM DỞ CẦN LÀM TIẾP NGAY KHI MỞ MÁY

Trước khi chuyển sang làm trang Admin, cần hoàn thiện **nốt 4 tính năng còn thiếu trong `shop_mini.js`**:

### Việc 1: Tương tác Tăng (+), Giảm (-), Xóa từng món trong giỏ hàng
Trong `shop_mini.js` đã render các nút với `data-type="decrease"`, `data-type="increase"` và class `.remove-item-btn`, cần viết:
1. Hàm `updateQuantity(productId, delta)`:
   - `delta` là `1` hoặc `-1`.
   - Cập nhật số lượng bằng `.map()`.
   - Nếu số lượng `<= 0` thì tự động xóa bằng `.filter(item => item.quantity > 0)`.
   - Gọi `saveCart(cart)` và `renderCart()`.
2. Hàm `removeFromCart(productId)`:
   - Xóa món bằng `cart.filter(item => item.id !== productId)`.
   - Gọi `saveCart(cart)` và `renderCart()`.
3. Gắn 1 sự kiện `click` duy nhất trên `cartItemsList` (Event Delegation) để xử lý cả 3 nút trên.

### Việc 2: Nút "Xóa tất cả" giỏ hàng
- Gắn sự kiện `click` cho `clearCartBtn`:
  ```javascript
  clearCartBtn.addEventListener('click', () => {
      cart = [];
      saveCart(cart);
      renderCart();
  });
  ```

### Việc 3: Quản lý Số dư Ví tiền (User Balance)
- Đổi tên selector ở đầu file tránh trùng biến: `const userBalanceEl = document.querySelector(".user-balance")`.
- Viết `saveBalance(amount)` và `loadBalance()` lưu vào key `SHOP_MINI_BALANCE` (mặc định 50.000.000đ).
- Viết `renderBalance()` để hiển thị số dư ví lên header.

### Việc 4: Nút "Thanh toán" (`checkoutBtn`)
- Bắt sự kiện `click` cho `checkoutBtn`:
  - Kiểm tra giỏ rỗng -> cảnh báo.
  - Tính tổng bill bằng `cart.reduce()`.
  - So sánh với số dư ví -> nếu thiếu tiền báo lỗi.
  - Nếu đủ: trừ tiền ví, lưu storage ví, làm rỗng giỏ `cart = []`, lưu storage giỏ, cập nhật lại giao diện, `alert` thành công.

---

## 🚀 4. KẾ HOẠCH BƯỚC TIẾP THEO: TRANG ADMIN QUẢN LÝ (ĐÃ THỐNG NHẤT BẢN THIẾT KẾ)

Sau khi hoàn tất 4 việc trên của `shop_mini.js`, sẽ bắt tay vào làm trang Admin:

1. **Bộ 3 file mới:** `admin.html`, `admin.css`, `admin.js`.
2. **Giao diện Dashboard chuẩn hóa:**
   - Header: Logo `Shop Admin Dashboard`, badge `E-commerce Sync`, nút `⬅ Về trang Shop`.
   - 4 thẻ thống kê: Tổng sản phẩm, Đang hiển thị (Active), Đang ẩn (Pending), Hết hàng (Stock = 0).
   - Toolbar: Ô tìm kiếm tên, Dropdown lọc danh mục, Dropdown lọc status, Nút xanh `+ Thêm sản phẩm mới`.
   - Bảng (`<table>`): Ảnh, Tên, Danh mục, Giá bán/Giá gốc, Tồn kho, Đánh giá, Trạng thái, Nút Sửa/Xóa.
   - **Modal Form (Compact Dialog nhỏ gọn `max-width: 480px`, căn giữa màn hình, backdrop blur):** Form nhập liệu Thêm/Sửa sản phẩm có xem trước ảnh thumbnail.
3. **Kiến trúc Dữ liệu mới (Schema Migration):**
   - Đổi `inStock: boolean` thành `stock: number` (`> 0`: còn hàng, `= 0`: hết hàng).
   - Thêm `status: 'active' | 'pending'` (`active`: hiện cả ở Shop, `pending`: chỉ hiện ở Admin).
   - Đồng bộ chung qua LocalStorage: `SHOP_MINI_PRODUCTS`.

---

## 💬 5. PROMPT DÁN CHO AI Ở MÁY CÁ NHÂN ĐỂ TIẾP TỤC NGAY LẬP TỨC

Khi về máy cá nhân, bạn chỉ cần gõ lệnh Git:
```bash
cd PRAC_FE
git pull origin main
```
Sau đó mở chat với AI và dán đoạn prompt sau:

> *"Chào bạn! Tôi vừa kéo code mới nhất từ repo PRAC_FE về máy. Bạn hãy đọc file `HANDOVER_PROGRESS.md` và các skill trong `.agents/skills/` để nắm trọn vẹn ngữ cảnh. Hiện tại chúng ta đang dừng ở mục 3: Hoàn thiện nốt 4 tính năng còn thiếu trong `shop_mini.js` (Tăng/Giảm/Xóa món giỏ hàng, Xóa tất cả, Ví tiền và Thanh toán checkout). Hãy cùng tôi làm tiếp phần này ngay nhé!"*
