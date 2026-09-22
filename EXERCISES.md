# 🎯 BỘ ĐỀ THỰC HÀNH HTML TOÀN DIỆN (W3SCHOOLS & PHỎNG VẤN THỰC TẬP)

> Bộ 6 bài tập lớn bao phủ **100% các thẻ, thuộc tính HTML và CSS cơ bản**.  
> Mỗi bài tập đều có đầy đủ **Mô tả chi tiết bằng lời** + **Khung Preview Mockup giao diện** (có nút bấm mở/đóng tiện lợi).

---

## 📋 DANH SÁCH TIẾN ĐỘ THỰC HÀNH

- [x] **Bài 1:** Trang Hồ Sơ Cá Nhân & CV Ứng Tuyển (`ex1.html`)
- [x] **Bài 2:** Trang Bài Báo Tin Tức Công Nghệ (`ex2.html`)
- [x] **Bài 3:** Bảng Thống Kê Điểm Số & Bảng Giá Dịch Vụ (`ex3.html`)
- [x] **Bài 4:** Danh Sách Đa Cấp & Menu Điều Hướng Đa Phương Tiện (`ex4.html`)
- [x] **Bài 5:** Form Đăng Ký Ứng Tuyển Toàn Diện (Full Controls & Validation) (`ex5.html`)
- [x] **Bài 6:** Trung Tâm Trợ Giúp, Media & Thẻ Hiện Đại (`ex6.html`)
- [ ] **Bài 7 (BOSS CHALLENGE):** Thử Thách Bẫy Phỏng Vấn & Tối Ưu Ngữ Nghĩa Toàn Diện (`ex7.html`)

---

## 📝 CHI TIẾT 6 BÀI TẬP THỰC HÀNH

### 📌 BÀI 1: Trang Hồ Sơ Cá Nhân & CV Ứng Tuyển
* **Tên file:** `bai1_profile.html` (hoặc `ex1.html`)

<details open>
<summary><b>📖 1. Mô tả chi tiết yêu cầu bằng lời</b> <i>(Bấm để mở/đóng)</i></summary>

1. **Phần `<head>`:**
   - Khai báo chuẩn `<!DOCTYPE html>`, `lang="vi"`.
   - Có `meta charset="UTF-8"`, `meta name="viewport" content="width=device-width, initial-scale=1.0"`.
   - Thẻ `<title>`: `Hồ Sơ Ứng Tuyển - [Họ Và Tên Của Bạn]`.
   - Thẻ `<meta name="description" content="...">` và `<meta name="author" content="...">`.
   - Nhúng file `style.css` bằng thẻ `<link rel="stylesheet" href="style.css">`.
2. **Đầu trang (`<header>`):**
   - Thẻ `<h1>` đặt `id="top"` chứa Họ và Tên của bạn.
   - Thẻ `<p>` chứa vị trí ứng tuyển: `<abbr title="Front-End Developer">FE DEV</abbr>` đi kèm 1 nhãn `<span class="badge-success">Sẵn sàng thực tập</span>`.
   - Ảnh đại diện `<img>`: Có link ảnh, `alt`, `width="150"`, `height="150"`, `loading="lazy"` và style bo tròn `border-radius: 50%`.
3. **Thanh điều hướng nhanh (Bookmarks):**
   - Tạo 3 liên kết thẻ `<a>` trỏ tới `#gioi-thieu`, `#ky-nang`, `#lien-he`.
4. **Nội dung chính:**
   - **Khối Giới thiệu (`id="gioi-thieu"`):** Dùng thẻ `<pre>` kết hợp `<code>` để hiển thị một đoạn code JavaScript ngắn mô tả bản thân (giữ nguyên thụt lề).
   - **Khối Kỹ năng (`id="ky-nang"`):** Dùng thẻ `<p>` chứa `<kbd>Ctrl</kbd> + <kbd>P</kbd>` để hướng dẫn người xem in CV ra file PDF.
