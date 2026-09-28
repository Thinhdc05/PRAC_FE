import { MovieAPI } from "./api.js";
import { getFullImageUrl } from "./config.js";
const movieGrid = document.querySelector("#new-movies-grid");
const searchInput = document.querySelector("#search-input");

function renderMovieGrid(movies) {
    if (!movieGrid) return;
    if (!movies || movies.length === 0) {
        movieGrid.innerHTML = `
        <p color:var(--text-muted)>Không tìm thấy phim nào`;
        return;
    }
    movieGrid.innerHTML = movies.map(movie => {
        const rating = movie.tmdb?.vote_average ? movie.tmdb.vote_average.toFixed(1) : "N/A"
        const quality = movie.quality || "HD";
        const episode = movie.episode_current || "Full";
        const poster = getFullImageUrl(movie.poster_url);
        return `
        <a href="detail.html?slug=${movie.slug}" class="movie-card">
           <div class="card-thumb">
                <img src="${poster}" alt="${movie.name}" loading="lazy">
                <span class="badge badge-quality">${quality}</span>
                <span class="badge badge-episode">${episode}</span>
            </div>
            <div class="card-info">
                <h3 class="movie-title" title="${movie.name}">${movie.name}</h3>
                <div class="movie-meta">
                    <span class="movie-year">${movie.year}</span>
                    <span class="movie-rate">⭐ ${rating}</span>
                </div>
            </div>
        </a>
        `;
    }).join("");
}
async function initHome() {
    console.log("đang tải danh sách phim");
    const res = await MovieAPI.getNewMovies(1);
    if (res && res.data && res.data.items) {
        renderMovieGrid(res.data.items);
    }
}
initHome();
let searchTimeout = null;
if (searchInput) {
    searchInput.addEventListener("input", (e) => {
        clearTimeout(searchTimeout);
        const keyword = e.target.value.trim();
        searchTimeout = setTimeout(async () => {
            if (keyword === "") {
                initHome();
                return;
            }
            const res = await MovieAPI.searchMovies(keyword);
            if (res && res.data && res.data.items) {
                renderMovieGrid(res.data.items);
            }
        }, 400);

    })
}

/* 
================================================================================
💡 BẢN NÂNG CẤP THAM KHẢO: TÌM KIẾM KẾT HỢP DEBOUNCE + ABORTCONTROLLER (SENIOR LEVEL)
(Được comment toàn bộ để bạn tiện đọc đối chiếu với đoạn code đang chạy ở trên)
================================================================================

let searchAbortController = null;

function setupSearchWithAbort() {
    if (!searchInput) return;

    searchInput.addEventListener("input", (e) => {
        // 1. Vẫn dùng Debounce để hoãn khi người dùng đang gõ liên tục
        clearTimeout(searchTimeout);
        const keyword = e.target.value.trim();

        searchTimeout = setTimeout(async () => {
            // Khi xóa trắng: hủy request cũ đang bay dở và tải lại trang chủ
            if (keyword === "") {
                if (searchAbortController) searchAbortController.abort();
                initHome();
                return;
            }

            // 2. KÍCH HOẠT ABORTCONTROLLER (Chống Race Condition):
            // Nếu có request tìm kiếm cũ VẪN ĐANG BAY TRÊN MẠNG chưa kịp về:
            // -> Giật dây hủy ngay lập tức để kết quả cũ không đè lên giao diện!
            if (searchAbortController) {
                searchAbortController.abort();
            }

            // Tạo controller mới đại diện cho request lần này
            searchAbortController = new AbortController();

            try {
                // Truyền signal vào fetch:
                const cleanKey = encodeURIComponent(keyword);
                const response = await fetch(
                    `https://phimapi.com/v1/api/tim-kiem?keyword=${cleanKey}&limit=12`,
                    { signal: searchAbortController.signal }
                );

                if (!response.ok) throw new Error("Lỗi API");
                const res = await response.json();

                if (res?.data?.items) {
                    renderMovieGrid(res.data.items);
                }
            } catch (error) {
                // Nếu lỗi do ta chủ động bấm abort() -> Bỏ qua, không phải lỗi mạng thật
                if (error.name === "AbortError") {
                    console.log("⏹️ Đã hủy request cũ thành công!");
                    return;
                }
                console.error("Lỗi tìm kiếm:", error);
            }
        }, 400);
    });
}
*/
