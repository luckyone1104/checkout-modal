import {Observer} from './observer.js'

export class Controller {

  constructor(model, view, router) {
    this.model = model;
    this.view = view;
    this.router = router;
    this.observers = {
      switchPage : new Observer()
    };
  }

  init() {
    this.initModel();
    this.initView();
    this.bindEvents();
    this.bindSubscribers();

    this.router.init(this.model, this.view);
  }

  initModel() {
    this.model.isReady() || this.model.init();
  }

  initView() {
    this.view.isReady() || this.view.init();
  }

  bindEvents() {
    window.addEventListener('hashchange', () => {
      if (this.view.checkIfPageIsVisible()) {
        this.observers.switchPage.callEvent(this.view.getCurrentPage());
      }
    });

    this.view.DOMElements.menu.addEventListener('click', event => {
      if (this.view.isDisabled(event.target)) {
        event.preventDefault();
        return null;
      }
      this.model.saveInputsData(this.view.getCurrentPage(), this.view.getInputsValues());
    })
  }


  bindSubscribers() {
    this.observers.switchPage.subscribeEvent(this.router.updateRoute.bind(this.router));
    this.observers.switchPage.subscribeEvent(this.view.removeMenuElementSelectedStyle.bind(this.view));
    this.observers.switchPage.subscribeEvent(this.view.addMenuElementSelectedStyle.bind(this.view));
    this.observers.switchPage.subscribeEvent(this.view.moveMenuSelectedLine.bind(this.view));
    this.observers.switchPage.subscribeEvent(this.view.unlockDisabledButton.bind(this.view));
    this.observers.switchPage.subscribeEvent(this.view.removeMenu.bind(this.view));

  }

  getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }
}