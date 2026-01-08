const MAX_LENGTH = 5;

export function create() {
  const htmlCode = `<div class="card">
                <div class="section-header">
                  <h2>
                    <i class="fas fa-history"></i>
                    История поиска
                  </h2>
                </div>

                <div class="history-container">
                  <div class="history-list">
                  </div>
                  <div class="history-actions">
                    <button class="btn-secondary">
                      <i class="fas fa-trash-alt"></i>
                      Очистить историю
                    </button>
                  </div>
                </div>
              </div>`;
  const element = document.createElement('section');
  element.innerHTML = htmlCode;
  element.classList.add('history-section');

  const clearButton = element.querySelector('.btn-secondary');
  const listEl = element.querySelector('.history-list');
  clearButton.addEventListener('click', () => listEl.innerHTML = "");
  return element;
}

export function getValue(itemEl) {
  return itemEl.querySelector(".item-city").innerHTML;
}

export function createItem(weatherInfo) {
  const htmlCode = `<div class="history-item-city">
                        <div class="city-icon">
                          <i class="fas fa-map-marker-alt"></i>
                        </div>
                        <div class="city-info">
                          <h3 class="item-city"></h3>
                          <p class="item-time"></p>
                        </div>
                      </div>
                      <div class="history-item-weather">
                        <p class="item-temperature"></p>
                        <p class="item-description"></p>
                      </div>`;
  const element = document.createElement('div');
  element.innerHTML = htmlCode;
  element.classList.add('history-item');

  element.querySelector(".item-city").innerHTML = weatherInfo.city;
  element.querySelector(".item-time").innerHTML = weatherInfo.lastUpdated;
  element.querySelector(".item-temperature").innerHTML = weatherInfo.temperature;
  element.querySelector(".item-description").innerHTML = weatherInfo.description;

  return element;
}

export function setEmptyList(historySection, cityNames) {
  const listEl = historySection.querySelector('.history-list');
  listEl.innerHTML = "";
  const itemEls = cityNames.map(city => {
      const htmlCode = `<div class="history-item-city">
                            <div class="city-icon">
                              <i class="fas fa-map-marker-alt"></i>
                            </div>
                            <div class="city-info">
                              <h3 class="item-city"></h3>
                              <p class="item-time"></p>
                            </div>
                          </div>
                          <div class="history-item-weather">
                            <p class="item-temperature"></p>
                            <p class="item-description"></p>
                          </div>`;
      const itemEl = document.createElement('div');
      itemEl.innerHTML = htmlCode;
      itemEl.classList.add('history-item');
      itemEl.querySelector(".item-city").innerHTML = city;
      
      return itemEl;
    });
  itemEls.forEach((itemEl, index) => {
    listEl.append(itemEl);
    (index >= MAX_LENGTH) && (itemEl.classList.add('history-item--invisible'));
  })
  return itemEls;
}

export function saveToArray (historySection) {
  return Array.from(historySection.querySelectorAll('.item-city')).map(el => el.innerHTML);
}

export function removeIfExists(weatherInfo, historySection) {
  const itemEls = historySection.querySelectorAll('.history-item');
  const listEl = historySection.querySelector('.history-list');

  const cityItem = Array.from(itemEls).find(el => {
    return el.querySelector('.item-city').innerHTML.toLowerCase() === weatherInfo.city.toLowerCase();
  });

  cityItem && (itemEls.length > MAX_LENGTH) && (itemEls[MAX_LENGTH].classList.remove('history-item--invisible')); 
  cityItem && listEl.removeChild(cityItem);
}

export function addFirstItem(weatherInfo, historySection) {
  const itemEls = historySection.querySelectorAll('.history-item');
  const listEl = historySection.querySelector('.history-list');

  (itemEls.length >= MAX_LENGTH) && (itemEls[MAX_LENGTH - 1].classList.add('history-item--invisible'));
  const newItem = createItem(weatherInfo); 
  listEl.prepend(newItem);
  return newItem;
}

export function setInfo(weatherInfo, itemEl) {
  itemEl.querySelector(".item-city").innerHTML = weatherInfo.city;
  itemEl.querySelector(".item-time").innerHTML = weatherInfo.lastUpdated;
  itemEl.querySelector(".item-temperature").innerHTML = weatherInfo.temperature;
  itemEl.querySelector(".item-description").innerHTML = weatherInfo.description;
}