import {HTML} from './HTML.js';

export class Utils {
  constructor() {
    this.HTML = new HTML();

    this.pageWrapper = document.querySelector('.payment-modal');
  }

  renderPage(page) {
    this.pageWrapper.insertAdjacentHTML('beforeEnd', this.HTML.pages[page]);
  }

  removePage() {
    if (this.pageWrapper.childElementCount <= 1) return null;

    this.pageWrapper.lastElementChild.remove();
  }
}