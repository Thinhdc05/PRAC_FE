# 📐 BÁCH KHOA TOÀN THƯ FRONT-END THỰC CHIẾN (FE INTERN BLUEPRINT)

> **Mục tiêu của file này:** Bạn nhìn vào 1 UI bất kỳ → biết ngay dùng thẻ gì (Phần A) → biết viết CSS theo đúng thứ tự nào (Phần B) → biết style từng thành phần cần những gì (Phần C) → rà soát lại bằng Checklist (Phần D) trước khi coi là xong.
>
> Dùng file này như **tờ hướng dẫn thi công**, không phải sách giáo khoa — vừa làm vừa đối chiếu.

---

# PHẦN A — TƯ DUY DỰNG HTML: KHI NÀO BỌC BẰNG GÌ

## A.1 Bảng Quyết Định Chọn Thẻ (Đọc từ trên xuống, thẻ nào đúng thì dừng)

| Thứ tự hỏi | Câu hỏi | Nếu ĐÚNG → Dùng thẻ |
| :---: | :--- | :--- |
| 1 | Đây là **toàn bộ vùng nội dung chính** của trang, chỉ có 1 cái duy nhất? | `<main>` |
| 2 | Đây là khối chứa **logo + menu điều hướng** (đầu trang hoặc đầu 1 khối)? | `<header>` |
| 3 | Đây là **danh sách các liên kết điều hướng** (menu, breadcrumb, phân trang)? | `<nav>` |
| 4 | Nội dung có **tiêu đề riêng và là 1 chủ đề độc lập** ("Bảng giá", "Giới thiệu", "Liên hệ")? | `<section>` |
| 5 | Nội dung có thể **tách ra khỏi trang, đăng ở nơi khác vẫn tự hiểu** (bài báo, 1 sản phẩm, 1 comment)? | `<article>` |
| 6 | Đây là nội dung **phụ, liên quan nhưng tách rời luồng chính** (sidebar, quảng cáo, bài viết liên quan)? | `<aside>` |
| 7 | Đây là **chân trang** (bản quyền, liên hệ, social links)? | `<footer>` |
| 8 | Không cái nào ở trên đúng — đây chỉ là **khung bọc kỹ thuật để chia cột / style riêng**? | `<div>` |
| 9 | Đây là **1 đoạn chữ ngắn nằm trong dòng** cần style riêng (in đậm 1 từ, đổi màu 1 cụm từ)? | `<span>` |

> **Tại sao thực tế vẫn dùng rất nhiều `<div>`?**
> Vì thẻ ngữ nghĩa (`section`, `article`...) chịu trách nhiệm **khai báo ý nghĩa cho SEO và trình đọc màn hình**. Còn để **chia cột Grid/Flex, tạo khung Card, bọc lót kích thước** thì bắt buộc phải có `<div>` làm khung kỹ thuật bên trong. Một trang chuẩn có ~10-15 thẻ ngữ nghĩa + hàng chục `<div>` bọc kỹ thuật là **hoàn toàn bình thường**.

---

## A.2 Ví Dụ Bóc Tách 1 UI Thực Tế — "Trang Bảng Giá"

```html
<!-- Tầng 1: section vì có tiêu đề riêng "Bảng giá" -->
<section class="pricing-section">
    <h2 class="section-title">Bảng Giá Linh Hoạt</h2>
    <p class="section-desc">Chọn gói phù hợp với nhu cầu của bạn</p>

    <!-- Tầng 2: div vì chỉ để chia 3 cột Grid, không có nghĩa ngữ nghĩa -->
    <div class="pricing-grid">

        <!-- Tầng 3: article vì mỗi thẻ giá độc lập, tách ra vẫn hiểu -->
        <article class="pricing-card">
            <h3 class="card-title">Gói Cơ Bản</h3>

            <!-- span (9): style riêng cho phần "/tháng" nhỏ hơn số tiền -->
            <p class="card-price">99.000đ <span class="price-unit">/tháng</span></p>

            <ul class="feature-list">
                <li>5GB dung lượng</li>
                <li>Hỗ trợ email</li>
            </ul>
            <button class="btn btn-outline">Chọn Gói</button>
        </article>

        <!-- Card nổi bật dùng thêm class modifier .featured -->
        <article class="pricing-card featured">
            <div class="popular-ribbon">Phổ Biến Nhất</div>
            ...
        </article>

    </div>
</section>
```

**Đọc hiểu sơ đồ phân tầng:**
* `section` → Tầng ngữ nghĩa (báo cáo cho Google).
* `div.pricing-grid` → Tầng kỹ thuật (chỉ để CSS Grid).
* `article.pricing-card` → Tầng ngữ nghĩa (đơn vị lặp lại độc lập).
* `span.price-unit` → Tầng inline (style 1 phần nhỏ trong dòng chữ).

