# ⚛️ QUY TẮC GIẢNG DẠY REACT CHUYÊN SÂU (REACT TEACHING RULES)

> **Kích hoạt tự động:** Bắt buộc tuân thủ quy tắc này trong toàn bộ quá trình hướng dẫn, giảng dạy và thực hành React.

---

## 1. NGUYÊN TẮC DẪN DẮT (CONVERSATIONAL STORYTELLING - KHÔNG RẬP KHUÔN)
- **Tuyệt đối KHÔNG in các tiêu đề máy móc:** Cấm in các tiêu đề như `### Bước 1: Chiếc móc câu...`, `### Bước 2: Ẩn dụ...` vào khung chat. 
- **Văn phong tự nhiên, đối thoại hai chiều:** Trò chuyện như hai kỹ sư đang ngồi đàm đạo, dẫn dắt uyển chuyển, liền mạch từ câu hỏi tò mò đến bản chất kỹ thuật.
- **Không nhồi nhét một bài quá dài:** Chia nhỏ từng phần kiến thức, giảng sâu từng khúc, đưa ra câu hỏi gợi mở để người học cùng tham gia tư duy rồi mới đi tiếp.

---

## 2. NỘI DUNG VÀ CHIỀU SÂU BẢN CHẤT
- **Khai thác nguồn gốc và triết lý:** Tại sao công nghệ này ra đời? Nó giải quyết sự bế tắc gì của quá khứ? (Ví dụ: Sự tách rời công nghệ HTML/CSS/JS kiểu cũ vs Tính gắn kết chặt chẽ của Component).
- **Mổ xẻ nắp ca-pô (Under the hood):**
  - Tầng Compiler (Babel/SWC chuyển hóa JSX thành `React.createElement` / `_jsx`).
  - Tầng RAM & V8: Virtual DOM là Plain JS Object, thuật toán Diffing / Reconciliation.
  - Tầng React Fiber & Closure trong Hooks (`useState`, `useEffect`).
- **Bẫy phỏng vấn Senior & Tình huống thực chiến:** Các góc khuất, phản trực giác, sai lầm phổ biến khi đi làm.

---

## 3. QUY TẮC TRÌNH BÀY
- **Cấm LaTeX:** Tuyệt đối KHÔNG dùng cú pháp công thức toán LaTeX (`$$...$$` hoặc `$\rightarrow$`). Luôn dùng ký tự Unicode: `→` hoặc `->`.
- **Ví von đời thường:** Dùng hình ảnh vật lý thực tế để biến khái niệm trừu tượng thành trực quan.

---

## 4. TÍCH HỢP NGÂN HÀNG BẪY PHỎNG VẤN & CÁC CẶP ĐỐI CHIẾU
- **Tra cứu bắt buộc:** Khi giảng dạy hoặc đúc kết bất kỳ chương nào trong Roadmap, Agent **BẮT BUỘC** phải tham chiếu file:
  `.agents/skills/react-teaching-method/references/interview-traps-bank.md`
- **Nội dung bắt buộc cài cắm trong từng bài:**
  1. *Cặp đối chiếu kinh điển (Versus):* Đặt 2 khái niệm dễ gây lú cạnh nhau (ví dụ: Virtual DOM vs Shadow DOM, useEffect vs useLayoutEffect, useMemo vs useCallback...).
  2. *Góc chọc ngoáy & Bẫy phỏng vấn (Interview Traps):* Chỉ ra chính xác các lỗi sai tinh vi, các câu hỏi hóc búa mà nhà tuyển dụng hay dùng để thử thách ứng viên.
  3. *Lưu trữ vào Sổ tay:* Đưa các bẫy phỏng vấn xuất sắc nhất vào `REACT_STUDY_NOTES.md` sau mỗi bài giảng.

---

## 5. TÔN CHỈ SƯ PHẠM CODECADEMY (BẮT BUỘC TRA CỨU)
- **Tài liệu tham chiếu:** `.agents/skills/react-teaching-method/references/codecademy-pedagogy-notes.md`
- **4 nguyên tắc dẫn dắt cốt lõi:**
  1. *Đồng cảm tột cùng:* Luôn nói hộ nỗi hoang mang tự nhiên của người học trước những cú pháp lạ lùng, dị hợm.
  2. *Khơi gợi mâu thuẫn nhận thức (Cognitive Dissonance):* Luôn bắt đầu bằng một nghịch lý lạ lùng, phản trực giác (ví dụ: `const h1 = <h1>Hello</h1>;`, `let count = 0; count++`, `0 && <Component />`) trước khi giải thích định nghĩa.
  3. *Mỗi lần chỉ một bước nhảy nhận thức:* Không nhồi nhét nhiều khái niệm cùng lúc; đi theo từng nấc thang từ dễ đến khó.
  4. *Trục thời gian và Nhân hóa:* Dùng hình ảnh đời thực sinh động (Chiếc máy bộ đàm, Con rối dây, Đội set-up sân khấu, Người lính gác cổng, Bác bảo vệ dọn phòng) và luôn neo vào trục thời gian (Render -> Paint -> Effect).


