# 🎨 SỔ TAY BÀI TẬP THỰC HÀNH CSS TOÀN DIỆN (CSS REAL-WORLD EXERCISES)

> Sổ tay bài tập được chia làm 2 phần khoa học:
> * **PHẦN 1:** "Lột xác" & Tút tát CSS cho 7 file HTML bạn đã làm trước đó (`ex1.html` -> `ex7.html`).
> * **PHẦN 2:** Các bài tập thực chiến xây dựng Thành phần Giao diện (UI Components) từ con số 0 (tự viết cả HTML & CSS).

---

## 🗺️ LỘ TRÌNH LUYỆN TẬP

### 🌟 PHẦN 1: TÚT TÁT CSS CHO 7 BÀI HTML CŨ (RETROFIT CSS)
- [ ] **Bài 1.1:** Làm đẹp Trang Giới Thiệu Cá Nhân (`ex1.html` -> `ex1.css`) *(Typography, Box Model, Colors & Card)*
- [ ] **Bài 1.2:** Làm đẹp Thư Viện Ảnh & Đa Phương Tiện (`ex2.html` & `ex3.html`) *(Image Fitting, Hover Zoom, Shadow, Responsive Media)*
- [ ] **Bài 1.3:** Tùy biến Danh Sách & Bảng Dữ Liệu Chuyên Nghiệp (`ex4.html` -> `ex4.css`) *(Zebra Striping, Border-collapse, Custom Lists)*
- [ ] **Bài 1.4:** Tùy biến Biểu Mẫu Đăng Ký Đỉnh Cao (`ex5.html` -> `ex5.css`) *(Focus Glow, Accent Color, Grid/Flex Form)*
- [ ] **Bài 1.5:** Dàn Trang Bố Cục Ngữ Nghĩa Toàn Diện (`ex6.html` & `ex7.html`) *(Semantic Layout, Sticky Header, Sidebar Grid, Responsive)*

---

### 🚀 PHẦN 2: BÀI TẬP DỰNG GIAO DIỆN THỰC CHIẾN TỪ CON SỐ 0 (TỰ CODE HTML + CSS)
- [ ] **Bài 2.1:** Thanh Điều Hướng (Navigation Bar) & Menu Thả Xuống (Dropdown Menu) Thuần CSS
- [ ] **Bài 2.2:** Bảng Thẻ Báo Giá (Pricing Cards Grid) với Ribbon "Phổ Biến Nhất", Hover Zoom & Hiệu Ứng Nổi Khối
- [ ] **Bài 2.3:** Thẻ Giới Thiệu Lật 3D (3D Flip Profile Card) với Hiệu Ứng Chiều Sâu & Mạng Xã Hội
- [ ] **Bài 2.4:** Hộp Tooltip Chỉ Dẫn Thông Minh có Mũi Tên Tam Giác Thuần CSS & Animated Badge
- [ ] **Bài 2.5:** Bố Cục Trang Báo Chí Đa Cột Hiện Đại (Newspaper Multi-Columns) & Banner Cắt Khối Clip-Path

---

# 📖 CHI TIẾT ĐỀ BÀI TỪNG PHẦN

---

# 🌟 PHẦN 1: TÚT TÁT CSS CHO 7 BÀI HTML CŨ

---

## 📌 BÀI 1.1: LỘT XÁC TRANG GIỚI THIỆU CÁ NHÂN (`ex1.html`)
👉 **Mục tiêu:** Biến file `ex1.html` đơn điệu ban đầu thành một trang Profile Card hiện đại bằng file `ex1.css`.

### 📋 Yêu cầu CSS (`ex1.css`):
1. **Thiết lập nền & Reset:**
   * `body`: Font chữ `'Inter', system-ui, sans-serif`, nền màu xám nhạt `#f8fafc`, padding `30px`.
