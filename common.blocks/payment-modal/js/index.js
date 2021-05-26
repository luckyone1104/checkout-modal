import {Model} from './model.js'
import {View} from './view.js'
import {Controller} from './controller.js'
import {Utils} from './utils.js';
import {Observer} from './observer.js';

(function() {
  const citiesUrl = 'https://api.visicom.ua/data-api/4.0/en/search/adm_settlement.json?&c=ua&key=eb75e86ee245c07d002a84b413e84dc';
  
  const utils = new Utils();

  const model = new Model(citiesUrl, utils);
  const view = new View();
  

  const observers = {
    pagingButtons     : new Observer(),
    switchingPages    : new Observer(),
    invalidForm       : new Observer(),
    removingProduct   : new Observer(),
    inputFocus        : new Observer(),
    inputBlur         : new Observer(),
    selectBoxChange   : new Observer(),
    inputNumberFilter : new Observer(),
    inputLetterFilter : new Observer(),
  };

  const controller = new Controller(model, view, utils, observers);

  controller.init();
})();