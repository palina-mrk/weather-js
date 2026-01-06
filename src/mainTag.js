import { MapSection } from './mapSection.js';
import { SearchSection } from './searchSection.js'
import { WeatherInfo } from './weatherInfo.js';
import { WeatherSection } from './weatherSection.js';

export class MainTag {
  constructor()  {
    this.element = document.createElement('main');
    this.element.classList.add("container");
    this.element.innerHTML = `<div class="page-explanation">
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

    this.element.querySelector('.search-section').replaceWith((new SearchSection).getElement());
    const weatherObject = new WeatherInfo;  
    
    weatherObject.updateWeather('Grodno').then(() => {
      this.element.querySelector('.weather-section').replaceWith((new WeatherSection).init(weatherObject.getInfo()).getElement());  

      const mapEl = new MapSection;
      this.element.querySelector('.map-section').replaceWith(mapEl.getElement());  
      mapEl.updateMap(weatherObject.getGeo());
    })
  }

  getElement () { return this.element; }
}