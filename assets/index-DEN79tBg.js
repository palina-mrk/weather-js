(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const i of t)if(i.type==="childList")for(const n of i.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function a(t){const i={};return t.integrity&&(i.integrity=t.integrity),t.referrerPolicy&&(i.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?i.credentials="include":t.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(t){if(t.ep)return;t.ep=!0;const i=a(t);fetch(t.href,i)}})();function l(){const r=document.createElement("header");return r.innerHTML=`<footer>
        <div class="container">
          <p>Weather Forecast App &copy; ${new Date().getFullYear()}</p>
          <p>Weather data provided by OpenWeatherMap</p>
        </div>
      </footer>`,r}function o(){const r=document.createElement("header");return r.innerHTML=`<div class="container header-container">
          <h1>
            <i class="fas fa-cloud-sun"></i>
            Прогноз погоды
          </h1>
          <nav class="nav-menu">
            <input type="checkbox" id="menu-toggle" class="menu-toggle" />
            <label for="menu-toggle" class="menu-toggle-label">
              <span class="hamburger-icon"></span>
            </label>
            <ul class="menu-items">
              <li><a href="#">Домой</a></li>

              <li>
                <a href="#" class="active">Пример с данными</a>
              </li>
              <li><a href="#">Чистое состояние</a></li>
            </ul>
          </nav>
        </div>`,r}class d{constructor(){this.element=document.createElement("section"),this.element.innerHTML=`<div class="card">
            <h2>Показать погоду в городе:</h2>
            <form id="cityForm">
              <div class="input-wrapper">
                <input
                  type="text"
                  id="cityInput"
                  placeholder="Введите название города"
                  aria-label="Название города"
                  value="Минск"
                />
                <button
                  type="button"
                  id="clearButton"
                  class="clear-button"
                  aria-label="Clear input"
                >
                  <i class="fas fa-times-circle"></i>
                </button>
              </div>
              <button type="submit" id="searchButton" class="btn-primary">
                Искать
              </button>
            </form>
          </div>`,this.element.classList.add("searh-section"),this.inputEl=this.element.querySelector("#cityInput"),this.searchBtn=this.element.querySelector("#searchButton"),this.formEl=this.element.querySelector("#cityForm"),this.clearBtn=this.element.querySelector("#clearButton"),this.clearBtn.addEventListener("click",()=>this.inputEl.value="")}getElement(){return this.element}}class h{constructor(){this.meta={},this.info=null,this.meta.id="63b151efb40928e868a13e6198b120c9",this.meta.lang="ru",this.meta.city=null,this.meta.defineUrl=(e,a,s)=>`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${e}&units=metric&lang=${a}&appid=${s}`,this.meta.url=null}setCity(e){e!=this.meta.city&&(this.meta.city=typeof e=="string"&&e.length?e.toLowerCase():null,this.meta.url=this.meta.city?this.meta.defineUrl(this.meta.city,this.meta.lang,this.meta.id):null)}setWeather(){return this.info=null,this.meta.url&&fetch(this.meta.url).then(e=>e&&e.ok&&e.json()).then(e=>{this.info={},this.info.description=Array.isArray(e.weather)&&e.weather.length&&e.weather[0].description,this.info.icon=Array.isArray(e.weather)&&e.weather.length&&e.weather[0].icon,this.info.iconSrc=this.info.icon&&this.info.description&&`https://openweathermap.org/img/wn/${this.info.icon}@2x.png`,this.info.temperature=e.main&&e.main.temp,this.info.windSpeed=e.wind&&e.wind.speed,this.info.humidity=e.main&&e.main.humidity,this.info.pressure=e.main&&e.main.pressure,this.info.lastUpdated=e.dt&&Date(e.dt).split(" ").slice(0,5).join(" "),this.info.city=e.name||this.meta.cityName,this.info.currentDateTime=Date().split(" ").slice(0,4).join(" "),this.geo={lon:e.coord&&e.coord.lon,lat:e.coord&&e.coord.lat}})}updateWeather(e){return this.setCity(e),this.setWeather()}getInfo(){return this.info}getGeo(){return this.geo}}class p{constructor(){this.element=document.createElement("section"),this.element.innerHTML=`<div class="card">
                <div id="weatherData">
                  <div class="weather-header">
                    <div>
                      <h2 id="cityName"></h2>
                      <p id="currentDateTime"></p>
                    </div>
                    <div class="last-updated">
                      <i class="fas fa-history"></i>
                      <span id="lastUpdated"></span>
                    </div>
                  </div>

                  <div class="weather-content">
                    <div class="current-weather">
                      <div class="weather-primary">
                        <div class="weather-icon">
                        </div>
                        <div>
                          <div class="temperature"></div>
                          <div class="weather-description"></div>
                        </div>
                      </div>

                      <div class="weather-details">
                        <div class="weather-detail">
                          <i class="fas fa-wind"></i>
                          <div>
                            <p>Ветер</p>
                            <p id="windDetail"></p>
                          </div>
                        </div>
                        <div class="weather-detail">
                          <i class="fas fa-tint"></i>
                          <div>
                            <p>Влажность</p>
                            <p id="humidityDetail"></p>
                          </div>
                        </div>
                        <div class="weather-detail">
                          <i class="fas fa-compress-alt"></i>
                          <div>
                            <p>Давление</p>
                            <p id="pressureDetail"></p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>`,this.element.classList="weather-section"}init(e){this.element.querySelector("#cityName").append(e.city),this.element.querySelector("#currentDateTime").append(e.currentDateTime);const a=document.createElement("img");return a.setAttribute("src",e.iconSrc),a.setAttribute("alt",e.description),this.element.querySelector(".weather-icon").append(a),this.element.querySelector(".temperature").innerHTML=e.temperature+"&deg;С",this.element.querySelector(".weather-description").append(e.description),this.element.querySelector("#windDetail").append(e.pressure),this.element.querySelector("#humidityDetail").append(e.pressure),this.element.querySelector("#pressureDetail").append(e.pressure),this.element.querySelector("#lastUpdated").innerHTML="Updated "+e.lastUpdated,this}getElement(){return this.element}}class u{constructor(){this.element=document.createElement("main"),this.element.classList.add("container"),this.element.innerHTML=`<div class="page-explanation">
            <p>
              Это состояние приложения "Прогноз погоды" с активными данными о
              погоде и историей поиска.
            </p>
          </div>

          <!-- Search Form -->
          <section class="search-section">
          </section>

          <!-- Desktop layout container for main content and sidebar -->
          <div class="desktop-container">
            <!-- Main content - Weather and Map -->
            <div class="main-content">
              <!-- Weather Display -->
              <section class="weather-section">
              </section>

              <!-- Map Display -->
              <section class="map-section">
              </section>
            </div>

            <!-- Sidebar - Search History -->
            <div class="sidebar">
              <!-- Search History -->
              <section class="history-section">
              </section>
            </div>
          </div>`,this.element.querySelector(".search-section").replaceWith(new d().getElement());const e=new h;e.updateWeather("Grodno").then(()=>{this.element.querySelector(".weather-section").replaceWith(new p().init(e.getInfo()).getElement())})}getElement(){return this.element}}const c=document.getElementById("app");c.append(o());c.append(new u().getElement());c.append(l());
