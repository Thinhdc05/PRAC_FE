# 📓 SỔ TAY ĐÚC KẾT KIẾN THỨC REACT CHUYÊN SÂU (REACT STUDY NOTES)

---

## 0. Setup dự án chuẩn công nghiệp (Vite & Clean Architecture)

---

### 1. Bản chất Vite & Sự thoái trào của Create-React-App:
- **Nỗi đau của Webpack / CRA:** Khi dự án lớn lên, mỗi lần lưu file (Save), Webpack phải phân tích và đóng gói (bundle) lại toàn bộ hàng nghìn module JS, quạt máy kêu to và phải chờ 5-10s.
- **Vũ khí của Vite (Native ES Modules & Esbuild):**
  - Tận dụng Native ESM có sẵn trên trình duyệt: Trình duyệt cần file nào thì request đúng file đó, không đóng gói trước.
  - Tốc độ khởi động server chỉ trong 0.1 giây, cơ chế Hot Module Replacement (HMR) vá module sống tức thì.

---

### 2. Luồng khởi động 3 bước của ứng dụng React:
- **Bước 1 (`index.html`):** Là file HTML duy nhất của toàn bộ Single Page App (SPA). Chứa cái chậu rỗng `<div id="root"></div>` và thẻ `<script type="module" src="/src/main.jsx"></script>`.
- **Bước 2 (`src/main.jsx`):** Cầu nối giữa Real DOM và React.
  - Lấy cái chậu thật: `document.getElementById('root')`.
  - Khởi tạo gốc Virtual DOM: `createRoot(...)`.
  - Cắm cây component vào chậu: `.render(<StrictMode><App /></StrictMode>)`.
- **Bước 3 (`src/App.jsx`):** Component Tổ tiên (Root Component) bao trọn toàn bộ các component con của ứng dụng.

---

### 3. Cấu trúc thư mục chuẩn sạch (Clean Architecture):
- `src/components/`: Chứa các Component giao diện tái sử dụng (`MovieCard.jsx`, `Modal.jsx`...).
- `src/data/`: Chứa mock data, dữ liệu tĩnh ban đầu.
- Reset CSS toàn cục trong `src/index.css`, xóa bỏ các CSS mặc định gây co cụm bố cục (`place-items: center`).

---

## 1. Tư duy React & Cú pháp JSX (React Mental Model & JSX)

---

### 1. Sự chuyển dịch tư duy: Mệnh lệnh (Imperative) vs Khai báo (Declarative):
- **Nỗi đau của JavaScript thuần (Imperative - Mệnh lệnh "Chỉ tay 5 ngón"):**
  - Khi có một dữ liệu thay đổi (ví dụ giỏ hàng tăng số lượng), lập trình viên phải tự tay viết hàng chục dòng lệnh điều khiển trình duyệt: tìm đích danh từng thẻ DOM (`document.querySelector`), đọc giá trị, tính toán, và gán ngược lại (`innerHTML`, `textContent`).
  - *Hậu quả:* Khi giao diện phình to, việc đồng bộ giữa Dữ liệu và Giao diện trở thành thảm họa. Chỉ cần sửa nhầm 1 class HTML là code JS bị đứt gãy, dẫn đến lỗi lệch giao diện ("số lượng một đằng mà tổng tiền một nẻo").
- **Cuộc cách mạng của React (Declarative - Khai báo "Tôi chỉ cần kết quả"):**
  - React đưa ra triết lý toán học kinh điển: **`UI = f(State)`** *(Giao diện người dùng chỉ là kết quả phản chiếu của Dữ liệu State)*.
  - Lập trình viên không cần quan tâm trên màn hình có bao nhiêu thẻ cần sửa. Ta chỉ cần làm đúng 1 việc: **Cập nhật dữ liệu State**.
  - React tự động tính toán và vẽ lại toàn bộ những nơi cần thiết trên giao diện mà không cần ta phải can thiệp thủ công vào DOM.

---

### 2. Bản chất của JSX (JavaScript XML):
- **JSX thực chất là gì?**
  - JSX KHÔNG PHẢI là HTML, và cũng KHÔNG PHẢI là một ngôn ngữ lập trình độc lập.
  - Nó là một **Cú pháp mở rộng (Syntax Extension)** của JavaScript, đóng vai trò là một **Ngôn ngữ mô tả giao diện (UI Description Language)**.
  - Nó mượn hình hài trực quan của thẻ HTML (`<div>`, `<h1>`, `<button>`) để lập trình viên dễ hình dung cấu trúc giao diện, nhưng bên dưới lại sở hữu trọn vẹn 100% sức mạnh logic tính toán của JavaScript.
- **Dưới nắp ca-pô (Compiler Transformation):**
  - Trình duyệt và V8 Engine hoàn toàn không hiểu cú pháp thẻ nhọn đứng giữa code JS (`SyntaxError: Unexpected token '<'`).
  - Trước khi chạy, trình biên dịch (Babel hoặc SWC trong Vite) sẽ âm thầm chuyển hóa dòng JSX thành hàm JavaScript thuần túy:
    ```jsx
    // Mã JSX ta viết:
    const element = <h1 className="title">Xin chào</h1>;

    // Mã JavaScript thực tế sau khi dịch:
    const element = React.createElement("h1", { className: "title" }, "Xin chào");
    ```
  - Cặp thẻ nhọn thực chất chỉ là một "vỏ bọc đường" (Syntactic Sugar) giúp giấu đi các lời gọi hàm `React.createElement()` dài dòng và rối mắt.

---

### 3. Bản chất Virtual DOM & Chu trình 3 bước (Render -> Diffing -> Commit):
- **Virtual DOM trong RAM là cái gì?**
  - Khi hàm `React.createElement()` chạy xong, nó KHÔNG hề tạo ra thẻ HTML thật. Nó chỉ trả về một **Plain JavaScript Object thông thường cực kỳ nhẹ nằm trong bộ nhớ RAM**:
    ```javascript
    {
      type: 'h1',
      props: { className: 'title', children: 'Xin chào' }
    }
    ```
  - Cây lồng ghép của hàng nghìn Object JavaScript này trong RAM chính là **Virtual DOM (DOM ảo)**.
- **Ẩn dụ đời thực:**
  - *Real DOM:* Giống ngôi nhà gạch vữa bê tông thật ngoài đời. Muốn sửa cái bàn mà đập cả bức tường ra xây lại thì cực kỳ tốn công và tốn chi phí (chuỗi tính toán Reflow -> Repaint rất nặng của trình duyệt).
  - *Virtual DOM:* Giống bản vẽ thiết kế trên tờ giấy A4 trong RAM. Tẩy xóa sửa chữa trên giấy chỉ tốn 0.1 mili-giây nhẹ tênh.
- **Chu trình 3 bước cập nhật giao diện:**
  1. **Bước 1: Render (Tính toán bản vẽ mới trong RAM):** React gọi hàm Component để tính toán và sinh ra cây Virtual DOM mới. Chú ý: "Render" trong React chỉ là tính toán Object trong RAM, chưa hề vẽ lên màn hình!
  2. **Bước 2: Diffing (Soi kính lúp tìm vết khác biệt):** React chạy thuật toán Diffing Algorithm so sánh cây Virtual DOM cũ và mới, tìm ra đúng những điểm khác biệt tối thiểu.
  3. **Bước 3: Commit (Vá Real DOM):** React chỉ tác động đúng những node DOM thật có sự thay đổi (ví dụ chỉ sửa đúng 1 con số tỷ số), giữ nguyên 99% các thẻ còn lại, sau đó trình duyệt vẽ lại (Paint) nhẹ nhàng với tốc độ 60 FPS.
- **Bẫy phỏng vấn Senior (Virtual DOM có thực sự "nhanh hơn DOM thật" không?):**
  - *Đáp án chuẩn:* **KHÔNG!** Thao tác DOM trực tiếp được tối ưu thủ công bằng tay trong JS thuần luôn chạy nhanh hơn Virtual DOM vì React phải tốn thêm RAM tạo Object và tốn CPU chạy thuật toán Diffing.
  - *Giá trị thực sự của Virtual DOM:* Mang lại **Hiệu năng có thể dự đoán được (Predictable Performance)** cho các dự án khổng lồ, và giải phóng sức lao động giúp lập trình viên viết code theo lối Khai báo thanh lịch.

---

### 4. Bốn quy tắc bất di bất dịch của cú pháp JSX:
- **1. Quy tắc 1 thẻ cha bao bọc & Sự cứu cánh của React Fragment (`<>...</>`):**
  - *Tại sao bị cấm viết 2 thẻ đứng cạnh nhau?* Dưới nắp ca-pô, JSX bị dịch thành các hàm `React.createElement()`. Trong JavaScript, một lệnh `return` KHÔNG THỂ trả về 2 giá trị độc lập cùng một lúc (`return A B;` là lỗi cú pháp JS cơ bản).
  - *Giải pháp Fragment:* Dùng cặp thẻ rỗng `<> ... </>` làm "chiếc túi nilon trong suốt" gom các phần tử lại cho lệnh `return` mang đi. Khi ra Real DOM, React tự động gỡ bỏ chiếc túi này, không để lại bất kỳ thẻ `<div>` thừa thãi nào làm hỏng layout CSS.
