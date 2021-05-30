export class ConfirmationController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  init() {
    this.initView();
    this.bindEvents();
  }

  initView() {
    this.view.isReady() || this.view.init();
  }

  bindEvents() {
    const nextButton = this.view.DOMElements.nextPageButton;

    nextButton.addEventListener('click', event => {
      if (this.view.isDisabled(nextButton)) {
        event.preventDefault();
        return null;
      }

      let inputs = this.view.getInputsForValidation();

      let isValid = this.model.isValid(inputs);

      if (isValid.status) {
        window.app.observer.callEvent('clickOnNextButton', this.view.getCurrentPage() + 1);

        this.model.saveInputsData(this.view.getCurrentPage(), this.view.getInputsValues());
      } 
      else {
        event.preventDefault();
        for (let input of isValid.inputs) {
          window.app.observer.callEvent('failValidation', input);
        }
      }        
    })

    const previousButton = this.view.DOMElements.previousPageButton

    previousButton.addEventListener('click', () => {
      this.model.saveInputsData(this.view.getCurrentPage(), this.view.getInputsValues());
    })

    this.view.DOMElements.inputs.forEach(input => {
      this.createInputEvent(input);
    });

    const inputsForFilter = this.view.getInputsForFilter();

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
  }

  createInputEvent(input) {
    input.addEventListener('focus', () => {
      window.app.observer.callEvent('focusOnInput', input);
    });

    input.addEventListener('blur', () => {
      window.app.observer.callEvent('blurOfInput', input);
    })
  }
}