5. **Chân trang (`<footer>`):**
   - Đặt `id="lien-he"`.
   - Dùng thẻ `<address>` chứa thông tin liên hệ gồm link gửi email (`mailto:`) và gọi điện (`tel:`).
   - Thêm đường link quay lại đầu trang `<a href="#top">⬆️ Về đầu trang</a>`.
</details>

<details open>
<summary><b>🖼️ 2. Khung Preview Giao Diện Mẫu (Mockup)</b> <i>(Bấm để mở/đóng)</i></summary>

```text
+-------------------------------------------------------------+
| [HEADER]                                                    |
|  #top Đinh Công Thịnh                                       |
|  FE DEV  [Sẵn sàng thực tập] (Badge xanh)                   |
|  [ Ảnh đại diện hình tròn (width=150) ]                     |
|                                                             |
|  [NAV]: [Giới thiệu] | [Kỹ năng] | [Liên hệ]                |
+-------------------------------------------------------------+
| [MAIN]                                                      |
|  #gioi-thieu                                                |
|  +--<pre><code>------------------------------------------+  |
|  | const developer = {                                   |  |
|  |     name: "Đinh Công Thịnh",                          |  |
|  |     status: "Sẵn sàng thực tập"                       |  |
|  | };                                                    |  |
|  +-------------------------------------------------------+  |
|                                                             |
|  #ky-nang                                                   |
|  Hướng dẫn: Nhấn [Ctrl] + [P] để in CV ra PDF.              |
+-------------------------------------------------------------+
| [FOOTER] #lien-he                                           |
|  Liên hệ:                                                   |
|  Email: thinhdc05@gmail.com (mailto)                        |
|  SĐT: 0123.456.789 (tel)                                    |
|  [⬆️ Về đầu trang (#top)]                                   |
+-------------------------------------------------------------+
```
</details>

---

### 📌 BÀI 2: Trang Bài Báo Tin Tức Công Nghệ
* **Tên file:** `bai2_news.html`

<details open>
<summary><b>📖 1. Mô tả chi tiết yêu cầu bằng lời</b> <i>(Bấm để mở/đóng)</i></summary>