---

## A.3 Quy Trình 5 Giai Đoạn Khi Bắt Tay Vào Làm 1 UI

| Giai đoạn | Việc làm cụ thể | Kết quả & Dấu hiệu làm đúng |
| :---: | :--- | :--- |
| **1. Phân tích** | • Đếm khối lớn theo chiều **dọc** (header, hero, cards, footer).<br>• Xác định khối nào **lặp lại** (card, li, row).<br>• Ghi chú màu sắc chủ đạo và khoảng cách phổ biến. | Bạn vẽ được sơ đồ khung xương trong đầu hoặc trên giấy. |
| **2. Dựng HTML rỗng** | • Viết thẻ theo bảng A.1, từ ngoài vào trong.<br>• Đặt class theo **vai trò/chức năng** (`.pricing-card`, `.nav-list`), không đặt theo vẻ ngoài (`.box-blue`, `.div1`).<br>• **Chưa viết 1 dòng CSS nào.** | Trang hiện ra chỉ có chữ xếp chồng dọc — bình thường và đúng. |
| **3. Khai báo CSS nền tảng** | • Viết `:root` với biến màu & kích thước.<br>• Reset `* { margin:0; padding:0; box-sizing: border-box; }`.<br>• Style `body` (font, màu chữ, màu nền).<br>• Tạo `.container` giới hạn chiều rộng. | Tông màu và font nhất quán, bố cục chưa có — đúng. |
| **4. Style từng khối (từ ngoài vào trong)** | Theo đúng thứ tự cho **từng khối**: ① Layout cha (`display: flex/grid`, `gap`) → ② Vỏ con (nền, bo góc, shadow) → ③ Ruột con (chữ, icon, nút). | Từng khối đúng như UI mẫu. Không nhảy cóc, không style con trước khi layout cha. |
| **5. Responsive** | • Kéo DevTools (`F12`) từ 1200px thu nhỏ dần.<br>• Xác định điểm layout bị vỡ → thêm `@media` tại đúng điểm đó.<br>• Ưu tiên: Desktop trước → Tablet (768px) → Mobile (375px). | Không có nội dung bị cắt, tràn hay vỡ ở bất kỳ kích thước màn hình nào. |

---

# PHẦN B — THỨ TỰ VIẾT 1 FILE CSS TỪ ĐẦU ĐẾN CUỐI

> **Quy tắc vàng:** Luôn viết CSS theo đúng 6 tầng sau, từ trên xuống dưới. Không nhảy cóc tầng.

---

## Tầng 0: Nhúng phông chữ Google (trong `<head>` của HTML)

```html
<!-- Nhúng trước link CSS để font tải song song -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="style.css">
```

---

## Tầng 1: Biến Toàn Cục (`:root`)

> Khai báo 1 lần duy nhất. Toàn bộ file CSS phía dưới chỉ được gọi biến, **không được gõ mã màu `#hex` hoặc số cứng rải rác**.

```css
:root {
    /* ===== MÀU SẮC ===== */
    --color-primary:      #2563eb;  /* Màu chủ đạo (nút, link, active) */
    --color-primary-dark: #1d4ed8;  /* Hover / đậm hơn của primary */
    --color-accent:       #8b5cf6;  /* Màu nhấn phụ (gradient, badge nổi bật) */

    --color-text-dark:    #0f172a;  /* Chữ tiêu đề đậm */
    --color-text-body:    #334155;  /* Chữ đoạn văn chính */
    --color-text-muted:   #64748b;  /* Chữ phụ, placeholder, caption */

    --color-bg-page:      #f8fafc;  /* Nền toàn trang */
    --color-bg-card:      #ffffff;  /* Nền card, modal, form */
    --color-border:       #e2e8f0;  /* Màu viền mặc định */

    --color-success:      #16a34a;
    --color-warning:      #d97706;
    --color-danger:       #dc2626;

    /* ===== KÍCH THƯỚC & BO GÓC ===== */
    --radius-sm:   6px;
    --radius-md:  10px;
    --radius-lg:  16px;
    --radius-pill: 999px;  /* Bo tròn hoàn toàn kiểu viên thuốc */

    /* ===== ĐỔ BÓNG ===== */
    --shadow-sm:   0 1px 4px rgba(0, 0, 0, 0.06);
    --shadow-md:   0 4px 15px rgba(0, 0, 0, 0.08);
    --shadow-lg:   0 10px 30px rgba(0, 0, 0, 0.12);
    --shadow-glow: 0 0 0 4px rgba(37, 99, 235, 0.2);  /* Focus ring */

    /* ===== CHUYỂN ĐỘNG ===== */
    --transition-fast:   all 0.2s ease;
    --transition-normal: all 0.3s ease;

    /* ===== PHÔNG CHỮ & KÍCH CỠ ===== */
    --font-main: 'Inter', system-ui, sans-serif;
    --fs-xs:   12px;
    --fs-sm:   14px;
    --fs-base: 16px;
    --fs-lg:   20px;
    --fs-xl:   28px;
    --fs-2xl:  40px;

    --lh-heading: 1.2;  /* line-height cho tiêu đề (thấp, chặt) */
    --lh-body:    1.6;  /* line-height cho đoạn văn (cao, thoáng) */

    /* ===== CONTAINER ===== */
    --container-max: 1200px;
    --container-pad: 24px;
}
```

