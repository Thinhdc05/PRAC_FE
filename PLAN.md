# 📋 KẾ HOẠCH HÀNH ĐỘNG: DỰ ÁN MỚI REACT-PRO-STORE

> **Mục tiêu tối thượng:** Xây dựng một dự án thực chiến chuẩn Senior E-Commerce Platform (`react-pro-store`) tích hợp toàn bộ các yêu cầu từ buổi phỏng vấn lần 1:
> - **Redux Toolkit (RTK)** (Cart management)
> - **Zustand** (Auth & Theme management với `persist`)
> - **React Hook Form + YUP Schema** (Validation)
> - **React Router v6** (Nested Layouts, Protected Routes / Auth Guard, Dynamic & Query routing)
> - **Performance:** `React.lazy` + `<Suspense>`, `React.memo`, `useMemo`, `useCallback`
> - **Server State:** TanStack Query v5 + DummyJSON REST API Backend

---

## 🗺️ 6 GIAI ĐOẠN TRIỂN KHAI THỰC CHIẾN

### 📌 Giai đoạn 1: Khởi tạo Hạ tầng & Cài đặt Thư viện
- [ ] Khởi tạo dự án Vite: `react-pro-store`.
- [ ] Cài đặt trọn bộ: `react-router-dom`, `@tanstack/react-query`, `@reduxjs/toolkit`, `react-redux`, `zustand`, `react-hook-form`, `yup`, `@hookform/resolvers`.
- [ ] Dọn dẹp template mặc định và cấu hình Base CSS.

### 📌 Giai đoạn 2: Kiến trúc Định tuyến Đa Tầng (React Router v6 + Code Splitting)
- [ ] Thiết lập `createBrowserRouter` và `RouterProvider` trong `App.jsx`.
- [ ] Áp dụng `React.lazy()` và `<Suspense fallback={<PageLoading />}>` cho 100% các trang.
- [ ] Xây dựng `RootLayout.jsx` dùng `<Outlet />` chứa `Navbar` và `Footer`.
- [ ] Xây dựng `<ProtectedRoute />` (Auth Guard): Kiểm tra token trong Zustand, nếu chưa login thì điều hướng về `/login`.

### 📌 Giai đoạn 3: Authentication & Form Validation với YUP Schema
- [ ] Viết `authYupSchema.js` dùng thư viện **Yup**: validate email, password tối thiểu 6 ký tự.
- [ ] Xây dựng trang `LoginPage.jsx` dùng `useForm({ resolver: yupResolver(authYupSchema) })`.
- [ ] Tạo `useAuthStore.js` bằng **Zustand** (middleware `persist` lưu `localStorage`): Lưu token và user info từ API DummyJSON `POST /auth/login`.

### 📌 Giai đoạn 4: Server State & Catalog với TanStack Query v5
- [ ] Cấu hình `QueryClient` với `staleTime: 5 phút`, `gcTime: 10 phút`.
- [ ] Viết custom hook `useProducts(category, page, sortBy)` fetch từ DummyJSON (`https://dummyjson.com/products`).
- [ ] Viết custom hook `useProductDetail(id)` fetch từ DummyJSON.
- [ ] Xây dựng `ProductsPage.jsx` có tìm kiếm (`useSearchParams`), lọc thể loại, và phân trang.
- [ ] Xây dựng `ProductCard.jsx` bọc `React.memo` chống re-render thừa.

### 📌 Giai đoạn 5: Quản trị Giỏ hàng Công nghiệp với Redux Toolkit (RTK)
- [ ] Khởi tạo `store/index.js` bằng `configureStore`.
- [ ] Xây dựng `cartSlice.js` bằng `createSlice`:
  - `addToCart(product)` (tận dụng Immer)
  - `increaseQty(id)`
  - `decreaseQty(id)`
  - `removeFromCart(id)`
  - `clearCart()`
- [ ] Xây dựng `CartPage.jsx` và hiển thị badge số lượng vé/món hàng trên `Navbar`.
- [ ] Dùng `useMemo` tính tổng tiền giỏ hàng (`totalPrice`).

### 📌 Giai đoạn 6: Trang Checkout, Quản lý Lỗi & Tối ưu Toàn diện
- [ ] Xây dựng `CheckoutPage.jsx` (được bảo vệ bởi `<ProtectedRoute />`): Form địa chỉ giao hàng với Yup.
- [ ] Dùng `useMutation` bắn đơn hàng POST `/carts/add` lên DummyJSON.
- [ ] Xây dựng `NotFoundPage.jsx` và xử lý `useRouteError`.
- [ ] Rà soát toàn bộ các React Hook (`useRef`, `useCallback`, `useId`, Custom Hooks) đảm bảo không có hook nào đứng lẻ loi.