1. **Khung sườn Semantic:**
   - Sử dụng đầy đủ các thẻ: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`.
2. **Đầu trang & Menu:**
   - `<header>`: Tiêu đề trang báo `<h1>` (ví dụ: `🌐 Tạp Chí Công Nghệ 24/7`).
   - `<nav>`: Danh sách liên kết điều hướng gồm 4 link: *Trang chủ*, *Tin tức*, *Khóa học*, *Liên hệ*.
3. **Bài báo chính (`<article>`):**
   - Tiêu đề bài báo `<h2>`.
   - Thẻ thời gian `<time datetime="2026-09-07">Ngày 07 tháng 09 năm 2026</time>` đi kèm tên tác giả.
   - Đoạn văn có dùng thẻ `<mark>` để tô sáng các từ khóa quan trọng.
   - Thể hiện mức giá ưu đãi khóa học: Giá gốc `<del>1.000.000đ</del>` nay chỉ còn `<ins>Miễn Phí</ins>`.
   - Biểu thức toán học & hóa học: Độ phức tạp $O(N^2)$ dùng `<sup>` và axit sunfuric $H_2SO_4$ dùng `<sub>`.
   - Khối trích dẫn danh ngôn: Dùng `<blockquote>` có thuộc tính `cite="https://..."` và thẻ `<cite>` chứa tên cuốn sách/bài báo nguồn.
   - Hình minh họa: Dùng cụm thẻ `<figure>` chứa `<img>` và `<figcaption>` giải thích dưới ảnh.
4. **Thanh bên lề (`<aside>`):**
   - Chứa danh sách các bài viết liên quan.
   - Dùng thẻ `<bdo dir="rtl">` đảo ngược một câu đố chữ ngắn để thử thách người đọc.
5. **Chân trang (`<footer>`):**
   - Chứa bản quyền `© 2026` và chính sách bảo mật.
</details>

<details open>
<summary><b>🖼️ 2. Khung Preview Giao Diện Mẫu (Mockup)</b> <i>(Bấm để mở/đóng)</i></summary>

```text
+-------------------------------------------------------------+
| [HEADER] 🌐 Tạp Chí Công Nghệ 24/7                          |
| [NAV]    Trang chủ  |  Tin tức  |  Khóa học  |  Liên hệ     |
+-------------------------------------------------------------+
| [MAIN]                                                      |
|                                                             |
| [ARTICLE]                                                   |
|  <h2> Lộ Trình Học Front-End 2026 Cho Người Mới             |
|  Ngày đăng: [07/09/2026] (time) | Tác giả: Nguyễn Văn A     |
|                                                             |
|  Đoạn văn có từ khóa được [tô vàng] (mark).                 |
|  Khóa học cũ: [1.000.000đ] (del) -> Ưu đãi: [Free] (ins)    |
|  Độ phức tạp: O(N^2) (sup) | Dung dịch hóa học: H2SO4 (sub) |
|                                                             |
|  <blockquote>                                               |
|     "Học lập trình là một hành trình marathon bền bỉ..."    |
|     — Trích từ tác phẩm <cite>Đắc Nhân Tâm Cho Coder</cite> |
|  </blockquote>                                              |
|                                                             |
|  +--<figure>---------------------------------------------+  |
|  |  [ Hình ảnh sơ đồ lộ trình FE ]                       |  |
|  |  <figcaption>Hình 1: Bản đồ tư duy Front-End</figcaption>|
|  +-------------------------------------------------------+  |
|                                                             |
| [ASIDE] (Thanh bên lề)                                      |
|  💡 Bài viết liên quan:                                     |
|  - 10 Thẻ HTML5 Semantic cần nhớ                            |
|  - Đố vui: <bdo dir="rtl">Chữ này bị lật ngược</bdo>        |
+-------------------------------------------------------------+
| [FOOTER] © 2026 Tạp Chí Công Nghệ. All rights reserved.     |
+-------------------------------------------------------------+
```
</details>

---

### 📌 BÀI 3: Bảng Thống Kê Điểm Số & Bảng Giá Dịch Vụ
* **Tên file:** `bai3_table.html`

<details open>
<summary><b>📖 1. Mô tả chi tiết yêu cầu bằng lời</b> <i>(Bấm để mở/đóng)</i></summary>

1. **Cấu trúc Bảng dữ liệu chuẩn Semantic:**
   - Thẻ `<caption>` chú thích tiêu đề bảng: "BẢNG ĐIỂM ĐÁNH GIÁ THỰC TẬP SINH".
   - Phân chia rõ ràng 3 phân vùng: `<thead>`, `<tbody>`, `<tfoot>`.
2. **Kỹ thuật Gộp ô (Spanning):**
   - Hàng tiêu đề `<th>`: Đặt 5 cột gồm: *STT*, *Họ và Tên*, *Môn Học*, *Điểm Số*, *Xếp Loại*.
   - Dữ liệu `<tbody>`: Sử dụng `rowspan="2"` để gộp 2 hàng dọc liên tiếp cho cùng 1 học viên học 2 môn khác nhau (ô Tên học viên và ô Xếp loại gộp dọc).
   - Dòng chân bảng `<tfoot>`: Dùng `colspan="3"` để gộp 3 ô ngang cho dòng chữ "Điểm Trung Bình Toàn Khóa".
3. **CSS định dạng bảng:**
   - Thiết lập `width: 100%`, `border-collapse: collapse;`.
   - Kẻ viền `1px solid #ddd`, đệm lề `padding: 10px`.
   - Hàng tiêu đề `<th>` có màu nền xanh dương (`#007bff`) và chữ trắng.
   - Hàng chẵn trong `<tbody>` có màu nền xám nhẹ `#f9f9f9` (Zebra striping).
</details>

<details open>
<summary><b>🖼️ 2. Khung Preview Giao Diện Mẫu (Mockup)</b> <i>(Bấm để mở/đóng)</i></summary>