---

## Tầng 2: Reset Cơ Bản & Phông Chữ Toàn Trang

```css
/* 2.1 — Xóa mọi spacing mặc định, bắt buộc border-box */
*, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;  /* KHÔNG CÓ DÒNG NÀY = PHÌNH KÍCH THƯỚC KHÔNG KIỂM SOÁT */
}

/* 2.2 — Thiết lập toàn trang */
html {
    scroll-behavior: smooth;  /* Cuộn trang mượt khi bấm anchor link */
}

body {
    font-family: var(--font-main);
    font-size: var(--fs-base);
    line-height: var(--lh-body);
    color: var(--color-text-body);
    background-color: var(--color-bg-page);
    -webkit-font-smoothing: antialiased;  /* Chữ sắc nét hơn trên macOS/iOS */
}

/* 2.3 — Reset phần tử hay có default xấu */
a {
    text-decoration: none;
    color: inherit;
}

img, video, svg {
    display: block;     /* Xóa khoảng hở mặc định phía dưới ảnh */
    max-width: 100%;
}

ul, ol {
    list-style: none;
}

button, input, textarea, select {
    font-family: inherit;   /* Đồng bộ font với trang, không bị lệch tông */
    font-size: inherit;
}
```

---

## Tầng 3: Khung Bao Giới Hạn Chiều Rộng (`.container`)

```css
/* Container giữ nội dung không bị quá rộng trên màn hình lớn */
.container {
    width: 100%;
    max-width: var(--container-max);
    margin: 0 auto;
    padding: 0 var(--container-pad);
}
```

---

## Tầng 4: Hệ Thống Typography (Tiêu Đề & Đoạn Văn)

```css
/* 4.1 — Tiêu đề: line-height THẤP (1.2) để các dòng chặt, gọn */
h1, h2, h3, h4, h5, h6 {
    color: var(--color-text-dark);
    font-weight: 700;
    line-height: var(--lh-heading);
}

h1 { font-size: var(--fs-2xl); }
h2 { font-size: var(--fs-xl); }
h3 { font-size: var(--fs-lg); }

/* 4.2 — Đoạn văn: line-height CAO (1.6) để dễ đọc */
p {
    color: var(--color-text-body);
    line-height: var(--lh-body);
}

/* 4.3 — Chữ nhỏ phụ (caption, label, helper text) */
.text-muted {
    font-size: var(--fs-sm);
    color: var(--color-text-muted);
}

/* LỖI PHỔ BIẾN: dùng chung 1 line-height cho cả heading và paragraph */
/* h1 { line-height: 1.6 } → tiêu đề 2 dòng bị "hở" trông rất xấu */
/* p { line-height: 1.2 } → đoạn văn bị "bí" khó đọc */
```

---

## Tầng 5: Các Khối Giao Diện (Header → Nav → Section → Footer)

> Viết theo **thứ tự xuất hiện trên trang từ trên xuống dưới**. Trong mỗi khối, luôn style theo thứ tự: ① Layout cha → ② Vỏ con → ③ Ruột con.

```css
/* ---- 5.1 HEADER ---- */
.site-header { ... }
.site-header .nav-menu { ... }

/* ---- 5.2 HERO / BANNER ---- */
.hero { ... }

/* ---- 5.3 SECTION NỘI DUNG ---- */
.features-section { ... }
.pricing-section { ... }

/* ---- 5.4 FORM / CARD ---- */
.contact-form { ... }
.pricing-card { ... }

/* ---- 5.5 FOOTER ---- */
.site-footer { ... }
```

---

## Tầng 6: Class Tiện Ích Dùng Chung (Utilities)

```css
/* Chỉ khai báo ở đây, không lặp lại ở từng khối */
.text-center  { text-align: center; }
.text-right   { text-align: right; }
.font-bold    { font-weight: 700; }
.font-medium  { font-weight: 500; }
.d-none       { display: none; }
.w-full       { width: 100%; }
.mt-auto      { margin-top: auto; }
```

