# CSS INTERVIEW CHEATSHEET

### 1. DISPLAY & BOX MODEL
**display:**
+ none: ẩn hoàn toàn, không chiếm diện tích
+ block: chiếm trọn 1 dòng, nhận width/height/margin/padding
+ inline: nằm cùng dòng, không nhận width/height/margin trên-dưới
+ inline-block: nằm cùng dòng nhưng nhận đủ width/height/margin/padding
+ flex: bố cục linh hoạt 1 chiều (1D)
+ grid: bố cục lưới 2 chiều (2D - hàng và cột)

**box-sizing:**
+ content-box: width/height chỉ tính vùng nội dung (mặc định)
+ border-box: width/height bao gồm cả padding và border

**overflow:**
+ visible: tràn ra ngoài khung (mặc định)
+ hidden: cắt bỏ phần nội dung bị tràn
+ scroll: luôn luôn hiện thanh cuộn
+ auto: chỉ hiện thanh cuộn khi nội dung bị tràn

**overscroll-behavior:**
+ auto: cuộn hết con thì cuộn tiếp trang cha (mặc định)
+ contain: khóa cuộn bên trong, không cuộn lây ra trang ngoài
+ none: khóa cuộn và tắt hiệu ứng nảy trên mobile

---

### 2. POSITION
**position:**
+ static: vị trí mặc định theo dòng chảy HTML (không nhận top/left/right/bottom/z-index)
+ relative: định vị tương đối so với vị trí gốc ban đầu của chính nó (làm mốc cho con absolute)
+ absolute: định vị theo phần tử cha gần nhất có `position != static` (rời khỏi dòng chảy)
+ fixed: định vị cố định theo khung nhìn màn hình (viewport), cuộn trang không trôi
+ sticky: lai giữa relative và fixed (cuộn đến ngưỡng quy định sẽ bám dính lại)

**z-index:**
+ auto: ngang hàng với cha
+ <số nguyên>: thứ tự lớp đè lên nhau (số lớn hơn nằm trên)

---

### 3. FLEXBOX (CONTAINER - THẺ CHA)
**flex-direction:**
+ row: trục chính nằm ngang, từ trái sang phải (mặc định)
+ row-reverse: trục chính nằm ngang, từ phải sang trái
+ column: trục chính nằm dọc, từ trên xuống dưới
+ column-reverse: trục chính nằm dọc, từ dưới lên trên

**flex-wrap:**
+ nowrap: co cụm trên 1 dòng, không cho rớt dòng (mặc định)
+ wrap: tự động rớt dòng khi hết chỗ
+ wrap-reverse: rớt dòng theo chiều ngược lại

**justify-content:** (căn cả cụm theo Trục Chính)
+ flex-start: dồn về đầu trục
+ flex-end: dồn về cuối trục
+ center: căn giữa trục
+ space-between: dạt đều 2 đầu biên, khoảng cách ở giữa bằng nhau
+ space-around: khoảng cách 2 bên item bằng nhau (khoảng cách biên = 1/2 giữa)
+ space-evenly: tất cả khoảng trống chia đều tuyệt đối

**align-items:** (căn từng item theo Trục Phụ)
+ stretch: kéo dãn item vừa khít chiều cao/rộng của hàng (mặc định)
+ flex-start: dồn về đầu trục phụ
+ flex-end: dồn về cuối trục phụ
+ center: căn giữa theo trục phụ
+ baseline: căn theo đường chân dòng chữ

**align-content:** (căn các hàng với nhau khi có `flex-wrap: wrap` và thừa chiều cao)
+ stretch, flex-start, flex-end, center, space-between, space-around, space-evenly

---

### 4. FLEXBOX (ITEMS - THẺ CON)
**flex-grow:**
+ 0: không dãn nở khi thừa chỗ (mặc định)
+ <số dương>: tỷ lệ hút phần không gian trống để nở to ra

**flex-shrink:**
+ 1: tự động co nhỏ lại khi thiếu chỗ (mặc định)
+ 0: không bao giờ co lại, giữ nguyên kích thước

**flex-basis:**
+ auto: lấy kích thước theo width/height hoặc nội dung
+ <độ dài>: kích thước gốc ban đầu của item trước khi dãn/co

**align-self:** (ghi đè align-items của cha cho riêng 1 item)
+ auto, flex-start, flex-end, center, baseline, stretch

---

### 5. CSS GRID (CONTAINER - THẺ CHA)
**grid-template-columns / grid-template-rows:**
+ repeat(3, 1fr): chia 3 cột bằng nhau
+ auto: tự động vừa nội dung
+ minmax(100px, 1fr): tối thiểu 100px, tối đa nở 1fr

