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
  const htmlCode = `<div class="history-item">
                      <div class="history-item-city">
                        <div class="city-icon">
                          <i class="fas fa-map-marker-alt"></i>
                        </div>
                        <div class="city-info">
                          <h3 class="item-city">London, GB</h3>
                          <p class="item-time">Apr 29, 09:30 AM</p>
                        </div>
                      </div>
                      <div class="history-item-weather">
                        <p class="item-temperature">15°C</p>
                        <p class="item-description">Broken Clouds</p>
                      </div>
                    </div>`;
  const element = document.createElement('div');
  element.innerHTML = htmlCode;
  element.classList.add('history-item');

  element.querySelector(".item-city").innerHTML = weatherInfo.city;
  element.querySelector(".item-time").innerHTML = weatherInfo.currentDateTime;
  element.querySelector(".item-temperature").innerHTML = weatherInfo.temperature;
  element.querySelector(".item-description").innerHTML = weatherInfo.description;

  return element;
}

export function itemsCount(historySection) {return historySection.querySelectorAll('.history-item').length;}

export function getCityList(historySection) {
  return historySection.querySelector('.item-city').map(el => el.innerHTML);
}

export function removeIfExists(weatherInfo, historySection) {
  const itemEls = historySection.querySelectorAll('.history-item');
  const listEl = historySection.querySelector('.history-list');

  const cityItem = Array.from(itemEls).find(el => {
    return el.querySelector('.item-city').innerHTML.toLowerCase() === weatherInfo.city.toLowerCase();
  });

  cityItem && listEl.removeChild(cityItem);
  cityItem && (itemEls.length > MAX_LENGTH) && (itemEls[MAX_LENGTH].style.display = 'block'); 
}

export function addFirstItem(weatherInfo, historySection) {
  const itemEls = historySection.querySelectorAll('.history-item');
  const listEl = historySection.querySelector('.history-list');

  (itemEls.length > MAX_LENGTH) && (itemEls[MAX_LENGTH].style.display = 'none');
  const newItem = createItem(weatherInfo); 
  listEl.prepend(newItem);
  return newItem;
}
