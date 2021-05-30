import {View} from '../view.js'

export class OrderView extends View {
  constructor() {
    super();
  }

  isReady() {
    return this.ready;
  }

  init() {
    this.getDOMElements();
    this.buildView();

    this.ready = true;
  }

  getDOMElements() {
    this.DOMElements.nextButton = document.querySelector('.next-page-button');
    this.DOMElements.productsPrices = this.getProductPrices();
    this.DOMElements.totalSum = document.querySelector('.order-page__total-sum');
    this.DOMElements.nextPageButton = document.querySelector('.next-page-button');
    this.DOMElements.productRemoveButtons = document.querySelectorAll('.order-page__remove-button');
    this.DOMElements.selectBox = document.querySelector('.shipping-details__select-country');
  }

  getProductPrices() {
    let productPrices = document.querySelectorAll('.order-page__price');
    this.DOMElements.productsPrices =  productPrices;

    return productPrices;
  }

  buildView() {
    this.setTotalSum();
  }

  removeProduct(button) {
    let product = button.parentNode.parentNode;
    product.remove();
  }

  setTotalSum() {
    this.DOMElements.totalSum.innerHTML = '$' + this.getTotalSum();
  }

  getTotalSum(){
    let total = 0;

    for(let price of this.DOMElements.productsPrices) {
      total += +price.innerHTML.split('$')[1];
    }

    return total;
  }

  clearOrderPage() {
    if (this.DOMElements.productsPrices.length === 0) {
      this.DOMElements.totalSum.parentNode.parentNode.nextElementSibling.remove();
      this.DOMElements.totalSum.parentNode.parentNode.remove();
    }
  }
}