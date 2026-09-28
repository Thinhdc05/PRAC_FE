# 🎬 BÀI TẬP VỀ NHÀ: TỰ TAY THI CÔNG HERO BANNER (ĐIỆN ẢNH)

> **Mục tiêu:** Biến khu vực `<section class="banner" id="hero-banner">` thành một Banner nổi bật hoành tráng ở đầu trang chủ, tự động lấy dữ liệu từ bộ phim đầu tiên (`items[0]`) trong danh sách API trả về.

---

## 🏛️ 1. PHÂN TÍCH KIẾN TRÚC & GIAO DIỆN (UI ANATOMY)

Một Banner chuẩn Netflix / Cinema gồm 3 tầng lớp xếp chồng nhau:
1. **Tầng đáy (Background):** Ảnh đại diện khổ ngang (`thumb_url`) của phim, trải rộng 100% chiều ngang, chiều cao tầm `480px - 540px`.
2. **Tầng giữa (Double Gradient Overlay):** 
   - Gradient 1 (Từ trái sang phải): Đen đậm bên trái che bớt ảnh để chữ đọc rõ, trong suốt dần về bên phải để thấy nhân vật.
   - Gradient 2 (Từ dưới lên trên): Đen hòa lẫn vào nền `--bg-main` (`#0b0f19`) của trang web, giúp giao diện liền mạch không có vết cắt thô.
3. **Tầng trên cùng (Content):** Chứa tiêu đề phim to (`36px - 44px`), các badge thông tin (năm, chất lượng, đánh giá ⭐), đoạn tóm tắt nội dung (giới hạn 3 dòng) và 2 nút hành động (Xem ngay, Chi tiết).

---

## 📐 2. BƯỚC 1: DỰNG KHUNG HTML CHO HÀM JS RENDER

Khi viết hàm render bằng JS, khung HTML template sẽ được bơm vào `#hero-banner`. Cấu trúc chuẩn:

```html
<div class="hero-backdrop" style="background-image: url('URL_ANH_THUMB')">
    <div class="hero-overlay"></div>
    <div class="container hero-container">
        <div class="hero-content">
            <span class="hero-tag">🔥 PHIM MỚI NỔI BẬT</span>
            <h1 class="hero-title">Tên Phim Ở Đây</h1>
            <div class="hero-meta">
                <span class="badge badge-quality">HD</span>
                <span class="badge badge-episode">Tập 1</span>
                <span class="hero-year">2026</span>
                <span class="hero-rate">⭐ 8.5</span>
            </div>
            <p class="hero-desc">
                Đoạn tóm tắt nội dung phim ngắn gọn...
            </p>
            <div class="hero-actions">
                <a href="watch.html?slug=..." class="btn btn-primary">▶ Xem Ngay</a>
                <a href="detail.html?slug=..." class="btn btn-outline">ℹ Chi Tiết</a>
            </div>
        </div>
    </div>
</div>
```

---

## 🎨 3. BƯỚC 2: VIẾT CSS TRONG `css/index.css`

Dưới đây là các gợi ý thuộc tính CSS bạn cần hoàn thiện:

### A. Khối bao bọc `.banner` & `.hero-backdrop`:
- `position: relative`: Làm gốc toạ độ cho các lớp phủ bên trong.
- `min-height: 500px` (hoặc `height: 520px`): Đảm bảo banner đủ bề thế.
- `background-size: cover; background-position: center top;`: Ảnh luôn phủ kín khung hình không bị méo.

### B. Lớp phủ điện ảnh `.hero-overlay`:
- `position: absolute; inset: 0;` (hoặc `top: 0; left: 0; right: 0; bottom: 0;`).
- **Kỹ thuật Double Gradient cực đỉnh:**
  ```css
  background: 
      linear-gradient(to right, rgba(11, 15, 25, 0.95) 20%, rgba(11, 15, 25, 0.7) 50%, transparent 100%),
      linear-gradient(to top, var(--bg-main) 0%, transparent 50%);
  ```
  *(Hai lớp gradient xếp đè lên nhau, ngăn cách bằng dấu phẩy!)*

### C. Khối nội dung `.hero-content`:
- `position: relative; z-index: 2;`: Nổi lên trên lớp overlay.
- `max-width: 650px`: Không cho chữ trải dài hết màn hình, giữ khung mắt đọc thoải mái.
- `padding-top: 100px` (hoặc dùng Flexbox căn giữa theo trục dọc).

### D. Giới hạn 3 dòng cho `.hero-desc` (CSS Line Clamp):
```css
display: -webkit-box;
-webkit-line-clamp: 3;
-webkit-box-orient: vertical;
overflow: hidden;
line-height: 1.6;
color: var(--text-muted);
```

### E. Bộ nút `.hero-actions`:
- `display: flex; gap: 16px; margin-top: 24px;`
- `.btn-primary`: `background-color: var(--primary-red); color: #fff;`
- `.btn-outline`: `border: 1px solid rgba(255, 255, 255, 0.3); backdrop-filter: blur(8px);`

---

## ⚙️ 4. BƯỚC 3: GHÉP CODE JS VÀO `js/index.js`

1. **Lấy phần tử DOM:**
   ```javascript
   const heroBanner = document.querySelector("#hero-banner");
   ```
2. **Viết hàm `renderHeroBanner(movie)`:**
   - Kiểm tra phòng thủ `if (!heroBanner || !movie) return;`
   - Lấy ảnh backdrop: Ưu tiên `movie.thumb_url`, nếu không có thì lấy `movie.poster_url`.
   - Bắt buộc gọi qua helper: `const backdropUrl = getFullImageUrl(movie.thumb_url || movie.poster_url);`
   - Bơm HTML template vào `heroBanner.innerHTML`.
3. **Kích hoạt trong `initHome()`:**
   - Sau khi gọi API lấy được mảng `res.data.items`:
   - Phim nổi bật: `const featuredMovie = res.data.items[0];`
   - Danh sách phim lưới phía dưới: Có thể truyền toàn bộ hoặc dùng `.slice(1)` nếu không muốn lặp lại phim đầu tiên!
   - Gọi `renderHeroBanner(featuredMovie);`

---

## 🧪 5. CHECKLIST NGHIỆM THU TẠI NHÀ
- [ ] Ảnh banner hiển thị sắc nét, không bị méo (`object-fit: cover` hoặc `background-size: cover`).
- [ ] Chữ trắng nổi bật trên nền tối, không bị chìm vào chi tiết ảnh nhờ lớp double gradient.
- [ ] Đoạn tóm tắt phim quá dài tự động xuất hiện dấu `...` ở cuối dòng thứ 3.
- [ ] Nút "Xem Ngay" và "Chi Tiết" có hiệu ứng hover mượt mà (`transform: translateY(-2px)`).
