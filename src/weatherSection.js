
export function create() {
  const htmlCode = `<div class="card">
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
            </div>`;

  const element = document.createElement('section');
  element.innerHTML = htmlCode;
  element.classList = 'weather-section';
  return element;
}

export function update(element, weatherInfo) {
  element.querySelector("#cityName").innerHTML = weatherInfo.city;
  element.querySelector("#currentDateTime").innerHTML = weatherInfo.currentDateTime;

  const iconEl = document.createElement('img');
  iconEl.setAttribute('src', weatherInfo.iconSrc);
  iconEl.setAttribute('alt', weatherInfo.description);
  const iconDiv = document.createElement('div');
  iconDiv.classList.add('weather-icon');
  iconDiv.append(iconEl);
  element.querySelector('.weather-icon').replaceWith(iconDiv);
  
  element.querySelector(".temperature").innerHTML = weatherInfo.temperature + '&deg;С';
  element.querySelector(".weather-description").innerHTML = weatherInfo.description;

  element.querySelector("#windDetail").innerHTML = weatherInfo.windSpeed + ' м/с';
  element.querySelector("#humidityDetail").innerHTML = weatherInfo.humidity + ' %';
  element.querySelector("#pressureDetail").innerHTML = weatherInfo.pressure + ' гПа';

  element.querySelector("#lastUpdated").innerHTML = ('Updated ' + weatherInfo.lastUpdated);

  return element;
}
