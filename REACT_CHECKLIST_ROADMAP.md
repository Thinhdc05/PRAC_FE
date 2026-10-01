# 🗺️ LỘ TRÌNH HUẤN LUYỆN REACT CHUYÊN SÂU (REACT MASTERY ROADMAP)

> **Tài liệu nguồn chân lý:** Dùng để theo dõi tiến độ từng bước từ con số 0 đến làm chủ React thực chiến.
> Mỗi mục nhỏ sau khi được mổ xẻ thấu đáo và hiểu sâu bản chất sẽ được đánh dấu `[x]`.

---

## 0. Setup dự án chuẩn công nghiệp (Vite & Clean Architecture)
- [x] Khởi tạo dự án React siêu tốc với Vite (`npm create vite@latest`).
- [x] Tổ chức cấu trúc thư mục chuẩn doanh nghiệp: `src/` (`components/`, `data/`, v.v.).
- [x] Cấu hình ESLint & Prettier chuẩn hóa phong cách code tự động khi lưu (Format on Save).
- [x] Tìm hiểu luồng khởi động của ứng dụng React: `index.html` -> `main.jsx` (`createRoot`) -> `App.jsx`.

---

## 1. Tư duy React & Cú pháp JSX (React Mental Model & JSX)
- [x] Sự chuyển dịch tư duy: Mệnh lệnh (Imperative - Vanilla JS) vs Khai báo (Declarative - React `UI = f(State)`).
- [x] Bản chất của JSX: Ngôn ngữ mô tả giao diện, Compiler (Babel/SWC) dịch thành `React.createElement()`.
- [x] Khái niệm Virtual DOM ở mức thực tế: Chu trình *Render -> Diffing -> Commit xuống Real DOM*.
- [x] Các quy tắc bất di bất dịch của JSX:
  - Bắt buộc 1 thẻ cha bao bọc & Sự cứu cánh của React Fragment `<>...</>`.
  - Quy ước đặt tên thuộc tính: `className`, `htmlFor` (giải thích nguồn gốc từ khóa bảo lưu JS).
  - Cặp ngoặc nhọn `{}`: Cánh cổng thần kỳ đưa JavaScript sống vào giao diện.
  - Thẻ tự đóng (Self-closing tags: `<img />`, `<input />`).

---

## 2. Component, Props & Render có điều kiện (Khối Lego giao diện)
- [x] Function Component & Quy tắc vàng viết hoa chữ cái đầu (PascalCase).
- [x] Props: Dữ liệu truyền từ Cha xuống Con & Cú pháp Destructuring sạch đẹp.
- [x] Bản chất Immutability của Props: Tại sao Props là Read-Only (Chỉ đọc) & Triết lý Pure Function.
- [x] Props mặc định (Default values) & Chiếc hộp ma thuật `props.children` (Slot Pattern).
- [x] Render có điều kiện (Conditional Rendering): Toán tử 3 ngôi `? :` vs Short-circuit `&&` (Bẫy số `0` hiển thị lên giao diện).
- [x] Render danh sách (List Rendering với `.map()`): Tầm quan trọng sống còn của thuộc tính `key` (Bẫy dùng `index` làm key).
- [ ] 🛠️ **Mini-Project 1:** Xây dựng danh sách thẻ phim tĩnh (`MovieCardList`) có nhãn trạng thái (HD, Vietsub), lọc theo điều kiện và dùng `props.children` tạo Modal xem nhanh.

---

## 3. State, `useState`, `useReducer` & Thinking in React (Trái tim tương tác)
- [x] Khái niệm State: Dữ liệu nội tại có thể biến đổi của Component.
- [x] Tại sao biến thường `let count` không làm React vẽ lại giao diện?
- [x] Mô hình **"State là một bức ảnh chụp (Snapshot) của mỗi lần render"** & Bẫy Stale Closure.
- [x] Quy tắc Bất biến (Immutability) khi cập nhật State:
  - Cập nhật State kiểu Object (Dùng Spread `{...obj}`).
  - Cập nhật State kiểu Array (Bộ ba Thêm `[...arr]`, Xóa `.filter()`, Sửa `.map()`).
- [x] Cập nhật State dạng hàm (Functional Updates: `setCount(prev => prev + 1)`): Giải quyết việc đọc giá trị cũ.
- [x] Cơ chế gom cụm cập nhật State (Automatic Batching trong React 18+).
- [x] Hook `useReducer`: Quản lý State phức tạp nhiều trường liên quan (Action, Reducer function, Dispatch) — bước đệm vững chắc cho Redux/Zustand.
- [x] Nguyên tắc **"Thinking in React"**: Chia nhỏ component, xác định State nằm ở đâu & Kỹ thuật Kéo State lên cha (**Lifting State Up**).
- [x] 🛠️ **Mini-Project 2:** Xây dựng Giỏ hàng Mini (`ShoppingCart`) bằng `useReducer` (Thêm, Xóa, Tăng/Giảm số lượng, tính tổng tiền, ngăn số âm).

---

## 4. Xử lý sự kiện (Event Handling) & Form hiện đại
- [x] Synthetic Events: Hệ thống sự kiện tổng hợp của React khác gì Native DOM Events?
- [x] Truyền tham số vào Event Handler: Phân biệt `onClick={handleClick}` vs `onClick={() => handleClick(id)}`.
- [x] Controlled Components (Form có kiểm soát bằng State) vs Uncontrolled Components.
- [x] Thực chiến Form hiện đại: Thư viện **React Hook Form** kết hợp **Zod Schema** để validate dữ liệu chuẩn doanh nghiệp.
- [x] Lướt qua tính năng mới: Form Actions trong React 19 (Server Actions & `useActionState`).
- [ ] 🛠️ **Mini-Project 3:** Xây dựng Form Đăng ký / Đặt vé xem phim chuẩn chỉnh với React Hook Form + Zod (báo lỗi inline tức thì).