**gap / row-gap / column-gap:**
+ <độ dài>: khoảng cách rãnh giữa các ô

**justify-items:** (căn ngang nội dung trong từng ô)
+ stretch (mặc định), start, end, center

**align-items:** (căn dọc nội dung trong từng ô)
+ stretch (mặc định), start, end, center

**justify-content:** (căn toàn bộ khung lưới theo chiều ngang khi khung thừa chỗ)
+ start, end, center, space-between, space-around, space-evenly

**align-content:** (căn toàn bộ khung lưới theo chiều dọc khi khung thừa chỗ)
+ start, end, center, space-between, space-around, space-evenly

---

### 6. CSS GRID (ITEMS - THẺ CON)
**grid-column / grid-row:**
+ span 2: trải dài qua 2 ô
+ 1 / 3: bắt đầu từ vạch kẻ 1 đến vạch kẻ 3

**justify-self:** (tự căn ngang cho 1 item trong ô)
+ stretch, start, end, center

**align-self:** (tự căn dọc cho 1 item trong ô)
+ stretch, start, end, center

---

### 7. VISIBILITY & OPACITY
**visibility:**
+ visible: hiển thị bình thường
+ hidden: ẩn đi nhưng VẪN CHIẾM CHỖ trong layout
+ collapse: dùng cho bảng (table), ẩn hàng/cột mà không làm biến dạng cấu trúc

**opacity:**
+ 0 đến 1: độ trong suốt (0: vô hình hoàn toàn, 1: rõ nét, con bị ảnh hưởng theo cha)

**pointer-events:**
+ auto: nhận click/hover bình thường
+ none: xuyên thấu, không nhận bất kỳ click/hover nào từ chuột

---

### 8. TRANSFORM, TRANSITION & ANIMATION
**transform:**
+ translate(x, y): dịch chuyển tọa độ hiển thị
+ scale(x, y): phóng to / thu nhỏ
+ rotate(deg): xoay góc theo độ
+ skew(x, y): bẻ nghiêng phối cảnh

**transition-timing-function:**
+ ease: chậm đầu, nhanh giữa, chậm đuôi (mặc định)
+ linear: vận tốc đều từ đầu đến cuối
+ ease-in: bắt đầu chậm rồi tăng tốc
+ ease-out: bắt đầu nhanh rồi hãm phanh chậm dần
+ ease-in-out: chậm cả đầu lẫn đuôi

**animation-fill-mode:**
+ none: kết thúc animation trả ngay về style gốc (mặc định)
+ forwards: giữ nguyên trạng thái ở frame cuối cùng (100%) sau khi chạy xong
+ backwards: áp dụng ngay style ở frame đầu tiên (0%) trong thời gian chờ delay
+ both: áp dụng cả forwards và backwards

**animation-iteration-count:**
+ <số>: số lần chạy
+ infinite: lặp vô hạn

**animation-direction:**
+ normal: chạy xuôi 0% -> 100%
+ reverse: chạy ngược 100% -> 0%
+ alternate: chạy xuôi rồi chạy ngược lại như con lắc

---

### 9. TYPOGRAPHY & TEXT
**white-space:**
+ normal: tự bẻ dòng khi hết chỗ (mặc định)
+ nowrap: cấm xuống dòng, viết liền 1 hàng
+ pre: giữ nguyên mọi dấu cách và ký tự xuống dòng Enter

**text-overflow:**
+ clip: cắt cụt chữ thừa (mặc định)
+ ellipsis: cắt chữ thừa và thay bằng dấu 3 chấm `...`

**word-break:**
+ normal: ngắt từ theo quy tắc ngữ pháp ngôn ngữ
+ break-all: cắt đôi từ bất kỳ tại mép viền để xuống dòng
+ keep-all: không ngắt từ ở tiếng Trung/Nhật/Hàn

---

### 10. BACKGROUND & OBJECT
**background-size:**
+ auto: giữ nguyên kích thước ảnh gốc
+ cover: phủ kín toàn bộ khung (chấp nhận bị cắt xén bớt góc ảnh)
+ contain: co giãn sao cho vừa khít toàn bộ ảnh trong khung (không bị cắt xén)

**object-fit:** (dành cho thẻ `<img>` và `<video>`)
+ fill: kéo dãn méo ảnh cho vừa khung (mặc định)
+ cover: phủ kín khung, giữ đúng tỷ lệ không méo, cắt viền thừa
+ contain: giữ đúng tỷ lệ, hiện trọn vẹn ảnh, để lộ khoảng trống thừa
+ none: giữ kích thước gốc của ảnh
