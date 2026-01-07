//import './style.css'
import * as staticElements from './static.js'
import * as mainTag from './mainTag.js';

const rootEl = document.getElementById('app');
rootEl.append(staticElements.createHeader());
rootEl.append(mainTag.create());
rootEl.append(staticElements.createFooter());

