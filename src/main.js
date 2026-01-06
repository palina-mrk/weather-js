//import './style.css'
import * as staticElements from './static.js'
import { MainTag } from './mainTag.js';

const rootEl = document.getElementById('app');
rootEl.append(staticElements.createHeader());
rootEl.append((new MainTag).getElement());
rootEl.append(staticElements.createFooter());
