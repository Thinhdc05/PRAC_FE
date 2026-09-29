import { CONFIG } from "./config.js"


async function request(endpoint) {
    try {
        const response = await fetch(`${CONFIG.BASE_URL}${endpoint}`);
        if (!response.ok) {
            throw new Error(`Lỗi HTTP ${response.status}: Không thể gọi ${endpoint}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`[API Error] tại ${endpoint}:`, error);
        throw error;
    }
}

export const MovieAPI = {
    async getNewMovies(page = 1) {
       return request(`/v1/api/danh-sach?page=${page}`)
    },
    async searchMovies(key, limit = 12) {
        const cleanKey = encodeURIComponent(key.trim());
        return request(`/v1/api/tim-kiem?keyword=${cleanKey}&limit=${limit}`);
    },
    async getMovieDetail(slug) {
       return request(`/phim/${slug}`);
    }
}