```text
+------------------------------------------------------------------------+
| <caption> BẢNG ĐIỂM ĐÁNH GIÁ THỰC TẬP SINH FRONT-END                   |
+------------------------------------------------------------------------+
| [THEAD] (Nền xanh, Chữ trắng)                                          |
| STT | Họ và Tên     | Môn Học         | Điểm Số | Xếp Loại            |
+-----+---------------+-----------------+---------+----------------------+
| [TBODY]                                                                |
|  1  | Nguyễn Văn A  | HTML & CSS      |   9.0   | Xuất Sắc             |
|     | (Gộp 2 dòng   +-----------------+---------+ (Gộp 2 dòng          |
|     |  rowspan="2") | JavaScript ES6+ |   9.5   |  rowspan="2")        |
|-----+---------------+-----------------+---------+----------------------|
|  2  | Trần Thị B    | HTML & CSS      |   8.5   | Giỏi                 |
|     | (rowspan="2") +-----------------+---------+ (rowspan="2")        |
|     |               | JavaScript ES6+ |   8.0   |                      |
+-----+---------------+-----------------+---------+----------------------+
| [TFOOT] (Nền xám nhạt, Chữ đậm)                                        |
| Điểm Trung Bình Toàn Khóa (Gộp 3 cột colspan="3") | 8.75 | ĐẠT         |
+------------------------------------------------------------------------+
```
</details>

---

### 📌 BÀI 4: Danh Sách Đa Cấp & Menu Điều Hướng Đa Phương Tiện
* **Tên file:** `bai4_menu.html`

<details open>
<summary><b>📖 1. Mô tả chi tiết yêu cầu bằng lời</b> <i>(Bấm để mở/đóng)</i></summary>

1. **Danh sách không thứ tự (`<ul>`):**
   - Dựng Menu điều hướng lồng nhau 2 cấp (Nested List): Menu cha gồm *Trang Chủ*, *Khóa Học*, *Liên Hệ*.
   - Bên trong mục *Khóa Học* lồng một danh sách `<ul>` con gồm: *HTML5 Cơ Bản*, *CSS3 Box Model*, *JavaScript ES6+*.
2. **Danh sách có thứ tự (`<ol>`):**
   - Danh sách 1: Dùng `type="A"` và `start="3"` để đếm các bước từ chữ C, D, E.
   - Danh sách 2: Dùng `<ol reversed>` đếm ngược các số từ 5 về 1.
3. **Danh sách mô tả (`<dl>`, `<dt>`, `<dd>`):**
   - Định nghĩa cho 3 thuật ngữ: `API`, `DOM`, `CSSOM`.
4. **Hình ảnh nâng cao:**
   - Dùng thẻ `<picture>` chứa 2 thẻ `<source media="...">` (cho màn hình lớn/nhỏ) và 1 thẻ `<img>` dự phòng có `loading="lazy"`.
   - Bọc 1 bức ảnh bên trong thẻ `<a>` có `target="_blank"` và `rel="noopener noreferrer"` để bấm ảnh chuyển sang trang W3Schools.
</details>

<details open>
<summary><b>🖼️ 2. Khung Preview Giao Diện Mẫu (Mockup)</b> <i>(Bấm để mở/đóng)</i></summary>

