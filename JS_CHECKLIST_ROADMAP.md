# 🎯 JAVASCRIPT TO REACT READINESS CHECKLIST (LỘ TRÌNH ÔN TẬP & LẤP LỖ HỔNG)

> **Mục tiêu:** Rà soát toàn diện 13 nhóm kiến thức cốt lõi trước khi bước vào React. Không học vẹt, học để hiểu tận gốc cơ chế ngầm (JS Engine, Memory, Asynchronous) và tự tin trả lời phỏng vấn Senior.

---

## 📌 TIẾN ĐỘ TỔNG QUAN
- [x] **1. Biến, kiểu dữ liệu và toán tử**
- [x] **2. Điều kiện và vòng lặp**
- [x] **3. Function — phần rất quan trọng**
- [x] **4. Array — bắt buộc phải chắc**
- [x] **5. Object và immutable**
- [x] **6. Cú pháp ES6+ dùng nhiều trong React**
- [x] **7. DOM và sự kiện**
- [x] **8. Bất đồng bộ**
- [x] **9. Cơ chế JavaScript cần hiểu ở mức vừa đủ**
- [x] **10. Xử lý lỗi và debug**
- [ ] **11. Form và validation**
- [ ] **12. Kiến thức trình duyệt và API**
- [ ] **13. Git và cấu trúc code**

---

## 1. Biến, kiểu dữ liệu và toán tử

- [x] `let`, `const`; hiểu vì sao hạn chế `var` (hoisting, function-scope vs block-scope).
- [x] Kiểu nguyên thủy: `string`, `number`, `boolean`, `null`, `undefined` (lưu tại Stack).
- [x] Object, Array (Reference type, lưu tại Heap).
- [x] Truthy / Falsy (8 giá trị falsy kinh điển trong JS).
- [x] So sánh `===`, `!==` (strict equality) vs `==`, `!=` (type coercion).
- [x] Toán tử logic short-circuit: `&&`, `||`, nullish coalescing `??`.
- [x] Optional chaining `?.` (tránh lỗi `Cannot read properties of undefined`).
- [x] Phân biệt rạch ròi giữa `null` (chủ động gán rỗng) và `undefined` (chưa được định nghĩa).
- [x] Ép kiểu số / chuỗi và lỗi cộng chuỗi với số (implicit vs explicit coercion).

```javascript
const displayName = user?.profile?.name ?? "Chưa cập nhật";
```

---

## 2. Điều kiện và vòng lặp

- [x] `if/else`, `switch/case`, toán tử ba ngôi (ternary).
- [x] `for`, `for...of` (duyệt value của mảng/iterable), `for...in` (duyệt key của object).
- [x] Điều khiển luồng: `break`, `continue`.
- [x] Tư duy: Biết khi nào dùng vòng lặp truyền thống và khi nào dùng các hàm của mảng (`map`, `filter`, `forEach`).
- [x] *Nguyên tắc Clean Code:* Không lạm dụng ternary lồng nhiều tầng vì sau này viết JSX rất khó đọc.

---

## 3. Function — Phần rất quan trọng

- [x] Function declaration vs Function expression (sự khác biệt về Hoisting).
- [x] Arrow function (cú pháp ngắn gọn, không có `this`, `arguments`, `prototype`).
- [x] Tham số (Parameters) và giá trị mặc định (Default parameters).
- [x] Lệnh `return` và cơ chế Early Return.
- [x] Callback function: Bản chất hàm là First-class Citizen (truyền hàm như một biến).
- [x] Higher-order function ở mức cơ bản (nhận hàm làm tham số hoặc trả về một hàm).
- [x] Scope (Global, Function, Block) và Closure (bao đóng dữ liệu).
- [x] Pure function cơ bản (cùng input luôn cho cùng output, không gây Side-effect).

```javascript
const calculateTotal = (items) => items.reduce((total, item) => total + item.price * item.quantity, 0);
```

> **Lưu ý cốt lõi:** Phải hiểu rằng arrow function truyền vào `map`, `filter`, sự kiện… là **định nghĩa một function**, không phải kết quả thực thi của function đó.

---

## 4. Array — Bắt buộc phải chắc

