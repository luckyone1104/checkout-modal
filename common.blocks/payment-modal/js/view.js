export class View {
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

    console.log('View initialization is finished!');
    this.ready = true;
  }

  getDOMElements() {
    this.DOMElements.pages = this.getPages();
    this.DOMElements.pagesList = this.getPagesList();
    this.DOMElements.menuButtons = this.getMenuButtons();
    this.DOMElements.productsPrices = this.getProductPrices();
    this.DOMElements.totalSum = document.querySelector('.order-page__total-sum');
    this.DOMElements.inputs = document.querySelectorAll('.checkout-input');
    this.DOMElements.menu = document.querySelector('.payment-modal__menu');
    this.DOMElements.menuLine = document.querySelector('.payment-modal__menu-selected-line-wrapper');
    this.DOMElements.nextPageButtons = document.querySelectorAll('.next-page-button');
    this.DOMElements.previousPageButtons = document.querySelectorAll('.previous-page-button');
    this.DOMElements.productRemoveButtons = document.querySelectorAll('.order-page__remove-button');
    this.DOMElements.selectBox = document.querySelector('.shipping-details__select-country');
    this.DOMElements.citiesInputWrapper = document.querySelector('.shipping-details__city-input-wrapper');
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

  getPages() {
    return {
      orderPage        : document.querySelector('.order-page'),
      shippingDetails  : document.querySelector('.shipping-details'),
      paymentDetails   : document.querySelector('.payment-details'),
      confirmationPage : document.querySelector('.confirmation-page'),
      successPage      : document.querySelector('.success-page')
    }
  }

  getPagesList() {
    return [
      this.DOMElements.pages.orderPage,
      this.DOMElements.pages.shippingDetails,
      this.DOMElements.pages.paymentDetails,
      this.DOMElements.pages.confirmationPage,
      this.DOMElements.pages.successPage
    ]
  }

  getMenuButtons() {
    return [
      document.querySelector('.menu-element__order-page'),
      document.querySelector('.menu-element__shipping-details'),
      document.querySelector('.menu-element__payment-details'),
      document.querySelector('.menu-element__confirmation-page')
    ]
  }

  getProductPrices() {
    let productPrices = document.querySelectorAll('.order-page__price');
    this.DOMElements.productsPrices =  productPrices;

    return productPrices;
  }

  saveData(data) {
    this.ukrainianCities = data.ukrainianCities;
    this.countries = data.countries;
    this.cardDefaultValues = {
      name   : data.creditCardDefaults.name,
      number : data.creditCardDefaults.number,
      expiry : data.creditCardDefaults.expiryDate
    }
  }

  buildView() {
    this.setTotalSum();
    this.buildSelectBox();
    // this.disableMenuButtons();
    this.buildCardDefaultValues()
  }

  buildSelectBox() {
    this.DOMElements.selectBox.insertAdjacentHTML('beforeEnd', this.countries);
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

  buildCityAutoComplete() {
    this.DOMElements.countryAutoComplete = new autoComplete({
      selector: ".ukrainianCityAutoComplete",
      placeHolder: "Kyiv",
      threshold: 3,
      data: {
        src: [],
      },
      resultItem: {
        highlight: {
          render: true,
        },
      },
      onSelection: (feedback) => {
        document.querySelector(this.DOMElements.countryAutoComplete.selector).value = feedback.selection.value;
      },
    });
  
    autoCompleteHover(); //Inject into library
  }

  disableMenuButtons() {
    for (let i = 2; i < this.DOMElements.menuButtons.length; i++) {
      this.DOMElements.menuButtons[i].setAttribute('disabled', true);
      this.DOMElements.menuButtons[i].classList.add('menu-element_disabled');
    }
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

  changeInputBottomLineStyleOnFocus(input) {
    let inputBottomLine = input.nextElementSibling;
    inputBottomLine.style.borderBottomColor = "#71b1ce";
  }

  changeInputBottomLineStyleOnBlur(input) {
    let inputBottomLine = input.nextElementSibling;
    inputBottomLine.removeAttribute('style');
  }

  hideSelectBoxPlaceHolder() {
    this.DOMElements.selectBox.previousElementSibling.style.display = 'none';
  }
  
  changeSelectBoxBottomLine() {
    this.changeInputBottomLineStyleOnBlur(this.DOMElements.selectBox.parentNode);
  }

  changeCitiesInput() {
    let selectBox = this.DOMElements.selectBox;

    if (selectBox.value === 'Ukraine' && document.querySelector('.defaultCityInput')) {
      this.whenSelectedCountryIsUkraine(selectBox);
    }
    if (selectBox.value !== 'Ukraine' && document.querySelector('.ukrainianCityAutoComplete')) {
      this.whenSelectedCountryIsOtherThanUkraine();
    }
  }

  whenSelectedCountryIsUkraine() {
    if (!this.ukrainianCities) return null;

    const citiesInputWrapper = this.DOMElements.citiesInputWrapper;
    
    citiesInputWrapper.firstElementChild.remove();
    const inputFragment = `<input class="ukrainianCityAutoComplete autoComplete checkout-input cityInput validationSensitive" 
    type="search" dir="ltr" spellcheck=false autocorrect="off" autocomplete="off" autocapitalize="off" id="autoComplete" filter="onlyLetters">`;
    citiesInputWrapper.insertAdjacentHTML('afterBegin', inputFragment);

    this.buildCityAutoComplete();
    this.DOMElements.countryAutoComplete.data.src = this.ukrainianCities;
  }

  whenSelectedCountryIsOtherThanUkraine() {
    const citiesInputWrapper = this.DOMElements.citiesInputWrapper;

    citiesInputWrapper.firstElementChild.remove();
    const inputFragment = `<input class="checkout-input cityInput defaultCityInput validationSensitive"  
    type="text" maxlength="19" placeholder="Harare" filter="onlyLetters">`;
    citiesInputWrapper.insertAdjacentHTML('afterBegin', inputFragment);
  }

  getNewCitiesInput() {
    const newCitiesInput = this.DOMElements.citiesInputWrapper.firstElementChild;
    return newCitiesInput;
  }

  getCurrentPage() {
    for (let page in this.DOMElements.pages) {
      if (this.DOMElements.pages[page].style.display !== 'none') {
        return this.DOMElements.pages[page];
      }
    }
  }

  switchPage(nextPageIndex) {
    if (nextPageIndex === -1) return 0;
    
    let nextPage = this.DOMElements.pagesList[nextPageIndex];

    this.getCurrentPage().style.display = 'none';
    nextPage.removeAttribute('style');
  }

  isDisabled(element) {
    if (element.hasAttribute('disabled')) {
      return true;
    }
    return false;
  }

  getPageInputs() {
    return this.getCurrentPage().querySelectorAll('.validationSensitive');
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