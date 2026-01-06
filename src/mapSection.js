export class MapSection {
  constructor() {
    this.element = document.createElement('section');
    this.element.innerHTML = `<div class="card">
                  <div class="section-header">
                    <h2>
                      <i class="fas fa-map-marker-alt"></i>
                      Карта местности
                    </h2>
                  </div>
                  <div id="map" class="map-container">
                    <!-- Map image (Base64 placeholder) -->
                  </div>
                </div>`;
    this.element.classList.add('map-section');
  }


  async updateMap(geoInfo) {
    await ymaps3.ready;

    const { YMap, YMapDefaultSchemeLayer } = ymaps3;

    if (this.element.getElementById("map").firstElementChild)
      this.element.getElementById("map").firstElementChild.remove();

    const map = new YMap(this.element.getElementById("map"), {
      location: {
        center: [geoInfo.lon, geoInfo.lat],
        zoom: 10,
      },
    })

    /*
    updateMap() {
      fetch('https://api-maps.yandex.ru/v3/?apikey=6f130378-8e07-4626-a413-392271cdb214&lang=ru_RU').then((res) => {

      })
    }*/

    map.addChild(new YMapDefaultSchemeLayer());
  }

  getElement() {return this.element; }
}