```text
+-------------------------------------------------------------+
| 1. MENU ĐA CẤP (Nested List <ul>)                           |
|  * Trang Chủ                                                |
|  * Khóa Học                                                 |
|    - HTML5 Cơ Bản & Semantic                                |
|    - CSS3 Box Model & Layout                                |
|    - JavaScript ES6+                                        |
|  * Liên Hệ                                                  |
+-------------------------------------------------------------+
| 2. DANH SÁCH CÓ THỨ TỰ (<ol>)                               |
|  Các bước cài đặt (type="A", start="3"):                    |
|    C. Cài đặt VS Code                                       |
|    D. Cài đặt Node.js                                       |
|    E. Cài đặt Live Server                                   |
|                                                             |
|  Đếm ngược xuất phát (<ol reversed>):                       |
|    5. Năm -> 4. Bốn -> 3. Ba -> 2. Hai -> 1. Một           |
+-------------------------------------------------------------+
| 3. TỪ ĐIỂN THUẬT NGỮ (<dl>, <dt>, <dd>)                     |
|  API                                                        |
|     Giao diện lập trình ứng dụng kết nối dữ liệu.           |
|  DOM                                                        |
|     Mô hình đối tượng tài liệu dạng cây phân cấp.           |
+-------------------------------------------------------------+
| 4. HÌNH ẢNH NÂNG CAO                                        |
|  <picture>: Màn hình rộng tải ảnh to, màn hình hẹp tải nhỏ  |
|  Ảnh là nút bấm: Click vào Logo -> Mở sang W3Schools tab mới|
+-------------------------------------------------------------+
```
</details>

---

### 📌 BÀI 5: Form Đăng Ký Ứng Tuyển Toàn Diện (Full Controls & Validation)
* **Tên file:** `bai5_form.html`

<details open>
<summary><b>📖 1. Mô tả chi tiết yêu cầu bằng lời</b> <i>(Bấm để mở/đóng)</i></summary>

1. **Thẻ `<form>`:** Đặt `method="POST"`, `action="/submit"`, `enctype="multipart/form-data"`.
2. **Fieldset 1 (Thông tin cá nhân):**
   - Ô Họ tên: `type="text"`, có `placeholder`, `required`, `autofocus`.
   - Ô Email: `type="email"`, có `required`.
   - Ô Mật khẩu: `type="password"`, `minlength="8"`, `maxlength="20"`.
   - Ô Số điện thoại: `type="tel"`, có `pattern="[0-9]{10}"` (bắt buộc nhập đúng 10 số).
   - Ô Ngày sinh: `type="date"`.
   - Ô Giới tính: 2 nút `type="radio"` (chung `name="gender"`).
3. **Fieldset 2 (Hồ sơ & Năng lực):**
   - Kỹ năng đã học: 3 ô `type="checkbox"` (`HTML`, `CSS`, `JS`).
   - Thành phố làm việc: Dùng `<select>` chứa `<optgroup label="Miền Bắc">` và `<optgroup label="Miền Nam">`.
   - Vị trí mong muốn: Dùng `<input list="vi-tri">` kết hợp với `<datalist id="vi-tri">` gợi ý: *Intern Frontend, Intern Backend, Intern Fullstack*.
   - Mức lương mong muốn: Dùng `type="range"` có `min="5"`, `max="20"`, `step="1"`.
   - Tải lên CV: Dùng `type="file"`, có `accept=".pdf, .docx"`, `required`.
   - Giới thiệu bản thân: Dùng `<textarea rows="4">`.
4. **Nút bấm cuối Form:**
   - `<button type="submit">Nộp hồ sơ</button>` và `<button type="reset">Làm lại</button>`.
</details>

<details open>
<summary><b>🖼️ 2. Khung Preview Giao Diện Mẫu (Mockup)</b> <i>(Bấm để mở/đóng)</i></summary>

