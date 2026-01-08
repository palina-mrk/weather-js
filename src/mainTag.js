import * as map from './mapSection.js';
import * as search from './searchSection.js'
import * as info from './weatherInfo.js';
import * as weather from './weatherSection.js';
import { getCity } from './userInfo.js';
import * as history from './historySection.js';

window.addEventListener('beforeunload', (event) => {
  const historyArray = history.saveToArray(document.querySelector('.history-section'));
  const currentCity = weather.getCity(document.querySelector('.weather-section'));
  if(!historyArray.map(city => city.toLowerCase()).includes(currentCity.toLowerCase()))
    historyArray.unshift(currentCity);
  localStorage.setItem('weather-history', JSON.stringify(historyArray));
})

window.addEventListener('load', (event) => {
  const cityNames = JSON.parse(localStorage.getItem('weather-history') || '[]').filter(name => name.length);
  const historySection = document.querySelector('.history-section');
  const itemEls = history.setEmptyList(historySection, cityNames);
  //const itemEls = Array.from(historySection.querySelectorAll('.history-item'));

  itemEls.forEach(item => {
    const cityName = history.getValue(item);
    item.addEventListener('click', function(event) {
        const mainEl = searchParent(this.parentElement, 'main');
        const itemEl = event.currentTarget;
        setHistoryCity(mainEl, itemEl);
      });

    const weatherInfo = info.create();
    info.shortUpdate(weatherInfo, cityName).then(res => {
      history.setInfo(weatherInfo.info, item);
    });
  })
})

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
    const historySection = history.create();
    
    mainEl.querySelector('.search-section').replaceWith(searchSection);
    mainEl.querySelector('.weather-section').replaceWith(weatherSection);  
    mainEl.querySelector('.map-section').replaceWith(mapSection); 
    mainEl.querySelector('.history-section').replaceWith(historySection);  
      
    const weatherInfo = info.create();

    getCity().then((res) => {
        const currentCity = res && res.length ? res : 'moscow';
        info.update(weatherInfo, currentCity).then(() => {
          weather.update(weatherSection, weatherInfo.info);
          map.update(mapSection, weatherInfo.geo);

          history.removeIfExists(weatherInfo.info, historySection);
        })
      });

    searchSection.querySelector('form').addEventListener('submit', function (event) {
      event.preventDefault();
      const mainEl = searchParent(this.parentElement, 'main');
      const inputEl = event.currentTarget.querySelector('input');
      setInputCity(mainEl, inputEl);
/*
      const weatherEl = mainEl.querySelector('.weather-section');
      const mapEl = mainEl.querySelector('.map-section');
      const historyEl = mainEl.querySelector('.history-section');
      const value = inputEl.value;
      
      const weatherInfo = info.create();
      const oldInfo = weather.getShortInfo(weatherEl);
      info.update(weatherInfo, value).then(res => {
        weather.update(weatherEl, weatherInfo.info);
        map.update(mapEl, weatherInfo.geo);

        // если запрос не совпадает с предыдущим, нужно поменять историю
        if(oldInfo.city.toLowerCase() !== weatherInfo.info.city.toLowerCase()) {
          // если новый запрос уже есть в истории - удаляем
          history.removeIfExists(weatherInfo.info, historyEl);
          // предыдущий запрос удаляем, если был, + добавляем вперед
          history.removeIfExists(oldInfo, historyEl);
          history.addFirstItem(oldInfo, historyEl);
        }
        inputEl.value = "";
      },
      err => inputEl.value = err);*/
    });

    return mainEl;
  }

  function setInputCity(mainEl, inputEl) {

      const weatherEl = mainEl.querySelector('.weather-section');
      const mapEl = mainEl.querySelector('.map-section');
      const historyEl = mainEl.querySelector('.history-section');
      const value = inputEl.value;
      
      const weatherInfo = info.create();
      const oldInfo = weather.getShortInfo(weatherEl);
      info.update(weatherInfo, value).then(res => {
        weather.update(weatherEl, weatherInfo.info);
        map.update(mapEl, weatherInfo.geo);
        inputEl.value = "";

        if(oldInfo.city.toLowerCase() === weatherInfo.info.city.toLowerCase()) return;
        
        // если запрос не совпадает с предыдущим, нужно поменять историю
        // если новый запрос уже есть в истории - удаляем
        history.removeIfExists(weatherInfo.info, historyEl);
        // предыдущий запрос удаляем, если был, + добавляем вперед
        history.removeIfExists(oldInfo, historyEl);
        const historyItem = history.addFirstItem(oldInfo, historyEl);
        historyItem.addEventListener('click', function(event) {
          const mainEl = searchParent(this.parentElement, 'main');
          const itemEl = event.currentTarget;
          setHistoryCity(mainEl, itemEl);
        });
      },
      err => inputEl.value = err);
  }

  function setHistoryCity(mainEl, itemEl) {
      const weatherEl = mainEl.querySelector('.weather-section');
      const mapEl = mainEl.querySelector('.map-section');
      const historyEl = mainEl.querySelector('.history-section');
      const value = history.getValue(itemEl);
      
      const weatherInfo = info.create();
      const oldInfo = weather.getShortInfo(weatherEl);
      info.update(weatherInfo, value).then(res => {
        weather.update(weatherEl, weatherInfo.info);
        map.update(mapEl, weatherInfo.geo);

        // удаляем выполненный запрос из истории
        history.removeIfExists(weatherInfo.info, historyEl);
        // а предыдущий добавляем вперед   
        const historyItem = history.addFirstItem(oldInfo, historyEl);
        historyItem.addEventListener('click', function(event) {
          const mainEl = searchParent(this.parentElement, 'main');
          const itemEl = event.currentTarget;
          setHistoryCity(mainEl, itemEl);
        });
      });
  }

  function searchParent(element, selector) {
    while(!element.matches(selector))
      element = element.parentElement;
    return element;
  }
