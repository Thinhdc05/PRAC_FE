const searchInput = document.getElementById("city-input");
const btnSearch = document.getElementById("btn-search");
const btnGps = document.getElementById("btn-gps");
const statusBox = document.getElementById("status-box");
const weatherCard = document.getElementById("weather-card");
const cityTitle = document.getElementById("city-title");
const weatherIcon = document.getElementById("weather-icon");
const tempVal = document.getElementById("temp-val");
const tempUnit = document.getElementById("temp-unit");
const btnUnit = document.getElementById("btn-unit");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const forecastBox = document.getElementById("forecast-box");
const forecastList = document.getElementById("forecast-list");

async function searchWeather() {
    const city = searchInput.value.trim();
    if(!city) return;
    statusBox.textContent = "Đang tìm...";
    weatherCard.style.display = "none";
    forecastBox.style.display = "none";
    try{
        const geoUrl=`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=vi&format=json`;
        const resGeo=await fetch(geoUrl);
        const geoData=await resGeo.json();
        if(!geoData.results||geoData.results.length===0){
            statusBox.textContent=`Không tìm thấy ${city}`;
            return;
        }
        const lat=geoData.results[0].latitude;
        const lon=geoData.results[0].longitude;
        const name=geoData.results[0].name;
        const weatherUrl=`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;
        const resWeather=await fetch(weatherUrl);
        const weatherData=await resWeather.json();
        renderWeather(weatherData,name);
    } catch(error){
        statusBox.textContent="Lỗi kết nối API";
        console.error(error);
    }
}
btnSearch.addEventListener("click",searchWeather);

function renderWeather(data,name){
    const current=data.current;
    const daily=data.daily;
    const tempC = current.temperature_2m;
  const humid = current.relative_humidity_2m;
  const windSp = current.wind_speed_10m;
  const wCode = current.weather_code;
  const icon = getWeatherIcon(wCode);
   statusBox.textContent = "";
    weatherCard.style.display = "flex";
    cityTitle.textContent = name;
    tempVal.textContent = Math.round(tempC);
    humidity.textContent = `${humid}%`;
    wind.textContent = `${windSp} km/h`;
    weatherIcon.textContent = icon;
}
    function getWeatherIcon(code) {
    if (code === 0) return "☀️";               // Nắng trong xanh
    if (code >= 1 && code <= 3) return "⛅";     // Mây rải rác
    if (code >= 45 && code <= 48) return "🌫️";   // Sương mù
    if (code >= 51 && code <= 67) return "🌧️";   // Mưa phùn / Mưa rào
    if (code >= 71 && code <= 77) return "❄️";   // Tuyết rơi
    if (code >= 80 && code <= 82) return "🌦️";   // Mưa rải rác
    if (code >= 95) return "⛈️";               // Giông bão
    return "🌤️";                              // Mặc định
}

 
