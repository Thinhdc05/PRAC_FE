import { MovieAPI } from "./api.js";
import { getFullImageUrl } from "./config.js";

const posterImg = document.querySelector("#detail-poster-img");
const titleEl = document.querySelector("#detail-title");
const originNameEl = document.querySelector("#detail-origin-name");
const metaEl = document.querySelector("#detail-meta");
const genresEl = document.querySelector("#detail-genres");
const contentEl = document.querySelector("#detail-content");
const btnWatch = document.querySelector("#btn-watch");
const episodesGrid = document.querySelector("#episodes-grid");

const res=await MovieAPI.getMovieDetail(slug);

