export class View {
  constructor() {
    this.DOMElements = {};
    this.visiblePages = new Set;
    this.ready = false;
  }

  isReady() {
    return this.ready;
  }

  init() {
    this.setVisiblePages();
    this.checkIfPageIsVisible()
    this.getDOMElements();
    this.buildView();

    this.ready = true;
  }

  setVisiblePages() {
    let howManyPagesAreVisible = 2;

    for (let i = 0; i < howManyPagesAreVisible; i++) {
      this.visiblePages.add(i);
    }
  }

  getDOMElements() {
    this.DOMElements.menu = document.querySelector('.payment-modal__menu');
    this.DOMElements.menuButtons = this.getMenuButtons();
    this.DOMElements.menuLine = document.querySelector('.payment-modal__menu-selected-line-wrapper');
  }

  getMenuButtons() {
    return [
      document.querySelector('.menu-element__order-page'),
      document.querySelector('.menu-element__shipping-details'),
      document.querySelector('.menu-element__payment-details'),
      document.querySelector('.menu-element__confirmation-page')
    ]
  }

  getCurrentPage() {
    const routeName = document.location.hash.replace('#', '');
    switch(routeName) {
      case 'order': return 0;
      case 'shipping': return 1;
      case 'payment': return 2;
      case 'confirmation': return 3;
      case 'success': return 4;
    }
  }

  buildView() {
    this.buildMenu();
    this.disableMenuButtons();
    this.unlockDisabledButton();
  }

  checkIfPageIsVisible() {
    for (let index of this.visiblePages) {
      if (index === this.getCurrentPage()) {
        return true;
      }
    }

    document.location.hash = '#order';
  }

  buildMenu() {
    const currentPageIndex = this.getCurrentPage();

    this.removeMenuElementSelectedStyle();
    this.addMenuElementSelectedStyle(currentPageIndex);
    this.buildMenuLine(currentPageIndex);
  }

  removeMenuElementSelectedStyle() {
    for (let menuButton in this.DOMElements.menuButtons) {
      this.DOMElements.menuButtons[menuButton]?.classList.remove('payment-modal__menu-element_selected');
    }
  }

  addMenuElementSelectedStyle(nextPageIndex) {
    let menuButton = this.DOMElements.menuButtons[nextPageIndex];

    if (menuButton) {
      menuButton.classList.add('payment-modal__menu-element_selected');
    }
  }

  buildMenuLine(currentPageIndex) {
    this.showMenuLine();
    this.moveMenuSelectedLine(currentPageIndex);
  }

  showMenuLine() {
    this.DOMElements.menuLine.removeAttribute('style');
  }

  moveMenuSelectedLine(nextPageIndex) {
    switch(nextPageIndex) {
      case 0:
        this.DOMElements.menuLine.style.left='0%';
        break;
      case 1:
        this.DOMElements.menuLine.style.left='25%';
        break;
      case 2:
        this.DOMElements.menuLine.style.left='50%';
        break;
      case 3:
        this.DOMElements.menuLine.style.left='75%';
        break;
    }
  }

  disableMenuButtons() {
    for (let i = 0; i < this.DOMElements.menuButtons.length; i++) {
      this.DOMElements.menuButtons[i].setAttribute('disabled', true);
      this.DOMElements.menuButtons[i].classList.add('menu-element_disabled');
    }
  }

  unlockDisabledButton() {
    let menuButtons = this.DOMElements.menuButtons;

    this.visiblePages.forEach(index => {
      if (index < 4 && menuButtons[index].hasAttribute('disabled')) {
        menuButtons[index].removeAttribute('disabled');
        menuButtons[index].classList.remove('menu-element_disabled');
      }
    });
  }

  isDisabled(element) {
    if (element.hasAttribute('disabled')) {
      return true;
    }
    return false;
  }

  removeMenu() {
    if (this.getCurrentPage() === 4) {
      this.DOMElements.menu.remove();
    }
  }

  getInputsForValidation() {
    return document.querySelectorAll('.validationSensitive');
  }

  getInputsForFilter() {
    const inputs = {
      onlyNumbers : [],
      onlyLetters : []
    };

    document.querySelectorAll('input').forEach(input => {
      if (input.hasAttribute('filter')) {
        if (input.getAttribute('filter') === 'onlyNumbers') {
          inputs.onlyNumbers.push(input);
        }

        if (input.getAttribute('filter') === 'onlyLetters') {
          inputs.onlyLetters.push(input);
        }
      }
    });

    return inputs;
  }

  getInputsValues() {
    const inputs = document.querySelectorAll('.sessionInput');

    const values = [];

    inputs.forEach(input => {
      values.push(input.value);
    })

    return values;
  }
}