export function getCity() {
  const url = 'https://get.geojs.io/v1/ip/geo.json';
  
  return new Promise(function (resolve, reject) {
    fetch(url)
      .then(
          res => res && (res.ok ? res.json() : reject ('Ошибка получения данных о городе пользователя')), 
          err => reject ('Невозможно выполнить запрос по сети'))
      .then(
        json => resolve (json.city ? json.city : json.country), 
        err => reject('Ошибка преобразования данных о городе в json'));
  })
}