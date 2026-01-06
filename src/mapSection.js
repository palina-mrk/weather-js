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

  
  updateMap(geoInfo) {
    ymaps3 && ymaps3.ready.then(() => {
      const { YMap, YMapDefaultSchemeLayer } = ymaps3;
      this.element.querySelector("#map").innerHTML = '';
      const mapEl = new YMap(this.element.querySelector("#map"), {
        location: {
          center: [geoInfo.lon, geoInfo.lat],
          zoom: 10,
        },
      });
      mapEl.addChild(new YMapDefaultSchemeLayer()); 
    })
  }

  getElement() {return this.element; }
}