---

## Tầng 7: Responsive (LUÔN Ở Cuối File)

```css
/* Tablet (≤ 1024px) */
@media (max-width: 1024px) {
    .pricing-grid { grid-template-columns: repeat(2, 1fr); }
}

/* Mobile (≤ 768px) */
@media (max-width: 768px) {
    h1 { font-size: 28px; }
    .pricing-grid { grid-template-columns: 1fr; }
    .nav-list { flex-direction: column; }
}

/* Small mobile (≤ 480px) */
@media (max-width: 480px) {
    :root { --container-pad: 16px; }
}
```

---

# PHẦN C — TRA CỨU NHANH THUỘC TÍNH THEO THÀNH PHẦN UI

> Quy tắc dùng phần này: tìm đúng thành phần → copy nhóm thuộc tính "Bắt buộc" → chỉnh số liệu theo UI mẫu → **đừng bao giờ bỏ qua cột "Dễ quên nhất"** vì đó là thứ tách biệt giao diện chuyên nghiệp với giao diện amateur.

---

## C.1 Điều Hướng & Cấu Trúc Trang

### 🔷 Navbar (Thanh menu cố định đầu trang)
```css
.site-header {
    position: sticky;
    top: 0;
    z-index: 1000;                /* Luôn đè lên mọi thứ khi cuộn */
    background: var(--color-bg-card);
    box-shadow: var(--shadow-sm); /* Tách navbar khỏi nội dung dưới */
}

.nav-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: var(--container-max);
    margin: 0 auto;
    padding: 14px var(--container-pad);
}

.nav-list {
    display: flex;
    gap: 28px;
    list-style: none;             /* Reset dấu chấm mặc định */
}

.nav-list a {
    font-weight: 500;
    color: var(--color-text-body);
    transition: var(--transition-fast);
}

.nav-list a:hover,
.nav-list a.active {
    color: var(--color-primary);
}
```
> ⚠️ **Dễ quên nhất:**
> * `z-index: 1000` — thiếu dòng này, Dropdown hoặc nội dung trang sẽ đè lên trên Navbar khi cuộn.
> * `box-shadow` nhẹ — thiếu dòng này, Navbar "dính" vào nội dung, mất cảm giác nổi.
> * `list-style: none` trên `<ul>` — xóa dấu chấm đầu dòng mặc định của trình duyệt.

---

### 🔷 Dropdown Menu Con (Menu thả xuống thuần CSS)
```css
.has-dropdown {
    position: relative;  /* BẮT BUỘC — neo cho .dropdown-menu bên trong */
}

.dropdown-menu {
    position: absolute;
    top: 100%;           /* Ngay dưới thẻ cha */
    left: 0;
    min-width: 200px;
    background: var(--color-bg-card);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-lg);
    padding: 8px 0;
    list-style: none;
    /* --- Ẩn mặc định, trượt xuống khi hover --- */
    opacity: 0;
    visibility: hidden;
    transform: translateY(10px);
    transition: var(--transition-fast);
}

.has-dropdown:hover .dropdown-menu {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
}

.dropdown-menu a {
    display: block;
    padding: 10px 16px;
    transition: var(--transition-fast);
}

.dropdown-menu a:hover {
    background: var(--color-bg-page);
    color: var(--color-primary);
}
```
> ⚠️ **Dễ quên nhất:**
> * `position: relative` trên cha `.has-dropdown` — **thiếu cái này là lỗi #1 phổ biến nhất**. Menu con sẽ bay thẳng lên góc trên cùng của viewport thay vì bám dưới nút.
> * Dùng `opacity + visibility` thay vì `display: none/block` để có `transition` mượt mà.

---

### 🔷 Breadcrumb
```css
.breadcrumb {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: var(--fs-sm);
    color: var(--color-text-muted);
}

.breadcrumb a { color: var(--color-text-muted); }
.breadcrumb a:hover { color: var(--color-primary); text-decoration: underline; }

/* Dấu "/" ngăn cách tự động bằng ::before, không cần viết trong HTML */
.breadcrumb li + li::before {
    content: "/";
    color: var(--color-border);
    margin-right: 6px;
}

.breadcrumb .current {
    color: var(--color-text-dark);
    font-weight: 600;
    pointer-events: none; /* Trang hiện tại không click được */
}
```

---

