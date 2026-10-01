# 🏦 NGÂN HÀNG BẪY PHỎNG VẤN & CÁC CẶP ĐỐI CHIẾU TINH HOA (REACT INTERVIEW TRAPS BANK)

> **Mục đích:** Tài liệu tham chiếu vĩnh viễn được tinh lọc từ kho đề phỏng vấn thế giới (đã loại bỏ 100% rác rưởi Class Component lỗi thời).
> **Quy tắc bắt buộc:** Mỗi khi giảng dạy hoặc đúc kết bất kỳ chương nào trong Roadmap, Agent **BẮT BUỘC** phải tra cứu mục tương ứng trong tài liệu này để cài cắm các câu hỏi "chọc ngoáy", các cặp đối chiếu (Versus), và các bẫy phỏng vấn thực tế vào bài giảng.

---

## CHƯƠNG 1: TƯ DUY REACT, JSX & VIRTUAL DOM

### 1. Cặp đối chiếu: Virtual DOM vs Shadow DOM vs Real DOM
- **Góc chọc ngoáy:** Rất nhiều dev nhầm Virtual DOM và Shadow DOM là một.
- **Bản chất:**
  - **Real DOM:** Cây DOM thật của trình duyệt (HTML elements). Thao tác trực tiếp rất chậm vì kích hoạt chuỗi tính toán Reflow -> Repaint rất nặng của trình duyệt.
  - **Virtual DOM:** Phát minh của React. Hoàn toàn là một **Plain JavaScript Object** nhẹ nằm trong RAM mô phỏng cây DOM. Giúp tính toán Diffing tìm ra tập hợp thay đổi tối thiểu trước khi cập nhật.
  - **Shadow DOM:** Một **tiêu chuẩn web gốc (Web Components)** của trình duyệt, KHÔNG liên quan gì đến React. Nó dùng để **cô lập phạm vi CSS và HTML** (Scoping). Ví dụ thẻ `<video controls>` giấu toàn bộ nút bấm, thanh tua bên trong Shadow DOM mà CSS ngoài không thể chọc vào làm vỡ giao diện.

### 2. Cặp đối chiếu: React Element vs React Component vs Component Instance
- **Góc chọc ngoáy:** Phân biệt 3 khái niệm thường bị gọi lẫn lộn.
- **Bản chất:**
  - **Component:** Là bản thiết kế / cái khuôn đúc (Chính là hàm `function MovieCard(props)`).
  - **Element:** Là chiếc bánh đã đúc ra (Object JavaScript nhẹ mô tả UI trả về từ `React.createElement()`: `{ type: MovieCard, props: {...} }`). Element là bất biến (immutable).
  - **Instance:** Chỉ tồn tại trong Class Component cũ (thực thể `this`). Trong Function Component hiện đại, không có instance, React quản lý state/lifecycle thông qua cấu trúc Fiber node trong bộ nhớ.

### 3. Bẫy phỏng vấn: "Virtual DOM có thực sự nhanh hơn DOM thật không?"
- **Đáp án chuẩn Senior:** **KHÔNG!** Thao tác DOM trực tiếp được tối ưu thủ công bằng tay (Vanilla JS) luôn luôn chạy nhanh hơn Virtual DOM vì React phải tốn thêm RAM tạo Object và tốn CPU chạy thuật toán so sánh Diffing.
- **Giá trị thực sự:** Virtual DOM mang lại **Hiệu năng có thể dự đoán được (Predictable Performance)** cho các dự án khổng lồ, và giải phóng sức lao động giúp lập trình viên viết code theo lối Khai báo (Declarative) mà không sợ làm sập hiệu năng.

### 4. Góc sâu: React Fiber là gì và tại sao React phải viết lại từ đầu?
- **Nỗi đau cũ:** Trước React 16 (Stack Reconciler), việc diffing chạy đệ quy đồng bộ trên Call Stack. Nếu cây DOM quá lớn, JS chiếm trọn Main Thread khiến trình duyệt bị đơ, không phản hồi thao tác gõ phím hay cuộn chuột (rớt khung hình < 60 FPS).
- **React Fiber (từ React 16+):** Cấu trúc dữ liệu dạng danh sách liên kết đôi (Doubly Linked List). Fiber chia nhỏ công việc render thành từng mẩu nhỏ (incremental rendering), có khả năng **tạm dừng (pause), hủy bỏ (abort) hoặc ưu tiên (prioritize)** các tác vụ người dùng quan trọng hơn.

---

## CHƯƠNG 2: COMPONENT, PROPS & RENDER DANH SÁCH