- **2. Quy ước đặt tên thuộc tính (`className`, `htmlFor`):**
  - JSX dịch ra Object JS (`{ className: "title" }`). Trong JavaScript, **`class`** (khai báo Class OOP) và **`for`** (vòng lặp) là **từ khóa bảo lưu (Reserved Keywords)**. Để tránh xung đột cú pháp, React đổi thành `className` và `htmlFor`.
- **3. Cặp ngoặc nhọn `{}`: Cánh cổng thần kỳ đưa JavaScript sống vào giao diện:**
  - Đứng ngoài ngoặc nhọn là ngôn ngữ mô tả giao diện. Mở ngoặc nhọn `{ ... }` là bước vào lãnh địa JavaScript thuần túy: tính toán cộng trừ, gọi hàm, biến số.
  - *Bẫy biểu thức (Expression) vs Câu lệnh (Statement):* Bên trong `{}` chỉ được chứa **Biểu thức (thứ sinh ra một giá trị)** vì nó nằm trong tham số của hàm `createElement`. Tuyệt đối cấm tiệt nhét câu lệnh `if...else` hay vòng lặp `for` vào trong `{}`. Đó là lý do ta luôn dùng **Toán tử 3 ngôi `? :`** và hàm mảng **`.map()`**.
- **4. Quy tắc thẻ tự đóng (Self-closing tags):**
  - Mọi thẻ mở trong JSX bắt buộc phải có thẻ đóng, hoặc phải tự đóng bằng dấu gạch chéo ở cuối: `<img src="..." />`, `<input type="..." />`, `<br />`, `<hr />`. Quên dấu `/` sẽ bị Compiler quăng lỗi đỏ sập dự án ngay lập tức.

---

## 2. Component, Props & Render có điều kiện (Khối Lego giao diện)

---

### 1. Function Component & Bản chất của quy tắc PascalCase:
- **Component thực chất là gì?**
  - Một Component trong React chỉ là một **hàm JavaScript bình thường** trả về một bản vẽ JSX (`UI = f(Data)`).
  - Khác với hàm JS thuần trả về chuỗi HTML string (`innerHTML`), Component trả về các Virtual DOM Object sống động trong RAM.
- **Dưới nắp ca-pô Compiler (Tại sao bắt buộc phải viết hoa chữ cái đầu - PascalCase?):**
  - Compiler (Babel / SWC) phân biệt giữa thẻ HTML nội sinh và Component dựa trên chữ cái đầu tiên:
    - **Viết chữ thường (`<button />`, `<movieCard />`):** Compiler biên dịch thành `React.createElement("button")` (Chuỗi string). Trình duyệt tìm trong từ điển HTML5, không có thẻ nào tên là `movieCard` -> sinh ra thẻ rỗng vô nghĩa, code component bên trong không bao giờ được gọi.
    - **Viết hoa PascalCase (`<MovieCard />`):** Compiler giữ nguyên biến tham chiếu `React.createElement(MovieCard)` (Identifier hàm không có nháy kép). React sẽ trực tiếp thực thi hàm `MovieCard()` để lấy ra bản vẽ JSX.
- **Quy tắc Return:**
  - Component có thể trả về: JSX, `null` (ẩn hoàn toàn, không vẽ gì ra DOM), chuỗi/số, hoặc một mảng các phần tử JSX.
  - *Bẫy phổ biến:* Quên lệnh `return` khiến hàm trả về `undefined`, React ném lỗi đỏ ngay lập tức.

---

### 2. Props & Cú pháp Destructuring sạch đẹp:
- **Bản chất của Props trong JavaScript:**
  - Props (viết tắt của Properties) thực chất chính là **tham số đầu vào của hàm Component**.
  - Dưới nắp ca-pô, dù bạn có viết 10 hay 100 thuộc tính trên thẻ JSX (`<MovieCard title="Avatar" year={2022} isHD={true} />`), Compiler luôn đóng gói tất cả thành **một Plain JavaScript Object duy nhất** và nhét vào tham số đầu tiên của hàm:
    ```javascript
    React.createElement(MovieCard, { title: "Avatar", year: 2022, isHD: true });
    ```
- **Quy tắc ngoặc nhọn `{}` vs Nháy kép `""`:**
  - Chuỗi text đơn giản: dùng nháy kép `title="Avatar"`.
  - Mọi kiểu dữ liệu còn lại của JS (Number, Boolean, Array, Object, Function): bắt buộc dùng cặp ngoặc nhọn `{}` (`year={2022}`, `genres={["Hành động"]}`, `onClick={() => play()}`).
- **Kỹ thuật Destructuring chuẩn mực:**
  - Thay vì lặp lại `props.title`, `props.year`, ta dùng Object Destructuring bóc tách trực tiếp ngay tại danh sách tham số:
    ```jsx
    function MovieCard({ title, year, isHD }) { ... }
    ```
- **Dòng dữ liệu một chiều (One-Way Data Flow):**
  - Dữ liệu luôn chảy theo một chiều duy nhất: từ Cha truyền xuống Con thông qua Props (như thác nước đổ từ trên cao). Con không được tự ý gửi đè dữ liệu ngược lên Cha qua Props.

---

### 3. Bản chất Immutability của Props & Triết lý Pure Function:
- **Tại sao Props là Read-Only (Chỉ đọc)?**
  - Khi bạn cố tình sửa đổi thuộc tính trực tiếp (`props.title = "Mới"`), trình duyệt ném lỗi `TypeError: Cannot assign to read only property...`.
  - *Cơ chế V8:* Ở chế độ phát triển, React chạy lệnh `Object.freeze(props)` trước khi trao Object này cho Component. Toàn bộ vùng nhớ của Props bị đóng băng vĩnh viễn trong RAM.
- **Ẩn dụ chiếc vé xem phim:**
  - Rạp chiếu phim in vé đưa cho bạn (Props). Bạn không được lấy bút tẩy xóa sửa số ghế (không mutate props). Nếu bạn muốn ghi chú, hãy lấy cuốn sổ tay riêng của mình ra viết (tạo biến cục bộ mới).
- **Triết lý Hàm thuần khiết (Pure Function):**
  - Công thức: `UI = f(Props)`.
  - Một Component phải luôn là hàm thuần khiết: Cùng một input Props -> Luôn luôn sinh ra cùng một output UI, và tuyệt đối không gây Side Effects làm biến đổi môi trường bên ngoài.
  - Muốn biến đổi dữ liệu? **Tạo ra biến phái sinh mới (Derived Value)**, không bao giờ được mutate props gốc.

---

### 4. Props mặc định (Default Values) & Chiếc hộp ma thuật `props.children`:
- **Default Values (Giá trị mặc định an toàn):**
  - Tận dụng Default Parameters của ES6 ngay khi destructuring:
    ```jsx
    function MovieCard({ title, year = "Chưa rõ", posterUrl = "/no-poster.jpg" }) { ... }
    ```
  - Nếu Cha không truyền hoặc truyền `undefined`, V8 tự động fallback về giá trị mặc định, ngăn chặn hoàn toàn lỗi vỡ giao diện (`broken image`).
- **Chiếc hộp ma thuật `props.children` (Slot Pattern / Component Composition):**
  - `children` là một **từ khóa định danh mặc định (reserved prop)** của React.
  - Mọi thứ được kẹp ở giữa 2 thẻ mở `<Box>` và thẻ đóng `</Box>` đều được React tự động gán vào biến `props.children`.
  - Giúp xây dựng các Component bao bọc (Wrapper / Card / Modal) có khả năng tái sử dụng vô tận: Vỏ khung giữ nguyên thiết kế (viền, đổ bóng, nút đóng), còn phần ruột bên trong linh hoạt biến hóa tùy ý cha nhét vào.

---

### 5. Render có điều kiện (Conditional Rendering) & Chiếc bẫy số 0 (The Zero Trap):
- **Tại sao không viết được câu lệnh `if...else` trong JSX?**
  - Cặp ngoặc nhọn `{}` chỉ nhận Biểu thức (Expression - trả về giá trị). Câu lệnh `if` là Statement (không sinh ra giá trị), do đó gây lỗi cú pháp.
- **Hai vũ khí chủ lực:**
  - *Toán tử 3 ngôi (`condition ? <TrueUI /> : <FalseUI />`):* Dùng khi chọn 1 trong 2 nhánh giao diện khác nhau (VIP vs Thường).
  - *Toán tử Logic AND (`condition && <UI />`):* Dùng khi điều kiện đúng thì hiện, điều kiện sai thì ẩn biến mất hoàn toàn. React tự động bỏ qua không vẽ các giá trị `false`, `null`, `undefined`.
- **Chiếc bẫy kinh điển: "Bẫy số 0" (The Zero Trap):**
  - *Hiện tượng:* `{unreadCount && <span>...</span>}` khi `unreadCount = 0` sẽ in con số `0` to tướng lên màn hình thay vì ẩn đi.
  - *Nguyên nhân V8:* Trong JS, `0 && ...` gặp `0` (falsy) lập tức short-circuit trả về đúng con số `0`. Nhưng trong React, `0` là một kiểu dữ liệu Number hợp lệ, React liền vẽ số `0` ra DOM!
  - *Khắc phục chuẩn:* Luôn ép điều kiện thành kiểu Boolean thực thụ (`unreadCount > 0 && ...` hoặc `Boolean(unreadCount) && ...`).

---

