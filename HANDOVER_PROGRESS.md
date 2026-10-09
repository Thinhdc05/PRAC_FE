# 📋 BÁO CÁO BÀN GIAO & CHIẾN LƯỢC NÂNG CẤP DỰ ÁN MỚI (HANDOVER REPORT)

> **Dành cho Người học & AI Agent tại phiên làm việc tiếp theo (Máy ở nhà / Phiên kế tiếp):**  
> File này ghi lại **chi tiết phản hồi từ buổi Phỏng vấn Lần 1**, các lỗ hổng kiến trúc cần khắc phục, và **Kế hoạch hành động chi tiết để xây dựng Dự Án Mới: `react-pro-store`** tích hợp toàn bộ các công nghệ bắt buộc.

---

## 🎯 1. PHẢN HỒI THỰC TẾ TỪ BUỔI PHỎNG VẤN LẦN 1 (THE REALITY CHECK)

### Nhận xét cốt lõi từ Interviewer:
1. **"Học lẻ từng hook thì chỉ là học vẹt":**
   * Trong một dự án thực tế, các Hook không bao giờ đứng độc lập. Phải hiểu cách **các Hook lồng ghép, cộng sinh và phối hợp với nhau** theo luồng dữ liệu (Data Flow) đa tầng.
2. **Thiếu các công cụ State Management công nghiệp:**
   * Cần làm chủ **Redux Toolkit (RTK)** — Tiêu chuẩn của các hệ thống doanh nghiệp lớn.
   * Cần làm chủ **Zustand** — Thư viện State Management hiện đại siêu nhẹ (~1KB) dựa trên Selector Pattern.
3. **Thư viện Validation đi kèm `useForm` (Ngoài Zod):**
   * Phải biết sử dụng **YUP** (`yup` + `@hookform/resolvers/yup`) — Thư viện validation kinh điển thống trị hàng ngàn dự án React lâu năm.
4. **Đào sâu bản chất `react-router-dom` v6:**
   * Không chỉ dừng ở link dẫn thông thường, phải nắm chắc:
     * **Nested Routes** với `<Outlet />`.
     * **Protected Routes (Auth Guard):** Chặn các trang nhạy cảm (`/checkout`, `/profile`) khi chưa đăng nhập và tự động đá về `/login`.
     * `useParams`, `useSearchParams`, `useLocation`, `useNavigate`, `useRouteError`.
5. **Tối ưu hóa hiệu năng tải trang:**
   * Bắt buộc có **Code Splitting** với **`React.lazy` + `<Suspense>`**.
6. **Yêu cầu hành động:**
   * Xây dựng **Một Dự Án Mới Hoàn Chỉnh** tích hợp đầy đủ 100% tất cả các công nghệ trên và nhiều React Hooks phối hợp.

---

## 🚀 2. DỰ ÁN MỚI: `react-pro-store` (E-COMMERCE & MULTI-VENDOR HUB)