- [x] `map`: Biến đổi danh sách, trả về mảng mới cùng độ dài.
- [x] `filter`: Lọc các phần tử thỏa mãn điều kiện, trả về mảng mới.
- [x] `find`: Tìm phần tử đầu tiên khớp điều kiện, trả về phần tử hoặc `undefined`.
- [x] `findIndex`: Tìm vị trí đầu tiên khớp điều kiện, trả về index hoặc `-1`.
- [x] `some`: Có ít nhất một phần tử phù hợp không (trả về boolean).
- [x] `every`: Tất cả phần tử có phù hợp không (trả về boolean).
- [x] `reduce`: Tính tổng hoặc gom nhóm / tích lũy dữ liệu.
- [x] `sort`: Sắp xếp và lưu ý nó làm biến đổi (mutate) mảng gốc.
- [x] `includes`, `slice` (không mutate), `splice` (mutate mảng).
- [x] Thêm, sửa, xóa phần tử theo cách bất biến (Immutable).

```javascript
const updatedProducts = products.map((product) =>
  product.id === updatedProduct.id ? { ...product, ...updatedProduct } : product
);
```

> **Lưu ý:** Dù tối ưu bằng `findIndex` trong JS thuần, vẫn phải hiểu sâu `map`, vì trong React nó được dùng liên tục để render danh sách phần tử JSX.

---

## 5. Object và Immutable

*Đây là nền tảng trực tiếp của State Management trong React:*

- [x] Truy cập, thêm, sửa, xóa thuộc tính (dot notation vs bracket notation `obj[key]`).
- [x] Destructuring Object.
- [x] Spread (`...`) và Rest parameters.
- [x] Khái niệm Shallow copy (sao chép nông) vs Deep copy (sao chép sâu).
- [x] Nguyên tắc Immutability: Không mutate trực tiếp object / array.
- [x] Hiểu rõ copy nông và cách xử lý object lồng nhau (Nested object update).

```javascript
const updatedUser = {
  ...user,
  address: {
    ...user.address,
    city: "Hà Nội",
  },
};
```

> **Cạm bẫy:** Phải hiểu `const copiedUser = { ...user };` chỉ copy lớp vỏ ngoài cùng, các object con bên trong vẫn dùng chung địa chỉ tham chiếu!

---

## 6. Cú pháp ES6+ dùng nhiều trong React

- [x] Template literal (string nội suy với backtick `` `...${}...` ``).
- [x] Destructuring (Array & Object).
- [x] Spread / Rest operator (`...`).
- [x] Arrow function.
- [x] Default parameter.
- [x] Optional chaining (`?.`).
- [x] Nullish coalescing (`??`).
- [x] Property shorthand (`{ name, age }` thay vì `{ name: name, age: age }`).
- [x] Dynamic property key (`{ [dynamicKey]: value }`).
- [x] Modules: `import` / `export` (Named export vs Default export).

```javascript
export const formatPrice = (price) => {
  return new Intl.NumberFormat("vi-VN").format(price);
};

import { formatPrice } from "./formatPrice.js";
```

---

## 7. DOM và sự kiện

*Dù React quản lý Virtual DOM, người học vẫn cần hiểu cội nguồn:*

- [x] DOM tree là gì.
- [x] Chọn và cập nhật phần tử (`querySelector`, `innerHTML`, `textContent`).
- [x] `addEventListener` và cơ chế dọn dẹp listener.
- [x] Event object (`e`).
- [x] Phân biệt `e.target` (phần tử thực sự bị click) và `e.currentTarget` (phần tử gắn listener).
- [x] `e.preventDefault()` (chặn hành vi mặc định của form/link) và `e.stopPropagation()` (chặn nổi bọt).
- [x] Event bubbling (Nổi bọt sự kiện) và kỹ thuật Event Delegation (Ủy quyền sự kiện).
- [x] Xử lý form submit.
- [x] Đọc và ràng buộc giá trị input.

---

## 8. Bất đồng bộ (Asynchronous JavaScript)

- [x] Callback cơ bản và Callback Hell.
- [x] Promise (3 trạng thái: `pending`, `fulfilled`, `rejected`).
- [x] Xử lý chuỗi Promise: `.then()`, `.catch()`, `.finally()`.
- [x] Cú pháp hiện đại: `async / await`.
- [x] Bắt lỗi bất đồng bộ với `try / catch / finally`.
- [x] Web API: `fetch()`.
- [x] HTTP Method (`GET`, `POST`, `PUT`, `DELETE`) và Status Code cơ bản.
- [x] Gọi API tuần tự (Sequential) vs Song song (Parallel).
- [x] `Promise.all()`, `Promise.allSettled()`.
- [x] Xử lý trạng thái giao diện: Loading, Error, Retry.
- [x] Hủy request bằng `AbortController` (rất quan trọng trong `useEffect` của React).

---

## 9. Cơ chế JavaScript cần hiểu ở mức vừa đủ

