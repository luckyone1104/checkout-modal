import {View} from '../view.js'

export class PaymentView extends View {
  constructor() {
    super();
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
    this.DOMElements.numberNests = this.DOMElements.cardNumber.querySelectorAll('span')
    this.DOMElements.cardHolderName = document.querySelector('.card-holder-name');
    this.DOMElements.expiryDate = document.querySelector('.expiry-date');
    this.DOMElements.cardNumberInput = document.querySelector('#card-number');
    this.DOMElements.nameOnCardInput = document.querySelector('#name-on-card');
    this.DOMElements.validThroughInput = document.querySelector('#valid-through');
    this.DOMElements.cvvInput = document.querySelector('#card-cvv');
  }

  getInputsForDisplayingOnCard() {
    return document.querySelectorAll('.displayOnCard');
  }

  saveData(data) {
    this.cardDefaultValues = {
      name   : data.creditCardDefaults.name,
      number : data.creditCardDefaults.number,
      expiry : data.creditCardDefaults.expiryDate
    }
  }

  buildView() {
    this.buildCreditCard();
    this.buildInputValues();
  }

  buildCreditCard() {
    const sessionValues = this.getSessionStorageCardValues() || [];

    if (!sessionValues) return null;


    sessionValues[0] ? this.buildCardHolderName(sessionValues[0]) : this.buildCardHolderName(this.cardDefaultValues.name);
    sessionValues[1] ? this.buildCardNumber(sessionValues[1]) : this.buildCardNumber(this.cardDefaultValues.number);
    sessionValues[2] ? this.buildExpiryDate(sessionValues[2]) : this.buildExpiryDate(this.cardDefaultValues.expiry);
  }

  getSessionStorageCardValues() {
    const cardValues = JSON.parse(sessionStorage.getItem(this.getCurrentPage()));

    if (!cardValues) return null;

    this.modifyCardNumber(cardValues);

    return cardValues;
  }

  modifyCardNumber(cardValues) {
    cardValues[1] = cardValues[1].split(' ');
  }

  buildCardHolderName(value) {
    this.DOMElements.cardHolderName.innerHTML = value.toUpperCase();
  }

  buildCardNumber(value) {
    if (value[0] === '') {
      value = this.cardDefaultValues.number;
    }

    this.DOMElements.numberNests.forEach((nest, index) => {
      if (value[index]) {
        nest.innerHTML = value[index] ? value[index] : '';
      }
      
    });
  }

  buildExpiryDate(value) {
    this.DOMElements.expiryDate.innerHTML = value;
  }

  resizeCreditCard() {
    const creditCardWrapper = this.DOMElements.creditCardWrapper;
    const creditCard = this.DOMElements.creditCard;
  
    // WIDTH: Wrapper 1.25 : 1 Card
    
    let creditCardScale = (creditCardWrapper.offsetWidth / creditCard.offsetWidth - 0.25) <= 1 ? creditCardWrapper.offsetWidth / creditCard.offsetWidth - 0.25 : 1;
    creditCard.style.transform = `scale(${creditCardScale})`;
  }

  writeCardHolderName(name) {
    this.DOMElements.cardHolderName.innerHTML = name;
  }

  writeExpiryDate(date) {
    this.DOMElements.expiryDate.innerHTML = date;
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
}

