# 📋 BÁO CÁO TIẾN ĐỘ & BÀN GIAO TOÀN DIỆN (HANDOVER PROGRESS)

> **Dành cho AI & Người học tại phiên làm việc tiếp theo (Máy công ty):**
> Vui lòng đọc kỹ file này kết hợp với:
> 1. `JS_CHECKLIST_ROADMAP.md`: Theo dõi 13 nhóm kiến thức JS nền tảng để sẵn sàng học React.
> 2. `JS_STUDY_NOTES.md`: Sổ tay đúc kết bản chất ngầm, ánh xạ 1:1 với Roadmap.
> 3. `.agents/rules/roadmap-coaching.md` & `.agents/skills/js-roadmap-coach/SKILL.md`: Nguyên tắc huấn luyện "Hiện trường vụ án", không code hộ, không dùng LaTeX, giải thích 4 tầng thông tin (Định nghĩa, V8 ô nhớ RAM, Bẫy Senior, Kết nối React).

---

## 🧭 1. TỔNG QUAN TIẾN ĐỘ HUẤN LUYỆN 13 CHUYÊN ĐỀ JS

Đã hoàn thành xuất sắc **9 / 13 Mục** với chất lượng cao nhất:

| Chuyên đề | Trạng thái | Ghi chú cốt lõi |
| :--- | :---: | :--- |
| **1. Biến, Kiểu dữ liệu, Toán tử** | ✅ 100% | Bug `typeof null === 'object'`, `null == undefined`, TDZ, ô nhớ Heap vs Stack |
| **2. Điều kiện & Vòng lặp** | ✅ 100% | Bẫy Falsy (`0`, `""`, `NaN`), `for...of` vs `for...in`, `Object.keys()` |
| **3. Function (Trái tim JS & React)** | ✅ 100% | Arrow function không có `this`, Closure 3 điều kiện, Pure function |
| **4. Array (Bắt buộc phải chắc)** | ✅ 100% | `map`, `filter`, `reduce` bẫy mảng rỗng, `sort` mutate UTF-16, Bộ ba Immutable |
| **5. Object & Immutable** | ✅ 100% | Dot vs Bracket notation, Shallow vs Deep copy, bẫy `structuredClone`, Rest operator xóa an toàn |
| **6. Cú pháp ES6+ trong React** | ✅ 100% | Template literal, Destructuring Array vs Object (tại sao `useState` trả về mảng), `??` vs `||`, Named vs Default Export, so sánh Classic Script |
| **7. DOM & Sự kiện** | ✅ 100% | `e.target` vs `e.currentTarget`, `id` vs `data-id`, Memory leak `removeEventListener`, `preventDefault` vs `stopPropagation`, Event Delegation |
| **8. Bất đồng bộ (Async JS)** | ✅ 100% | Single-thread JS vs Multi-thread Browser C++, Callback Hell, Promise 3 trạng thái, `async/await`, bẫy `fetch` 404/500 `response.ok`, `Promise.all` vs `Promise.allSettled`, `AbortController` chống Race Condition |
| **9. Cơ chế JS (V8 & Runtime)** | ✅ 100% | Scope Chain, Hoisting, Closure React Fiber, Pass by value/reference, Event Loop (Call Stack $\rightarrow$ Microtask VIP $\rightarrow$ Macrotask) |
| **10. Xử lý lỗi & Debug** | ⏳ **TIẾP THEO** | Đang chuẩn bị phân tích: Tại sao cấm `throw "string"` mà phải `throw new Error`, 3 loại lỗi, Chrome DevTools |
| **11. Form & Validation** | ⏳ Chờ xử lý | `FormData`, validate regex email, hiển thị lỗi dưới field, chặn submit |
| **12. Lưu trữ Browser** | ⏳ Chờ xử lý | `localStorage`, `sessionStorage`, Cookie, bẫy chuỗi hóa JSON |
| **13. Tư duy Component & State** | ⏳ Chờ xử lý | Cầu nối trực tiếp sang React, luồng dữ liệu 1 chiều |

---

## 🎯 2. ĐIỂM DỪNG HIỆN TẠI & NHIỆM VỤ TIẾP THEO (TRÊN MÁY CÔNG TY)

### 📍 Điểm dừng phiên trước:
- Đã giải mã toàn bộ câu hỏi thực chiến về **API Web Phim (`phimapi.com` / KKPhim API)**:
  - Hiểu rõ tại sao `phimapi.com` là Open Public API có `access-control-allow-origin: *`.
  - Phân biệt với `csdelaytech.vercel.app` (Next.js frontend của mentor).
  - Đã có link tài liệu chính thức: `https://kkphim.com/api-document`.
  - Nắm vững 3 endpoint chính: Danh sách mới cập nhật, Chi tiết phim kèm link embed xem video thật, Tìm kiếm phim.

### 🚀 Bắt đầu ngay khi mở máy công ty:
Tiến hành **MỤC 10: XỬ LÝ LỖI VÀ DEBUG**:
1. **Câu hỏi đang chờ giải đáp:**
   - Tại sao trong dự án chuyên nghiệp, Tech Lead **tuyệt đối cấm** viết `throw "Lỗi rồi"` mà bắt buộc phải dùng `throw new Error("Lỗi rồi")`? (Vũ khí bí mật: **Stack Trace**).
2. **Các nội dung của Mục 10 cần đi qua:**
   - Đọc hiểu Error Message và truy vết nguồn gốc qua Stack trace.
   - 3 loại lỗi: Syntax error (Cú pháp), Runtime error (Khi chạy), Logic bug (Nghiệp vụ).
   - Chrome DevTools: Breakpoint, Conditional breakpoint, Call Stack, Step Over/Into/Out.
   - Các Panel: Network (Payload/Header/Timing), Application (LocalStorage), Console, Elements.
3. Sau đó tiếp tục lần lượt **Mục 11, 12, 13** để hoàn thành trọn vẹn 100% Roadmap!
