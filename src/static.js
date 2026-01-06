export function createFooter() {
  const footerEl = document.createElement('header');
  footerEl.innerHTML = `<footer>
        <div class="container">
          <p>Weather Forecast App &copy; ${(new Date()).getFullYear()}</p>
          <p>Weather data provided by OpenWeatherMap</p>
        </div>
      </footer>`;
    return footerEl;
}

export function createHeader() {
  const headerEl = document.createElement('header');
  headerEl.innerHTML = `<div class="container header-container">
          <h1>
            <i class="fas fa-cloud-sun"></i>
            Прогноз погоды
          </h1>
          <nav class="nav-menu">
            <input type="checkbox" id="menu-toggle" class="menu-toggle" />
            <label for="menu-toggle" class="menu-toggle-label">
              <span class="hamburger-icon"></span>
            </label>
            <ul class="menu-items">
              <li><a href="#">Домой</a></li>

              <li>
                <a href="#" class="active">Пример с данными</a>
              </li>
              <li><a href="#">Чистое состояние</a></li>
            </ul>
          </nav>
        </div>`;
    return headerEl;
}