### 6. Render danh sách với `.map()` & Bí mật sinh tử của thuộc tính `key`:
- **Tại sao dùng `.map()` mà không dùng `forEach`?**
  - `forEach` trả về `undefined`, không vẽ được gì ra giao diện.
  - `.map()` chuyển hóa mảng dữ liệu thô thành một **mảng mới chứa các phần tử JSX**, React tự động giải nén mảng này để render liên tiếp lên màn hình.
- **Thuộc tính `key` - Thẻ Căn Cước Công Dân (CCCD) của Virtual DOM:**
  - `key` giúp thuật toán Diffing Algorithm của React nhận diện danh tính độc nhất của từng phần tử qua các lần render.
  - Khi thêm/xóa phần tử ở đầu mảng, nhờ có `key`, React chỉ cần tạo mới đúng 1 node DOM và tái sử dụng toàn bộ các node cũ, đảm bảo tốc độ 60 FPS mượt mà.
- **Chiếc bẫy dùng `key={index}` (Index as Key Anti-pattern):**
  - Chỉ số `index` (0, 1, 2) chỉ phản ánh vị trí tạm thời trong mảng, không phản ánh danh tính của dữ liệu.
  - Khi xóa một phần tử ở đầu, các phần tử phía sau bị đôn lên nhận index mới, khiến React giữ nhầm state nội bộ (ô checkbox, form input...) của phần tử cũ gán sang phần tử mới -> Dữ liệu hiển thị sai lệch tai hại.
  - *Quy tắc sống còn:* Luôn dùng ID duy nhất và ổn định từ cơ sở dữ liệu (`movie.id`). Chỉ dùng `index` khi danh sách là tĩnh 100%, không bao giờ sắp xếp, thêm hay xóa.

---

## 3. State, `useState`, `useReducer` & Thinking in React (Trái tim tương tác)

---

### 1. Khái niệm State & Tại sao biến thường `let` không làm React vẽ lại giao diện?
- **Nỗi đau của biến thường `let likes = 0`:**
  - 1. *Không có còi báo động (No Trigger):* V8 tăng biến trong RAM nhưng React không có cơ chế giám sát biến thường, do đó không kích hoạt chu trình Re-render.
  - 2. *Bị xóa sổ khi hàm chạy lại:* Kể cả khi có re-render, hàm Component được gọi lại từ dòng 1, dòng `let likes = 0` lại được thực thi và reset dữ liệu về 0. Biến cục bộ bốc hơi khỏi Call Stack sau mỗi lần hàm chạy xong.
- **Hook `useState(initialValue)`:**
  - Trả về mảng 2 phần tử `[state, setState]` thông qua cú pháp Array Destructuring để tự do đặt tên.
  - Giá trị state được lưu ở vùng nhớ Heap ngoài vòng đời của hàm (React Fiber node).
  - Hàm `setState` nhận giá trị mới, lưu vào ngăn kéo và phát tín hiệu Re-render gọi lại Component.

---

### 2. Bản chất cú pháp của hàm `set`:
- **Công thức vàng:** `setTenState( Biểu thức tính ra GIÁ TRỊ MỚI )`.
- Đối số bên trong `set(...)` luôn luôn là một **Biểu thức (Expression)** tính toán ra giá trị mới (số mới, chuỗi mới, Object mới, Array mới).
- **Chiếc bẫy Arrow Function trong sự kiện `onClick`:**
  - `onClick={setLikes(likes + 1)}` (Có ngoặc tròn): Hàm bị JavaScript thực thi ngay lập tức khi render -> Gây vòng lặp vô tận (Infinite Loop Crash: *"Too many re-renders"*).
  - `onClick={() => setLikes(likes + 1)}` (Bọc trong arrow function): Đóng gói câu lệnh vào hộp, chỉ mở hộp thực thi khi người dùng **thực sự click chuột**.

---

### 3. Quy tắc Bất biến (Immutability) khi cập nhật State:
- **Tại sao dùng `.push()` hay gán đè thuộc tính thì React "trơ như đá"?**
  - Mảng và Object là kiểu Tham chiếu (Reference Type) lưu trong bộ nhớ Heap.
  - Khi dùng `watchlist.push(item)`, phần ruột thay đổi nhưng địa chỉ ô nhớ (`0xAA11`) giữ nguyên.
  - Phép so sánh nông (Shallow equality) của React: `0xAA11 === 0xAA11` -> React thấy địa chỉ không đổi nên kết luận dữ liệu không thay đổi và hủy bỏ việc vẽ lại!
- **Bộ ba quyền lực cập nhật Mảng:**
  - *Thêm:* `[...oldArray, newItem]` (Tạo mảng mới tinh với Spread Operator).
  - *Xóa:* `oldArray.filter(item => item.id !== idCanXoa)` (Trả về mảng mới đã lọc bỏ phần tử).
  - *Sửa:* `oldArray.map(item => item.id === id ? { ...item, isWatched: !item.isWatched } : item)`.
- **Cập nhật Object:**
  - `setFilters({ ...filters, [fieldName]: newValue })` (Sao chép toàn bộ thuộc tính cũ bằng Spread `{...}` để tránh bị bốc hơi các trường khác).

---

### 4. Triết lý State Snapshot & Cập nhật dạng hàm (`prev => ...`):
- **Bản chất Snapshot (Bức ảnh chụp tĩnh):**
  - Trong mỗi lần render, State giống như một bức ảnh chụp tĩnh đã bị đóng băng tại thời điểm đó.
  - Gọi `setLikes(likes + 1)` liên tiếp 3 lần trong cùng 1 hàm: cả 3 dòng đều nhận `likes = 0`, trở thành `setLikes(0 + 1)`. Đồng thời React có cơ chế **Batching (Gom cụm)** đợi hàm chạy xong mới render 1 lần duy nhất với giá trị `1`.
- **Vũ khí Functional Update (`prev => ...`):**
  - Thay vì truyền giá trị trực tiếp, ta truyền một công thức tính: `setLikes(prev => prev + 1)`.
  - React đưa các hàm này vào Hàng đợi (Queue), lần lượt lấy kết quả của hàm trước làm đầu vào (`prev`) cho hàm sau.
- **Hai tình huống bắt buộc phải dùng `prev => ...` trong thực tế:**
  - *1. Toggle trạng thái Boolean:* `setIsOpen(prev => !prev)` (Tự động đảo ngược trạng thái trước đó một cách an toàn mà không cần quan tâm giá trị hiện tại).
  - *2. Tác vụ Bất đồng bộ (Async / `setTimeout` / API):* Trong `setTimeout`, biến state gốc bị kẹt ở giá trị cũ của quá khứ (Stale Closure). Dùng `prev => ...` đảm bảo luôn đọc được giá trị mới nhất trong ngăn kéo tại thời điểm hàm hẹn giờ thức dậy.

---

### 5. Tư duy "Thinking in React" & Kỹ thuật Kéo State lên cha (Lifting State Up):
- **Vấn đề "Hai hòn đảo cô lập":**
  - Hai Component anh em ruột (`SearchBar` và `MovieList`) không thể nói chuyện ngang hàng hoặc tự ý bắn dữ liệu sang cho nhau (Quy tắc One-Way Data Flow).
- **Kỹ thuật Kéo State lên cha (Lifting State Up):**
  - Tìm **Tổ tiên chung gần nhất (Nearest Common Ancestor)** của cả hai (thường là `App`).
  - Nhấc bổng State đặt lên Component Cha.
  - Cha làm "trạm trung chuyển": truyền giá trị state và hàm cập nhật (callback function) xuống cho các con qua Props.
- **Quy tắc vàng về Giá trị phái sinh (Derived State):**
  - *"Nếu một giá trị có thể tính toán được trực tiếp từ State hoặc Props có sẵn, TUYỆT ĐỐI KHÔNG TẠO THÊM STATE CHO NÓ"*.
  - Ví dụ: `filteredMovies = movies.filter(...)` hoặc `totalPrice = cart.reduce(...)` -> Tính trực tiếp trong hàm khi render, không bao giờ dùng `useState(filteredMovies)` để tránh lỗi lệch dữ liệu.

---

### 6. Hook `useReducer` – Quản lý State phức tạp (Phương pháp sư phạm 4 bước chuẩn mực):
- **Khi nào dùng `useState` vs `useReducer`?**
  - Cả hai đều sinh ra để quản lý State của Component. Bài toán nào giải được bằng `useState` thì cũng giải được bằng `useReducer` và ngược lại.
  - *Dùng `useState`:* Khi State đơn giản (kiểu nguyên thủy: số, chuỗi, boolean; mảng/object 1 tầng ít logic).
  - *Dùng `useReducer`:* Khi State phức tạp (Object lồng nhau nhiều tầng, nhiều nhánh hành động rẽ nhánh: thêm, sửa, xóa, lọc...).

---

#### 1. Bảng đối chiếu quy trình: `useState` (3 bước) vs `useReducer` (4 bước):
- **Với `useState` (3 bước):**
  1. *Init state:* `const [count, setCount] = useState(0)` (khởi tạo bằng 0).
  2. *Action:* Kích hoạt hàm set khi click: `() => setCount(count + 1)`.
  3. *Re-render:* State đổi -> Vẽ lại giao diện.