### 5. Chiếc bẫy kinh điển: Tại sao dùng `key={index}` lại là "Tội đồ" (Anti-pattern)?
- **Góc chọc ngoáy:** *"Nếu danh sách chỉ hiển thị thì dùng index có sao không? Khi nào index gây ra bug nghiêm trọng?"*
- **Bản chất:**
  - Thuật toán Diffing của React so sánh danh tính phần tử dựa vào `key`.
  - Khi xóa phần tử đầu mảng, các phần tử phía sau bị đôn lên nhận index mới (Item 1 nhận index 0).
  - Nếu phần tử con có **trạng thái nội bộ (Uncontrolled input, checkbox, animation state)**, React thấy `key={0}` vẫn tồn tại nên nó **giữ nguyên DOM node cũ và state cũ** gán sang cho phần tử mới -> Form bị nhập lệch dữ liệu, checkbox bị tích nhầm người!
- **Quy tắc:** Chỉ dùng `index` khi danh sách là tĩnh 100%, không bao giờ filter, sort, thêm hay xóa.

### 6. Bẫy "Số 0" trong Render có điều kiện
- **Hiện tượng:** `{count && <Component />}` với `count = 0` sẽ in ra số `0` lù lù trên màn hình thay vì ẩn đi.
- **Bản chất V8:** `0 && ...` gặp `0` (falsy) lập tức short-circuit trả về đúng con số `0`. Nhưng trong React, `0` là một kiểu dữ liệu Number hợp lệ, React liền vẽ số `0` ra DOM!
- **Khắc phục:** Luôn ép điều kiện thành boolean chuẩn: `{count > 0 && <Component />}` hoặc `{Boolean(count) && <Component />}`.

### 7. Cặp đối chiếu: `defaultProps` vs ES6 Default Parameters
- **Góc chọc ngoáy:** Tại sao React 19 chính thức khai tử `Component.defaultProps` trên Function Component?
- **Bản chất:** `defaultProps` đòi hỏi React phải tốn thêm chu trình kiểm tra ngầm ở runtime. Trong khi ES6 Default Parameters (`function Card({ title = "Mặc định" })`) là chuẩn JavaScript gốc, nhẹ hơn, nhanh hơn và tương thích hoàn hảo với TypeScript.

---

## CHƯƠNG 3: STATE, USESTATE & USEREDUCER

### 8. Bẫy State Snapshot & Automatic Batching
- **Góc chọc ngoáy:** *"Tại sao gọi 3 lần `setCount(count + 1)` chỉ tăng 1, nhưng viết `setCount(prev => prev + 1)` 3 lần lại tăng 3?"*
- **Bản chất:**
  - State trong mỗi lần render là một bức ảnh chụp tĩnh (Snapshot) đóng băng. Mọi lời gọi trong cùng event handler đều nhìn thấy giá trị cũ.
  - **Automatic Batching trong React 18+:** Khác với React 17 (chỉ batch trong event handler), React 18 tự động gom mọi state update trong cả `setTimeout`, `Promise`, `fetch` lại để chỉ re-render ĐÚNG 1 LẦN.
  - Functional Update (`prev => prev + 1`) đưa công thức vào hàng đợi (Queue) của Fiber node, cho phép tính toán tuần tự dựa trên giá trị tươi mới nhất.

### 9. Bẫy Lazy State Initialization
- **Góc chọc ngoáy:** Khác biệt giữa `useState(expensiveCalculation())` và `useState(() => expensiveCalculation())`?
- **Bản chất:**
  - `useState(fn())`: Hàm nặng `expensiveCalculation()` sẽ **BỊ CHẠY LẠI Ở MỖI LẦN COMPONENT RE-RENDER**, dù giá trị khởi tạo chỉ dùng ở lần đầu tiên!
  - `useState(() => fn())`: Truyền một hàm khởi tạo (Lazy Initializer). React chỉ thực thi hàm này DUY NHẤT 1 LẦN khi component mount, các lần re-render sau bỏ qua hoàn toàn -> Tối ưu hiệu năng vượt bậc.

### 10. Cặp đối chiếu: `useState` vs `useReducer`
- **Góc chọc ngoáy:** Khi nào thực sự nên chuyển từ `useState` sang `useReducer`?
- **Bản chất:**
  - `useState`: Dành cho state đơn giản, độc lập. Logic cập nhật nằm phân tán trong JSX event handlers.
  - `useReducer`: Dành cho state phức tạp (object nhiều tầng, mảng), nhiều hành động phụ thuộc lẫn nhau. Giúp tách rời UI ra khỏi Business Logic, Reducer là Pure Function nên cực kỳ dễ viết Unit Test độc lập.

---

## CHƯƠNG 4: SỰ KIỆN & FORM HIỆN ĐẠI

