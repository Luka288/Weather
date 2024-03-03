const searchBar = document.querySelector("#search");
const showTemp = document.querySelector(".showTemp");
const showTime = document.querySelector(".showTime");
const detailedInfo = document.querySelector(".detailedInfo");
const locationName = document.querySelector(".locationName");
const countryCodeDis = document.querySelector(".countryCodeDis");
const humidity = document.querySelector(".humidity");
const countryCode = document.querySelector(".countryCode");
const feels_like = document.querySelector(".feels_like");
const windSpeed = document.querySelector(".windSpeed");
const upSection = document.querySelector(".upSection");
const videoContainer = document.querySelector(".videoContainer");
const sWrapper = document.querySelector(".sWrapper");
const clickSearch = document.querySelector(".clickSearch");
const title = document.querySelector("title");

const key = "bd5771cb0500a754c0140458e34e346d";
const apiLink = "https://api.openweathermap.org/data/2.5/weather?units=metric";

async function getWeather(city) {
  try {
    const apiReturn = await fetch(apiLink + `&q=${city}` + `&appid=${key}`);
    const data = await apiReturn.json();
    assemblyHTML(data);
    switch (data.weather[0].main) {
      case "Rain":
        videoContainer.innerHTML = `<video
        src="./assets/videos/ForestRain.mp4"
        loop=""
        autoplay=""
        muted=""
        class="resizeVideo"
      ></video>`;
        break;
      case "Mist":
        videoContainer.innerHTML = `<video
        src="./assets/videos/mist.mp4"
        loop=""
        autoplay=""
        muted=""
        class="resizeVideo"
      ></video>`;
        break;
      case "Clear":
        videoContainer.innerHTML = `<video
        src="./assets/videos/clearSky.mp4"
        loop=""
        autoplay=""
        muted=""
        class="resizeVideo"
      ></video>`;
        break;
      case "Drizzle":
        videoContainer.innerHTML = `<video
        src="./assets/videos/drizzle.mp4"
        loop=""
        autoplay=""
        muted=""
        class="resizeVideo"
      ></video>`;
        break;
      case "Clouds":
        videoContainer.innerHTML = `<video
        src="./assets/videos/clouds.mp4"
        loop=""
        autoplay=""
        muted=""
        class="resizeVideo"
      ></video>`;
        break;
      case "Snow":
        videoContainer.innerHTML = `<video
            src="./assets/videos/Snow.mp4"
            loop=""
            autoplay=""
            muted=""
            class="resizeVideo"
          ></video>`;
        break;
      default:
        clearHTML();
        break;
    }
    console.log(data);
  } catch (error) {
    if ((error = "404")) {
      alert("Error", "error", "ENTER CITY OR COUNTRY");
      clearHTML();
    } else {
      console.log(error);
    }
  }
}

function assemblyHTML(data) {
  document.querySelector(".bottomSection").style.display = "flex";
  showTemp.innerHTML += `<span>${Math.round(data.main.temp)}°C</span>`;
  detailedInfo.innerHTML += `<span>${data.weather[0].description}</span>`;
  locationName.innerHTML += `<span>${data.name}</span>`;
  countryCodeDis.innerHTML += `<span>${data.sys.country}</span>`;
  humidity.innerHTML += `<span>${data.main.humidity}</span>`;
  feels_like.innerHTML += `<img
  
  src="./assets/images/feelslikeLogo.png"
  alt=""
  class="imageResize"
  class="icon"
  />
  <span>Feels Like : ${Math.round(data.main.feels_like)}°C</span>`;
  humidity.innerHTML = `<img
  src="./assets/images/humidityLogo.png"
  alt=""
  class="imageResize"
  class="icon"
  />
  <span>Humidity : ${data.main.humidity}</span>`;

  countryCode.innerHTML = `<img
    src="./assets/images/countryLogo.webp"
    alt=""
    class="imageResize"
    class="icon"
  />
  <span>Country : ${data.sys.country}</span>`;

  windSpeed.innerHTML = `<img
  src="./assets/images/windspeedLogo.png"
  alt=""
  class="imageResize"
  class="icon"
  />
  <span>windSpeed : ${data.wind.speed}</span>`;

  title.innerHTML += ` (${data.name})`;

  if (data.sys.country === undefined) {
    countryCodeDis.innerHTML = `<span></span>`;
    countryCode.innerHTML = `<img
    src="./assets/images/countryLogo.webp"
    alt=""
    class="imageResize"
    class="icon"
  />
  <span>Country : </span>`;
  }
}

searchBar.addEventListener("search", () => {
  getWeather(search.value);
  if (search.value === ``) {
    alert("Error", "error", "ENTER CITY OR COUNTRY");
  }
  clearHTML();
});

clickSearch.addEventListener("click", () => {
  clickSearch.value = searchBar.value;
  getWeather(clickSearch.value);
  clearHTML();
  if (clickSearch.value === ``) {
    alert("Error", "error", "ENTER CITY OR COUNTRY");
  }
});

function clearHTML() {
  showTemp.innerHTML = ``;
  detailedInfo.innerHTML = ``;
  locationName.innerHTML = ``;
  countryCodeDis.innerHTML = ``;
  humidity.innerHTML = ``;
  countryCode.innerHTML = ``;
  feels_like.innerHTML = ``;
  humidity.innerHTML = ``;
  searchBar.value = ``;
  windSpeed.innerHTML = ``;
  videoContainer.innerHTML = `<video
  src="./assets/videos/main.mp4"
  loop=""
  autoplay=""
  muted=""
  class="resizeVideo"
></video>`;
  title.innerHTML = `Weather`;
  document.querySelector(".bottomSection").style.display = "none";
}

function alert(title, icon, text = "") {
  Swal.fire({ title, icon, text });
}
