import * as map from './mapSection.js';
import * as search from './searchSection.js'
import * as info from './weatherInfo.js';
import * as weather from './weatherSection.js';

export function create()  {
    const htmlCode = `<div class="page-explanation">
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
          </div>`;
    
    const mainEl = document.createElement('main');
    mainEl.classList.add("container");
    mainEl.innerHTML = `<div class="page-explanation">
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
          </div>`
    
    const searchSection = search.create();
    const weatherSection = weather.create();
    const mapSection = map.create();
    
    mainEl.querySelector('.search-section').replaceWith(searchSection);
    mainEl.querySelector('.weather-section').replaceWith(weatherSection);  
    mainEl.querySelector('.map-section').replaceWith(mapSection);  
      
    const weatherInfo = info.create();
    info.update(weatherInfo, 'Grodno').then(() => {
      weather.update(weatherSection, weatherInfo.info);
      map.update(mapSection, weatherInfo.geo);
    })
    
    searchSection.querySelector('form').addEventListener('submit', function (event) {
      event.preventDefault();
      const mainEl = searchParent(this.parentElement, 'main');

      const inputEl = event.currentTarget.querySelector('input');
      const weatherEl = mainEl.querySelector('.weather-section');
      const mapEl = mainEl.querySelector('.map-section');
      const value = inputEl.value;
      
      const weatherInfo = info.create();
      info.update(weatherInfo, value).then(res => {
        weather.update(weatherEl, weatherInfo.info);
        map.update(mapEl, weatherInfo.geo);
        inputEl.value = "";
      },
      err => inputEl.value = err);
      //info.updateWeather(weatherInfo, 'Minsk');
    })
    return mainEl;
  }

  function clearInput(inputEl) {
    inputEl.querySelector('input').value = "";
  }

  function searchParent(element, selector) {
    while(!element.matches(selector))
      element = element.parentElement;
    return element;
  }
/*
  update(cityName) {
    this.weatherInfo = new WeatherInfo;
    this.weatherInfo.updateWeather(cityName).then(() => {
      this.weatherSection.updateInfo(this.weatherInfo.getInfo());
      this.mapSection.updateInfo(this.weatherInfo.getGeo());
    })
  }*/