---

## 5. Quản lý tham chiếu `useRef` & Vòng đời Side Effects với `useEffect`
- [ ] Hook `useRef`: Chiếc két sắt lưu trữ giá trị qua các lần render mà KHÔNG kích hoạt re-render.
- [ ] Thao tác trực tiếp với DOM qua `useRef` (Focus ô input, cuộn trang, đo kích thước phần tử).
- [ ] Khái niệm Side Effect: Khi nào Component cần tương tác với thế giới bên ngoài? (Timer, Storage, API).
- [ ] Hook `useEffect` & Mổ xẻ Dependency Array:
  - Không truyền mảng dependency (Nguy cơ lặp vô tận Infinite Loop).
  - Dependency rỗng `[]` (Chạy 1 lần duy nhất khi Mount).
  - Dependency có biến `[dep1, dep2]` (Chạy lại khi biến thay đổi).
- [ ] **Bẫy `StrictMode` chạy effect 2 lần ở môi trường Dev** & Tại sao bắt buộc phải có **Cleanup Function** (xóa timer, gỡ event, hủy request).
- [ ] Triết lý tối thượng: **"You Might Not Need an Effect"** — Nhận diện Derived State (tính toán trực tiếp khi render) và quy tắc "không lưu state trùng lặp".
- [ ] 🛠️ **Mini-Project 4:** Xây dựng Đồng hồ bấm giờ (Stopwatch) kết hợp Ô tìm kiếm phim có Debounce 400ms dùng `useRef` và `useEffect`.

---

## 6. Tối ưu hiệu năng, Tải chậm & Xử lý lỗi (Performance & Resiliency)
- [ ] Khi nào Component bị re-render thừa? (State cha đổi -> Toàn bộ cây con bị kéo theo).
- [ ] Tối ưu hóa Component với `React.memo` (Cơ chế so sánh nông Shallow Comparison).
- [ ] Hook `useCallback`: Đóng băng con trỏ hàm chống tạo mới.
- [ ] Hook `useMemo`: Lưu bộ nhớ đệm cho các phép tính nặng (Filter danh sách 5.000 phim).
- [ ] Tương lai của Tối ưu hóa: **React Compiler** (Tự động memo hóa trong React 19) và lý do vẫn cần hiểu bản chất để tránh tối ưu hóa sớm (Premature Optimization).
- [ ] Tải chậm Component (Code Splitting): `React.lazy` và thẻ `<Suspense fallback={<Spinner />}>`.
- [ ] Bắt lỗi sập giao diện bằng **Error Boundary**: Hiển thị Fallback UI khi component con bị crash.
- [ ] 🛠️ **Mini-Project 5:** Tối ưu hóa một danh sách phim lớn 2.000 phần tử, kèm hiệu ứng Lazy Loading Poster và Error Boundary xử lý khi component bị lỗi.

---

## 7. Quản lý State nâng cao & Data Fetching thực tế (Server State vs Client State)
- [ ] Phân định rõ ràng: **Client State** (Theme, Modal, Sidebar) vs **Server State** (Dữ liệu API, Cache, Loading, Error).
- [ ] Quản lý Client State toàn cục với **Context API** (`createContext`, `useContext`, Provider Pattern) cho Theme Tối/Sáng, Ngôn ngữ.
- [ ] Quản lý Client State bằng thư viện hiện đại gọn nhẹ: **Zustand** (So sánh với Context API và Redux).
- [ ] Quản lý Server State thực chiến với **TanStack Query (React Query)**:
  - Tự động Caching, Background Refetching, Quản lý `isLoading`, `isError`, và Retry.
  - Loại bỏ hoàn toàn sự cồng kềnh của `useEffect + fetch`.
- [ ] Tự viết Hook riêng (**Custom Hooks**): Tách rời 100% logic nghiệp vụ ra khỏi UI (`useMovieSearch`, `useDebounce`).
- [ ] 🛠️ **Mini-Project 6:** Xây dựng trang Quản lý Yêu thích & Dark Mode dùng Zustand, kết hợp TanStack Query gọi API phim có cache mượt mà.

---

## 8. Định tuyến với React Router v7 & Dự án Phim Production-Grade
- [ ] Tư duy SPA (Single Page Application) vs MPA (Multi Page Application).
- [ ] Cài đặt & Cấu hình **React Router v7 mới nhất** (`createBrowserRouter`, `RouterProvider`).
- [ ] Các thành phần định tuyến cốt lõi: `Outlet`, `Link`, `NavLink` (Active State).
- [ ] Đọc tham số URL với `useParams` (Chi tiết phim theo slug) và `useSearchParams` (Bộ lọc phim).
- [ ] Chuyển trang theo code bằng `useNavigate`.
- [ ] 🚀 **DỰ ÁN TỔNG LỰC THỰC CHIẾN:** Chuyển hóa toàn diện dự án **Web Phim KKPhim** từ Vanilla JS sang React chuyên nghiệp:
  - Trang chủ: Banner, Slider phim mới, Bộ lọc thể loại.
  - Trang chi tiết: Video Player nhúng mượt mà, danh sách tập phim, breadcrumb, danh sách phim liên quan.
  - Tìm kiếm Live Search thông minh với TanStack Query và debounce.
  - Cấu trúc thư mục sạch chuẩn doanh nghiệp, sẵn sàng đóng gói đưa vào CV!