2. **Khung bao Profile (Card Container):**
   * Đặt class bao bọc có `max-width: 600px`, căn giữa màn hình bằng `margin: 0 auto;`.
   * Nền trắng `#ffffff`, bo góc `16px`, đổ bóng nhẹ `box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);`, padding `32px`.
3. **Typography & Màu sắc:**
   * Tiêu đề `h1`: Màu xanh chủ đạo `#1e40af`, `font-size: 28px`, có dải gạch chân gradient phát sáng bằng `::after` hoặc `border-bottom`.
   * Các thẻ `p`, `strong`, `em`: Khoảng cách dòng `line-height: 1.8`, màu chữ `#334155`.
   * Thẻ highlight `<mark>`: Đổi nền vàng nhạt `#fef08a`, bo góc `4px`, padding `2px 6px`.

---

## 📌 BÀI 1.2: THƯ VIỆN ĐA PHƯƠNG TIỆN CHUYÊN NGHIỆP (`ex2.html` & `ex3.html`)
👉 **Mục tiêu:** Định dạng hình ảnh, video, audio trong `ex2.html` / `ex3.html` thành thư viện Media sang trọng.

### 📋 Yêu cầu CSS:
1. **Khung chứa ảnh `<figure>` & `<img>`:**
   * Ảnh `<img>`: Kích thước đồng đều, sử dụng `object-fit: cover;`, bo góc `12px`.
   * Hiệu ứng rê chuột `:hover`: Phóng to nhẹ `transform: scale(1.04);` và đổ bóng `box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);`, có `transition: all 0.3s ease;`.
   * Chú thích `<figcaption>`: Chữ nghiêng `font-style: italic`, màu xám `#64748b`, căn giữa dưới ảnh.
2. **Khung Video & Audio:**
   * Video có viền bo cong `border-radius: 12px`, `max-width: 100%`, đổ bóng khối.

---

## 📌 BÀI 1.3: DANH SÁCH & BẢNG DỮ LIỆU ĐỈNH CAO (`ex4.html`)
👉 **Mục tiêu:** Biến bảng và danh sách trong `ex4.html` thành Data Table chuẩn doanh nghiệp.

### 📋 Yêu cầu CSS:
1. **Bảng dữ liệu `<table>`:**
   * `width: 100%; border-collapse: collapse; margin-top: 20px; overflow: hidden; border-radius: 10px;`.
   * Hàng tiêu đề `<th>`: Nền xanh đen `#0f172a`, chữ trắng, chữ in hoa `text-transform: uppercase`, padding `14px 16px`, căn trái `text-align: left`.
   * Ô dữ liệu `<td>`: Padding `12px 16px`, đường kẻ ngăn cách mảnh `#e2e8f0`.
   * **Tô màu so le (Zebra Striping):** Hàng chẵn `tr:nth-child(even)` nền `#f8fafc`.
   * **Hiệu ứng hover:** `tr:hover` nền `#e0f2fe`, con trỏ chuột `cursor: pointer`.
2. **Danh sách `<ul>`, `<ol>`:**
   * Tùy biến icon hoặc dấu đầu dòng vuông `list-style-type: square;`, thụt lề `list-style-position: inside;`.

---

## 📌 BÀI 1.4: BIỂU MẪU ĐĂNG KÝ HIỆN ĐẠI (FORMS & INPUTS - `ex5.html`)
👉 **Mục tiêu:** Tùy biến toàn bộ form trong `ex5.html` với Focus Glow, bo góc và layout ngăn nắp.

### 📋 Yêu cầu CSS:
1. **Khung Form Card:**
   * Form nằm trong hộp `max-width: 550px`, căn giữa `margin: 30px auto`, nền trắng, padding `32px`, bo góc `16px`, shadow 3D.
2. **Các ô Input, Textarea, Select:**
   * `width: 100%`, padding `12px 16px`, viền `1px solid #cbd5e1`, bo góc `8px`, `font-size: 15px`, `transition: all 0.25s ease`.
   * Khi nhấp chuột `:focus`: Xóa viền đen `outline: none;`, đổi viền sang xanh `#3b82f6`, phát sáng `box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.2);`.
   * Chữ gợi ý `::placeholder`: Chữ nghiêng mờ `#94a3b8`.
   * Textarea: Khống chế `resize: vertical; min-height: 100px;`.