### 🔷 Phân Trang (Pagination)
```css
.pagination { display: flex; gap: 4px; justify-content: center; }

.page-btn {
    width: 36px; height: 36px;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    background: var(--color-bg-card);
    cursor: pointer;
    font-weight: 500;
    transition: var(--transition-fast);
}

.page-btn:hover { border-color: var(--color-primary); color: var(--color-primary); }
.page-btn.active { background: var(--color-primary); color: #fff; border-color: var(--color-primary); }
.page-btn:disabled { opacity: 0.4; cursor: not-allowed; }
```
> ⚠️ **Dễ quên nhất:** Luôn style đủ 3 trạng thái: `:hover`, `.active`, `:disabled`. Thiếu 2 cái sau người dùng không biết đang ở trang nào và không biết nút nào bị vô hiệu hóa.

---

## C.2 Thẻ Hiển Thị Nội Dung

### 🔷 Card / Box (Thẻ sản phẩm, bài viết, thông tin)
```css
.card {
    background: var(--color-bg-card);
    border-radius: var(--radius-lg);
    padding: 24px;
    box-shadow: var(--shadow-md);
    overflow: hidden;             /* CẮT PHẦN THỪA CỦA ẢNH BO GÓC BÊN TRONG */
    transition: var(--transition-normal);
}

.card:hover {
    transform: translateY(-6px);
    box-shadow: var(--shadow-lg);
}
```
> ⚠️ **Dễ quên nhất:** `overflow: hidden` — thiếu dòng này, ảnh hoặc nội dung bên trong có góc vuông sẽ chòi ra ngoài góc bo tròn của card trông rất xấu.

---

### 🔷 Ảnh Trong Card (Rất hay bị vỡ tỉ lệ)
```css
.card-img-wrapper {
    width: 100%;
    aspect-ratio: 16 / 9;  /* Giữ tỉ lệ cố định dù ảnh có size khác nhau */
    overflow: hidden;
}

.card-img-wrapper img {
    width: 100%;
    height: 100%;
    object-fit: cover;      /* CẮT XÉN THÔNG MINH, KHÔNG BỊ MÉO */
    transition: transform 0.4s ease;
}

.card:hover .card-img-wrapper img {
    transform: scale(1.08); /* Zoom ảnh khi hover vào card */
}
```
> ⚠️ **Dễ quên nhất:** `object-fit: cover` — đây là thuộc tính quan trọng nhất khi làm gallery hay card. Thiếu dòng này, ảnh tỉ lệ khác nhau sẽ bị bóp méo trông rất amateur.

---

### 🔷 Badge / Tag (Nhãn trạng thái)
```css
.badge {
    display: inline-block;
    padding: 4px 10px;
    border-radius: var(--radius-pill); /* Bo tròn viên thuốc */
    font-size: var(--fs-xs);
    font-weight: 600;
    letter-spacing: 0.5px;
}

/* Modifier màu sắc */
.badge-success { background: #dcfce7; color: var(--color-success); }
.badge-warning { background: #fef3c7; color: var(--color-warning); }
.badge-danger  { background: #fee2e2; color: var(--color-danger); }
.badge-primary { background: #dbeafe; color: var(--color-primary); }
```
> ⚠️ **Dễ quên nhất:** `border-radius: 999px` cho kiểu viên thuốc, không phải `8px` (chỉ bo góc thường).

---

### 🔷 Avatar (Ảnh đại diện tròn)
```css
.avatar {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    object-fit: cover;
    flex-shrink: 0;  /* KHÔNG BỊ BÓP MÉO KHI NẰM TRONG FLEXBOX CÓ TEXT DÀI BÊN CẠNH */
    border: 2px solid var(--color-border);
}
```
> ⚠️ **Dễ quên nhất:** `flex-shrink: 0` — thiếu dòng này, avatar bị bóp thành hình bầu dục khi nằm cạnh text dài trong flexbox.

---

### 🔷 Alert / Thông Báo
```css
.alert {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 14px 16px;
    border-radius: var(--radius-md);
    border-left: 4px solid;  /* Thanh màu trái — điểm nhấn quan trọng */
}

.alert-success { background: #f0fdf4; border-color: var(--color-success); color: #14532d; }
.alert-warning { background: #fffbeb; border-color: var(--color-warning); color: #78350f; }
.alert-danger  { background: #fef2f2; border-color: var(--color-danger);  color: #7f1d1d; }
```
> ⚠️ **Dễ quên nhất:** `border-left: 4px solid` — thiếu cái này, alert chỉ là 1 ô màu nhạt không có điểm nhấn, khó phân biệt loại.

---

## C.3 Form & Tương Tác Nhập Liệu

### 🔷 Nhóm Form (Form Group — cấu trúc chuẩn cho mỗi trường)
```css
/* Mỗi cặp label + input gói trong 1 .form-group */
.form-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 20px;
}

.form-group label {
    font-size: var(--fs-sm);
    font-weight: 600;
    color: var(--color-text-dark);
}

.form-group .help-text  { font-size: var(--fs-xs); color: var(--color-text-muted); }
.form-group .error-text { font-size: var(--fs-xs); color: var(--color-danger); }
```

