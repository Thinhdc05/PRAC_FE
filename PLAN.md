# 📋 KẾ HOẠCH THỰC HÀNH REACT NÂNG CAO (REACT PRACTICE PLAN)

> **Mục tiêu:** Chuyển hóa 100% các khái niệm lý thuyết còn lại thành tính năng thực tế chạy trên dự án `react-movie-app`.  
> Triển khai theo từng chặng (Phase), mỗi chặng tập trung giải quyết triệt để một nhóm hook/công nghệ và kiểm chứng hiệu năng trước - sau.

---

## 🎯 TỔNG HỢP CÁC TÍNH NĂNG & HOOK CẦN TRIỂN KHAI

```
┌────────────────────────────────────────────────────────────────────────┐
│                        LỘ TRÌNH THỰC HÀNH                              │
├────────────────────────────────────────────────────────────────────────┤
│ Chặng 1: TanStack Query useMutation (Hoàn thiện xuất vé & Modal)       │
│ Chặng 2: Re-render Optimization (React.memo & useMemo)                 │
│ Chặng 3: Concurrent React (useDeferredValue & useTransition)           │
│ Chặng 4: Code Splitting (React.lazy & Suspense tải trang chậm)         │
│ Chặng 5: Reusable UI Component (Tách FormInput Design System)          │
│ Chặng 6: Zustand Global Store (Nâng cấp từ Context API)                │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 🚀 CHI TIẾT TỪNG CHẶNG TRIỂN KHAI

### 📌 CHẶNG 1: Server State Mutation với TanStack Query (`useMutation`)
- [ ] **Mục tiêu:** Thay thế hàm `alert()` giả lập ở trang `BookingPage` bằng luồng gửi dữ liệu chuẩn doanh nghiệp.
- [ ] **Vũ khí áp dụng:** `useMutation` của `@tanstack/react-query`.
- [ ] **Các bước thực hiện:**
  1. Viết hàm giả lập `apiBookTicket(formData)` trả về Promise có độ trễ 1.5 giây (mô phỏng mạng).
  2. Dùng `useMutation` bắt các cờ:
     - `mutation.isPending`: Khóa form, nút đổi thành `⏳ Đang xuất vé điện tử...` và hiện hiệu ứng xoay.
     - `mutation.isError`: Hiển thị thông báo đỏ nếu có lỗi mạng.
     - `mutation.isSuccess`: Mở một chiếc **Modal Vé Xem Phim VIP** cực đẹp hiển thị thông tin vé vừa đặt, mã Barcode/QR giả lập.
  3. Kích hoạt `queryClient.invalidateQueries` để đồng bộ dữ liệu.

---

### 📌 CHẶNG 2: Tối ưu hóa Re-render (`React.memo` & `useMemo`)
- [ ] **Mục tiêu:** Loại bỏ hoàn toàn các đợt re-render thừa khi người dùng tương tác trên trang chủ.
- [ ] **Vũ khí áp dụng:** `React.memo` (HOC) và Hook `useMemo`.
- [ ] **Các bước thực hiện:**
  1. **Đo đếm hiện trạng:** Đặt `console.log("MovieBanner render")` và `console.log("MovieList render")`. Khi gõ phím ô Search, cả 2 component này bị kéo theo re-render liên tục.
  2. **Bọc `React.memo`:** Bọc `MovieBanner` để khi props phim nổi bật không đổi thì component này **đứng im 100%**.
  3. **Áp dụng `useMemo`:** Thêm bộ lọc phim trên trang chủ (Lọc theo năm chiếu hoặc Sắp xếp theo tên A-Z). Dùng `useMemo` để chỉ tính toán lại danh sách lọc khi mảng phim hoặc từ khóa thay đổi, không tính lại vô ích ở mỗi nhịp render.

---

### 📌 CHẶNG 3: Concurrent React (`useDeferredValue` & `useTransition`)
- [ ] **Mục tiêu:** Giữ giao diện đạt chuẩn 60 FPS mượt mà khi lọc danh sách dữ liệu lớn.
- [ ] **Vũ khí áp dụng:** `useDeferredValue` (React 18+).
- [ ] **Các bước thực hiện:**
  1. Phân biệt rõ ranh giới:
     - `useDebounce`: Dùng khi **GỌI API** (chặn spam request qua mạng).
     - `useDeferredValue`: Dùng khi **RENDER TẠI CLIENT** (trì hoãn render danh sách nặng để ưu tiên gõ phím mượt mà).
  2. Tạo thanh lọc phim tức thì tại trang chủ dùng `useDeferredValue(keyword)`.
  3. Cảm nhận độ mượt khi React tự động xếp độ ưu tiên cho tác vụ gõ phím của người dùng.

---

### 📌 CHẶNG 4: Code Splitting chuẩn Production (`React.lazy` & `<Suspense>`)
- [ ] **Mục tiêu:** Giảm dung lượng file bundle ban đầu (Initial Bundle Size), trang nào người dùng click tới mới tải code trang đó về.
- [ ] **Vũ khí áp dụng:** `React.lazy()` kết hợp thẻ `<Suspense fallback={<LoadingSpinner />}>`.
- [ ] **Các bước thực hiện:**
  1. Mở [src/App.jsx](file:///Users/thinh/FE/Prac_FE/PRAC_FE/react-movie-app/src/App.jsx).
  2. Chuyển các lệnh import tĩnh:
     ```javascript
     const HomePage = lazy(() => import('./pages/HomePage'));
     const MovieDetailPage = lazy(() => import('./pages/MovieDetailPage'));
     const BookingPage = lazy(() => import('./pages/BookingPage'));
     ```
  3. Bọc `<Suspense>` quanh `<Outlet />` ở [RootLayout.jsx](file:///Users/thinh/FE/Prac_FE/PRAC_FE/react-movie-app/src/layouts/RootLayout.jsx).
  4. Mở tab Network F12: Chứng minh khi bấm vào trang Đặt vé, trình duyệt mới bắn request tải file JS của `BookingPage` về!

---

### 📌 CHẶNG 5: Reusable UI Component (`FormInput.jsx`)
- [ ] **Mục tiêu:** Chuẩn hóa Design System, triệt tiêu code lặp lại của các ô input trong form.
- [ ] **Vũ khí áp dụng:** Forwarding Props & Ref trong React 19.
- [ ] **Các bước thực hiện:**
  1. Tạo component `src/components/FormInput.jsx` đóng gói sẵn `<label>`, `<input {...props}>`, viền đổi màu, và dòng chữ lỗi `error.message`.
  2. Thay thế toàn bộ các ô Họ tên, Email, SĐT, Số vé ở `BookingPage.jsx` bằng `<FormInput />`.
  3. Rút gọn file `BookingPage.jsx` thêm 40 dòng code nữa.

---

### 📌 CHẶNG 6: Nâng cấp Global State sang Zustand
- [ ] **Mục tiêu:** Thay thế Context API bằng Zustand để tận dụng cơ chế **Selector Pattern** (Chỉ component nào dùng biến mới bị re-render).
- [ ] **Vũ khí áp dụng:** Thư viện `zustand`.
- [ ] **Các bước thực hiện:**
  1. Cài đặt `zustand`.
  2. Tạo store `src/store/useFavoritesStore.js` với tính năng persist vào `localStorage`.
  3. Bỏ bọc `<FavoritesProvider>` ở `App.jsx` (Zustand 0 cần Provider!).
  4. Chứng minh: Khi bấm yêu thích phim ở trang chi tiết, component `Header` chỉ re-render đúng số lượng tim `totalFavorites`, không re-render cả layout!

---

## 📊 NHẬT KÝ THEO DÕI TIẾN ĐỘ THỰC HIỆN

| Chặng | Nội dung | Trạng thái | Ghi chú kỹ thuật |
| :---: | :--- | :---: | :--- |
| **0** | Complex Form với React Hook Form + Zod | **HOÀN THÀNH (100%)** | Đã chạy mượt mà tại `BookingPage.jsx` |
| **1** | TanStack Query `useMutation` (Vé điện tử) | *Chưa thực hiện* | Sẽ làm tiếp theo |
| **2** | Tối ưu Re-render (`React.memo`, `useMemo`) | *Chưa thực hiện* | Đã có sẵn lý thuyết |
| **3** | Concurrent React (`useDeferredValue`) | *Chưa thực hiện* | Dành cho Live Search |
| **4** | Code Splitting (`React.lazy` + `Suspense`) | *Chưa thực hiện* | Áp dụng tại `App.jsx` |
| **5** | Component Reusable `FormInput` | *Chưa thực hiện* | Refactor code sạch |
| **6** | Chuyển đổi sang `Zustand` Store | *Chưa thực hiện* | Thay thế Context API |
