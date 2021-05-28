import {Model} from './model.js'
import {View} from './view.js'
import {Controller} from './controller.js'

import {Observer} from './observer.js';

(function() {

  const model = new Model();
  const view = new View();

  const observers = {
    clickOnPagingButton  : new Observer(),
    failValidation       : new Observer(),
    clickOnRemoveProduct : new Observer(),
    focusOnInput         : new Observer(),
    blurOfInput          : new Observer(),
    changeOfSelectBox    : new Observer(),
  };

  const controller = new Controller(model, view, observers);

  controller.init();
})();