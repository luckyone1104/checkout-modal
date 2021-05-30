export class View {
  constructor() {
    this.DOMElements = {};
    this.ready = false;
  }

  isReady() {
    return this.ready;
  }

  init() {
    this.setUnlockedPages();
    this.checkIfPageIsUnlocked()
    this.getDOMElements();
    this.buildView();

    this.ready = true;
  }

  setUnlockedPages() {
    this.unlockedPages = new Set;
    
    let howManyPagesAreUnlocked = 2;

    for (let i = 0; i < howManyPagesAreUnlocked; i++) {
      this.unlockedPages.add(i);
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

  checkIfPageIsUnlocked() {
    for (let index of this.unlockedPages) {
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
    this.DOMElements.menuButtons.forEach(menuButton => {
      menuButton.setAttribute('disabled', true);
      menuButton.classList.add('menu-element_disabled');
    });
  }

  unlockDisabledButton() {
    let menuButtons = this.DOMElements.menuButtons;

    this.unlockedPages.forEach(index => {
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

  buildInputValues() {
    let inputs = this.getInputsForSessionStorage();
    let values = JSON.parse(sessionStorage.getItem(this.getCurrentPage()));

    if (!values) return null;

    inputs.forEach((input, index) => {
      if (values[index] !== 'undefined') {
        input.value = values[index];
      }
    })

    if (inputs[0].tagName === 'SELECT' && inputs[0].value !== '') {
      this.hideSelectBoxPlaceHolder();
    }
  }

  getInputsForSessionStorage() {
    return document.querySelectorAll('.sessionInput');
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

  isDisabled(element) {
    if (element.hasAttribute('disabled')) {
      return true;
    }
    return false;
  }

  setInputValue(input, value) {
    input.value = value;
  }

  colorInvalidBottomLine(input) {
    let inputBottomLine = input?.nextElementSibling || input.parentNode.nextElementSibling;
    inputBottomLine.style.borderBottomColor = '#ff6666';
  }

  changeInputBottomLineStyleOnFocus(input) {
    let inputBottomLine = input.nextElementSibling;
    inputBottomLine.style.borderBottomColor = "#71b1ce";
  }

  changeInputBottomLineStyleOnBlur(input) {
    let inputBottomLine = input.nextElementSibling;
    inputBottomLine.removeAttribute('style');
  }
}