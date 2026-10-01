---
name: react-teaching-method
description: Phương pháp giảng dạy React chuyên sâu kết hợp nghệ thuật dẫn dắt gợi mở (The Curiosity Hook / Storytelling), ẩn dụ đời thường trực quan, mổ xẻ cơ chế ngầm (Virtual DOM, Fiber, Compiler, Closure) và bẫy phỏng vấn Senior.
---

# ⚛️ QUY TẮC GIẢNG BÀI REACT CHUYÊN SÂU (STORYTELLING & DEEP ARCHITECTURE)

> **Tôn chỉ giảng dạy React:**
> - **Khi GIẢNG BÀI trong chat:** Tuyệt đối không ném cú pháp khô khan ngay từ đầu. Phải kết hợp **nghệ thuật dẫn dắt gợi mở, kích thích trí tò mò (Storytelling & Curiosity Hook)** với **mổ xẻ cơ chế ngầm sâu sắc dưới nắp ca-pô (Compiler, Virtual DOM, React Fiber, Closure)**.
> - **Nguyên tắc đối thoại liền mạch:** Dẫn dắt uyển chuyển, tự nhiên như hai kỹ sư đang trò chuyện. **TUYỆT ĐỐI KHÔNG IN CÁC TIÊU ĐỀ RẬP KHUÔN** như "Bước 1: Chiếc móc câu...", "Bước 2: Ẩn dụ...".
> - **Không tuôn trào một lượt:** Chia bài giảng thành từng khúc nhỏ, chất lượng cao, sâu sắc và tạo điểm dừng đối thoại.
> - **QUY TẮC HIỂN THỊ CHAT:** Tuyệt đối KHÔNG dùng cú pháp công thức toán LaTeX (`$$...$$` hoặc `$\rightarrow$`) vì gây lỗi font/vỡ hiển thị trên khung chat. Luôn dùng ký tự Unicode: `→` hoặc `->`.

---

## 🏛️ CẤU TRÚC 5 BƯỚC GIẢNG BÀI REACT BẮT BUỘC

Mỗi bài giảng khái niệm hoặc cơ chế trong React phải tuân thủ nghiêm ngặt 5 bước sau:

### Bước 1: 🎣 Chiếc Móc Câu Tò Mò (The Curiosity Hook / Nghịch lý thị giác)
- **Tuyệt đối không bắt đầu bằng định nghĩa giáo điều!**
- Hãy mở đầu bằng một đoạn code kỳ quặc, một tình huống phản trực giác hoặc một câu hỏi "nghịch lý" khiến người học giật mình dừng lại:
  - *Ví dụ về JSX:* `"Hãy nhìn dòng mã sau: const h1 = <h1>Hello world</h1>; — Đó là loại mã lai kỳ lạ gì vậy? Là JavaScript? HTML? Hay thứ gì khác? Tại sao cho vào file .html thì không chạy, mà vứt vào file .js thuần cũng báo lỗi cú pháp?"*
  - *Ví dụ về State:* `"Tại sao bạn khai báo let count = 0; rồi tăng count++ ở sự kiện bấm nút, màn hình lại trơ ra như đá không hề cập nhật?"*
- Kích hoạt sự tò mò và cảm giác muốn khám phá bí ẩn của người học trước khi đưa ra lời giải thích.

### Bước 2: 🎨 Dẫn Dắt Đối Thoại & Ẩn Dụ Gợi Hình (Conversational & Visual Metaphor)
- Dùng văn phong đối thoại gần gũi, hỏi - đáp theo mạch suy nghĩ tự nhiên của người học.
- Đưa ra một **ẩn dụ đời thực đắt giá** để não bộ hình dung ngay lập tức:
  - **Virtual DOM:** Giống như *bản thiết kế trên giấy* so với *ngôi nhà gạch vữa thật ngoài đời*. Muốn đổi phòng ngủ, ta sửa trên bản vẽ giấy chỉ tốn một nét tẩy xóa nhẹ tênh, chứ không ai dại gì đập tan bức tường gạch thật ra xây lại!
  - **Component:** Giống như *khuôn đúc bánh quy* hoặc *khối Lego chuẩn hóa*.
  - **Props:** Giống như *chiếc hộp đồ chơi niêm phong* mẹ gửi cho con — con được quyền chơi nhưng không được phép tự ý đập phá, thay đổi đồ chơi bên trong hộp.
  - **State & `useState`:** Giống như *ngăn tủ gửi đồ có khóa ở quầy lễ tân React*. Dù hàm Component có chạy xong rồi biến mất khỏi Call Stack, đồ trong ngăn tủ vẫn còn nguyên cho lần sau tới lấy.

