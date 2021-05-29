import {Router} from './router.js'

import {Model} from './model.js'
import {View} from './view.js'
import {Controller} from './controller.js'

window.onload = (function() {
  const router = new Router();

  const model = new Model();
  const view = new View();
  const controller = new Controller(model, view, router);

  controller.init();
})()