```text
+-------------------------------------------------------------+
| FORM ĐĂNG KÝ ỨNG TUYỂN THỰC TẬP FRONT-END                   |
| (method="POST", enctype="multipart/form-data")              |
|                                                             |
| +--[ THÔNG TIN CÁ NHÂN ] (fieldset/legend)---------------+  |
| | Họ và tên (*):  [ Nhập họ tên...             ] (autofocus)|
| | Email (*):      [ email@example.com          ] (required) |
| | Mật khẩu (*):   [ ••••••••                   ] (8-20 ký tự|
| | Số ĐT (*):      [ 0912345678                 ] (10 số)    |
| | Ngày sinh:      [ 2005-09-07 (Lịch date)     ]            |
| | Giới tính:      (o) Nam    ( ) Nữ   (Radio chung name)    |
| +--------------------------------------------------------+  |
|                                                             |
| +--[ HỒ SƠ & NĂNG LỰC ] (fieldset/legend)----------------+  |
| | Kỹ năng:        [x] HTML5   [x] CSS3   [ ] JavaScript     |
| | Địa điểm:       [ Chọn Thành Phố... (select/optgroup)]    |
| | Vị trí mơ ước:  [ Gõ gợi ý... (input + datalist)     ]    |
| | Lương mong muốn:[ -----O---------- ] (range 5-20 tr)      |
| | Tải lên CV (*): [ Choose File: my-cv.pdf ] (.pdf/.docx)   |
| | Giới thiệu thêm:                                          |
| | +------------------------------------------------------+  |
| | | Viết đôi lời tâm huyết của bạn... (textarea 4 dòng)  |  |
| | +------------------------------------------------------+  |
| +--------------------------------------------------------+  |
|                                                             |
| [ Gửi Hồ Sơ Ứng Tuyển (submit) ]   [ Xóa Làm Lại (reset) ]  |
+-------------------------------------------------------------+
```
</details>

---

### 📌 BÀI 6: Trung Tâm Trợ Giúp, Media & Thẻ Hiện Đại
* **Tên file:** `bai6_media.html`

<details open>
<summary><b>📖 1. Mô tả chi tiết yêu cầu bằng lời</b> <i>(Bấm để mở/đóng)</i></summary>

1. **Video & Audio:**
   - Thẻ `<video>` có `controls`, `width="400"`, `poster="..."`, chứa 2 thẻ `<source>` (mp4, webm) và 1 thẻ `<track>` phụ đề tiếng Việt.
   - Thẻ `<audio controls>` có `<source>` định dạng mp3.
2. **Khung nhúng (`<iframe>`):**
   - Nhúng 1 video YouTube hoặc bản đồ Google Maps có `width`, `height`, `title`, `loading="lazy"`.
3. **Accordion FAQ không cần JS:**
   - Dùng 3 khối `<details>` và `<summary>` tạo mục "Câu hỏi thường gặp".
4. **Hộp thoại Modal Popup (`<dialog>`):**
   - Tạo 1 thẻ `<dialog id="modal-box">` chứa thông báo và nút đóng.
   - Nút bấm bên ngoài có `onclick="document.getElementById('modal-box').showModal()"`.
5. **Đồ họa SVG & Thực thể HTML:**
   - Vẽ 1 hình tròn hoặc chữ nhật bằng thẻ `<svg>` (có `stroke` và `fill`).
   - Dùng các ký tự thực thể: `&copy;`, `&trade;`, `&lt;`, `&gt;`, `&nbsp;` để in dòng chữ: `Code: &lt;div&gt;Hello&lt;/div&gt; &copy; 2026`.
</details>

<details open>
<summary><b>🖼️ 2. Khung Preview Giao Diện Mẫu (Mockup)</b> <i>(Bấm để mở/đóng)</i></summary>

```text
+-------------------------------------------------------------+
| 1. VIDEO & AUDIO PLAYER                                     |
|  [ Video Player có thanh điều khiển, poster, phụ đề <track> ]|
|  [ Audio Player phát nhạc mp3                               ]|
+-------------------------------------------------------------+
| 2. KHUNG NHÚNG IFRAME                                       |
|  [ Khung nhúng Video YouTube hoặc Google Maps (lazy load)   ]|
+-------------------------------------------------------------+
| 3. HỎI ĐÁP ACCORDION (<details> & <summary> - Không cần JS)  |
|  ▶ Thực tập sinh cần chuẩn bị kiến thức gì? (Click mở/đóng) |
|  ▶ Thời gian thực tập kéo dài bao lâu?                      |
|  ▶ Có cơ hội lên nhân viên chính thức không?                |
+-------------------------------------------------------------+
| 4. HỘP THOẠI POPUP MODAL (<dialog>)                         |
|  [ Bấm để mở Hộp Thoại Thông Báo (showModal) ]              |
|  +--<dialog>---------------------------------------------+  |
|  | Chúc mừng bạn đã hoàn thành 100% chương trình HTML!   |  |
|  | [ Đóng Popup ]                                        |  |
|  +-------------------------------------------------------+  |
+-------------------------------------------------------------+
| 5. ĐỒ HỌA VECTOR SVG & KÝ TỰ THỰC THỂ ENTITIES              |
|  [ Hình tròn SVG viền xanh nền vàng ]                       |
|  Mã nguồn mẫu: &lt;div class="box"&gt;Hello&lt;/div&gt;      |
|  Bản quyền: &copy; 2026 Antigravity &trade; &hearts;        |
+-------------------------------------------------------------+
```
</details>

