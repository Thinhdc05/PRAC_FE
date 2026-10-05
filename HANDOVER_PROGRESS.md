# 📋 BÁO CÁO TIẾN ĐỘ & BÀN GIAO TOÀN DIỆN (HANDOVER PROGRESS)
> **Dành cho AI Agent & Người học tại phiên làm việc tiếp theo (Máy công ty / Máy ở nhà):**
> Khi bắt đầu phiên làm việc mới, AI Agent **BẮT BUỘC ĐỌC KỸ FILE NÀY** cùng các tài liệu đi kèm để nắm bắt chính xác ngữ cảnh, phương pháp sư phạm và điểm dừng kỹ thuật, tuyệt đối không làm gãy mạch học.

---

## 🎯 1. NGUYÊN TẮC HUẤN LUYỆN BẮT BUỘC CHO AI AGENT
1. **Phương pháp sư phạm chuẩn F8 (Tư duy phản xạ & Dẫn dắt từng bước):**
   - **Không bao giờ ném code thành phẩm sẵn:** Tuyệt đối không tự ý viết toàn bộ code vào file hoặc đưa cả block code hoàn chỉnh cho user copy-paste.
   - **Chia nhỏ bài toán:** Tách thành từng bước nhỏ (Bước 1 -> Bước 2 -> Chờ user gõ và phản hồi -> Bước tiếp theo).
   - **Dẫn dắt từ quen thuộc đến mới:** Giống như từ `useState` (3 bước) nâng cấp lên `useReducer` (4 bước), luôn đối chiếu "Tại sao sinh ra?", "Giải quyết nỗi đau gì?".
2. **Mổ xẻ 4 tầng bản chất chuyên sâu:**
   - Tầng 1: Cú pháp & bài toán đời thực trực quan.
   - Tầng 2: Cơ chế ngầm dưới "nắp capo" (Virtual DOM, Fiber Node, Closure Scope, Browser Paint, Call Stack, Web APIs, Heap/Stack).
   - Tầng 3: Bẫy phỏng vấn Senior & Lỗi ngớ ngẩn thường gặp (Stale Closure, Visual Flicker, vỡ khiên `memo`, Infinite Loop re-render).
   - Tầng 4: Thực chiến sản phẩm chuẩn React 18 / 19.
3. **Quy tắc Checklist & Sổ tay:**
   - Chỉ đánh dấu `[x]` trong `REACT_CHECKLIST_ROADMAP.md` khi đã cùng user mổ xẻ thấu đáo và user xác nhận hiểu sâu.
   - Ghi chú lý thuyết vào `REACT_STUDY_NOTES.md` phải cô đọng, sắc bén, có bảng so sánh đối chiếu và code mẫu minh họa chuẩn mực.

---

## 🧭 2. TỔNG QUAN TIẾN ĐỘ LỘ TRÌNH REACT HIỆN TẠI

### ✅ A. Đã hoàn thành 100% lý thuyết từ Chương 0 đến Chương 6:
*(Toàn bộ đã được ghi chép chi tiết trong `REACT_STUDY_NOTES.md` và check `[x]` trong `REACT_CHECKLIST_ROADMAP.md`)*
- **Chương 0 & 1:** Tư duy Component, Virtual DOM vs Real DOM, Cơ chế Reconciliation & Fiber Tree.
- **Chương 2:** JSX, Babel, Fragile return, Curly braces `{}`.
- **Chương 3:** Props vs State, One-way Data Flow, Two-way Binding, Controlled Component, Spread Operator bất biến `[...prev]`.
  - **Mục 3.6 (Nâng cấp useReducer chuẩn F8):** 4 bước kinh điển (Init -> Actions/Action Creators -> Reducer pure -> Dispatch), đối chiếu tường tận với 3 bước của `useState`.
  - **Mục 3.7:** Cặp bài toán Radio (`checked === id`, tước quyền thẻ `name`) vs Checkbox (mảng `ids`, `toggle`).
- **Chương 4:** Xử lý sự kiện (SyntheticEvent, PreventDefault, Currying truyền params).
- **Chương 5 (Vũ trụ useEffect & Hooks):**
  - Ba biến thể dependency, cơ chế Cleanup function.
  - Phân tích sâu: Tại sao `fetch().then()` dùng được trong `useEffect` mà `async () =>` trực tiếp lại lỗi (vì trả về Promise thay vì cleanup/undefined).
  - Triết lý "You Might Not Need an Effect" (tính toán derived state khi render, không lạm dụng effect).
  - `useLayoutEffect` vs `useEffect`: Đồng bộ chặn Main Thread trước Browser Paint -> Triệt tiêu giật hình (Visual Flicker).
  - `useRef`: 2 sứ mệnh (tham chiếu DOM thật & lưu biến qua các lần re-render mà không kích hoạt render lại).
  - `forwardRef` + `useImperativeHandle`: Đóng gói "tay nắm cửa an toàn", giới hạn quyền component Cha sờ vào DOM Con.
  - `useId`: Tạo unique ID an toàn trong SSR và hydration.
