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
    if(!ymaps3) {
      console.log('error');
      return;
    }
    
    ymaps3.ready.then( () => {

    const { YMap, YMapDefaultSchemeLayer } = ymaps3;

    if (this.element.querySelector("#map").firstElementChild)
      this.element.querySelector("#map").firstElementChild.remove();

    const map = new YMap(this.element.querySelector("#map"), {
      location: {
        center: [geoInfo.lon, geoInfo.lat],
        zoom: 10,
      },
    });

    map.addChild(new YMapDefaultSchemeLayer()); })
  }

  getElement() {return this.element; }
}