---

### 📌 BÀI 7 (BOSS CHALLENGE): Thử Thách Bẫy Phỏng Vấn & Tối Ưu Ngữ Nghĩa Toàn Diện
* **Tên file:** `ex7.html`
* **Mục tiêu:** Kiểm tra khả năng xử lý **các tình huống bẫy, thẻ dễ nhầm lẫn và chuẩn Accessibility/SEO nâng cao**.

<details open>
<summary><b>📖 1. Mô tả chi tiết các thử thách cần vượt qua</b> <i>(Bấm để mở/đóng)</i></summary>

1. **Chuẩn `<head>` Nâng Cao:**
   - Đủ `<!DOCTYPE html>`, `lang="vi"`, `<meta charset="UTF-8">`, `<meta name="viewport" ...>`.
   - Có `<title>`, `<meta name="description">`, `<link rel="canonical" href="https://example.com/ex7.html">` (tránh trùng lặp nội dung SEO).

2. **Khung Điều Hướng & Tránh Lỗi Lồng Thẻ (Invalid Nesting Trap):**
   - `<header>` có logo `<h1>` duy nhất.
   - Menu `<nav>` chứa `<ul>` và `<li>`.
   - **Bẫy nút bấm:** Có 1 nút Call-To-Action "Đăng ký ngay" ➔ **TUYỆT ĐỐI KHÔNG bọc thẻ `<button>` bên trong thẻ `<a>`** (Vi phạm chuẩn HTML). Dùng thẻ `<a class="btn" href="#dang-ky">Đăng ký ngay</a>`.

3. **Phân Biệt `<article>` vs `<section>` & `<figure>` vs `<img>`:**
   - Tạo một bài viết đánh giá khóa học bọc trong thẻ `<article>`.
   - Bên trong `<article>` có `<header>` riêng (tiêu đề `<h2>`, `<time datetime="2026-09-08">`, tác giả).
   - **Bẫy hình ảnh minh họa:** Dùng thẻ `<figure>` và `<figcaption>` để chú thích ảnh biểu đồ (thay vì dùng thẻ `<p>` thường).
   - Có 1 `<section>` con bên trong `<article>` dành riêng cho khu vực "Bình luận độc giả".

4. **Bảng Báo Cáo Phức Tạp (Colspan + Rowspan + Tfoot):**
   - Bảng tổng kết học phí các kỳ:
     - Dùng `<caption>` mô tả bảng.
     - Sử dụng kết hợp cả `rowspan` (gộp nhiều hàng cho Cột "Khóa học") và `colspan` (gộp nhiều cột cho Hàng "Tổng cộng" ở `<tfoot>`).
     - Có đủ `<thead>`, `<tbody>`, `<tfoot>`, thẻ `<th>` có thuộc tính `scope="col"` hoặc `scope="row"`.

5. **Form Thanh Toán Chống Bẫy (Form Edge Cases Trap):**
   - Thẻ `<form action="/checkout" method="POST" enctype="multipart/form-data">`.
   - **Bẫy `readonly` vs `disabled`:**
     - Ô 1: "Mã khuyến mãi áp dụng" ➔ Dùng `readonly` (để người dùng không sửa được nhưng **vẫn gửi dữ liệu lên server**).
     - Ô 2: "Trạng thái VIP cũ" ➔ Dùng `disabled` (để vô hiệu hóa và **không gửi dữ liệu lên server**).
   - **Bẫy nút bấm trong Form:**
     - Nút "Thanh toán ngay": Khai báo rõ `type="submit"`.
     - Nút "Hủy bỏ": **BẮT BUỘC khai báo `type="button"`** (để tránh bị submit nhầm khi click).
     - Nút "Nhập lại": Khai báo `type="reset"`.
   - Ô tải lên hóa đơn: `<input type="file" accept="image/*,.pdf" required>`.

