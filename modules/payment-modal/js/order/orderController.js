export class OrderController {
    constructor(view) {
    this.view = view;
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
    });

    this.view.DOMElements.productRemoveButtons.forEach(removeButton => {
      removeButton.addEventListener('click', () => {
        window.app.observer.callEvent('clickOnRemoveProduct', removeButton);
      })
    });
  }

  bindSubscribers() {
    window.app.observer.subscribeEvent('clickOnRemoveProduct', button => {
      this.view.removeProduct(button);
      this.view.getProductPrices();
      this.view.setTotalSum();
      this.view.clearOrderPage();
    });
  }
}