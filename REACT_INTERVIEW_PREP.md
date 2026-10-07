# 🎯 BỘ CÂU HỎI & CÂU TRẢ LỜI PHỎNG VẤN REACT (INTERVIEW PREP)

> **Mục tiêu:** Cẩm nang phản xạ phỏng vấn với Mentor / Nhà tuyển dụng.  
> **Chiến thuật trả lời 2 lớp:**  
> 1. **Định nghĩa:** Bắn ngay 1-2 câu ngắn gọn, chuẩn chỉnh khi mentor vừa hỏi xong.  
> 2. **Đoạn "Hiểu":** Đoạn văn liền mạch, sâu sắc theo **Mạch tư duy Nhân - Quả 4 nấc** (*Sinh ra làm gì -> Cơ chế dưới nắp ca-pô -> Bẫy do bản chất gây ra -> Quy tắc thực chiến*).

---

### 1. Virtual DOM là gì? Chỉ ra bản chất cụ thể?
* **Định nghĩa gọn:** Virtual DOM là một bản sao mô phỏng cây DOM thật nhưng được lưu trữ dưới dạng một Plain JavaScript Object (đối tượng JS thuần túy) nằm hoàn toàn trong bộ nhớ RAM của trình duyệt.
* **Hiểu:**  
  *"Thực chất Virtual DOM sinh ra là để giải quyết nỗi đau hiệu năng của Real DOM. Mỗi khi ta can thiệp vào DOM thật, trình duyệt C++ phải dừng lại tính toán lại bố cục hình học (Reflow) và vẽ lại các điểm ảnh (Repaint) cực kỳ tốn kém. Thay vì đập đi xây lại DOM thật liên tục, React tạo ra một cây Object trong RAM mô phỏng lại toàn bộ giao diện với hai thuộc tính chính là `type` và `props`. Khi giao diện thay đổi, React sẽ render ra một cây Virtual DOM mới, mang đi so sánh với cây cũ để tìm đúng vết cắt khác biệt nhỏ nhất, rồi mới gom lại thành một mẻ đắp xuống DOM thật. Nó giống như việc mình sửa nháp trên bản vẽ giấy hàng chục lần nhẹ tênh, đến khi chốt phương án cuối cùng mới ra công trường xây gạch thật."*
* **Cơ chế 3 bước dưới nắp ca-pô:**
  1. **Render:** Tạo cây Virtual DOM mới trong RAM.
  2. **Diffing (Reconciliation):** So sánh 2 cây Object JS cũ và mới theo độ phức tạp thuật toán tối ưu $O(n)$.
  3. **Commit:** Gom toàn bộ thay đổi thành 1 đợt (batch) duy nhất để vá xuống Real DOM.
* **Đòn phản công Senior:** Virtual DOM không nhanh hơn thao tác Real DOM trực tiếp bằng tay được tối ưu thủ công, nhưng giá trị lớn nhất của nó là mang lại **hiệu năng có thể dự đoán được (Predictable Performance)** và nâng cao năng suất lập trình viên (DX).

---

### 2. Phân biệt React Element và React Component?
* **Định nghĩa gọn:** React Element là một đối tượng JavaScript bất biến (Plain Object) mô tả những gì hiển thị trên màn hình tại một thời điểm, còn React Component là một hàm hoặc lớp JavaScript nhận props đầu vào và trả về các React Element.
* **Hiểu:**  
  *"Để dễ hình dung thì Component giống như một chiếc khuôn đúc bánh quy hay một công xưởng sản xuất, còn Element chính là từng chiếc bánh quy hay thành phẩm được tạo ra từ chiếc khuôn đó. Khi ta viết JSX như `<Button />`, Babel sẽ dịch nó thành hàm `React.createElement(Button)`, và kết quả trả về trong bộ nhớ là một React Element – tức là một Plain Object nhẹ tênh chứa thông tin như type, props, children. Element một khi đã được tạo ra thì hoàn toàn bất biến (Immutable), ta không thể sửa trực tiếp nội dung của nó. Muốn thay đổi giao diện, Component phải chạy lại để sinh ra một Element hoàn toàn mới phản ánh trạng thái mới của giao diện."*
* **So sánh nhanh:**
  * **Element:** Không có vòng đời, không có state, chỉ là dữ liệu tĩnh trong RAM.
  * **Component:** Có vòng đời, có thể quản lý State, nhận Props, và có thể tái sử dụng ở nhiều nơi.

---

### 3. State trong React là gì? Bản chất bên dưới?
* **Định nghĩa gọn:** State là dữ liệu nội tại, có thể biến đổi của một Component, do chính Component đó khai sinh, sở hữu và quyết định việc giao diện có được vẽ lại (re-render) hay không.
* **Hiểu:**  
  *"Khác với biến thông thường `let count` sẽ bị xóa sạch khỏi bộ nhớ sau khi hàm component chạy xong, State giống như một ngăn tủ gửi đồ có khóa được React quản lý riêng bên trong cây React Fiber. Khi ta gọi hàm `setState`, React sẽ lên lịch (schedule) một chu kỳ re-render để chạy lại hàm Component với giá trị state mới. Cực kỳ quan trọng là trong mỗi nhịp render, State hoạt động như một bức ảnh chụp tĩnh (Snapshot) do cơ chế Closure của JavaScript. Vì thế, nếu ta gọi `setCount(count + 1)` ba lần liên tiếp trong một sự kiện thì cả ba lần đó đều đang nhìn vào cùng một giá trị cũ của bức ảnh chụp, kết quả count chỉ tăng 1. Muốn cập nhật lũy tiến, ta bắt buộc phải dùng dạng hàm `setCount(prev => prev + 1)` để React đưa vào hàng đợi tính toán."*
* **Nguyên tắc Bất biến (Immutability):** Tuyệt đối không sửa trực tiếp (`state.push()`), vì React kiểm tra thay đổi bằng cách so sánh nông (Shallow Comparison `===`) theo địa chỉ tham chiếu ô nhớ Heap. Không đổi địa chỉ ô nhớ -> React coi như không có gì mới và từ chối re-render.

---

### 4. Props là gì? Khác gì với State?
* **Định nghĩa gọn:** Props (Properties) là dữ liệu được truyền từ Component Cha xuống Component Con theo luồng dữ liệu một chiều (Unidirectional Data Flow) và có tính chất chỉ đọc (Read-only).
* **Hiểu:**  
  *"Props đóng vai trò như các tham số truyền vào một hàm JavaScript. Triết lý của React xem Component như các hàm thuần khiết (Pure Functions), nghĩa là với cùng một đầu vào props thì luôn phải trả về cùng một giao diện JSX. Vì thế, Component con tuyệt đối không được phép tự ý sửa đổi props mà cha đã giao cho nó. Sự khác biệt cốt lõi nhất giữa Props và State nằm ở nguồn gốc và quyền kiểm soát: State là dữ liệu nội tại (Internal) do component tự quản lý và thay đổi được, còn Props là dữ liệu từ bên ngoài (External) do component cha quyết định và áp đặt xuống."*
* **Đối chiếu nhanh:**
  * **State:** Quản lý tương tác động bên trong (mở/đóng modal, người dùng đang gõ phím).
  * **Props:** Cấu hình và tái sử dụng component từ bên ngoài (tiêu đề nút bấm, màu sắc, hàm callback xử lý sự kiện).

---

### 5. `props.children` là gì? Ứng dụng thực tế?
* **Định nghĩa gọn:** `props.children` là thuộc tính đặc biệt đại diện cho toàn bộ nội dung nằm ở giữa thẻ mở và thẻ đóng của một Component khi được gọi trong JSX.
* **Hiểu:**  
  *"Trong kiến trúc React, `props.children` là hiện thân của kỹ thuật Composition (ghép nối linh kiện) hay còn gọi là Slot Pattern. Thay vì bắt component cha phải biết trước bên trong nó có những thẻ gì, ta tạo ra một chiếc khung rỗng bằng cách đặt `{props.children}` vào giữa. Khi sử dụng, người dùng có thể nhét bất kỳ thứ gì vào giữa cặp thẻ đó, từ một đoạn văn bản đơn giản đến cả một cây component phức tạp khác. Nhờ có `children`, ta tránh được việc phải truyền hàng tá props rườm rà qua nhiều tầng và tạo ra những component khung dùng chung cực kỳ linh hoạt."*
* **Ứng dụng thực tế:** Xây dựng các UI Wrapper dùng chung trong Design System như `<Card>`, `<Modal>`, `<Drawer>`, `<RootLayout>` bọc toàn trang.

---

### 6. Phân biệt `key` và `ref` trong React?
* **Định nghĩa gọn:** `key` là định danh duy nhất giúp thuật toán Diffing phân biệt các phần tử trong một danh sách, còn `ref` (`useRef`) là chiếc chìa khóa tạo tham chiếu trực tiếp tới một phần tử DOM thật hoặc lưu một biến trong RAM xuyên suốt các lần render mà không kích hoạt re-render.
* **Hiểu:**  
  *"Mặc dù cả hai đều là những thuộc tính đặc biệt mà React không truyền vào `props` thông thường, nhưng sứ mệnh của chúng hoàn toàn khác nhau. `key` phục vụ cho thuật toán Virtual DOM: khi ta render một mảng với `.map()`, nếu không có key hoặc dùng index làm key thì khi danh sách bị thêm, xóa hoặc đảo thứ tự, React sẽ so sánh nhầm lẫn và cập nhật sai DOM hoặc làm mất state nội tại của các ô input con. Ta bắt buộc phải dùng ID duy nhất làm key. Ngược lại, `ref` là chiếc cầu nối để ta bước ra ngoài thế giới khai báo của React để chạm vào thế giới mệnh lệnh (Imperative) của trình duyệt, ví dụ như cần gọi hàm `focus()` ô input, đo kích thước phần tử, hoặc lưu giữ `timerId` của `setInterval` mà không làm component bị vẽ lại vô ích."*
