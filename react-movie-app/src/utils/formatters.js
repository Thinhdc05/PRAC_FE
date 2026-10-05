// ============================================================================
// TẦNG UTILS (Utilities / Helpers): Các công cụ tính toán JavaScript thuần túy
// Đặc điểm sống còn:
// 1. Là các "Pure Functions" (Hàm thuần túy: đưa vào A luôn trả về B).
// 2. Không phụ thuộc vào React, không có State, tái sử dụng được ở mọi dự án JS.
// ============================================================================

/*
// TEMPLATE MẪU 1: Định dạng tiền tệ Việt Nam (Ví dụ: 150000 -> "150.000 ₫")
export function formatVND(amount) {
  if (typeof amount !== 'number') return '0 ₫';
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}

// TEMPLATE MẪU 2: Rút gọn văn bản dài thành dấu ba chấm "..."
export function truncateText(text, maxLength = 60) {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

// TEMPLATE MẪU 3: Định dạng ngày tháng (Ví dụ: "2026-10-05" -> "05/10/2026")
export function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('vi-VN');
}
*/