3. **Controls (Checkbox & Radio):**
   * Dùng `accent-color: #3b82f6; transform: scale(1.15); cursor: pointer;`.
4. **Nút Bấm Submit:**
   * Nền gradient từ `#3b82f6` sang `#2563eb`, chữ trắng, in đậm, bo góc `8px`, padding `12px`, `:hover` nổi lên `transform: translateY(-2px);` kèm bóng mờ.

---

## 📌 BÀI 1.5: DÀN TRANG BỐ CỤC NGỮ NGHĨA (LAYOUT CHUYÊN NGHIỆP - `ex6.html` / `ex7.html`)
👉 **Mục tiêu:** Dàn trang toàn bộ website ngữ nghĩa bằng CSS Grid và Flexbox.

### 📋 Yêu cầu CSS:
1. **Header dính trên đầu:** `position: sticky; top: 0; z-index: 100; background: #ffffff; box-shadow: ...`.
2. **Bố cục thân trang (Main + Aside):** Dùng CSS Grid chia tỉ lệ `grid-template-columns: 1fr 300px; gap: 24px;`.
3. **Footer:** Nền tối `#0f172a`, chữ xám trắng `#94a3b8`, căn giữa, padding `30px`.
4. **Responsive:** Khi co màn hình dưới `768px` -> Bố cục Main + Aside tự động chuyển thành 1 cột dọc `grid-template-columns: 1fr;`.

---

# 🚀 PHẦN 2: BÀI TẬP DỰNG GIAO DIỆN TỪ CON SỐ 0 (TỰ CODE HTML + CSS)

---

## 📌 BÀI 2.1: THANH NAVIGATION BAR & DROPDOWN MENU THUẦN CSS

### 🏗️ 1. Mô tả cấu trúc HTML (Bạn tự viết vào file `bai2_1.html`):
* **Thẻ bao ngoài:** `<header class="site-header">`
* **Khung giới hạn chiều rộng:** `<div class="nav-container">`
* **Cụm 1 (Bên trái):** Thẻ `<a href="#" class="brand-logo">` chứa icon và chữ thương hiệu.
* **Cụm 2 (Ở giữa):** Thẻ `<nav class="main-nav">` chứa `<ul class="nav-menu">`:
  * Các mục `li.nav-item`: `Trang Chủ`, `Khóa Học`, `Về Chúng Tôi`, `Liên Hệ`.
  * Mục `Khóa Học` có thêm class `.has-dropdown`, bên trong chứa thêm thẻ `<ul class="dropdown-submenu">` gồm 3 mục con (*Frontend Master, Backend NodeJS, Thiết Kế UI/UX*).
* **Cụm 3 (Bên phải):** Thẻ `<div class="nav-cta">` chứa nút `<button class="btn-signup">Đăng Ký Ngay</button>`.

<details>
<summary>📄 <b>Xem code HTML mẫu cho Bài 2.1 (Bấm để mở tham khảo nếu cần)</b></summary>