---

### 🔷 Ô Nhập Liệu (Input, Textarea, Select)
```css
.form-input,
.form-textarea,
.form-select {
    width: 100%;
    padding: 10px 14px;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    font-size: var(--fs-base);
    font-family: inherit;           /* Đồng bộ font — dễ quên! */
    color: var(--color-text-body);
    background: var(--color-bg-card);
    transition: var(--transition-fast);
}

.form-input:focus,
.form-textarea:focus,
.form-select:focus {
    outline: none;                   /* Xóa viền đen xấu mặc định của trình duyệt */
    border-color: var(--color-primary);
    box-shadow: var(--shadow-glow);  /* Focus Glow Ring — dấu hiệu UI chuyên nghiệp */
}

.form-input::placeholder,
.form-textarea::placeholder {
    color: var(--color-text-muted);
    font-style: italic;
}

.form-textarea {
    resize: vertical;        /* Chỉ cho kéo dọc, không phá layout ngang */
    min-height: 100px;
}

/* Trạng thái lỗi validation */
.form-input.is-error { border-color: var(--color-danger); }
.form-input.is-error:focus { box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.2); }
```
> ⚠️ **Dễ quên nhất:**
> * `font-family: inherit` — mặc định input/select dùng font hệ thống khác, bị lệch tông.
> * `outline: none` kết hợp với `box-shadow` focus glow — đây là bộ đôi tạo nên sự khác biệt giữa UI chuyên nghiệp và UI mặc định xấu xí.
> * `resize: vertical` — không có thì người dùng kéo ngang phá vỡ layout.

---

### 🔷 Checkbox & Radio
```css
.control-group { display: flex; align-items: center; gap: 8px; cursor: pointer; }

.control-group input[type="checkbox"],
.control-group input[type="radio"] {
    width: 16px;
    height: 16px;
    accent-color: var(--color-primary); /* Đổi màu dấu tích với 1 dòng — ít người biết! */
    cursor: pointer;
}
```
> ⚠️ **Dễ quên nhất:** `accent-color` — thuộc tính CSS3 mới, đổi màu checkbox/radio mà không cần custom phức tạp. Thiếu thì checkbox vẫn xanh mặc định của trình duyệt, không đồng bộ brand color.

---

### 🔷 Nút Bấm (Button)
```css
.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 10px 20px;
    border: none;
    border-radius: var(--radius-sm);
    font-size: var(--fs-sm);
    font-weight: 600;
    cursor: pointer;
    transition: var(--transition-fast);
    white-space: nowrap;  /* Không rớt chữ trong nút */
}

/* Biến thể màu */
.btn-primary { background: var(--color-primary); color: #fff; }
.btn-outline  { background: transparent; color: var(--color-primary); border: 1.5px solid var(--color-primary); }
.btn-ghost    { background: transparent; color: var(--color-text-body); }

/* Trạng thái */
.btn-primary:hover { background: var(--color-primary-dark); transform: translateY(-2px); box-shadow: 0 6px 14px rgba(37, 99, 235, 0.3); }
.btn-primary:active { transform: scale(0.98); box-shadow: none; }
.btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none !important; }

/* Kích thước */
.btn-sm { padding: 6px 14px; font-size: var(--fs-xs); }
.btn-lg { padding: 14px 28px; font-size: var(--fs-lg); }
```
> ⚠️ **Dễ quên nhất:**
> * `:active` (lún xuống khi click) tạo phản hồi xúc giác — thiếu thì nút trông "chết", không có cảm giác thật.
> * `:disabled` với `cursor: not-allowed` — thiếu thì nút bị mờ nhưng chuột vẫn hiện hình mũi tên thay vì dấu cấm.
> * `white-space: nowrap` — thiếu thì text trong nút bị xuống hàng trông rất xấu.

---

## C.4 Thành Phần Tương Tác Nâng Cao

### 🔷 Modal / Dialog
```css
.modal-overlay {
    position: fixed;
    inset: 0;                           /* top:0 right:0 bottom:0 left:0 viết gọn */
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2000;
}

.modal-box {
    background: var(--color-bg-card);
    border-radius: var(--radius-lg);
    padding: 32px;
    width: 90%;
    max-width: 520px;
    max-height: 90vh;        /* QUAN TRỌNG TRÊN MOBILE */
    overflow-y: auto;        /* Có thể cuộn nội dung trong modal dài */
    box-shadow: var(--shadow-lg);
}
```
> ⚠️ **Dễ quên nhất:** `max-height: 90vh; overflow-y: auto` — thiếu 2 dòng này, modal có nội dung dài sẽ tràn khỏi màn hình trên mobile.

---