* **Bẫy Senior:**
  * Dùng `index` làm key: Gây lỗi giữ nhầm giá trị checkbox/input khi xóa phần tử ở đầu mảng.
  * Lạm dụng `ref`: Phá vỡ triết lý `UI = f(State)`, chỉ dùng ref khi thực sự không thể giải quyết bằng State.

---

### 7. Tại sao trong JSX phải dùng `className` và `htmlFor` thay vì `class` và `for`?
* **Định nghĩa gọn:** Vì JSX được biên dịch trực tiếp sang JavaScript thuần túy, mà trong cú pháp ngôn ngữ JavaScript thì `class` và `for` là các từ khóa bảo lưu (Reserved Keywords) có ý nghĩa đặc biệt.
* **Hiểu:**  
  *"Nhiều người lầm tưởng JSX là HTML viết trong JavaScript, nhưng thực chất JSX chỉ là một cú pháp mở rộng (Syntactic Sugar). Khi mã nguồn đi qua bộ biên dịch như Babel hay SWC, từng thẻ JSX sẽ bị dịch thành các lời gọi hàm JS thuần như `React.createElement()`, trong đó các thuộc tính trở thành các key của một Object JavaScript. Trong chuẩn ECMAScript, từ khóa `class` dùng để khai báo Lớp Đối Tượng trong lập trình hướng đối tượng, còn `for` dùng để khai báo Vòng Lặp. Nếu React giữ nguyên tên thuộc tính là `class` và `for`, bộ phân tích cú pháp của JavaScript sẽ dễ bị xung đột cú pháp. Do đó, React ánh xạ chúng sang các tên thuộc tính chuẩn của DOM API trong trình duyệt là `element.className` và `labelElement.htmlFor`."*

---

### 8. Pure Component là gì?
* **Định nghĩa gọn:** Pure Component là component có khả năng tự động ngăn chặn việc re-render thừa bằng cách thực hiện phép so sánh nông (Shallow Comparison) trên props và state trước mỗi chu kỳ render.
* **Hiểu:**  
  *"Trong React, mặc định cứ khi nào Component Cha re-render thì toàn bộ các Component Con bên dưới sẽ bị kéo theo re-render vô điều kiện, bất kể props truyền xuống có thay đổi hay không. Pure Component sinh ra để phá vỡ sự lãng phí này. Trước khi quyết định có chạy lại hàm hay không, nó sẽ lấy props và state mới ra so sánh nông (`===`) với props và state cũ. Nếu tất cả các giá trị nguyên thủy (string, number, boolean) bằng nhau và các object, array giữ nguyên địa chỉ ô nhớ thì nó sẽ từ chối render, giữ nguyên cây DOM cũ. Ngày xưa trong Class Component ta kế thừa từ `React.PureComponent`, còn ngày nay với Functional Component ta đạt được điều này bằng cách bọc component trong `React.memo`."*
* **Cạm bẫy:** Nếu truyền vào một inline object `{}` hoặc một arrow function `() => {}` trực tiếp từ cha xuống con, thì ở mỗi lần cha render, một ô nhớ mới luôn được tạo ra -> phép so sánh nông luôn trả về `false` -> vô hiệu hóa hoàn toàn cơ chế của Pure Component.

---

### 9. HOC (Higher-Order Component) là gì?
* **Định nghĩa gọn:** Higher-Order Component là một hàm nhận vào một Component và trả về một Component mới với chức năng được bổ sung, tương tự như Higher-Order Function trong JavaScript nhưng áp dụng riêng cho Component.
* **Hiểu:**  
  *"Bản thân HOC không phải là một component, nó chỉ là một hàm thông thường, còn thứ mà nó trả về mới thực sự là một Component (áp dụng mẫu thiết kế Decorator). HOC sinh ra để giải quyết bài toán chia sẻ và tái sử dụng logic chung giữa nhiều màn hình khác nhau mà không cần sửa đổi mã nguồn của component gốc – ví dụ như logic kiểm tra quyền đăng nhập, hiển thị loading spinner, hay bơm thêm dữ liệu. Một điểm cốt lõi cần nhớ là HOF trong JavaScript chỉ cần thỏa 1 trong 2 điều kiện (nhận hàm hoặc trả về hàm), nhưng HOC bắt buộc phải thỏa mãn cả hai: vừa nhận vào component vừa trả về component mới. Ngày nay, phần lớn logic dùng chung đã được chuyển dịch sang Custom Hooks vì cú pháp gọn gàng và không làm lồng ghép nhiều tầng cây component, nhưng HOC vẫn xuất hiện rất nhiều trong các thư viện lớn và các dự án lâu năm."*
* **Ví dụ kinh điển:** `React.memo` (ngăn re-render), `connect` của Redux (bơm state/dispatch), `withRouter` của React Router.
* **Hai quy tắc vàng thực chiến (Senior Gotchas):**
  1. **Bắt buộc phải truyền tiếp props (`<WrappedComponent {...props} />`):** Nếu quên forward props, component con bên trong sẽ bị mất sạch dữ liệu do cha truyền xuống.
  2. **Tuyệt đối KHÔNG tạo HOC bên trong hàm render của component khác:** Nếu tạo bên trong render, mỗi nhịp re-render sẽ khai sinh một hàm Component mới ở địa chỉ ô nhớ mới -> React sẽ Unmount toàn bộ cây con cũ và Mount lại từ đầu, làm văng sạch toàn bộ State nội tại của con!

---

### 10. Phân biệt Controlled Component và Uncontrolled Component?
* **Định nghĩa gọn:** Controlled Component là component mà giá trị hiển thị của phần tử form (input, textarea, select) được kiểm soát hoàn toàn bởi React State thông qua cặp thuộc tính `value={state}` và `onChange={handler}`; còn Uncontrolled Component để cho chính DOM thật của trình duyệt tự lưu giữ dữ liệu và ta chỉ đọc ra khi cần thông qua `ref` hoặc `FormData`.
* **Hiểu:**  
  *"Sự khác biệt cốt lõi nhất nằm ở câu hỏi: 'Ai là nguồn chân lý duy nhất (Single Source of Truth) nắm giữ dữ liệu của ô input?'.  
  Nhiều người nghĩ chỉ cần có `onChange` lấy dữ liệu đem lọc phim là thành Controlled, nhưng không phải! Nếu chỉ có `onChange` mà không có `value={state}`, ô input đó vẫn là Uncontrolled vì DOM thật vẫn tự do giữ chữ. Nó chỉ thực sự trở thành **Controlled** khi có thêm `value={state}`: lúc này ô input bị tước quyền tự quản lý, nó chỉ được phép hiển thị đúng những gì mà State cho phép.  
  Lợi ích lớn nhất của Controlled là **sự kiểm soát tuyệt đối thời gian thực**: ta có thể chặn không cho nhập ký tự lạ, chặn dấu cách thừa, format chữ thường thành in hoa ngay khi gõ, hoặc bấm nút 'Xóa tìm kiếm' / 'Reset' từ bên ngoài thì ô input tự động trắng tinh nhờ `setState("")`. Nhược điểm là component phải re-render ở từng nhịp gõ phím.  
  Ngược lại, với **Uncontrolled**, ô input tự do nhận phím của người dùng mà không làm React re-render. Khi nào người dùng bấm nút Submit, ta mới dùng `ref` hoặc `new FormData(e.target)` đọc giá trị ra một lần duy nhất. Cách này cực kỳ nhẹ và tối ưu hiệu năng cho các form lớn hàng chục trường, và đây cũng chính là triết lý ngầm giúp thư viện **React Hook Form** đạt tốc độ siêu nhanh."*
* **Bẫy & Lưu ý thực chiến (Senior Gotchas):**
  * **Thẻ `<input type="file" />`:** Bắt buộc luôn là **Uncontrolled Component** trong React, vì lý do bảo mật của trình duyệt cấm JavaScript gán giá trị lập trình vào thuộc tính `value` của thẻ file.
  * **Cảnh báo chuyển đổi (Warning):** Tránh truyền `value={undefined}` ở lần đầu rồi sau đó đổi thành `value="abc"`, vì React sẽ ném warning: *"A component is changing an uncontrolled input to be controlled"*. Luôn khởi tạo `value=""` (chuỗi rỗng).

---