* **Backend API được chọn:** **[DummyJSON](https://dummyjson.com/)** (API RESTful công cộng phong phú: Sản phẩm có ảnh đẹp, Đăng nhập trả JWT token thật, Danh mục, Giỏ hàng, Phân trang, Tìm kiếm).

### 🏛️ Bảng Phân Vai Công Nghệ Chuẩn Enterprise:

| Tầng Kiến Trúc | Thư Viện / Công Nghệ | Nhiệm vụ cụ thể trong dự án `react-pro-store` |
| :--- | :--- | :--- |
| **Routing & Protection** | `react-router-dom` v6 | • Data APIs (`createBrowserRouter`, `RouterProvider`)<br>• Nested Layout dùng chung (`RootLayout` + `<Outlet />`)<br>• **Protected Route (`<ProtectedRoute />`)** bảo vệ trang Checkout & Profile<br>• `useParams` (ID sản phẩm), `useSearchParams` (lọc danh mục, phân trang, sort) |
| **Code Splitting** | `React.lazy` + `<Suspense>` | Cắt nhỏ từng trang (`HomePage`, `ProductsPage`, `ProductDetailPage`, `LoginPage`, `CartPage`, `CheckoutPage`) giảm 70% Initial Bundle size |
| **Form & Validation** | `react-hook-form` + **YUP** | • Đăng nhập & Đăng ký: Validate email, password, confirm password bằng **Yup Schema**<br>• Form Checkout thanh toán: Validate địa chỉ, số điện thoại, thẻ |
| **Global Client State 1** | **Redux Toolkit (RTK)** | **Quản lý Giỏ hàng (`cartSlice.js`):**<br>• `configureStore`, `createSlice` (tận dụng Immer)<br>• `useSelector`, `useDispatch`<br>• Thêm vào giỏ, tăng/giảm số lượng, xóa sản phẩm |
| **Global Client State 2** | **Zustand** | **Quản lý Auth & Theme (`useAuthStore.js`):**<br>• Lưu `user`, `accessToken`, `isAuthenticated`<br>• Middleware **`persist`** tự động đồng bộ `localStorage`<br>• Hàm `login()`, `logout()` |
| **Server State & Cache** | **TanStack Query v5** | • `useQuery`: Fetch danh sách sản phẩm, chi tiết sản phẩm (Cache RAM 5 phút, SWR)<br>• `useMutation`: Gửi request đặt hàng POST lên DummyJSON |
| **Hệ thống Hooks Phối hợp** | React Core Hooks | • `useMemo`: Tính tổng tiền giỏ hàng, lọc sản phẩm<br>• `useCallback`: Đóng băng hàm truyền xuống item con bọc `React.memo`<br>• `useRef`: Lưu timer debounce, focus ô lỗi<br>• Custom Hooks: `useDebounce`, `useLocalStorage` |

---

## 📂 3. CẤU TRÚC THƯ MỤC CHUẨN SENIOR CỦA DỰ ÁN MỚI

```
react-pro-store/
├── src/
│   ├── api/                     # Cấu hình gọi API (DummyJSON endpoints)
│   │   ├── client.js            # Fetch wrapper / Axios instance
│   │   ├── productsApi.js       # Gọi sản phẩm, danh mục
│   │   └── authApi.js           # Gọi login DummyJSON lấy JWT token
│   ├── components/              # Các UI Component dùng chung
│   │   ├── common/              # Button, Input, Modal, Spinner
│   │   ├── Navbar.jsx           # Thanh điều hướng (Hiển thị avatar user, badge số lượng giỏ hàng)
│   │   ├── Footer.jsx           # Chân trang
│   │   └── ProductCard.jsx      # Thẻ sản phẩm (Bọc React.memo)
│   ├── features/                # Chia module theo nghiệp vụ (Feature-based)
│   │   ├── auth/                # Login, Register, ProtectedRoute
│   │   │   ├── schemas/authYupSchema.js  # 👉 Yup Validation Schema!
│   │   │   └── ProtectedRoute.jsx        # 👉 Auth Guard Router!
│   │   ├── cart/                # Giỏ hàng dùng Redux Toolkit
│   │   │   └── cartSlice.js     # 👉 Redux Toolkit Slice!
│   │   └── products/            # Danh sách, Chi tiết, Lọc
│   │       └── hooks/useProducts.js      # 👉 TanStack Query Hook!
│   ├── layouts/                 # RootLayout chứa Header, Outlet, Footer
│   │   └── RootLayout.jsx
│   ├── pages/                   # Các trang được Lazy load
│   │   ├── HomePage.jsx
│   │   ├── ProductsPage.jsx
│   │   ├── ProductDetailPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── CartPage.jsx
│   │   ├── CheckoutPage.jsx
│   │   └── NotFoundPage.jsx
│   ├── store/                   # Quản lý State toàn cục
│   │   ├── index.js             # Cấu hình configureStore (Redux)
│   │   └── useAuthStore.js      # 👉 Zustand Store (Auth & Theme)!
│   ├── App.jsx                  # Cấu hình Router, QueryClientProvider, Provider Redux
│   └── main.jsx
```

---

## 📝 4. CÁC GÓI THƯ VIỆN CẦN CÀI ĐẶT

Khi bắt đầu khởi tạo dự án:
```bash
# 1. Khởi tạo dự án Vite React:
npm create vite@latest react-pro-store -- --template react

# 2. Vào thư mục:
cd react-pro-store

# 3. Cài đặt toàn bộ bộ vũ khí:
npm install react-router-dom @tanstack/react-query @tanstack/react-query-devtools @reduxjs/toolkit react-redux zustand react-hook-form yup @hookform/resolvers
```

---

## 🔄 5. HƯỚNG DẪN ĐỒNG BỘ GIT CHO MÁY Ở NHÀ

### Bước 1: Commit và đẩy lên GitHub (Tại máy hiện tại):
Mở terminal tại thư mục gốc chạy:
```bash
git add .
git commit -m "docs: cap nhat bao cao ban giao va lo trinh du an moi react-pro-store"
git push origin main
```

### Bước 2: Kéo về tại máy ở nhà:
Mở terminal tại máy ở nhà chạy:
```bash
git pull origin main
```

### Bước 3: Câu lệnh tiếp tục phiên làm việc với AI ở nhà:
Khi mở Antigravity / IDE ở nhà, bạn chỉ cần gửi tin nhắn:
> *"Tôi vừa pull code mới nhất về rồi. Bắt đầu ngay Bước 1: Khởi tạo dự án `react-pro-store` và cài đặt các thư viện theo HANDOVER_PROGRESS.md nhé!"*
