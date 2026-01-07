export function create() {
  const htmlCode = `<div class="card">
          <h2>Показать погоду в городе:</h2>
          <form id="cityForm">
            <div class="input-wrapper">
              <input
                type="text"
                id="cityInput"
                placeholder="Введите название города"
                aria-label="Название города"
              />
              <button
                type="button"
                id="clearButton"
                class="clear-button"
                aria-label="Clear input"
              >
                <i class="fas fa-times-circle"></i>
              </button>
            </div>
            <button type="submit" id="searchButton" class="btn-primary">
              Искать
            </button>
          </form>
        </div>`;
  const element = document.createElement('section');
  element.innerHTML = htmlCode;
  const btnClear = element.querySelector('button[type=button]');
  const inputEl = element.querySelector('input');

  btnClear.addEventListener('click', () => inputEl.value = '');

  return element;
}