### 11. Phân biệt Stateless Component và Stateful Component?
* **Định nghĩa gọn:** Stateless Component (Component không trạng thái) là component chỉ nhận Props từ bên ngoài truyền vào để thuần túy hiển thị giao diện mà không nắm giữ State nội tại nào; còn Stateful Component (Component có trạng thái) là component tự khai sinh và quản lý State của riêng mình để phục vụ các tương tác biến đổi.
* **Hiểu:**  
  *"Trong kiến trúc phần mềm React, cặp khái niệm này còn được biết đến với tên gọi kinh điển là **'Presentational Component' (Dumb Component)** và **'Container Component' (Smart Component)**.  
  **Stateless Component** giống như một chiếc màn hình hiển thị hay một chiếc máy in: nó cực kỳ thụ động và 'ngây thơ'. Đưa dữ liệu nào vào qua Props thì nó in ra đúng giao diện đó, không tự ý suy nghĩ hay lưu trữ gì. Vì không có State, nó hoạt động như một hàm thuần khiết (Pure Function), cực kỳ dễ viết Unit Test, dễ tái sử dụng ở mọi nơi trong dự án (ví dụ các component UI như Avatar, Badge, Button, MovieCard).  
  Ngược lại, **Stateful Component** giống như bộ não chỉ huy. Nó chứa logic nghiệp vụ, quản lý State (danh sách dữ liệu, cờ loading/error, ô tìm kiếm), gọi API từ máy chủ, xử lý tính toán rồi mới phân phát (pass) dữ liệu đó xuống cho các Stateless Component con bên dưới hiển thị. Việc tách bạch rõ ràng giữa component 'chỉ lo giao diện' và component 'lo logic' giúp mã nguồn dự án cực kỳ ngăn nắp, đảm bảo nguyên lý Đơn Trách Nhiệm (Separation of Concerns)."*
* **Điểm nhấn lịch sử phỏng vấn:**
  * Trước phiên bản React 16.8 (thời Class Component), Functional Component từng bị gọi đồng nghĩa là Stateless Component vì hàm không thể chứa state.
  * Nhưng từ React 16.8 với sự ra đời của **React Hooks** (`useState`, `useReducer`), Functional Component hoàn toàn có thể trở thành Stateful Component một cách dễ dàng và mạnh mẽ.

---

### 12. Phân biệt One-Way Data Flow và Two-Way Binding? Có phải Two-Way Binding chỉ nói về Controlled Component?
* **Định nghĩa gọn:**
  * **One-Way Data Flow (Luồng dữ liệu 1 chiều):** Là cơ chế dữ liệu chỉ di chuyển theo một hướng duy nhất từ nguồn dữ liệu (State/Props) xuống Giao diện (UI). Giao diện không có quyền tự động cập nhật ngược lại dữ liệu.
  * **Two-Way Data Binding (Ràng buộc dữ liệu 2 chiều):** Là cơ chế đồng bộ tự động 2 chiều: khi dữ liệu trong code đổi thì giao diện đổi theo, và ngược lại khi người dùng thay đổi trên giao diện thì biến trong code cũng tự động cập nhật mà không cần viết hàm bắt sự kiện thủ công.
* **Hiểu:**  
  *"Khái niệm One-Way Data Flow là **triết lý kiến trúc bao trùm toàn bộ thế giới React**: dữ liệu chỉ chảy từ Component Cha xuống Component Con qua Props, và từ State phản chiếu ra JSX theo công thức `UI = f(State)`. React hoàn toàn không có cơ chế Two-Way Binding tự động ngầm dưới nắp ca-pô như Vue (`v-model`) hay Angular (`[(ngModel)]`).  
  Vậy tại sao người ta lại hay nhắc đến Two-Way Binding khi nói về Controlled Component? Thực chất, Controlled Component chỉ là cách mà lập trình viên **tự tay GIẢ LẬP (mô phỏng) hiệu ứng 2 chiều** ở các ô nhập liệu bằng cách chắp ghép 2 chiều độc lập:  
  1. *Chiều xuôi (State -> UI):* Dùng prop `value={state}` ép ô input hiển thị đúng giá trị của State.  
  2. *Chiều ngược (UI -> State):* Tự tay viết sự kiện `onChange={e => setState(e.target.value)}` để bắt lấy ký tự gõ phím cập nhật ngược về State.  
  Vì vậy, trong React, khi ai đó nói về Two-Way Binding thì họ chỉ đang ám chỉ **kỹ thuật cụ thể ở các ô nhập liệu (Controlled Form)** mà thôi. Còn bộ não kiến trúc của React từ đầu đến chân vẫn luôn vận hành 100% bằng **One-Way Data Flow**."*
* **Tại sao React kiên quyết chọn One-Way Data Flow?**
  * Giúp luồng dữ liệu trở nên cực kỳ **dễ dự đoán (Predictable)** và **dễ truy vết lỗi (Easy to debug)**: Khi một dữ liệu bị sai lệch, ta luôn biết chính xác nguồn gốc Component Cha nào đã thay đổi State, không bao giờ bị hiện tượng dữ liệu bị đột biến ngầm ngoài tầm kiểm soát.

---

### 13. Hook `useState`: Sinh ra làm gì, Cơ chế ngầm và Bẫy Snapshot?
* **Định nghĩa gọn:** `useState` là hook nền tảng dùng để khai sinh và lưu trữ dữ liệu nội tại (State) cho Functional Component, đồng thời cung cấp hàm setter để cập nhật giá trị và kích hoạt React lên lịch vẽ lại giao diện (re-render).
* **Hiểu (Mạch tư duy Nhân - Quả 4 nấc):**
  1. **Sinh ra để làm gì? Khắc phục nỗi đau gì?**  
     Trong JavaScript, biến thường `let count = 0` chỉ sống tạm bợ trong Call Stack của hàm; khi hàm chạy xong là biến bị dọn rác mất sạch, và dù ta có tăng `count++` thì React cũng hoàn toàn "điếc", không biết để vẽ lại màn hình. `useState` sinh ra để giải quyết 2 nỗi đau: vừa giữ cho dữ liệu sống sót qua các lần chạy hàm, vừa đóng vai trò như một **chiếc chuông báo động** để báo cho React biết: *"Dữ liệu đã đổi rồi, hãy re-render lại giao diện đi!"*.
  2. **Làm sao nó làm được việc đó dưới nắp ca-pô? (Closure & React Fiber):**  
     Bản chất `useState` là ứng dụng đỉnh cao của **Closure** trong JavaScript. React không lưu giá trị state bên trong hàm của ta, mà lưu trong một Node riêng biệt nằm trên cây **React Fiber ở vùng nhớ Heap**. Khi hàm component chạy xong và biến mất khỏi Call Stack, sợi dây liên kết Closure giữa hàm setter và Node Fiber trong Heap vẫn được bảo toàn nguyên vẹn. Lần sau khi component re-render, React chỉ việc thò tay vào đúng Node Fiber đó để bốc giá trị state mới nhất trả về cho ta.
  3. **Hệ quả & Bẫy do bản chất gây ra (Bẫy Snapshot):**  
     Do mỗi lần re-render thực chất là một lần gọi hàm mới độc lập, nên State bên trong thân hàm hoạt động như một **bức ảnh chụp tĩnh (Snapshot)** bị Closure đóng băng tại thời điểm render đó. Do đó, nếu trong cùng 1 sự kiện ta gọi `setCount(count + 1)` ba lần liên tiếp, cả ba dòng lệnh thực chất đều đang nhìn vào cùng một giá trị cũ của bức ảnh chụp (ví dụ `0 + 1 = 1`), kết quả cuối cùng `count` chỉ tăng 1!
  4. **Cách giải quyết & Quy tắc thực chiến:**  
     * **Giải quyết bẫy Snapshot:** Dùng **Functional Update** `setCount(prev => prev + 1)` để đưa các lệnh cập nhật vào hàng đợi (Queue), React sẽ lấy kết quả hàm trước làm đầu vào cho hàm sau.  
     * **Tự động gom cụm (Automatic Batching trong React 18+):** Dù gọi nhiều lệnh `setState` liên tiếp (kể cả trong `setTimeout`, `Promise`), React tự động gom thành 1 đợt re-render duy nhất vào cuối nhịp để tránh giật lag.  
     * **Khởi tạo lười biếng (Lazy Initialization):** Với dữ liệu ban đầu cần tính toán nặng (đọc `localStorage`, parse JSON), truyền dạng hàm callback `useState(() => JSON.parse(...))` để chỉ chạy đúng 1 lần khi Mount, không bị tính lại ở mỗi nhịp re-render.  
     * **Nguyên tắc Bất biến (Immutability):** Cấm sửa trực tiếp Object/Array (`arr.push()`), vì React so sánh nông (`===`) địa chỉ ô nhớ Heap. Phải dùng Spread `[...arr]`, `{...obj}` để đổi địa chỉ ô nhớ mới thì React mới chịu vẽ lại.

---

