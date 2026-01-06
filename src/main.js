//import './style.css'
import * as staticElements from './static.js'
import { MainTag } from './mainTag.js';

const rootEl = document.getElementById('app');
rootEl.append(staticElements.createHeader());
rootEl.append((new MainTag).getElement());
rootEl.append(staticElements.createFooter());

function getMap() {
  const srcEl = document.createElement('srcipt');
  srcEl.setAttribute('src', 'https://api-maps.yandex.ru/v3/?apikey=6f130378-8e07-4626-a413-392271cdb214&lang=ru_RU');
  srcEl.setAttribute('defer', true);
  document.querySelector('head').append(srcEl);
  srcEl.onload(() => console.log('loaded!'));
};
getMap();
/*
async function changeMap(lon, lat) {
  if(!ymaps3) {
    console.log('error');
    return;
  }
  await ymaps3.ready;

  const { YMap, YMapDefaultSchemeLayer } = ymaps3;

  if (document.getElementById("map").firstElementChild)
    document.getElementById("map").firstElementChild.remove();

  const map = new YMap(document.getElementById("map"), {
    location: {
      center: [lon, lat],
      zoom: 10,
    },
  });

  map.addChild(new YMapDefaultSchemeLayer());
}

changeMap(23,23);*/