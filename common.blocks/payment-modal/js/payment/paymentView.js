export class PaymentView {
  constructor() {
    this.DOMElements = {};
    this.ready = false;
  }

  isReady() {
    return this.ready;
  }

  init(data) {
    this.getDOMElements();
    this.saveData(data);
    this.buildView();

    this.ready = true;
  }

  getDOMElements() {
    this.DOMElements.inputs = document.querySelectorAll('.checkout-input');
    this.DOMElements.nextPageButton = document.querySelector('.next-page-button');
    this.DOMElements.previousPageButton = document.querySelector('.previous-page-button');
    this.DOMElements.creditCardWrapper = document.querySelector('.payment-details__left-column');
    this.DOMElements.creditCard = document.querySelector('.credit-card');
    this.DOMElements.visaLogo = document.querySelector('.visa-logo');
    this.DOMElements.masterCardLogo = document.querySelector('.master-card-logo');
    this.DOMElements.cardNumber = document.querySelector('.card-number');
    this.DOMElements.cardHolderName = document.querySelector('.card-holder-name');
    this.DOMElements.expiryDate = document.querySelector('.expiry-date');
    this.DOMElements.cardNumberInput = document.querySelector('#card-number');
    this.DOMElements.nameOnCardInput = document.querySelector('#name-on-card');
    this.DOMElements.validThroughInput = document.querySelector('#valid-through');
    this.DOMElements.cvvInput = document.querySelector('#card-cvv');
  }

  saveData(data) {
    this.cardDefaultValues = {
      name   : data.creditCardDefaults.name,
      number : data.creditCardDefaults.number,
      expiry : data.creditCardDefaults.expiryDate
    }
  }

  buildView() {
    this.buildCardDefaultValues();
    this.buildInputValues();
  }

  buildCardDefaultValues() {
    this.buildDefaultCardHolderName();
    this.buildDefaultExpiryDate();
    this.buildDefaultCardNumber();
  }

  buildDefaultCardHolderName() {
    this.DOMElements.cardHolderName.innerHTML = this.cardDefaultValues.name;
  }

  buildDefaultExpiryDate() {
    this.DOMElements.expiryDate.innerHTML = this.cardDefaultValues.expiry;
  }

  buildDefaultCardNumber() {
    let numberNests = this.DOMElements.cardNumber.querySelectorAll('span');
    
    numberNests.forEach((nest, index) => {
      nest.innerHTML = this.cardDefaultValues.number[index];
    });
  }

  buildInputValues() {
    let currentPage = 2;
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

  resizeCreditCard() {
    const creditCardWrapper = this.DOMElements.creditCardWrapper;
    const creditCard = this.DOMElements.creditCard;
  
    // WIDTH: Wrapper 1.25 : 1 Card
    
    let creditCardScale = (creditCardWrapper.offsetWidth / creditCard.offsetWidth - 0.25) <= 1 ? creditCardWrapper.offsetWidth / creditCard.offsetWidth - 0.25 : 1;
    creditCard.style.transform = `scale(${creditCardScale})`;
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

  writeCardHolderName(name) {
    this.DOMElements.cardHolderName.innerHTML = name;
  }

  writeExpiryDate(date) {
    this.DOMElements.validThroughInput.innerHTML = date;
  }

  writeCreditCardNumber(number) {
    const eachFourNumbersOnCard = this.DOMElements.cardNumber.querySelectorAll('span');

    let eachFourNumbersFromInput = number.split(' ');

    for (let i = 0; i < eachFourNumbersOnCard.length; i++) {
      eachFourNumbersOnCard[i].innerHTML = eachFourNumbersFromInput[i] ? eachFourNumbersFromInput[i] : '';
    }
  }

  chooseVisaOrMasterCardLogo(filteredInput) {
    const visaLogo = this.DOMElements.visaLogo;
    const masterCardLogo = this.DOMElements.masterCardLogo;


    if(this.isMasterCard(filteredInput, visaLogo, masterCardLogo)) {
      this.showMasterCardLogo(visaLogo, masterCardLogo);
      return 'MasterCard';
    }
    if(this.isVisa(filteredInput)) {
      this.showVisaLogo(visaLogo, masterCardLogo);
      return 'Visa';
    }
    return null;
  }

  isMasterCard(filteredInput) {
    return filteredInput ? filteredInput[0] === '5' : null;
  }

  isVisa(filteredInput) {
    return filteredInput ? filteredInput[0] === '4' : null;
  }

  showVisaLogo(visaLogo, masterCardLogo) {
    masterCardLogo.style.display = 'none';
    visaLogo.removeAttribute('style');
  }

  showMasterCardLogo(visaLogo, masterCardLogo) {
    visaLogo.style.display = 'none';
    masterCardLogo.removeAttribute('style');
  }

  setInputValue(input, value) {
    input.value = value;
  }
}

