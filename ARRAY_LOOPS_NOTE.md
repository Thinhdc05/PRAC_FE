# 📑 CẨM NANG TOÀN DIỆN: VÒNG LẶP & CÁC HÀM DUYỆT MẢNG TRONG JAVASCRIPT

> **Mục tiêu:** Nắm trọn bản chất hoạt động, giá trị trả về, tính bất biến (Immutability), và các bẫy phỏng vấn Senior của toàn bộ các phương thức duyệt dữ liệu trong JavaScript.

---

## 🗺️ TỔNG QUAN: PHÂN CHIA 2 NHÓM LỚN

Mọi thao tác lặp trong JavaScript được chia thành 2 thế giới:
1. **Nhóm 1: Câu lệnh vòng lặp cú pháp (Loop Statements):** `for`, `for...of`, `for...in`.
   * *Đặc điểm:* Có thể dùng từ khóa `break` (dừng lặp ngay) hoặc `continue` (bỏ qua vòng hiện tại).
2. **Nhóm 2: Các phương thức mảng bậc cao (Array Iteration Methods / HOF):** `forEach`, `map`, `filter`, `reduce`, `find`, `findIndex`, `some`, `every`.
   * *Đặc điểm:* Nhận hàm callback, mang phong cách Functional Programming, **TUYỆT ĐỐI KHÔNG DÙNG ĐƯỢC `break` hoặc `continue`**.

---

## 🧭 PHẦN 1: BỘ BA VÒNG LẶP CÚ PHÁP (`for`, `for...in`, `for...of`)

### 1. `for` truyền thống (Index-based Loop)
* **Bản chất:** Chạy theo biến đếm chỉ số `i` từ `0` đến `length - 1`.
* **Khi nào dùng:** Khi cần kiểm soát chặt chẽ chỉ số `i` (nhảy cóc `i += 2`, lặp ngược từ cuối về đầu `i--`), hoặc cần `break` dừng sớm.
```javascript
const fruits = ["Táo", "Cam", "Chuối"];
for (let i = 0; i < fruits.length; i++) {
    if (fruits[i] === "Cam") break; // Dừng ngay khi thấy Cam
    console.log(fruits[i]);
}
```

---

### 2. `for...in`: SINH RA DÀNH RIÊNG CHO OBJECT (Lấy TÊN THUỘC TÍNH / KEY)
* **Quy tắc vàng:** Chữ **`in`** viết tắt của **Index / Key Name**.
* **Bản chất:** Duyệt qua tất cả các **Tên thuộc tính (Enumerable Keys)** của một đối tượng.
```javascript
const person = { name: "Thịnh", age: 22, city: "Hà Nội" };

for (let key in person) {
    console.log(`${key}: ${person[key]}`);
}
// In ra:
// name: Thịnh
// age: 22
// city: Hà Nội
```

⚠️ **BẪY PHỎNG VẤN SENIOR:** Có nên dùng `for...in` để duyệt MẢNG không?
* **Đáp án:** **TUYỆT ĐỐI KHÔNG!**
* **Lý do:** 
  1. Các chỉ số index trả về bị ép thành **kiểu Chuỗi (String)** `"0"`, `"1"`, `"2"` chứ không phải Số.
  2. Nếu ai đó gắn thêm hàm vào prototype (`Array.prototype.customFunc = ...`), `for...in` sẽ **duyệt lôi luôn cả cái hàm đó ra**, gây ra bug kinh hoàng!

---

### 3. `for...of`: SINH RA DÀNH CHO MẢNG & ITERABLE (Lấy GIÁ TRỊ / VALUE)
* **Bản chất:** Duyệt qua các **Giá trị (Values)** của bất kỳ cấu trúc dữ liệu nào có thể lặp (Array, String, Set, Map).
* **Đặc điểm:** Cực kỳ sạch sẽ, đọc giá trị trực tiếp và **cho phép dùng `break`, `continue`**.
```javascript
const fruits = ["Táo", "Cam", "Chuối"];

for (let fruit of fruits) {
    if (fruit === "Cam") continue; // Bỏ qua Cam
    console.log(fruit); // In ra: "Táo", "Chuối"
}
```

---

### 💡 BẢNG PHÂN BIỆT NHANH `for...in` VS `for...of`:

| Tiêu chí | `for...in` | `for...of` |
| :--- | :--- | :--- |
| **Dành cho ai?** | **Object** (Đối tượng) | **Array**, String, Set, Map |
| **Lấy ra cái gì?** | **Keys / Tên thuộc tính** (Chỉ số) | **Values / Giá trị thực tế** |
| **Mẹo nhớ** | `for...in` = **IN**dex / Key | `for...of` = **OF**ject Value / Giá trị |

