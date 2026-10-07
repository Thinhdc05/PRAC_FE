# 📋 BÁO CÁO TIẾN ĐỘ & BÀN GIAO TOÀN DIỆN (HANDOVER PROGRESS)
> **Dành cho Người học & AI Agent tại phiên làm việc tiếp theo (Máy ở nhà / Máy công ty):**
> File này ghi lại chính xác điểm dừng kỹ thuật, toàn bộ code mẫu chi tiết của chặng tiếp theo và hướng dẫn đồng bộ Git để bạn có thể tiếp tục làm việc mượt mà mà không bị đứt mạch.

---

## 🎯 1. NGUYÊN TẮC HUẤN LUYỆN BẮT BUỘC CHO AI AGENT
1. **Phương pháp sư phạm chuẩn F8 (Tư duy phản xạ & Dẫn dắt từng bước):**
   - **Tuyệt đối không tự ý viết code vào file của user:** Luôn hướng dẫn, giải thích nguyên lý, đưa code mẫu để user tự gõ và cảm nhận luồng chạy.
   - **Kiểm tra và bắt lỗi (Catch bugs):** Sau khi user gõ, soi kỹ từng lỗi chính tả (typo), hoa/thường, sai prop, bẫy render.
2. **Mổ xẻ 4 tầng bản chất chuyên sâu:**
   - Cú pháp -> Cơ chế ngầm dưới nắp capo (Fiber, RAM, Network, Event Loop) -> Bẫy Senior -> Thực chiến Clean Architecture.

---

## 🧭 2. TỔNG QUAN TIẾN ĐỘ HIỆN TẠI (ĐÃ HOÀN THÀNH)

1. **SPA Routing với React Router v7 (`App.jsx`):**
   - `createBrowserRouter`, `RouterProvider`, `Outlet`, `useParams`, `useNavigate`.
   - `useSearchParams` với kỹ thuật `{ replace: true }` chống tràn lịch sử trình duyệt.
   - Route-level Error Boundary (`ErrorPage.jsx`) & Component-level Error Boundary (`react-error-boundary`).
2. **Client Global State với Context API (`FavoritesContext.jsx`):**
   - `createContext`, `FavoritesProvider`, lazy init từ `localStorage`, sync disk ngầm.
   - Custom hook `useFavorites()` có rào chắn bảo vệ.
3. **Chapter 10: State Management Toàn Cảnh & Server State (TanStack Query v5):**
   - Phân biệt 4 loại State: Local UI, URL State, Client Global State, Server State.
   - Khởi tạo `QueryClient` singleton, bọc `QueryClientProvider` & `ReactQueryDevtools` ở `App.jsx`.
   - Tách Custom Hook `src/hooks/useMovieDetail.js` dùng `useQuery` có RAM Cache 5 phút (`staleTime: 5 * 60 * 1000`).
4. **Complex Forms & Validation (React Hook Form + Zod):**
   - Tách Schema và bảng giá ra `src/schemas/bookingSchema.js`:
     - Regex số điện thoại 10 số VN (`/^(0[35789])[0-9]{8}$/`).
     - Enum loại ghế (`standard`, `vip`, `sweetbox`), ép kiểu số `z.coerce.number()`, refine điều khoản `val === true`.
   - Màn hình `src/pages/BookingPage.jsx`:
     - `useForm` với `mode: 'onChange'` soi lỗi thời gian thực.
     - **Derived State:** Tính `totalPrice` tức thì bằng `watch('seatType')` và `watch('ticketQuantity')` (0 `useState` thừa).
     - Inline Error UX báo viền đỏ và thông báo lỗi tiếng Việt dưới từng ô.

---

## 📌 3. HƯỚNG DẪN CHI TIẾT ĐỂ LÀM TIẾP (TỐI NAY HOẶC PHIÊN TỚI)