- **Với `useReducer` (Nâng cấp lên 4 bước chuẩn mực):**
  1. *BƯỚC 1 - Init state:* Khởi tạo giá trị ban đầu (`const initState = 0;`).
  2. *BƯỚC 2 - Actions:* Định nghĩa danh sách các hành động có thể xảy ra:
     ```javascript
     const UP_ACTION = 'up';
     const DOWN_ACTION = 'down';
     ```
  3. *BƯỚC 3 - Reducer:* Viết hàm chế biến dữ liệu `reducer(state, action)`:
     ```javascript
     const reducer = (state, action) => {
       switch (action) {
         case UP_ACTION:
           return state + 1;
         case DOWN_ACTION:
           return state - 1;
         default:
           throw new Error('Action không hợp lệ!');
       }
     };
     ```
  4. *BƯỚC 4 - Dispatch:* Kích hoạt hành động bên trong Component:
     ```jsx
     const [count, dispatch] = useReducer(reducer, initState);
     // Khi click nút:
     <button onClick={() => dispatch(UP_ACTION)}>Tăng (+)</button>
     ```

---

#### 2. Luồng chạy dữ liệu dưới nắp ca-pô (Data Flow):
```text
[ NGƯỜI DÙNG BẤM NÚT ] -> [ GỌI DISPATCH(ACTION) ] -> [ REACT GỌI REDUCER(STATE, ACTION) ]
                                                                     |
                                                                     v
[ VẼ LẠI GIAO DIỆN (UI) ] <--------- [ TRẢ VỀ STATE MỚI (NEW STATE) ]
```

---

#### 3. Bước nhảy vọt: Nâng cấp lên bài toán To-Do List (Action có Payload):
Khi chuyển từ bài đếm số sang To-Do List, một hành động không chỉ có cái tên (Type), mà nó còn phải **mang theo DỮ LIỆU ĐI KÈM (Payload)**:
- **BƯỚC 1: Init State (Object 2 trường):**
  ```javascript
  const initState = {
    job: '',     // Chữ đang gõ trong ô input
    jobs: []     // Danh sách các việc
  };
  ```
- **BƯỚC 2: Actions & Action Creators (Hàm đóng gói dữ liệu):**
  ```javascript
  const SET_JOB = 'set_job';
  const ADD_JOB = 'add_job';
  const DELETE_JOB = 'delete_job';

  const setJob = payload => ({ type: SET_JOB, payload });
  const addJob = payload => ({ type: ADD_JOB, payload });
  const deleteJob = payload => ({ type: DELETE_JOB, payload });
  ```
- **BƯỚC 3: Reducer (Xử lý cập nhật bất biến):**
  ```javascript
  const reducer = (state, action) => {
    switch (action.type) {
      case SET_JOB:
        return { ...state, job: action.payload };
      case ADD_JOB:
        return {
          ...state,
          jobs: [...state.jobs, action.payload],
          job: '' // Tự động xóa sạch ô input sau khi thêm
        };
      case DELETE_JOB:
        return {
          ...state,
          jobs: state.jobs.filter((_, index) => index !== action.payload)
        };
      default:
        throw new Error('Action không hợp lệ!');
    }
  };
  ```
- **BƯỚC 4: Component & Dispatch (JSX trắng sạch không còn logic bẩn):**
  ```jsx
  function TodoApp() {
    const [state, dispatch] = useReducer(reducer, initState);
    const { job, jobs } = state;

    return (
      <div>
        <input 
          value={job} 
          onChange={e => dispatch(setJob(e.target.value))} 
        />
        <button onClick={() => dispatch(addJob(job))}>Thêm</button>
        <ul>
          {jobs.map((item, index) => (
            <li key={index}>
              {item}
              <button onClick={() => dispatch(deleteJob(index))}>Xóa</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  ```
- **Giá trị cốt lõi:** Tách biệt 100% **Giao diện (UI)** ra khỏi **Não bộ xử lý (Business Logic)**. Giao diện chỉ việc dispatch hành động, còn toàn bộ việc mutate/tính toán mảng được cô lập hoàn toàn trong Reducer!
- **Quy tắc bất biến của Reducer:** Reducer phải luôn là **Hàm thuần khiết (Pure Function)**: Tuyệt đối không gọi API, không dùng `Math.random()`, không dùng `Date.now()` bên trong Reducer.

---

### 7. Cặp bài toán kinh điển: Radio (Single) vs Checkbox (Multiple) & Chiếc cầu dẫn tới To-Do List:
- **Bài toán 1: Radio - Tại sao cấm dùng thuộc tính `name` của HTML?**
  - *Hiểm họa của `name="course"`:* Trình duyệt tự động gom các input có cùng name trên toàn bộ trang. Nếu Component được tái sử dụng 2 lần ở 2 nơi khác nhau, click ở component này sẽ làm nhảy tick ở component kia (Xung đột Name/ID toàn cục). Hơn nữa, trạng thái checked do DOM thật nắm giữ, React hoàn toàn "mù" (Uncontrolled).
  - *Tư duy Controlled với ID duy nhất:* Tước bỏ quyền của DOM, giao quyền cho State `const [checkedId, setCheckedId] = useState(1)`.
  - *Công thức kiểm tra:* `checked={checkedId === course.id}` và `onChange={() => setCheckedId(course.id)}`. Chỉ 1 biểu thức Boolean duy nhất quyết định giao diện!
- **Bài toán 2: Checkbox - Bước nhảy vọt từ Giá trị đơn sang Mảng (Multiple Selection):**
  - Người dùng có thể chọn nhiều mục -> State bắt buộc phải là một Mảng: `const [checkedIds, setCheckedIds] = useState([])`.
  - *Kiểm tra hiển thị:* Dùng phương thức mảng `checked={checkedIds.includes(course.id)}`.
  - *Cơ chế Toggle (Immutability):*
    ```javascript
    setCheckedIds(prev => {
      const isChecked = prev.includes(id);
      return isChecked 
        ? prev.filter(item => item !== id) // Đã có -> Gỡ ra (Tạo mảng mới không chứa id này)
        : [...prev, id];                  // Chưa có -> Thêm vào (Tạo mảng mới nhét id vào cuối)
    });
    ```
- **Bài toán 3: Chiếc cầu dẫn tới To-Do List:**
  - To-Do List chính là sự kết hợp của tư duy mảng ở trên:
    - *Thêm việc:* `setJobs(prev => [...prev, job])` (Giống thêm id vào checkbox).
    - *Xóa việc:* `setJobs(prev => prev.filter((_, i) => i !== indexToDelete))` (Giống gỡ id khỏi checkbox).
    - *Đánh dấu hoàn thành (Toggle Done):* `setJobs(prev => prev.map((item, i) => i === index ? { ...item, completed: !item.completed } : item))`.

---

## 4. Xử lý sự kiện (Event Handling) & Form hiện đại

---

### 1. Synthetic Events (Hệ thống sự kiện tổng hợp):
- **Bản chất của SyntheticEvent:**
  - Là một lớp vỏ bọc trừu tượng (Wrapper) do React tạo ra để bao bọc các sự kiện DOM thật của trình duyệt (Native DOM Events).
  - *Giá trị thực tế:* Cung cấp một API nhất quán 100% trên mọi trình duyệt (Cross-browser compatibility), ngăn chặn các lỗi lệch hành vi giữa Chrome, Safari, Firefox.
  - Vẫn giữ nguyên các phương thức kinh điển: `e.preventDefault()` (chặn hành vi mặc định của trình duyệt), `e.stopPropagation()` (chặn sự kiện nổi bọt - Event Bubbling), `e.target.value` (đọc dữ liệu người dùng nhập).
- **Quy ước cú pháp JSX:**
  - Luôn dùng chuẩn Lạc đà (camelCase): `onClick`, `onChange`, `onSubmit`, `onKeyDown`.
  - Luôn truyền **Hàm tham chiếu** (không có dấu ngoặc tròn `()`), tránh để hàm bị thực thi ngay khi vừa render.

---

### 2. Ba kỹ thuật truyền tham số vào Event Handler:
- **Trường hợp 1 (Không tham số ngoài):**
  - `<button onClick={handleClick}>Bấm</button>`
  - React tự động truyền đối tượng sự kiện `e` vào làm tham số đầu tiên của hàm `handleClick(e)`.
- **Trường hợp 2 (Cần truyền thêm dữ liệu riêng - ví dụ ID):**
  - Cấm viết: `onClick={handleClick(id)}` (sẽ bị chạy ngay lập tức khi vẽ giao diện).
  - Chuẩn: `<button onClick={() => handleClick(movie.id)}>Xóa</button>` (Bọc trong Arrow Function để chỉ chạy khi người dùng thực sự click chuột).
- **Trường hợp 3 (Vừa cần lấy sự kiện `e`, vừa cần truyền ID):**
  - `<button onClick={(e) => handleClick(e, movie.id)}>Xóa</button>`
  - Cho phép gọi `e.stopPropagation()` để chặn nổi bọt lên thẻ cha.

---

### 3. Controlled Components (Form có kiểm soát) vs Uncontrolled Components:
- **Uncontrolled Component (Form "Thả rông" / Hộp thư góp ý):**
  - Trình duyệt tự lưu trữ giá trị trong DOM thật. React không biết giá trị bên trong ô input là gì cho đến khi người dùng bấm nút Submit và ta đọc qua `ref.current.value`.
  - Khó kiểm tra lỗi tức thì, không thể tự động kích hoạt/vô hiệu hóa nút bấm theo thời gian thực.
