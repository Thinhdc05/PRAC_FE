# ⚡ BẢNG TRA CỨU NHANH REGEX (REGULAR EXPRESSION)

> Sổ tay tra cứu biểu thức chính quy dùng cho thuộc tính `pattern="..."` trong HTML Form và JavaScript.

---

## 🔤 1. CÁC KÝ HIỆU CỐT LÕI

| Ký hiệu | Ý nghĩa | Ví dụ & Giải thích |
| :---: | :--- | :--- |
| **`[]`** | **Tập hợp ký tự** (Chọn đúng 1 ký tự trong ngoặc) | `[0-9]` (1 chữ số từ 0 đến 9)<br>`[a-z]` (1 chữ cái thường)<br>`[A-Z]` (1 chữ cái hoa)<br>`[a-zA-Z]` (1 chữ cái bất kỳ) |
| **`{}`** | **Số lần lặp lại** của ký tự đứng trước | `[0-9]{10}` (Đúng 10 chữ số)<br>`[a-z]{6,12}` (Từ 6 đến 12 ký tự)<br>`[0-9]{8,}` (Tối thiểu 8 số, tối đa tùy ý) |
| **`()`** | **Gom nhóm (Group)** | `(09|03|08)` (Bắt buộc là 1 trong 3 đầu số này) |
| **`\|`** | **Phép HOẶC (OR)** | `nam|nu` (Chỉ chấp nhận chữ "nam" hoặc "nu") |
| **`+`** | Lặp từ **1 lần trở lên** (tương đương `{1,}`) | `[0-9]+` (Ít nhất 1 chữ số, bao nhiêu số cũng được) |
| **`*`** | Lặp từ **0 lần trở lên** (tương đương `{0,}`) | `[0-9]*` (Có thể không có hoặc có nhiều số) |
| **`?`** | Tùy chọn: **Có hoặc Không** (0 hoặc 1 lần) | `https?` (Khớp cả `http` và `https`) |
| **`^`** | Bắt đầu chuỗi | `^0` (Bắt buộc ký tự đầu tiên phải là số `0`) |
| **`$`** | Kết thúc chuỗi | `[0-9]$` (Bắt buộc ký tự cuối cùng phải là số) |
| **`\d`** | Viết tắt của `[0-9]` (Chữ số) | `\d{10}` (10 chữ số) |
| **`\w`** | Chữ cái, chữ số hoặc dấu gạch dưới `_` | `\w+` (Tên biến hoặc username hợp lệ) |

---

## 🛠️ 2. MẪU REGEX THỰC TẾ HAY DÙNG TRONG FORM

### 1. Số điện thoại Việt Nam (10 số, bắt đầu bằng số 0):
```html
<input type="tel" pattern="0[0-9]{9}" title="Vui lòng nhập đúng 10 số bắt đầu bằng số 0" required />
```

### 2. Số điện thoại chuẩn đầu số nhà mạng (03, 05, 07, 08, 09):
```html
<input type="tel" pattern="(03|05|07|08|09)[0-9]{8}" title="Đầu số điện thoại không hợp lệ" />
```

### 3. Căn cước công dân (Đúng 12 chữ số):
```html
<input type="text" pattern="[0-9]{12}" title="CCCD phải có đúng 12 chữ số" />
```

### 4. Tên chỉ chứa chữ cái và khoảng trắng (Không chứa số):
```html
<input type="text" pattern="[a-zA-ZÀ-ỹ\s]+" title="Họ tên chỉ được chứa chữ cái" />
```

### 5. Mã sinh viên / Mã nhân viên (2 chữ cái hoa + 6 số, vd: `FE123456`):
```html
<input type="text" pattern="[A-Z]{2}[0-9]{6}" title="Mã phải có dạng 2 chữ in hoa và 6 số (VD: FE123456)" />
```
