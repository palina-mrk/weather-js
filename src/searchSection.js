export class SearchSection {
  constructor() {
  this.element = document.createElement('section');
  this.element.innerHTML = `<div class="card">
            <h2>Показать погоду в городе:</h2>
            <form id="cityForm">
              <div class="input-wrapper">
                <input
                  type="text"
                  id="cityInput"
                  placeholder="Введите название города"
                  aria-label="Название города"
                  value="Минск"
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
    this.element.classList.add('searh-section');

    this.inputEl = this.element.querySelector('#cityInput');
    this.searchBtn = this.element.querySelector('#searchButton');
    this.formEl = this.element.querySelector('#cityForm');
    this.clearBtn = this.element.querySelector('#clearButton');

    this.clearBtn.addEventListener('click', () => this.inputEl.value = "");
  }
  getElement() {return this.element;}
}