import {View} from '../view.js'

export class ShippingView extends View {
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
    this.DOMElements.selectBox = document.querySelector('.shipping-details__select-country');
    this.DOMElements.citiesInputWrapper = document.querySelector('.shipping-details__city-input-wrapper');
  }

  saveData(data) {
    this.ukrainianCities = data.ukrainianCities;
    this.countries = data.countries;
  }

  buildView() {
    this.buildSelectBox();
    this.buildInputValues();
  }

  buildSelectBox() {
    this.DOMElements.selectBox.insertAdjacentHTML('beforeEnd', this.countries);
  }

  hideSelectBoxPlaceHolder() {
    this.DOMElements.selectBox.previousElementSibling.style.display = 'none';
  }

  showSelectBoxPlaceHolder() {
    if (this.DOMElements.selectBox.value === '') {
      this.DOMElements.selectBox.previousElementSibling.removeAttribute('style');
    }
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
    const inputFragment = `<input class="ukrainianCityAutoComplete autoComplete checkout-input cityInput validationSensitive sessionInput" 
    type="search" dir="ltr" spellcheck=false autocorrect="off" autocomplete="off" autocapitalize="off" id="autoComplete" filter="onlyLetters">`;
    citiesInputWrapper.insertAdjacentHTML('afterBegin', inputFragment);

    this.buildCityAutoComplete();
    this.DOMElements.countryAutoComplete.data.src = this.ukrainianCities;
  }

  whenSelectedCountryIsOtherThanUkraine() {
    const citiesInputWrapper = this.DOMElements.citiesInputWrapper;

    citiesInputWrapper.firstElementChild.remove();
    const inputFragment = `<input class="checkout-input cityInput defaultCityInput validationSensitive sessionInput"  
    type="text" maxlength="19" placeholder="Harare" filter="onlyLetters">`;
    citiesInputWrapper.insertAdjacentHTML('afterBegin', inputFragment);
  }

  getNewCitiesInput() {
    const newCitiesInput = this.DOMElements.citiesInputWrapper.firstElementChild;
    return newCitiesInput;
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
}