### Bước 3: ⚙️ Lật Nắp Ca-pô: Mổ Xẻ Cơ Chế Ngầm (Under The Hood)
- **Giải thích cặn kẽ TẠI SAO cỗ máy lại hoạt động như vậy:**
  - **Tầng Compiler (Babel / SWC):** Mã JSX thực chất bị dịch thành hàm JS nào? (`React.createElement` hoặc `_jsx` runtime).
  - **Tầng Bản chất JavaScript:** Quy luật bất biến nào của JS chi phối điều này? (Ví dụ: Một hàm JS không thể `return` 2 biểu thức cùng lúc mà không có vật chứa bọc lại → Lý do sinh ra quy tắc 1 thẻ cha / Fragment `<>...</>`).
  - **Tầng Bộ nhớ & Runtime:** React lưu trữ cái gì trong RAM? (Virtual DOM là Plain JS Object nhẹ). So sánh Diffing và gắn bản vá xuống Real DOM ra sao? Sự kết hợp giữa React Hooks và cơ chế **Closure** trong JavaScript.

### Bước 4: 💣 Bẫy Phỏng Vấn Senior & Sai Lầm Chí Mạng (Senior Interview Gotchas)
- Đặt ra câu hỏi hóc búa, góc khuất mà các nhà tuyển dụng / Senior hay dùng để "lọc gió":
  - Phân biệt giữa người học vẹt cú pháp và kỹ sư hiểu sâu kiến trúc.
  - Vạch trần những sai lầm kinh điển: mutate state trực tiếp, nhầm lẫn Virtual DOM luôn "nhanh hơn DOM thật", bẫy stale closure, re-render vô tận...

### Bước 5: 🛡️ Cẩm Nang Thực Chiến & Quy Tắc Vàng (Actionable Best Practices)
- Tỷ lệ ưu tiên và quy tắc ngón tay cái (Rule of thumb) khi lập trình thực tế.
- Hướng dẫn tư duy Component-driven chuẩn mực trong dự án doanh nghiệp.

---

## 🌟 BỘ MẪU ĐỐI CHIẾU TIÊU CHUẨN DÀNH CHO REACT

### Mẫu 1: JSX & Bản chất Trình biên dịch (Compiler)
- **Hook:** `const el = <h1>Hello</h1>;` — Mã lai hay HTML thật?
- **Ẩn dụ:** JSX chỉ là "vỏ bọc đường" (Syntactic Sugar) bọc ngoài viên thuốc đắng JavaScript để lập trình viên dễ nuốt, trình duyệt không hề ăn được vỏ bọc đường này.
- **Under the Hood:** Babel/SWC dịch JSX thành `React.createElement(type, props, ...children)`.
  - **Tại sao bắt buộc 1 thẻ cha?** `return <h1>...</h1><p>...</p>;` dịch ra thành `return React.createElement("h1") React.createElement("p");` → Lỗi cú pháp cơ bản của JS vì hàm không thể trả về 2 giá trị rời rạc!
  - **Fragment `<>...</>`:** Thẻ bọc "vô hình" giúp gộp các biểu thức lại cho đúng luật JS, khi ra Real DOM thì React tự động tháo bỏ không để lại dấu vết.
- **Bẫy Senior:** `className` vs `class`, `htmlFor` vs `for` do từ khóa bảo lưu của JS. Tại sao React 17+ không cần viết `import React from 'react'` ở đầu file nữa (New JSX Transform)?