Hiện tại đang ở **Chặng 1 của [PLAN.md](file:///Users/thinh/FE/Prac_FE/PRAC_FE/PLAN.md)**: Triển khai `useMutation` để gửi HTTP POST thật qua mạng và hiển thị Modal Vé VIP thành công.

### BƯỚC 1: Tạo Component Modal — `src/components/TicketSuccessModal.jsx`
Tạo file mới `src/components/TicketSuccessModal.jsx` với nội dung:

```jsx
export function TicketSuccessModal({ ticket, onClose }) {
  if (!ticket) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.85)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999,
      padding: '20px',
    }}>
      <div style={{
        background: '#222',
        border: '2px solid #e50914',
        borderRadius: '16px',
        padding: '30px',
        maxWidth: '480px',
        width: '100%',
        color: '#fff',
        boxShadow: '0 0 30px rgba(229, 9, 20, 0.4)',
        textAlign: 'center',
      }}>
        <h2 style={{ color: '#46d369', margin: '0 0 10px 0' }}>🎉 ĐẶT VÉ THÀNH CÔNG!</h2>
        <p style={{ color: '#aaa', fontSize: '14px' }}>
          Mã vé điện tử: <strong style={{ color: '#fff' }}>VE-{ticket.id}-{Date.now().toString().slice(-4)}</strong>
        </p>

        <div style={{ background: '#181818', padding: '16px', borderRadius: '10px', textAlign: 'left', margin: '20px 0', fontSize: '15px' }}>
          <p style={{ margin: '6px 0' }}>🎬 <strong>Phim:</strong> {ticket.movieName}</p>
          <p style={{ margin: '6px 0' }}>👤 <strong>Khách hàng:</strong> {ticket.fullName} ({ticket.phone})</p>
          <p style={{ margin: '6px 0' }}>⏱ <strong>Suất chiếu:</strong> {ticket.showtime}</p>
          <p style={{ margin: '6px 0' }}>💺 <strong>Loại ghế:</strong> {ticket.seatType?.toUpperCase()} x {ticket.ticketQuantity} vé</p>
          <p style={{ margin: '6px 0', borderTop: '1px solid #333', paddingTop: '10px', color: '#46d369', fontSize: '18px' }}>
            💰 <strong>Tổng thanh toán:</strong> {ticket.totalPrice?.toLocaleString('vi-VN')} VNĐ
          </p>
        </div>

        <button
          onClick={onClose}
          style={{
            width: '100%',
            padding: '12px',
            background: '#e50914',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          Trở về Trang Chủ
        </button>
      </div>
    </div>
  );
}
```

---

### BƯỚC 2: Cập nhật `src/pages/BookingPage.jsx`

1. **Import thêm ở đầu file:**
   ```javascript
   import { useState } from 'react';
   import { useMutation } from '@tanstack/react-query';
   import { TicketSuccessModal } from '../components/TicketSuccessModal';
   ```

2. **Bên trong component `BookingPage`:**
   ```javascript
   const [bookedTicket, setBookedTicket] = useState(null);

   const bookingMutation = useMutation({
     mutationFn: async (payload) => {
       // Bắn HTTP POST thật lên mock server
       const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(payload),
       });
       if (!res.ok) throw new Error(`Lỗi máy chủ: ${res.status}`);
       return res.json();
     },
     onSuccess: (data) => {
       console.log('Server trả về thành công:', data);
       setBookedTicket(data); // Mở Modal
     },
     onError: (err) => {
       alert(`Đặt vé thất bại: ${err.message}`);
     },
   });

   function onSubmitBooking(data) {
     const payload = {
       ...data,
       movieName: movie?.name,
       movieSlug: slug,
       totalPrice: totalPrice,
       createdAt: new Date().toLocaleString('vi-VN'),
     };
     bookingMutation.mutate(payload); // Kích hoạt mutation
   }
   ```

3. **Cập nhật nút submit ở cuối form:**
   ```jsx
   <button
     type="submit"
     disabled={bookingMutation.isPending}
     style={{
       marginTop: '20px',
       padding: '14px',
       background: bookingMutation.isPending ? '#666' : '#e50914',
       color: '#fff',
       border: 'none',
       borderRadius: '8px',
       fontSize: '16px',
       fontWeight: 'bold',
       cursor: bookingMutation.isPending ? 'not-allowed' : 'pointer',
     }}
   >
     {bookingMutation.isPending ? '⏳ Đang gửi lên máy chủ...' : '🎟️ Xác Nhận Đặt Vé'}
   </button>
   ```

4. **Gọi Modal ở cuối hàm `return ()` (trước thẻ đóng `</div>` cuối cùng):**
   ```jsx
   <TicketSuccessModal 
     ticket={bookedTicket} 
     onClose={() => {
       setBookedTicket(null);
       navigate('/');
     }} 
   />
   ```

---

## 📌 4. HƯỚNG DẪN ĐỒNG BỘ GIT (RẤT QUAN TRỌNG)

### Trước khi rời máy hiện tại:
Mở Terminal chạy chuỗi lệnh sau để đẩy toàn bộ code và sổ tay lên GitHub:
```bash
git add .
git commit -m "feat: hoan thanh BookingPage voi Zod, RHF va chuan bi useMutation"
git push origin main
```

### Khi mở máy khác (ở nhà hoặc hôm sau):
Mở Terminal chạy:
```bash
git pull origin main
```
Sau đó nếu muốn bắt đầu phiên làm việc mới với AI, chỉ cần nhắn:
> *"Tôi vừa pull code mới nhất rồi, tiếp tục Chặng 1 làm useMutation nhé!"*
