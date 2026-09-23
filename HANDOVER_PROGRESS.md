# 📋 BÁO CÁO TIẾN ĐỘ & BÀN GIAO DỰ ÁN PRAC_FE (HANDOVER PROGRESS)

> **Dành cho AI tiếp quản tại phiên làm việc tiếp theo:** 
> Vui lòng đọc kỹ file này kết hợp với `.agents/skills/fe-teaching-method/SKILL.md` để tiếp tục giữ đúng phong cách giảng dạy: **mổ xẻ cơ chế ngầm Browser/JS Engine, clean code không comment thừa, không dùng LaTeX, đồng hành hướng dẫn người học tự code.**

---

## 🧭 1. TỔNG QUAN NGỮ CẢNH DỰ ÁN

- **Thư mục workspace:** `/Users/thinh/FE/Prac_FE/PRAC_FE` (Chú ý: git repo nằm ở `PRAC_FE`).
- **Nhánh Git:** `main`.
- **Hệ thống gồm 2 trang liên thông dữ liệu qua LocalStorage (`products-data.js`):**
  1. `shop_mini.html` + `shop_mini.css` + `shop_mini.js`: Trang mua sắm khách hàng.
  2. `admin.html` + `admin.css` + `admin.js`: Trang Dashboard quản trị sản phẩm.
  3. `products-data.js`: Kho dữ liệu trung tâm dùng chung (`STORAGE_KEYS`: `PRODUCTS`, `CART`, `BALANCE`), cơ chế tự phục hồi (self-healing fallback).

---

## ✅ 2. TỔNG KẾT NHỮNG GÌ ĐÃ HOÀN THÀNH

### A. Trang Mua Sắm (`shop_mini.html`, `shop_mini.css`, `shop_mini.js`) - HOÀN THÀNH 100%
- **Giao diện:** Semantic HTML, CSS Grid 3 cột, Card sản phẩm, Badge Hot deal, Giỏ hàng bên phải.
- **Hiển thị & Tìm kiếm:** Lọc danh mục (Event Delegation) + Tìm kiếm từ khóa theo thời gian thực (sự kiện `input`).
- **Tương tác giỏ hàng:**
  - Tăng / Giảm số lượng (`updateQuantity`) có chốt chặn kiểm tra không vượt quá tồn kho `stock` (`item.quantity >= product.stock`), tự động xóa khi số lượng về 0.
  - Xóa từng món (`removeFromCart`) bằng `.filter()`.
  - Nút "Xóa tất cả" (`clearCartBtn`) có xác nhận `confirm()`.
- **Ví tiền & Thanh toán (`checkout`):**
  - Quản lý số dư `balance` (mặc định 50.000.000đ).
  - Tính tổng bill bằng `.reduce()`, kiểm tra ví đủ tiền mới cho mua.
  - Trừ tiền ví, trừ số lượng tồn kho `stock` của các sản phẩm tương ứng trong kho hàng (`products`), lưu LocalStorage, xóa giỏ hàng.

### B. Trang Quản Trị Admin (`admin.html`, `admin.css`, `admin.js`) - HOÀN THÀNH CƠ BẢN
- **Đồng bộ dữ liệu:** Nhúng `products-data.js` dùng chung danh mục 11 sản phẩm gốc.
- **Thống kê Dashboard (`renderStats`):** 4 thẻ KPI tính tự động: Tổng sản phẩm, Đang bán, Chờ duyệt, Hết hàng.
- **Bảng dữ liệu (`renderTable`):** Đổ 10 cột dữ liệu (STT, Ảnh thumbnail, Tên, Danh mục, Giá gốc, Giá bán, Tồn kho, Trạng thái badge, Đánh giá, Nút Sửa/Xóa).
- **Bộ lọc kết hợp 3 tầng (`applyFilters`):** Tìm kiếm theo tên + Lọc theo Trạng thái + Lọc theo Danh mục.
- **Modal Form CRUD (Thêm / Sửa / Xóa):**
  - Tái sử dụng 1 Modal duy nhất qua cờ hiệu `editingId`.
  - **Thêm mới:** `editingId = null`, reset form, sinh ID mới `Math.max(...id) + 1`.
  - **Sửa:** `editingId = id`, đổ dữ liệu cũ vào input (pre-fill), ghi đè dữ liệu bằng Object Spread `{ ...p, ...productData }`.
  - **Xóa:** Bắt sự kiện click qua Event Delegation trên `productTableBody`, xác nhận `confirm()`, xóa bằng `.filter()`.
  - Đóng modal khi bấm [X], nút [Hủy], hoặc bấm ra vùng nền tối bên ngoài (`e.target === productModal`).