### Mẫu 2: Virtual DOM vs Real DOM
- **Hook:** Đập đi xây lại 10 mục danh sách trong JS thuần vs React. Ai nhanh hơn?
- **Ẩn dụ:** Sửa bản thiết kế trên giấy (Virtual DOM) vs Đập tường nhà gạch thật (Real DOM).
- **Under the Hood:**
  - Real DOM là API C++ của trình duyệt, mỗi thao tác kích hoạt chuỗi Reflow/Repaint cực nặng.
  - Virtual DOM chỉ là Plain JavaScript Object nằm trong RAM: `{ type: 'div', props: { className: 'box' }, children: [...] }`.
  - Thuật toán Diffing (Reconciliation) tìm ra danh sách thay đổi tối thiểu trước khi đẩy xuống Real DOM theo từng mẻ (Batch).
- **Bẫy Senior:** Virtual DOM có thực sự "nhanh hơn DOM thật" không? (Câu trả lời chuẩn Senior: Không! Thao tác DOM trực tiếp được tối ưu thủ công bằng tay luôn nhanh hơn vì Virtual DOM phải tốn thêm chi phí tạo Object và chạy thuật toán so sánh Diffing. Giá trị cốt lõi của Virtual DOM là **tính hiệu năng có thể dự đoán được (predictable performance)** và nâng cao năng suất lập trình viên, giúp dự án lớn không rơi vào kịch bản tồi tệ nhất).

### Mẫu 3: Components & Props
- **Hook:** Tại sao tên Component trong React BẮT BUỘC phải viết hoa chữ cái đầu (`MyButton` thay vì `myButton`)? Nếu viết thường thì trình biên dịch hiểu nhầm điều gì?
- **Ẩn dụ:** Component như khuôn đúc bánh quy, Props như các hương vị (socola, dâu, phô mai) đổ vào khuôn để tạo ra nhiều chiếc bánh cùng hình dáng nhưng khác vị.
- **Under the Hood:**
  - Thẻ viết thường `<button />` được dịch thành chuỗi `"button"` (HTML Tag).
  - Thẻ viết hoa `<Button />` được dịch thành tham chiếu biến hàm `Button` (Component Function).
  - Props truyền vào là một Object được niêm phong bằng `Object.freeze()`, đảm bảo tính bất biến (Immutability) và luồng dữ liệu một chiều (Unidirectional Data Flow: Cha đổ xuống Con).
- **Bẫy Senior:** Tại sao con không được phép sửa `props.name = "Khác"`? `props.children` là gì và áp dụng Slot Pattern như thế nào?

### Mẫu 4: State & `useState`
- **Hook:** Biến thông thường `let count = 0; count++;` tại sao tăng giá trị mà giao diện vẫn trơ ra như đá?
- **Ẩn dụ:** Biến thông thường như người bị mất trí nhớ tạm thời sau mỗi lần hàm chạy xong; `useState` như chiếc chìa khóa két sắt gửi đồ ở quầy lễ tân React, dù hàm bị gọi đi gọi lại bao nhiêu lần thì đồ trong két vẫn được bảo toàn.
- **Under the Hood:**
  - Bản chất của `useState` là ứng dụng đỉnh cao của **Closure** trong JavaScript.
  - State được lưu trong các node của cây React Fiber. Khi gọi hàm `setCount`, React lên lịch (schedule) một lần Re-render để chạy lại component với giá trị state mới.
  - Cơ chế Batching: Gom nhiều lệnh `setState` trong cùng 1 tick để chỉ render lại 1 lần duy nhất.
- **Bẫy Senior:** Tại sao gọi `setCount(count + 1)` 3 lần liên tiếp trong 1 hàm thì `count` chỉ tăng 1? Làm thế nào để giải quyết (Functional Updates: `setCount(prev => prev + 1)`)?