- **Controlled Component (Form "Giám sát 24/7" / Chiếc gương soi):**
  - Ô input không được tự giữ dữ liệu, mà phải phản chiếu 100% dữ liệu từ React State.
  - Công thức 2 chiều: `value={state}` kết hợp `onChange={(e) => setState(e.target.value)}`.
  - *Siêu năng lực:* Kiểm tra lỗi tức thì (Instant Validation), vô hiệu hóa nút Submit khi chưa điền đủ thông tin, tìm kiếm tự động theo từng phím gõ (Live Search).

---

### 4. Thư viện Form hiện đại: React Hook Form + Zod Schema:
- **Nỗi đau khi làm Form thủ công bằng `useState`:**
  - Quá nhiều boilerplate: Form 10 trường cần 10 biến state và 10 biến error state.
  - Vấn đề hiệu năng: Mỗi phím gõ gây re-render toàn bộ cả component form, dẫn đến lag giật khi form lớn.
  - Khó khăn khi viết Regex kiểm tra email, mật khẩu thủ công.
- **Giải pháp chuẩn doanh nghiệp:**
  - **React Hook Form (RHF):** Quản lý form siêu tốc, gõ phím mượt mà 60 FPS mà không gây re-render thừa. Gắn vào input siêu gọn bằng `<input {...register("email")} />`.
  - **Zod Schema:** Định nghĩa bộ luật kiểm tra dữ liệu bằng cú pháp khai báo tiếng Việt trực quan (`z.string().email(...)`, `z.string().min(8, ...)`). Tự động chặn dữ liệu bẩn và hiển thị thông báo lỗi chính xác.

---

### 5. Điểm sáng React 19: Form Actions & Hook `useActionState`:
- **Thuộc tính `action` trên thẻ `<form>`:**
  - Cho phép truyền trực tiếp một hàm bất đồng bộ (Async Function) vào `action={handleSubmit}`.
  - Tự động gom dữ liệu vào `formData`, tự động loại bỏ sự cần thiết của `e.preventDefault()`.
- **Hook `useActionState`:**
  - `const [state, formAction, isPending] = useActionState(asyncActionFn, initialValue)`.
  - Tự động cung cấp cờ **`isPending`** (tự thành `true` khi đang gửi API, và `false` khi xong) để khóa nút bấm và hiển thị trạng thái "Đang gửi...", xóa bỏ hoàn toàn boilerplate `try/catch/finally` và `useState(isLoading)`.

---

## 5. Vòng đời Component, Side Effects & Hook `useEffect` (Trái tim kết nối thế giới ngoài)

---

### 1. Bản chất Side Effects & "Bản hợp đồng một việc" của Component:
- **Bản hợp đồng thiêng liêng:** Component chỉ có đúng một nhiệm vụ duy nhất là nhận Props/State và tính toán ra bản vẽ Virtual DOM (JSX) trong RAM nhanh nhất có thể theo công thức thuần khiết: `UI = f(Data)`.
- **Side Effects (Tác vụ phụ / Phản ứng phụ) là gì?**
  - Là tất cả những tác vụ tương tác với thế giới bên ngoài vượt ra khỏi phạm vi tính toán JSX: Gọi API (Fetch/Axios), chọc vào Real DOM (`document.title`), đặt bộ đếm giờ (`setTimeout`, `setInterval`), lắng nghe sự kiện toàn cục (`window.addEventListener`), ghi dữ liệu vào `localStorage`.
- **Thảm họa "Infinite Fetch Loop" nếu viết API giữa thân hàm:**
  - Viết `fetch()` trực tiếp trong thân hàm -> API trả về gọi `setState` -> Kích hoạt Re-render -> Hàm chạy lại từ đầu -> Lại `fetch()` -> Lại `setState`... -> Đánh sập tab trình duyệt và DDoS server!
- **Trục thời gian 3 pha sống còn (Timeline):**
  ```text
  [ PHA 1: RENDER ]         -->   [ PHA 2: BROWSER PAINT ]   -->   [ PHA 3: USE EFFECT ]
  Tính toán Virtual DOM           Trình duyệt vẽ giao diện         Hậu trường: React mới âm thầm
  nhanh chóng trong RAM.          lên màn hình cho User xem.       chạy các tác vụ phụ trong useEffect
  ```
  - *Ý nghĩa:* Tách biệt việc vẽ giao diện giúp web luôn đạt 60 FPS mượt mà, người dùng thấy khung giao diện ngay lập tức mà không bị đơ giật do mạng chậm.

---

### 2. Ba cấp độ Dependencies (Mảng phụ thuộc):
Cú pháp tổng quát: `useEffect(callback, [dependencies])`.

| Cấp độ | Cú pháp | Thời điểm thực thi | Ứng dụng tiêu biểu | Bẫy cần tránh |
| :--- | :--- | :--- | :--- | :--- |
| **1. Không mảng** | `useEffect(fn)` | Lần đầu + Sau **MỌI LẦN** Re-render | Đo đạc DOM sau mỗi lần vẽ, ghi log hành vi | Tuyệt đối **CẤM** gọi `setState` bên trong (gây lặp vô tận) |
| **2. Mảng rỗng** | `useEffect(fn, [])` | **CHỈ DUY NHẤT 1 LẦN** sau khi Mount | Gọi API lấy dữ liệu ban đầu, gắn event toàn cục 1 lần | Bẫy Stale Closure nếu dùng biến state cũ bên trong |
| **3. Có phần tử** | `useEffect(fn, [a, b])` | Lần đầu + Khi **bất kỳ phần tử nào thay đổi** | Search Autocomplete (theo `keyword`), Phân trang (theo `page`), Chi tiết phim (theo `id`) | Bẫy truyền Object/Array mới làm effect chạy liên tục |

- **Cơ chế so sánh ngầm:** React dùng thuật toán **`Object.is()`** (so sánh nông `===`). Với Primitive type (số, chuỗi, boolean) thì an toàn tuyệt đối; với Reference type (Object, Array) thì mỗi lần render có địa chỉ ô nhớ mới sẽ khiến effect bị kích hoạt liên tục.

---

### 3. Bản chất Cleanup Function & Ba ca bệnh thực tế (Kèm bằng chứng Console Log):
- **Bản chất của Cleanup:** Không chỉ chạy khi Component bị tháo gỡ (Unmount), mà nó **LUÔN LUÔN CHẠY TRƯỚC LẦN EFFECT TIẾP THEO** để dọn sạch rác của lần trước đó!

#### Ca bệnh 1: Preview Avatar (Xóa rác RAM với `URL.revokeObjectURL`)
- *Hiện tượng rò rỉ RAM:* Dùng `URL.createObjectURL(file)` tạo link blob lưu ảnh trong RAM. Nếu người dùng chọn 50 ảnh liên tiếp mà không cleanup, RAM trình duyệt phình to hàng trăm MB rác (mở link ảnh cũ ở tab mới vẫn xem được bình thường).
- *Giải pháp:*
  ```jsx
  useEffect(() => {
    console.log("==> 1. Effect: Đang dùng avatar mới:", avatar?.name);

    return () => {
      console.log("==> 2. Cleanup: Thu hồi giải phóng RAM ảnh cũ:", avatar?.name);
      avatar && URL.revokeObjectURL(avatar.preview);
    };
  }, [avatar]);
  ```
- *Bằng chứng thứ tự in Log khi chọn ảnh 1 rồi chọn ảnh 2:*
  ```text
  Lần 1 (chọn anh1.png): ==> 1. Effect: Đang dùng avatar mới: anh1.png
  Lần 2 (chọn anh2.png): ==> 2. Cleanup: Thu hồi giải phóng RAM ảnh cũ: anh1.png  (CHẠY TRƯỚC!)
                         ==> 1. Effect: Đang dùng avatar mới: anh2.png
  ```