```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bài 2.1: Navbar & Dropdown Menu Thuần CSS</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="bai2_1.css">
</head>
<body>

    <header class="site-header">
        <div class="nav-container">
            <!-- LOGO -->
            <a href="#" class="brand-logo">
                <i class="fa-solid fa-code"></i> DevMaster
            </a>

            <!-- NAVIGATION MENU -->
            <nav class="main-nav">
                <ul class="nav-menu">
                    <li class="nav-item"><a href="#" class="nav-link active">Trang Chủ</a></li>
                    
                    <!-- DROPDOWN ITEM -->
                    <li class="nav-item has-dropdown">
                        <a href="#" class="nav-link">
                            Khóa Học <i class="fa-solid fa-chevron-down arrow-icon"></i>
                        </a>
                        <ul class="dropdown-submenu">
                            <li><a href="#"><i class="fa-brands fa-html5"></i> Frontend Master</a></li>
                            <li><a href="#"><i class="fa-brands fa-node-js"></i> Backend NodeJS</a></li>
                            <li><a href="#"><i class="fa-solid fa-wand-magic-sparkles"></i> Thiết Kế UI/UX</a></li>
                        </ul>
                    </li>

                    <li class="nav-item"><a href="#" class="nav-link">Về Chúng Tôi</a></li>
                    <li class="nav-item"><a href="#" class="nav-link">Liên Hệ</a></li>
                </ul>
            </nav>

            <!-- NÚT CTA -->
            <div class="nav-cta">
                <button type="button" class="btn-signup">
                    <i class="fa-solid fa-rocket"></i> Đăng Ký Ngay
                </button>
            </div>
        </div>
    </header>

    <!-- NỘI DUNG CUỘN TRANG TEST STICKY -->
    <main style="max-width: 900px; margin: 40px auto; padding: 20px; text-align: center;">
        <h1 style="font-size: 32px; margin-bottom: 16px;">Trang Thử Nghiệm Navigation Bar</h1>
        <p style="color: #64748b; margin-bottom: 40px;">Hãy cuộn trang xuống để thấy Navbar ghim chặt trên đầu và rê chuột vào "Khóa Học" để thấy Dropdown!</p>
        <div style="height: 1000px; background: #f1f5f9; border-radius: 12px; padding: 40px; color: #94a3b8;">
            (Khoảng trống cuộn trang)
        </div>
    </main>

</body>
</html>
```
</details>

---

### 🎨 2. Mô tả yêu cầu CSS (Bạn viết vào file `bai2_1.css`):
1. **Reset & Khung bao Header:**
   * Dùng `* { margin: 0; padding: 0; box-sizing: border-box; }`.
   * `.site-header`: `position: sticky; top: 0; z-index: 1000; background: #ffffff; box-shadow: 0 4px 15px rgba(0,0,0,0.06);`.
2. **Dàn hàng ngang bằng Flexbox:**
   * `.nav-container`: `display: flex; justify-content: space-between; align-items: center; max-width: 1200px; margin: 0 auto; padding: 14px 24px;`.
   * `.nav-menu`: `display: flex; list-style: none; gap: 28px; align-items: center;`.
3. **Định dạng Link & Gạch chân Active:**
   * `.nav-link`: Màu `#334155`, bỏ gạch chân `text-decoration: none`, `font-weight: 500`, `transition: color 0.25s ease`.
   * `.nav-link:hover`, `.nav-link.active`: Đổi sang màu xanh `#2563eb`.
   * `.nav-link.active`: Có gạch phát sáng bằng `border-bottom: 2px solid #2563eb;` hoặc `::after`.
4. **Hiệu ứng Dropdown Menu con thuần CSS:**
   * Thẻ cha `.has-dropdown`: Đặt `position: relative;`.
   * Thẻ con `.dropdown-submenu`:
     ```css
     position: absolute;
     top: 100%;
     left: 0;
     width: 230px;
     background: #ffffff;
     border-radius: 10px;
     box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
     list-style: none;
     padding: 8px 0;
     border: 1px solid #f1f5f9;
     /* Ẩn mặc định và đặt hiệu ứng trượt */
     opacity: 0;
     visibility: hidden;
     transform: translateY(12px);
     transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
     ```
   * Khi rê chuột vào thẻ cha:
     ```css
     .has-dropdown:hover .dropdown-submenu {
         opacity: 1;
         visibility: visible;
         transform: translateY(0);
     }
     ```