- [x] Scope & Scope Chain.
- [x] Hoisting (biến `var`, `let`, `const`, function).
- [x] Closure và ứng dụng trong việc ghi nhớ trạng thái (tiền đề của React Hook `useState`).
- [x] Pass by value (nguyên thủy) vs Pass by reference (đối tượng/mảng).
- [x] Từ khóa `this` cơ bản và sự khác nhau với Arrow function (Lexical `this`).
- [x] Event loop cơ bản: Call Stack, Web APIs, Task Queue (Macrotask) và Microtask Queue.
- [x] Thứ tự ưu tiên thực thi: Mã đồng bộ $\rightarrow$ Microtask (Promise callback) $\rightarrow$ Macrotask (`setTimeout`).

```javascript
console.log("A");
setTimeout(() => console.log("B"), 0);
Promise.resolve().then(() => console.log("C"));
console.log("D");

// Kết quả thực thi: A -> D -> C -> B
```

---

## 10. Xử lý lỗi và debug

- [x] Ném lỗi chủ động: `throw new Error("Thông báo lỗi")`.
- [x] Bắt lỗi an toàn: `try / catch`.
- [x] Đọc hiểu Error Message và truy vết nguồn gốc qua Stack trace.
- [x] Kỹ thuật Debug trên Browser DevTools:
  - Breakpoint và Conditional breakpoint (điểm dừng có điều kiện).
  - Điều hướng: Step over (F10), Step into (F11), Step out (Shift+F11).
  - Các tab theo dõi: Scope variables, Watch expressions, Call Stack.
- [x] Sử dụng thành thạo các panel trong Chrome DevTools:
  - Console.
  - Network (soi request payload, response, headers, timing).
  - Application / Storage (`localStorage`, cookies).
  - Elements (soi DOM, CSS computed).
- [x] Phân biệt rõ: Lỗi cú pháp (Syntax error), Lỗi khi chạy (Runtime error), và Lỗi nghiệp vụ (Logic bug).

---

## 11. Form và validation

*Trước khi học các thư viện Form trong React (React Hook Form, Formik), phải thuần thục bằng Vanilla JS:*

- [x] Đọc và chuẩn hóa dữ liệu từ form (`FormData`, `input.value.trim()`).
- [x] Validate các trường hợp phổ biến: Bắt buộc (required), độ dài ký tự (min/max length), số hợp lệ, định dạng email regex.
- [x] Hiển thị thông báo lỗi đúng ngay dưới field tương ứng.
- [x] Chặn form submit khi dữ liệu không hợp lệ.
- [x] Chuẩn hóa dữ liệu trước khi gửi đi (sanitize, trim whitespace, ép kiểu số).
- [x] Reset form sau khi submit thành công (`form.reset()`).
- [x] Tránh submit nhiều lần (Double-click submit: disable nút bấm khi đang xử lý).

---

## 12. Kiến thức trình duyệt và API

- [x] Kiến trúc HTTP cơ bản: `GET`, `POST`, `PUT / PATCH`, `DELETE`.
- [x] Chu trình Request / Response.
- [x] Định dạng JSON (`JSON.stringify()` và `JSON.parse()`).
- [x] Ý nghĩa các dải Status Code:
  - `200` OK, `201` Created.
  - `400` Bad Request, `401` Unauthorized, `403` Forbidden, `404` Not Found, `409` Conflict.
  - `500` Internal Server Error.
- [x] Phân biệt Query params (`?page=1&limit=10`) và Path params (`/products/:id`).
- [x] Request Header và cơ chế xác thực Token cơ bản (Bearer Token).
- [x] Lưu trữ phía client: `localStorage` (vĩnh viễn) vs `sessionStorage` (theo phiên tab).
- [x] Hiểu khái niệm cơ bản về CORS (Cross-Origin Resource Sharing).
- [x] Tải file lên server bằng `FormData` và `FileReader`.

---

## 13. Git và cấu trúc code

- [x] Các lệnh Git hàng ngày: `clone`, `branch`, `add`, `commit`, `push`, `pull`.
- [x] Xử lý conflict cơ bản khi merge / pull.
- [x] Tư duy tổ chức thư mục dự án sạch sẽ:
  - `api/` hoặc `services/`: Nơi gọi mạng.
  - `utils/` hoặc `helpers/`: Các hàm tiện ích dùng chung (format tiền, ngày tháng...).
  - `constants/`: Biến cố định, Storage keys, Enum trạng thái.
  - `validation/`: Các hàm kiểm tra dữ liệu form.
- [x] Nguyên tắc Single Responsibility (Mỗi hàm/file chỉ làm một nhiệm vụ).
- [x] Đặt tên biến và hàm rõ nghĩa, chuẩn quy ước camelCase / UPPER_CASE.
- [x] Sử dụng công cụ format code tự động: ESLint và Prettier.