### 🔷 Tabs
```css
.tab-list {
    display: flex;
    gap: 4px;
    border-bottom: 2px solid var(--color-border);
    margin-bottom: 24px;
}

.tab-btn {
    padding: 10px 20px;
    border: none;
    background: none;
    color: var(--color-text-muted);
    font-weight: 500;
    cursor: pointer;
    border-bottom: 2px solid transparent;
    margin-bottom: -2px;              /* Đè lên đường viền dưới của cả hàng */
    transition: var(--transition-fast);
}

.tab-btn.active {
    color: var(--color-primary);
    border-bottom-color: var(--color-primary);
    font-weight: 600;
}
```
> ⚠️ **Dễ quên nhất:** `margin-bottom: -2px` — thiếu dòng này, đường viền active bị nổi lên 2px không khớp với đường kẻ ngang dưới hàng tab.

---

### 🔷 Tooltip
```css
.tooltip {
    position: relative;
    cursor: help;
}

.tooltip::after {
    content: attr(data-tip);           /* Lấy nội dung từ attribute HTML: data-tip="..." */
    position: absolute;
    bottom: 125%;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    background: #0f172a;
    color: #fff;
    padding: 6px 10px;
    border-radius: var(--radius-sm);
    font-size: var(--fs-xs);
    /* Ẩn mặc định */
    opacity: 0;
    pointer-events: none;              /* Không chặn click vào phần tử bên dưới */
    transition: opacity 0.2s;
}

.tooltip:hover::after { opacity: 1; }
```
> ⚠️ **Dễ quên nhất:** `pointer-events: none` — thiếu thì tooltip vô hình nhưng vẫn chặn click, người dùng không bấm được vào link/button bên dưới.

---

### 🔷 Accordion (Thu gọn / Mở rộng)
```css
.accordion-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    cursor: pointer;
}

.accordion-content {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.35s ease;
}

.accordion-item.open .accordion-content { max-height: 600px; }
.accordion-item.open .accordion-icon    { transform: rotate(180deg); }
```
> ⚠️ **Dễ quên nhất:** Dùng `max-height` để animate, không phải `height: auto` — CSS không thể animate `height: auto`, chỉ animate được giá trị số cụ thể.

---

### 🔷 Progress Bar (Thanh tiến trình)
```css
.progress-track {
    width: 100%;
    height: 8px;
    background: var(--color-border);
    border-radius: var(--radius-pill);
    overflow: hidden;                  /* Cắt góc tròn phần fill */
}

.progress-fill {
    height: 100%;
    background: var(--color-primary);
    border-radius: var(--radius-pill);
    transition: width 0.5s ease;
}
```
> ⚠️ **Dễ quên nhất:** `overflow: hidden` trên track — thiếu thì phần fill bo góc sẽ tràn ra ngoài track ở đoạn đầu trông rất xấu.

---

## C.5 Bố Cục Tổng Thể Trang

### 🔷 Hero Section
```css
.hero {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 80px var(--container-pad);
    gap: 20px;                           /* Dùng gap thay vì margin từng phần tử */
    background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
    color: #fff;
    clip-path: polygon(0 0, 100% 0, 100% 88%, 0 100%); /* Cắt vát chéo đáy */
}
```

---

### 🔷 Bố Cục Sidebar + Nội Dung
```css
.layout-with-sidebar {
    display: flex;
    gap: 32px;
    align-items: flex-start;
}

.sidebar {
    flex: 0 0 260px;    /* Cố định 260px, không co giãn */
    position: sticky;
    top: 80px;          /* Cách đầu trang 80px (bằng chiều cao navbar) */
}

.main-content {
    flex: 1;
    min-width: 0;       /* QUAN TRỌNG — thiếu thì content dài đẩy tràn layout */
}
```
> ⚠️ **Dễ quên nhất:** `min-width: 0` trên `.main-content` — đây là bug flex phổ biến nhất. Thiếu dòng này, bảng hoặc text dài bên trong sẽ đẩy sidebar bị bóp hoặc tràn layout.

---

### 🔷 Footer
```css
.site-footer {
    background: #0f172a;
    color: #94a3b8;
    padding: 48px var(--container-pad) 24px;
    margin-top: auto;   /* Đẩy footer xuống đáy khi trang có ít nội dung */
}

.footer-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 32px;
    margin-bottom: 32px;
}

.footer-bottom {
    border-top: 1px solid #1e293b;
    padding-top: 20px;
    text-align: center;
    font-size: var(--fs-xs);
    color: #475569;
}
```

---

## C.6 Bảng Dữ Liệu & Danh Sách