5. **Nút bấm CTA (`.btn-signup`):**
   * Nền gradient từ `#3b82f6` sang `#1d4ed8`, chữ trắng, viền `none`, bo góc `8px`, padding `10px 20px`, `font-weight: 600`, con trỏ `cursor: pointer`, `transition: all 0.3s ease`.
   * Khi `:hover`: Nổi lên `transform: translateY(-3px);` và đổ bóng `box-shadow: 0 8px 20px rgba(37, 99, 235, 0.35);`.

---

## 📌 BÀI 2.2: BẢNG THẺ BÁO GIÁ (PRICING CARDS GRID) VỚI RIBBON BADGE & HOVER ZOOM

### 🏗️ 1. Mô tả cấu trúc HTML (File `bai2_2.html`):
* Khung bao ngoài `.pricing-section` chứa tiêu đề giới thiệu.
* Khung lưới chia cột `.pricing-grid` chứa **3 thẻ giá**:
  * Thẻ 1: Gói Cơ Bản (Basic) - Giá 0đ
  * Thẻ 2: Gói Chuyên Nghiệp (Pro - Có dải băng "Phổ Biến Nhất" `.popular-badge`) - Giá 299k
  * Thẻ 3: Gói Doanh Nghiệp (Enterprise) - Giá 899k
* Mỗi thẻ gồm: Tên gói, mức giá, danh sách tính năng (icon dấu tích `fa-check`), và nút "Chọn Gói".

<details>
<summary>📄 <b>Xem code HTML mẫu cho Bài 2.2 (Bấm để mở tham khảo nếu cần)</b></summary>

```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bài 2.2: Pricing Cards Grid</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="bai2_2.css">
</head>
<body>

    <section class="pricing-section">
        <div class="pricing-header">
            <h2>Bảng Giá Khóa Học Linh Hoạt</h2>
            <p>Chọn gói học phù hợp nhất với lộ trình sự nghiệp của bạn</p>
        </div>

        <div class="pricing-grid">
            <!-- GÓI 1 -->
            <div class="price-card">
                <h3 class="card-title">Cơ Bản (Starter)</h3>
                <div class="card-price"><span class="amount">0đ</span> / tháng</div>
                <ul class="features-list">
                    <li><i class="fa-solid fa-check"></i> HTML5 & CSS3 Nền tảng</li>
                    <li><i class="fa-solid fa-check"></i> 10 Bài tập thực hành</li>
                    <li class="disabled"><i class="fa-solid fa-xmark"></i> Hỗ trợ 1-1 từ Mentor</li>
                </ul>
                <button class="btn-plan">Bắt Đầu Miễn Phí</button>
            </div>

            <!-- GÓI 2 (NỔI BẬT) -->
            <div class="price-card featured">
                <div class="popular-ribbon">Phổ Biến Nhất</div>
                <h3 class="card-title">Chuyên Nghiệp (Pro)</h3>
                <div class="card-price"><span class="amount">299k</span> / tháng</div>
                <ul class="features-list">
                    <li><i class="fa-solid fa-check"></i> Toàn bộ Video HTML, CSS, JS</li>
                    <li><i class="fa-solid fa-check"></i> 5 Dự án Web thực chiến</li>
                    <li><i class="fa-solid fa-check"></i> Hỗ trợ Code Review 1-1</li>
                </ul>
                <button class="btn-plan btn-featured">Đăng Ký Gói Pro</button>
            </div>

            <!-- GÓI 3 -->
            <div class="price-card">
                <h3 class="card-title">Doanh Nghiệp (VIP)</h3>
                <div class="card-price"><span class="amount">899k</span> / tháng</div>
                <ul class="features-list">
                    <li><i class="fa-solid fa-check"></i> Toàn quyền truy cập trọn đời</li>
                    <li><i class="fa-solid fa-check"></i> Luyện phỏng vấn Mock Interview</li>
                    <li><i class="fa-solid fa-check"></i> Giới thiệu việc làm trực tiếp</li>
                </ul>
                <button class="btn-plan">Liên Hệ Tư Vấn</button>
            </div>
        </div>
    </section>

</body>
</html>
```
</details>

---