### 14. Hook `useEffect`: Bản chất Side Effect, Trục thời gian Browser Paint và Cơ chế Cleanup?
* **Định nghĩa gọn:** `useEffect` là hook dùng để thực hiện các tác vụ phụ (Side Effects) tương tác với thế giới bên ngoài (API, Timer, Event Listener, Storage), đảm bảo các tác vụ này chạy **bất đồng bộ sau khi trình duyệt đã vẽ xong giao diện (Browser Paint)** để không làm gián đoạn trải nghiệm người dùng.
* **Hiểu (Mạch tư duy Nhân - Quả 4 nấc):**
  1. **Sinh ra để làm gì? Khắc phục nỗi đau gì?**  
     Nhiệm vụ thiêng liêng của một hàm Component là một **hàm thuần khiết (Pure Function)**: chỉ nhận Props và đọc State để tính toán ra bản vẽ JSX (`UI = f(State)`). Nếu ta gọi API, đặt timer hay thêm event listener ngay giữa thân hàm, mỗi lần re-render các tác vụ này sẽ bị chạy lại vô tội vạ, dẫn đến lỗi nổ tung trình duyệt (Infinite Loop). Hơn nữa, việc gọi mạng ngay giữa thân hàm sẽ chặn đứng luồng render của trình duyệt. `useEffect` sinh ra như một **"khu cách ly an toàn" (Sandbox)** để bóc tách toàn bộ việc phụ ra khỏi luồng render chính.
  2. **Làm sao nó làm được việc đó dưới nắp ca-pô? (Trục thời gian Browser Paint):**  
     * **Tại sao không gọi API trước rồi mới vẽ mà lại vẽ xong mới gọi API?** Trình duyệt hoạt động trên một luồng chính duy nhất (Single-Thread). Nếu bắt React chờ API mất 1-2 giây mới được vẽ, màn hình người dùng sẽ **trắng tinh, đơ lag hoàn toàn**!  
     * **Triết lý React:** React ưu tiên vẽ ngay lập tức **Khung sườn ứng dụng (Skeleton, Header, Loading Spinner)** trong 0.01 giây đầu tiên để người dùng thấy web đang phản hồi. Sau khi Browser Paint xong xuôi lên mắt người dùng, React mới mở sổ tay ra thực thi hàm trong `useEffect` để âm thầm gọi API ở hậu trường. Khi dữ liệu về, ta mới `setState` để đắp thịt vào khung.
  3. **Hệ quả & 5 Cạm bẫy sống còn do bản chất gây ra:**  
     * **3 Cấp độ Mảng Dependency:**  
       * *Không truyền mảng:* Chạy sau **mọi lần** render -> **Tuyệt đối cấm gọi `setState`** ở đây vì sẽ tạo ra vòng lặp vô tận (*Render -> Effect -> setState -> Render -> Effect...* -> nổ lỗi *"Maximum update depth exceeded"*).  
       * *Mảng rỗng `[]`:* Chỉ chạy đúng **1 lần duy nhất** sau lần render đầu tiên (Mount).  
       * *Mảng có biến `[a, b]`:* Chỉ chạy lại khi ít nhất một biến bị thay đổi giá trị (so sánh nông `===`).  
     * **Cơ chế hàm Dọn dẹp (Cleanup Function) - Chạy vào 2 thời điểm:**  
       * *Thời điểm 1:* Chạy **TRƯỚC KHI EFFECT KẾ TIẾP ĐƯỢC KÍCH HOẠT** (để dọn dẹp rác của lần chạy cũ trước khi đón nhận lần chạy mới; ví dụ: dọn dẹp kết nối phòng Chat A trước khi nhảy vào phòng Chat B).  
       * *Thời điểm 2:* Chạy **KHI COMPONENT BỊ TIÊU HỦY (UNMOUNT)** để thu hồi tài nguyên (hủy `clearInterval`, gỡ `removeEventListener`, hủy request mạng).  
     * **Tại sao cấm viết `useEffect(async () => ...)`?** Hàm truyền vào `useEffect` chỉ được phép trả về `undefined` hoặc `Cleanup Function`. Hàm `async` luôn trả về một `Promise Object`. Nếu viết `async`, khi unmount React cố chạy `cleanup()` sẽ bị crash lỗi: *`TypeError: destroy is not a function`*.  
     * **Bẫy Stale Closure trong Timer:** Đặt `setInterval` trong effect có `[]` sẽ khiến biến State bị đóng băng vĩnh viễn ở giá trị ban đầu. Khắc phục bằng Functional Update: `setCount(prev => prev + 1)`.  
     * **Bẫy StrictMode (Dev) chạy Effect 2 lần:** React cố tình giả lập chu kỳ *Mount -> Unmount -> Mount* để ép lập trình viên phải viết Cleanup Function chuẩn, phát hiện sớm rò rỉ bộ nhớ (Memory Leak).
  4. **Quy tắc vàng thực chiến & Kiến trúc hiện đại:**  
     * **"You Might Not Need an Effect" (Triệt tiêu State thừa):** Tuyệt đối không dùng `useEffect` để tính toán dữ liệu suy diễn (Derived State) như tính tổng tiền giỏ hàng từ danh sách món hàng. Dùng `useEffect` sẽ làm **tốn thêm 1 nhịp re-render thừa** và gây chớp giật lệch pha giao diện. Hãy tính trực tiếp trong thân hàm khi render: `const total = items.reduce(...)`.  
     * **Tiến hóa sang Server State (`useQuery`):** Trong kiến trúc hiện đại, hạn chế dùng `useEffect` để fetch data vì thiếu caching, dễ dính Race Condition. Thay vào đó, dùng thư viện chuyên dụng như **TanStack Query (`useQuery`)** để quản lý Server State, còn `useEffect` chỉ dành thuần túy cho việc đồng bộ với External Systems (DOM, WebSocket, Timer).

---

### 15. Hook `useRef`: Hai sứ mệnh cốt lõi, Tại sao không dùng biến thường `let` và Cơ chế ngầm?
* **Định nghĩa gọn:** `useRef` là hook dùng để tạo ra một đối tượng JavaScript có thể biến đổi (Mutable Object) với thuộc tính duy nhất là `.current`, có giá trị được bảo tồn xuyên suốt toàn bộ vòng đời của component mà việc thay đổi giá trị này **hoàn toàn không kích hoạt chu trình vẽ lại (re-render)**.
* **Hiểu (Mạch tư duy Nhân - Quả 4 nấc):**
  1. **Sinh ra để làm gì? Khắc phục 2 nỗi đau lớn nào?**  
     * *Nỗi đau 1 (Thao tác DOM mệnh lệnh):* React là thế giới khai báo (`UI = f(State)`). Nhưng có những việc bắt buộc phải tương tác trực tiếp với DOM thật của trình duyệt: tự động `focus()` vào ô input, đo kích thước phần tử (`getBoundingClientRect`), cuộn trang (`scrollIntoView`), điều khiển video (`play()`, `pause()`).  
     * *Nỗi đau 2 (Lưu biến sống sót mà không muốn re-render - Bài toán Stopwatch):* Ta cần lưu một biến phụ trợ (như `timerId` của `setInterval`, biến cờ `isMounted`, hoặc lưu giá trị cũ `previousState`).  
       * Nếu lưu bằng `useState`: Mỗi lần cập nhật biến lại kích hoạt re-render thừa mứa.  
       * Nếu dùng biến thường `let timerId` bên trong hàm: Mỗi lần component re-render, biến này bị khai báo lại và reset sạch về ban đầu -> Mất dấu timer, không thể bấm nút Stop!  
       * Nếu khai báo `let timerId` bên ngoài hàm component: Biến trở thành biến toàn cục, nếu trên màn hình có 2 chiếc đồng hồ bấm giờ cùng dùng chung component này thì chúng sẽ **đè biến lẫn nhau** gây ra bug nghiêm trọng!  
     👉 `useRef` sinh ra để giải quyết hoàn hảo cả 2 nỗi đau: vừa là cầu nối trỏ vào DOM thật, vừa là chiếc **két sắt lưu biến riêng biệt** cho từng phiên bản component mà không làm xao động giao diện.
  2. **Làm sao nó làm được việc đó dưới nắp ca-pô?**  
     React tạo ra một Plain Object có cấu trúc `{ current: initialValue }` và lưu vào Node Fiber tương ứng trên bộ nhớ Heap. Mỗi lần component re-render, React chỉ trả về chính xác tham chiếu của cùng Object đó. Khi bạn gán `ref.current = 123`, bạn chỉ đang sửa đổi thuộc tính của một object thông thường trong JavaScript. React hoàn toàn không lắng nghe sự kiện này nên **không có bất kỳ lệnh re-render nào được lên lịch**.
  3. **Hệ quả & Bẫy do bản chất gây ra (Senior Gotchas):**  
     * **Bẫy 1 (Thay đổi không làm re-render):** Đừng bao giờ dùng `useRef` để lưu dữ liệu cần hiển thị nhảy số trực tiếp lên màn hình (ví dụ số đếm bấm nút hiển thị ra UI bắt buộc phải dùng `useState`).  
     * **Bẫy 2 (Đọc/ghi ref trong khi render):** Không được đọc hoặc sửa `ref.current` ngay giữa thân hàm component trong pha render (trước câu lệnh `return JSX`) vì vi phạm tính chất Pure Function. Chỉ được thao tác với `ref.current` bên trong các hàm xử lý sự kiện (Event Handlers) hoặc bên trong `useEffect`.
  4. **Quy tắc thực chiến:** Dùng `useRef` cho: Thẻ DOM thật, Timer IDs (`setInterval`), đối tượng kết nối `AbortController`, WebSocket instance, và kỹ thuật lưu `previousValue`.

---

