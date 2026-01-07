export function create() {
  const htmlCode = `<div class="card">
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
  const element = document.createElement('section');
  element.innerHTML = htmlCode;
  element.classList.add('map-section');
  return element;
}

export function update(parent, geoInfo) {
  ymaps3 && ymaps3.ready.then(() => {
    const { YMap, YMapDefaultSchemeLayer } = ymaps3;
    parent.querySelector("#map").innerHTML = '';
    const mapEl = new YMap(parent.querySelector("#map"), {
      location: {
        center: [geoInfo.lon, geoInfo.lat],
        zoom: 10,
      },
    });
    mapEl.addChild(new YMapDefaultSchemeLayer()); 
  })
}