6. **Đa Phương Tiện & Responsive Picture:**
   - Dùng thẻ `<picture>` với 2 thẻ `<source>`:
     - Màn hình nhỏ hơn `600px` (`max-width: 600px`): Dùng ảnh bản dọc `mobile.jpg`.
     - Màn hình lớn: Dùng ảnh bản ngang `desktop.jpg`.
     - Thẻ `<img>` dự phòng có `loading="lazy"` và `alt`.
</details>

<details open>
<summary><b>🖼️ 2. Khung Preview Giao Diện Mẫu (Mockup)</b> <i>(Bấm để mở/đóng)</i></summary>

```text
+-----------------------------------------------------------------------+
| [HEADER] <h1>TechMaster Academy</h1>                                   |
| [NAV]: [Trang chủ] | [Khóa học] | [Bảng giá]                          |
|        [ 👉 Đăng ký ngay (Dùng thẻ <a> chuẩn, không bọc <button>) ]    |
+-----------------------------------------------------------------------+
| [MAIN]                                                                |
|  +--<article> (Bài đánh giá khóa học - Độc lập)---------------------+ |
|  |  <h2>Đánh Giá Lộ Trình Front-End 2026</h2>                       |
|  |  Ngày đăng: 08/09/2026 | Tác giả: Mentor                         |
|  |                                                                  |
|  |  +--<figure>--------------------------------------------------+  |
|  |  |  [ Ảnh biểu đồ lộ trình học ]                              |  |
|  |  |  <figcaption>Hình 1: Tháp kỹ năng Front-End chuẩn</figcaption>|
|  |  +------------------------------------------------------------+  |
|  |                                                                  |
|  |  +--<section> (Bình luận độc giả)-----------------------------+  |
|  |  |  <h3>Bình luận (2)</h3>                                    |  |
|  |  |  - Bình luận 1: Khóa học rất chi tiết!                     |  |
|  |  +------------------------------------------------------------+  |
|  +------------------------------------------------------------------+ |
|                                                                       |
|  +--<section> BẢNG BÁO GIÁ & THỐNG KÊ (Colspan + Rowspan)-----------+ |
|  |  +------------------------------------------------------------+  |
|  |  | Khóa học (Rowspan) | Kỳ học | Học phí                      |  |
|  |  |--------------------+--------+------------------------------|  |
|  |  | Front-End          | Kỳ 1   | 3.000.000đ                   |  |
|  |  | (Gộp 2 hàng)       | Kỳ 2   | 3.500.000đ                   |  |
|  |  |--------------------+--------+------------------------------|  |
|  |  | TỔNG CỘNG (Colspan gộp 2 cột) | 6.500.000đ (Ở <tfoot>)     |  |
|  |  +------------------------------------------------------------+  |
|  +------------------------------------------------------------------+ |
|                                                                       |
|  +--<section> FORM THANH TOÁN (Chống Bẫy Form)----------------------+ |
|  |  Mã giảm giá: [ PROMO2026 (readonly - vẫn submit) ]              |
|  |  Gói cũ:      [ Hết hạn   (disabled - không submit) ]            |
|  |  Hóa đơn:     [ Chọn file ảnh/pdf... ]                            |
|  |                                                                  |
|  |  [ Thanh Toán (type=submit) ] [ Hủy Bỏ (type=button) ]           |
|  +------------------------------------------------------------------+ |
+-----------------------------------------------------------------------+
| [FOOTER] &copy; 2026 TechMaster. All rights reserved.                 |
+-----------------------------------------------------------------------+
```
</details>

