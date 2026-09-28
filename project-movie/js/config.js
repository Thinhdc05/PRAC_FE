export const CONFIG ={
    BASE_URL: 'https://phimapi.com',
    IMAGE_CDN: 'https://phimimg.com',
    STORAGE_KEYS:{
        HISTORY:"movie_watch_history",
        FAVORITES:"movie_favorites"
    }
}
export function getFullImageUrl(imagePath){
    if(!imagePath) return 'https://via.placeholder.com/300x450?text=No+Image';
    return imagePath.startsWith('https') ? imagePath : `${CONFIG.IMAGE_CDN}/${imagePath}`;

}