### 16. Hook `useContext`: Cơ chế Publisher-Subscriber, Nỗi đau Prop Drilling và Bẫy Re-render toàn cây?
* **Định nghĩa gọn:** `useContext` là hook dùng để đọc và đăng ký theo dõi dữ liệu từ một React Context toàn cục mà không cần phải truyền props thủ công qua từng tầng component trung gian.
* **Hiểu (Mạch tư duy Nhân - Quả 4 nấc):**
  1. **Sinh ra để làm gì? Khắc phục nỗi đau gì? (Vấn nạn Prop Drilling):**  
     Khi có một dữ liệu dùng chung cho toàn bộ ứng dụng (như Theme Sáng/Tối, Thông tin User đăng nhập, Giỏ hàng), Component Con ở tầng thứ 7 cần dùng nhưng Component Cha ở tầng 1 nắm giữ. Ta buộc phải truyền props xuyên qua 5 component trung gian (tầng 2, 3, 4, 5, 6) dù các component này hoàn toàn không có nhu cầu sử dụng dữ liệu đó. Code trở nên cực kỳ rác và khó bảo trì. `useContext` kết hợp với `createContext` sinh ra theo mô hình **Phát thanh - Thu sóng (Publisher - Subscriber)**: Cha bọc Provider phát sóng ở trên, bất kỳ Con/Cháu nào ở sâu bên dưới chỉ cần bật đài thu `useContext` là lấy được dữ liệu ngay lập tức.
  2. **Làm sao nó làm được việc đó dưới nắp ca-pô?**  
     `<MyContext.Provider value={data}>` phát sóng dữ liệu xuống cây component. Khi một component con gọi `useContext(MyContext)`, React ngầm đánh dấu component này vào danh sách những "người đăng ký theo dõi" (Consumers). Khi giá trị `value` của Provider thay đổi, React sẽ duyệt qua toàn bộ các component Consumer này và kích hoạt chu trình re-render để cập nhật giá trị mới.
  3. **Hệ quả & 2 Bẫy chí mạng do bản chất gây ra (Senior Gotchas):**  
     * **Bẫy 1: Re-render lan tỏa toàn bộ cây con:** Hễ giá trị `value` của Provider thay đổi, **TẤT CẢ các component có gọi `useContext` đó ĐỀU BỊ BẮT BUỘC RE-RENDER**, bất kể chúng chỉ dùng 1 trường dữ liệu rất nhỏ bên trong object `value`! Thậm chí chiếc khiên `React.memo` bọc quanh component con cũng **HOÀN TOÀN BẤT LỰC**, không chặn được đợt re-render do `useContext` kích hoạt!  
     * **Bẫy 2: Context Hell (Kim tự tháp Provider):** Lồng ghép quá nhiều Provider lồng nhau (`<AuthProvider><ThemeProvider><CartProvider><LangProvider>...`) làm cây component phình to, rối mắt.
  4. **Quy tắc thực chiến & Tiến hóa sang Zustand:**  
     * **Tối ưu Context:** Không nhét tất cả vào 1 context khổng lồ. Hãy chia nhỏ thành nhiều context hẹp (`ThemeContext`, `AuthContext`). Luôn bọc `useMemo` cho object `value` của Provider để tránh tạo object mới ở mỗi lần cha re-render.  
     * **Đòn phản công Senior:** Với Client Global State phức tạp có nhiều component dùng chung và tần suất cập nhật cao, trong dự án hiện đại ta chuộng **Zustand** hơn Context API. Vì Zustand có cơ chế **Selector**: component chỉ re-render khi đúng trường dữ liệu nó đăng ký bị thay đổi, triệt tiêu 100% vấn nạn re-render lan tỏa của Context API mà lại không cần bọc Provider!

---

### 17. Hook `useReducer`: Vị trí định nghĩa Trong/Ngoài Component, Luồng Data Flow và Tại sao Reducer phải là Pure Function?
* **Định nghĩa gọn:** `useReducer` là hook quản lý State nâng cao dựa trên kiến trúc Redux, gom toàn bộ logic tính toán state phức tạp có nhiều hành động liên đới vào một hàm xử lý tập trung duy nhất gọi là `reducer`.
* **Hiểu (Mạch tư duy Nhân - Quả 4 nấc):**
  1. **Sinh ra để làm gì? Khắc phục nỗi đau gì?**  
     Khi state là một object/array phức tạp (như Giỏ hàng: thêm, xóa, sửa số lượng, áp mã giảm giá, tính phí ship), nếu dùng `useState`, logic tính toán sẽ bị xé lẻ rải rác khắp nơi trong các sự kiện `onClick` ở file JSX. Component trở nên cồng kềnh, khó kiểm thử và dễ sinh lỗi lệch pha. `useReducer` sinh ra để **tách rời 100% logic nghiệp vụ tính toán ra khỏi giao diện JSX**: Component JSX chỉ làm một việc duy nhất là bắn đi một thông điệp ý định (`dispatch(action)`), còn việc tính toán state mới ra sao thì ủy thác toàn quyền cho hàm `reducer`.
  2. **Cách trình bày chuẩn mực cho Mentor: Ở ĐÂU định nghĩa cái gì và Luồng chạy ra sao?**  
     * **PHẦN 1: BÊN NGOÀI COMPONENT (Định nghĩa 3 thứ trước, không bị tạo lại khi re-render):**  
       * `initState`: Khai báo giá trị ban đầu (ví dụ: `{ items: [], total: 0 }`).  
       * `Actions / Action Creators`: Định nghĩa tên hành động và hàm đóng gói payload (ví dụ: `const addJob = payload => ({ type: 'ADD_JOB', payload })`).  
       * `reducer(state, action)`: Khai báo hàm xử lý thuần khiết, dùng `switch(action.type)` để nhận `state` hiện tại và `action`, tính toán rồi `return newState`.  
     * **PHẦN 2: BÊN TRONG COMPONENT:**  
       * Gọi hook: `const [state, dispatch] = useReducer(reducer, initState);`.  
       * Trong sự kiện JSX: Gắn vào nút bấm `onClick={() => dispatch(addJob(job))}`.  
     * **PHẦN 3: LUỒNG CHẠY THỰC TẾ KHI NGƯỜI DÙNG CLICK NÚT (DATA FLOW):**  
       1. Người dùng bấm nút -> Kích hoạt hàm `dispatch(action)`.  
       2. React tự động đón lấy `action` đó, thò tay vào lấy `state` hiện tại, rồi truyền cả hai vào làm tham số cho hàm `reducer(state, action)`.  
       3. Hàm `reducer` chạy, tính toán và trả về (return) một `newState` bất biến mới.  
       4. React nhận lấy `newState`, phát hiện state đã đổi -> Kích hoạt chu kỳ **re-render** lại Component để vẽ giao diện mới!
  3. **Hệ quả & Bẫy sống còn (Tại sao Reducer BẮT BUỘC phải là Pure Function?):**  
     * **Cấm mutate state:** Tuyệt đối không sửa trực tiếp (`state.items.push(x)`), phải luôn trả về bản sao bất biến mới (`{ ...state, items: [...state.items, x] }`).  
     * **Cấm Side Effects:** Tuyệt đối **KHÔNG ĐƯỢC gọi API (fetch), không sinh số ngẫu nhiên (`Math.random()`), không đọc giờ hệ thống (`Date.now()`)** bên trong reducer! Vì Reducer bắt buộc phải là một hàm thuần khiết: Cùng một đầu vào `(state, action)` thì luôn luôn phải cho ra cùng một `newState` đầu ra 100% các lần chạy (Predictable).
  4. **Khi nào dùng `useState` vs `useReducer`?**  
     * Dùng `useState`: Khi state đơn giản, độc lập (1-2 biến, boolean bật/tắt, chuỗi ô input).  
     * Dùng `useReducer`: Khi state có cấu trúc lồng nhau nhiều tầng, nhiều hành động phức tạp làm thay đổi state, hoặc làm bước đệm chuyển tiếp sang Redux / Zustand.

---

### 18. HOC `React.memo`: Chiếc khiên bảo vệ Component con khỏi re-render thừa?
* **Định nghĩa gọn:** `React.memo` là một **Higher-Order Component (HOC)** dùng để bọc quanh một Component con, giúp component đó tự động ghi nhớ (memoize) kết quả render và ngăn chặn việc re-render nếu các `props` truyền vào không hề thay đổi.
* **Hiểu (Mạch tư duy Nhân - Quả 4 nấc):**
  1. **Sinh ra để làm gì? Khắc phục nỗi đau gì?**  
     Mặc định trong React: Cứ khi nào Component Cha re-render thì **toàn bộ các Component Con bên dưới bị kéo theo re-render vô điều kiện**, bất kể Props truyền vào con có đổi hay không! Nếu Component con rất nặng (render danh sách 1.000 dòng, biểu đồ, video player), việc bị vẽ lại vô ích này sẽ làm tụt FPS, đơ giật trang web. `React.memo` sinh ra như một **chiếc khiên bảo vệ**: biến component con thành một Pure Component.
  2. **Tại sao `React.memo` là HOC chứ không phải Hook?**  
     Vì nó không có chữ `use` ở đầu, và nó hoạt động đúng theo mẫu thiết kế HOC: Nhận vào một Component gốc (`MovieCard`) và trả về một Component mới đã được bọc cơ chế so sánh nông (`prevProps === nextProps`). Nếu tất cả props mới bằng props cũ, React bỏ qua việc chạy lại hàm con và tái sử dụng 100% cây Virtual DOM cũ trong RAM.
  3. **Khi nào chiếc khiên `React.memo` bị vỡ tan tành?**  
     Chiếc khiên chỉ bảo vệ được khi props là các kiểu dữ liệu nguyên thủy (string, number, boolean) hoặc object/array/function giữ nguyên địa chỉ ô nhớ.  
     Nếu cha truyền xuống một **inline object** (`style={{ color: 'red' }}`), một **inline array** (`tags={['action', 'drama']}`), hoặc một **hàm thường** (`onClick={() => handleClick()}`) -> Ở mỗi lần cha render, các biến này đều bị cấp phát **địa chỉ ô nhớ Heap mới toanh** -> Phép so sánh nông `prevProps === nextProps` luôn trả về `false` -> **Chiếc khiên `React.memo` bị vỡ tan tành**, con vẫn bị re-render thừa!
  4. **Custom ArePropsEqual:** `React.memo(Component, (prevProps, nextProps) => ...)` cho phép ta tự viết hàm so sánh sâu tùy biến nếu cần.

