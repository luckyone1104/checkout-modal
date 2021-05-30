import {Router} from './router.js'
import {Observer} from './observer.js'

import {Model} from './model.js'
import {View} from './view.js'
import {Controller} from './controller.js'

window.onload = (function() {
  const router = new Router();
  const observer = new Observer();

  const model = new Model();
  const view = new View();
  const controller = new Controller(model, view, router);

  window.app = window.app || {};
  window.app.observer = observer;

  controller.init();
})()