### 11. Bẫy Event Delegation trong React 17/18
- **Góc chọc ngoáy:** *"React gắn các Event Listener vào đâu? Ở thẻ DOM thật tương ứng hay ở chỗ khác?"*
- **Bản chất:**
  - React KHÔNG gắn sự kiện vào từng thẻ `<button>` hay `<div>` thật. Nó dùng cơ chế **Event Delegation (Ủy nhiệm sự kiện)**.
  - **React 16 trở về trước:** Gắn toàn bộ sự kiện ở cấp cao nhất là thẻ `document`.
  - **React 17 trở đi:** Gắn sự kiện tại **Node gốc (Root DOM container `<div id="root">`)**.
  - *Tại sao thay đổi?* Để hỗ trợ kiến trúc **Micro-frontends** (chạy nhiều ứng dụng React lồng nhau hoặc nhúng React vào ứng dụng khác mà không bị xung đột sự kiện ở cấp `document`).

### 12. Cặp đối chiếu: Controlled vs Uncontrolled & Tại sao React Hook Form lại nhanh hơn?
- **Controlled:** State giám sát 24/7. Nhược điểm: gõ 1 phím re-render cả form.
- **Uncontrolled (vũ khí của React Hook Form):** RHF sử dụng Uncontrolled inputs bên dưới thông qua `ref`. Dữ liệu do DOM tự giữ, chỉ khi validate lỗi hoặc submit mới kích hoạt re-render -> Gõ phím mượt mà 60 FPS, không tốn tài nguyên.

---

## CHƯƠNG 5: USEREF & VÒNG ĐỜI SIDE EFFECTS (USEEFFECT)

### 13. Cặp đối chiếu: `useRef` vs Biến thường ngoài Component
- **Góc chọc ngoáy:** *"Tại sao không khai báo một biến `let timerId` ở bên ngoài hàm Component mà phải dùng `useRef`?"*
- **Bản chất:**
  - Nếu khai báo biến ngoài Component: Biến đó biến thành **Biến toàn cục (Global variable)** dùng chung cho MỌI instance của Component! Nếu trang web hiển thị 2 thẻ đếm ngược, bấm dừng thẻ này sẽ dừng luôn cả thẻ kia!
  - `useRef`: Tạo ra một "chiếc két sắt" độc lập cho TỪNG INSTANCE riêng biệt của Component, dữ liệu tồn tại xuyên suốt qua các lần re-render mà không kích hoạt vẽ lại màn hình.

### 14. Cặp đối chiếu tử thần: `useEffect` vs `useLayoutEffect`
- **Góc chọc ngoáy:** Khi nào BẮT BUỘC phải dùng `useLayoutEffect`?
- **Bản chất:**
  - `useEffect`: Chạy **BẤT ĐỒNG BỘ SAU KHI trình duyệt đã vẽ (Paint) lên màn hình**. Người dùng đã nhìn thấy giao diện cũ trước, sau đó effect chạy mới đổi -> Gây hiện tượng chớp/nháy giao diện (Visual Flicker).
  - `useLayoutEffect`: Chạy **ĐỒNG BỘ NGAY SAU KHI DOM thay đổi nhưng TRƯỚC KHI trình duyệt vẽ (Pre-Paint)**. Trình duyệt bị chặn (block paint) cho đến khi effect chạy xong -> Dùng để đo đạc kích thước DOM (chiều cao, chiều rộng, tọa độ tooltip) để định vị lại phần tử mà mắt người dùng không bị thấy chớp giật.

### 15. Bẫy StrictMode chạy Effect 2 lần ở môi trường Development
- **Góc chọc ngoáy:** *"Tại sao gọi API trong useEffect lại thấy tab Network bắn 2 request?"*
- **Bản chất:** Trong React 18 StrictMode (chỉ ở môi trường Dev), React cố tình: Mount -> Unmount -> Re-mount để kiểm tra xem lập trình viên có **viết hàm Cleanup function dọn dẹp bộ nhớ** (hủy kết nối WebSocket, xóa `setInterval`, hủy fetch request `AbortController`) hay không. Ở môi trường Production, nó chỉ chạy đúng 1 lần.

### 16. Thứ tự thực thi của Cleanup Function trong `useEffect`
- **Góc chọc ngoáy:** *"Hàm Cleanup chạy khi nào? Có phải chỉ chạy khi Component chết (Unmount)?"*
- **Bản chất:** **KHÔNG CHỈ KHI UNMOUNT!** Trong mỗi lần dependency thay đổi, hàm Cleanup của lần render TRƯỚC sẽ được thực thi NGAY TRƯỚC KHI hiệu ứng của lần render MỚI được chạy! Mục đích: Dọn dẹp tàn dư của quá khứ trước khi nạp dữ liệu mới.

