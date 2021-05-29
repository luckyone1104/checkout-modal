import {Observer} from '../observer.js'

export class OrderController {
  constructor(mainView, model, view, utils) {
    this.mainView = mainView;
    this.model = model;
    this.view = view;
    this.utils = utils;
    this.observers = {
      clickOnPagingButton  : new Observer(),
      clickOnRemoveProduct : new Observer(),
    };
  }

  init() {
    this.initView();
    this.bindSubscribers();
    this.bindEvents();
  }

  initView() {
    this.view.isReady() || this.view.init();
  }

  bindEvents() {
    this.view.DOMElements.nextButton.addEventListener('click', () => {
      this.observers.clickOnPagingButton.callEvent('shipping');
    });

    this.view.DOMElements.productRemoveButtons.forEach(removeButton => {
      removeButton.addEventListener('click', () => {
        this.observers.clickOnRemoveProduct.callEvent(removeButton);
      })
    });
  }

  bindSubscribers() {
    this.observers.clickOnPagingButton.subscribeEvent(this.utils.removePage.bind(this.utils));
    this.observers.clickOnPagingButton.subscribeEvent(this.utils.renderPage.bind(this.utils));

    this.observers.clickOnRemoveProduct.subscribeEvent(this.view.removeProduct.bind(this.view));
    this.observers.clickOnRemoveProduct.subscribeEvent(this.view.getProductPrices.bind(this.view));
    this.observers.clickOnRemoveProduct.subscribeEvent(this.view.setTotalSum.bind(this.view));
    this.observers.clickOnRemoveProduct.subscribeEvent(this.view.clearOrderPage.bind(this.view));
  }
}