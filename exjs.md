# 🥋 ĐẤU TRƯỜNG THỰC CHIẾN JAVASCRIPT (CHALLENGE ARENA)

> **Phương pháp luyện tập:** Đọc kịch bản bài toán $\rightarrow$ Xem gợi ý luồng tư duy $\rightarrow$ Nếu quên cú pháp thì bấm vào link chỉ dẫn mở đúng bài trong [JS_NOTES.md](file:///d:/Downloads/Prac_FE/JS_NOTES.md) để đọc lại $\rightarrow$ Tự tay viết code xử lý.

---

## 🛒 DỰ ÁN 1: GIỎ HÀNG MUA SẮM MINI (MINI SHOPPING CART)

### 1. Kịch bản bài toán:
* Có một danh sách sản phẩm mẫu (Áo, Quần, Giày) có sẵn nút **"Thêm vào giỏ"**.
* Khi người dùng bấm **"Thêm vào giỏ"**:
  * Nếu sản phẩm chưa có trong giỏ: Thêm mới vào giỏ với số lượng là `1`.
  * Nếu sản phẩm **đã có** trong giỏ: Tăng số lượng (`quantity`) lên `+1`, không được sinh thêm dòng mới!
* Trong giỏ hàng:
  * Hiển thị Tên, Giá, Số lượng, và nút **"Xóa"**.
  * Có nút **Tăng (+)** và **Giảm (-)** số lượng. Nếu giảm về `0` thì tự xóa món đó.
  * Tự động tính **Tổng tiền thanh toán** theo thời gian thực.
* Mọi dữ liệu giỏ hàng phải được lưu bền vững vào `localStorage` (F5 không mất).

---

### 2. Khung HTML & CSS mẫu (Copy dùng ngay):

<details>
<summary><b>Bấm để lấy mã HTML/CSS cho Dự án 1</b></summary>

```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Mini Shopping Cart</title>
    <style>
        body { font-family: sans-serif; background: #0f172a; color: #f8fafc; padding: 30px; }
        .app { max-width: 800px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        .card { background: #1e293b; padding: 20px; border-radius: 12px; border: 1px solid #334155; }
        h2 { color: #38bdf8; margin-bottom: 16px; }
        .product-item, .cart-item { display: flex; justify-content: space-between; align-items: center; padding: 12px; background: #0f172a; margin-bottom: 10px; border-radius: 8px; }
        button { cursor: pointer; padding: 6px 12px; border-radius: 6px; border: none; font-weight: bold; }
        .btn-add { background: #38bdf8; color: #0f172a; }
        .btn-qty { background: #334155; color: #fff; padding: 2px 8px; }
        .btn-del { background: #f43f5e; color: #fff; }
        .total-box { margin-top: 16px; padding-top: 16px; border-top: 1px solid #334155; font-size: 18px; font-weight: bold; color: #4ade80; display: flex; justify-content: space-between; }
    </style>
</head>
<body>
    <div class="app">
        <!-- Cột trái: Cửa hàng sản phẩm -->
        <div class="card">
            <h2>Cửa Hàng</h2>
            <div id="product-list">
                <!-- Danh sách sản phẩm có data-id, data-name, data-price -->
                <div class="product-item" data-id="p1" data-name="Áo Thun Basic" data-price="150000">
                    <div><b>Áo Thun Basic</b><br><small>150.000đ</small></div>
                    <button class="btn-add">Thêm vào giỏ</button>
                </div>
                <div class="product-item" data-id="p2" data-name="Quần Jeans Slim" data-price="350000">
                    <div><b>Quần Jeans Slim</b><br><small>350.000đ</small></div>
                    <button class="btn-add">Thêm vào giỏ</button>
                </div>
                <div class="product-item" data-id="p3" data-name="Giày Sneaker" data-price="600000">
                    <div><b>Giày Sneaker</b><br><small>600.000đ</small></div>
                    <button class="btn-add">Thêm vào giỏ</button>
                </div>
            </div>
        </div>

        <!-- Cột phải: Giỏ hàng -->
        <div class="card">
            <h2>Giỏ Hàng Của Bạn</h2>
            <div id="cart-list"></div>
            <div class="total-box">
                <span>Tổng cộng:</span>
                <span id="total-price">0đ</span>
            </div>
        </div>
    </div>
    <script src="cart.js"></script>
</body>
</html>
```
</details>

---

### 3. Hướng dẫn từng bước & Chỉ dẫn tra cứu:

#### 🔹 Bước 1: Khởi tạo State & LocalStorage
* **Mục tiêu:** Mảng `cart = []` chứa các món hàng dạng `{ id, name, price, quantity }`.
* **Gợi ý:**
  - Viết `saveCart()`: Đóng gói mảng `cart` lưu vào key `"my_cart"`.
  - Viết `loadCart()`: Đọc chuỗi từ `"my_cart"` ra thành mảng (nhớ bọc `try...catch`).
* 📖 **Quên cú pháp? Mở bài để đọc:**
  - Cú pháp `localStorage.setItem` / `getItem`: Mở [JS_NOTES.md Bài 4.4.2](file:///d:/Downloads/Prac_FE/JS_NOTES.md#L2530).
  - Cú pháp `JSON.stringify` & `JSON.parse`: Mở [JS_NOTES.md Bài 4.5.2](file:///d:/Downloads/Prac_FE/JS_NOTES.md#L2685).

---

#### 🔹 Bước 2: Bắt sự kiện bấm "Thêm vào giỏ" (Event Delegation)
* **Gợi ý tư duy:**
  1. Gắn sự kiện `click` lên thẻ cha `#product-list`.
  2. Bấm trúng nút `.btn-add`: Dùng `closest` tìm thẻ cha `.product-item`.
  3. Lấy thông tin sản phẩm qua `dataset` (`id`, `name`, `price`).
  4. Lục trong mảng `cart`:
     - Dùng hàm `cart.find(item => item.id === id)` để kiểm tra món này đã có chưa.
     - Nếu đã có: Tăng `item.quantity += 1`.
     - Nếu chưa có: `cart.push({ id, name, price: Number(price), quantity: 1 })`.
  5. Gọi `saveCart()` và `renderCart()`.
* 📖 **Quên cú pháp? Mở bài để đọc:**
  - Dùng `closest()` tìm tổ tiên và `dataset` lấy dữ liệu: Mở [JS_NOTES.md Bảng Vàng 4.3.3](file:///d:/Downloads/Prac_FE/JS_NOTES.md#L2450).
  - Dùng hàm mảng `find()`: Mở [JS_NOTES.md Bài 3.4](file:///d:/Downloads/Prac_FE/JS_NOTES.md#L1400).

---

#### 🔹 Bước 3: Viết hàm `renderCart()`
* **Gợi ý tư duy:**
  1. Xóa sạch ruột cũ: `cartList.innerHTML = ""`.
  2. Nếu giỏ hàng rỗng (`cart.length === 0`): Hiện chữ `"Giỏ hàng đang trống!"`.
  3. Duyệt `cart.forEach(item => ...)` tạo từng thẻ HTML giỏ hàng gồm:
     - Tên, giá từng món.
     - Cụm nút số lượng: Nút giảm `[-]`, số lượng hiện tại, nút tăng `[+]`.
     - Nút Xóa `[Xóa]`. Gắn `data-id="${item.id}"` vào thẻ cha.
  4. **Tính tổng tiền:** Dùng `cart.reduce((sum, item) => sum + item.price * item.quantity, 0)` và in ra `#total-price`.
* 📖 **Quên cú pháp? Mở bài để đọc:**
  - Xóa và tạo innerHTML: Mở [JS_NOTES.md Bài 4.2.1](file:///d:/Downloads/Prac_FE/JS_NOTES.md#L2235).
  - Thuật toán tính tổng bằng `reduce()`: Mở [JS_NOTES.md Bài 3.4](file:///d:/Downloads/Prac_FE/JS_NOTES.md#L1420).

---

#### 🔹 Bước 4: Tương tác Tăng / Giảm / Xóa trên giỏ hàng (Event Delegation)
* **Gợi ý tư duy:**
  1. Gắn sự kiện `click` lên thẻ cha `#cart-list`.
  2. Lấy `id` của sản phẩm được click qua `e.target.closest(".cart-item").dataset.id`.
  3. Tìm sản phẩm trong mảng `const item = cart.find(i => i.id === id)`.
  4. Nếu click nút `+`: `item.quantity++`.
  5. Nếu click nút `-`:
     - `item.quantity--`.
     - Nếu `item.quantity === 0`: Lọc xóa món đó luôn `cart = cart.filter(i => i.id !== id)`.
  6. Nếu click nút `Xóa`: `cart = cart.filter(i => i.id !== id)`.
  7. Luôn kết thúc bằng `saveCart()` và `renderCart()`.
* 📖 **Quên cú pháp? Mở bài để đọc:**
  - Cơ chế Event Delegation & Lọc nút bấm: Mở [JS_NOTES.md Bài 4.3.3](file:///d:/Downloads/Prac_FE/JS_NOTES.md#L2430).
  - Lọc mảng bằng `filter()`: Mở [JS_NOTES.md Bài 3.4](file:///d:/Downloads/Prac_FE/JS_NOTES.md#L1410).

---
---

## 📌 DỰ ÁN 2: BẢNG GHI CHÚ NHANH (STICKY NOTES PRO)

### 1. Kịch bản bài toán:
* Người dùng có thể tạo một tờ giấy ghi chú (Note) gồm:
  * **Tiêu đề** & **Nội dung**.
  * **Màu sắc giấy:** Vàng chanh (`#fef08a`), Xanh bạc hà (`#bbf7d0`), Hồng phấn (`#fbcfe8`).
* Thao tác trên mỗi tờ ghi chú:
  * Bấm nút **Ghim (Pin 📌)**: Ghi chú nào được ghim sẽ tự động **nhảy lên đầu danh sách**.
  * Bấm nút **Thùng rác 🗑️**: Xóa ghi chú.
* Tự động lưu vào `localStorage`.

---

### 2. Khung HTML & CSS mẫu (Copy dùng ngay):

<details>
<summary><b>Bấm để lấy mã HTML/CSS cho Dự án 2</b></summary>

```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Sticky Notes Pro</title>
    <style>
        body { font-family: sans-serif; background: #0f172a; color: #334155; padding: 30px; }
        .container { max-width: 900px; margin: 0 auto; }
        h1 { color: #f8fafc; text-align: center; margin-bottom: 20px; }
        .note-form { background: #1e293b; padding: 20px; border-radius: 12px; margin-bottom: 30px; display: flex; flex-direction: column; gap: 12px; }
        .note-form input, .note-form textarea, .note-form select { padding: 10px; border-radius: 8px; border: 1px solid #334155; background: #0f172a; color: #fff; font-size: 14px; outline: none; }
        .btn-submit { background: #facc15; color: #000; font-weight: bold; padding: 12px; border: none; border-radius: 8px; cursor: pointer; }
        .notes-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 16px; }
        .note-card { padding: 16px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); display: flex; flex-direction: column; justify-content: space-between; min-height: 180px; position: relative; }
        .note-card.pinned { border: 3px solid #eab308; }
        .note-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px; }
        .note-title { font-size: 16px; font-weight: bold; margin-right: 8px; }
        .note-body { font-size: 14px; white-space: pre-wrap; word-break: break-word; flex: 1; }
        .note-actions { display: flex; justify-content: flex-end; gap: 8px; margin-top: 12px; }
        .btn-action { background: rgba(0,0,0,0.1); border: none; padding: 4px 8px; border-radius: 6px; cursor: pointer; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Bảng Ghi Chú Sticky Notes</h1>
        
        <!-- Form tạo ghi chú -->
        <form id="note-form" class="note-form">
            <input type="text" id="note-title" placeholder="Tiêu đề ghi chú..." required autocomplete="off">
            <textarea id="note-content" rows="3" placeholder="Nội dung ghi chú..." required></textarea>
            <select id="note-color">
                <option value="#fef08a">Vàng chanh</option>
                <option value="#bbf7d0">Xanh bạc hà</option>
                <option value="#fbcfe8">Hồng phấn</option>
            </select>
            <button type="submit" class="btn-submit">Dán Ghi Chú Mới 📌</button>
        </form>

        <!-- Danh sách các tờ giấy ghi chú -->
        <div id="notes-grid" class="notes-grid"></div>
    </div>
    <script src="notes.js"></script>
</body>
</html>
```
</details>

---

### 3. Hướng dẫn từng bước & Chỉ dẫn tra cứu:

#### 🔹 Bước 1: Khởi tạo State & LocalStorage
* **Cấu trúc mỗi Note:** `{ id, title, content, color, isPinned: false, createdAt: Date.now() }`.
* Viết `saveNotes()` & `loadNotes()`.
* 📖 **Tra cứu:** [JS_NOTES.md Bài 4.4.2](file:///d:/Downloads/Prac_FE/JS_NOTES.md#L2530) & [Bài 4.5.2](file:///d:/Downloads/Prac_FE/JS_NOTES.md#L2685).

---

#### 🔹 Bước 2: Bắt sự kiện gửi Form tạo Ghi chú
* **Gợi ý tư duy:**
  1. Lắng nghe `submit` trên `#note-form`.
  2. Bắt buộc gọi `e.preventDefault()`.
  3. Lấy `title.value`, `content.value`, `color.value`.
  4. Tạo Object note mới với `id: Date.now().toString()`.
  5. Đẩy vào mảng `notes.unshift(newNote)` $\rightarrow$ Gọi `saveNotes()` và `renderNotes()`.
  6. Xóa trắng form: `noteForm.reset()`.
* 📖 **Tra cứu:** 
  - Chặn reload form: [JS_NOTES.md Bài 4.3.2](file:///d:/Downloads/Prac_FE/JS_NOTES.md#L2422).
  - Thuộc tính value: [JS_NOTES.md Bài 4.2.2](file:///d:/Downloads/Prac_FE/JS_NOTES.md#L2260).

---

#### 🔹 Bước 3: Viết hàm `renderNotes()` (Có thuật toán Ghim lên đầu)
* **Gợi ý tư duy:**
  1. Xóa sạch khung cũ: `notesGrid.innerHTML = ""`.
  2. **Thuật toán sắp xếp Ghim (Sort Pin):**  
     Làm sao để ghi chú có `isPinned === true` luôn đứng trước ghi chú thường?
     👉 Dùng hàm mảng `toSorted` hoặc `sort`:
     `const sortedNotes = [...notes].sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0));`
  3. Lặp qua `sortedNotes.forEach(note => ...)` tạo thẻ `<div>` có:
     - Màu nền inline: `card.style.backgroundColor = note.color;`.
     - Nếu `note.isPinned`: thêm class `"pinned"`.
     - Gắn `data-id="${note.id}"`.
     - Chèn nội dung tiêu đề, nội dung, nút ghim `📌` và nút xóa `🗑️`.
* 📖 **Tra cứu:**
  - Gán màu nền inline `element.style.backgroundColor`: [JS_NOTES.md Bài 4.2.3](file:///d:/Downloads/Prac_FE/JS_NOTES.md#L2295).
  - Thuật toán `sort()` mảng: [JS_NOTES.md Bài 3.3](file:///d:/Downloads/Prac_FE/JS_NOTES.md#L1250).

---

#### 🔹 Bước 4: Event Delegation trên Bảng Ghi chú (Ghim & Xóa)
* **Gợi ý tư duy:**
  1. Lắng nghe `click` trên `#notes-grid`.
  2. Tìm thẻ ghi chú cha: `const card = e.target.closest(".note-card");`.
  3. Lấy ID: `const id = card.dataset.id;`.
  4. Nếu click nút ghim (`.btn-pin`):
     - Tìm note: `const note = notes.find(n => n.id === id);`.
     - Đảo ngược: `note.isPinned = !note.isPinned;`.
  5. Nếu click nút xóa (`.btn-del`):
     - Lọc bỏ: `notes = notes.filter(n => n.id !== id);`.
  6. Lưu `saveNotes()` và vẽ lại `renderNotes()`.
* 📖 **Tra cứu:** [JS_NOTES.md Bảng Vàng 4.3.3](file:///d:/Downloads/Prac_FE/JS_NOTES.md#L2450).

---

## 🔍 DỰ ÁN 3: GITHUB DEVFINDER PRO (TRA CỨU LẬP TRÌNH VIÊN THỜI GIAN THỰC)

> **Mục tiêu tối thượng:** Gom toàn bộ tinh hoa từ **Giai đoạn 1 đến Giai đoạn 5** vào 1 bài toán thực tế chuẩn chỉnh: Fetch API gọi Server thật của GitHub, `async/await`, kiểm tra lỗi `response.ok`, xử lý 3 trạng thái giao diện (Loading - Success - Error), hủy request bằng `AbortController`, và lưu lịch sử tìm kiếm vào `localStorage`.

---

### 1. Kịch bản bài toán:
1. **Tìm kiếm:** Người dùng nhập một GitHub Username (ví dụ: `torvalds`, `gaearon`, `thinhdc05`, `facebook`) và nhấn **"Tìm kiếm"** (hoặc gõ phím Enter).
2. **Trạng thái Đang tải (Loading State):**
   * Khi đang đợi mạng, hiển thị thông báo: *"Đang tải dữ liệu từ GitHub..."* và vô hiệu hóa nút tìm kiếm.
3. **Gọi API thật:** Gửi yêu cầu GET tới API công khai: `https://api.github.com/users/{username}`.
4. **Xử lý kết quả (Success / Error):**
   * **Nếu tìm thấy (Mã 200 OK):** Hiển thị Avatar, Tên đầy đủ, Username, Tiểu sử (Bio), Ngày tham gia, Số Public Repos, Số Followers, Số Following, và link dẫn thẳng tới Profile GitHub.
   * **Nếu không tìm thấy (Mã 404 Not Found):** Bắt lỗi bằng `!response.ok`, hiển thị thông báo: *"Không tìm thấy người dùng này trên GitHub! ❌"*.
5. **Nâng cao 1 (Lịch sử tìm kiếm - LocalStorage):**
   * Lưu tối đa 5 username tìm kiếm gần nhất vào `localStorage` (dưới key `"github_recent_searches"`).
   * Hiển thị dưới dạng các thẻ nút bấm nhanh (Tags). Khi bấm vào tag nào, tự động điền tên và kích hoạt tìm kiếm người đó ngay lập tức!
6. **Nâng cao 2 (Hủy Request bằng AbortController):**
   * Nếu người dùng bấm tìm kiếm liên tục nhiều lần, tự động hủy bỏ request cũ trước đó để tránh xung đột dữ liệu (Race Condition).

---

### 2. Khung HTML & CSS mẫu (Copy dùng ngay vào `js3.html`):

<details open>
<summary><b>Bấm để lấy mã HTML/CSS cho Dự án 3 (Copy vào js3.html)</b> <i>(Bấm để xem)</i></summary>

```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GitHub DevFinder Pro</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
        body { background: #0f172a; color: #f8fafc; min-height: 100vh; padding: 40px 20px; display: flex; justify-content: center; }
        .container { width: 100%; max-width: 650px; display: flex; flex-direction: column; gap: 20px; }
        .header { text-align: center; margin-bottom: 10px; }
        .header h1 { font-size: 28px; color: #38bdf8; display: flex; align-items: center; justify-content: center; gap: 10px; }
        .header p { color: #94a3b8; font-size: 14px; margin-top: 6px; }

        /* Khung tìm kiếm */
        .search-box { background: #1e293b; padding: 10px 14px; border-radius: 12px; display: flex; gap: 10px; border: 1px solid #334155; box-shadow: 0 4px 12px rgba(0,0,0,0.2); }
        .search-box input { flex: 1; background: transparent; border: none; outline: none; color: #fff; font-size: 16px; padding: 8px; }
        .search-box button { background: #0284c7; color: #fff; border: none; padding: 10px 20px; border-radius: 8px; font-weight: bold; cursor: pointer; transition: 0.2s; }
        .search-box button:hover { background: #0369a1; }
        .search-box button:disabled { background: #475569; cursor: not-allowed; }

        /* Lịch sử tìm kiếm gần đây */
        .recent-box { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; font-size: 13px; color: #94a3b8; }
        .recent-tag { background: #334155; color: #38bdf8; padding: 4px 10px; border-radius: 16px; cursor: pointer; border: none; font-size: 12px; transition: 0.2s; }
        .recent-tag:hover { background: #0284c7; color: #fff; }

        /* Trạng thái Loading / Error */
        .status-message { text-align: center; padding: 30px; font-size: 16px; border-radius: 12px; background: #1e293b; border: 1px dashed #334155; display: none; }
        .status-message.error { color: #f43f5e; border-color: #f43f5e; }
        .status-message.loading { color: #38bdf8; }

        /* Card hiển thị Profile */
        .profile-card { background: #1e293b; border-radius: 16px; padding: 28px; border: 1px solid #334155; display: none; flex-direction: column; gap: 20px; box-shadow: 0 10px 25px rgba(0,0,0,0.3); }
        .profile-header { display: flex; gap: 20px; align-items: center; }
        .avatar { width: 90px; height: 90px; border-radius: 50%; border: 3px solid #38bdf8; object-fit: cover; }
        .user-titles h2 { font-size: 22px; color: #fff; }
        .user-titles .username { color: #38bdf8; text-decoration: none; font-weight: 500; font-size: 15px; }
        .user-titles .joined-date { color: #94a3b8; font-size: 13px; margin-top: 4px; }
        .bio { font-size: 14px; color: #cbd5e1; line-height: 1.6; }
        
        /* Chỉ số Stats */
        .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; background: #0f172a; padding: 16px; border-radius: 12px; text-align: center; }
        .stat-item span { font-size: 12px; color: #94a3b8; display: block; margin-bottom: 4px; }
        .stat-item strong { font-size: 18px; color: #f8fafc; }
        
        /* Nút ghé thăm */
        .btn-visit { display: inline-block; text-align: center; background: #38bdf8; color: #0f172a; font-weight: bold; text-decoration: none; padding: 12px; border-radius: 8px; transition: 0.2s; }
        .btn-visit:hover { background: #7dd3fc; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1><span>🐙</span> GitHub DevFinder Pro</h1>
            <p>Tra cứu hồ sơ lập trình viên thời gian thực qua GitHub REST API</p>
        </div>

        <!-- Form tìm kiếm -->
        <form id="search-form" class="search-box">
            <input type="text" id="search-input" placeholder="Nhập username (ví dụ: torvalds, thinhdc05...)" required autocomplete="off">
            <button type="submit" id="search-btn">Tìm Kiếm</button>
        </form>

        <!-- Lịch sử tìm gần đây -->
        <div class="recent-box">
            <span>Tìm gần đây:</span>
            <div id="recent-tags" style="display: flex; gap: 6px; flex-wrap: wrap;"></div>
        </div>

        <!-- Vùng hiển thị thông báo Loading / Lỗi -->
        <div id="status-box" class="status-message"></div>

        <!-- Card kết quả Profile -->
        <div id="profile-card" class="profile-card">
            <div class="profile-header">
                <img id="avatar" class="avatar" src="" alt="Avatar">
                <div class="user-titles">
                    <h2 id="name">Tên hiển thị</h2>
                    <a id="username" class="username" href="#" target="_blank">@username</a>
                    <p id="joined" class="joined-date">Tham gia ngày --/--/----</p>
                </div>
            </div>

            <p id="bio" class="bio">Tiểu sử bio...</p>

            <div class="stats-grid">
                <div class="stat-item">
                    <span>Kho lưu trữ (Repos)</span>
                    <strong id="repos">0</strong>
                </div>
                <div class="stat-item">
                    <span>Người theo dõi</span>
                    <strong id="followers">0</strong>
                </div>
                <div class="stat-item">
                    <span>Đang theo dõi</span>
                    <strong id="following">0</strong>
                </div>
            </div>

            <a id="visit-btn" class="btn-visit" href="#" target="_blank">Ghé Thăm Trang GitHub Cá Nhân ↗</a>
        </div>
    </div>

    <script src="devfinder.js"></script>
</body>
</html>
```
</details>

---

### 3. Hướng dẫn từng bước & Chỉ dẫn tra cứu:

#### 🔹 Bước 1: Khởi tạo biến State & Quản lý Lịch sử (`localStorage`)
* **Mục tiêu:** Mảng `recentSearches = []` chứa tối đa 5 username tìm gần nhất.
* **Gợi ý tư duy:**
  1. Viết hàm `loadRecent()`: Đọc chuỗi JSON từ key `"github_recent"`.
  2. Viết hàm `saveRecent(username)`:
     - Dùng `filter()` để loại bỏ tên trùng (nếu đã có trước đó).
     - Dùng `unshift()` đẩy tên mới nhất lên đầu.
     - Dùng `slice(0, 5)` để đảm bảo chỉ giữ tối đa 5 tên.
     - Lưu vào `localStorage` và gọi hàm `renderRecent()`.
  3. Viết hàm `renderRecent()`: Lặp qua mảng `recentSearches.map(...)` để sinh ra các nút `<button class="recent-tag">${name}</button>`.
* 📖 **Quên cú pháp? Mở bài để tra cứu:**
  - `localStorage` & `JSON.parse`: Mở [JS_NOTES.md Bài 4.4.2](file:///d:/Downloads/Prac_FE/JS_NOTES.md#L2530).
  - Hàm `filter`, `unshift`, `slice`: Mở [JS_NOTES.md Bài 3.3](file:///d:/Downloads/Prac_FE/JS_NOTES.md#L1250).

---

#### 🔹 Bước 2: Viết hàm gọi API `fetchUser(username)` chuẩn Senior
* **Mục tiêu:** Dùng `async / await`, `AbortController`, và kiểm tra `response.ok`.
* **Gợi ý tư duy:**
  1. Khai báo biến `let currentController = null;` ở đầu file.
  2. Nếu `currentController` đang tồn tại → Gọi `currentController.abort()` để hủy request trước!
  3. Tạo `currentController = new AbortController()`.
  4. Hiển thị UI trạng thái Loading: `showLoading("Đang tải dữ liệu...")`.
  5. Trong khối `try`:
     - Gọi `const response = await fetch(`https://api.github.com/users/${username}`, { signal: currentController.signal });`
     - **Bắt buộc kiểm tra:** `if (!response.ok)` → quăng lỗi `throw new Error("Không tìm thấy người dùng này!")`.
     - Lấy dữ liệu: `const data = await response.json();`.
     - Đổ dữ liệu vào hàm `renderProfile(data)`.
     - Gọi `saveRecent(username)`.
  6. Trong khối `catch (err)`:
     - Nếu `err.name === "AbortError"`: bỏ qua (vì do người dùng bấm liên tục).
     - Nếu là lỗi thật: gọi `showError(err.message)`.
* 📖 **Quên cú pháp? Mở bài để tra cứu:**
  - Cơ chế `response.ok` & Hai bước của `fetch`: Mở [JS_NOTES.md Bài 5.4.3](file:///d:/Downloads/Prac_FE/JS_NOTES.md#L3510).
  - Cú pháp `AbortController`: Mở [JS_NOTES.md Bài 5.4.5](file:///d:/Downloads/Prac_FE/JS_NOTES.md#L3580).

---

#### 🔹 Bước 3: Đổ dữ liệu ra Card (`renderProfile`)
* **Gợi ý tư duy:**
  - Ẩn khung trạng thái `statusBox`. Hiện khung `profileCard.style.display = "flex"`.
  - Gán dữ liệu vào các phần tử DOM đã tóm:
    - `avatar.src = data.avatar_url`
    - `name.textContent = data.name || data.login` (Nếu user không đặt tên thì lấy login)
    - `username.textContent = `@${data.login}``
    - `username.href = data.html_url`
    - `bio.textContent = data.bio || "Người dùng này chưa cập nhật tiểu sử."`
    - `repos.textContent = data.public_repos`
    - `followers.textContent = data.followers`
    - `following.textContent = data.following`
    - `visitBtn.href = data.html_url`
    - Định dạng ngày tham gia `data.created_at`: Dùng `new Date(data.created_at).toLocaleDateString("vi-VN")`.

---

#### 🔹 Bước 4: Bắt các sự kiện tương tác
1. **Sự kiện Form Submit:** Lắng nghe trên `#search-form`, gọi `e.preventDefault()`, lấy `searchInput.value.trim()`, rồi gọi `fetchUser(...)`.
2. **Sự kiện bấm Tag Lịch sử (Event Delegation):** Lắng nghe `click` trên `#recent-tags`. Nếu bấm trúng `.recent-tag` thì lấy text của nút đó, gán vào ô input và kích hoạt tìm kiếm luôn!

---

🏆 **TỔNG KẾT LUỒNG TƯ DUY VÀNG BẠN SẼ ĐẠT ĐƯỢC:**
```text
Sự Kiện Tìm Kiếm (Submit Form / Click Tag Lịch Sử)
                     │
                     ▼
       Hủy Request Cũ (AbortController.abort)
                     │
                     ▼
           Hiện Loading Spinner / Text
                     │
                     ▼
          GỌI FETCH API (Async / Await)
                     │
         ┌───────────┴───────────┐
         ▼                       ▼
    response.ok             !response.ok (404 / 500)
         │                       │
         ▼                       ▼
Đổ Dữ Liệu Lên Profile       Hiện Báo Lỗi Thân Thiện
         │
         ▼
Lưu Tên Vào LocalStorage & Cập Nhật Tags Lịch Sử
```
Code theo đúng kịch bản này, bạn sẽ nắm vững 100% kỹ năng tương tác API thực tế trong bất kỳ công ty Frontend nào! Chúc bạn thực hành thành công rực rỡ! 🚀

---

## 🎬 DỰ ÁN 4: MOVIE FINDER PRO (TRA CỨU PHIM & KỸ THUẬT DEBOUNCE)

> **Vũ khí tối thượng rèn luyện:** Kỹ thuật **Debounce Search** (Tự động gọi API sau khi người dùng ngừng gõ phím 500ms mà không cần bấm nút Submit), Quản lý **Modal Popup** chi tiết phim, và Xử lý phân trang danh sách kết quả.

---

### 1. Kịch bản bài toán:
1. **Tìm kiếm tự động (Debounce):** Người dùng gõ tên phim vào ô input (ví dụ: `batman`, `avengers`, `iron man`). Khi người dùng **ngừng gõ 500ms**, JavaScript tự động gọi API tìm kiếm. Nếu người dùng tiếp tục gõ thì hủy bộ đếm giờ cũ đi (chống spam API).
2. **Nguồn API miễn phí:** Dùng API công khai của OMDb API:
   * Tìm kiếm danh sách: `https://www.omdbapi.com/?apikey=trilogy&s={tên_phim}`
   * Xem chi tiết 1 phim: `https://www.omdbapi.com/?apikey=trilogy&i={imdbID}&plot=full`
3. **Danh sách phim (Grid):** Hiển thị danh sách thẻ phim gồm: Poster ảnh, Tên phim, Năm phát hành, Loại (`movie`/`series`).
4. **Xem chi tiết qua Modal Popup:**
   * Khi click vào một thẻ phim bất kỳ: Bật một chiếc Popup Modal mờ nền (Overlay).
   * Hiển thị: Điểm IMDb, Thể loại, Đạo diễn, Dàn diễn viên, Tóm tắt cốt truyện (Plot).
   * Bấm nút `X` hoặc click ra vùng nền đen bên ngoài để đóng Modal.

---

### 2. Khung HTML & CSS mẫu (Copy vào `js4.html`):

<details>
<summary><b>Bấm để lấy mã HTML/CSS cho Dự án 4 (Copy vào js4.html)</b> <i>(Bấm để xem)</i></summary>

```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Movie Finder Pro (Debounce Search)</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
        body { background: #0b0f19; color: #f8fafc; min-height: 100vh; padding: 30px 20px; }
        .container { max-width: 1000px; margin: 0 auto; display: flex; flex-direction: column; gap: 24px; }
        .header { text-align: center; }
        .header h1 { font-size: 32px; color: #f59e0b; margin-bottom: 8px; }
        .header p { color: #94a3b8; font-size: 15px; }

        /* Ô tìm kiếm Debounce */
        .search-wrapper { position: relative; max-width: 600px; width: 100%; margin: 0 auto; }
        .search-input { width: 100%; background: #1e293b; border: 1px solid #334155; padding: 14px 20px; border-radius: 30px; color: #fff; font-size: 16px; outline: none; box-shadow: 0 4px 14px rgba(0,0,0,0.3); transition: 0.2s; }
        .search-input:focus { border-color: #f59e0b; box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.2); }

        /* Trạng thái */
        .status-box { text-align: center; color: #94a3b8; font-size: 16px; margin-top: 20px; }

        /* Danh sách thẻ phim */
        .movies-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 20px; }
        .movie-card { background: #1e293b; border-radius: 12px; overflow: hidden; border: 1px solid #334155; cursor: pointer; transition: 0.2s; display: flex; flex-direction: column; }
        .movie-card:hover { transform: translateY(-6px); border-color: #f59e0b; box-shadow: 0 10px 20px rgba(0,0,0,0.4); }
        .movie-poster { width: 100%; height: 280px; object-fit: cover; background: #0f172a; }
        .movie-info { padding: 14px; display: flex; flex-direction: column; gap: 6px; flex: 1; justify-content: space-between; }
        .movie-title { font-size: 15px; font-weight: bold; color: #fff; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .movie-meta { font-size: 13px; color: #94a3b8; display: flex; justify-content: space-between; }

        /* Modal Popup chi tiết */
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.8); backdrop-filter: blur(4px); display: none; justify-content: center; align-items: center; padding: 20px; z-index: 999; }
        .modal-content { background: #1e293b; border-radius: 16px; border: 1px solid #334155; max-width: 650px; width: 100%; max-height: 90vh; overflow-y: auto; padding: 24px; position: relative; display: flex; gap: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.6); }
        .btn-close-modal { position: absolute; top: 16px; right: 16px; background: #334155; border: none; color: #fff; width: 32px; height: 32px; border-radius: 50%; cursor: pointer; font-weight: bold; }
        .modal-poster { width: 160px; height: 240px; object-fit: cover; border-radius: 8px; flex-shrink: 0; }
        .modal-details { display: flex; flex-direction: column; gap: 10px; }
        .modal-title { font-size: 22px; color: #f59e0b; }
        .modal-badge { display: inline-block; background: #334155; color: #f59e0b; padding: 2px 8px; border-radius: 4px; font-size: 12px; font-weight: bold; width: fit-content; }
        .modal-plot { font-size: 14px; line-height: 1.6; color: #cbd5e1; }
        @media (max-width: 600px) { .modal-content { flex-direction: column; } .modal-poster { width: 100%; height: auto; } }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🍿 Movie Finder Pro</h1>
            <p>Tra cứu phim tự động với kỹ thuật Debounce Search (OMDb API)</p>
        </div>

        <div class="search-wrapper">
            <input type="text" id="search-input" class="search-input" placeholder="Gõ tên phim (ví dụ: batman, avatar, spiderman...)" autocomplete="off">
        </div>

        <div id="status-box" class="status-box">Nhập tên phim để bắt đầu tìm kiếm...</div>
        <div id="movies-grid" class="movies-grid"></div>
    </div>

    <!-- Modal Chi Tiết Phim -->
    <div id="modal-overlay" class="modal-overlay">
        <div class="modal-content">
            <button id="btn-close" class="btn-close-modal">✕</button>
            <img id="modal-poster" class="modal-poster" src="" alt="Poster">
            <div class="modal-details">
                <h2 id="modal-title" class="modal-title">Tên phim</h2>
                <span id="modal-rating" class="modal-badge">⭐ 0.0 IMDb</span>
                <p id="modal-genre" style="font-size: 13px; color: #94a3b8;">Thể loại: --</p>
                <p id="modal-actors" style="font-size: 13px; color: #94a3b8;">Diễn viên: --</p>
                <p id="modal-plot" class="modal-plot">Cốt truyện...</p>
            </div>
        </div>
    </div>

    <script src="movie.js"></script>
</body>
</html>
```
</details>

---

### 3. Hướng dẫn kỹ thuật Debounce:
* **Thuật toán Debounce bằng `setTimeout`:**
  ```javascript
  let debounceTimer = null;

  searchInput.addEventListener("input", (e) => {
      const query = e.target.value.trim();

      // 1. Hủy lịch hẹn cũ nếu người dùng vẫn đang gõ:
      clearTimeout(debounceTimer);

      if (!query) {
          moviesGrid.innerHTML = "";
          statusBox.textContent = "Nhập tên phim để tìm kiếm...";
          return;
      }

      statusBox.textContent = "Đang gõ... ⏳";

      // 2. Thiết lập hẹn giờ mới: sau 500ms không gõ nữa thì mới gọi API:
      debounceTimer = setTimeout(() => {
          searchMovies(query);
      }, 500);
  });
  ```

---

## 🌦️ DỰ ÁN 5: WEATHERCAST PRO (DỰ BÁO THỜI TIẾT REAL-TIME & ĐỊA LÝ)

> **Vũ khí tối thượng rèn luyện:** **Geolocation API (`navigator.geolocation`)** tự động lấy tọa độ GPS người dùng, gọi **`Promise.all` song song** nhiều endpoint API, chuyển đổi công thức toán học độ C/F, và thay đổi theme màu sắc động.

---

### 1. Kịch bản bài toán:
1. **Lấy vị trí tự động (GPS):** Khi mở trang web, hiển thị nút *"Lấy vị trí hiện tại của tôi 📍"*. Khi bấm, xin quyền định vị và lấy vĩ độ (`latitude`) / kinh độ (`longitude`).
2. **Tìm theo thành phố:** Ô nhập tên thành phố (Hà Nội, Tokyo, New York, London...).
3. **Nguồn API miễn phí (Không cần API Key):**
   * Chuyển tên thành phố sang tọa độ (Geocoding): `https://geocoding-api.open-meteo.com/v1/search?name={city}&count=1`
   * Lấy thời tiết hiện tại & dự báo 7 ngày: `https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`
4. **Giao diện Dynamic:**
   * Hiển thị nhiệt độ to đùng, vận tốc gió, độ ẩm, biểu tượng icon thời tiết (Nắng ☀️, Mưa 🌧️, Mây ☁️).
   * Nút bật tắt chuyển đổi giữa ** Độ C (°C)** và **Độ F (°F)**: `F = C * 1.8 + 32`.
   * Danh sách dự báo 7 ngày tiếp theo (nhiệt độ cao nhất/thấp nhất).

---

### 2. Khung HTML & CSS mẫu (Copy vào `js5.html`):

<details>
<summary><b>Bấm để lấy mã HTML/CSS cho Dự án 5 (Copy vào js5.html)</b> <i>(Bấm để xem)</i></summary>

```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WeatherCast Pro</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
        body { background: #0f172a; color: #f8fafc; min-height: 100vh; padding: 40px 20px; display: flex; justify-content: center; }
        .container { width: 100%; max-width: 600px; display: flex; flex-direction: column; gap: 20px; }
        .header { text-align: center; }
        .header h1 { font-size: 28px; color: #38bdf8; margin-bottom: 6px; }

        /* Thanh tìm kiếm & GPS */
        .controls { display: flex; gap: 10px; }
        .city-input { flex: 1; background: #1e293b; border: 1px solid #334155; padding: 12px 16px; border-radius: 10px; color: #fff; font-size: 15px; outline: none; }
        .btn-search { background: #0284c7; color: #fff; border: none; padding: 12px 20px; border-radius: 10px; font-weight: bold; cursor: pointer; }
        .btn-gps { background: #334155; color: #38bdf8; border: none; padding: 12px 14px; border-radius: 10px; cursor: pointer; font-size: 16px; }

        /* Card thời tiết hiện tại */
        .weather-card { background: linear-gradient(135deg, #1e293b, #0f172a); border-radius: 16px; border: 1px solid #334155; padding: 24px; text-align: center; display: none; flex-direction: column; gap: 16px; box-shadow: 0 10px 25px rgba(0,0,0,0.3); }
        .city-name { font-size: 24px; font-weight: bold; }
        .weather-icon { font-size: 64px; margin: 10px 0; }
        .temp-display { font-size: 48px; font-weight: 800; color: #38bdf8; display: flex; align-items: center; justify-content: center; gap: 8px; }
        .unit-toggle { font-size: 14px; background: #334155; padding: 4px 8px; border-radius: 6px; cursor: pointer; border: none; color: #fff; }
        .stats-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; background: rgba(0,0,0,0.2); padding: 12px; border-radius: 10px; font-size: 14px; }

        /* Dự báo tuần */
        .forecast-box { display: none; flex-direction: column; gap: 10px; }
        .forecast-title { font-size: 16px; font-weight: bold; color: #94a3b8; }
        .forecast-list { display: flex; gap: 10px; overflow-x: auto; padding-bottom: 8px; }
        .forecast-item { background: #1e293b; border: 1px solid #334155; padding: 12px; border-radius: 10px; min-width: 90px; text-align: center; display: flex; flex-direction: column; gap: 6px; font-size: 13px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🌦️ WeatherCast Pro</h1>
            <p>Dự báo thời tiết toàn cầu theo thời gian thực (Open-Meteo API)</p>
        </div>

        <div class="controls">
            <input type="text" id="city-input" class="city-input" placeholder="Nhập tên thành phố (Hà Nội, Tokyo, Paris...)" autocomplete="off">
            <button id="btn-search" class="btn-search">Xem</button>
            <button id="btn-gps" class="btn-gps" title="Vị trí của tôi">📍</button>
        </div>

        <div id="status-box" style="text-align: center; color: #94a3b8;">Nhập thành phố hoặc bấm 📍 để xem thời tiết...</div>

        <!-- Card hiện tại -->
        <div id="weather-card" class="weather-card">
            <h2 id="city-title" class="city-name">Thành phố</h2>
            <div id="weather-icon" class="weather-icon">☀️</div>
            <div class="temp-display">
                <span id="temp-val">28</span><span id="temp-unit">°C</span>
                <button id="btn-unit" class="unit-toggle">Đổi sang °F</button>
            </div>
            <div class="stats-row">
                <div>Độ ẩm: <b id="humidity">70%</b></div>
                <div>Gió: <b id="wind">12 km/h</b></div>
            </div>
        </div>

        <!-- Danh sách 7 ngày -->
        <div id="forecast-box" class="forecast-box">
            <div class="forecast-title">Dự báo 7 ngày tới:</div>
            <div id="forecast-list" class="forecast-list"></div>
        </div>
    </div>

    <script src="weather.js"></script>
</body>
</html>
```
</details>

---

## ⏱️ DỰ ÁN 6: SPEED QUIZ PRO (TRẮC NGHIỆM ĐẾM NGƯỢC THỜI GIAN THẬT)

> **Vũ khí tối thượng rèn luyện:** Quản lý **JS Timers (`setInterval` & `clearInterval`)**, kỹ thuật **State Machine** quản lý màn hình (Start → Playing → Results), và thuật toán xáo trộn mảng ngẫu nhiên **Fisher-Yates Shuffle**.

---

### 1. Kịch bản bài toán:
1. **Ngân hàng câu hỏi:** Mảng gồm 10 - 15 câu hỏi trắc nghiệm Frontend (HTML, CSS, JS).
2. **Trộn ngẫu nhiên (Shuffle):** Mỗi lần bấm "Bắt đầu thi", tự động chọn ra 5 câu hỏi ngẫu nhiên và xáo trộn vị trí của 4 đáp án A, B, C, D.
3. **Đồng hồ đếm ngược sinh tử (15 giây / câu):**
   * Khi câu hỏi hiện ra, đồng hồ đếm ngược từ 15 về 0. Thanh Progress bar co ngắn lại mượt mà.
   * Nếu người dùng chọn đáp án: Lập tức `clearInterval`, hiển thị màu xanh (nếu đúng) hoặc màu đỏ (nếu sai), khóa các nút lại 1.5 giây rồi tự nhảy sang câu kế tiếp.
   * Nếu **hết 15 giây mà chưa chọn**: Tự động tính là sai và chuyển câu!
4. **Màn hình Tổng kết:**
   * Hiển thị tổng số điểm (ví dụ: 4/5 câu đúng).
   * Lời chúc mừng hoặc khuyến khích dựa theo điểm số.
   * Nút "Làm lại bài thi" reset toàn bộ trạng thái.

---

### 2. Khung HTML & CSS mẫu (Copy vào `js6.html`):

<details>
<summary><b>Bấm để lấy mã HTML/CSS cho Dự án 6 (Copy vào js6.html)</b> <i>(Bấm để xem)</i></summary>

```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Speed Quiz Pro</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
        body { background: #0f172a; color: #f8fafc; min-height: 100vh; padding: 40px 20px; display: flex; justify-content: center; align-items: center; }
        .quiz-card { background: #1e293b; border-radius: 16px; border: 1px solid #334155; width: 100%; max-width: 550px; padding: 28px; box-shadow: 0 10px 30px rgba(0,0,0,0.4); display: flex; flex-direction: column; gap: 20px; position: relative; overflow: hidden; }
        
        /* Thanh thời gian */
        .timer-bar { position: absolute; top: 0; left: 0; height: 6px; background: #38bdf8; width: 100%; transition: width 1s linear; }
        
        .quiz-header { display: flex; justify-content: space-between; align-items: center; font-size: 14px; color: #94a3b8; }
        .timer-badge { background: #334155; color: #facc15; padding: 4px 10px; border-radius: 12px; font-weight: bold; }
        .question-text { font-size: 18px; font-weight: bold; line-height: 1.5; color: #fff; min-height: 54px; }
        
        /* Đáp án */
        .options-grid { display: flex; flex-direction: column; gap: 10px; }
        .option-btn { background: #0f172a; border: 1px solid #334155; padding: 14px 18px; border-radius: 10px; color: #f8fafc; font-size: 15px; text-align: left; cursor: pointer; transition: 0.2s; }
        .option-btn:hover:not(:disabled) { border-color: #38bdf8; background: #1e293b; }
        .option-btn.correct { background: #166534 !important; border-color: #22c55e !important; color: #fff; }
        .option-btn.wrong { background: #991b1b !important; border-color: #ef4444 !important; color: #fff; }
        
        /* Nút bắt đầu / Chơi lại */
        .btn-action { background: #0284c7; color: #fff; border: none; padding: 14px; border-radius: 10px; font-size: 16px; font-weight: bold; cursor: pointer; transition: 0.2s; }
        .btn-action:hover { background: #0369a1; }
    </style>
</head>
<body>
    <div class="quiz-card">
        <div id="timer-bar" class="timer-bar"></div>

        <!-- MÀN HÌNH 1: BẮT ĐẦU -->
        <div id="screen-start" style="text-align: center; display: flex; flex-direction: column; gap: 16px;">
            <h1 style="color: #38bdf8;">🧠 Speed Quiz Pro</h1>
            <p style="color: #94a3b8; font-size: 14px;">Thử thách 5 câu hỏi trắc nghiệm JavaScript với áp lực 15 giây mỗi câu!</p>
            <button id="btn-start" class="btn-action">Bắt Đầu Thử Thách 🚀</button>
        </div>

        <!-- MÀN HÌNH 2: ĐANG THI -->
        <div id="screen-quiz" style="display: none; flex-direction: column; gap: 16px;">
            <div class="quiz-header">
                <span id="question-progress">Câu hỏi 1/5</span>
                <span class="timer-badge">⏳ <span id="time-left">15</span>s</span>
            </div>
            <div id="question-title" class="question-text">Nội dung câu hỏi?</div>
            <div id="options-container" class="options-grid"></div>
        </div>

        <!-- MÀN HÌNH 3: KẾT QUẢ -->
        <div id="screen-result" style="display: none; text-align: center; flex-direction: column; gap: 16px;">
            <h2>🎉 Hoàn Thành Bài Thi!</h2>
            <p id="score-text" style="font-size: 24px; font-weight: 800; color: #4ade80;">Bạn đạt 4 / 5 điểm</p>
            <p id="feedback-text" style="color: #94a3b8; font-size: 14px;">Rất xuất sắc!</p>
            <button id="btn-restart" class="btn-action">Thử Lại Lần Nữa 🔄</button>
        </div>
    </div>

    <script src="quiz.js"></script>
</body>
</html>
```
</details>

---

Cả 3 dự án trên đều đã sẵn sàng phục vụ cho việc mài giũa phản xạ Frontend của bạn! 🚀
