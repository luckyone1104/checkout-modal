import {View} from '../view.js'

export class ConfirmationView extends View {
  constructor() {
    super();
  }

  init() {
    this.getDOMElements();
    this.buildView();

    this.ready = true;
  }

  getDOMElements() {
    this.DOMElements.inputs = document.querySelectorAll('.checkout-input');
    this.DOMElements.nextPageButton = document.querySelector('.next-page-button');
    this.DOMElements.previousPageButton = document.querySelector('.previous-page-button');
  }

  buildView() {
    this.buildInputValues();
  }
}