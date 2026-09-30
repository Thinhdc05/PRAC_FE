const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const searchBtn = document.querySelector("#search-btn");
const statusBox = document.querySelector("#status-box");
const profileCard = document.querySelector("#profile-card");
const avatar = document.querySelector("#avatar");
const nameTag = document.querySelector("#name");
const usernameTag = document.querySelector("#username");
const joinedTag = document.querySelector("#joined");
const bioTag = document.querySelector("#bio");
const reposTag = document.querySelector("#repos");
const followersTag = document.querySelector("#followers");
const followingTag = document.querySelector("#following");
const visitBtn = document.querySelector("#visit-btn");
const recentTagsContainer = document.querySelector("#recent-tags");
let recentSearches = JSON.parse(localStorage.getItem("recentSearches")) || [];
let currentController = null;

function renderRecentSearches() {
    recentTagsContainer.innerHTML =
        recentSearches.map(user => `
    <button class="recent-tag" onclick="handleRecentClick('${user}')">${user}</button>
    `).join(" ");
}
function saveRecent(username) {
    recentSearches = recentSearches.filter(u => u.toLowerCase() !== username.toLowerCase());
    recentSearches.unshift(username);
    recentSearches = recentSearches.slice(0, 5);
    localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
    renderRecentSearches();
}
renderRecentSearches();
function showLoading() {
    profileCard.style.display = "none"
    statusBox.style.display = "block"
    statusBox.className = "status-message loading"
    statusBox.textContent = "Đang tải thông tin..."
    searchBtn.disabled = true;
    searchBtn.textContent = "Đang tìm...";
}
function showError(message) {
    profileCard.style.display = "none"
    statusBox.style.display = "block"
    statusBox.className = "status-message error"
    statusBox.textContent = message
    searchBtn.disabled = false;
    searchBtn.textContent = "Tìm Kiếm";
}
async function fetchUser(username) {
    if (currentController) {
        currentController.abort();
    }
    currentController = new AbortController()
    showLoading();
    try {
        const response = await fetch(
            `https://api.github.com/users/${username}`,
            { signal: currentController.signal }
        );
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("Không tìm thấy tài khoản này")
            } else {
                throw new Error(`Lỗi ${response.status}: ${response.statusText}`)
            }
        }
        const data = await response.json();
        statusBox.style.display = "none"
        searchBtn.disabled = false;
        searchBtn.textContent = "Tìm Kiếm"
        currentController = null
        displayProfile(data);
        saveRecent(username);

    }
    catch (error) {
        if (error.name === "AbortError") {
            console.log("Đã hủy yêu cầu")
            return;
        }
        showError(error.message)
    }
    finally {
        searchBtn.disabled = false;
        searchBtn.textContent = "Tìm Kiếm"
        currentController = null
    }
}
function displayProfile(data){
    profileCard.style.display = "flex"
    avatar.src = data.avatar_url
    avatar.alt = data.login
    nameTag.textContent = data.name || data.login
    usernameTag.textContent = data.login
    joinedTag.textContent = formatDate(data.created_at)
    bioTag.textContent = data.bio || "Không có mô tả"
    reposTag.textContent = data.public_repos
    followersTag.textContent = data.followers
    followingTag.textContent = data.following
    visitBtn.href = data.html_url
    visitBtn.textContent = "Truy cập"
}
function formatDate(dateString){
    const date = new Date(dateString)
    return date.toLocaleDateString('vi-VN')
}
searchForm.addEventListener("submit", e => {
    e.preventDefault();
    const username = searchInput.value.trim();
    if (username) {
        fetchUser(username);
    }
})
function handleRecentClick(username){
    searchInput.value = username
    fetchUser(username)
}