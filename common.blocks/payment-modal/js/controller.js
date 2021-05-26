export class Controller {

  constructor(model, view, utils, observers) {
    this.model = model;
    this.view = view;
    this.utils = utils;
    this.observers = observers;
  }

  init() {
    this.model.getData()
      .then(data => {
        this.initView(data);
      })
      .then(() => {
        this.bindEvents();
        this.bindSubscribers();
      })
  }

  bindEvents() {
    this.view.DOMElements.menu.addEventListener('click', event => {
      if (this.view.isDisabled(event.target)) {
        return null;
      }
      
      let nextPageIndex = this.view.DOMElements.menuButtons.indexOf(event.target);
      this.observers.switchingPages.callEvent(nextPageIndex);
    })

    this.view.DOMElements.nextPageButtons.forEach(nextButton => {
      nextButton.addEventListener('click', () => {
        if (this.view.isDisabled(nextButton)) {
          return null;
        }

        let isValid = this.model.isValid(this.view.getPageInputs());
        if (isValid.status) {
          let nextPageIndex = +this.utils.getKeyByValue(this.view.DOMElements.nextPageButtons, nextButton) + 1;

          this.observers.switchingPages.callEvent(nextPageIndex);
        } 
        else {
          for (let input of isValid.inputs) {
            this.observers.invalidForm.callEvent(input);
          }
        }
        
      })
    });

    this.view.DOMElements.previousPageButtons.forEach(previousButton => {
      previousButton.addEventListener('click', () => {
        let nextPageIndex = +this.utils.getKeyByValue(this.view.DOMElements.previousPageButtons, previousButton);

        this.observers.switchingPages.callEvent(nextPageIndex);
      })
    });

    this.view.DOMElements.productRemoveButtons.forEach(removeButton => {
      removeButton.addEventListener('click', () => {
        this.observers.removingProduct.callEvent(removeButton);
      })
    });

    this.view.DOMElements.inputs.forEach(input => {
      this.createInputEvent(input);
    });

    this.view.DOMElements.selectBox.addEventListener('change', () => {
      this.observers.selectBoxChange.callEvent();
    });

    window.addEventListener('resize', () => {
      this.view.resizeCreditCard();
    });

    const inputsForFilter = this.view.getInputsForFilter();

    inputsForFilter.onlyNumbers.forEach(input => {
      input.addEventListener('input', () => {
        console.log('onlyNumbers!');
        this.observers.inputNumberFilter.callEvent(input.value);
      })
    });

    inputsForFilter.onlyLetters.forEach(input => {
      input.addEventListener('input', () => {
        console.log('onlyLetters');
        this.observers.inpuLetterFilter.callEvent(input.value);
      })
    });
  }

  createInputEvent(input) {
    input.addEventListener('focus', () => {
      this.observers.inputFocus.callEvent(input);
    });

    input.addEventListener('blur', () => {
      this.observers.inputBlur.callEvent(input);
    })
  }

  resetCitiesInputEventListener() {
    this.createInputEvent(this.view.getNewCitiesInput());
  }

  bindSubscribers() {
    this.observers.switchingPages.subscribeEvent(this.view.switchPage.bind(this.view));
    this.observers.switchingPages.subscribeEvent(this.view.removeMenuElementSelectedStyle.bind(this.view));
    this.observers.switchingPages.subscribeEvent(this.view.addMenuElementSelectedStyle.bind(this.view));
    this.observers.switchingPages.subscribeEvent(this.view.moveMenuSelectedLine.bind(this.view));
    this.observers.switchingPages.subscribeEvent(this.view.unlockDisabledButton.bind(this.view));

    this.observers.invalidForm.subscribeEvent(this.view.colorInvalidBottomLine.bind(this.view));

    this.observers.removingProduct.subscribeEvent(this.view.removeProduct.bind(this.view));
    this.observers.removingProduct.subscribeEvent(this.view.getProductPrices.bind(this.view));
    this.observers.removingProduct.subscribeEvent(this.view.setTotalSum.bind(this.view));
    this.observers.removingProduct.subscribeEvent(this.view.clearOrderPage.bind(this.view));

    this.observers.inputFocus.subscribeEvent(this.view.changeInputBottomLineStyleOnFocus.bind(this.view));
    this.observers.inputBlur.subscribeEvent(this.view.changeInputBottomLineStyleOnBlur.bind(this.view));

    this.observers.selectBoxChange.subscribeEvent(this.view.hideSelectBoxPlaceHolder.bind(this.view));
    this.observers.selectBoxChange.subscribeEvent(this.view.changeSelectBoxBottomLine.bind(this.view));
    this.observers.selectBoxChange.subscribeEvent(this.view.changeCitiesInput.bind(this.view));
    this.observers.selectBoxChange.subscribeEvent(this.resetCitiesInputEventListener.bind(this));

    this.observers.inputNumberFilter.subscribeEvent(this.model.filterOnlyNumbers.bind(this.model));
  }

  initView(data) {
    this.view.isReady() || this.view.init(data);
  }
}