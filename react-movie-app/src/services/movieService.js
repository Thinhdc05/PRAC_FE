// ============================================================================
// TẦNG SERVICES (hoặc API): Chuyên trách giao tiếp mạng (HTTP Requests)
// Đặc điểm sống còn:
// 1. Tuyệt đối KHÔNG chứa useState, useEffect hay bất kỳ React Hook nào.
// 2. Chỉ nhận tham số vào, gọi fetch/axios, và trả về dữ liệu (Promise).
// ============================================================================

/*
// TEMPLATE MẪU 1: Gọi API tìm kiếm phim từ KKPhim
export async function searchMoviesApi(keyword, page = 1, signal) {
  const url = `https://phimapi.com/v1/api/tim-kiem?keyword=${encodeURIComponent(keyword)}&limit=6&page=${page}`;
  const response = await fetch(url, { signal });
  
  if (!response.ok) {
    throw new Error('Lỗi kết nối máy chủ!');
  }
  
  return response.json();
}

// TEMPLATE MẪU 2: Gọi API lấy chi tiết một bộ phim theo slug
export async function getMovieDetailApi(slug) {
  const response = await fetch(`https://phimapi.com/v1/api/phim/${slug}`);
  return response.json();
}
*/