---

### 19. Hook `useCallback`: Đóng băng địa chỉ hàm trong RAM và Cứu chiếc khiên `React.memo`?
* **Định nghĩa gọn:** `useCallback` là hook dùng để lưu bộ nhớ đệm (cache) và giữ nguyên địa chỉ ô nhớ của một định nghĩa hàm (function definition) giữa các lần re-render, chỉ tạo lại hàm mới khi các biến trong mảng dependency thay đổi.
* **Hiểu (Mạch tư duy Nhân - Quả 4 nấc):**
  1. **Sinh ra để làm gì? Khắc phục nỗi đau gì?**  
     Trong JavaScript, hàm là Object (lưu theo địa chỉ tham chiếu ở vùng nhớ Heap). Mỗi khi component cha re-render, toàn bộ thân hàm cha chạy lại từ trên xuống dưới -> mọi hàm con khai báo bên trong cha (ví dụ `const handleDelete = () => {}`) đều bị cấp phát một **địa chỉ ô nhớ Heap hoàn toàn mới**.  
     Khi cha truyền hàm `handleDelete` này xuống cho con làm prop, component con dù đã bọc `React.memo` nhưng vẫn bị kéo theo re-render vì thấy địa chỉ hàm bị đổi! `useCallback` sinh ra để **đóng băng con trỏ hàm**, đảm bảo truyền cùng một địa chỉ ô nhớ cũ xuống cho con, cứu chiếc khiên `React.memo` khỏi bị thủng.
  2. **Làm sao nó làm được việc đó dưới nắp ca-pô?**  
     React Fiber lưu trữ tham chiếu của hàm đó trên bộ nhớ Heap kèm theo mảng dependency. Ở các lần cha re-render tiếp theo, React so sánh nông các biến dependency: nếu không đổi, React bỏ qua việc tạo hàm mới và trả về đúng địa chỉ con trỏ hàm cũ từ trong RAM.
  3. **Bẫy kinh điển: Dùng `useCallback` một mình HOÀN TOÀN VÔ NGHĨA!**  
     Nếu component con **KHÔNG ĐƯỢC BỌC `React.memo`**, thì việc cha bọc `useCallback` cho hàm là **HOÀN TOÀN VÔ DỤNG**! Vì theo cơ chế mặc định của React, hễ Cha re-render thì toàn bộ Cây Con bên dưới tự động re-render theo, bất kể props hàm có đổi hay không. Thậm chí dùng `useCallback` bừa bãi còn tốn thêm chi phí CPU và RAM để quản lý dependency array.
  4. **Quy tắc thực chiến:** Chỉ dùng `useCallback` khi:  
     * Truyền hàm xuống component con nặng được bọc `React.memo`.  
     * Hoặc khi hàm đó là một biến phụ thuộc (dependency) nằm trong mảng dependency của `useEffect`.

---

### 20. Hook `useMemo` & Mổ xẻ Mảng Dependency: Khác gì với 3 loại của `useEffect`?
* **Định nghĩa gọn:** `useMemo` là hook dùng để lưu bộ nhớ đệm (cache) kết quả trả về của một phép tính toán đắt đỏ (expensive calculation) trong RAM, chỉ tính toán lại khi các biến trong mảng dependency thay đổi.
* **Hiểu (Mạch tư duy Nhân - Quả 4 nấc):**
  1. **Sinh ra để làm gì? Khắc phục nỗi đau gì?**  
     Khi component có một tác vụ tính toán nặng (lọc, sắp xếp danh sách 5.000 bộ phim, tính toán ma trận đồ họa). Nếu viết trực tiếp trong thân hàm, mỗi khi có bất kỳ state nhỏ nào khác thay đổi (gõ phím ô chat, đổi theme), component bị re-render và phép tính nặng 5.000 phần tử lại chạy lại từ đầu -> đơ giao diện, tụt FPS. `useMemo` đóng băng kết quả trong RAM, lần sau re-render chỉ việc lôi kết quả cũ ra dùng trong 0ms.
  2. **Mổ xẻ Mảng Dependency: Khác gì với 3 loại của `useEffect`?**  
     * Trong `useEffect`, ta có **3 loại dependency**: Không truyền mảng (chạy sau mọi lần render), Mảng rỗng `[]` (chạy 1 lần khi Mount), và Mảng có biến `[a, b]` (chạy khi biến đổi).  
     * **NHƯNG TRONG `useCallback` VÀ `useMemo`:** Về mặt thực tế, **BẮT BUỘC LUÔN PHẢI TRUYỀN MẢNG DEPENDENCY** (`[]` hoặc `[a, b]`).  
       * Nếu ai đó không truyền mảng dependency vào `useCallback/useMemo`, thì ở MỖI LẦN RENDER, hàm lại bị tạo mới và phép tính lại bị tính lại từ đầu -> **Vô hiệu hóa 100% mục đích caching của hook, hoàn toàn vô dụng!**  
       * Thuật toán so sánh dependency của cả 3 hook là giống hệt nhau: Đều dùng thuật toán so sánh nông `Object.is` (tương đương `===`).
  3. **So sánh trực diện `useMemo` vs `useCallback`:**  
     * `useMemo`: Ghi nhớ **GIÁ TRỊ KẾT QUẢ** -> `useMemo(() => compute(a), [a])` trả về giá trị (number, string, array, object).  
     * `useCallback`: Ghi nhớ **CHÍNH BẢN THÂN HÀM ĐÓ** -> `useCallback(() => doWork(), [])` trả về con trỏ hàm.  
     *(Thực chất: `useCallback(fn, deps)` tương đương với `useMemo(() => fn, deps)`)*.
  4. **Bẫy Senior: Tối ưu hóa sớm (Premature Optimization) & Tương lai React Compiler:**  
     Không bọc `useMemo` cho phép tính cộng trừ đơn giản kiểu `a + b` vì tốn thêm CPU so sánh dependency và tốn RAM lưu cache. Trong React 19, **React Compiler** tự động memoize code dưới tầng biên dịch, giải phóng lập trình viên khỏi việc viết thủ công!

---

### 21. Hook `useLayoutEffect`: Chạy đồng bộ trước Browser Paint và Triệt tiêu Visual Flicker?
* **Định nghĩa gọn:** `useLayoutEffect` là hook có chữ ký cú pháp giống hệt `useEffect`, nhưng hàm callback của nó được thực thi **đồng bộ ngay sau khi React commit DOM và TRƯỚC KHI trình duyệt kịp vẽ (Paint)** các điểm ảnh lên màn hình.
* **Hiểu (Mạch tư duy Nhân - Quả 4 nấc):**
  1. **Sinh ra để làm gì? Khắc phục nỗi đau Visual Flicker (Chớp màn hình):**  
     Với `useEffect`, chu trình là: *Render -> Commit DOM -> Trình duyệt vẽ (Browser Paint) -> Chạy Effect*.  
     Nếu trong Effect bạn đo kích thước một thẻ DOM và thấy nó bị tràn màn hình nên cập nhật lại State để chỉnh vị trí (ví dụ Tooltip xổ ra bị lọt mép phải, cần kéo sang trái):  
     Người dùng sẽ nhìn thấy Tooltip xuất hiện ở mép phải bị lệch, rồi chớp mắt giật một cái nhảy sang trái (**Visual Flicker**).  
     `useLayoutEffect` sinh ra để chặn đứng hiện tượng này: nó chạy TRƯỚC KHI trình duyệt vẽ, ép trình duyệt đợi tính toán xong vị trí chuẩn rồi mới vẽ ra màn hình một lần duy nhất, triệt tiêu 100% hiện tượng chớp hình.
  2. **Làm sao nó làm được việc đó dưới nắp ca-pô?**  
     Nó chạy đồng bộ (Synchronous Blocking) trên luồng chính Main Thread của trình duyệt. Nó chặn đứng quá trình Browser Paint cho tới khi toàn bộ code bên trong `useLayoutEffect` chạy xong xuôi.
  3. **Con dao 2 lưỡi & Bẫy hiệu năng:**  
     Vì nó chặn Main Thread của trình duyệt, nếu bạn nhét vào đó các tác vụ nặng (như gọi API hay vòng lặp lớn), toàn bộ trang web sẽ bị **đứng hình, đơ cứng màn hình** không phản hồi.
  4. **Quy tắc vàng lựa chọn:**  
     * **99% trường hợp:** Dùng `useEffect` (để web mượt, không chặn vẽ màn hình).  
     * **1% trường hợp đặc biệt:** Chỉ dùng `useLayoutEffect` khi cần **đo đạc kích thước DOM thật** (`getBoundingClientRect`, `scrollHeight`) hoặc sửa đổi giao diện khẩn cấp trước khi mắt người dùng nhìn thấy để chống giật hình (Tooltip, Popover, Animation khởi đầu).

