# 📘 SỔ TAY CHUYÊN SÂU: ECMASCRIPT 6+ (ES6+) TOÀN DIỆN VÀ THỰC CHIẾN

> **Tiêu chuẩn biên soạn:** Mỗi chủ đề đều được cấu trúc chuẩn hóa gồm 4 phần:
> 1. **Khái niệm & Bản chất:** Định nghĩa chính xác, dễ hiểu.
> 2. **Ý nghĩa & Mục đích:** Liệt kê các gạch đầu dòng vì sao sinh ra tính năng này, giải quyết nỗi đau gì của ES5 cũ.
> 3. **Code thực chiến & Giải thích chi tiết từng dòng.**
> 4. **Điểm đặc biệt & Bẫy phỏng vấn Senior:** Những chỗ hay bị hỏi gài và sai lầm phổ biến.

---

## 📑 MỤC LỤC 15 CHỦ ĐỀ ES6+:
1. [15.1 ECMAScript 6 là gì?](#151-ecmascript-6-là-gì)
2. [15.2 Let & Const (Quản lý bộ nhớ, Scope, Hoisting & TDZ)](#152-let--const)
3. [15.3 Template Literals (Chuỗi nội suy đa dòng)](#153-template-literals)
4. [15.4 & 15.5 Arrow Function (Hàm mũi tên & Lexical this)](#154--155-arrow-function)
5. [15.6 & 15.7 Classes (Hướng đối tượng & Kế thừa OOP)](#156--157-classes)
6. [15.8 Default Parameter Values (Tham số mặc định)](#158-default-parameter-values)
7. [15.9 Enhanced Object Literals (Cú pháp Object nâng cao)](#159-enhanced-object-literals)
8. [15.10 Destructuring & Rest Parameter](#1510-destructuring--rest-parameter)
9. [15.11 & 15.12 Spread Operator & Thực hành Immutability](#1511--1512-spread-operator)
10. [15.13 Tagged Template Literals](#1513-tagged-template-literals)
11. [15.14 ES6 Modules (import / export)](#1514-es6-modules)
12. [15.15 Optional Chaining (?.) & Nullish Coalescing (??)](#1515-optional-chaining--)
13. [⭐ PHẦN ĐẶC BIỆT: CLOSURE TRONG JAVASCRIPT & REACT](#-phần-đặc-biệt-closure-trong-javascript--react)

---

## 15.1 ECMASCRIPT 6 LÀ GÌ?

### 1. Khái niệm & Bản chất:
* **ECMAScript (ES):** Là bản đặc tả tiêu chuẩn kỹ thuật (Standard Specification) được quản lý bởi tổ chức ECMA International (ủy ban TC39).
* **JavaScript:** Là ngôn ngữ lập trình thực thi (Implementation) tuân theo tiêu chuẩn ECMAScript. Giống như bản vẽ thiết kế nhà là ECMAScript, còn ngôi nhà xây lên thực tế là JavaScript.
* **ES6 (ECMAScript 2015):** Là phiên bản thứ 6 của tiêu chuẩn, phát hành tháng 6/2015, đánh dấu cuộc cách mạng lột xác lớn nhất trong lịch sử JavaScript.

### 2. Ý nghĩa & Mục đích (Tại sao phải ra đời?):
* **Giải quyết sự già cỗi của JS:** Trước năm 2015, JavaScript thiếu rất nhiều tính năng hiện đại so với các ngôn ngữ như Java, C#, Python (không có Class chuẩn, không có module chuẩn, khai báo biến dễ sinh lỗi).
* **Chuẩn bị cho các siêu ứng dụng:** Giúp JavaScript đủ sức xây dựng các dự án phức tạp ở cả Frontend (React, Vue, Angular) lẫn Backend (Node.js).
* **Chuyển sang cơ chế cập nhật hàng năm:** Sau ES6, ủy ban TC39 chuyển sang chu kỳ phát hành mỗi năm 1 lần (ES2016, ES2017, ..., ES2024), tránh việc phải chờ đợi cả chục năm như trước.

### 3. Điểm đặc biệt & Lưu ý:
* **ES.Next:** Là thuật ngữ để chỉ những tính năng tương lai đang được đề xuất trong các giai đoạn (Stage 0 đến Stage 4).
* **Babel Compiler:** Vì các trình duyệt cũ không hiểu hết cú pháp ES6+, lập trình viên dùng công cụ Babel để "dịch ngược" code ES6+ về ES5 để mọi trình duyệt cổ điển đều chạy được.

---

## 15.2 LET & CONST

### 1. Khái niệm & Bản chất:
* `let` và `const` là 2 từ khóa khai báo biến mới trong ES6, sinh ra để thay thế hoàn toàn cho từ khóa `var` cổ điển.
* `let`: Dùng cho các biến có giá trị cần thay đổi theo thời gian.
* `const`: Dùng cho các hằng số hoặc các biến không bao giờ được phép gán lại địa chỉ mới.

### 2. Ý nghĩa & Mục đích:
* **Khắc phục lỗi ô nhiễm phạm vi của `var`:** `var` chỉ có Function Scope, dễ bị rò rỉ ra ngoài vòng lặp `for` hay khối lệnh `if`. `let` và `const` có **Block Scope `{}`**, hết dấu ngoặc là tự động giải phóng vùng nhớ.
* **Ngăn chặn lỗi khai báo trùng lặp:** `var` cho phép khai báo lại 2 lần cùng 1 tên biến (làm đè mất dữ liệu). `let` và `const` cấm tiệt điều này và báo lỗi ngay.
* **Bảo vệ tính toàn vẹn dữ liệu:** `const` ngăn chặn việc vô tình gán đè dữ liệu quan trọng trong quá trình chạy app.

### 3. Code minh họa & Giải thích chi tiết:
```javascript
// 1. Block Scope của let và const:
{
    let a = 10;
    const b = 20;
    var c = 30;
}
console.log(c); // In ra 30 (var bị tràn ra ngoài block scope)
// console.log(a); // Báo lỗi ReferenceError: a is not defined (a an toàn trong {})

// 2. Tính chất của const với Object:
const user = { name: "Thịnh" };
user.name = "An"; // HỢP LỆ: Sửa thuộc tính bên trong thì được
// user = { name: "Bình" }; // LỖI NGAY: TypeError: Assignment to constant variable!
```

### 4. Điểm đặc biệt & Bẫy phỏng vấn Senior (Vùng chết tạm thời - TDZ):
* **Câu hỏi:** `let` và `const` có bị Hoisting không?
* **Trả lời:** **CÓ BỊ HOISTING!** V8 Engine vẫn quét và cấp phát ô nhớ từ trước trong Creation Phase. Nhưng nó khóa ô nhớ đó lại trong **TDZ (Temporal Dead Zone)**. Nếu cố tình truy cập biến trước dòng khai báo, V8 sẽ ném lỗi `ReferenceError: Cannot access variable before initialization` thay vì trả về `undefined` nguy hiểm như `var`.

---

## 15.3 TEMPLATE LITERALS

### 1. Khái niệm & Bản chất:
* Là cú pháp khai báo chuỗi ký tự bằng cặp dấu backtick (dấu huyền: `` ` ``) thay vì dấu nháy đơn `'` hoặc nháy kép `"`.

### 2. Ý nghĩa & Mục đích:
* **Xóa bỏ nỗi đau cộng chuỗi `+`:** Trước ES6, muốn nhét biến vào chuỗi phải dùng phép cộng: `"Xin chào " + name + ", bạn " + age + " tuổi"`. Viết rất dài và cực kỳ dễ thiếu dấu cách.
* **Hỗ trợ chuỗi nhiều dòng (Multiline):** Cho phép xuống dòng tự nhiên mà không cần nhét ký tự `\n` hoặc nối từng dòng bằng dấu `+`.
* **Tạo điều kiện render HTML trong JavaScript:** Giúp việc tạo các thẻ HTML mẫu (template HTML) trong JS trở nên trong sáng, dễ đọc.

### 3. Code minh họa & Giải thích chi tiết:
```javascript
const name = "Thịnh";
const score = 9.5;

// Nội suy biểu thức với ${}:
const message = `Sinh viên ${name} đạt điểm ${score}, xếp loại ${score >= 8 ? "Giỏi" : "Khá"}`;
console.log(message); // "Sinh viên Thịnh đạt điểm 9.5, xếp loại Giỏi"

// Chuỗi nhiều dòng tạo HTML:
const cardHTML = `
    <div class="user-card">
        <h3>${name}</h3>
        <p>Điểm số: ${score}</p>
    </div>
`;
```

### 4. Điểm đặc biệt & Bẫy phỏng vấn:
* Bên trong `${...}` bạn có thể đặt **bất kỳ biểu thức JavaScript hợp lệ nào**: phép tính toán số học, toán tử 3 ngôi, gọi hàm, hoặc thậm chí lồng thêm một Template Literal khác bên trong.

---

## 15.4 & 15.5 ARROW FUNCTION

### 1. Khái niệm & Bản chất:
* Arrow Function (Hàm mũi tên: `() => {}`) là cú pháp viết hàm ngắn gọn hơn so với `function` truyền thống.
* Đặc tính bản chất: **Arrow Function KHÔNG CÓ ngữ cảnh `this` riêng (Lexical `this`)**.

### 2. Ý nghĩa & Mục đích:
* **Rút gọn cú pháp tối đa:** Viết các hàm ngắn gọn 1 dòng trong các phương thức mảng (`map`, `filter`, `reduce`).
* **Giải quyết bài toán "Mất con trỏ this":** Trong hàm truyền thống, khi truyền hàm vào `setTimeout` hoặc callback sự kiện, con trỏ `this` thường bị biến thành `window` hoặc `undefined`. Arrow Function mượn luôn `this` của phạm vi bao quanh nó tại thời điểm viết code, loại bỏ hoàn toàn việc phải dùng `var self = this;` hay `.bind(this)`.

### 3. Code minh họa & Giải thích chi tiết:
```javascript
// Các cách viết rút gọn:
const square = x => x * x; // 1 tham số bỏ ngoặc (), 1 dòng tự return
const add = (a, b) => a + b; // 2 tham số cần ngoặc ()

// Bẫy return về 1 Object: BẮT BUỘC phải bọc ngoặc tròn ({})
const createUser = name => ({ id: Date.now(), name: name });

// Khắc phục lỗi con trỏ this:
const timer = {
    seconds: 0,
    start() {
        // Dùng Arrow function mượn đúng con trỏ this của timer:
        setInterval(() => {
            this.seconds++;
            console.log(this.seconds);
        }, 1000);
    }
};
```

### 4. Điểm đặc biệt & 4 Bẫy cấm dùng Arrow Function:
1. **KHÔNG dùng làm Method của Object:** `{ name: "An", sayHi: () => console.log(this.name) }` ➔ `this` sẽ trỏ ra `window`, in ra `undefined`!
2. **KHÔNG dùng làm Constructor:** Cấm dùng từ khóa `new MyArrowFunc()` ➔ Ném lỗi `TypeError`.
3. **KHÔNG có đối tượng `arguments`:** Phải dùng Rest Parameter `(...args) => {}`.
4. **KHÔNG bị ảnh hưởng bởi `call`, `apply`, `bind`:** Bạn không thể ép đổi `this` của Arrow Function bằng 3 hàm này.

---

## 15.6 & 15.7 CLASSES

### 1. Khái niệm & Bản chất:
* `class` trong JavaScript là một **Syntactic Sugar (Lớp vỏ cú pháp làm đẹp)** bọc lên trên cơ chế kế thừa nguyên mẫu (Prototype-based Inheritance) cổ điển.
* Bản chất bên dưới: Class vẫn là một hàm (`typeof MyClass === "function"`), và các phương thức vẫn được gán vào `MyClass.prototype`.

### 2. Ý nghĩa & Mục đích:
* **Chuẩn hóa lập trình hướng đối tượng (OOP):** Giúp các lập trình viên chuyển từ Java, C++, Python sang JavaScript cảm thấy quen thuộc, dễ tiếp cận.
* **Cú pháp kế thừa trong sáng:** Thay thế cách kế thừa thủ công rườm rà ngày xưa bằng từ khóa `extends` và `super()`.

### 3. Code minh họa & Giải thích chi tiết:
```javascript
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    // Phương thức nằm trong Prototype:
    introduce() {
        return `Tôi tên là ${this.name}, ${this.age} tuổi.`;
    }
    // Phương thức tĩnh (chỉ gọi qua Class):
    static compareAge(p1, p2) {
        return p1.age - p2.age;
    }
}

// Kế thừa:
class Developer extends Person {
    constructor(name, age, language) {
        super(name, age); // BẮT BUỘC gọi super() để khởi tạo cha
        this.language = language;
    }
    // Ghi đè hàm của cha:
    introduce() {
        return `${super.introduce()} Tôi code bằng ${this.language}.`;
    }
}

const dev = new Developer("Thịnh", 22, "JavaScript");
console.log(dev.introduce());
```

### 4. Điểm đặc biệt & Bẫy phỏng vấn:
* **Bẫy `this` trước `super()`:** Trong constructor của class con, nếu bạn dùng `this.language = ...` TRƯỚC dòng `super()` thì code sẽ **báo lỗi ReferenceError ngay lập tức**! JavaScript bắt buộc phải tạo xong đối tượng cha (`super()`) rồi mới cho phép chỉnh sửa đối tượng con.

---

## 15.8 DEFAULT PARAMETER VALUES

### 1. Khái niệm & Bản chất:
* Cho phép định nghĩa giá trị mặc định cho các tham số của hàm ngay tại danh sách tham số `function fn(param = defaultValue)`.

### 2. Ý nghĩa & Mục đích:
* **Xóa bỏ các đoạn code kiểm tra thủ công rườm rà:** Thời ES5 phải viết: `if (typeof a === 'undefined') a = 10;` hoặc `a = a || 10;`.
* **Tránh lỗi tính toán `NaN`:** Khi người dùng quên truyền tham số, hàm không bị lỗi hoặc sinh ra kết quả sai.

### 3. Code minh họa & Giải thích chi tiết:
```javascript
function sendNotification(message, sender = "Hệ thống", timeout = 3000) {
    console.log(`[${sender}]: ${message} (Tự đóng sau ${timeout}ms)`);
}

sendNotification("Đăng nhập thành công"); 
// In ra: "[Hệ thống]: Đăng nhập thành công (Tự đóng sau 3000ms)"

sendNotification("Có tin nhắn mới", "Admin", 5000);
// In ra: "[Admin]: Có tin nhắn mới (Tự đóng sau 5000ms)"
```

### 4. Điểm đặc biệt & Bẫy phỏng vấn với `null`:
* Default Parameter **CHỈ KÍCH HOẠT KHI THAM SỐ LÀ `undefined`** (hoặc bị bỏ trống).
* Nếu người dùng truyền **`null`**, JavaScript coi `null` là một giá trị có thật ➔ **KHÔNG DÙNG GIÁ TRỊ MẶC ĐỊNH**:
  ```javascript
  function test(x = 10) { console.log(x); }
  test(undefined); // In ra 10 (kích hoạt mặc định)
  test(null);      // In ra null (KHÔNG kích hoạt mặc định!)
  ```

---

## 15.9 ENHANCED OBJECT LITERALS

### 1. Khái niệm & Bản chất:
* Là bộ ba cải tiến cú pháp giúp viết Object Literal ngắn gọn, thông minh và linh hoạt hơn rất nhiều.

### 2. Ý nghĩa & Mục đích:
* Giảm thiểu việc phải gõ lặp lại các tên biến và tên hàm.
* Cho phép tạo ra các thuộc tính có tên biến thiên linh hoạt (Dynamic Keys) ngay lúc khởi tạo.

### 3. Code minh họa & 3 tính năng nâng cấp:
```javascript
const name = "Thịnh";
const age = 22;
const dynamicKey = "score_" + 2026;

const student = {
    // 1. Property Shorthand (trùng tên thì viết 1 lần):
    name, // Tương đương: name: name
    age,  // Tương đương: age: age

    // 2. Method Shorthand (viết hàm không cần từ khóa function):
    study() { // Tương đương: study: function() {}
        console.log(`${this.name} đang học ES6!`);
    },

    // 3. Computed Property Name (Tên thuộc tính tính toán động trong []):
    [dynamicKey]: 10 // Tương đương thuộc tính: "score_2026": 10
};

student.study();
console.log(student.score_2026); // 10
```

---

## 15.10 DESTRUCTURING & REST PARAMETER

### 1. Khái niệm & Bản chất:
* **Destructuring (Phân rã cấu trúc):** Cú pháp cho phép "bóc tách" từng phần tử của Mảng hoặc thuộc tính của Object ra thành các biến độc lập.
* **Rest Parameter (`...rest`):** Cú pháp gom toàn bộ các tham số hoặc phần tử còn lại vào trong một **Mảng thực sự**.

### 2. Ý nghĩa & Mục đích:
* **Rút ngắn code:** Không cần phải viết `const name = user.name; const age = user.age;`.
* **Xử lý số lượng tham số linh hoạt:** Thay thế hoàn toàn cho đối tượng cổ lỗ sĩ `arguments`.

### 3. Code minh họa & Giải thích chi tiết:
```javascript
// A. Destructuring Object (Lấy theo TÊN thuộc tính):
const profile = { username: "thinhdc", email: "thinh@gmail.com", role: "admin" };
// Bóc tách, đổi tên biến (username -> nickName) và gán mặc định (avatar):
const { username: nickName, email, avatar = "default.png" } = profile;
console.log(nickName, email, avatar);

// B. Destructuring Array (Lấy theo VỊ TRÍ thứ tự):
const coordinates = [21.0285, 105.8542];
const [latitude, longitude] = coordinates;

// C. Rest Parameter (Gom phần còn lại):
function calculateTotal(taxRate, ...prices) {
    // prices là một mảng thực sự [100, 200, 300]:
    const sum = prices.reduce((acc, curr) => acc + curr, 0);
    return sum * (1 + taxRate);
}
console.log(calculateTotal(0.1, 100, 200, 300)); // 660
```

### 4. Điểm đặc biệt & Bẫy phỏng vấn:
* **Vị trí của Rest Parameter:** Cú pháp `...rest` **BẮT BUỘC phải nằm ở vị trí CUỐI CÙNG** trong danh sách tham số. Nếu bạn viết `function(a, ...rest, b)` ➔ Trình duyệt sẽ báo lỗi `SyntaxError: Rest parameter must be last formal parameter`!

---

## 15.11 & 15.12 SPREAD OPERATOR

### 1. Khái niệm & Bản chất:
* Cùng dùng ký hiệu ba dấu chấm `...`, nhưng nếu Rest là để **gom lại**, thì Spread Operator là để **trải bung (phân tán)** các phần tử của một mảng hoặc object ra.

### 2. Ý nghĩa & Mục đích:
* **Sao chép dữ liệu (Cloning):** Sao chép nông (Shallow copy) tạo ra một vùng nhớ độc lập mới.
* **Gộp mảng / Gộp Object:** Nối nhiều mảng hoặc nhiều object lại với nhau trong tích tắc.
* **Nguyên lý Bất biến (Immutability):** Cốt lõi của React! Cho phép tạo object mới bằng cách sao chép object cũ và ghi đè các thuộc tính cần sửa mà không làm bẩn dữ liệu gốc.

### 3. Code minh họa & Giải thích chi tiết:
```javascript
// 1. Trải mảng và gộp mảng:
const nums1 = [1, 2];
const nums2 = [3, 4];
const combined = [...nums1, ...nums2, 5]; // [1, 2, 3, 4, 5]

// 2. Cập nhật trạng thái Immutability trong React (Bài Todo list):
const oldTodo = { id: 101, title: "Làm bài tập", completed: false };

// Trải bung toàn bộ thuộc tính của oldTodo ra, và ghi đè completed: true:
const newTodo = {
    ...oldTodo,
    completed: true
};

console.log(newTodo.completed); // true
console.log(oldTodo.completed); // false (Dữ liệu gốc hoàn toàn nguyên vẹn!)
```

### 4. Điểm đặc biệt & Bẫy phỏng vấn:
* **Spread chỉ là Shallow Copy (Sao chép nông):** Nếu Object có chứa các Object con lồng nhau bên trong, Spread chỉ copy địa chỉ tham chiếu của Object con đó. Muốn Deep Copy hoàn toàn phải dùng `structuredClone(obj)` hoặc `JSON.parse(JSON.stringify(obj))`.

---

## 15.13 TAGGED TEMPLATE LITERALS

### 1. Khái niệm & Bản chất:
* Cho phép bạn dùng một hàm để phân tích cú pháp một chuỗi Template Literal. Cú pháp gọi hàm: `tenHam`chuỗi có ${biến}``.

### 2. Ý nghĩa & Mục đích:
* Cho phép bạn can thiệp, xử lý, định dạng hoặc lọc sạch dữ liệu (Sanitize HTML chống XSS) trước khi chuỗi được hiển thị.
* Nền tảng cốt lõi của thư viện **`styled-components`** đình đám trong React.

### 3. Code minh họa & Giải thích chi tiết:
```javascript
function highlight(strings, ...values) {
    // strings: mảng các chuỗi chữ tĩnh
    // values: mảng các giá trị nhét trong ${}
    return strings.reduce((acc, str, i) => {
        const val = values[i] ? `<span class="highlight">${values[i]}</span>` : "";
        return acc + str + val;
    }, "");
}

const product = "MacBook Pro";
const price = "40 triệu";

// Gọi hàm highlight bằng Tagged Template:
const result = highlight`Sản phẩm ${product} có giá ${price}.`;
console.log(result);
// In ra: Sản phẩm <span class="highlight">MacBook Pro</span> có giá <span class="highlight">40 triệu</span>.
```

---

## 15.14 ES6 MODULES

### 1. Khái niệm & Bản chất:
* Hệ thống quản lý mô-đun chính thức của JavaScript, dùng hai từ khóa **`export`** (xuất khẩu dữ liệu) và **`import`** (nhập khẩu dữ liệu).

### 2. Ý nghĩa & Mục đích:
* **Chia để trị (Modularity):** Chia một file code hàng chục nghìn dòng thành hàng chục file nhỏ chuyên biệt (Components, Services, Utils).
* **Tránh xung đột tên biến:** Mỗi file module là một phạm vi độc lập, biến viết trong file này không bao giờ sợ đè lên biến file khác.

### 3. Code minh họa & Phân biệt Named vs Default Export:
```javascript
// ================= FILE: math.js =================
// 1. Named Export (có thể có nhiều cái trong 1 file):
export const PI = 3.14159;
export function add(a, b) { return a + b; }

// 2. Default Export (MỖI FILE CHỈ CÓ DUY NHẤT 1 CÁI):
export default function multiply(a, b) { return a * b; }


// ================= FILE: app.js ==================
// Nhập Named Export: BẮT BUỘC dùng ngoặc nhọn { } và đúng tên:
import { PI, add } from "./math.js";

// Nhập Default Export: KHÔNG CẦN ngoặc nhọn, thích đặt tên gì cũng được:
import nhanHaiSo from "./math.js";

// Đổi tên (alias):
import { add as congHaiSo } from "./math.js";

// Nhập tất cả thành 1 gói:
import * as MathLib from "./math.js";
```

### 4. Điểm đặc biệt:
* Khi chạy ES6 Module trực tiếp trên trình duyệt bằng thẻ `<script>`, bạn **BẮT BUỘC phải thêm thuộc tính `type="module"`**:
  `<script type="module" src="app.js"></script>`.

---

## 15.15 OPTIONAL CHAINING (`?.`) & NULLISH COALESCING (`??`)

### 1. Khái niệm & Bản chất:
* **Optional Chaining (`?.`):** Truy cập an toàn vào thuộc tính của Object lồng nhau. Nếu gặp `null` hoặc `undefined`, nó dừng lại và trả về `undefined` thay vì ném lỗi sập web.
* **Nullish Coalescing (`??`):** Toán tử gán giá trị mặc định, chỉ kích hoạt khi vế trái là `null` hoặc `undefined`.

### 2. Ý nghĩa & Mục đích:
* Loại bỏ các đoạn code kiểm tra rườm rà: `if (user && user.address && user.address.street)`.
* Tránh bẫy của toán tử `||` (toán tử `||` coi số `0`, chuỗi rỗng `""` và `false` là sai nên ghi đè mất dữ liệu hợp lệ của người dùng).

### 3. Code minh họa & Giải thích chi tiết:
```javascript
const response = {
    data: {
        user: {
            name: "Thịnh",
            settings: {
                volume: 0 // Âm lượng chỉnh về 0
            }
        }
    }
};

// 1. Dùng Optional Chaining an toàn:
console.log(response.data?.user?.address?.city); // undefined (KHÔNG HỀ SẬP APP!)

// 2. Sự khác biệt giữa || và ??:
// Dùng || (BỊ LỖI): Coi số 0 là Falsy -> Ghi đè sai giá trị!
const vol1 = response.data.user.settings.volume || 50; 
console.log(vol1); // 50 (SAI! Người dùng muốn số 0 cơ mà)

// Dùng ?? (CHUẨN XÁC): Chỉ bắt null / undefined -> Giữ nguyên số 0:
const vol2 = response.data.user.settings.volume ?? 50; 
console.log(vol2); // 0 (ĐÚNG TUYỆT ĐỐI!)
```

---

## ⭐ PHẦN ĐẶC BIỆT: CLOSURE TRONG JAVASCRIPT & REACT

### 1. Khái niệm & Bản chất:
* **Closure** là tính chất tự nhiên của JavaScript, trong đó: **Một hàm con có khả năng ghi nhớ và truy cập vào các biến thuộc phạm vi của hàm cha (Lexical Scope), ngay cả khi hàm cha đã chạy xong và biến mất khỏi Call Stack!**

### 2. Ý nghĩa & Mục đích:
* **Bảo mật dữ liệu (Data Privacy):** Tạo ra các biến Private chỉ có hàm nội bộ mới đọc/sửa được, bên ngoài không thể thò tay vào sửa trộm.
* **Ghi nhớ trạng thái (Stateful Function):** Giúp hàm nhớ được giá trị tích lũy qua các lần gọi mà không cần phải dùng biến toàn cục (Global variable).
* **Nền tảng của React Hooks:** Giúp React lưu giữ trạng thái của Component qua các lần re-render.

### 3. Code minh họa & Cơ chế ghi nhớ:
```javascript
function createBankAccount(ownerName) {
    let balance = 0; // Biến bí mật nằm trong hàm cha

    return {
        deposit(amount) {
            balance += amount;
            console.log(`${ownerName} nạp ${amount}đ. Số dư hiện tại: ${balance}đ`);
        },
        getBalance() {
            return balance;
        }
    };
}

// Hàm cha createBankAccount chạy xong và kết thúc!
const myAccount = createBankAccount("Thịnh");

// Hàm con vẫn nhớ và tích lũy biến balance:
myAccount.deposit(100000); // "Thịnh nạp 100000đ. Số dư: 100000đ"
myAccount.deposit(50000);  // "Thịnh nạp 50000đ. Số dư: 150000đ" (Nhớ số 100.000 cũ để cộng dồn!)

// Bên ngoài không thể gán: myAccount.balance = 9999999 (bảo mật tuyệt đối!)
```

### 4. Cầu nối sang React (`useState`):
```javascript
// Trong React:
function Counter() {
    const [count, setCount] = useState(0);

    function handleClick() {
        // handleClick là Closure ghi nhớ biến count của hàm Counter!
        setCount(count + 1); 
    }

    return <button onClick={handleClick}>{count}</button>;
}
```
* **Bản chất:** Mỗi khi bấm nút, hàm `handleClick` vẫn "nhìn ngược về" vùng nhớ Closure mà React đã cất giữ để bốc đúng giá trị `count` cũ ra cộng tiếp!