---

## ⚡ PHẦN 2: BỘ PHƯƠNG THỨC MẢNG HOF (FUNCTIONAL ARRAY METHODS)

---

### 1. `forEach()`: CHỈ DUYỆT ĐỂ THỰC HIỆN TÁC VỤ PHỤ (Side Effects)
* **Ý nghĩa:** Duyệt qua từng phần tử để làm một việc gì đó (in ra console, gắn sự kiện DOM, gọi API).
* **Giá trị trả về:** **`undefined`** (Không bao giờ trả về mảng mới!).
* **Bẫy phỏng vấn:** `forEach` **KHÔNG THỂ DÙNG `break` hay `continue`**. Muốn dừng sớm phải dùng `for...of` hoặc `some()`.

```javascript
const numbers = [1, 2, 3];
numbers.forEach((num, index) => {
    console.log(`Vị trí ${index}: ${num}`);
});
```

---

### 2. `map()`: BIẾN HÌNH MẢNG (1 ĐỔI 1)
* **Ý nghĩa:** Biến đổi từng phần tử thành một giá trị mới theo hàm callback.
* **Quy tắc sống còn:** Mảng đầu vào có **N phần tử** → Mảng trả về **LUÔN ĐÚNG N PHẦN TỬ**.
* **Mảng gốc:** Không bị thay đổi (Immutability).

```javascript
const prices = [100, 200, 300];
const pricesWithTax = prices.map(price => price * 1.1);
// Kết quả: [110, 220, 330]
```

---

### 3. `filter()`: SÀNG LỌC DỮ LIỆU
* **Ý nghĩa:** Chỉ giữ lại những phần tử mà hàm callback trả về `true`.
* **Quy tắc sống còn:** Mảng trả về có số lượng phần tử **NHỎ HƠN HOẶC BẰNG N PHẦN TỬ**.
* **Mảng gốc:** Không bị thay đổi.

```javascript
const scores = [45, 80, 92, 30, 65];
const passedScores = scores.filter(score => score >= 50);
// Kết quả: [80, 92, 65]
```

---

### 4. `reduce()`: RÚT GỌN MẢNG VỀ 1 GIÁ TRỊ DUY NHẤT
* **Ý nghĩa:** Dùng một biến tích lũy (`accumulator`) để dồn toàn bộ mảng thành một kết quả duy nhất (Số, Chuỗi, Object, Mảng mới).
* **Cú pháp:** `array.reduce((acc, curr, index, arr) => { ... }, initialValue)`.

```javascript
// Tính tổng tiền giỏ hàng:
const cart = [
    { item: "Bánh", price: 20 },
    { item: "Sữa", price: 30 }
];
const total = cart.reduce((acc, curr) => acc + curr.price, 0);
// Kết quả: 50
```

---

### 5. `find()`: TÌM PHẦN TỬ ĐẦU TIÊN
* **Ý nghĩa:** Tìm và trả về **CHÍNH XÁC PHẦN TỬ ĐẦU TIÊN** thỏa mãn điều kiện.
* **Giá trị trả về:**
  * Nếu tìm thấy: Trả về **chính phần tử đó** (Object, số, chuỗi).
  * Nếu không tìm thấy: Trả về **`undefined`**.
* **Tối ưu:** Dừng duyệt ngay lập tức khi tìm thấy phần tử đầu tiên (không duyệt hết mảng như `filter`).

```javascript
const users = [
    { id: 1, name: "An" },
    { id: 2, name: "Bình" },
    { id: 3, name: "An" }
];
const user = users.find(u => u.name === "An");
// Kết quả: { id: 1, name: "An" } (Chỉ lấy người đầu tiên)
```

---

### 6. `findIndex()`: TÌM VỊ TRÍ CHỈ SỐ CỦA PHẦN TỬ ĐẦU TIÊN
* **Ý nghĩa:** Giống `find()`, nhưng thay vì trả về phần tử thì nó trả về **vị trí Index** (`0, 1, 2...`).
* **Giá trị trả về:**
  * Nếu tìm thấy: Trả về **Index** (ví dụ: `0`, `3`).
  * Nếu không tìm thấy: Trả về **`-1`**.
* **Ứng dụng:** Tìm vị trí để xóa hoặc sửa phần tử trong mảng (`splice`).

```javascript
const users = [{ id: 10 }, { id: 20 }, { id: 30 }];
const index = users.findIndex(u => u.id === 20);
// Kết quả: 1
```

---

