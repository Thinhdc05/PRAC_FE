const searchInput = document.querySelector("#search-input");
const statusBox = document.querySelector("#status-box");
const moviesGrid = document.querySelector("#movies-grid");
const modalOverlay = document.querySelector("#modal-overlay");
const modalTitle = document.querySelector("#modal-title");
const modalRating = document.querySelector("#modal-rating");
const modalGenre = document.querySelector("#modal-genre");
const modalActors = document.querySelector("#modal-actors");
const modalPlot = document.querySelector("#modal-plot");
const modalPoster = document.querySelector("#modal-poster");
const modalClose = document.querySelector("#btn-close");

const API_KEY = "trilogy";   
const API_URL = "https://www.omdbapi.com/?s=";
let debounceTimer = null;

function handleSearchInput(e) {
    clearTimeout(debounceTimer);
    const query = e.target.value.trim();
    if (!query) {
        moviesGrid.innerHTML = '';
        statusBox.textContent = "Vui lòng nhập tên phim để tìm kiếm";
        return;
    }
    
    statusBox.textContent = `Đang tìm kiếm "${query}"...`;
    
    debounceTimer = setTimeout(() => {
        fetchMovies(query);
    }, 300); 
}

searchInput.addEventListener("input", handleSearchInput);

async function fetchMovies(query) {
    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(query)}`);
        const data = await response.json();
        if (data.Response === "True") {
            displayMovies(data.Search);
        } else {
            statusBox.textContent = data.Error;
            moviesGrid.innerHTML = '';
        }
    } catch (error) {
        console.log(error);
        statusBox.textContent = "Đã có lỗi xảy ra khi kết nối API";
    }
}

function displayMovies(data) {
    moviesGrid.innerHTML = '';
    statusBox.textContent = `Tìm thấy ${data.length} bộ phim phù hợp:`;
    
    data.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.className = "movie-card";
        movieCard.dataset.id = movie.imdbID; // Lưu ID vào dataset để Event Delegation đọc
        
        const poster = movie.Poster !== "N/A" 
            ? movie.Poster 
            : "https://via.placeholder.com/300x450?text=No+Poster";

        movieCard.innerHTML = `
            <img src="${poster}" alt="${movie.Title}" class="movie-poster">
            <div class="movie-info">
                <h3 class="movie-title">${movie.Title}</h3>
                <p class="movie-meta">⭐ ${movie.Year}</p>
            </div>
        `;
        moviesGrid.appendChild(movieCard);
    });
}

// 1. Bắt sự kiện click mở Modal bằng Event Delegation trên moviesGrid
moviesGrid.addEventListener("click", (e) => {
    const card = e.target.closest(".movie-card");
    if (card) {
        const movieId = card.dataset.id;
        getMovieDetails(movieId);
    }
});

async function getMovieDetails(id) {
    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`);
        const data = await response.json();
        if (data.Response === "True") {
            displayMovieDetails(data);
        }
    } catch (error) {
        console.error("Lỗi khi tải chi tiết phim:", error);
    }
}

function displayMovieDetails(data) {
    modalOverlay.style.display = "flex";
    modalTitle.textContent = data.Title;
    modalRating.textContent = `⭐ ${data.imdbRating} IMDb`;
    modalGenre.textContent = `Thể loại: ${data.Genre}`;
    modalActors.textContent = `Diễn viên: ${data.Actors}`;
    modalPlot.textContent = data.Plot;
    modalPoster.src = data.Poster !== "N/A" ? data.Poster : "https://via.placeholder.com/300x450?text=No+Poster";
}

// 2. Các sự kiện ĐÓNG Modal:
// Bấm nút ✕
modalClose.addEventListener("click", () => {
    modalOverlay.style.display = "none";
});

// Bấm click ra ngoài vùng nền mờ
modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
        modalOverlay.style.display = "none";
    }
});

// Bấm phím Escape trên bàn phím
window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalOverlay.style.display === "flex") {
        modalOverlay.style.display = "none";
    }
});