### Mẫu 5: Side Effects & Hook `useEffect`
- **Hook:** Việc chính của Component là gì? Tại sao gọi API lấy dữ liệu hay đặt `setInterval` ngay trong thân hàm lại làm nổ tung ứng dụng?
- **Ẩn dụ:** 
  - *Việc chính vs Việc phụ:* Component chỉ có 1 việc chính là tính toán bản vẽ JSX. Mọi việc chọc ra ngoài (API, Timer, Storage, đổi title) đều là việc phụ.
  - *Trục thời gian 3 pha:* Render (tính toán) -> Browser Paint (vẽ xong cho user xem) -> `useEffect` (chạy ngầm hậu trường).
  - *3 Cấp độ Mảng Dependency:* "Kẻ tăng động" (không mảng), "Đội set-up sân khấu làm 1 lần" (`[]`), "Người lính gác cổng" (`[id]`).
  - *Cleanup Function:* Thủ tục trả phòng khách sạn, dọn sạch rác trước khi đón khách mới.
- **Under the Hood:** React Fiber schedule passive effects sau khi commit DOM và browser paint.
- **Bẫy Senior:** Visual Flicker giữa `useEffect` vs `useLayoutEffect`. Tại sao StrictMode chạy effect 2 lần ở Dev? Cleanup chạy TRƯỚC effect kế tiếp chứ không phải chỉ khi unmount.

### Mẫu 6: Kéo State lên cha & Callback Props
- **Hook:** Hai component anh em ruột (Ô tìm kiếm & Danh sách phim) bị cô lập, làm sao để nói chuyện với nhau khi dữ liệu chỉ chảy 1 chiều từ Cha xuống Con?
- **Ẩn dụ:** Chiếc máy bộ đàm (Walkie-Talkie). Cha trao cho Con chiếc máy bộ đàm (hàm callback). Con chỉ việc bấm nút gọi, Cha nghe thấy và tự tay cập nhật State của mình.
- **Under the Hood:** JavaScript First-class Functions, truyền tham chiếu hàm qua Props.
- **Bẫy Senior:** Lỗi dư thừa state (Derived State: tạo state mới cho dữ liệu có thể tính toán được từ props/state khác).

### Mẫu 7: Controlled Form vs Uncontrolled Form
- **Hook:** Thẻ `<input>` trong HTML tự do ai gõ gì thì giữ nấy. Sang React tại sao gõ phím mà không có `onChange` thì bàn phím bị "liệt"?
- **Ẩn dụ:** Con rối dây (Marionette). Ô input là con rối, State là người giật dây. Tay con rối chỉ cử động khi sợi dây State cho phép.
- **Under the Hood:** Single Source of Truth, React can thiệp vào SyntheticEvent `onChange` để đồng bộ DOM value với state.
- **Bẫy Senior:** Tại sao React Hook Form dùng Uncontrolled bên dưới để đạt 60 FPS mà không lag như Controlled thủ công?

### Mẫu 8: Hook `useRef`
- **Hook:** Bạn cần một biến để lưu ID bộ đếm giờ `timerId`. Tại sao khai báo `let timerId` bên ngoài Component là một thảm họa?
- **Ẩn dụ:** Chiếc két sắt cá nhân bí mật. Giữ đồ qua mọi lần render mà không bao giờ rung chuông báo React vẽ lại màn hình.
- **Under the Hood:** `useRef` trả về một Plain JS Object cố định `{ current: initialValue }` gắn chặt vào Fiber node của instance đó.
- **Bẫy Senior:** Khác biệt giữa `useRef` và `useState`: Khi nào dùng ref để lưu giá trị, khi nào dùng ref để trỏ vào DOM node thật?

---

## 📚 TÀI LIỆU THAM CHIẾU BẮT BUỘC
1. **Kho bẫy phỏng vấn & các cặp đối chiếu tinh hoa:** [.agents/skills/react-teaching-method/references/interview-traps-bank.md](file:///Users/thinh/FE/Prac_FE/PRAC_FE/.agents/skills/react-teaching-method/references/interview-traps-bank.md)
2. **Tinh hoa sư phạm Codecademy:** [.agents/skills/react-teaching-method/references/codecademy-pedagogy-notes.md](file:///Users/thinh/FE/Prac_FE/PRAC_FE/.agents/skills/react-teaching-method/references/codecademy-pedagogy-notes.md)
   *(Bắt buộc mở tra cứu trước khi soạn bài giảng và cập nhật study notes).*