---

## CHƯƠNG 6: TỐI ƯU HIỆU NĂNG (PERFORMANCE)

### 17. Cặp đối chiếu: `useMemo` vs `useCallback`
- **Bản chất:**
  - `useMemo(() => fn(), deps)`: Lưu vào bộ nhớ đệm **KẾT QUẢ** của một phép tính toán nặng.
  - `useCallback(fn, deps)`: Lưu vào bộ nhớ đệm **BẢN THÂN HÀM ĐÓ (Function Instance)** để giữ nguyên địa chỉ ô nhớ qua các lần re-render (ngăn Component con bọc `React.memo` bị re-render oan uổng).
  - Bản chất: `useCallback(fn, deps)` tương đương với `useMemo(() => fn, deps)`.

### 18. Bẫy "Tối ưu hóa ngược" (Premature Optimization)
- **Góc chọc ngoáy:** *"Có nên bọc `useMemo` và `useCallback` cho tất cả mọi hàm và mọi biến không?"*
- **Bản chất:** **TUYỆT ĐỐI KHÔNG!** Việc bọc hook đòi hỏi React phải tốn thêm RAM lưu mảng dependencies và tốn CPU chạy phép so sánh nông ở mỗi lần render. Với các phép tính đơn giản, chi phí chạy hook còn nặng hơn việc tính lại trực tiếp.

### 19. Bẫy `React.memo` bị vô hiệu hóa
- **Hiện tượng:** Component con đã bọc `React.memo` nhưng vẫn bị re-render khi Cha re-render.
- **Nguyên nhân:** Cha truyền xuống một hàm inline `onClick={() => doSomething()}` hoặc một object inline `style={{ color: 'red' }}`. Mỗi lần Cha render, V8 tạo ra một địa chỉ ô nhớ mới tinh. `React.memo` so sánh nông thấy địa chỉ khác nhau nên vẫn cho phép con re-render!
- **Khắc phục:** Bọc hàm bằng `useCallback` và bọc object bằng `useMemo`.

---

## CHƯƠNG 7: STATE NÂNG CAO (CONTEXT, REDUX, ZUSTAND & TANSTACK QUERY)

### 20. Bẫy Re-render hàng loạt của Context API
- **Góc chọc ngoáy:** Tại sao Context API không phải là giải pháp quản lý State toàn cục lý tưởng cho dữ liệu thay đổi liên tục?
- **Bản chất:** Khi một giá trị trong Context Provider thay đổi, **TẤT CẢ các Component con có gọi `useContext` đều bị ép re-render**, bất kể chúng chỉ dùng một trường nhỏ không đổi trong Context đó!
- **Giải pháp hiện đại:** Dùng **Zustand** với cơ chế `Selector` (`useStore(state => state.specificField)`) - chỉ re-render đúng Component nào có trường dữ liệu thực sự thay đổi.

### 21. Cặp đối chiếu: Server State vs Client State
- **Góc chọc ngoáy:** Tại sao không nên nhét dữ liệu API vào Redux/Zustand nữa?
- **Bản chất:**
  - **Client State (Zustand):** Dữ liệu cục bộ của trình duyệt (Theme Dark/Light, trạng thái đóng mở Sidebar, giỏ hàng tạm).
  - **Server State (TanStack Query):** Dữ liệu thuộc về cơ sở dữ liệu trên máy chủ (Danh sách phim, thông tin user). Nó có tính chất: Bất đồng bộ, cần cache, cần refetch khi mất mạng, cần tự động xóa cache khi cũ (Stale time). Dùng TanStack Query giúp giải phóng 80% code Redux cồng kềnh.

---

## CHƯƠNG 8: REACT ROUTER & KIẾN TRÚC THỰC CHIẾN

### 22. Bẫy Lỗi 404 khi tải lại trang (Reload) trên Single Page App
- **Góc chọc ngoáy:** *"Tại sao bấm link `/movies/avatar` thì chạy được, nhưng bấm F5 tải lại trang trên máy chủ Nginx/Vercel thì bị lỗi 404 Not Found?"*
- **Bản chất:** Trong SPA, chỉ có duy nhất 1 file `index.html`. Router chạy ở trình duyệt (Client-side routing). Khi bấm F5, trình duyệt gửi request thật lên máy chủ tìm file vật lý `/movies/avatar/index.html` (không tồn tại).
- **Khắc phục:** Cấu hình máy chủ (Nginx rewrite hoặc `vercel.json` rewrites) chuyển hướng mọi URL về lại file gốc `/index.html` để React Router tự xử lý tiếp.
