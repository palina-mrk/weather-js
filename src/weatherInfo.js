export function create() {
  const weatherObject = {};
  weatherObject.info = null,
  weatherObject.meta = {
    id: "63b151efb40928e868a13e6198b120c9",
    lang: "ru",
    city: null,
    defineUrl: (city, lang, id) => { return `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&units=metric&lang=${lang}&appid=${id}`; },
    url: null,
  }
  return weatherObject;
}

export function update(weatherObject, cityName) {
  return new Promise(function (resolve, reject) {
    //if(cityName == weatherObject.meta.city) resolve (weatherObject);

    weatherObject.meta.city = (typeof(cityName) == 'string' && cityName.length) ? cityName.toLowerCase() : null,
    weatherObject.meta.url = weatherObject.meta.city ? weatherObject.meta.defineUrl(weatherObject.meta.city, weatherObject.meta.lang, weatherObject.meta.id) : null;

    weatherObject.info = null;

    if(!weatherObject.meta.url) reject ('Некорректное название города');
    
    //console.log(weatherObject.meta.url.substr(60));
    fetch(weatherObject.meta.url)
      .then(res => res && res.ok && res.json())
      .then(json => {
        if(!json) {
          reject('Некорректное название города');
          return null;
        }
        weatherObject.info = {}; 
        weatherObject.info.description = 
            Array.isArray(json.weather) && json.weather.length && json.weather[0].description;
        weatherObject.info.icon =
            Array.isArray(json.weather) && json.weather.length && json.weather[0].icon;
        weatherObject.info.iconSrc =
            weatherObject.info.icon && weatherObject.info.description && `https://openweathermap.org/img/wn/${weatherObject.info.icon}@2x.png`;
        weatherObject.info.temperature = json.main && (json.main.temp  + '&deg;С');
        weatherObject.info.windSpeed = json.wind && (json.wind.speed + ' м/с');
        weatherObject.info.humidity = json.main && (json.main.humidity + '%');
        weatherObject.info.pressure = json.main && (json.main.pressure + 'гПа');
        weatherObject.info.lastUpdated = json.dt && 
            Date(json.dt).split(' ').slice(0, 5).join(' ');
        weatherObject.info.city = json.name || weatherObject.meta.cityName;
          
        weatherObject.info.currentDateTime = 'Updated ' + Date().split(' ').slice(0, 4).join(' ');

        weatherObject.geo = {
          lon: json.coord && json.coord.lon,
          lat: json.coord && json.coord.lat
        }
        resolve (weatherObject);
      });
  })
}


export function shortUpdate(weatherObject, cityName) {
  return new Promise(function (resolve, reject) {
    //if(cityName == weatherObject.meta.city) resolve (weatherObject);

    weatherObject.meta.city = (typeof(cityName) == 'string' && cityName.length) ? cityName.toLowerCase() : null,
    weatherObject.meta.url = weatherObject.meta.city ? weatherObject.meta.defineUrl(weatherObject.meta.city, weatherObject.meta.lang, weatherObject.meta.id) : null;

    weatherObject.info = null;

    if(!weatherObject.meta.url) reject ('Некорректное название города');
    
    //console.log(weatherObject.meta.url.substr(60));
    fetch(weatherObject.meta.url)
      .then(res => res && res.ok && res.json())
      .then(json => {
        if(!json) {
          reject('Некорректное название города');
          return null;
        }
        weatherObject.info = {}; 
        weatherObject.info.description = 
            Array.isArray(json.weather) && json.weather.length && json.weather[0].description;
        weatherObject.info.temperature = json.main && (json.main.temp  + '&deg;С');
        weatherObject.info.lastUpdated = json.dt && 
            Date(json.dt).split(' ').slice(0, 5).join(' ');
        weatherObject.info.city = json.name || weatherObject.meta.cityName;
        resolve (weatherObject);
      });
  })
}

export function getCity(info) {return element.querySelector("#cityName").innerHTML;}