### 🎨 2. Mô tả yêu cầu CSS (File `bai2_2.css`):
1. **Bố cục lưới CSS Grid:**
   * `.pricing-grid`: `display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; max-width: 1050px; margin: 0 auto;`.
2. **Định dạng Thẻ Card:**
   * `.price-card`: Nền trắng `#ffffff`, padding `36px 28px`, bo góc `16px`, viền `1px solid #e2e8f0`, đổ bóng `box-shadow: 0 4px 20px rgba(0,0,0,0.05);`, `transition: all 0.3s ease; position: relative; overflow: hidden;`.
   * Khi `:hover`: Phóng to nhẹ `transform: translateY(-8px);` và bóng đậm `box-shadow: 0 20px 30px rgba(0,0,0,0.12);`.
3. **Thẻ Nổi Bật (`.featured`):**
   * Viền phát sáng xanh `#3b82f6` dày 2px, hoặc nền tối bóng bẩy.
   * Dải ruy băng `.popular-ribbon`: `position: absolute; top: 16px; right: -32px; transform: rotate(45deg);` nền đỏ/cam rực rỡ, chữ trắng, padding `4px 35px`, `font-size: 11px`, `font-weight: 700`.
4. **Nút Chọn Gói:**
   * Nút `.btn-plan` rộng `100%`, bo góc `8px`, padding `12px`, đổi màu mượt khi rê chuột.

---

## 📌 BÀI 2.3: THẺ GIỚI THIỆU LẬT 3D (3D FLIP PROFILE CARD)

### 🏗️ 1. Mô tả cấu trúc HTML (File `bai2_3.html`):
* Khung ngoài `.flip-card-container`
* Khung xoay trong `.flip-card-inner`
* Mặt trước `.flip-card-front`: Ảnh đại diện tròn, Tên, Chức danh Front-End Developer.
* Mặt sau `.flip-card-back`: Danh sách kỹ năng (*HTML, CSS, JS*), Nút "Liên Hệ" và các icon Mạng xã hội (*Facebook, Github, LinkedIn*).

<details>
<summary>📄 <b>Xem code HTML mẫu cho Bài 2.3 (Bấm để mở tham khảo nếu cần)</b></summary>

```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bài 2.3: 3D Flip Profile Card</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="bai2_3.css">
</head>
<body>

    <div class="card-wrapper">
        <div class="flip-card">
            <div class="flip-card-inner">
                
                <!-- MẶT TRƯỚC -->
                <div class="flip-card-front">
                    <img src="anh1.jpg" alt="Avatar" class="avatar-img">
                    <h2 class="user-name">Nguyễn Văn A</h2>
                    <p class="user-role">Frontend Developer</p>
                    <span class="hint-flip"><i class="fa-solid fa-arrows-rotate"></i> Rê chuột để xem kỹ năng</span>
                </div>

                <!-- MẶT SAU -->
                <div class="flip-card-back">
                    <h3>Kỹ Năng Nổi Bật</h3>
                    <div class="skills-tags">
                        <span>HTML5</span>
                        <span>CSS3 Master</span>
                        <span>Flexbox/Grid</span>
                        <span>JavaScript</span>
                    </div>
                    <p class="bio-text">Đam mê xây dựng các giao diện web mượt mà, chuẩn SEO và tối ưu trải nghiệm người dùng.</p>
                    <div class="social-icons">
                        <a href="#"><i class="fa-brands fa-github"></i></a>
                        <a href="#"><i class="fa-brands fa-linkedin"></i></a>
                        <a href="#"><i class="fa-brands fa-facebook"></i></a>
                    </div>
                </div>

            </div>
        </div>
    </div>

</body>
</html>
```
</details>

---

### 🎨 2. Mô tả yêu cầu CSS (File `bai2_3.css`):
1. **Thiết lập không gian 3 chiều:**
   * `.flip-card`: `width: 320px; height: 420px; perspective: 1000px; margin: 50px auto;`.
   * `.flip-card-inner`: `width: 100%; height: 100%; transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1); transform-style: preserve-3d; position: relative;`.
   * Khi hover `.flip-card:hover .flip-card-inner`: `transform: rotateY(180deg);`.