- **Chương 6 (Tối ưu hóa hiệu năng & Hiệu năng nâng cao):**
  - `React.memo` (so sánh shallow props con thoi).
  - `useCallback` (cứu khiên `memo` khỏi vỡ do tham chiếu hàm mới).
  - `useMemo` (bảo tồn giá trị tính toán đắt đỏ).
  - Concurrent React: `useTransition` (hạ độ ưu tiên, giữ UI mượt) vs `useDeferredValue` (trì hoãn giá trị tính toán).
  - Tương lai React 19: **React Compiler** tự động memoize code, không cần lạm dụng hook tối ưu thủ công.
  - Code Splitting: `React.lazy` + `Suspense` bóc tách bundle.
  - `ErrorBoundary`: Vòng tròn bảo vệ cô lập crash bằng Class Component lifecycle `componentDidCatch`.

---

## 💻 3. TIẾN ĐỘ THỰC HÀNH CODE (`react-movie-app/src/App.jsx`)
- **Đã xong:** Ứng dụng To-Do List cơ bản:
  - Quản lý ô input (Controlled Input với `job`, `setJob`).
  - Danh sách công việc `jobs` (State mảng).
  - Thêm việc: `setJobs(prev => [...prev, job])`.
  - Xóa việc: `setJobs(prev => prev.filter((_, i) => i !== index))`.

---

## 🚀 4. ĐIỂM DỪNG CHÍNH XÁC & BƯỚC TIẾP THEO KHI SANG MÁY CÔNG TY

Khi user kéo code về máy công ty (`git pull origin main`) và mở chat:

### 🎯 Hai hướng triển khai tiếp theo (hỏi user chọn 1 trong 2):
1. **Lựa chọn 1 (Thực hành phản xạ cơ bắp - Mini-Project 4):**
   - Viết tiếp trong `react-movie-app/src/App.jsx`:
     - **Tính năng 1: Đồng hồ bấm giờ (Stopwatch):**
       - Dùng `useState` lưu thời gian đếm `count`.
       - Dùng `useRef` lưu `timerId.current = setInterval(...)` để khi Start/Stop không bị reset biến hay gây re-render thừa.
     - **Tính năng 2: Live Search Debounce 400ms:**
       - Dùng ô input tìm kiếm.
       - Áp dụng `useEffect` có cleanup `clearTimeout` để triệt tiêu spam tìm kiếm khi người dùng đang gõ phím liên tục.
2. **Lựa chọn 2 (Tiếp tục lý thuyết chuyên sâu Chương 7):**
   - Chuyển sang **Chương 7: Quản lý State nâng cao (State Management)** trong `REACT_CHECKLIST_ROADMAP.md`:
     - **7.1 Context API:** Vấn nạn Prop Drilling và cái giá re-render lan tỏa toàn cây (Context Hell).
     - **7.2 Zustand:** Tại sao Zustand đè bẹp Redux & Context API trong dự án hiện đại (Atomic State, Selector chỉ render đúng component cần, Zero-boilerplate).
     - **7.3 Server State vs Client State (TanStack Query / React Query):** Tách biệt dữ liệu server khỏi client state (Stale-While-Revalidate, tự động cache, retry).
     - **7.4 Tương lai React 19:** `useOptimistic` (cập nhật UI trước khi server phản hồi) & Hook `use` (unwrap Promise/Context trực tiếp trong JSX).
     - **7.5 Bóc tách Custom Hooks:** Nghệ thuật gom logic tái sử dụng (`useDebounce`, `useLocalStorage`, `useFetch`).

---

## 📌 5. THAO TÁC ĐỒNG BỘ GIT

### Tại máy ở nhà (đã làm):
- Đã commit: `docs: cap nhat so tay va checklist React tu Chuong 1 toi Chuong 6 chuan xac` (Hash: `3dd3908`).
- User chạy lệnh: `git push origin main`.

### Tại máy công ty:
- Mở terminal chạy:
  ```bash
  git pull origin main
  ```
- Mở Antigravity / Chat và nhắn:
  > *"Tôi vừa pull code mới nhất ở máy công ty rồi, tiếp tục lộ trình nhé!"*
