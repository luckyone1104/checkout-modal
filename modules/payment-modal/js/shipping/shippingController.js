export class ShippingController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
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
    this.view.DOMElements.selectBox.addEventListener('change', () => {
      window.app.observer.callEvent('changeOfSelectBox');
    });

    this.view.DOMElements.nextPageButton.addEventListener('click', event => {
      if (this.view.isDisabled(event.currentTarget)) {
        event.preventDefault();
      } else {
        this.checkForValidation(event);
      }
    })

    this.view.DOMElements.previousPageButton.addEventListener('click', () => {
      this.model.saveInputsData(this.view.getCurrentPage(), this.view.getInputsValues());
    })

    this.view.DOMElements.inputs.forEach(input => {
      this.createInputEvent(input);
    });

    this.view.getInputsForFilter().onlyLetters.forEach(input => {
      input.addEventListener('input', () => {
        this.view.setInputValue(input, this.model.filterLettersAndSpaces(input.value));
      })
    });
  }

  checkForValidation(event) {
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
  }

  createInputFilterEvent(input) {
    input.addEventListener('input', () => {
      this.view.setInputValue(input, this.model.filterLettersAndSpaces(input.value));
    })
  }

  createInputEvent(input) {
    input.addEventListener('focus', () => {
      window.app.observer.callEvent('focusOnInput', input);
    });

    input.addEventListener('blur', () => {
      window.app.observer.callEvent('blurOfInput', input);
    })
  }

  resetCitiesInputEventListener() {
    let input = this.view.getNewCitiesInput();
    this.createInputEvent(input);
    this.createInputFilterEvent(input);
  }

  bindSubscribers() {
    window.app.observer.subscribeEvent('changeOfSelectBox', () => {
      this.view.hideSelectBoxPlaceHolder();
      this.view.showSelectBoxPlaceHolder();
      this.view.changeSelectBoxBottomLine();
      this.view.changeCitiesInput();
      this.resetCitiesInputEventListener();
    });
  }
}