export class Controller {

  constructor(model, view, observers) {
    this.model = model;
    this.view = view;
    this.observers = observers;
  }

  init() {
    this.initModel();
    this.model.getData()
      .then(data => {
        this.initView(data);
        this.bindEvents();
        this.bindSubscribers();
      })
  }

  initModel() {
    this.model.isReady() || this.model.init();
  }

  initView(data) {
    this.view.isReady() || this.view.init(data);
  }

  bindEvents() {
    this.view.DOMElements.menu.addEventListener('click', event => {
      if (this.view.isDisabled(event.target)) {
        return null;
      }
      
      let nextPageIndex = this.view.DOMElements.menuButtons.indexOf(event.target);
      this.observers.clickOnPagingButton.callEvent(nextPageIndex);
    })

    this.view.DOMElements.nextPageButtons.forEach(nextButton => {
      nextButton.addEventListener('click', () => {
        if (this.view.isDisabled(nextButton)) {
          return null;
        }

        let isValid = this.model.isValid(this.view.getPageInputs());

        if (isValid.status) {
          let nextPageIndex = +this.getKeyByValue(this.view.DOMElements.nextPageButtons, nextButton) + 1;

          this.observers.clickOnPagingButton.callEvent(nextPageIndex);
        } 
        else {
          for (let input of isValid.inputs) {
            this.observers.failValidation.callEvent(input);
          }
        }
        
      })
    });

    this.view.DOMElements.previousPageButtons.forEach(previousButton => {
      previousButton.addEventListener('click', () => {
        let nextPageIndex = +this.getKeyByValue(this.view.DOMElements.previousPageButtons, previousButton);

        this.observers.clickOnPagingButton.callEvent(nextPageIndex);
      })
    });

    this.view.DOMElements.productRemoveButtons.forEach(removeButton => {
      removeButton.addEventListener('click', () => {
        this.observers.clickOnRemoveProduct.callEvent(removeButton);
      })
    });

    this.view.DOMElements.inputs.forEach(input => {
      this.createInputEvent(input);
    });

    this.view.DOMElements.selectBox.addEventListener('change', () => {
      this.observers.changeOfSelectBox.callEvent();
    });

    window.addEventListener('resize', () => {
      this.view.resizeCreditCard();
    });

    const inputsForFilter = this.view.getInputsForFilter();

    inputsForFilter.onlyNumbers.forEach(input => {
      input.addEventListener('input', () => {
        let filteredInput = this.model.filterOnlyNumbers(input.value);

        // input.value = filteredInput;

        this.view.setInputValue(input, filteredInput);
      })
    });

    inputsForFilter.onlyLetters.forEach(input => {
      input.addEventListener('input', () => {
        let filteredInput = this.model.filterLettersAndSpaces(input.value);

        // input.value = filteredInput;

        this.view.setInputValue(input, filteredInput);

        // this.observers.inpuLetterFilter.callEvent(input.value);
      })
    });

    this.view.DOMElements.nameOnCardInput.addEventListener('input', event => {
      this.view.writeCardHolderName(event.currentTarget.value.toUpperCase());
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
    })
  }

  createInputEvent(input) {
    input.addEventListener('focus', () => {
      this.observers.focusOnInput.callEvent(input);
    });

    input.addEventListener('blur', () => {
      this.observers.blurOfInput.callEvent(input);
    })
  }

  resetCitiesInputEventListener() {
    this.createInputEvent(this.view.getNewCitiesInput());
  }

  bindSubscribers() {
    this.observers.clickOnPagingButton.subscribeEvent(this.view.switchPage.bind(this.view));
    this.observers.clickOnPagingButton.subscribeEvent(this.view.removeMenuElementSelectedStyle.bind(this.view));
    this.observers.clickOnPagingButton.subscribeEvent(this.view.addMenuElementSelectedStyle.bind(this.view));
    this.observers.clickOnPagingButton.subscribeEvent(this.view.moveMenuSelectedLine.bind(this.view));
    this.observers.clickOnPagingButton.subscribeEvent(this.view.unlockDisabledButton.bind(this.view));

    this.observers.failValidation.subscribeEvent(this.view.colorInvalidBottomLine.bind(this.view));

    this.observers.clickOnRemoveProduct.subscribeEvent(this.view.removeProduct.bind(this.view));
    this.observers.clickOnRemoveProduct.subscribeEvent(this.view.getProductPrices.bind(this.view));
    this.observers.clickOnRemoveProduct.subscribeEvent(this.view.setTotalSum.bind(this.view));
    this.observers.clickOnRemoveProduct.subscribeEvent(this.view.clearOrderPage.bind(this.view));

    this.observers.focusOnInput.subscribeEvent(this.view.changeInputBottomLineStyleOnFocus.bind(this.view));
    this.observers.blurOfInput.subscribeEvent(this.view.changeInputBottomLineStyleOnBlur.bind(this.view));

    this.observers.changeOfSelectBox.subscribeEvent(this.view.hideSelectBoxPlaceHolder.bind(this.view));
    this.observers.changeOfSelectBox.subscribeEvent(this.view.changeSelectBoxBottomLine.bind(this.view));
    this.observers.changeOfSelectBox.subscribeEvent(this.view.changeCitiesInput.bind(this.view));
    this.observers.changeOfSelectBox.subscribeEvent(this.resetCitiesInputEventListener.bind(this));
  }

  getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }
}