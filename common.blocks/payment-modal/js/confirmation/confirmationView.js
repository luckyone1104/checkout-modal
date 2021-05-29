export class ConfirmationView {
  constructor() {
    this.DOMElements = {};
    this.ready = false;
  }

  isReady() {
    return this.ready;
  }

  init() {
    this.getDOMElements();
    this.buildView();

    // console.log('Confirmation view initialization is finished!');
    this.ready = true;
  }

  buildView() {
    this.buildInputValues();
  }

  getDOMElements() {
    this.DOMElements.inputs = document.querySelectorAll('.checkout-input');
    this.DOMElements.nextPageButton = document.querySelector('.next-page-button');
    this.DOMElements.previousPageButton = document.querySelector('.previous-page-button');
  }

  buildInputValues() {
    let currentPage = 3;
    let inputs = this.getInputsForSessionStorage();
    let values = JSON.parse(sessionStorage.getItem(currentPage));

    if (!values) return null;

    inputs.forEach((input, index) => {
      if (values[index] !== 'undefined') {
        input.value = values[index];
      }
    })
  }

  getInputsForSessionStorage() {
    return document.querySelectorAll('.sessionInput');
  }

  getInputs() {
    return document.querySelectorAll('.checkout-input');
  }

  changeInputBottomLineStyleOnFocus(input) {
    let inputBottomLine = input.nextElementSibling;
    inputBottomLine.style.borderBottomColor = "#71b1ce";
  }

  changeInputBottomLineStyleOnBlur(input) {
    let inputBottomLine = input.nextElementSibling;
    inputBottomLine.removeAttribute('style');
  }

  isDisabled(element) {
    if (element.hasAttribute('disabled')) {
      return true;
    }
    return false;
  }

  unlockDisabledButton(nextButtonIndex) {
    let menuButton = this.DOMElements.menuButtons[+nextButtonIndex];

    if (menuButton && menuButton.hasAttribute('disabled')) {
      menuButton.removeAttribute('disabled');
      menuButton.classList.remove('menu-element_disabled')
    }
  }

  colorInvalidBottomLine(input) {
    let inputBottomLine = input?.nextElementSibling || input.parentNode.nextElementSibling;
    inputBottomLine.style.borderBottomColor = '#ff6666';
  }

  getInputsForFilter() {
    const inputs = {
      onlyNumbers : [],
      onlyLetters : []
    };

    this.DOMElements.inputs.forEach(input => {
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

  setInputValue(input, value) {
    input.value = value;
  }
}