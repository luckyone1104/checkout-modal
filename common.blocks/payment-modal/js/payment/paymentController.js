import {Observer} from '../observer.js'

export class PaymentController {
  constructor(mainView, model, view, utils) {
    this.mainView = mainView;
    this.model = model;
    this.view = view;
    this.utils = utils;
    this.observers = {
      clickOnPagingButton : new Observer(),
      failValidation      : new Observer(),
      focusOnInput        : new Observer(),
      blurOfInput         : new Observer(),
    };
  }

  init() {
    this.initView();
    this.bindSubscribers();
    this.bindEvents();
  }

  initView() {
    this.view.isReady() || this.view.init(this.model.data);
  }

  bindEvents() {
    const nextButton = this.view.DOMElements.nextPageButton;

    nextButton.addEventListener('click', event => {
      if (this.view.isDisabled(nextButton)) {
        event.preventDefault();
        return null;
      }

      let inputs = this.mainView.getInputsForValidation();
      let isValid = this.model.isValid(inputs);

      if (isValid.status) {
        this.mainView.visiblePages.add(this.mainView.getCurrentPage() + 1);

        this.model.saveInputsData(this.mainView.getCurrentPage(), this.mainView.getInputsValues());

        this.observers.clickOnPagingButton.callEvent('confirmation');
      } 
      else {
        event.preventDefault();
        for (let input of isValid.inputs) {
          this.observers.failValidation.callEvent(input);
        }
      }        
    })

    const previousButton = this.view.DOMElements.previousPageButton

    previousButton.addEventListener('click', () => {
      this.model.saveInputsData(this.mainView.getCurrentPage(), this.mainView.getInputsValues());
      
      this.observers.clickOnPagingButton.callEvent('shipping');
    })

    this.view.DOMElements.inputs.forEach(input => {
      this.createInputEvent(input);
    });

    const inputsForFilter = this.mainView.getInputsForFilter();

    inputsForFilter.onlyNumbers.forEach(input => {
      input.addEventListener('input', () => {
        let filteredInput = this.model.filterOnlyNumbers(input.value);

        this.view.setInputValue(input, filteredInput);
      })
    });

    inputsForFilter.onlyLetters.forEach(input => {
      input.addEventListener('input', () => {
        let filteredInput = this.model.filterLettersAndSpaces(input.value);

        this.view.setInputValue(input, filteredInput);
      })
    });

    this.view.DOMElements.nameOnCardInput.addEventListener('input', event => {
      this.view.writeCardHolderName(event.currentTarget.value.toUpperCase());

      if (event.currentTarget.value === "") {
        this.view.buildDefaultCardHolderName();
      }
    })

    this.view.DOMElements.cardNumberInput.addEventListener('input', event => {
      this.view.chooseVisaOrMasterCardLogo(event.currentTarget.value);
      
      this.view.setInputValue(event.currentTarget, this.model.putSpacesInCreditCardNumber(event.currentTarget.value))

      this.view.writeCreditCardNumber(event.currentTarget.value);

      if (event.currentTarget.value === "") {
        this.view.buildDefaultCardNumber();
      }
    })

    this.view.DOMElements.validThroughInput.addEventListener('input', event => {
      this.view.setInputValue(event.currentTarget, this.model.putSlashBetweenDates(event.currentTarget.value));

      this.view.writeExpiryDate(event.currentTarget.value);

      if (event.currentTarget.value === "") {
        this.view.buildDefaultExpiryDate();
      }
    })

    window.addEventListener('resize', () => {
      this.view.resizeCreditCard();
    });
  }

  createInputEvent(input) {
    this.observers.clickOnPagingButton.subscribeEvent(this.utils.removePage.bind(this.utils));
    this.observers.clickOnPagingButton.subscribeEvent(this.utils.renderPage.bind(this.utils));

    input.addEventListener('focus', () => {
      this.observers.focusOnInput.callEvent(input);
    });

    input.addEventListener('blur', () => {
      this.observers.blurOfInput.callEvent(input);
    })
  }

  bindSubscribers() {
    this.observers.failValidation.subscribeEvent(this.view.colorInvalidBottomLine.bind(this.view));

    this.observers.focusOnInput.subscribeEvent(this.view.changeInputBottomLineStyleOnFocus.bind(this.view));
    this.observers.blurOfInput.subscribeEvent(this.view.changeInputBottomLineStyleOnBlur.bind(this.view));
  }
}