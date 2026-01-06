export class WeatherInfo {
  constructor() {
    this.meta = {},  
    this.info = null,
    this.meta.id = "63b151efb40928e868a13e6198b120c9",
    this.meta.lang = "ru",
    this.meta.city = null,
    this.meta.defineUrl = (city, lang, id) => { return `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&units=metric&lang=${lang}&appid=${id}`; },
    this.meta.url = null;
  }

  setCity(cityName) {
    if(cityName == this.meta.city) return;

    this.meta.city = (typeof(cityName) == 'string' && cityName.length) ? cityName.toLowerCase() : null,
    this.meta.url = this.meta.city ? this.meta.defineUrl(this.meta.city, this.meta.lang, this.meta.id) : null;
  }
  
  setWeather() {
    this.info = null;

    return this.meta.url && fetch(this.meta.url)
    .then((res) => res && res.ok && res.json())
    .then((json) => {
      this.info = {}; 
      this.info.description = 
          Array.isArray(json.weather) && json.weather.length && json.weather[0].description;
      this.info.icon =
          Array.isArray(json.weather) && json.weather.length && json.weather[0].icon;
      this.info.iconSrc =
          this.info.icon && this.info.description && `https://openweathermap.org/img/wn/${this.info.icon}@2x.png`;
      this.info.temperature = json.main && json.main.temp;
      this.info.windSpeed = json.wind && json.wind.speed;
      this.info.humidity = json.main && json.main.humidity;
      this.info.pressure = json.main && json.main.pressure;
      this.info.lastUpdated = json.dt && 
          Date(json.dt).split(' ').slice(0, 5).join(' ');
      this.info.city = json.name || this.meta.cityName;
        
      this.info.currentDateTime = Date().split(' ').slice(0, 4).join(' ');

      this.geo = {
        lon: json.coord && json.coord.lon,
        lat: json.coord && json.coord.lat
      }
    });
  }

  updateWeather(cityName) {
    this.setCity(cityName);
    return this.setWeather();
  }

  getInfo() {
    return this.info;
  }

  getGeo() {
    return this.geo;
  }
}