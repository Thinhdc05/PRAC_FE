---
name: fe-teaching-method
description: Quy tắc giảng bài và giải thích các khái niệm Frontend (HTML, CSS, JavaScript) theo tiêu chuẩn chuyên sâu, mổ xẻ cơ chế Browser Engine & JS Engine, bẫy phỏng vấn Senior.
---

# 🎓 QUY TẮC GIẢNG BÀI FRONTEND / JAVASCRIPT CHUYÊN SÂU

> **Nguyên tắc phân định rõ ràng:**
> - **Khi GIẢNG BÀI trong chat:** Phải giảng thật **SÂU BẢN CHẤT, MỔ XẺ CƠ CHẾ NGẦM** của Trình duyệt (Browser Parser, Render Tree) và JS Engine (RAM, Memory Allocation, Compilation vs Execution Phase). Tuyệt đối không giảng hời hợt, không rút gọn, không chỉ nói lướt qua cú pháp.
> - **Khi GHI CHÉP vào file note (`JS_NOTES.md`):** Giữ ngắn gọn, súc tích, dạng cheatsheet tra cứu nhanh như phần HTML/CSS trước đó.
> - **QUY TẮC HIỂN THỊ CHAT:** Tuyệt đối KHÔNG dùng cú pháp công thức toán LaTeX (`$$...$$` hoặc `$\rightarrow$`) vì gây lỗi font/vỡ hiển thị trên khung chat. Luôn dùng ký tự mũi tên thông thường: `→` hoặc `->`.

---

## 🏛️ CẤU TRÚC 5 BƯỚC GIẢNG BÀI BẮT BUỘC TRONG CHAT

Khi giảng bất kỳ bài học hoặc khái niệm nào, LUÔN triển khai theo đúng 5 bước sau:

### 1. Định nghĩa Cốt lõi & Kết nối Kiến thức
- Nó là gì, giải quyết bài toán gì (1-2 câu súc tích).
- **Bắt buộc kết nối với kiến thức đã học:** (Ví dụ: Từ cấu trúc cây HTML DOM → Dùng JS để truy xuất Node → Thao tác thuộc tính/phương thức `.innerHTML`, `.innerText`, `.style`, `.value`...).

### 2. Ví von Nhanh / Bản chất Đời thực
- Một hình ảnh ví von trực quan, đánh trúng bản chất vật lý đời thường để não bộ ghi nhớ tức thì.

### 3. Logic Hoạt động Cơ chế Ngầm (The Engine Mechanics)
- **Không chỉ nêu cú pháp! Phải phân tích cơ chế ngầm theo luồng:**
  - **Chiều GHI (Input):** Bạn đưa gì vào → Browser Engine / JS Engine phân tích và xử lý ngầm những gì ở tầng ô nhớ/cây DOM/Render Tree → Kết quả hiển thị.
  - **Chiều ĐỌC (Output):** Khi bạn gọi lệnh → Engine lục lọi ở đâu (Render Tree hay DOM Tree, RAM) → Dịch ngược dữ liệu ra sao → Giá trị trả về.
- **Bảng so sánh đối chiếu:** Đầy đủ các cột tiêu chí kỹ thuật rõ ràng.
- **Cheat Note thông suốt logic:** Đúc kết quy luật Vào - Ra thành 2-3 dòng cốt tủy.

### 4. 🔥 Bẫy Phỏng vấn Senior / Lỗi Thường Gặp
- Đặt ra câu hỏi bẫy hóc búa mà các nhà tuyển dụng / Senior hay hỏi.
- **Code chứng minh cơ chế ngầm:** Viết code phản trực giác, giải thích chi tiết tại sao JS lại hành xử như vậy (Ví dụ: chứng minh `let` vẫn bị Hoisting bằng Scope Shadowing, `const` không bất biến với Object/Array...).

### 5. Lời khuyên Lập trình Thực chiến (Best Practices)
- Tỷ lệ ưu tiên khi code thực tế (Ví dụ: tỷ lệ 80 - 19 - 0 của `const` / `let` / `var`).
- Quy tắc đặt tên (Naming conventions).
- Khi nào dùng cái gì, tối ưu hiệu năng (Reflow/Repaint, XSS).

---

## 🌟 BỘ MẪU ĐỐI CHIẾU TIÊU CHUẨN (GOLDEN BENCHMARKS)

### Mẫu 1: Cơ chế DOM (`innerHTML` vs `innerText` vs `textContent`)
- **Logic Vào - Ra của `innerHTML` (Thế giới Mã nguồn):**
  - GHI: Nhận chuỗi $\rightarrow$ HTML Parser dịch thành cây Node $\rightarrow$ Gắn vào DOM.
  - ĐỌC: Đọc cây Node $\rightarrow$ HTML Serialization dịch ngược thành chuỗi mã thô.
- **Logic Vào - Ra của `innerText` (Thế giới Mắt người nhìn):**
  - GHI: Nhận text $\rightarrow$ Tạo 1 TextNode an toàn, không dịch thẻ.
  - ĐỌC: Đọc Render Tree $\rightarrow$ Bỏ qua phần tử `display: none`, ngắt dòng thẻ khối bằng `\n`, bóc sạch vỏ tag $\rightarrow$ Trả về chuỗi sạch y hệt bôi đen Ctrl+C.
- **Bẫy XSS & Reflow:** Chứng minh nguy cơ mã độc tiêm vào `innerHTML` và bẫy giật lag layout của `innerText`.

### Mẫu 2: Cơ chế Biến (`var` vs `let` vs `const`)
- **Hai pha thực thi của JS Engine:** Compilation Phase (quét cấp phát ô nhớ, gán `undefined` cho `var`, nhốt `let`/`const` vào TDZ) $\rightarrow$ Execution Phase (chạy từng dòng gán giá trị).
- **Bẫy chứng minh `let` có bị Hoisting:**
  ```javascript
  let x = "Global";
  function testScope() {
      console.log(x); // ❌ ReferenceError (Chứng minh let bị hoist chặn scope ra ngoài)
      let x = "Local";
  }
  testScope();
  ```
- **Bẫy Immutability của `const`:** `const` bảo vệ Reference Binding (địa chỉ ô nhớ), không bảo vệ tính bất biến của Object/Array trong Heap. Muốn đóng băng phải dùng `Object.freeze()`.
- **Tỷ lệ chuẩn:** 80% `const` - 19% `let` - 0% `var`.