---

### 22. Custom Hooks: Nghệ thuật bóc tách logic và Quy tắc "Dùng chung Logic chứ KHÔNG dùng chung State"?
* **Định nghĩa gọn:** Custom Hook là một hàm JavaScript thông thường do lập trình viên tự định nghĩa, có tên bắt đầu bằng tiền tố `use`, bên trong có khả năng gọi các React Hooks khác để bóc tách và tái sử dụng logic có trạng thái (Stateful Logic).
* **Hiểu (Mạch tư duy Nhân - Quả 4 nấc):**
  1. **Sinh ra để làm gì? Khắc phục nỗi đau gì?**  
     Trước đây, khi 2 component khác nhau cùng cần một logic (ví dụ: cùng cần gọi API tìm kiếm kèm Debounce 400ms, cùng cần lắng nghe kích thước màn hình resize, cùng cần lưu và đọc `localStorage`), ta phải copy-paste hàng chục dòng code `useState`, `useEffect` sang cả 2 file. Code bị lặp lại, khó bảo trì. Custom Hook sinh ra để gom toàn bộ "cỗ máy logic" đó vào một hàm dùng chung duy nhất, giúp component giao diện trở nên sạch tinh tươm.
  2. **Bẫy phỏng vấn Senior số 1: "Hai component cùng gọi 1 Custom Hook thì có dùng chung State với nhau không?"**  
     * **CÂU TRẢ LỜI ĐANH THÉP: TUYỆT ĐỐI KHÔNG!**  
     * Custom Hooks **chỉ tái sử dụng LOGIC, chứ KHÔNG CHIA SẺ DỮ LIỆU STATE**!  
     * Mỗi lần một component gọi `useCustomHook()`, React lại khai sinh ra một bộ State hoàn toàn độc lập và riêng biệt trên cây Fiber của component đó. Component A đổi state bên trong custom hook thì Component B hoàn toàn không bị ảnh hưởng! *(Muốn chia sẻ chung dữ liệu State thì phải dùng Context API hoặc Zustand)*.
  3. **Quy tắc bất di bất dịch của Custom Hook:**  
     * Tên hàm **BẮT BUỘC phải bắt đầu bằng chữ `use`** viết thường (ví dụ: `useDebounce`, `useMovieDetail`, `useLocalStorage`). Nếu không có chữ `use`, bộ công cụ linter của React sẽ không thể kiểm tra và bảo vệ các Quy tắc của Hooks (Rules of Hooks).  
     * Không được gọi Custom Hook bên trong câu lệnh điều kiện `if`, vòng lặp `for`, hoặc hàm lồng nhau.
  4. **Ví dụ thực chiến trong dự án của bạn:**  
     `useDebounce(keyword, 400)` (trì hoãn từ khóa), `useMovieDetail(slug)` (bọc TanStack Query cache 5 phút).

---

### 23. Hook `useImperativeHandle` & `forwardRef`: Đóng gói "Tay nắm cửa an toàn" bảo vệ Component Con
* **Định nghĩa gọn:** `useImperativeHandle` là hook dùng để tùy biến và giới hạn các thuộc tính/phương thức của một ref mà Component Cha có quyền truy cập khi truyền `ref` xuống Component Con, ngăn không cho Cha can thiệp trực tiếp vào thẻ DOM thật của Con.
* **Hiểu (Mạch tư duy Nhân - Quả 4 nấc):**
  1. **Sinh ra để làm gì? Khắc phục nỗi đau gì?**  
     Mặc định, nếu Cha truyền một `ref` xuống Con thông qua `forwardRef`, Cha sẽ cầm trong tay toàn bộ thẻ DOM thật của Con (`<video>`, `<input>`). Điều này phá vỡ tính đóng gói (Encapsulation) của Component: Cha có thể tùy tiện can thiệp đổi style lung tung, xóa thẻ, sửa thuộc tính sâu bên trong Con.  
     `useImperativeHandle` sinh ra để tạo một **"tay nắm cửa an toàn"**: Con chỉ phơi bày (expose) đúng 1-2 hàm được cấp phép cho Cha gọi (ví dụ: `play()`, `pause()`, `focus()`), tuyệt đối giấu kín thẻ DOM thật bên trong.
  2. **Làm sao nó làm được việc đó dưới nắp ca-pô?**  
     Bên trong component con, ta gọi `useImperativeHandle(ref, () => ({ play: () => videoRef.current.play(), pause: () => videoRef.current.pause() }))`. Lúc này thuộc tính `parentRef.current` ở component Cha chỉ nhận được đúng một Plain Object chứa 2 hàm `play` và `pause`, hoàn toàn không chạm được vào thẻ `<video>` thật!
  3. **Bước ngoặt trong React 19:**  
     Trong React 19, `forwardRef` đã chính thức bị loại bỏ (deprecated)! React 19 cho phép truyền `ref` trực tiếp như một prop thông thường: `function VideoPlayer({ ref })`. Nhưng `useImperativeHandle` vẫn giữ nguyên giá trị cốt lõi để đóng gói bảo mật API cho component con.
  4. **Quy tắc thực chiến:** Dùng khi xây dựng UI Library, Video Player tùy biến, hoặc Modal/Drawer tùy biến cần cấp API `open()`, `close()` cho bên ngoài gọi.

---

### 24. Hook `useId`: Tạo Unique ID an toàn cho Form a11y và Khắc phục xung đột SSR / Hydration
* **Định nghĩa gọn:** `useId` (ra mắt từ React 18) là hook dùng để sinh ra các chuỗi ID ngẫu nhiên duy nhất cho các phần tử giao diện, đảm bảo tính đồng nhất tuyệt đối giữa Server-Side Rendering (SSR) và Client Hydration.
* **Hiểu (Mạch tư duy Nhân - Quả 4 nấc):**
  1. **Sinh ra để làm gì? Khắc phục 2 nỗi đau lớn:**  
     * *Nỗi đau 1 (Form Accessibility - a11y):* Cặp thẻ `<label htmlFor="email">` cần khớp với `<input id="email">`. Nếu component này được tái sử dụng 5 lần trên cùng 1 trang, ID `email` bị trùng lặp 5 lần -> vi phạm tiêu chuẩn HTML và khi người dùng click vào label thứ 2, con trỏ lại focus nhầm vào ô input thứ 1!  
     * *Nỗi đau 2 (Bẫy Hydration Mismatch của `Math.random()`):* Nếu tự viết `const id = Math.random()`, khi render trên Server ra chuỗi `0.123`, nhưng khi tải về Client trình duyệt chạy lại ra chuỗi `0.456` -> React nổ lỗi đỏ cảnh báo **Hydration Mismatch** làm vỡ giao diện!  
     👉 `useId` sinh ra để giải quyết triệt để cả 2 nỗi đau: vừa sinh ID duy nhất cho từng component instance, vừa đồng nhất 100% giữa Server và Client.
  2. **Làm sao nó làm được việc đó dưới nắp ca-pô?**  
     React không dùng hàm random ngẫu nhiên. React sinh ID dựa trên **Tọa độ vị trí của Component đó trong cây React Fiber** (Fiber Tree path, ví dụ `:r1:`, `:r2:`). Vì cấu trúc cây component trên Server và Client là giống hệt nhau, nên ID sinh ra ở cả 2 môi trường luôn khớp nhau 100%.
  3. **Bẫy sống còn:** Tuyệt đối **KHÔNG dùng `useId` để sinh ra `key` trong mảng `.map()`**! Thuộc tính `key` phải bắt nguồn trực tiếp từ dữ liệu (`item.id`), không được dùng `useId` làm key.

---

### 25. Concurrent React: `useTransition` vs `useDeferredValue` — Bộ đôi điều phối thứ tự render
* **Định nghĩa gọn:** Đây không phải hook tạo state hay gọi API, mà là **bộ đôi hook điều phối thứ tự ưu tiên khi render** (ra mắt từ React 18): Chúng giúp **trì hoãn việc vẽ các danh sách nặng** (như bảng 10.000 dòng) để **nhường luồng chính cho thao tác gõ phím, click chuột của người dùng luôn mượt mà (60 FPS), không bị đơ web**.
  * `useTransition`: Dùng khi ta trực tiếp cầm trong tay hàm `setState` để bọc lại.
  * `useDeferredValue`: Dùng khi ta chỉ nhận một giá trị (qua Props) mà không nắm quyền gọi `setState`.
