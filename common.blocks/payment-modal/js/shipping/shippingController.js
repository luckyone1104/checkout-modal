import {Observer} from '../observer.js'

export class ShippingController {
  constructor(mainView, model, view, utils) {
    this.mainView = mainView;
    this.model = model;
    this.view = view;
    this.utils = utils;
    this.observers = {
      clickOnPagingButton  : new Observer(),
      failValidation       : new Observer(),
      focusOnInput         : new Observer(),
      blurOfInput          : new Observer(),
      changeOfSelectBox    : new Observer(),
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
    this.view.DOMElements.selectBox.addEventListener('change', () => {
      this.observers.changeOfSelectBox.callEvent();
    });

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

        this.observers.clickOnPagingButton.callEvent('payment');
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
      
      this.observers.clickOnPagingButton.callEvent('order');
    })


    this.view.DOMElements.inputs.forEach(input => {
      this.createInputEvent(input);
    });

    const inputsForFilter = this.mainView.getInputsForFilter();

    inputsForFilter.onlyLetters.forEach(input => {
      input.addEventListener('input', () => {
        let filteredInput = this.model.filterLettersAndSpaces(input.value);

        this.view.setInputValue(input, filteredInput);
      })
    });
  }

  createInputFilterEvent(input) {
    input.addEventListener('input', () => {
      let filteredInput = this.model.filterLettersAndSpaces(input.value);

      this.view.setInputValue(input, filteredInput);
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
    let input = this.view.getNewCitiesInput();
    this.createInputEvent(input);
    this.createInputFilterEvent(input);
  }

  bindSubscribers() {
    this.observers.failValidation.subscribeEvent(this.view.colorInvalidBottomLine.bind(this.view));

    this.observers.focusOnInput.subscribeEvent(this.view.changeInputBottomLineStyleOnFocus.bind(this.view));
    this.observers.blurOfInput.subscribeEvent(this.view.changeInputBottomLineStyleOnBlur.bind(this.view));

    this.observers.changeOfSelectBox.subscribeEvent(this.view.hideSelectBoxPlaceHolder.bind(this.view));
    this.observers.changeOfSelectBox.subscribeEvent(this.view.showSelectBoxPlaceHolder.bind(this.view));    
    this.observers.changeOfSelectBox.subscribeEvent(this.view.changeSelectBoxBottomLine.bind(this.view));
    this.observers.changeOfSelectBox.subscribeEvent(this.view.changeCitiesInput.bind(this.view));
    this.observers.changeOfSelectBox.subscribeEvent(this.resetCitiesInputEventListener.bind(this));

    this.observers.clickOnPagingButton.subscribeEvent(this.utils.removePage.bind(this.utils));
    this.observers.clickOnPagingButton.subscribeEvent(this.utils.renderPage.bind(this.utils));
  }
}