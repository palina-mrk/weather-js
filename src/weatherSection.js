export class WeatherSection {
  constructor() {
    this.element = document.createElement('section');
    this.element.innerHTML = `<div class="card">
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
    this.element.classList = 'weather-section';
  }
  
  init(weatherInfo) {
    this.element.querySelector("#cityName").append(weatherInfo.city);
    this.element.querySelector("#currentDateTime").append(weatherInfo.currentDateTime);

    const iconEl = document.createElement('img');
    iconEl.setAttribute('src', weatherInfo.iconSrc);
    iconEl.setAttribute('alt', weatherInfo.description);
    this.element.querySelector('.weather-icon').append(iconEl);
    this.element.querySelector(".temperature").innerHTML = (weatherInfo.temperature + '&deg;С');
    this.element.querySelector(".weather-description").append(weatherInfo.description);

    this.element.querySelector("#windDetail").append(weatherInfo.pressure);
    this.element.querySelector("#humidityDetail").append(weatherInfo.pressure);
    this.element.querySelector("#pressureDetail").append(weatherInfo.pressure);

    this.element.querySelector("#lastUpdated").innerHTML = ('Updated ' + weatherInfo.lastUpdated);

    return this;
  }

  getElement() {return this.element;}
}