2. **Cấu tạo 2 mặt Front & Back:**
   * `.flip-card-front, .flip-card-back`: `position: absolute; width: 100%; height: 100%; backface-visibility: hidden; border-radius: 20px; padding: 30px; display: flex; flex-direction: column; align-items: center; justify-content: center; box-shadow: 0 15px 35px rgba(0,0,0,0.15);`.
   * `.flip-card-front`: Nền trắng hoặc gradient xanh tím tươi sáng. Ảnh avatar tròn `border-radius: 50%; width: 110px; height: 110px; object-fit: cover; border: 4px solid #ffffff;`.
   * `.flip-card-back`: Nền tối sâu thẳm `background: linear-gradient(135deg, #0f172a, #1e293b); color: white; transform: rotateY(180deg);`.

---

## 📌 BÀI 2.4: HỘP TOOLTIP CHỈ DẪN VỚI MŨI TÊN TAM GIÁC THUẦN CSS

### 🏗️ 1. Mô tả cấu trúc HTML (File `bai2_4.html`):
* Tạo một đoạn văn chứa các cụm từ có gắn Tooltip giải thích ngữ nghĩa khi rê chuột vào.
* Ví dụ: Từ "CSS Grid" có Tooltip nổi lên phía trên ghi *"Bố cục 2 chiều mạnh mẽ"*, có mũi tên tam giác chỉ xuống từ đáy.

---

### 🎨 2. Mô tả yêu cầu CSS (File `bai2_4.css`):
1. Thẻ cha `.tooltip-box`: `position: relative; display: inline-block; cursor: pointer; border-bottom: 2px dashed #3b82f6; font-weight: 600;`.
2. Hộp Tooltip con `.tooltip-content`:
   * `position: absolute; bottom: 130%; left: 50%; transform: translateX(-50%); background: #1e293b; color: #ffffff; padding: 8px 14px; border-radius: 6px; font-size: 13px; white-space: nowrap; opacity: 0; visibility: hidden; transition: all 0.25s ease; pointer-events: none; z-index: 100;`.
   * Khi hover cha `.tooltip-box:hover .tooltip-content`: `opacity: 1; visibility: visible; transform: translateX(-50%) translateY(-4px);`.
3. **Mũi tên tam giác bằng `::after` (Border Trick):**
   * `.tooltip-content::after`: `content: ""; position: absolute; top: 100%; left: 50%; margin-left: -6px; border-width: 6px; border-style: solid; border-color: #1e293b transparent transparent transparent;`.

---

## 📌 BÀI 2.5: BÁO CHÍ ĐA CỘT (NEWSPAPER MULTI-COLUMNS) & HEADER CLIP-PATH

### 🏗️ 1. Mô tả cấu trúc HTML (File `bai2_5.html`):
* **Header Banner:** Cắt vát chéo bằng `clip-path: polygon(...)`, tiêu đề công nghệ lớn.
* **Bài viết:** Đoạn văn dài được chia làm 3 cột báo chí tự động, có tiêu đề `<h2>` ngắt ngang qua cả 3 cột bằng `column-span: all`.

---

### 🎨 2. Mô tả yêu cầu CSS (File `bai2_5.css`):
1. `.newspaper-article`: `column-count: 3; column-gap: 36px; column-rule: 1px solid #cbd5e1; text-align: justify; line-height: 1.8;`.
2. `.newspaper-article h2`: `column-span: all; text-align: center; margin-bottom: 24px; color: #1e3a8a; font-size: 26px;`.
3. `.article-header`: `clip-path: polygon(0 0, 100% 0, 100% 80%, 0 100%); background: linear-gradient(135deg, #1e1b4b, #3b82f6); color: white; padding: 50px 20px 70px; text-align: center;`.
