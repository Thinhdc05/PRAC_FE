import { CONFIG } from "./config.js"

export const MovieAPI = {
    async getNewMovies(page = 1) {
        try {
            const response = await fetch(`${CONFIG.BASE_URL}/v1/api/danh-sach?page=${page}`);
            if (!response.ok) {
                throw new Error(`Loi API: ${response.status}-khong the tai danh sach phim`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Loi khi lay danh sach phim moi:", error);
            throw error;
        }
    },
    async searchMovies(key, limit = 12) {
        try {
            const cleanKey = encodeURIComponent(key.trim());
            const response = await fetch(`${CONFIG.BASE_URL}/v1/api/tim-kiem?keyword=${cleanKey}&limit=${limit}`);
            if (!response.ok) {
                throw new Error(`Loi API: ${response.status}-khong the tim kiem phim`)
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Loi khi tim kiem phim:", error);
            throw error;
        }
    },
    async getMovieDetail(slug) {
        try {
            const response = await fetch(`${CONFIG.BASE_URL}/phim/${slug}`);
            if (!response.ok) {
                throw new Error(`Loi API: ${response.status}-khong the lay chi tiet phim`)
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Loi khi chuyen chi tiet phim:", error);
            throw error;
        }
    }
}