#### Ca bệnh 2: Window Event Listener (`scroll`, `resize`)
- *Hiện tượng listener ma:* Khi Component bị ẩn/tháo gỡ (Unmount), nếu không gỡ bỏ `window.removeEventListener`, sự kiện cuộn vẫn âm thầm chạy ngầm trong trình duyệt và cố gọi `setState` vào component đã chết (Lỗi: *Can't perform a React state update on an unmounted component*).
- *Giải pháp chuẩn:*
  ```javascript
  useEffect(() => {
    const handleScroll = () => { ... };
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  ```

#### Ca bệnh 3: Subscriptions / Fake Chat App (Chuyển phòng chat)
- *Hiện tượng:* Người dùng chuyển từ Phòng 1 sang Phòng 2. Nếu không hủy đăng ký phòng 1, họ sẽ tiếp tục nhận tin nhắn rác từ cả 2 phòng cùng lúc.
- *Giải pháp:* Dùng Cleanup để `unsubscribe` kênh cũ ngay trước khi `subscribe` vào kênh mới khi `channelId` thay đổi.

---

### 4. Bẫy Stale Closure (Bao đóng cũ kỹ) với Timer & State:
- **Hiện tượng "Đồng hồ chết lâm sàng ở số 1":**
  ```javascript
  useEffect(() => {
    const timer = setInterval(() => {
      setCount(count + 1); // 💣 Kẹt ở 1 mãi mãi!
    }, 1000);
    return () => clearInterval(timer);
  }, []); // [] rỗng
  ```
- **Bản chất V8 & Lexical Scope:** Callback trong `setInterval` được sinh ra ở lần render 1 và đóng gói (Closure) ôm chặt biến `count = 0`. Dù các lần render sau sinh ra biến `count` mới, nhưng hàm callback bên trong timer không được sinh lại bản mới -> nó mãi mãi nhìn thấy `count = 0` của quá khứ!
- **Phương thuốc cứu mạng:** Luôn dùng **Functional Update (`setCount(prev => prev + 1)`)**! Ta ủy thác cho React tự chọc vào bộ nhớ Fiber để lấy giá trị tươi mới nhất, giúp callback thoát hoàn toàn khỏi chiếc bẫy Closure.

---

### 5. Cơ chế Stress-test chạy 2 lần của `<React.StrictMode>`:
- **Thắc mắc:** Tại sao truyền mảng `[]` mà `useEffect` vẫn chạy 2 lần ở console?
- **Bản chất:** Trong môi trường phát triển (Development), `<React.StrictMode>` cố tình giả lập quy trình:
  `Mount lần 1 -> GIẢ VỜ Unmount (chạy Cleanup) -> Mount lại lần 2`.
- **Mục đích:** Đóng vai giám khảo kiểm tra xem lập trình viên có viết hàm Cleanup để dọn dẹp Timer / Event Listener hay không.
- **Thực tế:** Khi build ứng dụng ra môi trường thật (Production / `npm run build`), cơ chế này tự động tắt và chỉ chạy đúng 1 lần duy nhất!

---

### 6. Chiếc bẫy cấm viết `async` trực tiếp trong `useEffect`:
- **Thắc mắc kinh điển: "Tại sao viết `fetch().then()` (như F8) thì chạy được, mà đổi sang `async/await` lại bị báo lỗi đỏ?"**
  - *Khi viết `fetch().then()`:* 
    Hàm truyền vào `useEffect` là một **Hàm Đồng Bộ bình thường**. Lệnh `fetch` được ném cho Web APIs chạy ngầm, các callback `.then()` được đăng ký vào Microtask Queue. Bản thân hàm của `useEffect` chạy từ đầu đến cuối chỉ mất 0.001ms và kết thúc trả về **`undefined`** -> React thấy đúng chuẩn nên hoàn toàn chấp nhận!
  - *Khi viết `async () => ...`:*
    Theo chuẩn JavaScript (ECMAScript), **bất kỳ hàm nào có từ khóa `async` thì BẢN THÂN HÀM ĐÓ LUÔN LUÔN TRẢ VỀ MỘT `Promise`** (kể cả bên trong có `return` hay không)!
- **Hậu quả dưới nắp ca-pô:**
  - React quy định: Giá trị `return` của `useEffect` **BẮT BUỘC PHẢI LÀ MỘT HÀM CLEANUP** (hoặc `undefined`).
  - Khi bạn viết `async`, bạn vừa trao cho React một chiếc `Promise { <pending> }`.
  - Khi Component Unmount, React cố lấy giá trị trả về đó ra thực thi như một hàm cleanup: `promise()` -> Ném lỗi **`TypeError: cleanup is not a function`** và làm sập ứng dụng!
- **Mẫu viết chuẩn khi muốn dùng cú pháp `await`:**
  Định nghĩa một hàm async riêng nằm trọn ở BÊN TRONG, rồi gọi nó ngay lập tức:
  ```javascript
  useEffect(() => {
    // 1. Hàm con async riêng biệt bên trong:
    const fetchMovies = async () => {
      try {
        const res = await fetch('https://phimapi.com/danh-sach/phim-moi');
        const data = await res.json();
        setMovies(data);
      } catch (err) {
        console.error(err);
      }
    };

    // 2. Kích hoạt gọi hàm:
    fetchMovies();

    // 3. Hàm ngoài vẫn là hàm đồng bộ, thoải mái return cleanup function nếu cần:
    return () => { ... };
  }, []);
  ```

---

### 7. Tranh chấp dữ liệu (Race Condition) & Vũ khí `AbortController`:
- **Con quái vật Race Condition là gì?**
  - Là hiện tượng **cuộc đua dữ liệu mạng bị chạy ngược kết quả** do tốc độ phản hồi không đồng đều giữa các lần request.
  - *Kịch bản thảm họa:*
    1. Giây 0: Bấm xem Phim A (`id = 1`) -> Gửi Request 1 (mạng lag, mất 3 giây mới về).
    2. Giây 1: Sốt ruột bấm sang Phim B (`id = 2`) -> Gửi Request 2 (mạng nhanh, mất 0.5 giây là về).
    3. Giây 1.5: Phim B về trước -> Màn hình hiện Phim B (Rất đúng!).
    4. Giây 3.0: Bây giờ Request 1 của Phim A cũ rích mới lết về tới nơi -> Nó gọi `setMovie(Phim A)` -> **Màn hình đột ngột bị giật ngược lại hiển thị Phim A!**
- **Vũ khí diệt quái vật: `AbortController` kết hợp Cleanup Function:**
  - `AbortController` là Web API có khả năng giật đứt kết nối mạng của một lệnh `fetch` đang bay dở giữa đường thông qua thuộc tính `signal`.
  - Nhờ cơ chế: **Cleanup của effect cũ LUÔN LUÔN CHẠY TRƯỚC effect mới**. Khi `movieId` đổi từ A sang B -> Cleanup của A chạy ngay lập tức -> Gọi `controller.abort()` để **tiêu diệt Request Phim A ngay giữa đường**, không cho nó cơ hội về đè dữ liệu lên Phim B!
- **Mẫu code chuẩn Senior:**
  ```javascript
  useEffect(() => {
    // 1. Tạo còi báo hủy:
    const controller = new AbortController();

    const fetchMovie = async () => {
      try {
        const res = await fetch(`/api/movie/${movieId}`, { 
          signal: controller.signal // Nối còi vào fetch
        });
        const data = await res.json();
        setMovie(data);
      } catch (err) {
        // Nếu lỗi do ta chủ động hủy (AbortError) thì lờ đi, không log lỗi đỏ:
        if (err.name === 'AbortError') {
          console.log("Đã hủy thành công request cũ của phim:", movieId);
        } else {
          console.error("Lỗi mạng thật sự:", err);
        }
      }
    };

    fetchMovie();

    // 2. CLEANUP: Hủy ngay request của phim cũ khi movieId thay đổi hoặc Unmount!
    return () => controller.abort();
  }, [movieId]);
  ```

---

### 8. Hook `useLayoutEffect` – Người anh em Đồng bộ & Trận chiến chống chớp màn hình (Visual Flicker):
- **Bản chất Đồng bộ (Synchronous) vs Bất đồng bộ (Asynchronous) trong chu trình vẽ:**
  - Khái niệm đồng bộ/bất đồng bộ ở đây là **so với Chu trình Vẽ (Browser Paint) trên Main Thread của Trình duyệt**, chứ không phải so với các dòng lệnh JS thông thường!
  - Main Thread chỉ có thể làm 1 trong 2 việc: hoặc chạy JS, hoặc vẽ màn hình.
- **Sự khác biệt sinh tử về Trục thời gian:**
  - **`useEffect` (Bất đồng bộ / Passive):**
    ```text
    React sửa Real DOM -> Trình duyệt VẼ LÊN MÀN HÌNH (User thấy) -> useEffect mới chạy ở nhịp Event Loop tiếp theo!
    ```
  - **`useLayoutEffect` (ĐỒNG BỘ / Blocking):**
    ```text
    React sửa Real DOM -> CHẶN ĐỨNG TRÌNH DUYỆT! -> useLayoutEffect chạy xong xuôi -> Trình duyệt MỚI ĐƯỢC PHÉP VẼ!
    ```
- **Thí nghiệm "Chớp nháy giao diện" (The Visual Flicker Trap):**
  - Yêu cầu: Nếu `count > 3` thì tự động ép quay về `0`.
  - *Với `useEffect`:* Người dùng bấm lên 4 -> Trình duyệt vẽ số 4 lên màn hình -> Mắt người thấy số 4 -> Sau đó `useEffect` mới chạy gọi `setCount(0)` -> Vẽ lại số 0 -> **Mắt nhìn thấy số 4 bị nhấp nháy giật cục (Glitch/Flicker)**!
  - *Với `useLayoutEffect`:* Người dùng bấm lên 4 -> React cập nhật DOM nhưng `useLayoutEffect` chặn ngay cửa -> Đổi thành 0 trước khi vẽ -> Trình duyệt chỉ vẽ duy nhất số 0 -> **Triệt tiêu 100% hiện tượng chớp nháy!**
- **Quy tắc vàng Senior (99% vs 1%):**
  - **99% trường hợp:** Luôn dùng `useEffect` vì nó không chặn Main Thread, giúp giao diện đạt 60 FPS mượt mà.
  - **1% trường hợp duy nhất:** Chỉ dùng `useLayoutEffect` khi cần **đo đạc kích thước DOM thật** (`getBoundingClientRect()`, `offsetWidth`, `scrollHeight`) để tính toán lại vị trí phần tử (Tooltip né mép màn hình, Popover, Dropdown, Auto-scroll) **TRƯỚC KHI người dùng kịp nhìn thấy**.
- **Cảnh báo hiệu năng:** Tuyệt đối không nhét tác vụ nặng (Fetch API, vòng lặp triệu lần) vào `useLayoutEffect` vì nó sẽ làm đơ cứng toàn bộ trang web (Frozen UI)!

---

### 9. Hook `useRef` – Chiếc két sắt cá nhân & Cầu nối chạm vào Real DOM:
- **Bản chất của `useRef` trong RAM:**
  - `useRef(initialValue)` chỉ trả về một Plain JavaScript Object thông thường: `{ current: initialValue }`.
  - Object này được giữ nguyên địa chỉ ô nhớ trên React Fiber qua mọi lần Component Re-render.
- **Đặc tính vàng số 1:**
  - **Thay đổi `ref.current` KHÔNG BAO GIỜ kích hoạt Re-render!** (Lưu trữ thầm lặng trong bóng tối).
- **Hai sứ mệnh thực chiến:**
  1. *Sứ mệnh 1: Lưu trữ giá trị sống qua các lần render (Mutable Container):*
     - Ví dụ Stopwatch: `timerId.current = setInterval(...)`.
     - Phân tích: Hàm `setInterval` trả về con số ID ngay lập tức (trong 0.0001ms). Nếu dùng `let timerId`, khi hết 1s state đổi gây Re-render -> `let timerId` bị reset thành `undefined` -> nút Stop bị liệt. Dùng `useRef` giúp ID được bảo toàn vĩnh viễn trong két sắt.
     - Ứng dụng khác: Lưu giá trị trước đó của state (`prevCountRef.current = count`), lưu biến cờ lần đầu render (`isFirstRender.current`).
  2. *Sứ mệnh 2: Trỏ trực tiếp vào Real DOM (DOM References):*
     - Cắm vào thẻ HTML: `<input ref={inputRef} />` -> Sau khi vẽ xong, React tự gán phần tử DOM thật vào `inputRef.current`.
     - Ứng dụng: Tự động focus ô input (`inputRef.current.focus()`), cuộn trang (`scrollIntoView()`), đo kích thước (`offsetWidth`), điều khiển phát video/audio (`play()`, `pause()`).
- **Bảng so sánh 3 ngôi:**
  | Tiêu chí | Biến thường `let x` | `useState` | `useRef` |
  | :--- | :--- | :--- | :--- |
  | Bị mất khi Re-render? | **CÓ** (Reset về ban đầu) | **KHÔNG** | **KHÔNG** |
  | Đổi giá trị có Re-render? | **KHÔNG** | **CÓ** (Vẽ lại màn hình) | **KHÔNG** |
  | Mục đích chính | Tính toán tạm thời | Dữ liệu hiển thị lên UI | Dữ liệu ngầm (Timer, ID) & Trỏ DOM |

---

### 10. Kỹ thuật `forwardRef` & Hook `useImperativeHandle` – Nghệ thuật Đóng gói Component:
- **Nỗi đau: Tại sao Cha không cắm trực tiếp `ref` vào Component Con được?**
  - Trong React 18 trở về trước, `ref` là một **Từ khóa bảo lưu (Reserved Keyword)** giống như `key`. Trình biên dịch tự động cắt bỏ `ref` ra khỏi `props` (`props.ref` bị `undefined`).
  - Hơn nữa, Component con là một hàm JS, React không thể đoán mò thẻ nào bên trong là "thẻ core" để trỏ vào.
  - *Lưu ý:* Nếu đổi tên thành prop bình thường (như `inputRef={myRef}`) thì chạy được ngay.
- **Bước ngoặt vĩ đại trong React 19:**
  - **React 19 chính thức KHAI TỬ `forwardRef`!** Kể từ React 19, `ref` được đối xử bình đẳng như mọi prop khác: `function MyInput({ label, ref }) { return <input ref={ref} />; }`.
- **Hook `useImperativeHandle` – Tự tạo tay nắm cửa an toàn:**
  - *Hiểm họa khi Cha cầm DOM thật của Con:* Cha có thể vô tình xóa thẻ (`ref.current.remove()`), đổi link `src`, sửa đè style làm vỡ giao diện Con.
  - *Giải pháp `useImperativeHandle`:* Con đứng ra làm bộ lọc bảo vệ, chỉ bóc tách và cung cấp cho Cha một Object chứa các hàm an toàn đã được kiểm duyệt:
    ```jsx
    useImperativeHandle(ref, () => ({
      play() { realVideoRef.current.play(); },
      pause() { realVideoRef.current.pause(); }
    }));
    ```
  - *Kết quả:* Ở Cha, `ref.current` chỉ nhìn thấy `{ play, pause }`, nếu Cha cố gọi `ref.current.remove()` sẽ bị báo lỗi ngay lập tức. Đảm bảo tính đóng gói (Encapsulation) tuyệt đối!

---

### 11. Hook `useId` (React 18) – Trị dứt điểm xung đột Form & Server-Side Rendering (SSR):
- **Mục đích duy nhất:** Tạo ID ngẫu nhiên duy nhất để liên kết các cặp thẻ Form trợ năng (Accessibility - a11y):
  - `<label htmlFor={id}>` nối với `<input id={id} />`.
  - `<input aria-describedby={hintId} />` nối với `<p id={hintId}>Gợi ý mật khẩu</p>`.
- **CẤM TIỆT:** Tuyệt đối không dùng `useId` để tạo `key` cho danh sách `.map()`! `key` bắt buộc phải sinh ra từ dữ liệu nguồn (`item.id`).
- **Tại sao không dùng `Math.random()`?**
  - Trong SSR (Next.js), Server chạy `Math.random()` ra số A, Client tải về chạy ra số B -> Gây lỗi **Hydration Mismatch Error** làm sập web.
- **Cơ chế ngầm:** `useId` sinh ID dựa trên **vị trí tọa độ của Component trên cây Fiber Tree**. Do đó ID được giữ **cố định vĩnh viễn qua mọi lần Re-render** (không bao giờ bị sinh ID mới, không cần dùng `useRef` kẹp lại), và khớp 100% giữa Server và Client.
- **Mẹo tối ưu:** Một component có nhiều ô input chỉ cần gọi `const id = useId()` 1 lần rồi ghép đuôi: `id + '-name'`, `id + '-pass'`.

---

### 12. Triết lý tối thượng: "You Might Not Need an Effect" (Tránh bẫy lạm dụng `useEffect`):
- **Căn bệnh kinh điển:** Tiện tay cái gì cũng tạo thêm State và nhét vào `useEffect` để đồng bộ.
- **Bẫy Derived State (Giá trị phái sinh):**
  - *Sai:* Tạo `const [fullName, setFullName] = useState('')` rồi dùng `useEffect(() => setFullName(firstName + ' ' + lastName), [firstName, lastName])` -> Gây re-render thừa 2 lần liên tiếp, code bẩn và lag.
  - *Đúng:* Tính toán trực tiếp trong thân hàm khi render: `const fullName = firstName + ' ' + lastName;`.
- **Quy tắc vàng:**
  > **Nếu một dữ liệu có thể TÍNH TOÁN ĐƯỢC từ State hoặc Props có sẵn -> TÍNH TOÁN TRỰC TIẾP KHI RENDER, TUYỆT ĐỐI KHÔNG TẠO THÊM STATE VÀ KHÔNG DÙNG `useEffect`!**

---

## 6. Tối ưu hiệu năng, Concurrent React & Xử lý lỗi (Performance & Resiliency)

---

### 1. Cơn ác mộng Re-render dây chuyền & Bản chất mặc định của React:
- **Nguyên lý mặc định:** Cứ khi nào State của Component Cha thay đổi -> Toàn bộ cây con cháu chắt bên dưới đều bị re-render theo mặc định (bất kể Props của con có đổi hay không).
- **Hậu quả:** Với các component con nặng (biểu đồ thống kê, bảng 10.000 dòng), gõ 1 phím ở ô tìm kiếm của cha sẽ kích hoạt vẽ lại cả đàn con -> Đơ lag, giật khựng giao diện.

---

### 2. Chiếc khiên bảo vệ `React.memo` & Cơ chế So sánh nông (Shallow Compare):
- **Bản chất:** Là một Higher-Order Component (HOC) bọc lấy Component con: `export default React.memo(MyComponent);`.
- **Cơ chế:** Khi Cha re-render, `React.memo` mang kính lúp so sánh `oldProps === newProps`. Nếu tất cả props giữ nguyên giá trị -> Chặn đứng không cho Component con chạy lại hàm, tái sử dụng Virtual DOM cũ trong RAM.

---

### 3. Hook `useCallback` – Cứu vãn chiếc khiên `React.memo` bị vỡ:
- **Bẫy chiếc khiên bị đập vỡ (The Broken Shield Trap):**
  - Trong JavaScript, Function là Kiểu tham chiếu (Reference Type). Mỗi lần Cha render, các hàm viết trong Cha lại được tạo mới ở một **ô nhớ RAM mới** (`0xAA11 !== 0xBB22`).
  - Nếu Cha truyền hàm xuống cho Con: `React.memo` so sánh `oldProps.onClick === newProps.onClick` ra `false` -> Chiếc khiên bị vô hiệu hóa, Con vẫn bị re-render thừa!
- **Giải pháp `useCallback(fn, deps)`:**
  - Đóng băng con trỏ hàm, giữ nguyên địa chỉ ô nhớ qua các lần render của Cha.
  - Nhờ đó `React.memo` so sánh ra `true` -> Bảo vệ con thành công.
- **Mổ xẻ 3 cấp độ Dependencies của `useCallback`:**
  - *Không mảng:* ❌ **Vô dụng hoàn toàn** (mỗi lần render lại tạo hàm mới, tốn thêm chi phí vô ích).
  - *Mảng rỗng `[]`:* Giữ con trỏ hàm vĩnh cửu. 💣 **Bẫy Stale Closure** nếu bên trong hàm có đọc biến State ngoài component -> Khắc phục bằng Functional Update (`setCount(prev => prev + 1)`).
  - *Có biến `[a, b]`:* Chỉ cấp phát con trỏ hàm mới khi biến phụ thuộc thay đổi.

---

### 4. Hook `useMemo` – Bộ nhớ đệm cho các phép tính toán nặng:
- **Bản chất:** Lưu cache KẾT QUẢ TRẢ VỀ của một biểu thức/hàm tính toán phức tạp (lọc, sắp xếp mảng 5.000 phần tử).
- **Cú pháp:** `const result = useMemo(() => heavyCalculation(data), [data]);`.
- **So sánh nhanh trong 3 giây:**
  - `useCallback`: Đóng băng chính cái **HÀM** (Function reference).
  - `useMemo`: Đóng băng **KẾT QUẢ** tính toán (Data value / Array / Object).
- **Bẫy Tối ưu hóa sớm (Premature Optimization):**
  - Tuyệt đối không dùng `useMemo` cho các phép tính đơn giản như `a + b` hay chuỗi ngắn. Chi phí React cấp phát mảng deps và so sánh `Object.is()` còn tốn CPU và RAM hơn việc tính toán trực tiếp!

---

### 5. Concurrent React (React 18+): Phân chia tác vụ Khẩn cấp vs Thứ yếu:
- **Nỗi đau trước React 18 (Blocking Rendering):** Mọi lệnh `setState` đều có độ ưu tiên ngang nhau. Gõ phím tìm kiếm (`setText`) và lọc 10.000 phim (`setList`) tranh giành luồng -> Phím bị liệt, đơ cứng.
- **Hook `useTransition` (`isPending`, `startTransition`):**
  - Tách biệt: Gõ phím = **Tác vụ Khẩn cấp (Urgent)**, Lọc danh sách = **Tác vụ Thứ yếu (Transition)**.
  - Bọc cập nhật nặng vào: `startTransition(() => setList(heavyList))`.
  - Cơ chế cắt ngang (Interruptible): Người dùng gõ phím mới -> React vứt bỏ lượt render danh sách cũ đang dở dang để ưu tiên hiện chữ ngay lập tức -> Đạt chuẩn 60 FPS mượt mà.
  - Cờ `isPending`: `true` khi tác vụ nặng đang tính toán ngầm -> Dùng để làm mờ UI hoặc hiện loading spinner.
- **Hook `useDeferredValue(value)`:**
  - Tương tự `useTransition` nhưng dùng khi bạn **không nắm giữ hàm `setState`** (nhận prop từ cha). Tự động trì hoãn cập nhật giá trị con để nhường luồng cho tác vụ khẩn cấp.

---

### 6. Tương lai Tối ưu hóa: React Compiler (React 19 Forget):
- Công cụ biên dịch tự động ở bậc build: Tự động phân tích luồng dữ liệu và tự chèn memoization vào mã máy.
- Lập trình viên tương lai không cần tự tay viết `useCallback`, `useMemo` hay `React.memo` nữa, code quay về sự thuần khiết nguyên bản!

---

### 7. Tải chậm Component (Code Splitting): `React.lazy` & `<Suspense>`:
- **Nỗi đau:** File `bundle.js` quá lớn (15MB) chứa cả code trang Admin, Thống kê làm người dùng vào trang chủ bị chờ màn hình trắng 5-10s.
- **Giải pháp Chia để trị:**
  - `const Admin = React.lazy(() => import('./Admin'));` (Chỉ tải file JS khi người dùng thực sự bấm vào).
  - Bọc trong `<Suspense fallback={<Spinner />}>`: Tự động hiện Spinner cứu hộ trong lúc tải dở file JS qua mạng, tải xong tự hiện giao diện thật.

---

### 8. Bắt lỗi sập giao diện bằng Error Boundary:
- **Hiểm họa "Màn hình trắng chết chóc" (White Screen of Death):** Một lỗi nhỏ ở thẻ comment dưới chân trang làm sập toàn bộ cây Virtual DOM, cả trang web biến thành màn hình trắng xóa!
- **Cơ chế Khoanh vùng dập dịch:**
  - Bọc component dễ lỗi lại bằng `<ErrorBoundary fallback={<ErrorAlert />}> <CommentSection /> </ErrorBoundary>`.
  - Lỗi chỉ hiển thị tại vùng bị sập, các phần quan trọng khác (Video Player, Header) vẫn sống và chạy bình thường.
- **Thực tế doanh nghiệp:** Dùng thư viện chuẩn công nghiệp **`react-error-boundary`** với nút "Thử lại" (Reset / Retry) tự động khôi phục giao diện.

---

## 7. Cẩm nang phản xạ cơ bắp & Bẫy gõ phím thực chiến (Muscle Memory & Daily Traps)

---

### 1. Bẫy 1: Cửa khẩu hải quan `{}` giữa lãnh thổ HTML và JavaScript:
- **Hiện tượng:** Quên bọc `{}` quanh biến hoặc hàm lặp: `<ul> jobs.map(...) </ul>`.
- **Hậu quả:** Trình duyệt coi đó là văn bản (text tĩnh), in nguyên xi dòng chữ `"jobs.map(...)"` ra màn hình, không hề chạy code JS!
- **Phản xạ thị giác:** Đang đứng trong vùng đất thẻ JSX mà muốn "nói tiếng JavaScript" (truyền biến, tính toán, lặp mảng, truyền callback) -> **BẮT BUỘC PHẢI MỞ CỬA BẰNG CẶP NGOẶC NHỌN `{}`**!

---

### 2. Bẫy 2: Cú pháp Arrow Function trong `.map()` (Return âm thầm vs Block Body):
- **Cú pháp 1 (Ngoặc tròn `()` - Implicit Return):**
  ```jsx
  {jobs.map((job, index) => (
    <li key={index}>{job}</li> // Tự động trả về JSX, cấm có chữ return
  ))}
  ```
- **Cú pháp 2 (Ngoặc nhọn `{}` - Block Body):**
  ```jsx
  {jobs.map((job, index) => {
    return <li key={index}>{job}</li>; // BẮT BUỘC phải có chữ `return`
  })}
  ```
- **Hậu quả nếu viết sai:** `{jobs.map((job, index) => { <li key={index}>{job}</li> })}` (Mở ngoặc nhọn mà quên `return`) -> Hàm trả về mảng toàn `undefined` -> Màn hình trắng trơn không hiện danh sách!

---

### 3. Bẫy 3: Cơn ác mộng gọi hàm ngay khi Render: `onClick={fn()}` vs `onClick={() => fn()}`:
- **Sai lầm chết người:** `<button onClick={handleDelete(index)}>Xóa</button>`
  - JS Engine thấy dấu ngoặc tròn `()` liền **thực thi hàm xóa ngay lập tức khi đang vẽ giao diện**.
  - Hàm xóa gọi `setJobs` -> Re-render -> Lại gọi hàm xóa -> Re-render -> **Lỗi Infinite Loop Crash: *"Too many re-renders"***!
- **Phản xạ chuẩn:**
  - Nếu hàm **KHÔNG CẦN** tham số: Truyền thẳng tên hàm `<button onClick={handleSubmit}>`.
  - Nếu hàm **CẦN TRUYỀN** tham số: Luôn bọc trong Arrow Function để trì hoãn: `<button onClick={() => handleDelete(index)}>`.

---

### 4. Bẫy 4: Bản chất thực sự của tham số `prev` trong Functional Update:
- **`prev` có phải từ khóa cố định không?** **HOÀN TOÀN KHÔNG!**
- **Bản chất JS:** Trong JavaScript, hàm callback nhận tham số theo **VỊ TRÍ (Position)** chứ không theo tên. React chỉ quan tâm đối số thứ nhất nó bơm vào hàm là giá trị state tươi mới nhất trong bộ nhớ Fiber.
- Bạn có thể đặt tên là: `prev`, `prevState`, `prevJobs`, `oldValue`, hay thậm chí `x`.
- **Quy ước vàng (Clean Code):** Luôn dùng tiền tố `prev + TênState` (ví dụ: `prevJobs => ...`) để vừa tránh trùng tên biến với state ngoài component (tránh shadowing), vừa giúp người đọc hiểu ngay đây là dữ liệu snapshot trước đó.

---

### 5. Bẫy 5: Arrow Function 2 tham số trong `.filter((_, i) => ...)`:
- Trong JS, Arrow Function có **từ 2 tham số trở lên BẮT BUỘC phải bọc trong ngoặc tròn**: `((_, i) => ...)`.
- Ký hiệu dấu gạch dưới **`_`** là quy ước quốc tế đại diện cho tham số bỏ qua (không dùng đến giá trị của phần tử, chỉ cần dùng chỉ số index `i`).

---

### 6. Bẫy 6: Cấm viết `async` trực tiếp vào callback của `useEffect`:
- `useEffect(async () => ...)` luôn trả về một `Promise`, phá vỡ cơ chế Cleanup của React.
- Luôn khai báo hàm async bên trong rồi gọi `fetchData()`.

---

### 7. Bẫy 7: Stale Closure trong các tác vụ Timer / Event Listener:
- Khi dùng `setInterval`, `setTimeout`, hoặc `window.addEventListener` bên trong `useEffect(..., [])`, callback luôn bị đóng băng với biến state của lần render đầu tiên.
- Luôn nhớ sử dụng `setState(prev => ...)` để luôn tính toán dựa trên dữ liệu mới nhất.