* **Hiểu (Mạch tư duy Nhân - Quả 4 nấc):**
  1. **Sinh ra để làm gì? Khắc phục nỗi đau gì?**  
     Trước React 18, quá trình render là **chặn đứng (Synchronous & Non-interruptible)**: một khi React bắt đầu render danh sách 10.000 phần tử, nó phải làm xong xuôi mới dừng. Người dùng gõ phím vào ô tìm kiếm thì phím bị kẹt cứng, trang web đơ 1-2 giây.  
     Concurrent React sinh ra với khả năng **tạm dừng và hủy bỏ render giữa chừng** nếu có tác vụ khẩn cấp hơn (như người dùng gõ phím hay click chuột).
  2. **So sánh trực diện: `useTransition` vs `useDeferredValue`:**  
     * **`useTransition`:** Dùng khi bạn là người **nắm giữ quyền gọi `setState`**.  
       `const [isPending, startTransition] = useTransition();`  
       Bọc lệnh `setState` nặng vào `startTransition(() => setList(filteredData))`. React sẽ đánh dấu việc cập nhật `list` là độ ưu tiên thấp. Người dùng gõ phím, React ưu tiên cập nhật ô input ngay, việc render `list` bị hoãn lại sau. Cung cấp cờ `isPending` để hiện loading spinner mờ mờ.  
     * **`useDeferredValue`:** Dùng khi bạn **nhận giá trị từ bên ngoài (qua Props) và không nắm quyền gọi `setState`**.  
       `const deferredKeyword = useDeferredValue(keyword);`  
       React sẽ cho phép `keyword` (ô gõ) nhảy trước ngay lập tức, còn `deferredKeyword` (dùng để lọc danh sách nặng) sẽ tà tà nhảy theo sau khi CPU rảnh.
  3. **Phân biệt sống còn: `useDeferredValue` vs `useDebounce`:**  
     * `useDebounce`: Dùng kỹ thuật timer (`setTimeout` 400ms) để **chặn spam request GỌI MẠNG (Network API)**.  
     * `useDeferredValue`: Không dùng timer cố định, mà dựa vào độ rảnh của CPU để **tối ưu việc RENDER TẠI CLIENT**. Máy tính mạnh thì nhảy sau 5ms, máy yếu thì nhảy sau 100ms mà không bị khựng UI!

---

### 26. React 19 Mới: Hook `useOptimistic`, `useActionState` và Hook `use`
* **Định nghĩa gọn:** Là bộ ba Hook đột phá mới nhất của React 19 giúp đơn giản hóa việc xử lý Form Actions, cập nhật giao diện lạc quan (Optimistic UI), và đọc bất đồng bộ linh hoạt.
* **Hiểu (Mạch tư duy Nhân - Quả 4 nấc):**
  1. **Hook `useOptimistic` (Cập nhật giao diện lạc quan):**  
     * *Vấn đề:* Khi người dùng bấm nút "Thả tim / Like" hoặc gửi tin nhắn chat, nếu chờ server phản hồi mất 1 giây thì icon tim mới sáng lên -> Trải nghiệm rất chậm chạp.  
     * *Giải pháp:* `useOptimistic` cho phép UI nhảy số Like ngay trong 0 mili-giây (giả lập thành công). Sau đó request mạng âm thầm chạy ngầm. Nếu server trả về lỗi mạng, React sẽ **tự động hoàn tác (Rollback)** giao diện về trạng thái cũ mà ta không cần viết code xử lý rollback thủ công!
  2. **Hook `use` (Unwrap linh hoạt):**  
     * *Vấn đề:* Các hook truyền thống của React có quy tắc ngặt nghèo: Cấm gọi trong câu lệnh điều kiện `if`, cấm gọi trong vòng lặp.  
     * *Giải pháp:* Hook `use(Promise)` hoặc `use(Context)` có thể **gọi tự do bên trong câu lệnh `if`**! Nó tích hợp trực tiếp với `<Suspense>`, tự động hiển thị Fallback Loading trong lúc chờ Promise resolve.
  3. **Hook `useActionState`:**  
     Thay thế boilerplate quản lý form truyền thống, tự động cung cấp `[state, formAction, isPending]` để disable nút bấm và bắt lỗi server một cách gọn gàng.

---

### 27. Server State với TanStack Query: `useQuery`, `useMutation` và Cơ chế Stale-While-Revalidate
* **Định nghĩa gọn:** TanStack Query (React Query) là thư viện quản lý Server State tiêu chuẩn trong React hiện đại, cung cấp `useQuery` để đọc dữ liệu có cache và `useMutation` để ghi dữ liệu (POST/PUT/DELETE) lên máy chủ.
* **Hiểu (Mạch tư duy Nhân - Quả 4 nấc):**
  1. **Sinh ra để làm gì? Khắc phục nỗi đau của `useEffect + fetch`:**  
     Dùng `useEffect` gọi API khiến ta phải tự tay quản lý hàng tá state rác (`isLoading`, `isError`, `data`), code bị lặp lại, không có cơ chế lưu bộ nhớ đệm (Cache), mỗi lần chuyển trang lại gọi API từ đầu, và dễ dính lỗi Race Condition khi mạng chập chờn. TanStack Query sinh ra để **tách rời hoàn toàn Server State ra khỏi Client State**, hoạt động như một cơ sở dữ liệu in-memory NoSQL trong RAM trình duyệt.
  2. **Cơ chế Stale-While-Revalidate (SWR):**  
     * Khi người dùng vào trang: Lôi ngay dữ liệu cũ trong RAM Cache ra hiển thị tức thì (0ms) -> Người dùng không phải nhìn màn hình loading.  
     * Đồng thời, tự động bắn request ngầm kiểm tra xem server có dữ liệu mới không (Background Revalidation). Nếu có, cập nhật êm dịu lên UI.  
     * `staleTime`: Thời gian dữ liệu được coi là "tươi mới". Trong khoảng thời gian này, chuyển trang 100 lần cũng **không bắn bất kỳ request mạng nào** -> Giảm 90% tải cho server!  
     * `gcTime` (Garbage Collection Time): Thời gian lưu cache trong RAM sau khi component unmount trước khi dọn rác.
  3. **`useQuery` vs `useMutation`:**  
     * `useQuery`: Dùng để **ĐỌC dữ liệu** (GET). Chạy tự động khi component render dựa trên mảng định danh `queryKey: ['movies', slug]`.  
     * `useMutation`: Dùng để **GHI dữ liệu** (POST, PUT, DELETE). Chỉ chạy khi có hành động chủ động từ người dùng (submit form đặt vé, bấm like). Cung cấp cờ `isPending` khóa nút bấm.
  4. **Cầu nối đồng bộ: `queryClient.invalidateQueries({ queryKey: [...] })`:**  
     Sau khi mutation thành công (ví dụ đặt vé thành công hoặc thêm phim yêu thích), ta gọi hàm này để đánh dấu query danh sách là Stale -> TanStack Query tự động kéo dữ liệu mới nhất về ngầm mà không cần reload trang!

---

## 🗺️ BẢNG THEO DÕI TIẾN ĐỘ ÔN TẬP CÁC REACT HOOKS (3 TẦNG)

> *(Bảng checklist tạm thời để theo dõi chặng đường ôn luyện, sau khi hoàn thành sẽ xóa gọn)*

### 🔴 TẦNG 1: CORE (Sống còn - Bắt buộc 100%)
- [x] **1. `useState`** (State nội tại, closure snapshot, batching, functional update `prev => ...`)
- [x] **2. `useEffect`** (Side effects, 3 cấp độ dependency array, cleanup function, bẫy async, StrictMode)
- [x] **3. `useRef`** (Trỏ DOM thật & Lưu biến xuyên suốt render không làm re-render, biến `let` vs `useRef`)
- [x] **4. `useContext`** (Đọc dữ liệu toàn cục, giải quyết Prop Drilling, cái giá re-render toàn cây)

---

### 🟡 TẦNG 2: RẤT NÊN BIẾT (Tối ưu hiệu năng & Mid/Senior)
- [x] **5. `useReducer`** (Quản lý state phức tạp nhiều hành động chuẩn F8: Trong/Ngoài component, luồng Data Flow, Reducer pure)
- [x] **6. `React.memo` (HOC)** (Chiếc khiên chặn re-render con khi props không đổi, lý do vỡ khiên)
- [x] **7. `useCallback` (Hook)** (Đóng băng địa chỉ hàm trong RAM, cứu khiên React.memo, bẫy dùng một mình vô nghĩa)
- [x] **8. `useMemo` (Hook) & Dependency Array** (Cache kết quả tính toán trong RAM, so sánh dep 3 hook, bẫy premature optimization)
- [x] **9. `useLayoutEffect`** (Chạy đồng bộ trước Browser Paint, chống Visual Flicker chớp màn hình)
- [x] **10. Custom Hooks** (Tự viết Hook bóc tách logic tái sử dụng, dùng chung logic chứ KHÔNG dùng chung state)

---

### 🟢 TẦNG 3: BIẾT THÊM (Vũ khí nâng cao, React 18/19 & Thư viện)
- [x] **11. `useImperativeHandle`** (Đóng gói component con, tạo tay nắm cửa an toàn hạn chế quyền Cha sờ DOM con)
- [x] **12. `useId`** (Tạo ID ngẫu nhiên an toàn cho SSR / Hydration)
- [x] **13. `useTransition` & `useDeferredValue`** (Concurrent React: Phân loại độ ưu tiên, giữ UI 60 FPS)
- [x] **14. `useOptimistic` & Hook `use`** (React 19: Cập nhật UI lạc quan & Đọc Promise/Context trong `if`)
- [x] **15. `useQuery` & `useMutation`** (Server State TanStack Query: Caching, Invalidation, Stale-While-Revalidate)

---