### 7. `some()`: KIỂM TRA "CÓ ÍT NHẤT MỘT PHẦN TỬ NÀO KHÔNG?"
* **Ý nghĩa:** Chỉ cần **MỘT phần tử** thỏa mãn điều kiện `true` là lập tức trả về `true` và dừng duyệt ngay.
* **Giá trị trả về:** `true` hoặc `false`.

```javascript
const numbers = [1, 3, 5, 8, 9];
// Kiểm tra xem mảng có số chẵn nào không:
const hasEvenNumber = numbers.some(n => n % 2 === 0);
// Kết quả: true (vì có số 8)
```

---

### 8. `every()`: KIỂM TRA "TẤT CẢ PHẦN TỬ CÓ THỎA MÃN KHÔNG?"
* **Ý nghĩa:** Yêu cầu **100% PHẦN TỬ** đều phải thỏa mãn điều kiện. Chỉ cần 1 phần tử vi phạm (`false`) là dừng duyệt và trả về `false` ngay.
* **Giá trị trả về:** `true` hoặc `false`.

```javascript
const ages = [18, 21, 25, 17, 30];
// Kiểm tra xem tất cả có đủ tuổi trưởng thành (>= 18) không:
const allAdults = ages.every(age => age >= 18);
// Kết quả: false (vì có tuổi 17)
```

---

## 🏆 BẢNG TỔNG KẾT VÀNG (DÙNG ĐỂ TRA CỨU TRONG 10 GIÂY)

| Phương thức | Mục đích cốt lõi | Giá trị trả về | Có đổi mảng gốc? |
| :--- | :--- | :--- | :---: |
| **`forEach`** | Chạy tác vụ phụ cho từng phần tử | `undefined` | ❌ Không |
| **`map`** | Biến đổi từng phần tử (1-1) | Mảng mới có **cùng độ dài** | ❌ Không |
| **`filter`** | Lọc lấy các phần tử thỏa mãn | Mảng mới có **độ dài <= gốc** | ❌ Không |
| **`reduce`** | Gom toàn bộ mảng về 1 giá trị duy nhất | **1 giá trị bất kỳ** (Số, Obj, Mảng) | ❌ Không |
| **`find`** | Lấy phần tử đầu tiên thỏa mãn | **Phần tử đó** hoặc `undefined` | ❌ Không |
| **`findIndex`** | Lấy vị trí index của phần tử đầu tiên | **Số index** hoặc `-1` | ❌ Không |
| **`some`** | Kiểm tra có **ít nhất 1** phần tử thỏa mãn | `true` hoặc `false` | ❌ Không |
| **`every`** | Kiểm tra xem **toàn bộ 100%** có thỏa mãn | `true` hoặc `false` | ❌ Không |

---

## ⚠️ 3 CÂU HỎI BẪY PHỎNG VẤN SENIOR ĐỈNH CAO:

### Bẫy 1: Muốn dừng vòng lặp giữa chừng (Early Exit) thì dùng gì?
* ❌ **Không dùng được:** `forEach`, `map`, `filter`, `reduce` (Không thể `break`).
* ✔️ **Nên dùng:** `for`, `for...of`, hoặc dùng `some()` / `every()` (bản chất `some` tự dừng khi gặp `true`, `every` tự dừng khi gặp `false`).

### Bẫy 2: Bẫy toán học trên mảng rỗng `[].every()` và `[].some()`
* `[].some(x => x > 0)` trả về gì? ➔ **`false`** (Mảng rỗng thì làm gì có phần tử nào thỏa mãn!).
* `[].every(x => x > 0)` trả về gì? ➔ **`true`**!
  * *Tại sao lại là `true`?* Đây là nguyên lý logic toán học (Vacuous Truth): Một mệnh đề "mọi phần tử thỏa mãn" chỉ bị coi là Sai nếu bạn tìm thấy ít nhất 1 phần tử vi phạm. Vì mảng rỗng nên không có phần tử nào vi phạm ➔ Mặc định coi là `true`!

### Bẫy 3: Phân biệt `find` vs `filter` khi cần tìm 1 item duy nhất (Ví dụ tìm theo ID)
* *Tình huống:* Tìm user có `id = 5` trong mảng 10.000 user.
* *Cách gà mờ:* Dùng `filter(u => u.id === 5)[0]` ➔ **TỆ VỀ HIỆU NĂNG** vì `filter` bắt buộc phải duyệt hết 10.000 phần tử mới dừng!
* *Cách Senior:* Dùng `find(u => u.id === 5)` ➔ Tìm thấy ở vị trí thứ 5 là **dừng lặp ngay lập tức**, không duyệt 9.995 phần tử còn lại!