### 🔷 Table
```css
.data-table {
    width: 100%;
    border-collapse: collapse;    /* Gộp viền ô lại, không bị viền đôi */
    border-radius: var(--radius-md);
    overflow: hidden;             /* BẮT BUỘC để border-radius có tác dụng */
}

.data-table th {
    background: #0f172a;
    color: #ffffff;
    padding: 12px 16px;
    text-align: left;
    font-size: var(--fs-sm);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.data-table td {
    padding: 12px 16px;
    border-bottom: 1px solid var(--color-border);
    font-size: var(--fs-sm);
}

.data-table tbody tr:nth-child(even) { background: var(--color-bg-page); }
.data-table tbody tr:hover { background: #f1f5f9; cursor: pointer; }
.data-table tfoot td { font-weight: 700; background: #f8fafc; border-top: 2px solid var(--color-border); }
```

---

### 🔷 Grid List (Lưới sản phẩm / bài viết tự động responsive)
```css
.grid-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 24px;
}
/* Dùng auto-fill + minmax() thay vì repeat(4, 1fr):
   Tự động tính số cột theo chiều rộng, responsive mà không cần viết @media riêng */
```

---

# PHẦN D — CHECKLIST "ĐỪNG QUÊN" TRƯỚC KHI COI LÀ XONG

> Rà soát từng mục trước khi demo hoặc nộp bài. Bỏ sót bất kỳ mục nào = UI bị amateur.

## D.1 HTML
- [ ] Đã dùng đúng thẻ ngữ nghĩa theo bảng A.1 (`main`, `section`, `article`, `nav`...).
- [ ] Class đặt theo **vai trò/chức năng**, không theo vẻ ngoài, không có số thứ tự (`div1`, `box2`).
- [ ] Mọi `<img>` đều có thuộc tính `alt` mô tả nội dung.
- [ ] Mọi `<input>` đều có `id` và `<label for="">` tương ứng.
- [ ] Đã nhúng đúng file CSS trong `<head>`.

## D.2 CSS — Kỹ Thuật
- [ ] File CSS viết đúng 7 tầng theo thứ tự: `:root` → Reset → Body → Container → Typography → Components → Utilities → Media Queries.
- [ ] Toàn bộ màu sắc, border-radius, shadow lấy từ biến `:root` — **không có mã `#hex` rải rác**.
- [ ] Mọi Card/Table có `border-radius` đi kèm `overflow: hidden`.
- [ ] Mọi ảnh trong khối kích thước cố định có `object-fit: cover`.
- [ ] Mọi Dropdown/Tooltip/Modal: phần tử cha có `position: relative`.
- [ ] `min-width: 0` trên flex-item chứa nội dung dài hoặc bảng.

## D.3 CSS — Trạng Thái Phần Tử (Hay bị bỏ sót nhất)
- [ ] Mọi phần tử bấm được có **`:hover`** và **`cursor: pointer`**.
- [ ] Mọi `input`/`textarea`/`select` có **`:focus`** với `outline: none` + `box-shadow` glow.
- [ ] Mọi `button` có trạng thái **`:active`** (lún xuống khi click).
- [ ] Mọi `button`/`input` disable được có **`:disabled`** với `opacity: 0.5; cursor: not-allowed`.

## D.4 Responsive
- [ ] Đã kiểm tra tại **3 kích thước**: Desktop ≥1200px, Tablet ≤768px, Mobile ≤375px.
- [ ] Không có nội dung nào bị **tràn ngang** (`overflow-x: auto` cho bảng trên mobile nếu cần).
- [ ] Các Grid nhiều cột chuyển về **1 cột** trên mobile.
- [ ] Font size tiêu đề **thu nhỏ lại** trên mobile (40px → 28px).
- [ ] Navbar chuyển về **menu hamburger** hoặc xếp dọc trên mobile (nếu có).

## D.5 Chi Tiết Nhỏ Tách Biệt Pro vs Amateur
- [ ] Khoảng cách giữa các phần tử cùng cấp dùng **số nhất quán**: 8 → 16 → 24 → 32 → 48px (bội số của 8).
- [ ] `line-height: 1.2` cho tiêu đề, `line-height: 1.6` cho đoạn văn — **không dùng chung 1 giá trị**.
- [ ] `transition` trên tất cả phần tử có `:hover` để chuyển động mượt mà.
- [ ] `font-family: inherit` trên tất cả `input`, `button`, `textarea`, `select`.
- [ ] Ảnh dùng `loading="lazy"` để tối ưu tốc độ tải trang.

---

**Tóm tắt toàn bộ:** A → Biết chọn thẻ đúng. B → Biết viết CSS đúng thứ tự. C → Biết style đúng thuộc tính. D → Biết không quên chi tiết nhỏ. Dùng cả 4 phần cùng lúc mỗi khi làm 1 UI mới.