---

## 📌 3. CÔNG VIỆC CẦN LÀM TIẾP HÔM SAU (USER NOTES ĐẶC BIỆT)

Người học đã yêu cầu ghi chú cụ thể các mục sau để triển khai ở buổi học tiếp theo:

### 1. Đồng bộ Số dư Ví tiền & Luồng Thanh toán
- Rà soát và hoàn thiện dứt điểm luồng trừ tiền, hiển thị số dư ví sau khi thanh toán xong giữa trang Shop và Admin.
- Bổ sung tùy chọn nạp thêm tiền ví hoặc reset số dư khi cần.

### 2. Cho phép Upload File Ảnh thật khi Thêm / Sửa sản phẩm
- Thay vì chỉ gõ đường dẫn URL tĩnh (`images/p1.jpg`):
  - Chuyển ô nhập ảnh thành `<input type="file" id="product-image-file" accept="image/*">`.
  - Ứng dụng API **`FileReader`** (`readAsDataURL`) để đọc file ảnh thành chuỗi Base64 và hiển thị khung **Xem trước ảnh (Image Preview)** ngay trên Modal.
  - **Ràng buộc bảo mật & hiệu năng:**
    - Giới hạn định dạng file hợp lệ: chỉ nhận `.png`, `.jpg`, `.jpeg`, `.webp`.
    - Giới hạn kích thước file (ví dụ: tối đa `1MB` hoặc `2MB` để tránh làm tràn hạn mức 5MB của LocalStorage).

### 3. Thêm tính năng Phân trang (Pagination) cho Bảng Admin
- **Bài toán thực tế:** Khi bảng có 100 - 1.000 bản ghi, không thể render hết một lúc gây lag giao diện.
- **Thanh điều khiển phân trang dưới đáy bảng:**
  - Dropdown chọn số dòng hiển thị mỗi trang: `5, 10, 20... sản phẩm / trang`.
  - Bộ nút điều hướng: Nút `Trước`, các nút số trang `1, 2, 3...`, nút `Sau`.
  - Hiển thị thông tin: *"Hiển thị 1 - 10 trên tổng số 100 sản phẩm"*.
- **Cơ chế ngầm:** Thuật toán tính `totalPages = Math.ceil(total / pageSize)`, dùng phương thức **`.slice(startIndex, endIndex)`** để cắt mảng dữ liệu hiển thị theo trang hiện tại.

### 4. Nghiên cứu cách Sửa sản phẩm KHÔNG CẦN DÙNG `.map()`
- Khám phá và mổ xẻ các cách cập nhật phần tử trong JavaScript thay thế cho `.map()`:
  - **Cách 1: Dùng `.findIndex()`**: Tìm chỉ số index của sản phẩm trong mảng, rồi gán đè trực tiếp `products[index] = { ...products[index], ...productData }`.
  - **Cách 2: Dùng `.find()` + `Object.assign()`**: Tìm đối tượng bằng `.find()` (lấy tham chiếu ô nhớ Heap), rồi dùng `Object.assign(product, productData)` để ghi đè thuộc tính trực tiếp.
  - So sánh chuyên sâu về hiệu năng và triết lý: **Mutable (Biến đổi trực tiếp)** vs **Immutable (Tạo mảng mới)** trong JavaScript Engine.

---

## 💬 4. PROMPT DÁN CHO AI TIẾP QUẢN PHIÊN TIẾP THEO

Khi bắt đầu phiên làm việc mới, bạn chỉ cần gửi đoạn tin nhắn sau:

> *"Chào bạn! Hãy đọc kỹ file `HANDOVER_PROGRESS.md` (đặc biệt là Mục 3: CÔNG VIỆC CẦN LÀM TIẾP HÔM SAU) và tuân thủ skill `.agents/skills/fe-teaching-method/SKILL.md`. Chúng ta sẽ bắt đầu giải quyết 4 nhiệm vụ đã được note lại: (1) Rà soát luồng tiền ví sau checkout, (2) Upload file ảnh có validate định dạng/kích thước bằng FileReader, (3) Làm phân trang Pagination cho bảng Admin, và (4) Mổ xẻ cách sửa sản phẩm không dùng .map(). Hãy hướng dẫn tôi từng bước một nhé!"*
